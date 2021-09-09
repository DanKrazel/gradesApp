import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let grades

export default class gradesDAO {
  static async injectDB(conn) {
    if (grades) {
      return
    }
    try {
        grades = await conn.db(process.env.RESTREVIEWS_NS).collection("grades")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in gradesDAO: ${e}`,
      )
    }
  }

  static async getGrades({
    filters = null,
    page = 0,
    gradesPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("student_id" in filters) {
        query = { "student_id": { $eq: parseInt(filters["student_id"]) } }
      } else if ("type" in filters) {
        query = { "scores.type": { $eq: filters["type"] } }
      } else if ("class_id" in filters) {
        query = { "class_id": { $eq: parseInt(filters["class_id"]) } }
      }
    }

    let cursor
    
    try {
      cursor = await grades
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { gradesList: [], totalNumGrades: 0 }
    }

    const displayCursor = cursor.limit(gradesPerPage).skip(gradesPerPage * page)

    try {
      const gradesList = await displayCursor.toArray()
      const totalNumGrades = await grades.countDocuments(query)

      return { gradesList, totalNumGrades }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { gradesList: [], totalNumGrades: 0 }
    }
  }

  static async getClass() {
    let class_id = []
    try {
      class_id = await grades.distinct("class_id")
      return class_id
    } catch(e) {
      console.error(`Unable to get class, ${e}`)
      return class_id
    }
  }
}