import React from "react";
import {useForm} from "@inertiajs/react";

function TodoClearCompleted() {
    const { data, setData, delete: destroy, post, processing, errors } = useForm({
        //
    })

    function handleClearCompletedTodos() {
        destroy('/todos/clearCompletedTodos', {preserveScroll: true});
    }

    return (
        <div>
            <button className="button" onClick={handleClearCompletedTodos}>Clear completed</button>
        </div>
    )
}

export default TodoClearCompleted;
