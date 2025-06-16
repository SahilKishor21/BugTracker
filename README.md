# 🐛 Bug/Task Tracker

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-JSX-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-FF6B6B?style=for-the-badge)

**A comprehensive, modern bug and task tracking application built with Next.js 14, featuring role-based authentication, time tracking, and a beautiful responsive UI.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠 Technology Stack](#-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [💻 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🏃‍♂️ Running Locally](#️-running-locally)
- [👤 User Roles & Permissions](#-user-roles--permissions)
- [🔐 Demo Credentials](#-demo-credentials)
- [📱 Responsive Design](#-responsive-design)
- [🎨 UI Components](#-ui-components)
- [📊 State Management](#-state-management)
- [🔄 Workflow](#-workflow)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [🔮 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)

---

## 🎯 Overview

The **Bug/Task Tracker** is a full-featured project management application designed for development teams. It provides comprehensive task management, bug tracking, time monitoring, and team collaboration features with a beautiful, responsive interface that works seamlessly across all devices.

### Key Highlights
- 🔐 **Role-based Authentication** - Developer and Manager roles with specific permissions
- 📊 **Interactive Dashboard** - Real-time statistics and trend visualizations
- ⏱️ **Time Tracking** - Detailed time logging with historical analytics
- 🔄 **Approval Workflow** - Manager oversight for task completion
- 🌓 **Theme Support** - Dark/Light/System theme with persistence
- 📱 **Fully Responsive** - Mobile-first design that works everywhere
- 🎨 **Modern UI** - Built with ShadCN/UI components and Tailwind CSS

---

## ✨ Features

### 🔐 Authentication & Authorization
- [x] **Simple Login System** with mock authentication
- [x] **Role-based Access Control** (Developer/Manager)
- [x] **Persistent Sessions** with automatic logout
- [x] **Protected Routes** with authentication guards
- [x] **User Profile Management**

### 📊 Dashboard & Analytics
- [x] **Comprehensive Dashboard** with real-time statistics
- [x] **Task Statistics Cards** (Total, In Progress, High Priority, Time Spent)
- [x] **Interactive Charts** showing 7-day task trends
- [x] **Recent Tasks Overview** with quick actions
- [x] **Role-specific Data Filtering**

### 📋 Task & Bug Management
- [x] **Full CRUD Operations** (Create, Read, Update, Delete)
- [x] **Comprehensive Task Fields**:
  - Title, Description, Type (Bug/Feature/Enhancement/Task)
  - Priority (Low/Medium/High), Status (Open/In Progress/Testing/Pending Approval/Closed)
  - Assignee, Creator, Due Date, Time Tracking
- [x] **Advanced Filtering System**:
  - Status, Priority, Type, Assignee (Manager only)
  - Search functionality across title and description
- [x] **Multiple Sorting Options**:
  - Created Date, Updated Date, Due Date, Priority, Status
  - Ascending/Descending order toggle
- [x] **Task Detail Views** with complete information

### ⏱️ Time Tracking
- [x] **Time Entry Logging** with date, hours, minutes, and description
- [x] **Historical Time Entries** with detailed breakdown
- [x] **Automatic Time Summation** per task
- [x] **Manager Visibility** into team time tracking
- [x] **Time Analytics** and reporting

### 🔄 Workflow Management
- [x] **Status Progression** with validation rules
- [x] **Approval Workflow**:
  - Developers request approval for task closure
  - Managers can approve or reopen tasks
  - Pending approval state management
- [x] **Role-based Permissions**:
  - Developers: Manage own tasks, request approvals
  - Managers: View all tasks, approve/reject closures

## 🛠 Technology Stack

### Frontend Framework
- **[Next.js 14.2.15](https://nextjs.org/)** - React framework with App Router
- **[React 18.3.1](https://reactjs.org/)** - JavaScript library for building user interfaces

### Styling & UI
- **[Tailwind CSS 3.3.6](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN/UI](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon pack

### State Management
- **[Zustand 4.4.7](https://zustand-demo.pmnd.rs/)** - Small, fast, and scalable state management
- **[Zustand Persist](https://github.com/pmndrs/zustand)** - Persistence middleware

### Data Visualization
- **[Recharts 2.8.0](https://recharts.org/)** - Composable charting library for React

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io/)** - CSS vendor prefixing

### Utilities
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[class-variance-authority](https://cva.style/)** - Creating variants with class names

---

## 📁 Project Structure

```
bug-tracker/
├── 📄 README.md                    
├── 📄 package.json                 
├── 📄 next.config.js                
├── 📄 tailwind.config.js           
├── 📄 postcss.config.js             
├── 📄 components.json               
├── 📄 .eslintrc.json             
├── 📄 .gitignore                   
├── 📁 public/                      
│   └── 📄 favicon.ico
├── 📁 src/                         
│   ├── 📁 app/                    
│   │   ├── 📄 globals.css
│   │   ├── 📄 layout.js
│   │   ├── 📄 page.js
│   │   ├── 📁 login/
│   │   │   └── 📄 page.js
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.js
│   │   └── 📁 tasks/
│   │       ├── 📄 page.js
│   │       ├── 📁 new/
│   │       │   └── 📄 page.js
│   │       └── 📁 [id]/
│   │           ├── 📄 page.js
│   │           └── 📁 edit/
│   │               └── 📄 page.js
│   ├── 📁 components/
│   │   ├── 📁 ui/
│   │   │   ├── 📄 button.jsx
│   │   │   ├── 📄 input.jsx
│   │   │   ├── 📄 card.jsx
│   │   │   ├── 📄 badge.jsx
│   │   │   ├── 📄 select.jsx
│   │   │   ├── 📄 textarea.jsx
│   │   │   ├── 📄 dialog.jsx
│   │   │   ├── 📄 label.jsx
│   │   │   ├── 📄 tabs.jsx
│   │   │   └── 📄 dropdown-menu.jsx
│   │   ├── 📄 theme-provider.jsx
│   │   ├── 📄 theme-toggle.jsx
│   │   ├── 📄 login-form.jsx
│   │   ├── 📁 dashboard/
│   │   │   ├── 📄 dashboard-stats.jsx
│   │   │   ├── 📄 task-chart.jsx
│   │   │   └── 📄 recent-tasks.jsx
│   │   ├── 📁 tasks/
│   │   │   ├── 📄 task-list.jsx
│   │   │   ├── 📄 task-card.jsx
│   │   │   ├── 📄 task-form.jsx
│   │   │   ├── 📄 task-filters.jsx
│   │   │   └── 📄 time-tracker.jsx
│   │   ├── 📁 navigation/
│   │   │   └── 📄 navbar.jsx
│   │   └── 📁 auth/
│   │       └── 📄 auth-guard.jsx
│   ├── 📁 store/
│   │   ├── 📄 auth-store.js
│   │   ├── 📄 task-store.js
│   │   └── 📄 theme-store.js
│   ├── 📁 lib/
│   │   ├── 📄 utils.js
│   │   ├── 📄 constants.js
│   │   └── 📄 mock-data.js
│   └── 📁 hooks/
│       ├── 📄 use-auth.js
│       └── 📄 use-tasks.js
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** for version control

You can check your current versions by running:
```bash
node --version
npm --version
git --version
```


## 💻 Installation

### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/bug-tracker.git

# Navigate to project directory
cd bug-tracker

# Install dependencies with legacy peer deps flag (recommended)
npm install --legacy-peer-deps

# Or if you prefer yarn
yarn install
```

### Option 2: Download ZIP

1. Download the project ZIP file from GitHub
2. Extract to your desired directory
3. Open terminal in the project folder
4. Run `npm install --legacy-peer-deps`

### Dependency Installation Notes

⚠️ **Important**: Use the `--legacy-peer-deps` flag to avoid peer dependency conflicts:

```bash
# Recommended installation command
npm install --legacy-peer-deps
```

If you encounter issues, try:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install --legacy-peer-deps
```

---

## 🔧 Configuration

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with CSS variables for theming. Key files:

- `tailwind.config.js` - Main Tailwind configuration
- `src/app/globals.css` - CSS variables for light/dark themes
- `components.json` - ShadCN/UI configuration

### Next.js Configuration

- `next.config.js` - Next.js configuration (minimal setup)
- App Router is enabled by default in Next.js 14

---

## 🏃‍♂️ Running Locally

### Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Development Workflow

1. **Start development server**: `npm run dev`
2. **Open browser**: Navigate to http://localhost:3000
3. **Login with demo credentials** (see Demo Credentials section)
4. **Start developing**: Make changes and see live updates
5. **Check console**: Monitor for any errors or warnings

---
