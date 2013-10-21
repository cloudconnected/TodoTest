Todo.service('TodoService', function ($log, $http, $q, HttpRequestUrlHelper) {

    function TodoService() {
        var self = this,
            baseEndpoint = "/todo/";

        self.get = function (page, pageSize) {
            var endpoint = baseEndpoint + "list/" + page + "/" + pageSize,
                deferred = $q.defer();

            $http.get(HttpRequestUrlHelper.ensureUniqueRequestUrl(endpoint), {
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        self.add = function (name) {
            var endpoint = baseEndpoint + "add",
                deferred = $q.defer(),
                request = {
                    'name': name
                };

            $http.post(endpoint, request, {
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        self.update = function(todo) {
            var endpoint = baseEndpoint + "update",
               deferred = $q.defer(),
               request = {
                   'todo': todo
               };
            
            $http.post(endpoint, request, {
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
        
        self.remove = function(id) {
            var endpoint = baseEndpoint + "remove",
                deferred = $q.defer(),
                request = {
                    'guid': id
                };

            $http.post(endpoint, request, {
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    }

    return new TodoService();
});
