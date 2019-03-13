const Sequelize = require('sequelize');
const db = require('../db');

const Entry = db.define('entry', {});

module.exports = Entry;
