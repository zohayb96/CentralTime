const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {});

module.exports = Task;
