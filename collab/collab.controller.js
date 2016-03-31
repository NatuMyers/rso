(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollabController', CollabController);

    CollabController.$inject = ['CollabService', '$location', '$rootScope', 'FlashService'];
    function CollabController(CollabService, $location, $rootScope, FlashService) {

        var vm = this;

        vm.makeCollab = makeCollab;

        function makeCollab() {
            vm.dataLoading = true;
            CollabService.Create(vm.collab)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Collab make successful', true);
                        $location.path('/collab');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        return false;
        }
    }

})();
