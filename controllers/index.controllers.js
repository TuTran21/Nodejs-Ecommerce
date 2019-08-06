// models
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const CategoryModel = require("../models/category");

// Admin
exports.getIndexPage = (req, res) => {
  Promise.all([getUsers(), getProducts(), getCategories(), navigation()]).then(
    ([users, products, categories, navigationLinks]) => {
      res.render("index", {
        title: "Phoenix - Online Shopping",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,
        indexLink: navigationLinks.index,
        registerLink: navigationLinks.register,
        loginLink: navigationLinks.login,

        users: users,

        products: products,

        categories: categories
      });
    }
  );
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

const getUsers = () => {
  const users = UserModel.find({})
    .limit(50)
    .exec()
    .then(users => {
      return users;
    });
  return users;
};

const getProducts = () => {
  const products = ProductModel.find({})
    .limit(50)
    .exec()
    .then(products => {
      return products;
    });
  return products;
};

const getCategories = () => {
  const categories = CategoryModel.find({})
    .limit(50)
    .exec()
    .then(categories => {
      return categories;
    });
  return categories;
};
