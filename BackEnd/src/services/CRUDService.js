const bcrypt = require("bcryptjs");
const db = require("../models/index");

const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password); //truyen vao password ma nguoi dung nhap vao
      await db.User.create({
        email: data.email, //gan email:data.email co nghia la gan gia tri ban dau la rong bang chinh gia tri nhap vao
        password: hashPasswordFromBcrypt,
        fullName: data.fullName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      }); //=insert into users
      resolve("ok create a new user succeed !");
    } catch (e) {
      reject(e);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //ham hashSync cua bcrypt cho phep ma hoa password cua nguoi dung
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
      if (user) resolve(user);
      else resolve({});
    } catch (e) {
      reject(e);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        (user.fullName = data.fullName),
          (user.address = data.address),
          (user.phoneNumber = data.phoneNumber);

        await user.save();
        const allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
