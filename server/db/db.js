const uuid = require('node-uuid');
const Sequelize = require('sequelize');
const config = require('../config/config');

console.log('init sequelize...');

function generateId() {
  return uuid.v4();
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  pool: config.pool,
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  const attrs = {};
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
  };
  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      };
    }
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: (obj) => {
        const now = Date.now();
        if (!obj.createdAt) { // 根据 createdAt判断该条数据是否存在
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          obj.updatedAt = Date.now();
          obj.version += 1;
        }
      },
    },
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

const exp = {
  defineModel: defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      return sequelize.sync({ force: true });
    }
    return null;
  },
};

for (const type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
