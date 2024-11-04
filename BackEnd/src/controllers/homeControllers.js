const db = require("../models/index");
const {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
} = require("../services/CRUDService");

const getHomePage = async (req, res) => {
  //process data
  try {
    const data = await db.User.findAll();
    res.render("home.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};

const getCRUDPage = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  const message = await createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

const displayGetCRUD = async (req, res) => {
  const data = await getAllUser();
  return res.render("display-crud.ejs", { dataTable: data });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await getUserInfoById(userId);
    //check user data not found

    console.log(">>>check Id", userData);
    return res.render("edit-crud.ejs", { user: userData });
  } else {
    return res.send("Users not found !");
  }
};

const putCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await updateUserData(data);
  return res.render("display-crud.ejs", { dataTable: allUsers });
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await deleteUserById(userId);
    return res.send("delete the user succeed !");
  } else {
    return res.send("Users not found !");
  }
};

module.exports = {
  getHomePage,
  getCRUDPage,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
