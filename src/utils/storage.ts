import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types';

const TODO_STORAGE_KEY = '@my_todo_app_data_v1';

export const saveTodosToStorage = async (todos: Todo[]) => {
    try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save todos:', e);
    }
};

export const loadTodosFromStorage = async (): Promise<Todo[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load todos:', e);
        return [];
    }
};
