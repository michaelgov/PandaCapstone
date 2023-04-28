import express from 'express';
let router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let citations = await req.models.Citation.find();

        res.json(citations);
    } catch (error) {
        console.log("Error loading resources: ", error);
        res.status(500).json({status: "error", error: error});
    }
});

export default router;