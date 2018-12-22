const {expect} = require('chai')
const portTests = require('../../ports/DateManager')
const Adapter = require('./FakeDateManager')

describe('FakeDateManager adapter', function () {
  beforeEach(function () {
    this.adapter = Adapter()
  })

  portTests()

  describe('FakeDateManager specific tests', function () {
    it('must allow setting the current date', async function () {
      await this.adapter.setCurrentDate('2002-10-20')
      var currentDate = await this.adapter.getCurrentDate()
      expect(await this.adapter.areEqual(currentDate, '2002-10-20')).to.equal(true)
    })
  })
})
