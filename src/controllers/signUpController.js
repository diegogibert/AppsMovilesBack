import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const singUpController = async (req, res) => {
  const { email, username, password } = req.body
  const validUsername = await User.find({ username })

  if (validUsername.length > 0) return res.status(400).send({ status: 'Failed', error: 'Username already exists' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ email, username, passwordHash })
  await user.save()

  return res.status(201).send({ status: 'Success' })
}
