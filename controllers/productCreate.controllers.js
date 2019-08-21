// models
const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
// Register Page
exports.getProductCreatePage = (req, res) => {
  Promise.all([navigation(), getCategories()]).then(
    ([navigationLinks, categories]) => {
      res.render("productCreate", {
        title: "Phoenix - Product Create",
        adminLink: navigationLinks.admin,
        usersLink: navigationLinks.users,
        productsLink: navigationLinks.products,
        indexLink: navigationLinks.index,
        registerLink: navigationLinks.register,
        loginLink: navigationLinks.login,

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

const getCategories = () => {
  const categories = CategoryModel.find({})
    .limit(50)
    .exec()
    .then(categories => {
      return categories;
    });
  return categories;
};

// Product Create
const Joi = require("joi");

const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  shortDescription: Joi.string().required(),
  categoryId: Joi.string().required(),
  salePrice: Joi.number().required(),
  originalPrice: Joi.number().required()
});

exports.productCreate = async (req, res, next) => {
  try {
    const result = Joi.validate(req.body, productSchema);
    if (result.error) {
      console.log(result.error);
      res.redirect("");
      return;
    }

    const product = await ProductModel.findOne({ name: result.value.name });
    if (product) {
      res.redirect("");
      return;
    }

    if (req.files) {
      const imgUrl = req.files[0].url;
      const thumbnailUrl = req.files[1].url;
      const resultProduct = {
        ...result.value,
        image: imgUrl,
        thumbnail: thumbnailUrl,
        thumbnails: [thumbnailUrl],
        images: [imgUrl]
      };
      const newProduct = await new ProductModel(resultProduct);
      await newProduct.save();
      res.redirect("/admin/products/" + newProduct._id);
    } else {
    }
  } catch (error) {
    next(error);
  }
};
