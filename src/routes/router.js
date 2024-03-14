const express = require("express")

const router = express.Router()

router.all("/", (req, res) => {
    res.send("API endpoint")
})
router.use("/tv-program", require("./tv-program-router"))
router.use("/db", require("./db-router"))

module.exports = router
