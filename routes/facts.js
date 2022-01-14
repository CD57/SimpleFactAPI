const express = require("express")
const router = express.Router()

const Fact = require('../models/fact')

// GET: All
router.get('/', async (req, res) => {
  try {
    const facts = await Fact.find()
    res.json(facts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET: By ID
router.get('/:id', getFact, (req, res) => {
  res.json(res.fact)
})

// DELETE
router.delete('/:id', getFact, async (req, res) => {
  try {
    await res.fact.remove()
    res.json({ message: 'Deleted Fact' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST
router.post('/', async (req, res) => {
  const fact = new Fact({
    fact: req.body.fact,
  })
  try {
    const addedFact = await fact.save()
    res.status(201).json(addedFact)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

async function getFact(req, res, next) {
  let fact

  try {
    fact = await Fact.findById(req.params.id)
    if (fact == null) {
      return res.status(404).json({ message: 'No Fact With Matching ID Found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.fact = fact
  next()
}

module.exports = router