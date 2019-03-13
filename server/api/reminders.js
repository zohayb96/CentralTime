// api/reminders.js
const router = require('express').Router();

// matches GET requests to /api/reminders/
router.get('/', function(req, res, next) {
  /* etc */
});
// matches POST requests to /api/reminders/
router.post('/', function(req, res, next) {
  /* etc */
});
// matches PUT requests to /api/reminders/:reminderId
router.put('/:reminderId', function(req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/reminders/:reminderId
router.delete('/:reminderId', function(req, res, next) {
  /* etc */
});

module.exports = router;
