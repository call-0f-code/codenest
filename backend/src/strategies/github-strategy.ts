import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import prisma from '../prisma/client';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      scope: ['user:email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName || profile.username;

      if (!email) return done(new Error('No email found'), null);

      try {
        let member = await prisma.member.findUnique({ where: { email } });

        if (!member) {
          member = await prisma.member.create({
            data: {
              email,
              name,
              username: email.split('@')[0],
              passoutYear: new Date(),
              accounts: {
                create: {
                  provider: 'github',
                  providerAccountId: profile.id,
                },
              },
            },
          });
        } else {
          const existingAccount = await prisma.account.findFirst({
            where: {
              memberId: member.id,
              provider: 'github',
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                provider: 'github',
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
