const app = require('../app.js'),
      bcrypt = require('bcrypt'),
      config = require('../config.js'),
      Sequelize = require('sequelize'),
      sequelize = config.sequelize;

const Listing = require('./listing.js');

const User = sequelize.define('users', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    type: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
});


User.hasMany(Listing);

User.prototype.checkPass = function(password) {
  var val = bcrypt.compareSync(password, this.password);
  return val
}

User.sync()
    .catch(error => console.log(error.stack));

module.exports = User;
