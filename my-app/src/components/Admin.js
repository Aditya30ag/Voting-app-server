import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./logout.css"


export default function Admin(props) {
  const [credentials, setcredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [content, setcontent] = useState("");
  const password = document.querySelector("#exampleInputPassword1");

  const handleonClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/admin/loginadmin";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success === true) {
      localStorage.setItem("token1", json.token1);
      navigate("/homeadmin");
      props.showalert();
    } else {
      props.showalert();
      if(json.success1===false){
        setcontent(json.error);
      }
      password.style.border = "1px solid red";
      setcontent(json.error);
    }
  };
  const onchange = async(e) => {
    //setcredential({ ...credentials, [e.target.name]: e.target.value });
    await setcredential({ ...credentials, [e.target.name]: e.target.value });
    //password.style.border = "";
    setcontent("");
  };
  return (
    <div className="container1" style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",left: "50%",transform: "translateX(-50%)",zIndex:"10"}}>
      <div
        className="container container1adminlogin"
        style={{
          marginTop: "100px",
          maxWidth: "500px",
          minHeight: "370px",
          border: "2px solid #EAEAEA",
          boxSizing: "border-box",
          paddingTop: "40px",
          borderRadius: "12px",
          boxShadow: "0px 10px 25px #000",
          fontWeight:"700",
          //backgroundColor:"whitesmoke",//#E4F1E8
          //opacity:"1",
        }}
      >
        <h3 style={{fontFamily:"arial",fontSmooth:"2px",fontWeight:"700",marginBottom:"20px"}}>Login into a account</h3>
        <form onSubmit={handleonClick} style={{ columnGap: "20px" }}>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
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
            <p style={{ color: "red" }}>{content}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "0px", marginBottom: "18px" }}
          >
            Login
          </button>
          <Link to="/signupadmin" style={{textDecoration:"none"}}>New to this App</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
