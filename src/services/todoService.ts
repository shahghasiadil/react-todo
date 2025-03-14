import axios, { AxiosError } from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api/todos';

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const todoService = {
    async getAllTodos(): Promise<Todo[]> {
        try {
            const response = await axios.get<Todo[]>(API_BASE_URL);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new ApiError(error instanceof AxiosError ? error.message : 'Failed to fetch todos');
        }
    },

    async createTodo(todo: CreateTodoInput): Promise<Todo> {
        try {
            const response = await axios.post<Todo>(API_BASE_URL, todo);
            return response.data;
        } catch (error) {
            throw new ApiError(error instanceof AxiosError ? error.message : 'Failed to create todo');
        }
    },

    async updateTodo(id: string, updates: UpdateTodoInput): Promise<Todo> {
        try {
            const response = await axios.patch<Todo>(`${API_BASE_URL}/${id}`, updates);
            return response.data;
        } catch (error) {
            throw new ApiError(error instanceof AxiosError ? error.message : 'Failed to update todo');
        }
    },

    async deleteTodo(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
        } catch (error) {
            throw new ApiError(error instanceof AxiosError ? error.message : 'Failed to delete todo');
        }
    }
}; 