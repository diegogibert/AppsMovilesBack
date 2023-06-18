import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    label: {
      type: String,
      enum: ['Custom', 'Default']
    },
})

categorySchema.set('toJSON', {
    transform: (document, returnObject) => {
      delete returnObject._id
      delete returnObject.__v
    }
})

export const Category = mongoose.model('Category', categorySchema)