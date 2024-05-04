import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../Navbar";
import { Link } from 'react-router-dom';
import '../App.css'
 
const UploadBulkQuiz = ()=>{
    const[files , setFiles]=useState(undefined);
    
    
    const inputref = useRef();
 
    const handleDragOver = (event)=>{
        event.preventDefault();
    };
 
    const handleDrop = (event)=>{
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

   

  return (
    <>
        <Navbar />
        
        <h5 style={{marginTop:"5%" , marginLeft:"42%"}}>Upload Question from device </h5>
        <div id='dropzone'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
            <FaCloudUploadAlt  style={{fontSize:"50px" , marginTop:"-3%"}}/>
            <h5>Drag and Drop Files to Upload</h5>
            <h5>Or</h5>
            <input type='file' multiple onChange={(event)=>setFiles(event.target.files)} hidden ref={inputref}/>
            <button onClick={(e)=> {e.preventDefault();inputref.current.click()}}>Browse Files</button>
        </div>
        <div style={{marginLeft:"15%",marginTop:"2%"}}>
            <h5>Supported File formats : .xlsx</h5>
            </div>
            <div style={{marginLeft:"75%",marginTop:"2%"}}>
            <h6>Download <Link style={{textDecoration:"none"}}>file</Link> formats</h6></div>
   
     {files ?<>
            <div >
        <ul>
            {Array.from(files).map((file,idx)=><li key={idx}>{file.name}</li>)}
        </ul>
        
        </div></>:<>
        </>
        
    }
    
   
   
    </>
  )
};
 
export default UploadBulkQuiz
 