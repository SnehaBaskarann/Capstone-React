// import React, { useState } from 'react';
// import Navbar from "./Navbar";
// import UploadBulkQuiz from './components/UploadBulkQuiz';


// export default function Home() {
//     const [showOptions, setShowOptions] = useState(false);
//     const[showUpload , setShowUpload]=useState(false);

//     const toggleOptions = (event) => {
//         setShowOptions(!showOptions);
//         event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
//     };

//     const QuestionBank = ()=>{

//     };

//     return (
//         <div>
//             <Navbar />
//             <div class="card" id="QuizCard">
//                 <div class="card-body">
//             <div className="d-flex mt-4">
//                 <div className="container">
//                     <div className="d-flex mt-3">
//                         <h6>Quiz Title : </h6>
//                         <input type="text" style={{ width: 110, marginLeft: 10 , borderRadius:15}} />
//                     </div>
//                     <div className="d-flex mt-3">
//                         <h6>Number of Questions : </h6>
//                         <input type="text" style={{ width: 110, marginLeft: 10 , borderRadius:15}} />
//                     </div>
//                     <div className="d-flex mt-3">
//                         <h6>Time Limit : </h6>
//                         <input type="number" style={{ width: 100, marginLeft:10 , borderRadius:15 }} />
//                     </div>
//                     <div className="d-flex mt-3">
//                         <h6>Attempts Allowed : </h6>
//                         <input type="number" style={{ width: 100, marginLeft:10 , borderRadius:15 }} />
//                     </div>
//                     <div className="d-flex mt-3">
//                         <h6>Maximum Grade to be secured : </h6>
//                         <input type="number" style={{width: 100, marginLeft:10 , borderRadius:15 }} />
//                     </div>
//                 </div>
//                 <div className="container text-end">
//                     {/* <div className="d-flex">
//                         <h6>Maximum Grade: </h6>
//                         <input type="number" style={{ width: 50 }} />
//                     </div> */}
//                     <div style={{ position: 'relative' }}>
//                         <button className="btn btn-primary" onClick={toggleOptions}>
//                             Add &#9662;
//                         </button>
//                         <div style={{ display: 'none', position: 'absolute', right: 0, zIndex: 1 }}>
//                             <button className="btn btn-outline-primary d-block text-start" onClick={()=>setShowUpload(true)}>
//                                 + Add Question Bank
//                             </button>

//                              <button className="btn btn-outline-primary d-block text-start">
//                                 + Add New Question
//                             </button>
//                         </div>
//                     </div>
//                     </div>
//             </div>
//                     {showUpload && <UploadBulkQuiz/>}
//                 </div>
//             </div>
//             {/* <div>
//             {showUpload && <UploadBulkQuiz/>}</div> */}
//         </div>

//     );
// }



import React, { useState } from 'react';
import Navbar from "./Navbar";
import UploadBulkQuiz from './components/UploadBulkQuiz';


export default function Home() {
    const [showOptions, setShowOptions] = useState(false);
    const [showUpload, setShowUpload] = useState(false);

    const toggleOptions = (event) => {
        event.preventDefault();
        setShowOptions(!showOptions);
        event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
    };

    const QuestionBank = () => {

    };

    return (
        <div>
            <Navbar />
            <form>
            <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                <div class="form-group row mt-3">
                                    <label for="lbl1" class="col-sm-3 col-form-label" style={{ fontWeight: "bold"}} >Quiz Title</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{borderRadius:8}}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration</label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{borderRadius:8}}></input>
                                    </div>
                                </div>


                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured</label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Maximum Score to be Passed" style={{borderRadius:8}}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed</label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl4" placeholder="Enter the Number of Attempts" style={{borderRadius:8}}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label for="lbl2" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >No of Question</label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl2" placeholder="Enter the Number Of Questions" style={{borderRadius:8}}></input>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-primary" style={{marginLeft:"50%" , marginTop:"3%", borderRadius:8}}>+ Add Questions</button>
                                    </div>
                                    {/* <div className="container text-end">
                                    <div style={{ position: 'relative' , marginTop:"-3.5%"}}>
                                        <button className="btn btn-primary" onClick={(e)=>{toggleOptions(e)}}>
                                            Add &#9662;
                                        </button>
                                        
                                        <div style={{ display: 'none', position: 'absolute', right: 0, zIndex: 1 }}>
                                            <button className="btn btn-outline-primary d-block text-start" onClick={(e)=>{setShowUpload(true);e.preventDefault()}}>
                                                + Add Question Bank
                                            </button>
                                            <button className="btn btn-outline-primary d-block text-start">
                                                + Add New Question
                                            </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* {showUpload && <UploadBulkQuiz/>} */}
                                {/* </div> */}
                                {/* </div>
                                </div> */}
                                {/* </div> */}
            </form>
        </div>
    );
}