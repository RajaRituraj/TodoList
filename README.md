# My Tasks - React Native Todo App

A beautiful, fully functional Todo application built with React Native and Expo. Perfect for portfolio demonstration.

## Features
- **Create Tasks**: Add tasks with Priority (Low, Medium, High) and Category.
- **Task Management**: Mark tasks as complete, delete them with smooth animations.
- **Persistence**: Data is saved locally using AsyncStorage, ensuring tasks remain after app restart.
- **Analytics**: View completion stats and tasks breakdown by Priority and Category.
- **Filtering**: Easily filter tasks by Active or Completed status.
- **Clean UI**: Modern, clean design with rounded corners and subtle shadows.

## Tech Stack
- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Animations**: React Native Reanimated
- **Storage**: AsyncStorage
- **Icons**: Ionicons (@expo/vector-icons)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the app**:
    ```bash
    npx expo start
    ```

3.  **Run on Device/Emulator**:
    - Press `i` for iOS Simulator
    - Press `a` for Android Emulator
    - Scan QR code with Expo Go app on physical device

## Project Structure

```
/
├── app/                  # Expo Router screens
│   ├── (tabs)/           # Main tab navigation
│   │   ├── index.tsx     # Tasks List Screen
│   │   ├── explore.tsx   # Analytics Screen
│   │   └── _layout.tsx   # Tab Configuration
│   └── _layout.tsx       # Root Layout
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom hooks (useTodos)
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Helper functions (storage)
└── assets/               # Images and fonts
```

## License
MIT
