import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = '#007AFF';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#fff'
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? "list" : "list-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? "stats-chart" : "stats-chart-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
