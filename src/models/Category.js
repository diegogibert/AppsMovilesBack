import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
})

categorySchema.set('toJSON', {
    transform: (document, returnObject) => {
      delete returnObject._id
      delete returnObject.__v
    }
})

export const Category = mongoose.model('Category', categorySchema)