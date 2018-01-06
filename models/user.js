var Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/users');

var bcrypt = require('bcrypt');

var Listing = require('./listing.js');

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
    },
    instanceMethods: {
      validate: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
});

User.hasMany(Listing);

User.sync()
    .catch(error => console.log(error.stack));

// export User model for use in other files.
module.exports = User;
