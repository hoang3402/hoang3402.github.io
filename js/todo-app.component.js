angular.module("app").component("todoApp", {
    templateUrl: "../components/todoApp.html",
    controller: function () {
        this.todos = [];

        this.addTodo = function () {
            this.todos.push({
                text: this.todoText,
                done: false,
                editing: false,
            });
            this.todoText = "";
        };

        this.remaining = function () {
            var count = 0;
            angular.forEach(this.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
    },
});
