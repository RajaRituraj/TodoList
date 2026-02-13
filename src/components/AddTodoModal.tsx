import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Category, Priority } from '../types';

interface AddTodoModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (text: string, priority: Priority, category: Category) => void;
}

const priorities: Priority[] = ['low', 'medium', 'high'];
const categories: Category[] = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];

const getPriorityColor = (p: Priority) => {
    switch (p) {
        case 'low': return '#4CAF50';
        case 'medium': return '#FFC107';
        case 'high': return '#FF5252';
        default: return '#ccc';
    }
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({ visible, onClose, onSubmit }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [category, setCategory] = useState<Category>('Personal');

    const handleSubmit = () => {
        if (text.trim()) {
            onSubmit(text, priority, category);
            setText('');
            setPriority('medium');
            setCategory('Personal');
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalContainer}
            >
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>New Task</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="What needs to be done?"
                        placeholderTextColor="#999"
                        value={text}
                        onChangeText={setText}
                        autoFocus={false}
                    />

                    <Text style={styles.label}>Priority</Text>
                    <View style={styles.chipContainer}>
                        {priorities.map((p) => (
                            <TouchableOpacity
                                key={p}
                                style={[
                                    styles.chip,
                                    priority === p && { backgroundColor: getPriorityColor(p), borderColor: getPriorityColor(p) },
                                    priority !== p && { borderColor: getPriorityColor(p) },
                                ]}
                                onPress={() => setPriority(p)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        priority === p ? { color: '#fff' } : { color: getPriorityColor(p) },
                                    ]}
                                >
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Category</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {categories.map((c) => (
                            <TouchableOpacity
                                key={c}
                                style={[
                                    styles.chip,
                                    category === c && styles.activeCategoryChip,
                                    category !== c && styles.inactiveCategoryChip,
                                ]}
                                onPress={() => setCategory(c)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        category === c ? styles.activeCategoryChipText : styles.inactiveCategoryChipText,
                                    ]}
                                >
                                    {c}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={[styles.submitButton, !text.trim() && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={!text.trim()}
                    >
                        <Text style={styles.submitButtonText}>Create Task</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        gap: 10,
    },
    horizontalScroll: {
        marginBottom: 30,
        flexGrow: 0,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeCategoryChip: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    inactiveCategoryChip: {
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    activeCategoryChipText: {
        color: '#fff',
    },
    inactiveCategoryChipText: {
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddTodoModal;
