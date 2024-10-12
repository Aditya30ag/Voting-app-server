import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signupadmin(props) {
  const [credentials, setcredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [content, setcontent] = useState("");
  const password = document.querySelector("#exampleInputEmail1");
  const navigate = useNavigate();
  const handleonClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/admin/createadmin";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success === true) {
      localStorage.setItem("token1", json.token1);
      navigate("/homeadmin");
      props.handleonClick2();
    } else {
      props.showalert();
      password.style.border = "1px solid red";
      setcontent("User with this Email is already exist");
    }
  };
  const onchange = async (e) => {
    await setcredential({ ...credentials, [e.target.name]: e.target.value });
    //password.style.border = "";
    setcontent("");
  };
  return (
    <>
      <div className="container1" style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",left: "50%",transform: "translateX(-50%)",zIndex:"10"}}>
      <div
        className="container container1adminlogin"
        style={{
          marginTop: "50px",
          maxWidth: "500px",
          minHeight: "400px",
          border: "2px solid #EAEAEA",
          boxSizing: "border-box",
          paddingTop: "40px",
          borderRadius: "12px",
          boxShadow: "0px 10px 25px #000",
          fontWeight:"700",
          // backgroundColor:"whitesmoke",//#E4F1E8
          // opacity:"0.8",
        }}
      >
        <h3 style={{fontFamily:"arial",fontSmooth:"2px",fontWeight:"700"}}>Create a account</h3>
          <form onSubmit={handleonClick}>
            <div className="mb-3 my-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                value={credentials.name}
                onChange={onchange}
              />
            </div>
            <div className="mb-3 my-2">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={onchange}
              />
              <p style={{ color: "red", marginTop: "5px", marginLeft: "2px" }}>
                {content}
              </p>
            </div>
            <div className="mb-3 my-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onchange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary my-2"
              onClick={handleonClick}
            >
              SignUp
            </button>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <p onClick={props.handleonClick2}>
                {" "}
                Already have an account.. Login
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
