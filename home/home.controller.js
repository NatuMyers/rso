(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;


        // USERS

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        // COLLABS

        function initCollabController() {
            loadCurrentCollab();
            loadAllCollabs();
        }

        function loadCurrentCollab() {
            CollabService.GetByCollabname($rootScope.globals.currentCollab.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllCollabs() {
            CollabService.GetAll()
                .then(function (users) {
                    vm.allCollabs = users;
                });
        }

        function deleteCollab(id) {
            CollabService.Delete(id)
            .then(function () {
                loadAllCollabs();
            });
        }



    }

})();
