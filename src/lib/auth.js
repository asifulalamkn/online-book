import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";

// DNS Fix
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('book');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  // এই অংশটি আপনার কোডে ছিল না, এটি যোগ করুন
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  emailAndPassword: { 
    enabled: true,
    autoSignIn: true 
  }
});