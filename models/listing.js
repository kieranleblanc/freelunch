const bcrypt = require('bcrypt'),
      Sequelize = require('sequelize'),
      sequelize = new Sequelize('postgres://postgres@localhost:5432/users');


const Listing = sequelize.define('listings', {

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    photoURL: {
        type: Sequelize.STRING,
        allowNull: true
    }

});

Listing.sync()
    .catch(error => console.log(error.stack));

// export User model for use in other files.
module.exports = Listing;
