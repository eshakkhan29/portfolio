import { Schema, models, model } from 'mongoose'

const SkillsSchema = new Schema({
  name: { type: String, unique: true },
  icon: {
    type: String,
    require: true,
  },
})

export const Skills = models.Skills || model('Skills', SkillsSchema)
