# AI Rules for PANIFAIR 2026 Project

This document outlines the technical stack and guidelines for using various libraries within the PANIFAIR 2026 application. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of our chosen technologies.

## Tech Stack Overview

1.  **React**: The core JavaScript library for building user interfaces.
2.  **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and developer experience.
3.  **Vite**: A fast build tool and development server for modern web projects.
4.  **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
5.  **shadcn/ui**: A collection of reusable UI components built with Radix UI and styled with Tailwind CSS, providing a consistent and accessible design system.
6.  **React Router DOM**: For declarative client-side routing within the application.
7.  **TanStack Query (React Query)**: For efficient server state management, data fetching, caching, and synchronization.
8.  **React Hook Form & Zod**: For robust and flexible form management and schema-based validation.
9.  **Lucide React**: A library of beautiful and customizable open-source icons.
10. **Sonner**: A modern, accessible, and customizable toast notification library.

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please follow these guidelines for library usage:

*   **UI Components**:
    *   **Primary Choice**: Always prioritize `shadcn/ui` components for building the user interface. These components are pre-styled with Tailwind CSS and provide accessibility features.
    *   **Custom Components**: If a specific `shadcn/ui` component does not exist or requires significant customization beyond its props, create a new, small, and focused custom component in `src/components/` and style it exclusively with Tailwind CSS. Do not modify `shadcn/ui` component files directly.
*   **Styling**:
    *   **Exclusive Use**: All styling must be done using **Tailwind CSS** utility classes. Avoid writing custom CSS in separate `.css` or `.module.css` files, except for global styles in `src/index.css` or specific third-party library overrides if absolutely necessary.
    *   **Utility**: Use the `cn` utility function (from `src/lib/utils.ts`) for conditionally applying and merging Tailwind classes.
*   **Routing**:
    *   **Library**: Use `react-router-dom` for all client-side navigation and routing.
    *   **Route Definition**: Define all main application routes within `src/App.tsx`.
*   **State Management & Data Fetching**:
    *   **Server State**: For fetching, caching, and synchronizing server data, use **TanStack Query (React Query)**.
    *   **Local Component State**: For simple UI state within a component, use React's built-in `useState` and `useReducer` hooks.
*   **Form Handling & Validation**:
    *   **Form Management**: Use `react-hook-form` for managing form state, validation, and submission.
    *   **Schema Validation**: Pair `react-hook-form` with `zod` for defining robust validation schemas for form inputs.
*   **Icons**:
    *   **Library**: Use icons from the `lucide-react` library.
*   **Notifications**:
    *   **Toasts**: Implement all toast notifications using the `sonner` library.
*   **Date Manipulation**:
    *   **Library**: For any date parsing, formatting, or manipulation, use `date-fns`.