import jwt from 'jsonwebtoken';

// export const generateAccessToken = (userId: string) => {
//   return jwt.sign(
//     { user: { id: userId } },
//     process.env.JWT_TOKEN_SECRET as string,
//     {
//       expiresIn: '15m',
//     }
//   );
// };

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { user: { id: userId } },
    process.env.JWT_TOKEN_SECRET as string,
    {
      expiresIn: '7d',
    }
  );
};
