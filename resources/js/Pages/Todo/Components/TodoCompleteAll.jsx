import React from "react";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

function TodoCompleteAll() {
    const completeAllTodos = useTodoStore(state => state.completeAllTodos);

    return (
        <div>
            <div onClick={completeAllTodos} className="button">Check All</div>
        </div>
    )
}

export default TodoCompleteAll;
