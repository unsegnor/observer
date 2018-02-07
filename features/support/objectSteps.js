const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('there is no object in the system', async function () {
  await this.app.reset()
});

When('I create an object with the name {string}', async function (name) {
  this.context.objectName = name
  await this.app.createObject({name})
});

Given('I created an object with the name {string}', async function (name) {
  this.context.objectName = name
  await this.app.createObject({name})
});

Given('I restart the system', async function () {
  await this.restartTheSystem()
});

Then('I should find an object with the name {string} in the system', async function (name) {
  var foundObjects = await this.app.find({name})
  expect(foundObjects).to.be.an('array').that.is.not.empty
  var foundObject = foundObjects[0]
  expect(foundObject.name).to.equal(name)

  this.context.currentObject = foundObject
});

Given('there is an object called {string}', async function (name) {
  this.context.objectName = name
  await this.app.createObject({name})
});

When('I set the attribute {string} to {string}', async function (attributeName, value) {
  await this.app.set({
    objectName: this.context.objectName,
    attribute: attributeName,
    value
  })
});

Then('it should have an attribute {string} with the value {string}', async function (attributeName, value) {
  expect(this.context.currentObject[attributeName]).to.equal(value)
});

Given('it has an attribute {string} with the value {string}', async function (attributeName, value) {
  await this.app.set({
    objectName: this.context.objectName,
    attribute: attributeName,
    value
  })
});
