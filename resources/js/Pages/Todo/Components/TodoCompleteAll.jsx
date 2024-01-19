import React from "react";
import {useForm} from "@inertiajs/react";

function TodoCompleteAll() {
    const { data, setData, patch, post, processing, errors } = useForm({
        //
    })

    function handleCompleteAllTodos() {
        patch('/todos/completeAllTodos', {preserveScroll: true});
    }

    return (
        <div>
            <div onClick={handleCompleteAllTodos} className="button">Check All</div>
        </div>
    )
}

export default TodoCompleteAll;
