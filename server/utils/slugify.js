// utils/slugify.js
const slugify = require('slugify');
module.exports = (text) => slugify(text, { lower: true, strict: true });
console.log(slugify("Node.js 18 Released", { lower: true, strict: true }));