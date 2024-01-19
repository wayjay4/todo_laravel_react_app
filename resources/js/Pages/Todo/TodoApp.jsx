import {useEffect, useMemo, useRef} from "react";
import { Head } from '@inertiajs/react';
import NoTodos from './Components/NoTodos';
import TodoList from './Components/TodoList';
import TodoForm from "@/Pages/Todo/Components/TodoForm.jsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

export default function TodoApp() {
    const todos = useTodoStore(state => state.todos);
    const name = useTodoStore(state => state.name);
    const handleNameInput = useTodoStore(state => state.handleNameInput);
    const nameInputEl = useRef(null);

    useEffect(() => {
        nameInputEl.current.focus();
    }, []);

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

                <TodoForm />

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={todos.length > 0}
                        timeout={300}
                        classNames="slide-vertical"
                        unmountOnExit
                    >
                        { todos.length > 0 ?
                            (
                                <TodoList />
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
