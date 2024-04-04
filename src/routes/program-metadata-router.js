const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")
const { asyncHandler } = require("../middleware/error_handler")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

router.get("/movie/search/:query", asyncHandler(programMetadataController.searchMovies))
router.get("/tv-show/search/:query", asyncHandler(programMetadataController.searchTvShows))

router.get("/movie/:id", asyncHandler(programMetadataController.getMovieDetails))
router.get("/tv-show/:id", asyncHandler(programMetadataController.getTvShowDetails))

module.exports = router
