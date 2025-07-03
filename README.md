# AI-Powered Real-Time Interview Platform

## ⭐ Key Features

- **AI-Powered Interviews**: Dynamic voice-based interviews with natural conversation flow
- **Real-Time Feedback**: Instant evaluation of candidate responses
- **Role-Specific Questions**: Tailored interviews for different positions and seniority levels
- **Technology Stack Specialization**: Interviews customized for specific tech stacks
- **Comprehensive Scoring**: Detailed feedback across multiple assessment categories
- **Secure Authentication**: Email verification and account management
- **Interview History**: Track and review past interviews and performance metrics
- **Responsive design**: Fully responsive design that works seamlessly across devices.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: [Firebase](https://firebase.google.com/) Authentication
- **Database**: Firebase Firestore
- **AI Integration**: 
  - [Google Gemini AI](https://aistudio.google.com/) for response analysis
  - [Vapi](https://vapi.ai/) for voice interaction
  - [AI SDK](https://sdk.vercel.ai/) by Vercel
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Radix UI primitives
- **Notifications**: Sonner toast notifications

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hmvvong/ai_interview_platform
cd ai_interview_platform
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```

NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL==

```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
app-ai-interviews/
├── app/                  # Next.js app directory
│   ├── (auth)/           # Authentication routes
│   ├── (root)/           # Main application routes
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── constants/            # Application constants
├── firebase/             # Firebase configuration
├── lib/                  # Utility functions and server actions
│   ├── actions/          # Server actions
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```


