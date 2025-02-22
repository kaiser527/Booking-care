import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUserById,
  updateUserData,
  getAllCodeService,
  getUserWithPagination,
  postForgotPasswordService,
  postResetPasswordService,
} from "../services/userService";

//auth
const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameters !",
    });

  const userData = await handleUserLogin(email, password);
  //check email exist
  //compare password
  //return user's info
  //access_token:JWT json web token
  if (userData && userData.user && userData.user.access_token) {
    res.cookie("jwt", userData.user.access_token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
  }
  return res.status(200).json({
    //trong hop neu email kh ton tai hoac password kh dung(login fail) thi tra nhung errCode hay message tuong ung
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  }); //neu kh co loi thi tra ve ma 200 con co loi se tra ve ma 500,404,...
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      errCode: 0,
      errMessage: "OK",
    });
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

//users
const handleGetAllUsers = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      const users = await getUserWithPagination(+page, +limit);
      return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        data: users,
      });
    } else {
      const id = req.query.id; //All, id
      if (!id) {
        return res.status(500).json({
          errCode: 1,
          errMessage: "Missing id",
          users: [],
        });
      }
      const users = await getAllUsers(id);
      return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users,
      });
    }
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

const handleCreateNewUser = async (req, res) => {
  try {
    const message = await createNewUser(req.body);
    return res.status(200).json(message);
  } catch (e) {
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
    console.log(e);
  }
};

const handleEditUser = async (req, res) => {
  try {
    const data = req.body;
    const message = await updateUserData(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -3,
      errMessage: "Error from Server!",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  const message = await deleteUserById(req.body.id);
  return res.status(200).json(message);
};

//all code
const getAllCode = async (req, res) => {
  try {
    const data = await getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const postForgotPassword = async (req, res) => {
  try {
    let data = await postForgotPasswordService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const postResetPassword = async (req, res) => {
  try {
    let data = await postResetPasswordService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

export {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
  getAllCode,
  handleLogout,
  postForgotPassword,
  postResetPassword,
};
