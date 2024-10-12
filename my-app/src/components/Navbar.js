import React, { useEffect,useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./logout.css";
import TidioChat from "./Tidiochat";

export default function Navbar(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const[articles,setarticles]=useState("");
  const[main,setmain]=useState("");
  const updatenews = async () => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&appid=190dfc4fed3386777429b9d4bc2ed376`;
    let data = await fetch(url);
    let response = await data.json();
    setmain(response.weather[0].main);
    let temp=response.main.temp-273;
    let a=temp.toFixed(1);
    setarticles(a);
  };


  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token1");
    navigate("/");
    props.showalert();
    props.handleonClick2();
  };
  const exit =async()=>{
    props.handleonClick2();
    navigate(`${location.pathname}`);
  }
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-${location.pathname === "/" ? "light" : "light"}`} style={{backgroundColor:"transparent",zIndex:'10'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={logout}>
          Voting app
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
                onClick={exit}
                aria-current="page"
                style={{cursor:"pointer"}}
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={props.handleonClick2}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <div style={{marginRight:"10px"}}><i className="fa-solid fa-cloud" style={{marginRight:"10px"}}></i>{main}  {articles}°C</div>
          {!localStorage.getItem("token")&&!localStorage.getItem("token1")? (
            
            <div style={{display:location.pathname === "/login"||location.pathname === "/signup"||location.pathname === "/admin"?'flex':'none'}}>
            <form className="d-flex" role="search">
            {location.pathname !== "/admin"&&
              <Link to="/login" style={{textDecoration: "none"}}>
                <button
                  className="same-btn"
                  type="submit"
                  onClick={props.handleonClick2}
                  style={{ marginRight: "10px" }}
                >
                  Login
                </button>
              </Link>}{location.pathname !== "/admin"&&
              <Link to="/signup" style={{textDecoration: "none"}}>
                <button
                  className="same-btn"
                  type="submit"
                  onClick={props.handleonClick2}
                >
                  SignUp
                </button>
             
              </Link> }
            </form>
            </div>
          ) : (
            <>
              <button className="logout-btn" onClick={logout}>
              <i class="fas fa-sign-out-alt"></i>Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
    <div><TidioChat/></div>
    </>
  );
}
