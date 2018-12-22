const {expect} = require('chai')
const portTests = require('../../ports/ObservationsRepository')
const Adapter = require('./InMemoryObservationsRepository')

describe('InMemoryObservationsRepository adapter', function () {
  beforeEach(function () {
    this.adapter = Adapter()
  })

  portTests()
})
