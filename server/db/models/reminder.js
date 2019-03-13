const Sequelize = require('sequelize');
const db = require('../db');

const Reminder = db.define('reminder', {});

module.exports = Reminder;
