import React, { useState, FormEvent } from 'react';
import { Todo, UpdateTodoInput } from '../types/todo';
import '../styles/TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, updates: UpdateTodoInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description || '');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onUpdate(todo._id, {
            ...todo,
            title: editedTitle,
            description: editedDescription || undefined
        });
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
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Add a description (optional)"
                    />
                    <div className="form-buttons">
                        <button type="submit" className="save-button">Save</button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="todo-content">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
                    />
                    <div className="todo-text">
                        <span className={todo.completed ? 'completed' : ''}>
                            {todo.title}
                        </span>
                        {todo.description && (
                            <p className={todo.completed ? 'completed' : ''}>
                                {todo.description}
                            </p>
                        )}
                    </div>
                    <div className="todo-buttons">
                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => onDelete(todo._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}; 