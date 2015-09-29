
angular.module( 'RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main = this;
    main.reps = [];
    main.congressType = 'reps';

    main.loading = false;

    main.apis = [
      {
        label: 'Zip',
        method: function (zip) {
          main.loading = true;
          reps('all', 'zip', zip).then(function (data) {
            main.loading = false;
            main.reps = data;
          });
        }
      },
      {
        label: 'Last Name',
        method: function (name) {
          main.loading = true;
          reps(main.congressType, 'name', name).then(function (data) {
            main.loading = false;
            main.reps = data;
          });
        }
      },
      {
        label: 'State',
        method: function (state) {
          main.loading = true;
          reps(main.congressType, 'state', state).then(function (data) {
            main.loading = false;
            main.reps = data;
          });
        }
      }
    ];

    main.criteria = main.apis[0];

  });

  angular
    .module('repsService', [])
    .factory('reps', function ($http) {
      var host = 'http://dgm-representatives.herokuapp.com';



    /**
    * @function search
    * @param (string) type - can be "all", "reps", "sens"
    * @param (string) critirea - can be "zip", "name", "state"
    * @param (string) query - can any string
    */

      function search(type, criteria, query) {
        search.loading = true;
        return $http
          .get(host + '/' + type + '/by-' + criteria + '/' + query)
          .then(function (response) {
            search.loading = false;
            return response.data;
          });
      }

      search.loading = false;

      return search;

      return search;
    });
