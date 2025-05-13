# Express Academy

A modern e-learning platform built with Next.js and Neon Database.

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   \`\`\`
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret
   \`\`\`
4. Set up the database schema:
   \`\`\`bash
   node scripts/setup-db.js
   \`\`\`
5. Seed the database with initial data:
   \`\`\`bash
   node scripts/seed.js
   \`\`\`
6. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Course catalog with detailed course pages
- User authentication
- Video lessons with preview functionality
- Course materials
- Payment processing
- Admin dashboard for course management

## Technologies Used

- Next.js 14
- Neon Database (PostgreSQL)
- Tailwind CSS
- TypeScript
\`\`\`

Let's update the middleware.ts file to ensure it doesn't use Prisma:
