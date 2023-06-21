import { Movement } from '../models/Movement.js'
import { Category } from '../models/Category.js'

export const addMovement = async (req, res) => {
  const { user } = req
  const { name, description, type, category, note, account, date, amount } = req.body

  const categoryRef = await Category.findOne({ name: category })
  const movement = new Movement({ name, description, type, category: categoryRef.id, note, user: user.id, account, date, amount })
  await movement.save()

  await movement.populate('category', {
    name: 1
  })

  if (type === 'Income') {
    user.incomes = user.incomes + amount
  } else {
    // Expense
    user.expenses = user.expenses + amount
  }

  user.movements = user.movements.concat(movement._id)
  await user.save()

  return res.status(201).send(movement)
}

export const getMovements = async (req, res) => {
  const { user } = req
  const movements = await Movement.find({ user: user.id })

  const populatedMovements = []

  movements.forEach(async (movement) => {
    movement.populate('category', {
      name: 1
    })
    populatedMovements.push(movement)
  })

  return res.status(200).send(populatedMovements)
}

export const removeMovement = async (req, res) => {
  const { id } = req.query
  const { user } = req
  const movement = await Movement.findByIdAndRemove(id)
  if (!movement) {
    return res.status(404).send({ message: 'Movement not found' })
  }
  if (movement.type === 'Income') {
    user.incomes = user.incomes - movement.amount
  } else {
    user.expenses = user.expenses - movement.amount
  }

  await user.save()

  return res.status(200).send({ message: 'Movement removed' })
}

export const getMonthlyMovement = async (req, res) => {
  const { month } = req.query
  const { user } = req

  const movements = await Movement.find({ user: user.id })

  const populatedMovements = []
  let monthIncomes = 0
  let monthExpenses = 0

  movements.forEach(async (movement) => {
    const dateOfMovement = movement.date
    const movementMonth = dateOfMovement.getMonth()

    if (movementMonth + 1 == month) {
      movement.populate('category', {
        name: 1
      })
      if (movement.type === 'Income') {
        monthIncomes = monthIncomes + movement.amount
      } else {
        monthExpenses = monthExpenses + movement.amount
      }
      populatedMovements.push(movement)
    }
  })
  return res.status(200).send({ incomes: monthIncomes, expenses: monthExpenses, movements: populatedMovements })
}