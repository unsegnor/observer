module.exports = function(){
  var objects = [];

  return Object.freeze({
    create,
    find,
    set
  })

  function create({name}){
    objects.push({name})
  }

  function find({name}){
    return objects.filter(function(item){
      return (item.name === name)
    })
  }

  function set({objectName, attribute, value}){
    var foundObject = objects.find(function(item){
      return (item.name === objectName)
    })

    foundObject[attribute] = value
  }
}
