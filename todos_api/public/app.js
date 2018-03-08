/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);
    $(`#todoInput`).keypress(function(event){
        if(event.which == 13) {     // which is key code value. and 13 is Enter key
            createTodo();
        }
    });
    
    $(`.list`).on(`click`, `li`, function(){
        updateTodo($(this));
    })
    
    $('.list').on('click', `span`, function(event){
        event.stopPropagation();        // the event triggers first on the span and it runs whatever we have.
        deleteTodo($(this).parent());
    });
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + "<span>X</span></li>");
    newTodo.data('id', todo._id);     //jQuery is just holding this in memory. newTodo has a data ID of one
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);    
}

function createTodo(){
    //send request to create new todo
    var usrInput = $(`#todoInput`).val();
    $.post('/api/todos', {name: usrInput})
    .then(function(newTodo){
         $(`#todoInput`).val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}

function deleteTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = `/api/todos/` + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    });
}

function updateTodo(todo){
    var clickedId = todo.data('id');
    var updateUrl = `/api/todos/` + clickedId;
    var isDone = !todo.data(`completed`);
    var updateData = {completed: isDone};
    $.ajax({
         method: 'PUT',
         url: updateUrl,
         data: updateData
    })
    .then(function(updateTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    });
}
