import {useEffect, useMemo, useRef} from "react";
import { Head } from '@inertiajs/react';
import NoTodos from './Components/NoTodos';
import TodoList from './Components/TodoList';
import TodoForm from "@/Pages/Todo/Components/TodoForm.jsx";
import useLocalStorage from "@/Pages/Todo/Hooks/useLocalStorage.js";
import {CSSTransition, SwitchTransition} from "react-transition-group";

export default function TodoApp() {
    const [name, setName] = useLocalStorage('name', '')
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);

    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

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

    function remainingCalculations() {
        return todos.filter(todo => !todo.isComplete).length;
    }

    const remaining = useMemo(remainingCalculations, [todos]);

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

    useEffect(() => {
        nameInputEl.current.focus();
    }, []);

    function handleNameInput(event) {
        setName(event.target.value);
    }

    return (
        <div className="todo-app-container">
            <Head title="Todo App" />

            <div className="todo-app">
                <div className="name-container">
                    <h2>What is your name?</h2>
                    <form action="#">
                        <input
                            type="text"
                            ref={nameInputEl}
                            className="todo-input"
                            placeholder="What is your name"
                            value={name}
                            onChange={handleNameInput}
                        />
                    </form>

                    <CSSTransition
                        in={name.length > 0}
                        timeout={300}
                        classNames="slide-vertical"
                        unmountOnExit
                    >
                        <p className="name-label">Hello, {name}</p>
                    </CSSTransition>
                </div>

                <h2>Todo App</h2>

                <TodoForm addTodo={addTodo} />

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={todos.length > 0}
                        timeout={300}
                        classNames="slide-vertical"
                        unmountOnExit
                    >
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
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}
