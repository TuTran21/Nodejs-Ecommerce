const usersData = require("../data/users.json");
const productsData = require("../data/products.json");
const categoriesData = require("../data/categories.json");
// models
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const CategoryModel = require("../models/category");

// Admin
exports.getAdminPage = (req, res) => {
  Promise.all([getUsers(), getProducts(), getCategories(), navigation()]).then(
    ([users, products, categories, navigationLinks]) => {
      res.render("admin", {
        title: "Phoenix - Dashboard",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        users: users,
        usersAmountTitle: "Number of Users",
        usersAmount: users.length,

        products: products,
        productsAmountTitle: "Number of Products",
        productsAmount: products.length,

        categories: categories,
        categoriesAmountTitle: "Number of Categories",
        categoriesAmount: categories.length
      });
    }
  );
};

const searchInput = value => {
  console.log(value);
};

const navigation = async () => {
  return (navigationLinks = {
    admin: "/admin",
    users: "/admin/users",
    products: "/admin/products"
  });
};

const getUsers = async () => {
  const users = UserModel.find({})
    .limit(50)
    .exec()
    .then(users => {
      return users;
    });
  return users;
};

const getProducts = async () => {
  const products = ProductModel.find({})
    .limit(50)
    .exec()
    .then(products => {
      return products;
    });
  return products;
};

const getCategories = async () => {
  const categories = CategoryModel.find({})
    .limit(50)
    .exec()
    .then(categories => {
      return categories;
    });
  return categories;
};

// Users
exports.getAdminUsersPage = (req, res) => {
  Promise.all([getUsers(), navigation()]).then(([users, navigationLinks]) => {
    res.render("users", {
      title: "Phoenix - Users",
      adminLink: navigationLinks.admin,
      usersLink: navigationLinks.users,
      productsLink: navigationLinks.products,

      users: users
    });
  });
};

// Products
exports.getAdminProductsPage = (req, res) => {
  Promise.all([getProducts(), navigation()]).then(
    ([products, navigationLinks]) => {
      res.render("products", {
        title: "Phoenix - Products",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        products: products
      });
    }
  );
};
// Product Details
exports.getProductDetails = (req, res) => {
  Promise.all([getProductDetails(req.params.id), navigation()]).then(
    ([productById, navigationLinks]) => {
      // const product = products.find(product => product._id === req.params.id);
      res.render("productDetails", {
        title: "Phoenix - Product Details",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        product: productById
      });
    }
  );
};

const getProductDetails = async reqId => {
  const productById = ProductModel.findById(reqId, function(err, product) {
    return product;
  });
  return productById;
};
// User Details
exports.getUserDetails = (req, res) => {
  Promise.all([getUserDetails(req.params.id), navigation()]).then(
    ([userById, navigationLinks]) => {
      res.render("userDetails", {
        title: "Phoenix - User Details",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        user: userById
      });
    }
  );
};

const getUserDetails = async reqId => {
  const userById = UserModel.findById(reqId, function(err, user) {
    return user;
  });
  return userById;
};
