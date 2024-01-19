import React, {useState} from 'react';
import useTodoStore from "@/Pages/Todo/Stores/TodoStore.js";

function TodoForm() {
    const addTodo = useTodoStore(state => state.addTodo);
    const [todoInput, setTodoInput] = useState('');

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(todoInput.trim().length === 0) {
            return;
        }

        addTodo(todoInput.trim());

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
