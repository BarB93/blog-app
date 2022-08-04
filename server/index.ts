import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { log } from 'console'

dotenv.config()

mongoose
  .connect('mongodb+srv://admin:ea377e9a0f@cluster0.yuutis2.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB is connected OK!'))
  .catch((error) => console.log('It was error while connection to DB', error))

const app: Express = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.post('/auth/login', (req: Request, res: Response) => {
  const body = req.body

  const token = jwt.sign(
    {
      email: body.email,
    },
    process.env.JWT_SECRET_KEY as string,
  )

  res.json({
    success: true,
    token,
  })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been started on port: ${port}`)
})
