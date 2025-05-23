const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:1234@localhost:3306/joga_sequelize')
const models = require("../models")
const Article = require("../models/article")(sequelize, Sequelize.DataTypes)

// get all data from table
const getAllArticles = (req, res) => {
  models.Article.findAll()
    .then(articles => {
      console.log(articles);
      return res.status(200).json({ articles });
    })
    .catch(error => {
      return res.status(500).send(error.message);
    });
};

// show article by this slug
const getArticleBySlug = (req, res) => {
  models.Article.findOne({
    where: {
      slug: req.params.slug
    },
    include: [
      {
        model: models.Author,
      },
      {
        model: models.Tag,
        through: models.ArticleTag
      }
    ]
  })
  .then(article => {
    console.log(article);
    return res.status(200).json({ article });
  })
  .catch(error => {
    return res.status(500).send(error.message);
  });
};


module.exports = {
    getAllArticles,
    getArticleBySlug
};
