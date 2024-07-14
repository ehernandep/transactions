import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.hande";


const registerNewUser = async ({
  email,
  password,
  company,
  city,
  name,
  lastname,
  phone,
  rol,
}: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) {
    return "Already_user";
  }

  const passHash = await encrypt(password);
  const newUser = new UserModel({
    email,
    password: passHash,
    company: company,
    city: city,
    name: name,
    lastname: lastname,
    phone: phone,
    rol: rol,
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    await newUser.remove();
    throw error;
  }
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });

  if (!checkIs) {
    return "Not_Found_user";
  }

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);
  if (!isCorrect) {
    return "Incorrect_Password";
  }

  const token = generateToken(checkIs.email);
  const data = { token, user: checkIs };
  return data;
};
export { loginUser, registerNewUser };
