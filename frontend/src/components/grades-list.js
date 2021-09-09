import React, {useState, useEffect} from "react"
import GradesDateService from "../services/grades"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const GradesList = props => {
  const [grades, setGrades] = useState([]);
  const [searchStudentID, setSearchStudentID ] = useState("");
  const [searchType, setSearchType ] = useState("");
  const [searchClass, setSearchClass ] = useState("");
  const [class_id, setClass] = useState(["All Class"]);

  useEffect(() => {
    retrieveGrades();
    retrieveClass();
  }, []);

  return (
    <div className="App">
      Hello world....
    </div>
  );
}

export default GradesList;
