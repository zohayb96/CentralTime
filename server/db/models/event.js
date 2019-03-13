const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {})

module.exports = Event
