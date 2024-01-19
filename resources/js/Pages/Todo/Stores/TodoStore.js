import create from 'zustand';

const useTodoStore = create((set, get) => ({
    name: (localStorage.getItem('name')) ? JSON.parse(localStorage.getItem('name')) : '',
    saveNameInLocalStorage: (name) => localStorage.setItem('name', JSON.stringify(name)),
    handleNameInput: (event) => set(() => ({
        name: event.target.value,
    })),
    todos: (localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : [],
    setTodos: (todos) => {
        const idForTodo = todos.slice(-1).pop()['id']+1;
        set(state => ({todos: todos, idForTodo: idForTodo}));
        get().saveIdForTodoInLocalStorage(idForTodo);
    },
    saveTodosInLocalStorage: (todos) => localStorage.setItem('todos', JSON.stringify(todos)),
    idForTodo: (localStorage.getItem('idForTodo')) ? JSON.parse(localStorage.getItem('idForTodo')) : 1,
    saveIdForTodoInLocalStorage: (idForTodo) => localStorage.setItem('idForTodo', JSON.stringify(idForTodo)),
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
    addTodo: (todoTitle) => {
        set(state => ({
            todos: [
                ...state.todos,
                {
                    id: state.idForTodo,
                    title: todoTitle,
                    isComplete: false,
                    isEditing: false,
                }
            ],
            idForTodo: state.idForTodo +1,
        }));

        get().saveIdForTodoInLocalStorage(get().idForTodo);
    },
    clearCompleted: () => set(state => ({
        todos: [...state.todos].filter(todo => !todo.isComplete),
    })),
    deleteTodo: (id) => set(state => ({
        todos: [...state.todos].filter((todo) => todo.id !== id),
    })),
    completeTodo: (id) => set(state => ({
        todos: state.todos.map(todo => {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }

            return todo;
        }),
    })),
    markAsEditing: (id) => set(state => ({
        todos: state.todos.map(todo => {
            if(todo.id === id) {
                todo.isEditing = true;
            }

            return todo;
        }),
    })),
    cancelEdit: (id) => set(state => ({
        todos: state.todos.map(todo => {
            if(todo.id === id) {
                todo.isEditing = false;
            }

            return todo;
        }),
    })),
    completeAllTodos: () => set(state => ({
        todos: state.todos.map(todo => {
            todo.isComplete = true;

            return todo;
        })
    })),
    updateTodo: (event, id) => set(state => ({
        todos: state.todos.map(todo => {
            if(todo.id === id) {
                if(event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }

                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        }),
    })),
    remaining: () => get().todos.filter(todo => !todo.isComplete).length,
}));

export default useTodoStore;
