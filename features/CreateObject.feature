Feature: CreateObject
  As a user
  I want to create objects in the system
  In order to recover them later

  Scenario: Create an object
    Given there is no object in the system
    When I create an object with the name "MyHouse"
    Then I should find an object with the name "MyHouse" in the system

  Scenario: Object persistence
    Objects must persist between system runs

    Given I created an object with the name "MyHouse"
    When I restart the system
    Then I should find an object with the name "MyHouse" in the system
