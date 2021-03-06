@backends
Feature: Add second-tier backends

  Background:
    When I visit mist.io
    Then I wait for the mist.io splash page to load

  @all-backends
  Scenario Outline:
    When I click the button "Add cloud"
    And I wait for 1 seconds
    And I click the button "<provider>"
    And I wait for 1 seconds
    And I use my "<credentials>" credentials
    And I click the button "Add"
    Then the "<provider>" backend should be added within 30 seconds
    And I wait for 3 seconds

    Examples: Providers
    | provider              | credentials  |
    | Azure                 | AZURE        |
    | DigitalOcean          | DIGITALOCEAN |
    | GCE                   | GCE          |
    | HP Helion Cloud       | HP           |
    | Linode                | LINODE       |
    | NephoScale            | NEPHOSCALE   |
    | Rackspace             | RACKSPACE    |
    | SoftLayer             | SOFTLAYER    |
#    | VMware vCloud         | VMWARE       |
#    | Indonesian Cloud      | INDONESIAN   |
    | KVM (via libvirt)     | LIBVIRT      |
#    | OpenStack             | OPENSTACK    |
#    | EC2                   | EC2          |
#    | Docker                | DOCKER       |

  @backend-actions
  Scenario: Backend Actions
    Given "Rackspace" backend has been added
    When I click the button "Rackspace"
    And I rename the backend to "Renamed"
    And I click the "OK" button inside the "Edit cloud" popup
    And I wait for 1 seconds
    And I click the "_x_" button inside the "Edit cloud" popup
    And I wait for 1 seconds
    Then the "Renamed" backend should be added within 3 seconds
    When I wait for 1 seconds
    When I click the button "Renamed"
    And I click the button "Delete"
    And I click the button "Yes"
    And I wait for 1 seconds
    Then the "Renamed" backend should be deleted
