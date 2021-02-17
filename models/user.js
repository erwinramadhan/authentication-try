'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Method untuk melakukan enkripsi
    static #encrypt = (password) => bcrypt.hashSync (password, 10)
    static register = ({ username, password }) =>{
      const encryptedPassword = this.#encrypt(password)
      /* 
        #encrypt dari static method
        encryptedPassword akan sama dengan string
        hasil enkripsi password dari method #encrypt
       */
      return this.create({ username, password: encryptedPassword
  })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};