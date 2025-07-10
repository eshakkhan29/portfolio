import jwt from 'jsonwebtoken'
export const tokenGenerator = (user: any, type: 'access' | 'refresh') => {
  const expiresIn = type === 'refresh' ? '7d' : '1d'
  const token = jwt.sign(
    {
      uid: user?._id,
      email_or_phone: user?.email_or_phone,
      type,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET!,
    { expiresIn },
  )

  return token
}
