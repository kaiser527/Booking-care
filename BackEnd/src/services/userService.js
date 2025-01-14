require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
import { createJWT } from "../middlewares/JWTAction";

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          where: { email: email },
          attributes: ["id", "email", "roleId", "password", "fullName"],
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          nest: true,
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compareSync(password, user.password);
          const permissonData = await db.Permission.findAll({
            where: { roleId: user.roleId },
            attributes: ["url", "description"],
            raw: true,
          });
          let newRoleData = {
            valueEn: user.roleData["valueEn"],
            valueVi: user.roleData["valueVi"],
            permissionData: permissonData,
          };
          let payload = {
            user: {
              email: user.email,
              name: user.fullName,
              roleId: user.roleId,
              roleData: newRoleData,
            },
            expiresIn: process.env.JWT_EXPIRES_IN,
          };
          let token = createJWT(payload);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
            userData.user.access_token = token;
            userData.user.roleData = newRoleData;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e); //neu co exception thi reject cai exception do luon
    }
  });
};

//function check email exist in database
const checkUserEmail = (userEmail) => {
  //vi kiem tra email o trong db la hanh dong ton thoi gian nen dung promise de cho
  return new Promise(async (resolve, reject) => {
    try {
      //db.Userla tu db goi tham chieu den model User
      const user = await db.User.findOne({
        //goi den hem findOne cua sequelize la tim 1 ban ghi trong db
        where: { email: userEmail }, //vi o day muon kiem tra email nen cho dieu kien where bang chinh useEmail truyen vao
      });
      if (user) resolve(true); //neu tim thay nguoi dung thi tra ve true
      else resolve(false);
      //resolve = return
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = {};
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserWithPagination = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      const { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: {
          exclude: ["password"],
        },
      });
      let data = {
        totalRows: count,
        totalPages: Math.ceil(count / limit),
        users: rows,
      };
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist
      const check = await checkUserEmail(data.email);
      if (check)
        resolve({
          errCode: 1,
          errMessage: "Your email is already used, Plz try another email !",
        });
      else {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password); //truyen vao password ma nguoi dung nhap vao
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        }); //=insert into users
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
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

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `The user isn't exist`,
        });
      }
      await user.destroy();

      //fix raw query error
      // await db.user.destroy({
      //   where: { id: userId },
      // })

      resolve({
        errCode: 0,
        message: "The user is deleted",
      });
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
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing required paramenters!",
        });
      } else {
        let check = await checkUserEmail(data.email);
        if (check && user.email !== data.email) {
          resolve({
            errCode: 1,
            errMessage: "Your email is already used, Plz try another email !",
          });
        } else {
          if (user) {
            user.fullName = data.fullName;
            user.address = data.address;
            user.roleId = data.roleId;
            user.phoneNumber = data.phoneNumber;
            if (data.image) {
              user.image = data.image;
            }
            user.positionId = data.positionId;
            user.gender = data.gender;

            //fix raw query error
            // await db.user.save({
            //   fullName: data.fullName,
            //   address: data.address,
            //   phoneNumber: data.phoneNumber,
            // });

            await user.save();
            resolve({
              errCode: 0,
              message: "Update the user succeeds !",
            });
          } else {
            resolve({
              errCode: 1,
              errMessage: "User not found !",
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required Parameters !",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        //gan them key vao res
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUserById,
  updateUserData,
  getAllCodeService,
  getUserWithPagination,
};
