@test @aqa @administrator @wefox
Feature: Administrator test a-qa

    Background: Open the Wefox administrator login page
        Given I visit the Wefox administrator login page

    @visitor @guest
    Scenario: I am a guest visitor of the platform and I reach the login
        Then I check that I am really on the login page by the title of the page "Anmeldung – wefox"

    @user @aqa
    Scenario: I as a user of the platform entered to login
        Given I enter my email in the username input "aqawefox+testtecnico@wefoxgroup.com"
        Given I enter my password in the password input "demo1234"
        Given I click on the submit button of the login form
        Given I access the initial page of my profile and check if my image exists
        Given I access my contracts view
        Given I access my personal detail information view
        Given I get all user information and save in json
        Then I click on the logout button and reach the main page of the web that should have this title "So geht Versicherung heute. Dein Leben. Deine Entscheidung | wefox"
