import gradesDAO from "../dao/gradesDAO.js"

export default class GradesController {
  static async apiGetGrades(req, res, next) {
    const gradesPerPage = req.query.gradesPerPage ? parseInt(req.query.gradesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.student_id) {
      filters.student_id = req.query.student_id
    } else if (req.query.type) {
      filters.type = req.query.type
    } else if (req.query.class_id) {
      filters.class_id = req.query.class_id
    }

    const { gradesList, totalNumGrades } = await gradesDAO.getGrades({
      filters,
      page,
      gradesPerPage,
    })

    let response = {
      grades: gradesList,
      page: page,
      filters: filters,
      entries_per_page: gradesPerPage,
      total_results: totalNumGrades,
    }
    res.json(response)

  }


  static async apiGetGradesClass(req, res, next) {
    try {
      let class_id = await gradesDAO.getClass()
      res.json(class_id)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}