// api/tasks.js
const router = require('express').Router()
const {Task, Entries} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Task.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/tasks/
router.post('/', function(req, res, next) {
  /* etc */
})
// matches PUT requests to /api/tasks/:taskId
router.put('/:taskId', function(req, res, next) {
  /* etc */
})
// matches DELETE requests to /api/tasks/:taskId
router.delete('/:taskId', function(req, res, next) {
  /* etc */
})

module.exports = router
