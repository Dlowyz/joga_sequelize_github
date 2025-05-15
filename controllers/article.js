const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:1234@localhost:3306/joga_sequelize')

const Article = require("../models/article")(sequelize, Sequelize.DataTypes)

const getAllArticles = async (req, res) => {
    const articles = await Article.findAll()
    res.json(articles)
}

const getArticleBySlug = (req, res) => {
  Article.findOne({
    where: {
      slug: req.params.slug
    }
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
