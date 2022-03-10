const router = require("express").Router();

//import all controller
const { createUser, updateUser, getUser, deleteUser } = require("../controller/userController");
const {createProduct, getProduct, updateProduct, deleteProduct} = require("../controller/productController");
const {createOwner, getOwner, deleteOwner, updateOwner } = require("../controller/ownerController")
const {createWorker, getWorker} = require("../controller/workerController")
//all methode for create
router.post("/createUser", createUser);
router.post("/createProduct", createProduct);
router.post("/createOwner", createOwner);
router.post("/createWorker", createWorker);
//all methode for get details
router.get("/detailsUser", getUser);
router.get("/productDetails", getProduct);
router.get("/workerDetails", getWorker);
router.get("/ownerDetails", getOwner);
//all delete methode
router.get("/deleteOwner", deleteOwner);
router.get("/deleteProduct", deleteProduct);
router.get("deleteUser", deleteUser);

//all update methode
router.get("/updateUser", updateUser);
router.get("/UpdateOwner", updateOwner);
router.get("/updateProduct", updateProduct);


module.exports = router;