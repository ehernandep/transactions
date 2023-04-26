import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.hande";
import randomstring from "randomstring";
import { ses } from "../aws-config";

const registerNewUser = async ({
  email,
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
  const password = randomstring.generate(10); // Generate a random password
  const passHash = await encrypt(password);
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    company: company,
    city: city,
    name: name,
    lastname: lastname,
    phone: phone,
    rol: rol,
  });

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<p>Your password is: ${password}</p>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome to our platform",
      },
    },
    Source: "support@bonnett", // replace with your SES email address
  };

  // send email notification to the user
  await ses.sendEmail(params).promise();

  return registerNewUser;
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
