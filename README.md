# SaySwitch — A Starter Pack for Agency Banking POS App

## Project Overview

### Description

SaySwitch is a modular and efficient starter pack for building agency banking applications using Expo and React Native. This project is a **mobile agency banking POS application** designed to facilitate banking services for agents, allowing them to conduct transactions on behalf of customers. The app supports essential agency banking features such as deposits, withdrawals, bill payments, and transaction management, specifically aimed at empowering agents to provide these services without needing P2P (peer-to-peer) functionalities.

### Goal

The goal of SaySwitch is to create a reusable and flexible starter template for agency banking apps, enabling easy customization and scalability. While the backend is under development, the app simulates real-time interactions using locally stored data.

## Core Philosophy

### 1. Efficiency Over Complexity

SaySwitch focuses on simplicity, maintaining a clean codebase while providing sufficient functionality to kickstart an agency banking project. We avoid unnecessary complexity to favor a straightforward building approach.

### 2. Seamless Transition from Mock to Real Backend

Designed to consume backend APIs, SaySwitch uses local storage to simulate interactions in the absence of a live backend. This makes the transition from mock data to real data seamless.

### 3. Modularity and DRY (Don’t Repeat Yourself)

SaySwitch adheres to a modular architecture, ensuring components, contexts, and services are reusable while emphasizing DRY principles to minimize code redundancy.

### 4. Scalable State Management

Utilizing the Context API for state management ensures scalability and easy expansion without overhauling the system.

### 5. User-Centric Design

SaySwitch is designed with the user in mind, emphasizing accessibility, usability, and a smooth onboarding experience.

## Tech Stack

- **Frontend**: React Native (Expo)
- **State Management**: Context API
- **Styling**: Tailwind CSS (via NativeWind for React Native)
- **API Layer**: Custom service setup with placeholder data stored locally
- **Push Notifications**: Expo Notifications API
- **Location Services**: Expo Location API
- **Local Storage Fallback**: AsyncStorage (simulating backend data)

## Key Features

- **Onboarding and KYC Flow**: A multi-step onboarding process including user registration, document upload, and KYC verification.
- **Agency Banking Services**: Support for services like airtime recharge, bill payments, and more.
- **Transactions**: Simulated money transfers, deposits, and withdrawals.
- **Card Management**: Basic card details (placeholder).
- **Push Notifications**: Notifications for successful transactions and KYC completion.
- **Fallback Data Storage**: Placeholder backend with schema-driven dummy data synchronized with local storage.

## Features

### 1. **Agent Dashboard**
   - Provides a summary of recent transactions, account balance, and notifications.
   - Easy navigation to key functions like deposits, withdrawals, and payments.

### 2. **Cash Deposits and Withdrawals**
   - Agents can perform cash deposit and withdrawal transactions on behalf of customers.
   - Transaction details are recorded, and receipts can be generated.

### 3. **Bill Payments**
   - Support for utility payments, including electricity, water, and airtime top-ups.
   - Payment status tracking and receipts for customers.

### 4. **Transaction History**
   - Comprehensive history of all transactions performed by the agent.
   - Search and filter options to locate specific transactions quickly.

### 5. **Customer Management**
   - Store customer details securely for repeat transactions.
   - Transaction summaries and receipts available per customer.

### 6. **Security and Authentication**
   - Two-factor authentication (2FA) for secure agent login.
   - Biometric login options where supported.

### 7. **Reporting and Analytics**
   - Daily, weekly, and monthly transaction summaries.
   - Visual insights into transaction volumes, types, and revenue generated.

## App Structure

```plaintext

root/
│
├── app/                # Main app folder for Expo Router
│   ├── _layout.js      # Main layout for the app
│   ├── (auth)/         # Authentication-related screens
│   │   ├── _layout.js  # Layout for auth screens
│   │   ├── login.js    # Login screen
│   │   ├── onboarding.js # Onboarding screen
│   │   └── welcome.js  # Welcome screen
│   └── (tab)/          # Tab-related screens
│       ├── _layout.js  # Layout for tab screens
│       ├── home.js     # Home screen
│       ├── profile.js   # Profile screen
│       └── transactions.js # Transactions screen
│
├── hooks/              # Custom hooks for data fetching and logic
│
├── contexts/           # Contexts for state management
│
├── services/           # API services for backend interaction
│
└── assets/             # Static files such as images and icons

```

---

## Navigation Overview

### 1. **Auth Stack**

The authentication flow is managed through a stack navigator. This includes the following screens:

- **Login**: The screen where users enter their credentials to log in.
- **Register**: The screen for new users to create an account.
- **Onboarding**: An introductory screen that guides users through the app's features after registration.

### 2. **Main Stack**

Once the user is authenticated, they are taken to the main application, which is organized using tab navigation. The main stack includes:

- **Dashboard**: The home screen showing an overview of user activities.
- **Transactions**: A screen where users can view their transaction history.
- **Card Management**: A section for managing payment cards.
- **KYC Status**: A screen displaying the user's Know Your Customer (KYC) status.

### 3. **Tab Navigation**

Within the main stack, a tab navigator allows users to switch between the following key services:

- **Home**: Directs to the Dashboard.
- **Transactions**: Quick access to transaction details.
- **Profile**: User profile settings and information.

## Setup Instructions

1. **Install Required Packages**:

   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
   ```

2. **Implement Navigation in App**:

   - Wrap your app in a `NavigationContainer`.
   - Create the `AuthStack` for authentication screens.
   - Create the `MainTabs` for the main application flow.

3. **Context Management**:
   - Use context to manage authentication state and user information.
   - Conditionally render the `AuthStack` or `MainTabs` based on the user's authentication status.

Feel free to modify any sections or add more details as needed!

---

## Theme Colors

### 1. **Color Palette**

- **Primary Color:** Vibrant Green (#4CAF50)
- **Secondary Color:** Bright Yellow (#FFEB3B)
- **Accent Color:** Greenish Yellow (#C0D95A)

### 2. **Color Usage**

- **Backgrounds:**

  - Light Background: Use a light neutral color (e.g., #F9F9F9) to ensure readability and make the vibrant colors pop.
  - Dark Background: Consider a dark shade (e.g., #2C2C2C) for dark mode with lighter text for contrast.

- **Buttons:**

  - **Primary Buttons:** Use Vibrant Green for main actions (e.g., "Submit," "Next").
  - **Secondary Buttons:** Bright Yellow for less critical actions (e.g., "Cancel," "Back").
  - **Accent Buttons:** Greenish Yellow for highlighting important notifications or actions.

- **Text:**
  - Use dark colors (e.g., #333333) for regular text on light backgrounds and light colors (e.g., #FFFFFF) on dark backgrounds.
  - Consider using Greenish Yellow for accent text or highlights to draw attention.

### 3. **Typography**

- **Font Choice:** Choose a clean and modern font (like Inter, Roboto, or Poppins) for readability and a friendly appearance.
- **Headings:** Use bold weights for headings in the Primary Color or Accent Color to ensure they stand out.
- **Body Text:** Regular weight in dark colors for readability, with a slight increase in line height for better legibility.

### 4. **UI Elements**

- **Forms:**
  - Input Fields: Use a border color that aligns with the primary color for focused elements. For example, a light green border on focus.
  - Placeholders: Use a light gray (#B0B0B0) for placeholders to keep the UI clean.
- **Icons:**

  - Use solid or outlined icons in the Primary Color or Accent Color. This keeps them consistent and vibrant.

- **Cards/Containers:**
  - Background color for cards can be white or light gray with a shadow effect to make them pop off the background.
  - Use a subtle border in the Primary or Accent Color to enhance visibility.

### 5. **Light/Dark Mode**

- Implement a toggle for light/dark mode that adjusts backgrounds, text, and button colors accordingly, ensuring consistency across themes.

### 6. **Accessibility Considerations**

- Ensure that text has sufficient contrast against backgrounds for readability.
- Use color combinations that are colorblind-friendly, utilizing patterns or shapes in addition to color to convey information.

### 7. **Example Color Schemes**

Here’s a simple representation of how your color palette could be organized:

| Element          | Color                     |
| ---------------- | ------------------------- |
| Primary Color    | #388E3C (Green)           |
| Secondary Color  | #FFEB3B (Yellow)          |
| Accent Color     | #C0D95A (Greenish Yellow) |
| Background Light | #F9F9F9                   |
| Background Dark  | #2C2C2C                   |
| Text Light       | #FFFFFF                   |
| Text Dark        | #333333                   |
| Placeholder      | #B0B0B0                   |

### 8. **Implementation**

Utility classes for each of these colors for easy application throughout your components.

---

## App Flow

### User Journey

1. **Onboarding**: New users are guided through a multi-step onboarding process.
2. **KYC Verification**: Users complete document uploads for KYC verification.
3. **Dashboard Access**: After onboarding, users are directed to the dashboard to access services.
4. **Transaction Flow**: Users can initiate transactions, view transaction history, and manage cards.

---

## KYC Flow

### Steps in KYC Process

1. **User Information**: Collect basic user information.
2. **Document Upload**: Users upload identification documents.
3. **Review and Submit**: Users review their information and submit for verification.
4. **Status Check**: Users can check the status of their KYC application from the dashboard.

---

## Onboarding Flow

### Onboarding Steps

1. **Welcome Screen**: Introduce the app and its features.
2. **Account Creation**: Input for email, password, and phone number.
3. **Profile Setup**: Additional details like name and address.
4. **KYC Notification**: Inform users about the KYC process post-registration.

---

## State Management

The app uses **Context API** for handling global states such as user authentication, transactions, and agency services. Each context is modular and reusable, allowing easy integration into various components.

### Context API Setup

- Create separate contexts for **Authentication**, **Transactions**, and **User Profile**.
- Each context should manage its state and provide functions for updating data and handling user interactions.

## Backend Simulation

SaySwitch is designed to make API calls to a backend service. Since the backend isn’t ready, we simulate it with local storage. This allows the app to function as if it were interacting with a live server, providing an effective development experience.

## Push Notifications and Location Services

- **Push Notifications**: Integrated for transaction updates, KYC completion, and other user actions.
- **Location Services**: Utilized to autofill address forms or provide location-based services for convenience.

## Development Roadmap

- **Phase 1**: Define data models and implement onboarding flow with local storage placeholders.
- **Phase 2**: Implement agency banking services (airtime, bill payment, etc.).
- **Phase 3**: Add push notifications and location services.
- **Phase 4**: Finalize structure for API calls, ready for backend integration.

---

## Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Dr-dyrane/sayswitch.git
   cd sayswitch
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** (if necessary):

   - Create a `.env` file at the root of the project and define your variables. Ensure sensitive information like API keys are stored here.

4. **Run the application**:

   ```bash
   expo start
   ```

5. **Build the application for Android Play Store and APK**:

   Use these commands to generate a production-ready APK or submit to the Play Store:

   ```bash
   eas build --platform android
   eas build -p android --profile preview2
   ```

   - The `preview2` profile in `eas.json` is configured to generate APK files. You can modify this profile to suit different build needs.
  
6. **OTA (Over-the-Air) Updates with EAS**:

   After the APK has been generated and deployed, you can push over-the-air updates (such as JavaScript or asset changes) without requiring users to download a new version from the Play Store.

   To send an update to all users:

   ```bash
   eas update
   eas update --branch preview2
   ```

   This will push your latest changes to users who have installed your app.

### Key Notes:
- **`eas update`** allows you to update the app without needing a full rebuild and Play Store re-submission. Ideal for minor fixes or improvements.
- Ensure that `expo-updates` is installed and properly configured to enable OTA updates in your app.

--- 

## UX/UI Philosophy

As we develop SaySwitch, we must explore our design philosophy. Here are the key considerations:

### 1. User-Centric Design

- **Simplicity**: The interface should be functional and intuitive, allowing users to perform essential actions (transfers, payments, KYC) without confusion.
- **Accessibility**: Design accommodates various users, ensuring larger touch targets, clear labels, and proper color contrast.
- **Familiarity**: Emulate standard banking app layouts to reduce the learning curve for users.

### 2. Minimalistic UI with Tailwind CSS

- **Theme**: Maintain a clean, modern, and minimalistic design, with consistent spacing, typography, and color palettes.
- **Customization**: Keep the design adaptable for different brand identities using the starter pack.
- **Dark Mode**: Implement a dark theme option for user convenience in low-light environments.

### 3. Onboarding Experience

- **Step-by-Step Guide**: Break down onboarding into smaller steps with progress indicators to prevent overwhelming users.
- **Interactive Feedback**: Provide instant feedback on form fields to enhance user engagement.
- **Smooth Transitions**: Ensure seamless transitions between onboarding steps.

### 4. Fluid Interactions and Animations

- **Micro-interactions**: Use small animations for button presses and notifications to enhance user experience.
- **Loading States**: Clearly indicate loading times during form submissions or data retrieval.

## UX/UI Discussion for Next Steps

To tackle the UI/UX design step by step:

1. **Wireframes First, Design Later**

   - Create wireframes for core screens (onboarding, dashboard, transactions, KYC) to visualize flow without focusing on visual details.
   - Use tools like **Figma** or **Sketch** for rough designs.

2. **Component-Based Design**

   - Utilize reusable components in React and Tailwind CSS.
   - Maintain a **component library** for design consistency.

3. **Responsive Design**

   - Focus on mobile-first design, ensuring a smooth experience on smaller screens.
   - Make key flows like payments and onboarding mobile-friendly.

4. **Iterative UX Testing**
   - Gather feedback on wireframes or designs from potential users to identify friction points.

---

## Documentation

### 1. **Documentation Standards**

- **Code Comments:**

  - Use clear and concise comments within your code to explain the purpose of functions, components, and complex logic. This will help future developers (or yourself) understand the code when revisiting it later.
  - For example:
    ```jsx
    // This button submits the form data
    <button type="submit" className="btn-primary">
    	Submit
    </button>
    ```

- **README File:**

  - Create a comprehensive `README.md` file for your project. Include:
    - Project overview
    - Installation instructions
    - Usage guidelines
    - Contribution guidelines
    - License information

- **Component Documentation:**
  - Consider using a documentation tool like Storybook or Styleguidist for documenting your UI components. This will allow you to showcase components in isolation with their respective props and usage examples.

### 2. **Accessibility Best Practices**

- **Semantic HTML:**

  - Use semantic HTML elements (`<header>`, `<footer>`, `<nav>`, `<main>`, `<article>`, etc.) to ensure the structure is meaningful and navigable for screen readers.

- **Button Accessibility:**

  - Always include accessible labels for buttons using `aria-label` when necessary, especially when the button content is not descriptive enough. For example:
    ```jsx
    <button aria-label="Submit form" className="btn-primary">
    	<i className="icon-submit" />
    </button>
    ```

- **Hidden Labels:**

  - For form fields, use visually hidden labels to improve accessibility. This can be done using a utility class that hides elements visually but keeps them accessible to screen readers:
    ```jsx
    <label htmlFor="username" className="sr-only">Username</label>
    <input id="username" type="text" className="input-field" />
    ```

- **Keyboard Navigation:**

  - Ensure that all interactive elements (buttons, links, form controls) are keyboard navigable. Test your application using the keyboard alone to navigate through the UI.

- **Color Contrast:**
  - Maintain sufficient color contrast between text and background colors. Use tools like the WebAIM Contrast Checker to ensure compliance with WCAG 2.1 guidelines.

### 3. **Additional Accessibility Features**

- **Focus States:**

  - Clearly define focus styles for interactive elements (e.g., buttons, links) to make it easy for keyboard users to see where they are on the page:
    ```css
    .btn-primary:focus {
    	outline: 3px solid #ffd700; /* Gold outline */
    }
    ```

- **Aria Roles and Properties:**

  - Use ARIA roles and properties to enhance accessibility, especially for custom components that do not use native HTML elements:
    ```jsx
    <div role="alert" aria-live="assertive">
    	Your changes have been saved.
    </div>
    ```

- **Language Attribute:**
  - Set the language of the document in your HTML `<html>` tag to assist screen readers:
    ```html
    <html lang="en"></html>
    ```

### 4. **Testing for Accessibility**

- **Automated Testing Tools:**

  - Utilize tools like Axe, Lighthouse, or WAVE to run accessibility audits on your application and identify areas for improvement.

- **User Testing:**
  - Include users with disabilities in your testing process to gather real feedback on accessibility and usability.

### 5. **Continuous Improvement**

- **Update Documentation Regularly:**

  - As your codebase evolves, make sure to keep the documentation up to date. Review comments and README files regularly.

- **Accessibility Audits:**
  - Schedule regular audits of your application to ensure ongoing compliance with accessibility standards as new features are added.

## ChatGPT Request Prompt

**Code Request Prompt:**

"I'm working on a React Native project that requires code with the following criteria:

1. **Functionality:** [Specify the functionality you need, e.g., a user login form, a data fetching component, etc.].
2. **Best Practices:** Ensure the code follows best practices, including modular design, DRY (Don't Repeat Yourself) principles, and clean code.
3. **User-Centric Design:** Implement a user-friendly interface with clear navigation and intuitive user interactions.
4. **Styling:** Use Tailwind CSS for styling components, ensuring a responsive and modern look.
5. **Documentation:** Include thorough documentation and comments explaining the code and its functionality.
6. **Error Handling:** Implement robust error handling to manage potential issues gracefully.
7. **Loading States:** Handle loading states effectively, providing users with feedback during data fetching or processing.
8. **Fallbacks:** Include fallbacks for critical functionalities to enhance reliability.
9. **Validation:** Incorporate input validation for user inputs to ensure data integrity.
10. **Clean Code:** Maintain a clean and readable code structure.

Please provide a complete example with any necessary explanations."

---

You can replace the "[Specify the functionality you need]" part with your specific requirements whenever you use this prompt. This will ensure that the code you receive aligns with your standards and expectations.

---

## Conclusion

SaySwitch aims to deliver a comprehensive, user-friendly agency banking app starter pack. Through efficient design and robust architecture, we can ensure a seamless experience for users while maintaining the flexibility for future enhancements.
