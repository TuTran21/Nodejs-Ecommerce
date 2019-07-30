const usersData = require("../data/users.json");
const productsData = require("../data/products.json");
const categoriesData = require("../data/categories.json");

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

const navigation = async () => {
  return (navigationLinks = {
    admin: "/admin",
    users: "/admin/users",
    products: "/admin/products"
  });
};

const getUsers = async () => {
  return (users = usersData.body);
};

const getProducts = async () => {
  return (products = productsData.body);
};

const getCategories = async () => {
  return (categories = categoriesData.body);
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
  Promise.all([getProducts(), navigation()]).then(
    ([products, navigationLinks]) => {
      const product = products.find(product => product._id === req.params.id);
      res.render("productDetails", {
        title: "Phoenix - Product Details",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        product: product
      });
    }
  );
};
// User Details
exports.getUserDetails = (req, res) => {
  Promise.all([getUsers(), navigation()]).then(([users, navigationLinks]) => {
    const user = users.find(user => user._id === req.params.id);
    res.render("userDetails", {
      title: "Phoenix - User Details",
      adminLink: navigationLinks.admin,
      usersLink: navigationLinks.users,
      productsLink: navigationLinks.products,

      user: user
    });
  });
};
