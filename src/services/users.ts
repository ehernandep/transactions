import UserModel from "../models/user";

const getUsers = async () => {
  try {
    const users = await UserModel.find().select('-password');
    return users;
  } catch (e) {
    throw new Error("Error getting users");
  }
};
export { getUsers };
