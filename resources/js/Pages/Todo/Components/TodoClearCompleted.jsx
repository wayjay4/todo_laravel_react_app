import React from "react";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

function TodoClearCompleted() {
    const clearCompleted = useTodoStore(state => state.clearCompleted);

    return (
        <div>
            <button className="button" onClick={clearCompleted}>Clear completed</button>
        </div>
    )
}

export default TodoClearCompleted;
