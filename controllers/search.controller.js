const usersData = require("../data/users.json");
const productsData = require("../data/products.json");

// models
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const _ = require("lodash");

// Admin
exports.getSearchPage = (req, res) => {
  Promise.all([query(req.query), navigation()]).then(
    ([queryResults, navigationLinks]) => {
      res.render("search", {
        title: "Phoenix - Dashboard",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,

        user: queryResults.users,
        product: queryResults.products
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

const query = async value => {
  const queryResults = { users: null, products: null };
  console.log(queryResults);
  const searchInput = value.searchInput.toLowerCase();
  const userMatch = await getUsers(searchInput);
  const products = await getProducts(searchInput);

  queryResults.users.push(userMatch);
  console.log(queryResults.users);
  console.log(userMatch);

  // const userFilter = _.forEach(users, function(user) {
  //   const firstNameToLowerCase = user.firstName.toLowerCase();
  //   const lastNameToLowerCase = user.lastName.toLowerCase();
  //   if (firstNameToLowerCase.includes(searchInput)) {
  //     queryResults.users.push(user);
  //   } else if (lastNameToLowerCase.includes(searchInput)) {
  //     queryResults.users.push(user);
  //   }
  // });

  const productFilter = _.forEach(products, function(product) {
    const productNameToLowerCase = product.name.toLowerCase();
    if (productNameToLowerCase.includes(searchInput)) {
      queryResults.products.push(product);
    }
  });

  return queryResults;
};

const getUsers = async query => {
  let user = {};
  user = UserModel.find(
    { firstName: new RegExp("\\b" + query + "\\b", "i") },
    function(err, userByQuery) {
      return { ...userByQuery };
    }
  );
  return user;
};

const getProducts = async () => {
  return (products = productsData.body);
};
