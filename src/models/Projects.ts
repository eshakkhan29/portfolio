import { Schema, models, model } from 'mongoose'

const ProjectsSchema = new Schema({
  priority: Number,
  title: String,
  shortDescription: String,
  cover: String,
  type: String,
  livePreview: String,
  siteAge: String,
  visitors: String,
  githubLink: String,
  earned: String,
})

export const Projects = models.Projects || model('Projects', ProjectsSchema)
