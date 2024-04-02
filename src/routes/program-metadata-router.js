const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

router.get("/movie/search/:query", programMetadataController.searchMovies)
router.get("/tv-show/search/:query", programMetadataController.searchTvShows)

module.exports = router
