// api/entries.js
const router = require('express').Router()
const {Entry, Task, Events, Reminder} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Entry.findAll({
      include: [{model: Reminder}, {model: Events}]
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches POST requests to /api/entries/
router.post('/', function(req, res, next) {
  /* etc */
})
// matches PUT requests to /api/entries/:entryId
router.get('/:id', async function(req, res, next) {
  const user = req.params.id
  try {
    const entries = await Entry.findAll({
      include: [{model: Reminder}, {model: Events}, {model: Task}],
      where: {
        userId: user
      }
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches DELETE requests to /api/entries/:entryId
router.delete('/:entryId', function(req, res, next) {
  /* etc */
})

module.exports = router
