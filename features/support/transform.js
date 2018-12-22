const {defineParameterType} = require('cucumber')

defineParameterType({
  regexp: /(\d\d\d\d)-(\d\d)-(\d\d)(?: at (\d\d):(\d\d):(\d\d))?/,
  transformer: function (year, month, day, hour, minute, second) {
    if (hour !== undefined && minute !== undefined && second !== undefined) {
      return `${year}-${month}-${day}T${hour}:${minute}:${second}`
    } else {
      return `${year}-${month}-${day}`
    }
  },
  name: 'date'
})

defineParameterType({
  regexp: /Raquel/,
  transformer: function (user) {
    return user
  },
  name: 'user'
})

defineParameterType({
  regexp: /color|size/,
  transformer: function (attributeId) {
    return attributeId
  },
  name: 'attribute'
})

defineParameterType({
  regexp: /house|door/,
  transformer: function (subjectId) {
    return subjectId
  },
  name: 'subject'
})

defineParameterType({
  regexp: /red|green|brown|big/,
  transformer: function (valueId) {
    return valueId
  },
  name: 'value'
})
