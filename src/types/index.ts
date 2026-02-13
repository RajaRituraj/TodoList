export type Priority = 'low' | 'medium' | 'high';
export type Category = 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Other';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: Priority;
    category: Category;
    createdAt: number;
    dueDate?: number;
}
