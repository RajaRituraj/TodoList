import { useTodos } from '@/src/hooks/useTodos';
import { Category, Priority } from '@/src/types';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CompletionCard = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Completion Rate</Text>
      <View style={styles.completionContainer}>
        <View style={styles.circularProgress}>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
        <View style={styles.completionDetails}>
          <Text style={styles.statValue}>{completed} / {total}</Text>
          <Text style={styles.statLabel}>Tasks Completed</Text>
        </View>
      </View>
    </View>
  );
};

const PriorityStats = ({ todos }: { todos: any[] }) => {
  const priorities: Priority[] = ['low', 'medium', 'high'];
  const counts = priorities.reduce((acc, p) => ({ ...acc, [p]: todos.filter(t => t.priority === p).length }), {} as Record<Priority, number>);
  const total = todos.length;

  const getPercentage = (count: number) => total > 0 ? (count / total) * 100 : 0;

  const colors = { low: '#4CAF50', medium: '#FFC107', high: '#FF5252' };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>By Priority</Text>
      {priorities.map(p => (
        <View key={p} style={styles.statRow}>
          <Text style={styles.statLabelText}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${getPercentage(counts[p])}%`, backgroundColor: colors[p] }]} />
          </View>
          <Text style={styles.statCount}>{counts[p]}</Text>
        </View>
      ))}
    </View>
  );
};

const CategoryStats = ({ todos }: { todos: any[] }) => {
  const categories: Category[] = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];
  const counts = categories.reduce((acc, c) => ({ ...acc, [c]: todos.filter(t => t.category === c).length }), {} as Record<Category, number>);
  const total = todos.length;

  // Sort by count desc
  const sortedCategories = categories.sort((a, b) => counts[b] - counts[a]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>By Category</Text>
      {sortedCategories.map(c => (
        counts[c] > 0 && (
          <View key={c} style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{c}</Text>
            </View>
            <Text style={styles.statCount}>{counts[c]} tasks</Text>
          </View>
        )
      ))}
      {total === 0 && <Text style={styles.noDataText}>No data to display</Text>}
    </View>
  );
};

export default function AnalyticsScreen() {
  const { todos } = useTodos();
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Analytics</Text>

        <CompletionCard completed={completedCount} total={totalCount} />
        <PriorityStats todos={todos} />
        <CategoryStats todos={todos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#007AFF', // Simplified circle
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    backgroundColor: '#F0F8FF',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  completionDetails: {
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabelText: {
    width: 70,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'right',
  },
  categoryRow: { // Fix: Added categoryRow style
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  noDataText: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  }
});
