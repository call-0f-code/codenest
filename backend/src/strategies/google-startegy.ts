import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName;

      if (!email) return done(new Error('No email found'), null);

      try {
        let member = await prisma.member.findUnique({ where: { email } });

        if (!member) {
          member = await prisma.member.create({
            data: {
              email,
              name,
              username: email.split('@')[0],
              passoutYear: new Date(), // placeholder, replace appropriately
              accounts: {
                create: {
                  provider: 'google',
                  providerAccountId: profile.id,
                },
              },
            },
          });
        } else {
          const existingAccount = await prisma.account.findFirst({
            where: {
              memberId: member.id,
              provider: 'google',
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                provider: 'google',
                providerAccountId: profile.id,
                memberId: member.id,
              },
            });
          }
        }

        return done(null, { id: member.id });
      } catch (err) {
        return done(err as Error, null);
      }
    }
  )
);
