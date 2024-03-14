const express = require("express")
const DbController = require("../controllers/db-controller")

const router = express.Router()
const dbController = new DbController()

router.get("/", (req, res) => {
    res.send("This is the DB endpoint!")
})

const tvProgramRouter = express.Router()
tvProgramRouter.get("/get-last-update", dbController.getLastTvProgramUpdate)
tvProgramRouter.post("/insert", dbController.insertTvProgram)
tvProgramRouter.get("/today", dbController.getTodayTvPrograms)
router.use("/tv-program", tvProgramRouter)

module.exports = router
