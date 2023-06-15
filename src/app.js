import express, { json } from 'express'
import { connectDb } from './db/db.js'
import { signInRouter } from './routes/signInRoutes.js'
import { signUpRouter } from './routes/signUpRoutes.js'
import { movementRouter } from './routes/movementRoutes.js'

const app = express()
const PORT = process.env.PORT

connectDb()

app.use(json())

app.use('/sign-up', signUpRouter)
app.use('/sign-in', signInRouter)
app.use('/movements', movementRouter)

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

export { app, server }
