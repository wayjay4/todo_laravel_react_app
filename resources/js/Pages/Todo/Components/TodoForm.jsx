import React, {useState} from 'react';
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";
import {useForm} from "@inertiajs/react";

function TodoForm() {
    const addTodo = useTodoStore(state => state.addTodo);
    const [todoInput, setTodoInput] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        title: '',
    })

    function handleInput(event) {
        setTodoInput(event.target.value);

        setData('title', event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(todoInput.trim().length === 0) {
            return;
        }

        addTodo(todoInput.trim());

        post('/todos', {preserveScroll: true});

        setTodoInput('');
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                value={todoInput}
                onChange={handleInput}
            />
        </form>
    );
}

export default TodoForm;
