import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

export const useTodos = () => {
    const [state, setState] = useState<TodosState>({
        todos: [],
        loading: false,
        error: null
    });

    const fetchTodos = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const data = await todoService.getAllTodos();
            setState(prev => ({ ...prev, todos: data, error: null }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred'
            }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const addTodo = async (newTodo: CreateTodoInput) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const created = await todoService.createTodo(newTodo);
            setState(prev => ({
                ...prev,
                todos: [...prev.todos, created],
                error: null
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred'
            }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const updateTodo = async (id: string, updates: UpdateTodoInput) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const updated = await todoService.updateTodo(id, updates);
            setState(prev => ({
                ...prev,
                todos: prev.todos.map(todo => todo._id === id ? updated : todo),
                error: null
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred'
            }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const deleteTodo = async (id: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await todoService.deleteTodo(id);
            setState(prev => ({
                ...prev,
                todos: prev.todos.filter(todo => todo._id !== id),
                error: null
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred'
            }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return {
        ...state,
        addTodo,
        updateTodo,
        deleteTodo
    };
}; 