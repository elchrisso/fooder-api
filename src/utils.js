import jwt from 'jsonwebtoken'
import { salt } from './secrets'

export const isLoggedIn = async (token) => {
  try {
    return await jwt.verify(token, salt)
  } catch (e) {
    throw e
  }
}