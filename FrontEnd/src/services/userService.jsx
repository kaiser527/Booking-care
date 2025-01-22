import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password }); //{email: userEmail, password: userPassword}
};

const getAllUsers = (page, limit) => {
  return axios.get(`api/get-all-users?id=ALL&page=${page}&limit=${limit}`);
};

const getNullUsers = () => {
  return axios.get(`api/get-all-users?id=ALL`);
};

const createNewUserService = (data) => {
  return axios.post("api/create-new-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("api/delete-user", { data: { id } });
};

const editUserService = (data) => {
  return axios.put("api/edit-user", data);
};

const getAllCodeService = (inputType) => {
  return axios.get(`api/allcode?type=${inputType}`);
};

const handleLogout = () => {
  return axios.post("api/logout");
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  handleLogout,
  getNullUsers,
};
