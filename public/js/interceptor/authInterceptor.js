angular.module('myblog').factory('auth', function($q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) $location.path('/login');
            return $q.reject(response);
        }
    };
});