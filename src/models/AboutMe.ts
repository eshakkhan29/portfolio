import { model, models, Schema } from 'mongoose'

const AboutMeSchema = new Schema({
  about: String,
})

export const AboutMe = models.AboutMe || model('AboutMe', AboutMeSchema)
