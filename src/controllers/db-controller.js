const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3040"
const TV_PROGRAMS_LAST_UPDATE_GET = `${DATA_SERVICE_URL}/api/db/tv-program/get-last-update`
const TV_PROGRAM_INSERT = `${DATA_SERVICE_URL}/api/db/tv-program/insert`

class DbController {
    async getLastTvProgramUpdate(req, res) {
        try {
            req.log.info(`Calling data service: ${TV_PROGRAMS_LAST_UPDATE_GET}`)
            const response = await axios.get(TV_PROGRAMS_LAST_UPDATE_GET)

            if (response.status === 200) {
                req.log.info("Data service response is OK")
                res.send({ data: response.data.data })
            }

            throw new Error("Invalid response from data service")
        } catch (error) {
            req.log.error(`Error getting last tv program update: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting last tv program update" },
            })
        }
    }

    async insertTvProgram(req, res) {
        try {
            var data = req.body

            req.log.info(`Calling data service: ${TV_PROGRAM_INSERT}`)
            const response = await axios.post(TV_PROGRAM_INSERT, data.data)

            if (response.status === 200) {
                req.log.info("Data service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from data service")
            }
        } catch (error) {
            req.log.error(`Error inserting tv program: ${error.message}`)
            res.status(500).send({
                error: { message: "Error inserting tv program" },
            })
        }
    }
}

module.exports = DbController
