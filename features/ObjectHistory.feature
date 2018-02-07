Feature: ObjectHistory
  As a user
  I want to be able to get the values of the attributes of an object in a past moment
  So that I can be aware of the state of the object on that moment

  Scenario: Object attribute history
    Given there is an object called "MyHouse"
    And it has an attribute "Color" with the value "White"
    
