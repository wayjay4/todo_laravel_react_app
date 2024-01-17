import React, {useState} from "react";
import PropTypes from "prop-types";
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from "@/Pages/Todo/Components/TodoFilters.jsx";
import useToggle from "@/Pages/Todo/Hooks/useToggle.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    todosFiltered: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    markAsEditing: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    remaining: PropTypes.number.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completeAllTodos: PropTypes.func.isRequired,
}

function TodoList(props) {
    const [filter, setFilter] = useState('all');
    const [isFeaturesOneVisible, setIsFeaturesOneVisible] = useToggle();
    const [isFeaturesTwoVisible, setIsFeaturesTwoVisible] = useToggle();

    return (
        <>
            <TransitionGroup component="ul" className="todo-list">
                { props.todosFiltered(filter).map((todo) => (
                    <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
                        <li key={todo.id} className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" checked={!!todo.isComplete} onChange={() => props.completeTodo(todo.id)} />
                                { !todo.isEditing ?
                                    (<span style={{marginLeft: '16px'}} className={`todo-item-label, ${todo.isComplete ? 'line-through' : ''}`} onDoubleClick={()=>props.markAsEditing(todo.id)}>
                                                        {todo.title}
                                                    </span>)
                                    :
                                    (
                                        <input
                                            type="text"
                                            className="todo-item-input"
                                            defaultValue={todo.title}
                                            onBlur={(event) => props.updateTodo(event,todo.id)}
                                            onKeyDown={event => {
                                                if(event.key === 'Enter') {
                                                    props.updateTodo(event, todo.id);
                                                }
                                                else if(event.key === 'Escape') {
                                                    props.cancelEdit(todo.id);
                                                }
                                            }}
                                            autoFocus
                                        />
                                    )
                                }
                            </div>
                            <button onClick={()=>props.deleteTodo(todo.id)} className="x-button">
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
                    <TodoCompleteAll completeAllTodos={props.completeAllTodos} />

                    <TodoItemsRemaining remaining={props.remaining} />
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
                        todosFiltered={props.todosFiltered}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    <TodoClearCompleted clearCompleted={props.clearCompleted} />
                </div>
            </CSSTransition>
        </>
    )
}

export default TodoList;
