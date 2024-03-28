const express = require("express")
const MediasetTvProgramController = require("../controllers/tv-program-controllers/mediaset-tv-program-controller")
const RaiTvProgramController = require("../controllers/tv-program-controllers/rai-tv-program-controller")

const router = express.Router()
const mediasetTvProgramController = new MediasetTvProgramController()
const raiTvProgramController = new RaiTvProgramController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

const mediasetRouter = express.Router()
mediasetRouter.get("/week/:channelId", mediasetTvProgramController.getWeekProgramsForChannel)
router.use("/mediaset", mediasetRouter)

const raiRouter = express.Router()
raiRouter.get("/week/:channelId", raiTvProgramController.getWeekProgramsForChannel)
router.use("/rai", raiRouter)

module.exports = router
