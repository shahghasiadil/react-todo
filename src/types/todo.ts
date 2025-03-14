export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: string;
}

export interface CreateTodoInput {
    title: string;
    completed: boolean;
}

export interface UpdateTodoInput {
    title?: string;
    completed?: boolean;
} 