import React, { useState, FormEvent } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import '../styles/TodoApp.css';

export const TodoApp: React.FC = () => {
    const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [newTodoCompleted, setNewTodoCompleted] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        await addTodo({
            title: newTodoTitle,
            description: newTodoDescription,
            completed: newTodoCompleted
        });
        setNewTodoTitle('');
        setNewTodoDescription('');
        setNewTodoCompleted(false);
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
                <input
                    type="text"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                    placeholder="Add new todo description..."
                />
                <button type="submit">Add Todo</button>
            </form>

            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
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