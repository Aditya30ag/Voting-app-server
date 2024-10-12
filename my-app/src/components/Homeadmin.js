import React, { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Noteitem1 from "./Noteitem1";
import Notecontext from "../context/notes/NotesContext";
import Modal from "./Modal";
import "./Homeadmin.css";

export default function Homeadmin(props) {
  const ref = useRef("null");
  const refclose = useRef("null");
  const a = useContext(Notecontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token1")) {
      a.getNotes();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const [notes, setnotes] = useState({
    id: "",
    name: "",
    party: "",
  });
  const onchange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value });
  };
  const updatenote = (note) => {
    ref.current.click();
    setnotes({
      id: note._id,
      name: note.name,
      party: note.party,
    });
  };
  const handleonClick = async(e) => {
    e.preventDefault();
    await a.updatecandidate(notes.id, notes.name, notes.party, notes.voteCount);
    window.location.reload();
    refclose.current.click();
    props.handleonClick2();
  };
  const signuplogout=()=>{
    localStorage.removeItem("token1");
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      >
        Update a Note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "100px" }}
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ background: "linear-gradient(#E2EAF4,white)" }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update a Candidate
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" id="exampleModal">
              <Modal notes={notes} onchange={onchange} />
            </div> 
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleonClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container my-4"
        style={{
          display: "flex",
          padding: "10px 10px 10px 10px",
          flexDirection:"row",
          columnGap: "100px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent:"left",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
          {a.notes.map((note) => {
            return (
              <Noteitem1
                key={note._id}
                note={note}
                name={note.name}
                party={note.party}
                updatenote={updatenote}
              />
            );
          })}
          </div>
          <button className="btn btn-success"><Link to="/addcandidate" style={{textDecoration:'none',color:"whitesmoke"}}>Add a New Candidate</Link></button>
        </div>
        <div className="imgstyle" style={{ rowGap: "10px",textAlign:"center"}}>
          <img
            height="200px"
            style={{ backgroundSize: "cover", padding: "10px" }}
            src="Screenshot 2024-07-13 160018.png"
            alt="error"
          />
          <img
            height="200px"
            style={{ backgroundSize: "cover", padding: "10px" }}
            src="Screenshot 2024-07-13 160936.png"
            alt="error"
          />
          <img
            height="200px"
            style={{ backgroundSize: "cover", padding: "10px" }}
            src="Screenshot 2024-07-13 161551.png"
            alt="error"
          />
          <img
            height="400px"
            style={{ backgroundSize: "cover", padding: "10px" }}
            src="Screenshot 2024-07-13 160104.png"
            alt="error"
          />
          <div><Link to="/signupadmin" style={{textDecoration:"none"}} onClick={signuplogout}>Add a new admin user</Link></div>
        </div>
      </div>
    </>
  );
}
