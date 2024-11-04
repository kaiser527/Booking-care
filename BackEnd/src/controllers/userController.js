const {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUserById,
  updateUserData,
} = require("../services/userService");

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
  return res.status(200).json({
    //trong hop neu email kh ton tai hoac password kh dung(login fail) thi tra nhung errCode hay message tuong ung
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  }); //neu kh co loi thi tra ve ma 200 con co loi se tra ve ma 500,404,...
};

const handleGetAllUsers = async (req, res) => {
  const id = req.query.id; //All, id
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing id",
      users: [],
    });
  }
  const users = await getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleCreateNewUser = async (req, res) => {
  const message = await createNewUser(req.body);
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  const data = req.body;
  const message = await updateUserData(data);
  return res.status(200).json(message);
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

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
};
