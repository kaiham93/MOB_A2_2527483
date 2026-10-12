# KMAPortfolio

My name is KHALIL ABDEEN HAMID MUSA.

## Application Overview
- **App Name:** KMAPortfolio
- **Student Name:** KHALIL ABDEEN HAMID MUSA
- **Registration Number:** 2527483
- **Verification Code:** MOB-A2-7483
- **Purpose:** A professional personal portfolio mobile application built to showcase identity, skills, education, and projects to recruiters offline.

## Core Features
- Mandatory identity introduction and verification code display.
- Five genuine skills and a structured education timeline.
- Interactive project portfolio with dedicated detail screens.
- Profile editor with field-level validation rules (headline ≥ 5 chars, bio ≥ 15 chars, skill required).
- Profile media handling: pick from gallery, capture with camera, or remove photo (via expo-image-picker).
- Local profile persistence using AsyncStorage.
- Full offline usability in Airplane Mode (all data stored locally, default avatar is a bundled asset).
- Standalone Android release build via EAS Build.

## Tech Stack
- React Native 0.81 + Expo SDK 54
- @react-native-async-storage/async-storage (local persistence)
- expo-image-picker (profile photo gallery/camera)
- EAS Build (standalone APK)

## Setup and Run Commands
1. Clone the repository and navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Open on a device/emulator:
   - Scan the QR code with the Expo Go app (Android), or
   - Press `a` to launch an Android emulator.

## Building the Standalone Android APK
1. Install the EAS CLI and log in with your Expo account:
   ```bash
   npm install -g eas-cli
   eas login
   ```
2. Build the APK using the `preview` profile:
   ```bash
   eas build -p android --profile preview
   ```
3. When the build finishes, download the APK from the provided build link and install it on any Android device.

## Offline (Airplane Mode) Testing
1. Install the standalone APK on a physical Android device.
2. Enable Airplane Mode.
3. Open the app — the identity screen, verification code, skills, education timeline, project details, and the profile editor all work with no internet connection.

## Evidence
- `evidence/MOB_A2_2527483_DECLARATION.pdf` — signed declaration of authorship.
- `evidence/MOB_A2_2527483_UIUX.pdf` — UI/UX design documentation.
- `evidence/MOB_A2_2527483_TEST_LOG.pdf` — manual testing log.
