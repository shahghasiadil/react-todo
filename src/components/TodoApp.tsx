import React, { useState, FormEvent } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';

export const TodoApp: React.FC = () => {
    const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        await addTodo({
            title: newTodoTitle,
            completed: false
        });
        setNewTodoTitle('');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="todo-app">
            <h1>Todo App</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Add new todo..."
                />
                <button type="submit">Add Todo</button>
            </form>

            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>

            <div className="todo-stats">
                <p>Total: {todos.length}</p>
                <p>Completed: {todos.filter(todo => todo.completed).length}</p>
            </div>
        </div>
    );
}; 