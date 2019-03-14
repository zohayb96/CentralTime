// api/events.js
const router = require('express').Router()
const {Events} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Events.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/events/
router.post('/', function(req, res, next) {
  /* etc */
})
// matches PUT requests to /api/events/:eventId
router.put('/:eventId', function(req, res, next) {
  /* etc */
})
// matches DELETE requests to /api/events/:eventId
router.delete('/:eventId', function(req, res, next) {
  /* etc */
})

module.exports = router
