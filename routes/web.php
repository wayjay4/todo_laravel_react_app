<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [\App\Http\Controllers\TodoController::class, 'index'])->name('todos.index');
Route::post('/todos', [\App\Http\Controllers\TodoController::class, 'store'])->name('todos.store');
Route::post('/todos', [\App\Http\Controllers\TodoController::class, 'store'])->name('todos.store');
Route::delete('/todo/{todo}', [\App\Http\Controllers\TodoController::class, 'destroy'])->name('todo.destroy');
Route::patch('/todo/{todo}', [\App\Http\Controllers\TodoController::class, 'update'])->name('todo.update');
Route::patch('/todos/completeAllTodos', [\App\Http\Controllers\TodoController::class, 'completeAllTodos'])->name('todos.completeAllTodos');
Route::delete('/todos/clearCompletedTodos', [\App\Http\Controllers\TodoController::class, 'clearCompletedTodos'])->name('todos.clearCompletedTodos');
