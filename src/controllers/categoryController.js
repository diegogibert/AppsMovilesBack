import { Category } from "../models/Category.js";

export const addCategory = async (req, res) => {
  const { user } = req
  const { name } = req.body

  const validCategory = await Category.find({ user: user.id, name })
  if (validCategory.length > 0) return res.status(400).send({ status: 'Failed', error: 'Category named ' + name +' already exists' })

  const category = new Category({name, user: user.id})
  await category.save()

  return res.status(201).send(category)
}

export const getCategory = async(req, res) => {
  const { user } = req
  const category = await Category.find({ user: user.id })

  return res.status(200).send(category)
}

export const removeCategory = async(req, res) => {
  const { user } = req
  const { name } = req.body

  await Category.deleteOne({ user: user.id, name })

  return res.status(200).send("Category removed")
}