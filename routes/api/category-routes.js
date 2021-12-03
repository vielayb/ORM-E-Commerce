const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    // Query configuration
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', (req, res) => {
    Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })
      .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
