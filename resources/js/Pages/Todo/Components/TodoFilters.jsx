import React from "react";
import PropTypes from "prop-types";

TodoFilters.prototype = {
    todosFiltered: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}

function TodoFilters(props) {
    return (
        <div>
            <button className={`button filter-button ${props.filter === 'all' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('all');
                props.todosFiltered('all');
            }}>All</button>
            <button className={`button filter-button ${props.filter === 'active' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('active');
                props.todosFiltered('active');
            }}>Active</button>
            <button className={`button filter-button ${props.filter === 'completed' ? 'filter-button-active' : ''}`} onClick={()=>{
                props.setFilter('completed');
                props.todosFiltered('completed');
            }}>Completed</button>
        </div>
    )
}

export default TodoFilters;
