import React, {useState} from "react";
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from "@/Pages/Todo/Components/TodoFilters.jsx";
import useToggle from "@/Pages/Todo/Hooks/useToggle.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

function TodoList() {
    const todosFiltered = useTodoStore(state => state.todosFiltered);
    const deleteTodo = useTodoStore(state => state.deleteTodo);
    const completeTodo = useTodoStore(state => state.completeTodo);
    const markAsEditing = useTodoStore(state => state.markAsEditing);
    const cancelEdit = useTodoStore(state => state.cancelEdit);
    const updateTodo = useTodoStore(state => state.updateTodo);

    const [filter, setFilter] = useState('all');
    const [isFeaturesOneVisible, setIsFeaturesOneVisible] = useToggle();
    const [isFeaturesTwoVisible, setIsFeaturesTwoVisible] = useToggle();

    return (
        <>
            <TransitionGroup component="ul" className="todo-list">
                { todosFiltered(filter).map((todo) => (
                    <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
                        <li key={todo.id} className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" checked={!!todo.isComplete} onChange={() => completeTodo(todo.id)} />
                                { !todo.isEditing ?
                                    (
                                        <span style={{marginLeft: '16px'}} className={`todo-item-label, ${todo.isComplete ? 'line-through' : ''}`} onDoubleClick={()=>markAsEditing(todo.id)}>
                                            {todo.title}
                                        </span>
                                    )
                                    :
                                    (
                                        <input
                                            type="text"
                                            className="todo-item-input"
                                            defaultValue={todo.title}
                                            onBlur={(event) => updateTodo(event,todo.id)}
                                            onKeyDown={event => {
                                                if(event.key === 'Enter') {
                                                    updateTodo(event, todo.id);
                                                }
                                                else if(event.key === 'Escape') {
                                                    cancelEdit(todo.id);
                                                }
                                            }}
                                            autoFocus
                                        />
                                    )
                                }
                            </div>
                            <button onClick={()=>deleteTodo(todo.id)} className="x-button">
                                <svg
                                    className="x-button-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>

            <div className="toggles-container">
                <button
                    className="button"
                    onClick={setIsFeaturesOneVisible}
                >
                    Features One Toggle
                </button>
                <button className="button" onClick={setIsFeaturesTwoVisible}>Features Two Toggle</button>
            </div>

            <CSSTransition
                in={isFeaturesOneVisible}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
            >
                <div className="check-all-container">
                    <TodoCompleteAll />

                    <TodoItemsRemaining />
                </div>
            </CSSTransition>

            <CSSTransition
                in={isFeaturesTwoVisible}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
            >
                <div className="other-buttons-container">
                    <TodoFilters
                        filter={filter}
                        setFilter={setFilter}
                    />

                    <TodoClearCompleted />
                </div>
            </CSSTransition>
        </>
    )
}

export default TodoList;
