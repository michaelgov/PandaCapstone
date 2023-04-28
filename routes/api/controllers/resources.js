import express from 'express';
let router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let resourceType = req.query.type;

        let resources = await req.models.Resource.find({type: resourceType});

        console.log(resources);
        res.json(resources);
    } catch (error) {
        console.log("Error loading resources: ", error);
        res.status(500).json({status: "error", error: error});
    }
});

export default router;