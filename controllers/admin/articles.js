const { Article } = require('../../models');

exports.addArticle = async (req, res) => {
  try {
    const { name, slug, image, body, author_id, published } = req.body;
    const newArticle = await Article.create({ name, slug, image, body, author_id, published });
    res.status(201).json({ message: 'Article created', article: newArticle });
  } catch (error) {
    console.error('Validation errors:', error.errors);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getEditArticleForm = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).send('Article not found');
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { name, slug, image, body, author_id, published } = req.body;
    const [updated] = await Article.update(
      { name, slug, image, body, author_id, published },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedArticle = await Article.findByPk(req.params.id);
      return res.json({ message: 'Article updated', article: updatedArticle });
    }
    res.status(404).send('Article not found');
  } catch (error) {
    console.error('Validation errors:', error.errors);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Article deleted' });
    }
    res.status(404).send('Article not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
