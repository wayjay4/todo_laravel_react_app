import React from "react";
import PropTypes from "prop-types";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

TodoFilters.prototype = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}

function TodoFilters(props) {
    const todosFiltered = useTodoStore(state => state.todosFiltered);

    return (
        <div>
            <button className={`button filter-button ${props.filter === 'all' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('all');
                todosFiltered('all');
            }}>All</button>
            <button className={`button filter-button ${props.filter === 'active' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('active');
                todosFiltered('active');
            }}>Active</button>
            <button className={`button filter-button ${props.filter === 'completed' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('completed');
                todosFiltered('completed');
            }}>Completed</button>
        </div>
    )
}

export default TodoFilters;
