# JSON Tree Viewer Documentation

# Overview

JSON Tree Viewer is a modern React-based web application that allows users to visualize JSON data in an interactive tree format using @xyflow/react (React Flow).
It provides a clean interface to explore, search, and analyze JSON structures effectively — suitable for both developers and learners.

# Github Link: https://github.com/ankitahuja98/Json-Tree-Viewer

# Live Link: https://jsontreeview.netlify.app/

# How to Run

git clone https://github.com/ankitahuja98/Json-Tree-Viewer

cd json-tree-viewer

npm install

npm run dev

Open http://localhost:5173 in your browser.

# Core Functionalities JSON Visualization

• Converts JSON objects into a structured, interactive tree.

• Each node represents a key/value or array element.

• Built using React Flow (@xyflow/react) for smooth zoom, drag, and node interactions.

# Search Functionality

• Users can search JSON keys or paths like:
o user.address.city

• Press Enter to execute search.

• If the path exists, the respective node is highlighted - Dark / Light Mode

• Toggle between light and dark themes using a switch in the top bar.

• The theme applies consistently across the entire app.

# Download as Image

• Allows users to export the visualized JSON tree as an image (PNG).

• Useful for documentation, sharing, or debugging JSON structures visually.

# Responsive & Modular UI

• Components are fully reusable and scalable.

• The layout adapts across screen sizes — built for both desktop and mobile.

# Tech Stack

• React.js – Frontend framework
• Vite – Bundler
• @xyflow/react – React Flow visualization
• Tailwind CSS – Styling
• JavaScript (ES6) – Logic

# Component Structure

• TopBar.jsx – Header with search and theme toggle
• JsonInput.jsx – JSON input and visualize options
• TreeVisualizer.jsx – Renders JSON as a tree graph
• App.css – Styles and themes
• App.jsx – Main application structure

# Usage Guide

1. Paste or edit JSON inside the input area.
2. Click Visualize to render it into a tree structure.
3. Use the search bar to find any JSON key/path (press Enter).
4. Toggle between Dark / Light mode for your preferred theme.
5. Optionally, download the tree as an image file.
