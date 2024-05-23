/**
 * Part of the database API that handles the data related to the TV programs
 * @namespace API.Db.TvProgram
 * @category API
 * @subcategory Internal Resources
 * @requires express
 * @requires DbController
 */

const express = require("express")
const DbController = require("../../controllers/db-controller")
const { asyncHandler } = require("../../middleware/error_handler")
// eslint-disable-next-line no-unused-vars
const API = require("../router")

const dbController = new DbController()
const router = express.Router()

/**
 * Get the date of the last update of the TV programs in the database
 * @name GetLastUpdate
 * @route {GET} /api/db/tv-program/get-last-update
 * @memberof API.Db.TvProgram
 * @example
 * // Example of request
 * GET /api/db/tv-program/get-last-update
 *
 * // Example of response
 * {
 *   "data": "2024-05-21T09:19:45.481962+00:00"
 * }
 */
router.get("/get-last-update", asyncHandler(dbController.getLastTvProgramUpdate))

/**
 * Insert a list of TV programs in the database
 * @name TvProgramsInsert
 * @route {POST} /api/db/tv-program/insert
 * @bodyparam {Array<Types.TvProgram>} tvPrograms - The list of TV programs to insert
 * @memberof API.Db.TvProgram
 * @example
  // Example of request
 * POST /api/db/tv-program/insert
 * Content-Type: application/json
 *
 * [
 *   {
 *     "title": "Example Show",
 *     "description": "This is an example TV show.",
 *     "category": "Drama",
 *     "channel": "Example Channel",
 *     "channel_id": "example-channel",
 *     "start_time": "2024-05-22T19:00:00+00:00",
 *     "end_time": "2024-05-22T20:00:00+00:00"
 *   },
 *   {
 *     "title": "Another Show",
 *     "description": "This is another example TV show.",
 *     "category": "Comedy",
 *     "channel": "Another Channel",
 *     "channel_id": "another-channel",
 *     "start_time": "2024-05-22T21:00:00+00:00",
 *     "end_time": "2024-05-22T22:00:00+00:00"
 *   }
 * ]
 */
router.post("/insert", asyncHandler(dbController.insertTvProgram))

/**
 * Get the TV programs of today
 * @name TvProgramsTodayGet
 * @route {GET} /api/db/tv-program/today
 * @memberof API.Db.TvProgram
 * @example
 * // Example of request
 * GET /api/db/tv-program/today
 *
 * // Example of response
 * {
 *   "data": [
 *     {"id":305265,"title":"Sogni di gloria","description":"Con Giulia Nannini e Giorgiana Cristalli  Regia di Giovanna Romano A cura di Cecilia De Robertis e Linda Critelli","category":"RaiRadio2","channel":"","channel_id":"rai-radio-2","start_time":"2024-05-22T21:00:00+00:00","end_time":"2024-05-22T22:00:00+00:00"}
 *     {"id":305263,"title":"Back2Back","description":"Con Ema Stokholma e Gino Castaldo Regia di Leonardo Carioti e Alessandro Provenzano A cura di Laura Zullo","category":"RaiRadio2","channel":"","channel_id":"rai-radio-2","start_time":"2024-05-22T19:00:00+00:00","end_time":"2024-05-22T20:00:00+00:00"},
 *     ...
 *   ]
 * }
 */
router.get("/today", asyncHandler(dbController.getTodayTvPrograms))

/**
 * Get the TV Programs of the week
 * @name TvProgramsWeekGet
 * @route {GET} /api/db/tv-program/week
 * @memberof API.Db.TvProgram
 * // Example of request
 * GET /api/db/tv-program/week
 *
 * // Example of response
 * {
 *   "data": [
 *     {"id":305265,"title":"Sogni di gloria","description":"Con Giulia Nannini e Giorgiana Cristalli  Regia di Giovanna Romano A cura di Cecilia De Robertis e Linda Critelli","category":"RaiRadio2","channel":"","channel_id":"rai-radio-2","start_time":"2024-05-22T21:00:00+00:00","end_time":"2024-05-22T22:00:00+00:00"}
 *     {"id":305263,"title":"Back2Back","description":"Con Ema Stokholma e Gino Castaldo Regia di Leonardo Carioti e Alessandro Provenzano A cura di Laura Zullo","category":"RaiRadio2","channel":"","channel_id":"rai-radio-2","start_time":"2024-05-22T19:00:00+00:00","end_time":"2024-05-22T20:00:00+00:00"},
 *     ...
 *   ]
 * }
 */
router.get("/week", asyncHandler(dbController.getWeekTvPrograms))

/**
 * Get the list of the RAI channels
 * @name ChannelsListGetRai
 * @route {GET} /api/db/tv-program/rai-channel-list
 * @memberof API.Db.TvProgram
 * @example
 * // Example of request
 * GET /api/db/tv-program/rai-channel-list
 *
 * // Example of response
 * {
 *   "data": [
 *     {"id":"rai-1", "description":"Rai1", "company":"Rai"},
 *     {"id":"rai-2", "description":"Rai2", "company":"Rai"},
 *     ...
 *   ]
 * }
 */
router.get("/rai-channel-list", asyncHandler(dbController.getRaiChannelList))

/**
 * Get the list of the Mediaset channels
 * @name ChannelsListGetMediaset
 * @route {GET} /api/db/tv-program/mediaset-channel-list
 * @memberof API.Db.TvProgram
 * @example
 * // Example of request
 * GET /api/db/tv-program/mediaset-channel-list
 *
 * // Example of response
 * {
 *   "data": [
 *     {"id":"C5", "description":"Canale5", "company":"Mediaset"},
 *     {"id":"I1", "description":"Italia1", "company":"Mediaset"},
 *     ...
 *   ]
 * }
 */
router.get("/mediaset-channel-list", asyncHandler(dbController.getMediasetChannelList))

module.exports = router
