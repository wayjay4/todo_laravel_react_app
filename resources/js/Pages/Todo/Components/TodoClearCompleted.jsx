import React from "react";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";
import {useForm} from "@inertiajs/react";

function TodoClearCompleted() {
    const clearCompleted = useTodoStore(state => state.clearCompleted);

    const { data, setData, delete: destroy, post, processing, errors } = useForm({
        //
    })

    function handleClearCompletedTodos() {
        clearCompleted();

        destroy('/todos/clearCompletedTodos');
    }

    return (
        <div>
            <button className="button" onClick={handleClearCompletedTodos}>Clear completed</button>
        </div>
    )
}

export default TodoClearCompleted;
