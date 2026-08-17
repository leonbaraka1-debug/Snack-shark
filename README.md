# 🍿 Snack Shark

## 📌 Project Overview

Snack Shark is a modern single-page snack shop application built with React and Vite. The application allows users to browse available snacks, search and filter products, while providing an administrative interface for managing the snack inventory.

The project demonstrates the use of React components, state management, custom hooks, form handling, CRUD operations, client-side routing, responsive CSS styling, and API communication.

---

## 🎯 Project Objectives

The main objectives of this project are to:

- Build a functional Single Page Application using React.
- Create reusable and maintainable React components.
- Implement CRUD operations for snack products.
- Allow users to search and filter snacks.
- Manage application data using a custom React hook.
- Implement client-side navigation using React Router.
- Create a responsive and visually appealing user interface.
- Deploy the application using GitHub Pages.

---

## ✨ Features

### 🏠 Home Page

- Provides an introduction to Snack Shark.
- Includes a clear call-to-action for visiting the shop.
- Responsive and visually appealing layout.

### 🛍️ Shop Page

Users can:

- View available snacks.
- Search for snacks by name.
- Filter snacks by category.
- View snack information such as:
  - Name
  - Description
  - Category
  - Price
  - Stock

### 🔐 Admin Dashboard

The administrator can:

- Add new snacks.
- Edit existing snacks.
- Delete snacks.
- View the current snack inventory.
- Update snack information.

### 📝 Snack Management Form

The form allows administrators to enter:

- Snack name
- Description
- Category
- Price
- Stock quantity
- Image URL

The form also supports editing existing snacks and cancelling an edit.

### 🔎 Search and Filtering

The shop includes search functionality that allows users to quickly find snacks and filter them according to their category.

### 📱 Responsive Design

The application is designed to work across different screen sizes, including:

- Desktop computers
- Tablets
- Mobile devices

---

## 🛠️ Technologies Used

Technology| Purpose
React| Building the user interface
Vite| Development and production build tool
JavaScript (ES6+)| Application logic
CSS3| Styling and responsive design
React Router| Client-side navigation
JSON Server| Local REST API
Git & GitHub| Version control and collaboration
GitHub Pages| Deployment

---

## 📂 Project Structure

Snack-shark/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SnackCard.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── hooks/
│   │   └── useSnacks.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   └── Admin.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── db.json
├── package.json
├── vite.config.js
└── README.md

---

## 🔄 CRUD Operations

Snack Shark implements the four main CRUD operations:

Create

Administrators can add new snacks through the Add Snack form.

Read

The application retrieves and displays snack data from the API.

Update

Administrators can edit existing snack information.

Delete

Administrators can remove snacks from the inventory.

These operations are handled through the custom "useSnacks" hook.

---

## 🧩 Custom Hook

The project uses a custom React hook called:

useSnacks.js

The hook centralizes snack-related functionality, including:

- Fetching snacks
- Adding snacks
- Updating snacks
- Deleting snacks
- Managing loading states
- Managing error states

This keeps the components cleaner and makes the application easier to maintain.

---

## 🚀 Getting Started

1. Clone the repository

git clone https://github.com/leonbaraka1-debug/Snack-shark.git

2. Enter the project directory

cd Snack-shark

3. Install dependencies

npm install

4. Start the JSON Server

Open a terminal and run:

npm run server

The API runs on:

http://localhost:3001

5. Start the React application

Open another terminal and run:

npm run dev

Vite will provide a local development URL in the terminal.

---

## 🧪 Testing

The project includes Vitest for testing.

Run the tests using:

npm test

---

## 🏗️ Production Build

To create a production build:

npm run build

The production files will be generated inside the:

dist/

directory.

---

## 🌐 Deployment

Snack Shark is configured for deployment using GitHub Pages.

To deploy the project:

npm run deploy

The deployment creates a "gh-pages" branch containing the production build.

---

## 🔗 Live Demo

GitHub Repository:

https://github.com/leonbaraka1-debug/Snack-shark

GitHub Pages:

https://leonbaraka1-debug.github.io/Snack-shark/

«Note: The application uses JSON Server for its local API. When running the deployed version on GitHub Pages, the local JSON Server is not available unless the API is hosted separately.»

---

## 🎨 User Interface

The application uses a modern snack-shop design featuring:

- Gradient navigation bar
- Responsive navigation links
- Card-based snack displays
- Styled search controls
- Interactive buttons
- Form validation
- Hover effects
- Responsive layouts
- Consistent color scheme

The interface was designed to provide a simple and enjoyable experience for both customers and administrators.

---

## 📚 Learning Outcomes

Through this project, the following concepts were practiced:

- React functional components
- JSX
- Props
- React state
- "useState"
- "useEffect"
- Custom hooks
- Event handling
- Controlled forms
- CRUD operations
- API requests
- React Router
- Conditional rendering
- Array methods such as "map()" and "filter()"
- Responsive CSS
- Git and GitHub
- Branch management and merging
- GitHub Pages deployment

---

## 👨‍💻 Authors

Leon Baraka, Waynemark Ouma, Wanjiru Muthike, Michael Michie and Irvin Gitau

Snack Shark was developed as a React Single Page Application project demonstrating practical frontend development and version-control skills.

---

## 📄 License

This project was created for educational purposes.