// api/tasks.js
const router = require('express').Router();

// matches GET requests to /api/tasks/
router.get('/', function(req, res, next) {
  /* etc */
});
// matches POST requests to /api/tasks/
router.post('/', function(req, res, next) {
  /* etc */
});
// matches PUT requests to /api/tasks/:taskId
router.put('/:taskId', function(req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/tasks/:taskId
router.delete('/:taskId', function(req, res, next) {
  /* etc */
});

module.exports = router;
