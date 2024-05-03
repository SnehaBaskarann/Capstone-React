import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
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
   
        <div id='dropzone'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
            <FaCloudUploadAlt  style={{fontSize:"50px"}}/>
            <h4>Drag and Drop Files to Upload</h4>
            <h4>Or</h4>
            <input type='file' multiple onChange={(event)=>setFiles(event.target.files)} hidden ref={inputref}/>
            <button onClick={(e)=> {e.preventDefault();inputref.current.click()}}>Browse Files</button>
        </div>
   
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
 