module.exports = function({objectManager}){
  return Object.freeze({
    reset,
    createObject,
    find,
    set
  })

  function reset(){}

  function createObject({name}){
    objectManager.create({name})
  }

  function find({name}){
    return objectManager.find({name})
  }

  function set({objectName, attribute, value}){
    objectManager.set({objectName, attribute, value})
  }
}
