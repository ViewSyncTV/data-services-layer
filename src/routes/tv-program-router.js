const express = require("express")
const MediasetTvProgramController = require("../controllers/tv-program-controllers/mediaset-tv-program-controller")

const router = express.Router()
const mediasetTvProgramController = new MediasetTvProgramController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

const mediasetRouter = express.Router()
mediasetRouter.get("/today/:channelId", mediasetTvProgramController.getTodayProgramsForChannel)
router.use("/mediaset", mediasetRouter)

module.exports = router
