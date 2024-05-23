/**
 * This nampespace defines the routes for accessing the database
 * @namespace API.Db
 * @category API
 * @subcategory Internal Resources
 * @requires express
 * @requires DbController
 */

const express = require("express")
const router = express.Router()

/**
 * Base route of the database API
 * @name Root
 * @route {GET} /api/db
 * @memberof API.Db
 */
router.get("/", (req, res) => {
    res.send("This is the DB endpoint!")
})

router.use("/tv-program", require("./db-tv-program-router"))

module.exports = router
