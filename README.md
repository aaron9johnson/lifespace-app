![alt text](https://github.com/aaron9johnson/lifespace-app/blob/main/assets/images/logo.png?raw=true "LifeSpace")

# LifeSpace Mobile App

The LifeSpace mobile application is designed to streamline the end-to-end experience of discovering, customizing, and purchasing LifeSpace self-watering gardens. The app empowers users to visualize gardens within their real-world spaces, plan high-yield plantings, and embrace a curated gardening lifestyle that emphasizes both aesthetics and ease. The app promotes the LifeSpace brand as an elegant, results-driven solution tailored for modern, design-conscious users who value wellness and peace of mind.

## Useful Commands

1. Install:

   ```
   npm install
   ```

   ```
   npx expo install
   ```

2. Generate native iOS and Android project files:

   ```
   npx expo prebuild
   ```

3. iOS:

   ```
   cd ios && pod install && cd ..
   ```

4. Android:

   ```
   cd android && ./gradlew clean && cd ..
   ```

   ```
   cd android && ./gradlew build && cd ..
   ```

 - Generates apk -> app/build/outputs/apk/release/app-release.apk

5. Run:

   ```
   npx expo start
   ```

Install/Run:

```
npx expo install && npx expo prebuild && cd ios && pod install && cd .. && cd android && ./gradlew clean && ./gradlew build && cd .. && npx expo start
```

Aaron's Device:

```
react-native run-ios --udid 00008030-000425CC21F3802E
```

## Project Brief

### Target Audience

- High-income professionals (doctors, lawyers, dual-income households) who desire a low-maintenance, high-style gardening experience that fits their lifestyle.
- Existing and potential customers acquired via LifeSpace newsletters, retail partners, or post-purchase touchpoints.
- Landscape professionals seeking tools to enhance their client offerings with LifeSpace garden planning.

These users are willing to invest in beautiful, productive spaces, expect intuitive tools with guaranteed outcomes, and appreciate design-forward, simplified experiences over one-size-fits-all solutions.

### Platform

iOS and Android smartphones (iPad not supported)

### Core Features

#### Minimum Viable Product (MVP):

- Overlay garden models onto user photos
- Interactive garden condition quiz
- Drag-and-drop square-foot planting planner with pre-designed layout templates
- Integrated purchase experience (Buy button)
- Local device reminder notifications for planting and maintenance tasks
- Harvest yield projection based on selected layout and inputs
 
#### Planned Post-MVP Features:

- AI-driven plant troubleshooting assistant
- Geolocation-based condition recommendations
- Automatic garden scaling using printed reference (e.g., PDF with sizing markers)
- Calendar-based gardening task overview
- Gamified progress tracking (e.g., growth progress bars, difficulty scores)
- Augmented reality (AR) placement mode
- Push notifications for product updates and promotions
- Community planning templates (user-shared)
- "Ask a Pro" real-time expert support
 
### Third-Party Integrations

- Klaviyo for email capture and list growth
- Shopify for direct product purchase and order handling

### Limitations

- No user authentication or cloud-based user accounts
- No server infrastructure (local data storage only)
- No real-time content updates or cross-device sync

### Design Considerations

- Lifestyle-focused onboarding that speaks to aesthetics and ease
- Incorporate official LifeSpace branding, logo, and typography
- Use of Mandarin color palette for consistency with the LifeSpace website
- Visual infographics to explain garden components and use cases
- Clean, intuitive interface optimized for minimal cognitive load
- High-performance UI with smooth transitions and interactive animations

## Expo

This is an [Expo](https://expo.dev) project. 

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Resources

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

_@ Aaron Johnson 2025_
