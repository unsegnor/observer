module.exports = function () {
  let observations = []
  return Object.freeze({
    addObservation,
    getObservations,
    getGreaterObservation
  })

  async function addObservation (observation) {
    observations.push(observation)
  }

  async function getObservations () {
    return observations
  }

  async function getGreaterObservation ({orderFunction, matchingFunction}) {
    let greaterObservation

    let matchingObservations = []
    if (matchingFunction) {
      for (let observation of observations) {
        if (await matchingFunction(observation)) {
          matchingObservations.push(observation)
        }
      }
    } else {
      matchingObservations = observations
    }

    for (let observation of matchingObservations) {
      if (!greaterObservation) {
        greaterObservation = observation
      } else if (await orderFunction(observation, greaterObservation) === 'greater') {
        greaterObservation = observation
      }
    }

    return greaterObservation
  }
}
