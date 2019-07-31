const usersData = require("../data/users.json");
const productsData = require("../data/products.json");
const _ = require("lodash");

// Admin
exports.getSearchPage = (req, res) => {
  Promise.all([query(req.query), navigation()]).then(
    ([queryResults, navigationLinks]) => {
      console.log(queryResults);
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
  const users = await getUsers();
  const queryResults = { users: [], products: [] };
  const products = await getProducts();
  const searchInput = value.searchInput.toLowerCase();

  const userFilter = _.forEach(users, function(user) {
    const firstNameToLowerCase = user.firstName.toLowerCase();
    const lastNameToLowerCase = user.lastName.toLowerCase();
    if (firstNameToLowerCase.includes(searchInput)) {
      queryResults.users.push(user);
    } else if (lastNameToLowerCase.includes(searchInput)) {
      queryResults.users.push(user);
    }
  });

  const productFilter = _.forEach(products, function(product) {
    const productNameToLowerCase = product.name.toLowerCase();
    if (productNameToLowerCase.includes(searchInput)) {
      queryResults.products.push(product);
    }
  });

  return queryResults;
};

const getUsers = async () => {
  return (users = usersData.body);
};

const getProducts = async () => {
  return (products = productsData.body);
};
