const { setWorldConstructor } = require('cucumber')
const System = require('../../src/System.js')
const DateManager = require('../../adapters/DateManager/FakeDateManager')
const ObservationsRepository = require('../../adapters/ObservationsRepository/InMemoryObservationsRepository')

class CustomWorld {
  constructor () {
    this.context = {}
    this.init()
  }

  restartTheSystem () {
    this.init()
  }

  init () {
    const observationsRepository = ObservationsRepository()
    this.dateManager = DateManager()
    this.system = System({observationsRepository, dateManager: this.dateManager})
  }
}

setWorldConstructor(CustomWorld)
