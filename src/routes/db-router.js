const express = require("express")
const DbController = require("../controllers/db-controller")
const { asyncHandler } = require("../middleware/error_handler")

const router = express.Router()
const dbController = new DbController()

router.get("/", (req, res) => {
    res.send("This is the DB endpoint!")
})

const tvProgramRouter = express.Router()
tvProgramRouter.get("/get-last-update", asyncHandler(dbController.getLastTvProgramUpdate))
tvProgramRouter.post("/insert", asyncHandler(dbController.insertTvProgram))
tvProgramRouter.get("/today", asyncHandler(dbController.getTodayTvPrograms))
tvProgramRouter.get("/week", asyncHandler(dbController.getWeekTvPrograms))
tvProgramRouter.get("/rai-channel-list", asyncHandler(dbController.getRaiChannelList))
tvProgramRouter.get("/mediaset-channel-list", asyncHandler(dbController.getMediasetChannelList))
router.use("/tv-program", tvProgramRouter)

module.exports = router
