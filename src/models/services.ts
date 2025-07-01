import { Schema, models, model } from 'mongoose'

const ServicesSchema = new Schema({
  title: String,
  image: String,
  short_description: String,
  details: String,
})

export const Services = models.Services || model('Services', ServicesSchema)
