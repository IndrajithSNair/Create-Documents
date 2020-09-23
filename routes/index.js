const express = require('express')
const router = express.Router()
const path = require('path')
const Document = require('../models/Document')



// @desc    Dashboard
// @route   GET /dashboard
router.get('/',  async (req, res) => {
  try {
    const documents = await Document.find().lean()
    res.render('dashboard', {
      documents
    })
  } catch (err) {
    console.error(err)
    res.render("no documents yet")
  }
})

module.exports = router