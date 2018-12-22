const {expect} = require('chai')

module.exports = function () {
  describe('Observations Repository', function () {
    it('must keep the observations stored', async function () {
      const observation = {
        subject: 'Victor',
        attribute: 'location',
        value: 'home',
        observationDate: '2018-12-09'
      }

      await this.adapter.addObservation(observation)
      const storedObservations = await this.adapter.getObservations()

      expect(storedObservations).to.include(observation)
    })

    describe('getting the greater observation', function () {
      let orderFunction

      beforeEach(async function () {
        orderFunction = async function (observation1, observation2) {
          if (observation1.observationDate > observation2.observationDate) return 'greater'
          if (observation1.observationDate < observation2.observationDate) return 'lower'
          return 'equal'
        }
      })

      describe('when there are no observations', function () {
        it('must allow getting the greater observation with an order function', async function () {
          const lastObservation = await this.adapter.getGreaterObservation({
            orderFunction
          })

          expect(lastObservation).to.be.undefined
        })
      })

      describe('when there is only one observation', function () {
        beforeEach(async function () {
          await this.adapter.addObservation({
            subject: 'Victor',
            attribute: 'location',
            value: 'home',
            observationDate: '2018-12-09T06:00:00'
          })
        })

        it('must allow getting the greater observation with an order function', async function () {
          const lastObservation = await this.adapter.getGreaterObservation({
            orderFunction
          })

          expect(lastObservation.value).to.equal('home')
        })
      })

      describe('when there are several observations', function () {
        beforeEach(async function () {
          await this.adapter.addObservation({
            subject: 'Victor',
            attribute: 'location',
            value: 'home',
            observationDate: '2018-12-09T06:00:00'
          })

          await this.adapter.addObservation({
            subject: 'Victor',
            attribute: 'location',
            value: 'work',
            observationDate: '2018-12-09T10:00:00'
          })

          await this.adapter.addObservation({
            subject: 'Victor',
            attribute: 'location',
            value: 'transport',
            observationDate: '2018-12-09T08:11:00'
          })

          await this.adapter.addObservation({
            subject: 'house',
            attribute: 'location',
            value: 'ocean',
            observationDate: '2018-12-09T05:00:00'
          })
        })

        it('must allow getting the greater observation with an order function', async function () {
          const lastObservation = await this.adapter.getGreaterObservation({
            orderFunction
          })

          expect(lastObservation.value).to.equal('work')
        })

        it('must allow getting the greater observation with an order and a matching function', async function () {
          const lastObservation = await this.adapter.getGreaterObservation({
            orderFunction,
            matchingFunction: async function (observation) {
              return observation.subject === 'house'
            }
          })

          expect(lastObservation.value).to.equal('ocean')
        })
      })
    })
  })
}
