const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const bookController = require('../controllers/BookController');
const router = express.Router();


router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// router.get("/")
module.exports = router