export default {
  jwt: {
    secret: process.env.SECRET as string,
    expiresIn: process.env.EXPIRES_IN as string,
  },
};
