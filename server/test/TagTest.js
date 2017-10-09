const model = require('../model');

const Tag = model.Tag;
console.log(typeof Tag);

Tag.sync();
