const express = require("express")
const TvProgramController = require("../controllers/tv-program-controller")

const router = express.Router()
const tvProgramController = new TvProgramController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

router.post("/mediaset", tvProgramController.parseMediasetPrograms)

module.exports = router
