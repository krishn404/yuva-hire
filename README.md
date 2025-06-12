# Yuva Hire - Campus Placement Portal

A modern job portal platform designed specifically for campus placements, connecting students with top employers. Built with Next.js and TypeScript, featuring a clean and intuitive user interface.

## Features

- 🔐 Role-based authentication (Student & Admin)
- 📱 Fully responsive design for mobile and desktop
- 🎯 Job search and filtering
- 📊 Admin dashboard for job management
- 📝 Student job applications
- 📈 Real-time job statistics
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide Icons
- **State Management:** React Context
- **Authentication:** Custom JWT-based auth with mock API
- **API:** Mock API implementation (ready for real API integration)

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/krishn404/yuva-hire.git
   cd yuva-hire
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```



3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mock Credentials

For testing purposes, you can use these mock credentials:

### Admin User
- Email: admin@iitd.ac.in
- Password: admin123

### Student User
- Email: student@iitd.ac.in
- Password: password123

## Project Structure

```
job-portal/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin routes
│   ├── api/               # API routes
│   ├── auth/              # Authentication routes
│   └── jobs/              # Job listing routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── desktop/          # Desktop-specific components
├── contexts/             # React contexts
├── lib/                  # Utility functions and hooks
└── public/              # Static assets
```

## Development Approach

1. **Mock API First:** The project uses a mock API implementation to simulate backend functionality, making it easy to develop and test features without a real backend.

2. **Mobile-First Design:** The UI is built with a mobile-first approach, ensuring a great experience across all devices.

3. **Type Safety:** TypeScript is used throughout the project to ensure type safety and better developer experience.

4. **Component Architecture:** The project follows a modular component architecture, making it easy to maintain and scale.

## Assumptions

1. The platform is designed for campus placements, focusing on student and admin roles.
2. Job listings are managed by college administrators.
3. Students can apply to jobs and track their applications.
4. The mock API can be easily replaced with a real backend implementation.


## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)