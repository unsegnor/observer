const { setWorldConstructor } = require('cucumber')
const App = require('../../src/app.js')
const ObjectManager = require('../../src/InMemoryObjectAdapter.js')

class CustomWorld {
  constructor() {
    this.objectManager = ObjectManager()
    this.context = {}
    this.init()
  }

  restartTheSystem(){
    this.init()
  }

  init(){
    this.app = App({objectManager: this.objectManager})
  }
}

setWorldConstructor(CustomWorld)
