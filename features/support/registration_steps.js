const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('{user} registered on {date} that the {attribute} of the {subject} was {value} on {date}', async function (user, registerDate, attribute, subject, value, observationDate) {
  await this.dateManager.setCurrentDate(registerDate)
  await this.system.register({
    authentication: user.authentication,
    subject,
    attribute,
    value,
    observationDate
  })
})

Given('{user} registered on {date} that the {attribute} of the {subject} was {value}', async function (user, registerDate, attribute, subject, value) {
  await this.dateManager.setCurrentDate(registerDate)
  await this.system.register({
    authentication: user.authentication,
    subject,
    attribute,
    value
  })
})

When('{user} asks the system on {date} about the {attribute} of the {subject} on {date}', async function (user, requestDate, attribute, subject, observationDate) {
  await this.dateManager.setCurrentDate(requestDate)
  this.context.result = await this.system.getValue({
    authentication: user.authentication,
    subject,
    attribute,
    observationDate
  })
})

When('{user} asks the system on {date} about the {attribute} of the {subject}', async function (user, requestDate, attribute, subject) {
  await this.dateManager.setCurrentDate(requestDate)
  this.context.result = await this.system.getValue({
    authentication: user.authentication,
    subject,
    attribute
  })
})

Then('the system must say that the {attribute} of the {subject} was {value} on {date}', function (attribute, subject, value, date) {
  expect(this.context.result.value).to.equal(value)
  expect(this.context.result.attribute).to.equal(attribute)
  expect(this.context.result.subject).to.equal(subject)
  expect(this.context.result.date).to.equal(date)
})

