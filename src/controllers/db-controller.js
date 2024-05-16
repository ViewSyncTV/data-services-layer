const axios = require("axios")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3040"
const TV_PROGRAM_LAST_UPDATE_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/get-last-update`
const TV_PROGRAM_INSERT = `${ADAPTER_SERVICE_URL}/api/db/tv-program/insert`
const TV_PROGRAM_TODAY_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/today`
const TV_PROGRAM_WEEK_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/week`
const TV_PROGRAM_RAI_CHANNEL_LIST_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/rai-channel-list`
const TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/mediaset-channel-list`

class DbController {
    async getLastTvProgramUpdate(req, res) {
        req.log.info(`Calling adapter service: ${TV_PROGRAM_LAST_UPDATE_GET}`)

        const response = await axios.get(TV_PROGRAM_LAST_UPDATE_GET)

        req.log.info("Adapter service response is OK")
        res.send({ data: response.data.data })
    }

    async insertTvProgram(req, res) {
        try {
            var data = req.body

            req.log.info(`Calling adapter service: ${TV_PROGRAM_INSERT}`)
            const response = await axios.post(TV_PROGRAM_INSERT, data.data)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error inserting tv program: ${error.message}`)
            res.status(500).send({
                error: { message: "Error inserting tv program" },
            })
        }
    }

    async getTodayTvPrograms(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_TODAY_GET}`)
            const response = await axios.get(TV_PROGRAM_TODAY_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting today's tv programs: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting today's tv programs" },
            })
        }
    }
    async getWeekTvPrograms(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_WEEK_GET}`)
            const response = await axios.get(TV_PROGRAM_WEEK_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting week's tv programs: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting week's tv programs" },
            })
        }
    }

    async getRaiChannelList(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_RAI_CHANNEL_LIST_GET}`)
            const response = await axios.get(TV_PROGRAM_RAI_CHANNEL_LIST_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting Rai channel list: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting Rai channel list" },
            })
        }
    }

    async getMediasetChannelList(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET}`)
            const response = await axios.get(TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting Mediaset channel list: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting Mediaset channel list" },
            })
        }
    }
}

module.exports = DbController
