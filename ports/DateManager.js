const {expect} = require('chai')

module.exports = function () {
  describe('DateManager', function () {
    beforeEach(function () {
      this.compareDates = async function (date1, date2, expectedResult) {
        expect(await this.adapter.areEqual(date1, date2)).to.equal(expectedResult)
      }

      this.areEqualDates = async function (date1, date2) {
        await this.compareDates(date1, date2, true)
      }

      this.areDifferentDates = async function (date1, date2) {
        await this.compareDates(date1, date2, false)
      }

      this.isLower = async function (date1, date2) {
        expect(await this.adapter.isLower(date1, date2)).to.be.true
      }

      this.isNotLower = async function (date1, date2) {
        expect(await this.adapter.isLower(date1, date2)).to.be.false
      }
    })

    describe('must compare different dates', function () {
      it('with different years', async function () {
        await this.areDifferentDates('2000-12-20', '2001-12-20')
      })
      it('with different months', async function () {
        await this.areDifferentDates('2000-12-20', '2000-11-20')
      })
      it('with different days', async function () {
        await this.areDifferentDates('2000-12-21', '2000-12-20')
      })
    })

    describe('must compare equal dates', function () {
      it('when they are the same date', async function () {
        await this.areEqualDates('2000-12-20', '2000-12-20')
      })

      it('when they share the date part', async function () {
        await this.areEqualDates('2000-12-20', '2000-12-20T10:00:00')
        await this.areEqualDates('2000-12-20T10:00:00', '2000-12-20')
      })
    })

    describe('comparing whether a date is lower than other', function () {
      it('must consider lower a date with a lower year', async function () {
        await this.isLower('2000', '2001')
      })

      it('must consider lower a date with a lower year and different formats', async function () {
        await this.isLower('2000', '2001-12-20')
        await this.isLower('2000-12-20T10:00:00', '2001-12-20')
      })

      it('must not consider lower a date without month compared with a date with month in the same year', async function () {
        await this.isNotLower('2000', '2000-01-01')
        await this.isNotLower('2000-01-01', '2000')
      })

      // TODO: Continuar con los casos raros de comparación de fechas
    })
  })
}
