// models
const UserModel = require("../models/user");

// Register Page
exports.getRegisterPage = (req, res) => {
  Promise.all([navigation()]).then(navigationLinks => {
    res.render("register", {
      title: "Phoenix - Register",
      adminLink: navigationLinks.admin,
      usersLink: navigationLinks.users,
      productsLink: navigationLinks.products,
      indexLink: navigationLinks.index,
      registerLink: navigationLinks.register,
      loginLink: navigationLinks.login
    });
  });
};

const navigation = () => {
  return (navigationLinks = {
    admin: "/admin",
    users: "/admin/users",
    products: "/admin/products",

    index: "/",
    register: "/register",
    login: "/login"
  });
};

// Register
const Joi = require("joi");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{1,30}$/)
    .required(),
  confirmationPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required(),
  agree: Joi.string().required(),
  avatar: Joi.any()
});

exports.register = async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, userSchema);
    if (result.error) {
      console.log("error");
      res.redirect("/register");
      return;
    }

    const user = await UserModel.findOne({ email: result.value.email });
    if (user) {
      console.log("duplicate");
      res.redirect("/register");
      return;
    }
    // const parser = await multerCloudinaryConfig();
    // parser.single(req.body.avatar);
    // Save User
    if (req.file) {
      const resultUser = { ...result.value, avatar: req.file.url };
      const newUser = await new UserModel(resultUser);
      await newUser.save();

      console.log("success");
      res.redirect("/login");
    } else {
      const resultUser = { ...result.value, avatar: req.file.url };
      const newUser = await new UserModel(resultUser);
      await newUser.save();

      console.log("success");
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

// Login Page
exports.getLoginPage = (req, res) => {
  Promise.all([navigation()]).then(navigationLinks => {
    res.render("login", {
      title: "Phoenix - Login",
      adminLink: navigationLinks.admin,
      usersLink: navigationLinks.users,
      productsLink: navigationLinks.products,
      indexLink: navigationLinks.index,
      registerLink: navigationLinks.register,
      loginLink: navigationLinks.login
    });
  });
};

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{1,30}$/)
    .required()
});

exports.login = async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, loginSchema);

    const user = await UserModel.findOne({
      email: result.value.email,
      password: result.value.password
    });
    if (user) {
      console.log("success");
      res.redirect("/");
      return;
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};
