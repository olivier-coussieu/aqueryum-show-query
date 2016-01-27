'use strict';

var zenContactServices = angular.module('zenContactServices', []);

zenContactServices.factory('contactService', function () {
    var instance = {};

    instance.contacts = [
        {"id": 0, "lastName": "Wayne", "firstName": "Bruce", "address": "Gotham city", "phone": "555-BATMAN"},
        {"id": 1, "lastName": "Parker", "firstName": "Peter", "address": "New York", "phone": "555-SPDRMN"},
        {"id": 2, "lastName": "Storm", "firstName": "Jane", "address": "Baxter building, New York", "phone": "555-INVGRL"},
        {"id": 3, "lastName": "Richards", "firstName": "Red", "address": "Baxter building, New York", "phone": "555-MRFANT"},
        {"id": 4, "lastName": "Storm", "firstName": "Johnny", "address": "Baxter building, New York", "phone": "555-TORCH"},
        {"id": 5, "lastName": "Grimm", "firstName": "Benjamin", "address": "Baxter building, New York", "phone": "555-THING"},
        {"id": 6, "lastName": "Murdock", "firstName": "Matt", "address": "San Francisco", "phone": "555-DARDVL"},
        {"id": 7, "lastName": "Stark", "firstName": "Tony", "address": "Stark tower, New York", "phone": "555-IRNMAN"}
    ];

    instance.getAllContacts = function () {
        return this.contacts;
    };

    instance.getContactById = function (id) {
        for (var i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                return this.contacts[i];
            }
        }
        return {};
    };

    instance.saveContact = function (contact) {
        if (contact.id) {
            for (var i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].id == contact.id) {
                    this.contacts.splice(i, 1, contact);
                }
            }
        } else {
            contact.id = this.contacts.length;
            this.contacts.push(contact);
        }
    };

    return instance;
});


