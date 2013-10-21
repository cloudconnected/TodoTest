Todo.controller('TodoController', function ($scope, $log, TodoService) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.todos = [];
    $scope.newTodoName = "";

    $scope.init = function () {
        var promise = TodoService.get($scope.currentPage, $scope.pageSize);
        promise.then(function (response) {
            $scope.todos = response;
        });
    };

    $scope.addTodo = function () {
        if (!$scope.newTodoName) return;

        var promise = TodoService.add($scope.newTodoName);
        promise.then(function (response) {
            $scope.todos.push(new TodoViewModel(response.Id, $scope.newTodoName, false));
            $scope.newTodoName = "";
        });
    };

    $scope.removeTodo = function (id) {
        var promise = TodoService.remove(id);
        promise.then(function (response) {
            $scope.todos = _.reject($scope.todos, function (x) { return x.Id === id; });
        });
    };

    $scope.completeTodo = function(todo) {
        var promise = TodoService.update(todo);
        promise.then(function (response) {
            // ui updated by bindings
        });
    };

    $scope.hasAnyTodos = function () {
        return _.size($scope.todos) > 0;
    };

    function TodoViewModel(id, name, isComplete) {
        this.Id = id;
        this.Name = name;
        this.Completed = isComplete;
    }
});