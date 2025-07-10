import { Schema, models, model } from 'mongoose'

const UsersSchema = new Schema({
  email_or_phone: { type: String, unique: true },
  password: { type: String, require: true },
})

export const Users = models.Users || model('Users', UsersSchema)
