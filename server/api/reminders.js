// api/reminders.js
const router = require('express').Router()
const {Reminder} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Reminder.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches POST requests to /api/reminders/
router.post('/', function(req, res, next) {
  /* etc */
})
// matches PUT requests to /api/reminders/:reminderId
router.put('/:reminderId', function(req, res, next) {
  /* etc */
})
// matches DELETE requests to /api/reminders/:reminderId
router.delete('/:reminderId', function(req, res, next) {
  /* etc */
})

module.exports = router
