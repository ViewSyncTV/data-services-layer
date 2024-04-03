const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

router.get("/movie/search/:query", programMetadataController.searchMovies)
router.get("/tv-show/search/:query", programMetadataController.searchTvShows)

router.get("/movie/:id", programMetadataController.getMovieDetails)
router.get("/tv-show/:id", programMetadataController.getTvShowDetails)

module.exports = router
