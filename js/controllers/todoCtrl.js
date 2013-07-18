//rodo ctrl with ajax request
app.controller('todoCtrl', function ($scope, $http) {
    //your server in web
    var url = 'http://levzhynskyi.com/todo/items';

    var todoId;
    var todoDone;

    delete $http.defaults.headers.common['X-Requested-With'];

    //default variables
    $scope.newTodo = '';
    $scope.showError = false;
    $scope.add = true;
    $scope.todos = [];

    //default upload info
    ($scope.refreshTodos = function() {
        $http.get(url).success(function (data) {
            $scope.todos = data;
            $scope.showError = false;
        })
    })();

    //add Todo
    function postTodo() {
        $http.post(url,
            {text: $scope.newTodo, done: false}
        ).success(function () {
            $scope.refreshTodos();
            $scope.newTodo = '';})
        .error(function () {
            $scope.showError = true;
        })
    }

    function updateTodo(todoText) {
        $http.put(url + '/' + todoId, {text: todoText, done: todoDone}).success(function () {
            $scope.refreshTodos();
            $scope.newTodo = '';
            $scope.add = true;
        }).error(function (data) {
                $scope.showError = true;
            })
    }

    function deleteTodo(todoId) {
        $http.delete(url+ '/' + todoId)
            .success(function () {
                $scope.refreshTodos();
            })  .error(function () {
                $scope.showError = true;
            })
    }

    //delete all Items with method delete
    $scope.deleteAllDone = function() {
        for(var i=0, n = $scope.todos.length; i < n; i++) {
            if ($scope.todos[i].done) {
                deleteTodo($scope.todos[i]._id);
            }
        }
    };

    $scope.updateDone = function (todo) {
        todoId = todo._id;
        todoDone = todo.done;
        updateTodo(todo.text);
    };

    $scope.revision = function (todo) {
        $scope.newTodo = todo.text;
        todoId = todo._id;
        todoDone = todo.done;
        $scope.add = false;
    };

    $scope.updateTodo = updateTodo;
    $scope.postTodo = postTodo;



});
