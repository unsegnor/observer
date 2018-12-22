Feature: ObjectHistory
  As a user
  I want to be able to get the values of the attributes of an object in a past moment
  So that I can be aware of the state of the object on that moment

  Scenario: Basic history
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    When Raquel asks the system on 2003-10-20 about the color of the house on 2003-10-20
    Then the system must say that the color of the house was red on 2001-10-20 at 11:20:30

  Scenario: Overriden value
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    And Raquel registered on 2002-10-20 at 11:00:00 that the color of the house was green on 2001-10-21 at 10:00:00
    When Raquel asks the system on 2003-10-20 about the color of the house on 2003-10-20 at 10:00:00
    Then the system must say that the color of the house was green on 2001-10-21 at 10:00:00

  Scenario: Not overriden value
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    And Raquel registered on 2002-10-20 at 11:00:00 that the color of the house was green on 2001-10-19 at 10:00:00
    When Raquel asks the system on 2003-10-20 about the color of the house on 2003-10-20 at 10:00:00
    Then the system must say that the color of the house was red on 2001-10-20 at 11:20:30

  Scenario: Ask for a past moment
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    And Raquel registered on 2002-10-20 at 11:00:00 that the color of the house was green on 2001-10-21 at 10:00:00
    When Raquel asks the system on 2003-10-20 about the color of the house on 2001-10-20 at 12:00:00
    Then the system must say that the color of the house was red on 2001-10-20 at 11:20:30

  Scenario: Ask about an overriden past moment
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    And Raquel registered on 2002-10-20 at 11:00:00 that the color of the house was green on 2001-10-21 at 10:00:00
    When Raquel asks the system on 2003-10-20 about the color of the house on 2002-10-20 at 10:30:00
    Then the system must say that the color of the house was green on 2001-10-21 at 10:00:00

  Scenario: Ask for what we knew about a past moment
    Given Raquel registered on 2002-10-20 at 10:00:00 that the color of the house was red on 2001-10-20 at 11:20:30
    And Raquel registered on 2002-10-20 at 11:00:00 that the color of the house was green on 2001-10-21 at 10:00:00
    When Raquel asks the system on 2003-10-20 about the color of the house on 2002-10-20 at 10:30:00 that we knew on 2002-10-20 at 10:30:00
    Then the system must say that the color of the house was red on 2001-10-20 at 11:20:30

  Scenario: Simplified formats
    If the user does not specify the observation date it is taken the register date

    Given Raquel registered on 2000-01-01 at 10:00:00 that the color of the house was red
    And Raquel registered on 2000-01-01 at 10:02:00 that the color of the house was green
    When Raquel asks the system on 2000-01-01 at 10:05:00 about the color of the house
    Then the system must say that the color of the house was green on 2000-01-01 at 10:02:00

  Scenario: Different subjects
    Given Raquel registered on 2000-01-01 at 10:00:00 that the color of the house was red
    And Raquel registered on 2000-01-01 at 10:02:00 that the color of the door was brown
    When Raquel asks the system on 2000-01-01 at 10:05:00 about the color of the house
    Then the system must say that the color of the house was red on 2000-01-01 at 10:00:00

  Scenario: Different attributes
    Given Raquel registered on 2000-01-01 at 10:00:00 that the color of the house was red
    And Raquel registered on 2000-01-01 at 10:02:00 that the size of the house was big
    When Raquel asks the system on 2000-01-01 at 10:05:00 about the color of the house
    Then the system must say that the color of the house was red on 2000-01-01 at 10:00:00
