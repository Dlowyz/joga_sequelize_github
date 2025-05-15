const models = require('../models');

const getAuthorArticles = async (req, res) => {
    try {
        const author = await models.Author.findByPk(req.params.id, {
            include: [{
                model: models.Article
            }]
        });

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ author });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAuthorArticles
};