export interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: string;
}

export interface CreateTodoInput {
    title: string;
    completed: boolean;
    description?: string;
}

export interface UpdateTodoInput {
    title?: string;
    completed?: boolean;
    description?: string;
} 