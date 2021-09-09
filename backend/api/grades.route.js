import express from "express"
import GradesCtrl from "./grades.controller.js"


const router = express.Router()

router.route("/").get(GradesCtrl.apiGetGrades)
router.route("/class").get(GradesCtrl.apiGetGradesClass)

export default router