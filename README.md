# Customer Support Ticketing System - Frontend

This is the frontend for a Customer Support Ticketing System built with **Vue.js 3**. It provides a responsive UI for user authentication, ticket management, commenting, and real-time chat linked to tickets. The frontend communicates with a Laravel backend API and uses Pusher for real-time chat.

## Features
- **Authentication**: Login, registration, and logout with role-based access (Admin/Customer).
- **Tickets**: Create, view, update, delete tickets with form validation.
- **Comments**: Add and view comments under tickets.
- **Real-Time Chat**: Customer ↔ Admin chat linked to tickets using Pusher.
- **Responsive UI**: Built with Tailwindcss for desktop compatibility.

## Prerequisites
- Node.js - Updated node version like, v22.17.1
- npm
- Pusher JS (for real-time chat)
- Backend API (deployed or running locally at `http://localhost:8000`)
- Git

## Installation
1. **Clone the Repository**:
    ```bash
    HTTPS: git clone https://github.com/gsshohel1314/ticketing-system-frontend.git
    SSH: git clone git@github.com:gsshohel1314/ticketing-system-frontend.git
    cd ticketing-system-frontend
2. **Install Dependencies**:
    ```bash
    npm install
3. **Environment Setup (Create .env file in the root)**:
    ```bash
    VITE_API_BASE_URL=http://localhost:8000
    VITE_PUSHER_APP_KEY=your_pusher_key
    VITE_PUSHER_APP_CLUSTER=your_pusher_cluster
4. **Run Development Server**:
    ```bash
    npm run dev
    ```

## Real-Time Chat
- **Technology**: Uses Laravel Echo and Pusher JS for real-time messaging.
- **Setup**: Configured in src/main.js with Echo and Pusher.
- **Channel**: Listens to ticket.{ticket_id} for real-time message updates.
- **Usage**: In TicketView.vue, users can send/receive messages linked to a ticket.

## API Integration
- **Axios**: Used for API calls to the backend.
- **Auth**: Stores token in localStorage and adds Authorization: Bearer token to protected requests.
- **Endpoints**: Connects to backend routes (see backend README for details).

