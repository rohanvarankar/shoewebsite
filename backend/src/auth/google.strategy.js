import dotenv from "dotenv";
dotenv.config(); // ✅ ENSURE env is loaded HERE

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.model.js";

// 🔴 SAFETY CHECK (optional but helpful)
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("❌ GOOGLE_CLIENT_ID is missing in .env");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const profileImage = profile.photos?.[0]?.value || null;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name,
            email,
            googleId,
            authProvider: "google",
            profileImage,
            isVerified: true
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
