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

const navigation = () => {
  return (navigationLinks = {
    admin: "/admin",
    users: "/admin/users",
    products: "/admin/products"
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
  Promise.all([getProducts(), getCategories(), navigation()]).then(
    ([products, categories, navigationLinks]) => {
      res.render("products", {
        title: "Phoenix - Products",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        products: products,
        categories: categories
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

const getProductDetails = reqId => {
  const productById = ProductModel.findById(reqId, function(err, product) {
    return product;
  });
  return productById;
};

exports.updateProductDetails = (req, res) => {
  Promise.all([getProductDetails(req.params.id)])
    .then(([productById]) => {
      var newProduct = {
        productById,
        ...req.body
      };

      if (req.files.length > 0) {
        const imgUrl = req.files[0].url;
        const thumbnailUrl = req.files[1].url;
        newProduct = {
          newProduct,
          image: imgUrl,
          thumbnail: thumbnailUrl,
          thumbnails: [thumbnailUrl],
          images: [imgUrl]
        };
      }

      const query = { _id: req.params.id };
      ProductModel.findOneAndUpdate(query, newProduct, function(err) {
        console.log(newProduct);
        if (err) {
          console.log(err);
          res.redirect("/admin/products/");
          res.status(500, { error: err });
          return;
        } else {
          return res.redirect("/admin/products/" + req.params.id);
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(error, "Promise error");
    });
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

const getUserDetails = reqId => {
  const userById = UserModel.findById(reqId, function(err, user) {
    return user;
  });
  return userById;
};
