const model = require('../model');

const Tag = model.Tag;
console.log(typeof Tag);

Tag.create({
  name: 'react',
  remark: 'i am fool',
});
