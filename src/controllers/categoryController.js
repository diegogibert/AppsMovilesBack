import { Category } from "../models/Category.js";

export const addCategory = async (req, res) => {
  const { user } = req
  const { name, description } = req.body

  const validCategory = await Category.find({ name })
  if (validCategory.length > 0) return res.status(400).send({ status: 'Failed', error: 'Category named ' + name +' already exists' })

  const category = new Category({name, description, user: user.id})
  await category.save()

  return res.status(200).send(category)
}

export const getCategory = async(req, res) => {
  const { user } = req
  const category = await Category.find({ user: user.id })

  if (category.length == 0) return res.status(400).send({ status: 'Failed', error: 'Category doesnt exists' })

  return res.status(200).send(category)
}