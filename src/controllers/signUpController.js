import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const singUpController = async (req, res) => {
  const { email, username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ email, username, passwordHash })
  await user.save()

  return res.status(201).send(user)
}
