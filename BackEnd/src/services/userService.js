import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {}; //tra ve userData cho controller, sau do controller tra ve cho client
      const isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        //kiem tra user co ton tai lan 2 vi neu neu ham kiem tra email o duoi tra ra true co nghia la co ton tai nguoi dung nhung trong 1 thoi diem co 1 nguoi khac xoa user do di se bi loi
        const user = await db.User.findOne({
          //kiem tra user co ton tai bang email truyen vao co ton tai trong db kh
          where: { email: email },
          attributes: ["email", "roleId", "password", "fullName"], //khi login thanh cong tra ra user nhung chi co 3 truong la email,roleId,password
          raw: true,
        });
        if (user) {
          //compare password
          //ham compareSync cua bcrypt co chuc nang so sanh password nguoi dung voi password da duoc ma hoa trong db neu bang thi tra ra true
          const check = await bcrypt.compareSync(password, user.password); //password la password truyen vao user.password chinh la password da duoc ma hoa trong db
          if (check) {
            userData.errCode = 0; //tra ra errCode = 0 la cho biet nguoi dung login thanh cong con khac 0 thi that bai(so sanh thanh cong)
            userData.errMessage = "ok";
            delete user.password; //vi chi muon tra ra email va roldeId nen dung delete user.password de kh hien thi thong tin password cua nguoi dung khi login thanh cong
            userData.user = user; //khi login thanh cong se tra ra thong tin cua 1 user
            userData.access_token = "";
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
