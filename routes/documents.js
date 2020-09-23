const express = require('express')
const router = express.Router()

const Document = require('../models/Document')
//require("../models/Document");
//var Document = require("mongoose").model("Document");
// @desc    Show add page
// @route   GET /documentss/add
router.get('/add',  (req, res) => {
  res.render('documents/add')
})
// @desc    Process add form
// @route   POST /documents
router.post('/',  async (req, res) => {
  
  try {
    
    await Document.create(req.body)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})
// @desc    Show document
// @route   GET /documents/:id
router.get('/:id', async (req, res) => {
  try {
    let doc = await Document.findById(req.params.id).lean()

    if (!doc) {
      return res.render('error/404')
    }

    
    else {
      res.render('documents/show', {
        doc,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})
// @desc    Show edit page
// @route   GET /documents/edit/:id

router.get('/edit/:id', async (req, res) => {
  try {
    const docs = await Document.findOne({
      _id: req.params.id,
    }).lean()
  
    if (!docs) {
      return res.render('error/404')
    }
  
      
    else {
      res.render('documents/edit', {
        docs,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})
// @desc    Update Document
// @route   PUT /documents/:id
router.put('/:id',  async (req, res) => {
  try {
    const docc = await Document.findById(req.params.id).lean()

    if (!docc) {
      return res.render('error/404')
    }

    else {
        await Document.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete Document
// @route   DELETE /documents/:id
router.delete('/:id',  async (req, res) => {
  try {
    let doc = await Document.findById(req.params.id).lean()

    if (!doc) {
      return res.render('error/404')
    }

    else {
      await Document.remove({ _id: req.params.id })
      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})





module.exports = router