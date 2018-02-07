Feature: EditObject
  As a user
  I want to be able to edit existing object attributes
  So that I can retrieve their value later

  Scenario: Edit an object attribute
    Given there is an object called "MyHouse"
    When I set the attribute "Color" to "White"
    Then I should find an object with the name "MyHouse" in the system
    And it should have an attribute "Color" with the value "White"
