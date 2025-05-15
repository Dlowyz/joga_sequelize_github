const express = require('express');
const router = express.Router();
const articleAdminController = require('../../controllers/admin/articles');
console.log('Admin controller:', articleAdminController);


// Lisa artikkel (POST)
router.post('/article/add', articleAdminController.addArticle);

// Artikli redigeerimine (GET ja POST)
router.route('/article/edit/:id')
  .get(articleAdminController.getEditArticleForm)
  .post(articleAdminController.updateArticle);

// Artikli kustutamine (POST)
router.post('/article/delete/:id', articleAdminController.deleteArticle);

module.exports = router;
