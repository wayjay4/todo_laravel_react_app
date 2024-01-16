import {useState} from "react";
import { Head } from '@inertiajs/react';
import NoTodos from './Components/NoTodos';
import TodoList from './Components/TodoList';
import TodoForm from "@/Pages/Todo/Components/TodoForm.jsx";

export default function TodoApp() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'Finish React Series',
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Make Dinner',
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Take over world',
            isComplete: false,
            isEditing: false,
        },
    ]);

    const [idForTodo, setIdForTodo] = useState(4);

    function addTodo(todo) {
        setTodos([...todos, {
            id: idForTodo,
            title: todo,
            isComplete: false,
            isEditing: false
        }]);
        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
    }

    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    function completeTodo(id) {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isEditing = true;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                if(event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }

                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function cancelEdit(id) {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isEditing = false;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function remaining() {
        return todos.filter(todo => !todo.isComplete).length;
    }

    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.isComplete));
    }

    function completeAllTodos() {
        const updatedTodos = todos.map(todo => {
            todo.isComplete = true;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function todosFiltered(filter) {
        if(filter === 'all') {
            return todos;
        }
        else if(filter === 'active') {
            return todos.filter(todo => !todo.isComplete);
        }
        else if(filter === 'completed') {
            return todos.filter(todo => todo.isComplete);
        }
    }

    return (
        <div className="todo-app-container">
            <Head title="Todo App" />

            <div className="todo-app">
                <h2>Todo App</h2>

                <TodoForm addTodo={addTodo} />

                { todos.length > 0 ?
                    (
                        <TodoList
                            todos={todos}
                            todosFiltered={todosFiltered}
                            completeTodo={completeTodo}
                            markAsEditing={markAsEditing}
                            updateTodo={updateTodo}
                            cancelEdit={cancelEdit}
                            deleteTodo={deleteTodo}
                            remaining={remaining}
                            clearCompleted={clearCompleted}
                            completeAllTodos={completeAllTodos}
                        />
                    )
                    :
                    (
                        <NoTodos />
                    )
                }
            </div>
        </div>
    );
}
