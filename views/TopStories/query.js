const { fields } = require('../fields');
 const returnFields = [
  fields.title,
  fields.url,
  fields.host,
  fields.publication_date,
].join(',');
 module.exports = {
  count: 5,
  return: returnFields,
};