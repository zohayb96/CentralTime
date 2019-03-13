// api/entries.js
const router = require('express').Router();

// matches GET requests to /api/entries/
router.get('/', function(req, res, next) {
  /* etc */
});
// matches POST requests to /api/entries/
router.post('/', function(req, res, next) {
  /* etc */
});
// matches PUT requests to /api/entries/:entryId
router.put('/:entryId', function(req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/entries/:entryId
router.delete('/:entryId', function(req, res, next) {
  /* etc */
});

module.exports = router;
