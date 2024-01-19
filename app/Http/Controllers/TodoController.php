<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Todo/TodosDB', [
            'todoss' => Todo::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validationData();
        $todo = new Todo();
        $todo['title'] = $data['title'];
        $todo->save();

        return to_route('todos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validationData();

        if(isset($data['isEditing'])) {
            $todo['isEditing'] = ($data['isEditing'] === 'true') ? 1 : 0;
        }

        if(isset($data['isComplete'])) {
            $todo['isComplete'] = ($data['isComplete'] === 'true') ? 1 : 0;
        }

        if(isset($data['title'])) {
            $todo['title'] = $data['title'];
        }

        $todo->save();

        return to_route('todos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo): void
    {
        $todo->delete();
    }

    public function completeAllTodos(UpdateTodoRequest $request): \Illuminate\Http\RedirectResponse
    {
        $ids = Todo::where('isComplete', 0)->pluck('id');

        Todo::whereIn('id', $ids)->update(['isComplete' => 1]);

        return to_route('todos.index');
    }

    public function clearCompletedTodos(UpdateTodoRequest $request): \Illuminate\Http\RedirectResponse
    {
        $ids = Todo::where('isComplete', 1)->pluck('id');

        Todo::whereIn('id', $ids)->delete();

        return to_route('todos.index');
    }
}
