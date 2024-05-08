// import React, { useState } from 'react';
// import Navbar from "./Navbar";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { ImFolderUpload } from "react-icons/im";
// import { BiSolidCoinStack } from "react-icons/bi";
// import { BiSolidPencil } from "react-icons/bi";
// import { FaTrashCan } from "react-icons/fa6";
// import { Link } from 'react-router-dom';


// export default function Home() {
//     const [showOptions, setShowOptions] = useState(false);
//     const [showUpload, setShowUpload] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const toggleOptions = (event) => {
//         event.preventDefault();
//         setShowOptions(!showOptions);
//         event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
//     };

//     const handleUploadClick = (e) => {
//         e.preventDefault()
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const QuestionBank = () => {

//     };

//     return (
//         <div>
//             <Navbar />
//             <form>
//                 <div className="card" id="QuizCard">
//                     <div className="card-body">
//                         <div className="d-flex mt-2">
//                             <div className="container">
//                             <BiSolidPencil  style={{fontSize:"25", marginLeft:"90%"}}/>
//                             <FaTrashCan style={{fontSize:"23", marginLeft:"2%"}}/>

//                                 <div class="form-group row mt-3">
//                                     <label for="lbl1" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Quiz Title<span id='required'>*</span></label>
//                                     <div class="col-sm-8">
//                                         <input type="text" class="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }}></input>
//                                     </div>
//                                 </div>

//                                 <div class="form-group row mt-3">
//                                     <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration (In Minutes)<span id='required'>*</span></label>
//                                     <div class="col-sm-8">
//                                         <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }}></input>
//                                     </div>
//                                 </div>


//                                 <div class="form-group row mt-3">
//                                     <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
//                                     <div class="col-sm-8">
//                                         <input type="number" class="form-control" id="lbl5" placeholder="Enter the Maximum Score to be Passed" style={{ borderRadius: 8 }}></input>
//                                     </div>
//                                 </div>

//                                 <div class="form-group row mt-3">
//                                     <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
//                                     <div class="col-sm-8">
//                                         <input type="number" class="form-control" id="lbl4" placeholder="Enter the Number of Attempts" style={{ borderRadius: 8 }}></input>
//                                     </div>
//                                 </div>

//                                 <div class="form-group row mt-3">
//                                     <label for="lbl2" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >No of Question<span id='required'>*</span></label>
//                                     <div class="col-sm-8">
//                                         <input type="number" class="form-control" id="lbl2" placeholder="Enter the Number Of Questions" style={{ borderRadius: 8 }}></input>
//                                     </div>
//                                 </div>

//                                 <div class="form-group row">
//                                     <div class="col-sm-10">
//                                         <button type="submit" class="btn btn-primary" onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 }}>+ Add Questions</button>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>

//             <Modal show={showModal} onHide={closeModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title id='questitle'>Question Library</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' to='/bulkquiz'> Add Question from Bulk Upload</Link></h6>
//                     <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink'> Add New Question</Link></h6>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeModal}>Close</Button>
//                 </Modal.Footer>
//             </Modal>

//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';





export default function Home() {
    const [showOptions, setShowOptions] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nameofquiz, setNameOfQuiz] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [attempts, setAttempts] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [error, setError] = useState('');
    const [quizData, setQuizData] = useState(null);


    const toggleOptions = (event) => {
        event.preventDefault();
        setShowOptions(!showOptions);
        event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
    };

    const handleUploadClick = (e) => {
        e.preventDefault()
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };



    // Function to check if all input fields are filled
    const isFormValid = () => {
        return nameofquiz !== '' && duration !== '' && passMark !== '';
    };

    const handleQuizTitleChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) {
            setError('*Please enter only text ');
        } else {
            setError('');
            setNameOfQuiz(value);
        }

    };

    // Function to send a POST request to the server
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            const quizData = {
                nameofquiz,
                duration,
                passMark,

            };

            try {
                const response = await axios.post('http://localhost:3001/quizzes', quizData);
                console.log(response.data);
                alert("Created Successfully")
            } catch (error) {
                console.error(error);
            }
        }
    };





    const fetchQuizData = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/quizzes');


            setQuizData(response.data[0]); // Set quizData to the first quiz object in the array
            setNameOfQuiz(response.data[0].nameofquiz)
            setDuration(response.data[1].duration)
            setPassMark(response.data[2].passMark)

        } catch (error) {
            console.error(error);
        }
    };
    console.log(quizData)


    // Function to send a PUT request to the server
    const updateQuiz = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const quizData = {
                nameofquiz,
                duration,
                passMark,
            };
            try {
                const response = await axios.put(`http://localhost:3001/quizzes/${"0719"}`, quizData);
                console.log(response.data);
                alert("Updated Successfully");
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Function to send a DELETE request to the server
    const deleteQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/quizzes/${"0646"}`);
            console.log(response.data);
            alert("Deleted Successfully");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div >
            <AdminNavbar/>
            <form className=' main-content'>
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                <BiSolidPencil style={{ fontSize: "25", marginLeft: "86.5%" }} onClick={fetchQuizData} />
                                <IoIosSave style={{ fontSize: "25", marginLeft: "90%", marginTop: "-6%" }} onClick={updateQuiz} />
                                <FaTrashCan style={{ fontSize: "23", marginLeft: "1%", marginTop: "-6%" }} onClick={deleteQuiz} />

                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Quiz Title<span id='required'>*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} onChange={handleQuizTitleChange} value={nameofquiz} />
                                        {error && <p style={{ color: 'red', fontSize: "50" }}>{error}</p>}
                                    </div>
                                </div>



                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration (In Minutes)<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} onChange={(e) => setDuration(e.target.value)} value={duration}></input>
                                    </div>
                                </div>


                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} onChange={(e) => setPassMark(e.target.value)} value={passMark} ></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <label type="number" class="form-control" id="lbl4" placeholder="Enter the Number of Attempts" style={{ borderRadius: 8, width: 553, height: 40 }} onChange={(e) => setAttempts(e.target.value)}>3 Attempts</label>
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary" onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 }} disabled={!isFormValid()}>+ Add Questions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 }} onClick={handleSubmit}>Save & Submit</button>
                </div>
            </form>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id='questitle'>Question Library</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' to='/bulkquiz'> Add Question from Bulk Upload</Link></h6>
                    <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink'> Add New Question</Link></h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
