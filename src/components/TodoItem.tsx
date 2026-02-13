import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const PriorityColor = {
    low: '#4CAF50',
    medium: '#FFC107',
    high: '#FF5252',
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <Animated.View
            entering={FadeInDown}
            layout={Layout.springify()}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.contentContainer}>
                <View style={styles.checkbox}>
                    {todo.completed ? (
                        <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
                    ) : (
                        <Ionicons name="ellipse-outline" size={28} color="#ccc" />
                    )}
                </View>
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.text,
                            todo.completed && styles.completedText,
                        ]}
                        numberOfLines={2}
                    >
                        {todo.text}
                    </Text>
                    <View style={styles.metaContainer}>
                        <View style={[styles.badge, { backgroundColor: PriorityColor[todo.priority] + '20' }]}>
                            <Text style={[styles.badgeText, { color: PriorityColor[todo.priority] }]}>
                                {todo.priority.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.category}>{todo.category}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#FF5252" />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 12,
        color: '#888',
    },
    deleteButton: {
        padding: 8,
    },
});

export default TodoItem;
