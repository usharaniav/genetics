
const mysql = require("./db.js");
const { request } = require("express");
const session = require("express-session");
const moment = require("moment");

const createUser = async function (details) {
  try {
    console.log(details);

    let query =
      "INSERT INTO `users` (`username`, `email`, `role_id`, `login_id`, `password`, `mobile_number`, `address`, `city_id`, `state_id`, `country_id`, `gender_id`,`pincode`, `created_date`, `modified_date`) VALUES ( :userName, :email, :roleId, :loginId, :password, :mobileNumber, :address, :cityId, :stateId, :countryId, :genderId, :pincode, :createdDate, :modifiedDate);";

    let result = await mysql.query(query, {
      userName: details.userName, email: details.email, roleId: details.roleId, loginId: details.loginId, password: details.password, mobileNumber: details.mobileNumber, address: details.address, cityId: details.cityId, stateId: details.stateId, countryId: details.countryId, genderId: details.genderId,  pincode: details.pincode, createdDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),modifiedDate:  moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

    });
    return {
      status: "success",
      result: result,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async function (details) {
  try {
    console.log(details);
    let query =
      "UPDATE `users` SET `username` = :userName, `email` = :email, `role_id` = :roleId, `login_id` = :loginId, `password` = :password, `mobile_number` = :mobileNumber, `address` = :address, `city_id` = :cityId, `state_id` = :stateId, `country_id` = :countryId, `gender_id` = :genderId, `pincode` = :pincode, `created_date` = :createdDate, `modified_date` = :modifiedDate WHERE `userName` = :userName;";

    let result = await mysql.query(query, {
      userName: details.userName, email: details.email, roleId: details.roleId, loginId: details.loginId, password: details.password, mobileNumber: details.mobileNumber, address: details.address, cityId: details.cityId, stateId: details.stateId, countryId: details.countryId, genderId: details.genderId, createdDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), modifiedDate:  moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), pincode: details.pincode 
    
    });

    return {
      status: "success",
      result: result,
    };
  } catch (err) {
    throw new Error(err);
  }
};


const login = async function (details) {
  try {
    let query =
      "SELECT username,password,email FROM users WHERE  username= :userName AND password = :password";

    let result = await mysql.query(query, {
      userName: details.userName,
      password: details.password,
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const getCurrentUser = async function (details) {
  try {
    let query =
      "SELECT ur.user_id, ur.username, ur.role_id, rm.role_name FROM users ur JOIN role_master rm ON ur.role_id = rm.role_id WHERE username = :userName";

    let result = await mysql.query(query, {
      userId: details.user_id,
    });

    return result[0];
  } catch (err) {
    throw new Error(err);
  }
};

const getAllUser = async function (details) {
  try {
    let query = "SELECT * FROM users";

    let result = await mysql.query(query, {
      userName: details.userName,
    });

    return result[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
  getAllUser,
};
