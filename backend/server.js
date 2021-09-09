import express from "express"
import cors from "cors"
import grades from "./api/grades.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/grades",grades)
app.use("*",(req, res) => res.status(404).json({error:"not found"}))

export default app