import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';
import connectDB from './configs/db.js';

const app = express();
const port = 3000;

await connectDB();

app.use(express.json());
app.use(cors());

// Clerk middleware setup (explicit key passing optional)
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

app.get('/', (req, res) => res.send('Server is Live!'));

// Inngest route
app.use('/api/inngest', serve({ client: inngest, functions }));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
