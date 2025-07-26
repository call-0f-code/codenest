import passport from 'passport';
import './googleStrategy';
import './githubStrategy';

// Serialize minimal user data (just userId)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize and attach userId for downstream usage
passport.deserializeUser(async (id: string, done) => {
  try {
    done(null, { id }); // pass only userId
  } catch (error) {
    done(error, null);
  }
});

export default passport;
