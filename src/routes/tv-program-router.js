/**
 * This nampespace defines the routes for accessing the data from the Mediaset API and Rai API
 * @namespace API.TvProgram
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const MediasetTvProgramController = require("../controllers/tv-program-controllers/mediaset-tv-program-controller")
const RaiTvProgramController = require("../controllers/tv-program-controllers/rai-tv-program-controller")
const { asyncHandler } = require("../middleware/error_handler")

// eslint-disable-next-line no-unused-vars
const API = require("./router")

/**
 * Base route of the TV Programs API
 * @name Root
 * @route {GET} /api/tv-program
 * @memberof API.TvProgram
 */
const router = express.Router()

const mediasetTvProgramController = new MediasetTvProgramController()
const raiTvProgramController = new RaiTvProgramController()

router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

const mediasetRouter = express.Router()

/**
 * Get the TV programs of the week for a specific Mediaset channel. <br>
 * The data is retrieved from the Adapter Layer and then parsed into the TvProgram object
 * @name MediasetTodayGet
 * @route {GET} /api/tv-program/mediaset/week/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/mediaset/week/C5
 *
 * // Example of response
 * {
 *  "data": [
 *     {"title":"Tg5","description":"Le notizie piu' importanti, nazionali e internazionali, con approfondimenti e rubriche. A cura della redazione giornalistica di Canale 5.","channel_id":"C5","category":"Informazione","start_time":"2024-05-28T18:13:00.000Z","end_time":"2024-05-28T18:50:00.000Z"},
 *     {"title":"Striscia la notizia","description":"Tg satirico che amplia quotidianamente il suo impegno di denuncia, dando voce ai cittadini/consumatori e cercando di risolvere problemi.","channel_id":"C5","category":"Intrattenimento","start_time":"2024-05-28T18:50:00.000Z","end_time":"2024-05-28T19:47:00.000Z"},
 *     ...
 *   ]
 * }
 */
mediasetRouter.get(
    "/week/:channelId",
    asyncHandler(mediasetTvProgramController.getWeekProgramsForChannel),
)

router.use("/mediaset", mediasetRouter)

const raiRouter = express.Router()

/**
 * Get the TV programs of the week for a specific Rai channel. <br>
 * The data is retrieved from the Adapter Layer and then parsed into the TvProgram object
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/rai/week/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/rai/week/rai-1
 *
 * // Example of response
 * {
 *  "data": [
 *    {"title":"Porta a Porta - Puntata del 28/05/2024","description":"Programma di informazione e approfondimento di Bruno Vespa dedicato all'attualità politica, alla cronaca e al costume.... - Un programma di Bruno Vespa Con la collaborazione di Antonella Martinelli, Maurizio Ricci, Giuseppe Tortora, Paola Miletich, Vito Sidoti, Concita Borrelli E di Vladimiro Polchi Produttore esecutivo Rossella Lucchi Regia di Sabrina Busiello","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:30:00.000Z","end_time":"2024-05-28T21:55:00.000Z"},
 *    {"title":"TG1 Sera","description":"","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:55:00.000Z","end_time":"2024-05-28T22:00:00.000Z"}
 *    ...
 *   ]
 * }
 */
raiRouter.get("/week/:channelId", asyncHandler(raiTvProgramController.getWeekProgramsForChannel))

router.use("/rai", raiRouter)

module.exports = router
