import { useCallback, useEffect, useState } from 'react';
import { Category, Priority, Todo } from '../types';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const stored = await loadTodosFromStorage();
            if (stored) setTodos(stored);
            setIsLoading(false);
        };
        load();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveTodosToStorage(todos);
        }
    }, [todos, isLoading]);

    const addTodo = useCallback(
        (text: string, priority: Priority = 'medium', category: Category = 'Personal') => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text,
                completed: false,
                priority,
                category,
                createdAt: Date.now(),
            };
            setTodos((prev) => [newTodo, ...prev]);
        },
        []
    );

    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    return { todos, isLoading, addTodo, toggleTodo, deleteTodo };
};
