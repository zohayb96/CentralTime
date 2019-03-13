// api/events.js
const router = require('express').Router();

// matches GET requests to /api/events/
router.get('/', function(req, res, next) {
  /* etc */
});
// matches POST requests to /api/events/
router.post('/', function(req, res, next) {
  /* etc */
});
// matches PUT requests to /api/events/:eventId
router.put('/:eventId', function(req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/events/:eventId
router.delete('/:eventId', function(req, res, next) {
  /* etc */
});

module.exports = router;
