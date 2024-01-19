import React from "react";
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";
import {useForm} from "@inertiajs/react";

function TodoCompleteAll() {
    const completeAllTodos = useTodoStore(state => state.completeAllTodos);

    const { data, setData, patch, post, processing, errors } = useForm({
        //
    })

    function handleCompleteAllTodos() {
        completeAllTodos();

        patch('/todos/completeAllTodos');
    }

    return (
        <div>
            <div onClick={handleCompleteAllTodos} className="button">Check All</div>
        </div>
    )
}

export default TodoCompleteAll;
