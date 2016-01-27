'use strict';

//aShowQApp.controller('ContactListController', ['$scope', 'contactService', function ($scope, contactService) {
//    $scope.contacts = contactService.getAllContacts();
//}]);

aShowQApp.controller('ContactEditController', ['$scope', 'contactService', '$routeParams', '$location', function ($scope, contactService, $routeParams, $location) {
    if ($routeParams.id) {
        $scope.contact = contactService.getContactById($routeParams.id);
    } else {
        $scope.contact = {};
    }
    $scope.saveContact = function(contact) {
        contactService.saveContact(contact);
        $location.path("/list");                 // redirection vers la liste
    }
}]);
