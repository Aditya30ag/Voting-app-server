import React, { useEffect,useContext,useState} from "react";
import { useNavigate } from "react-router-dom";
import Noteitem from "./Noteitem";
import Notecontext from "../context/notes/NotesContext";

export default function Content(props) {

  const a = useContext(Notecontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      a.getNotes();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);


  const [disable,setdisable]=useState(false);
  const [newvalue,setnewvalue]=useState();
  const handleonclick=async(note)=>{
    //e.preventDefault()
    //console.log(e.note)
    console.log(note);
    setnewvalue(note);
    await a.getuser()
    setdisable(true)
  }
  const handleonclick2=async(e)=>{
    e.preventDefault()
    if(handleonclick){
      const c=a.user._id
      console.log(c);
      await newvalue.voteCount++;
      await a.updatecandidate(newvalue._id,newvalue.name,newvalue.party,newvalue.voteCount);
      await a.updateuser(c,a.user.name,a.user.email,a.user.aadharNumber,a.user.isvoted);
      setdisable(false);
      localStorage.removeItem("token");
      navigate("/end");
      props.handleonClick2();
    }else{

    }
  }
  return (
    <>
    <div className="container my-4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="container" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",boxSizing: "border-box"}}>
        { 
          a.notes.map((note) => {
            return (
              <div>
              <Noteitem
                key={note._id}
                note={note}
                name={note.name}
                party={note.party}
                handleonClick2={props.handleonClick2}
                handleonclick={handleonclick}
                disable={disable}
              />
              </div>
            );
          })
        }
      </div>
      <div ><button className='btn btn-primary' onClick={handleonclick2} type="submit" style={{position:"relative",bottom:"20px",marginLeft:"10px"}}>Submit</button></div>
    </div>
    </>
  );
}
