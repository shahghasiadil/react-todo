import React, { useState, FormEvent } from 'react';
import { Todo, UpdateTodoInput } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, updates: UpdateTodoInput) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onUpdate(todo.id, { ...todo, title: editedTitle });
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="todo-content">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onUpdate(todo.id, { completed: !todo.completed })}
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                    </span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
            )}
        </div>
    );
}; 