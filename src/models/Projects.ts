import { Schema, models, model } from 'mongoose'

const ProjectsSchema = new Schema({
  priority: Number,
  title: String,
  short_description: String,
  cover: String,
  type: String,
  live_preview: String,
  site_age: String,
  visitors: String,
  github_link: String,
  earned: String,
  tech_stack: Array,
  full_details: String,
})

export const Projects = models.Projects || model('Projects', ProjectsSchema)
