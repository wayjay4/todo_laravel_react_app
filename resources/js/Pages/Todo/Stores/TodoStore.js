import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
    name: (localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : '',
    handleNameInput: (event) => {
        set(() => ({name: event.target.value.trim()}));
        localStorage.setItem('name', JSON.stringify(get().name));
    },
    todos: [],
    setTodos: (todos) => {
        set(state => ({todos: todos}));
    },
    todosFiltered: (filter) => {
        if(filter === 'all') {
            return get().todos;
        }
        else if(filter === 'active') {
            return get().todos.filter(todo => !todo.isComplete);
        }
        else if(filter === 'completed') {
            return get().todos.filter(todo => todo.isComplete);
        }
    },
    remaining: () => get().todos.filter(todo => !todo.isComplete).length,
}));

export default useTodoStore;
