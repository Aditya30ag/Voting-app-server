import React, { useEffect } from "react";
//import { Link } from "react-router-dom";
import "./main.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleonclickdir=(e)=>{
    navigate(`${e.target.value}`);
    if (localStorage.getItem('token')){
      localStorage.removeItem('token')
    }else if (localStorage.getItem('token1')){
      localStorage.removeItem('token1')
    }else{
      
    }
  }
  return (
    <div
      id="photo"
      style={{
        background: "linear-gradient(#E2EAF4,white)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div
          style={{
            color: "black",
            fontSize: "70px",
            fontFamily: "ui-sans-serif",
            marginTop: "20px",
          }}
        >
          Welcome to
        </div>
        <div
          className="container mx-3"
          style={{
            color: "black",
            fontSize: "40px",
            fontFamily: "ui-sans-serif",
          }}
        >
          Voting app
        </div>
        <div className="container mx-3 my-3 dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          <div
            className="btn btn-secondary dropdown-toggle"
            id="a"
            style={{
              fontSize: "15px",
              textDecoration: "none",
              color: "black",
              padding: "5px 10px 5px 10px",
              border: "2px solid white",
              borderRadius: "4px",
              width: "120px",
              backgroundColor:'rgb(163, 169, 185)',
            }}
          >
            GET Started <i className="fa-solid fa-arrow-right"></i>
          </div>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" value="/login" onClick={handleonclickdir}>
                  Voter
                </button>
                <button className="dropdown-item" value="/admin" onClick={handleonclickdir}>
                  admin
                </button>
              </li>
            </ul>
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
}
