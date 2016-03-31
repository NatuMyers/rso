(function () {
    'use strict';

    angular
        .module('app')
        .factory('CollabService', CollabService);

    CollabService.$inject = ['$timeout', '$filter', '$q'];
    function CollabService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByCollabname = GetByCollabname;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getCollabs());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getCollabs(), { id: id });
            var collab = filtered.length ? filtered[0] : null;
            deferred.resolve(collab);
            return deferred.promise;
        }

        function GetByCollabname(collabname) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getCollabs(), { collabname: collabname });
            var collab = filtered.length ? filtered[0] : null;
            deferred.resolve(collab);
            return deferred.promise;
        }

        function Create(collab) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByCollabname(collab.collabname)
                    .then(function (duplicateCollab) {
                        if (duplicateCollab !== null) {
                            deferred.resolve({ success: false, message: 'Collab name "' + collab.collabname + '" is already taken' });
                        } else {
                            var collabs = getCollabs();

                            // assign id
                            var lastCollab = collabs[collabs.length - 1] || { id: 0 };
                            collab.id = lastCollab.id + 1;

                            // save to local storage
                            collabs.push(collab);
                            setCollabs(collabs);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(collab) {
            var deferred = $q.defer();

            var collabs = getCollabs();
            for (var i = 0; i < collabs.length; i++) {
                if (collabs[i].id === collab.id) {
                    collabs[i] = collab;
                    break;
                }
            }
            setCollabs(collabs);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var collabs = getCollabs();
            for (var i = 0; i < collabs.length; i++) {
                var collab = collabs[i];
                if (collab.id === id) {
                    collabs.splice(i, 1);
                    break;
                }
            }
            setCollabs(collabs);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getCollabs() {
            if(!localStorage.collabs){
                localStorage.collabs = JSON.stringify([]);
            }

            return JSON.parse(localStorage.collabs);
        }

        function setCollabs(collabs) {
            localStorage.collabs = JSON.stringify(collabs);
        }
    }
})();
