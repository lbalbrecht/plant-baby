// localhost:3001/api/plant
const router = require('express').Router();
const tokenAuth = require('../../middleware/tokenAuth')
const { Inventory, Plant, User} = require('../../models');

//WORKING
// CREATE a plant
// localhost:3001/api/plant
router.post('/', tokenAuth, async (req, res) => {
    try {
      const newPlant = await Plant.create(req.body);
      res.status(200).json(newPlant);
  
    } catch (err) {
      res.status(500).json(err);
    }
});

//WORKING
// GET plant by Id
// localhost:3001/api/plant/:id
router.get('/:id', tokenAuth, async (req, res) => {
    try {
      const plantData = await Plant.findOne({
        where: {id: req.params.id},
        include: Inventory
      });
      if (!plantData) {
        res.status(404).json({ message: 'No plant found with that id!' });
        return;
      } 
      res.status(200).json(plantData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// WORKING
// UPDATE a plant by id
// localhost:3001/api/plant/:id
router.put('/:id', tokenAuth, async (req, res) => {
    try {
      const updatedPlantData = await Plant.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      
      if(!updatedPlantData) {
        res.status(400).json({ message: 'No such plant' })
        return;
      }
      res.status(200).json(updatedPlantData);
  
    } catch (err) {
      res.status(500).json(err);
    }
});

// WORKING
// DELETE a plant by id
// localhost:3001/api/plant/:id
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const plantData = await Plant.destroy({
        where: {
            id: req.params.id,
        },
    });
     if (!plantData) {
         res.status(404).json({ message: 'No plant found with that id!' });
         return;
     }
     res.status(200).json(plantData);
  
  } catch (err) {
      res.status(500).json(err);
  }  
});

//WORKING
// find all plants
// localhost:3001/api/plant/plants
router.get('/plants', tokenAuth, (req, res) => {
    Plant.findAll().then(plants=> {
        res.json(plants)
    }).catch(err=> {
        res.status(500).json({ message:"error", err })
    })
});

module.exports = router; 