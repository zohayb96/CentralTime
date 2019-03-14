const db = require('./db')

// register models
require('./models')

// register models
const {User, Entry, Events, Reminder, Task} = require('./models/')

// Establish assosciations
User.hasMany(Entry)
Entry.hasMany(Reminder)
Entry.hasOne(Events)
Entry.hasOne(Task)

module.exports = db
