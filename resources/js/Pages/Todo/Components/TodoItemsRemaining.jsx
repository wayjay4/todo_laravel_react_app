import React from "react";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

function TodoItemsRemaining() {
    const remaining = useTodoStore(state => state.remaining);

    return (
        <span>{remaining()} items remaining</span>
    )
}

export default TodoItemsRemaining;
