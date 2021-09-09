import React, {useState, useEffect} from "react"
import GradesDataService from "../services/grades"
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

  const onChangeSearchStudentID = e => {
    const searchStudentID = e.target.value;
    console.log(searchStudentID)
    setSearchStudentID(searchStudentID);
  };

  const onChangeSearchType = e => {
    const searchType = e.target.value;
    setSearchType(searchType);
  };

  const onChangeSearchClass = e => {
    const searchClass = e.target.value;
    console.log(e.target.value)
    setSearchClass(searchClass);
    
  };

  const retrieveGrades = () => {
    GradesDataService.getAll()
      .then(response => {
        console.log(response.data);
        setGrades(response.data.grades);       
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveClass = () => {
    GradesDataService.getClass()
      .then(response => {
        console.log(response.data);
        setClass(["All Class"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveGrades();
  };

  const find = (query, by) => {
    GradesDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setGrades(response.data.grades);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByStudentID = () => {
    find(searchStudentID, "student_id")
  };

  const findByType = () => {
    find(searchType, "type")
  };

  const findByClass = () => {
    if (searchClass === "All Class") {
      refreshList();
    } else {
      find(searchClass, "class_id")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by studentID"
            value={searchStudentID}
            onChange={onChangeSearchStudentID}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByStudentID}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by type"
            value={searchType}
            onChange={onChangeSearchType}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByType}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchClass}>
             {class_id.map(classe_id => {
               return (
                 <option value={classe_id} key={classe_id} > {classe_id.toString()} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByClass}
              >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {grades.map((grade) => {
          const scoreExam = `${grade.scores[0].score}`;
          const scoreQuiz = `${grade.scores[1].type} ${grade.scores[1].score}`;
          const scoreHomework1 = `${grade.scores[2].type} ${grade.scores[2].score}`;
          const scoreHomework2 = `${grade.scores[3].type} ${grade.scores[3].score}`;
          return (
            <div className="col-lg-4 pb-1" key={grade._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">student_id : {grade.student_id}</h5>
                  <p className="card-text">
                    <strong>Class: </strong>{grade.class_id}<br/>
                    <strong>Scores: </strong>{scoreExam}
                  </p>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};


export default GradesList;
