module.exports = function ({observationsRepository, dateManager}) {
  return Object.freeze({
    register,
    getValue
  })

  async function register ({subject, attribute, value, observationDate}) {
    await observationsRepository.addObservation({
      subject,
      attribute,
      value,
      observationDate: observationDate || (await dateManager.getCurrentDate())
    })
  }

  async function getValue ({subject, attribute, observationDate}) {
    const lastObservation = await observationsRepository.getGreaterObservation({
      matchingFunction: async function (observation) {
        return (observation.subject === subject) &&
              (observation.attribute === attribute) &&
              (!observationDate ||
                (await dateManager.isLower(observation.observationDate, observationDate))
              )
      },
      orderFunction: async function (observation1, observation2) {
        if (await dateManager.isLower(observation1.observationDate, observation2.observationDate)) {
          return 'lower'
        } else if (await dateManager.isLower(observation2.observationDate, observation1.observationDate)) {
          return 'greater'
        } else {
          return 'equal'
        }
      }
    })

    return {
      value: lastObservation.value,
      attribute: lastObservation.attribute,
      subject: lastObservation.subject,
      date: lastObservation.observationDate
    }
  }
}
