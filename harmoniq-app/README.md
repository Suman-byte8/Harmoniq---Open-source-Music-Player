# Harmoniq Music Player - Native App

This is the React Native client for the Harmoniq Open Source Music Player, bootstrapped with React Native CLI and styled using NativeWind (Tailwind CSS).

## Tech Stack

- **Framework**: React Native
- **Styling**: NativeWind (Tailwind CSS v3)
- **Navigation**: React Navigation (To be added)

## Getting Started

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### 1. Install Dependencies

```sh
npm install
```

### 2. Start Metro Bundler

```sh
npm start
```

### 3. Run the App

Open a new terminal window and run:

**Android:**

```sh
npm run android
```

**iOS:**

```sh
npm run ios
```

_(Requires macOS and CocoaPods setup)_

## Windows Build Notes (Path Limit Fix)

If you encounter a `Filename longer than 260 characters` error while building on Windows, this has already been addressed in `android/app/build.gradle` by configuring CMake to use a shorter staging directory (`C:/tmp/harmoniq-cxx`).

If you still experience issues, consider enabling **Long Paths** in your Windows Registry or moving the project closer to the root of your drive (e.g., `C:/dev/harmoniq`).

## Styling (Tailwind CSS)

This project uses NativeWind v4 for styling.

- Global styles are defined in `global.css`.
- Tailwind configuration is located in `tailwind.config.js`.
- You can use standard Tailwind classes in the `className` prop of React Native components.

## Onboarding & Signup Flow

The app now begins with a dedicated onboarding screen before the signup form.

- `App.jsx` manages simple screen state between onboarding, signup, and home.
- The onboarding flow includes a hero illustration, feature highlights, and a clear `Next` action.
- The signup page is located at `src/screens/SignUp/SignUpScreen.jsx` and includes display name, username, email, password entry, and social sign-in buttons.

## Screen Folder Structure

Screens are organized into feature folders inside `src/screens` for clearer separation and reuse:

- `src/screens/Onboarding/OnboardingScreen.jsx`
- `src/screens/Onboarding/index.js`
- `src/screens/SignUp/SignUpScreen.jsx`
- `src/screens/SignUp/index.js`

This keeps screen-specific logic, layout, and styles isolated from the app entry point.
