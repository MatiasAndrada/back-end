var knexfile = require("./knexfile.js");
const knex = require("knex");
var knexD = knex(knexfile.development);
var knexP = knex(knexfile.production);
module.exports = {knexD, knexP}; 
