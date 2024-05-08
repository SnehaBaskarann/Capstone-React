import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

import { Link } from 'react-router-dom';
import '../App.css'
import AdminNavbar from '../AdminNavbar';
 
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
      <AdminNavbar />
        <div id='uploadContent'>
        <h5 style={{marginTop:"-40%" , marginLeft:"25%"}}>Upload Question from device </h5>
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
        <div style={{marginLeft:"25%",marginTop:"2%"}}>
            <h5>Supported File formats : .xlsx</h5>
            <br/>
               
     {files ?<>
            <div >
              <h6>Selected File </h6>
            {Array.from(files).map((file,idx)=><p key={idx}>{file.name}</p>)}        
        </div></>:<>
        </>
        
    }
            </div>
            {/* <div style={{marginLeft:"65%",marginTop:"1px"}}>
            <h6>Download <Link style={{textDecoration:"none"}}>file</Link> formats</h6></div> */}
            <br/>
            <div class="position-absolute start-50 translate-middle">
            <button
            className="btn btn-secondary mt-3 "
            type="submit"
          >
            Upload
          </button>
          </div>
{/*          
     {files ?<>
            <div >
        <ul>
            {Array.from(files).map((file,idx)=><li key={idx}>{file.name}</li>)}
        </ul>
        
        </div></>:<>
        </>
        
    } */}
    
   </div>
    </>
  )
};
 
export default UploadBulkQuiz





 