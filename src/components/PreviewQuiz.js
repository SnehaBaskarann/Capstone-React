import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
import Navbar from '../Navbar';
import jsonData from './data.json';
import AdminNavbar from '../AdminNavbar';
import '../preview.css';
import axios from 'axios';

const QuizEditor = () => {
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

 
  useEffect(() => {
    axios.get('http://localhost:3001/questions')
    .then(response => {
    setQuestions(response.data);
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
    }, []);


  const handleEditQuestion = (questionId, newText) => {
    const updatedQuestions = questions.map(question => 
      question.id === questionId ? { ...question, text: newText } : question
    );
    setQuestions(updatedQuestions);
    validateQuestions(updatedQuestions);
  };

  const handleEditOption = (questionId, optionId, newText) => {
    const updatedQuestions = questions.map(question => 
      question.id === questionId ? { 
        ...question, 
        options: question.options.map(option => 
          option.id === optionId ? { ...option, text: newText } : option
        ) 
      } : question
    );
    setQuestions(updatedQuestions);
    validateQuestions(updatedQuestions);
  };

 

  const handleDeleteQuestion = (questionId) => {
    axios.delete(`http://localhost:3001/questions/${questionId}`)
    .then(response => {
      console.log('Question deleted successfully:',response.data);
      const updatedQuestions = questions.filter(question => question.id !== questionId);
      setQuestions(updatedQuestions);
    })
    .catch(error => {
      console.error('Error deleting question:',error);
    });
   
  };


  const handleEditCorrectAnswer = (questionId, newAnswer) => {
    const updatedQuestions = questions.map(question => 
      question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
    );
    setQuestions(updatedQuestions);
    validateQuestions(updatedQuestions);
  };

 
  const handleSaveChanges = () => {
    questions.forEach(modifiedQuestion => {
      axios.put(`http://localhost:3001/questions/${modifiedQuestion.id}`, modifiedQuestion)
        .then(response => {
          console.log('Question updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating question:', error);
        });
    });
  };
 
  const handleToggleEdit = (questionId) => {
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
    );
    setQuestions(updatedQuestions);
    handleSaveChanges();
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: `Question ${questions.length + 1}`,
      options: [
        { id: 1, text: 'Option A' },
        { id: 2, text: 'Option B' },
        { id: 3, text: 'Option C' },
        { id: 4, text: 'Option D' }
      ],
      correctAnswer: 'Option A',
      isEditing: false
    };
    
    axios.post('http://localhost:3001/questions', newQuestion)
      .then(response => {
        console.log('Question added successfully:', response.data);
        setQuestions([...questions, newQuestion]);
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  const validateQuestions = (questions) => {
    const errors = {};
    questions.forEach((question, index) => {
      if (!question.text.trim()) {
        errors[`question-${question.id}`] = `Question ${index + 1} cannot be empty.`;
      }
      if (question.options.some(option => !option.text.trim())) {
        errors[`options-${question.id}`] = `Options for Question ${index + 1} cannot be empty.`;
      }
      if (!question.correctAnswer.trim()) {
        errors[`correctAnswer-${question.id}`] = `Correct answer for Question ${index + 1} cannot be empty.`;
      }
    });
    setErrors(errors);
  };

  return (
    <div className='previewcontainer'>
      <AdminNavbar/>
      <Container style={{ width: '70%', marginBottom: '10px', marginLeft: '17%' }}>
        {questions.map((question, index) => (
          <Card className="mb-3" key={question.id}>
            <Card.Body>
              <Form.Group controlId={`question-${question.id}`}>
                <Form.Label>Question {index + 1}</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2} 
                  value={question.text} 
                  style={{ width: '90%', marginBottom: '10px' }}
                  onChange={(e) => handleEditQuestion(question.id, e.target.value)} 
                  readOnly={!question.isEditing} 
                  isInvalid={!!errors[`question-${question.id}`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`question-${question.id}`]}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId={`options-${question.id}`}>
                    <Form.Label>Options</Form.Label>
                    <Row>
                      {question.options.map((option, idx) => (
                        <Col xs={6} key={option.id}>
                          <Form.Control 
                            type="text" 
                            value={option.text} 
                            onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} 
                            readOnly={!question.isEditing} 
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                            style={{ width: '80%', marginBottom: '10px' }} 
                            isInvalid={!!errors[`options-${question.id}`]}
                          />
                        </Col>
                      ))}
                    </Row>
                    <Form.Control.Feedback type="invalid">
                      {errors[`options-${question.id}`]}
                    </Form.Control.Feedback>
                    <Form.Group controlId={`correctAnswer-${question.id}`}>
                      <Form.Label>Correct Answer</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={question.correctAnswer} 
                        style={{ width: '39%', marginBottom: '10px' }}
                        onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} 
                        readOnly={!question.isEditing} 
                        isInvalid={!!errors[`correctAnswer-${question.id}`]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[`correctAnswer-${question.id}`]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Group>
                </Col>
              </Row>
              <div className="position-absolute top-0 end-0">
                <br />
                <Row>
                  <Col>
                    {question.isEditing ? (
                      <Check2Square size={35} color="green" onClick={() => handleToggleEdit(question.id)} className="mr-2 icon" id='iconSave' />
                    ) : (
                      <PencilSquare size={35} color="blue" onClick={() => handleToggleEdit(question.id)} className="mr-2 icon" id='iconEdit' />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <br />
                    <TrashFill size={35} color="red" onClick={() => handleDeleteQuestion(question.id)} className="icon" id='iconDelete' />
                  </Col>
                </Row>
              </div>

            </Card.Body>
          </Card>
        ))}
        <Row className="mt-2 justify-content-end">
          <Col xs="auto">
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuizEditor;









































// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
// import Navbar from '../Navbar';
// import jsonData from './data.json';
// import AdminNavbar from '../AdminNavbar';
// import '../preview.css';
// import axios from 'axios';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([]);
//   const [errors, setErrors] = useState({});

 
//   useEffect(() => {
//     axios.get('http://localhost:3001/questions')
//     .then(response => {
//     setQuestions(response.data);
//     })
//     .catch(error => {
//     console.error('Error fetching data:', error);
//     });
//     }, []);


//   const handleEditQuestion = (questionId, newText) => {
//     const updatedQuestions = questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     );
//     setQuestions(updatedQuestions);
//     //updateData(updatedQuestions);
//     validateQuestions(updatedQuestions);
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     const updatedQuestions = questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     );
//     setQuestions(updatedQuestions);
//     // updateData(updatedQuestions);
//     validateQuestions(updatedQuestions);
//   };

//   // const handleDeleteQuestion = (questionId) => {
//   //   const updatedQuestions = questions.filter(question => question.id !== questionId);
//   //   setQuestions(updatedQuestions);
//   //   //updateData(updatedQuestions);
//   //   validateQuestions(updatedQuestions);
//   // };

//   const handleDeleteQuestion = (questionId) => {
//     axios.delete(`http://localhost:3001/questions/${questionId}`)
//     .then(response => {
//       console.log('Question deleted successfully:',response.data);
//       const updatedQuestions = questions.filter(question => question.id !== questionId);
//       setQuestions(updatedQuestions);
//     })
//     .catch(error => {
//       console.error('Error deleting question:',error);
//     });
//     //updateData(updatedQuestions);
//     // validateQuestions(updatedQuestions);
//   };


//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     const updatedQuestions = questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     );
//     setQuestions(updatedQuestions);
//     validateQuestions(updatedQuestions);
//   };

//   // const handleToggleEdit = (questionId) => {
//   //   const updatedQuestions = questions.map(question => 
//   //     question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//   //   );
//   //   setQuestions(updatedQuestions);
//   // };

  
//   const handleSaveChanges = () => {
//     const updatedData = { ...jsonData };
//     questions.forEach(modifiedQuestion => {
//       // Find the index of the modified question in the existing JSON data
//       const existingIndex = updatedData.questions.findIndex(question => question.id === modifiedQuestion.id);
//       if (existingIndex !== -1) {
//         // Update the existing JSON data with the modified question
//         updatedData.questions[existingIndex] = modifiedQuestion;
//       }
//     });
  
//     // Send the updated JSON data to the server
//     axios.post('http://localhost:3001/questions', updatedData)
//       .then(response => {
//         console.log('Data updated successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//       });
//   };
  

//   // const handleSaveChanges = () => {
//   //   axios.post('http://localhost:3001/questions', { questions: questions })
//   //     .then(response => {
//   //       console.log('Data updated successfully:', response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error updating data:', error);
//   //     });
//   // };
  

//   const handleToggleEdit = (questionId) => {
//     const updatedQuestions = questions.map(question =>
//       question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//     );
//     setQuestions(updatedQuestions);
//     // Save changes when toggling edit mode
//     handleSaveChanges();
//   };


//   const handleAddQuestion = () => {
//     // const newQuestionId = generateUniqueId(); 
//     const newQuestion = {
//       // id: newQuestionId,
//       text: `Question ${questions.length + 1}`,
//       options: [
//         { id: 1, text: 'Option A' },
//         { id: 2, text: 'Option B' },
//         { id: 3, text: 'Option C' },
//         { id: 4, text: 'Option D' }
//       ],
//       correctAnswer: 'Option A',
//       isEditing: true
//     };
    
//     axios.post('http://localhost:3001/questions', newQuestion)
//       .then(response => {
//         console.log('Question added successfully:', response.data);
//         // Update state to include the new question
//         setQuestions([...questions, newQuestion]);
//       })
//       .catch(error => {
//         console.error('Error adding question:', error);
//       });
//   };
  

//   // const handleAddQuestion = () => {
//   //   const newQuestion = { 
//   //     // id: questions.length + 1,
//   //     text: `Question ${questions.length + 1}`,
//   //     options: [
//   //       { id: 1, text: 'Option A' },
//   //       { id: 2, text: 'Option B' },
//   //       { id: 3, text: 'Option C' },
//   //       { id: 4, text: 'Option D' }
//   //     ],
//   //     correctAnswer: 'Option A',
//   //     isEditing: true
//   //   };
    
//   //   // const updatedQuestions = [...questions, newQuestion];
//   //   // setQuestions(updatedQuestions);
//   //   //updateData(updatedQuestions);

//   //   axios.post('http://localhost:3001/questions', newQuestion)
//   //   .then(response => {
//   //     console.log('Question added successfully:', response.data);
//   //     // Update state to include the new question
//   //     setQuestions([...questions, newQuestion]);
//   //   })
//   //   .catch(error => {
//   //     console.error('Error adding question:', error);
//   //   });

//   //   // axios.post('http://localhost:3001/questions', { questions: updatedQuestions })
//   //   // .then(response => {
//   //   //   console.log('Question added successfully:', response.data);
//   //   // })
//   //   // .catch(error => {
//   //   //   console.error('Error adding question:', error);
//   //   // });

//   //   // validateQuestions(updatedQuestions);
//   // };

//   // const updateData = (updatedQuestions) => {
//   //   axios.post('http://localhost:3001/questions', updatedQuestions)
//   //     .then(response => {
//   //       console.log('Data updated successfully:', response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error updating data:', error);
//   //     });
//   // };

//   const validateQuestions = (questions) => {
//     const errors = {};
//     questions.forEach((question, index) => {
//       if (!question.text.trim()) {
//         errors[`question-${question.id}`] = `Question ${index + 1} cannot be empty.`;
//       }
//       if (question.options.some(option => !option.text.trim())) {
//         errors[`options-${question.id}`] = `Options for Question ${index + 1} cannot be empty.`;
//       }
//       if (!question.correctAnswer.trim()) {
//         errors[`correctAnswer-${question.id}`] = `Correct answer for Question ${index + 1} cannot be empty.`;
//       }
//     });
//     setErrors(errors);
//   };

//   return (
//     <div className='previewcontainer'>
//       <AdminNavbar/>
//       <Container style={{ width: '70%', marginBottom: '10px', marginLeft: '17%' }}>
//       {/* {questions && questions.map((question, index) => ( */}
//         {questions.map((question, index) => (
//           <Card className="mb-3" key={question.id}>
//             <Card.Body>
//               <Form.Group controlId={`question-${question.id}`}>
//                 <Form.Label>Question {index + 1}</Form.Label>
//                 <Form.Control 
//                   as="textarea" 
//                   rows={2} 
//                   value={question.text} 
//                   style={{ width: '90%', marginBottom: '10px' }}
//                   onChange={(e) => handleEditQuestion(question.id, e.target.value)} 
//                   readOnly={!question.isEditing} 
//                   isInvalid={!!errors[`question-${question.id}`]}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors[`question-${question.id}`]}
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Row>
//                 <Col>
//                   <Form.Group controlId={`options-${question.id}`}>
//                     <Form.Label>Options</Form.Label>
//                     <Row>
//                       {question.options.map((option, idx) => (
//                         <Col xs={6} key={option.id}>
//                           <Form.Control 
//                             type="text" 
//                             value={option.text} 
//                             onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} 
//                             readOnly={!question.isEditing} 
//                             placeholder={`Option ${String.fromCharCode(65 + idx)}`}
//                             style={{ width: '80%', marginBottom: '10px' }} 
//                             isInvalid={!!errors[`options-${question.id}`]}
//                           />
//                         </Col>
//                       ))}
//                     </Row>
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`options-${question.id}`]}
//                     </Form.Control.Feedback>
//                     <Form.Group controlId={`correctAnswer-${question.id}`}>
//                       <Form.Label>Correct Answer</Form.Label>
//                       <Form.Control 
//                         type="text" 
//                         value={question.correctAnswer} 
//                         style={{ width: '39%', marginBottom: '10px' }}
//                         onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} 
//                         readOnly={!question.isEditing} 
//                         isInvalid={!!errors[`correctAnswer-${question.id}`]}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors[`correctAnswer-${question.id}`]}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               {/* <div className="position-absolute top-0 end-0">
//                 <br/>
//                 <Row>
//                   <Col>
//                     {question.isEditing ? (
//                       <Check2Square size={35} color="green" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//                     ) : (
//                       <PencilSquare size={35} color="blue" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//                     )}
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <br/>
//                     <TrashFill size={35} color="red" onClick={() => handleDeleteQuestion(question.id)} />
//                   </Col>
//                 </Row>
//               </div> */}

//               <div className="position-absolute top-0 end-0">
//                 <br />
//                 <Row>
//                   <Col>
//                     {question.isEditing ? (
//                       <Check2Square size={35} color="green" onClick={() => handleToggleEdit(question.id)} className="mr-2 icon" id='iconSave' />
//                     ) : (
//                       <PencilSquare size={35} color="blue" onClick={() => handleToggleEdit(question.id)} className="mr-2 icon" id='iconEdit' />
//                     )}
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <br />
//                     <TrashFill size={35} color="red" onClick={() => handleDeleteQuestion(question.id)} className="icon" id='iconDelete' />
//                   </Col>
//                 </Row>
//               </div>

//             </Card.Body>
//           </Card>
//         ))}
//         <Row className="mt-2 justify-content-end">
//           <Col xs="auto">
//             <Button onClick={handleAddQuestion}>Add Question</Button>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default QuizEditor;














































// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
// import Navbar from '../Navbar';
// import jsonData from './data.json';
// import AdminNavbar from '../AdminNavbar';
// import '../preview.css'
// import axios from 'axios';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([]);

//   // useEffect(() => {
//   //   setQuestions(jsonData);
//   // }, []); 

//   // useEffect(() => {
//   //   axios.get('http://localhost:3001/questions')
//   //     .then(response => {
//   //       setQuestions(response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, []);


//   useEffect(() => {
//     axios.get('http://localhost:3001/questions')
//       .then(response => {
//         if (Array.isArray(response.data)) {
//           setQuestions(response.data);
//         } else {
//           console.error('Unexpected data format:', response.data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
  

//   const handleEditQuestion = (questionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     ));
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     ));
//   };

//   const handleDeleteQuestion = (questionId) => {
//     setQuestions(questions.filter(question => question.id !== questionId));
//   };

//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     ));
//   };

//   const handleToggleEdit = (questionId) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//     ));
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { 
//       id: questions.length + 1,
//       text: `Question ${questions.length + 1}`,
//       options: [{ id: 1, text: 'Option A' }, { id: 2, text: 'Option B' },{ id: 3, text: 'Option C' },{ id: 4, text: 'Option D' }],
//       correctAnswer: 'Option A',
//       isEditing: false
//     }]);
//   };

//   return (

//     <div className='previewcontainer'>
//       <AdminNavbar/>
//       <Container style={{ width: '70%', marginBottom: '10px',marginLeft: '17%'}}>
//         {questions.map((question, index) => (
//           <Card className="mb-3" key={question.id}>
//             <Card.Body>
//               <Form.Group controlId={`question-${question.id}`}>
//                 <Form.Label>Question {index + 1}</Form.Label>
//                 <Form.Control 
//                   as="textarea" 
//                   rows={2} 
//                   value={question.text} 
//                   style={{ width: '85%', marginBottom: '10px' }}
//                   onChange={(e) => handleEditQuestion(question.id, e.target.value)} 
//                   readOnly={!question.isEditing} 
//                 />
//               </Form.Group>
//               <Row>
//                 <Col>
//                   <Form.Group controlId={`options-${question.id}`}>
//                     <Form.Label>Options</Form.Label>
//                     <Row>
//                       {question.options.map((option, idx) => (
//                         <Col xs={6} key={option.id}>
//                           <Form.Control 
//                             type="text" 
//                             value={option.text} 
//                             onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} 
//                             readOnly={!question.isEditing} 
//                             placeholder={`Option ${String.fromCharCode(65 + idx)}`}
//                             style={{ width: '70%', marginBottom: '10px' }} 
//                           />
//                         </Col>
//                       ))}
//                     </Row>
//                     <Form.Group controlId={`correctAnswer-${question.id}`}>
//                       <Form.Label>Correct Answer</Form.Label>
//                       <Form.Control 
//                         type="text" 
//                         value={question.correctAnswer} 
//                         style={{ width: '34%', marginBottom: '10px' }}
//                         onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} 
//                         readOnly={!question.isEditing} 
//                       />
//                     </Form.Group>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <div className="position-absolute top-0 end-0">
//               <br/>
//                 <Row>
//                   <Col>
//                     {question.isEditing ? (
//                       <Check2Square size={35} color="green" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//                     ) : (
//                       <PencilSquare size={35} color="blue" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//                     )}
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                   <br/>
//                     <TrashFill size={35} color="red" onClick={() => handleDeleteQuestion(question.id)} />
//                   </Col>
//                 </Row>
//               </div>
//             </Card.Body>
//           </Card>
//         ))}
//         <Row className="mt-2 justify-content-end">
//           <Col xs="auto">
//             <Button onClick={handleAddQuestion}>Add Question</Button>
//           </Col>
//         </Row>
//       </Container>
//       </div>
//   );
// };

// export default QuizEditor;
































// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
// import jsonData from './data.json';
// import Navbar from '../Navbar';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     setQuestions(jsonData);
//   }, []); // Fetch questions on component mount

//   const handleEditQuestion = (questionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     ));
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     ));
//   };

//   const handleDeleteQuestion = (questionId) => {
//     setQuestions(questions.filter(question => question.id !== questionId));
//   };

//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     ));
//   };

//   const handleToggleEdit = (questionId) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//     ));
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { 
//       id: questions.length + 1,
//       text: `Question ${questions.length + 1}`,
//       options: [{ id: 1, text: 'Option A' }, { id: 2, text: 'Option B' },{ id: 3, text: 'Option C' },{ id: 4, text: 'Option D' }],
//       correctAnswer: 'Option A',
//       isEditing: false
//     }]);
//   };

//   return (
//     <div>
//       <Navbar/>
//       <br/>
//     <Container>
//       {questions.map((question, index) => (
//         <Card className="mb-3" key={question.id}>
//           <Card.Body>
//             <Form.Group controlId={`question-${question.id}`}>
//               <Form.Label>Question {index + 1}</Form.Label>
//               <Form.Control 
//                 as="textarea" 
//                 rows={3} 
//                 value={question.text} 
//                 style={{ width: '85%', marginBottom: '10px' }}
//                 onChange={(e) => handleEditQuestion(question.id, e.target.value)} 
//                 readOnly={!question.isEditing} 
//               />
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group controlId={`options-${question.id}`}>
//                   <Form.Label>Options</Form.Label>
//                   <Row>
//                     {question.options.map((option, idx) => (
//                       <Col xs={6} key={option.id}>
//                         <Form.Control 
//                           type="text" 
//                           value={option.text} 
//                           onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} 
//                           readOnly={!question.isEditing} 
//                           placeholder={`Option ${String.fromCharCode(65 + idx)}`}
//                           style={{ width: '70%', marginBottom: '10px' }} 
//                         />
//                       </Col>
//                     ))}
//                   </Row>
//                   <Form.Group controlId={`correctAnswer-${question.id}`}>
//                     <Form.Label>Correct Answer</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       value={question.correctAnswer} 
//                       style={{ width: '34%', marginBottom: '10px' }}
//                       onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} 
//                       readOnly={!question.isEditing} 
//                     />
//                   </Form.Group>
//                 </Form.Group>
//               </Col>
//             </Row>
//             {/* <div className="d-flex justify-content-end"> */}
//             <div class="position-absolute top-0 end-0">
//               {question.isEditing ? (
//                 <Check2Square size={30} color="green" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//               ) : (
//                 <PencilSquare size={30} color="blue" onClick={() => handleToggleEdit(question.id)} className="mr-2" />
//               )}
//               <TrashFill size={30} color="red" onClick={() => handleDeleteQuestion(question.id)} />
//             </div>
//           </Card.Body>
//         </Card>
//       ))}
//       {/* <Button onClick={handleAddQuestion}>Add Question</Button> */}
//       <Row className="mt-2 justify-content-end">
//           <Col xs="auto">
//             <Button onClick={handleAddQuestion}>Add Question</Button>
//           </Col>
//         </Row>
//     </Container>
//     </div>
//   );
// };

// export default QuizEditor;














































// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       text: 'What is the capital of France?',
//       options: [
//         { id: 'a', text: 'Paris' },
//         { id: 'b', text: 'London' },
//         { id: 'c', text: 'Berlin' },
//         { id: 'd', text: 'None of the Above' },
//       ],
//       correctAnswer: 'a',
//       isEditing: false
//     },
//     {
//       id: 2,
//       text: 'Who wrote "To Kill a Mockingbird"?',
//       options: [
//         { id: 'a', text: 'Harper Lee' },
//         { id: 'b', text: 'George Orwell' },
//         { id: 'c', text: 'Mark Twain' },
//         { id: 'd', text: 'None of these options' },
//       ],
//       correctAnswer: 'a',
//       isEditing: false
//     },
//     // Add more questions here
//   ]);

//   const handleEditQuestion = (questionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     ));
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     ));
//   };

//   const handleDeleteQuestion = (questionId) => {
//     setQuestions(questions.filter(question => question.id !== questionId));
//   };

//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     ));
//   };

//   const handleAddQuestion = () => {
//     // Implement add question functionality here
//   };

//   const handleToggleEdit = (questionId) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//     ));
//   };

//   return (
//     <Container>
//       {questions.map((question, index) => (
//         <Container className="mb-3 p-3 border" key={question.id}>
//           <Row>
//             <Col>
//               <Form.Label>Question {index + 1}</Form.Label>
//               <Form.Control as="textarea" rows={3} value={question.text} onChange={(e) => handleEditQuestion(question.id, e.target.value)} readOnly={!question.isEditing} />
//             </Col>
//             <Col xs="auto" className="my-auto">
//               {question.isEditing ? (
//                 <Check2Square size={30} color="green" onClick={() => handleToggleEdit(question.id)} />
//               ) : (
//                 <PencilSquare size={30} color="blue" onClick={() => handleToggleEdit(question.id)} />
//               )}
//               <TrashFill size={30} color="red" className="ml-2" onClick={() => handleDeleteQuestion(question.id)} />
//             </Col>
//           </Row>
//           {question.options.map((option, index) => (
//             <Row className="mt-2" key={option.id}>
//               <Col>
//                 <Form.Label>Option {String.fromCharCode(65 + index)}</Form.Label>
//                 <Form.Control type="text" value={option.text} onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} readOnly={!question.isEditing} />
//               </Col>
//             </Row>
//           ))}
//           <Row className="mt-2">
//             <Col>
//               <Form.Label>Correct Answer</Form.Label>
//               <Form.Control type="text" value={question.correctAnswer} onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} readOnly={!question.isEditing} />
//             </Col>
         
//           </Row>
//           {index === questions.length - 1 && (
//             <Row className="mt-2">
//               <Col>
//                 <Button onClick={handleAddQuestion}>Add Question</Button>
//               </Col>
//             </Row>
//           )}
//         </Container>
//       ))}
//     </Container>
//   );
// };

// export default QuizEditor;






































// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
// import { Pencil, Trash, Check2 } from 'react-bootstrap-icons';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       text: 'What is the capital of France?',
//       options: [
//         { id: 'a', text: 'Paris' },
//         { id: 'b', text: 'London' },
//         { id: 'c', text: 'Berlin' },
//       ],
//       correctAnswer: 'a',
//       isEditing: false
//     },
//     {
//       id: 2,
//       text: 'Who wrote "To Kill a Mockingbird"?',
//       options: [
//         { id: 'a', text: 'Harper Lee' },
//         { id: 'b', text: 'George Orwell' },
//         { id: 'c', text: 'Mark Twain' },
//       ],
//       correctAnswer: 'a',
//       isEditing: false
//     },
//     // Add more questions here
//   ]);

//   const handleEditQuestion = (questionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     ));
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     ));
//   };

//   const handleDeleteQuestion = (questionId) => {
//     setQuestions(questions.filter(question => question.id !== questionId));
//   };

//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     ));
//   };

//   const handleAddQuestion = () => {
//     // Implement add question functionality here
//   };

//   const handleToggleEdit = (questionId) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
//     ));
//   };

//   return (
//     <Container>
      
//       {questions.map(question => (
//         <Row key={question.id} className="mb-3">
//           <Col>
//             <Form.Control as="textarea" rows={3} value={question.text} onChange={(e) => handleEditQuestion(question.id, e.target.value)} readOnly={!question.isEditing} />
//             {question.options.map(option => (
//               <Form.Control key={option.id} className="mt-2" type="text" value={option.text} onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} readOnly={!question.isEditing} />
//             ))}
//             <Form.Control className="mt-2" type="text" value={question.correctAnswer} onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} readOnly={!question.isEditing} />
//           </Col>
//           <Col xs="auto">
//             {question.isEditing ? (
//               <Check2 size={30} onClick={() => handleToggleEdit(question.id)} />
//             ) : (
//               <Pencil size={30} onClick={() => handleToggleEdit(question.id)} />
//             )}
//             <Trash size={30} onClick={() => handleDeleteQuestion(question.id)} />
//           </Col>
          
//         </Row>
        
//       ))}
//       <Row className="mb-3">
//         <Col>
//           <Button onClick={handleAddQuestion}>Add Question</Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default QuizEditor;










































// import React, { useState } from 'react';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       text: 'What is the capital of France?',
//       options: [
//         { id: 'a', text: 'Paris' },
//         { id: 'b', text: 'London' },
//         { id: 'c', text: 'Berlin' },
//       ],
//       correctAnswer: 'a'
//     },
//     {
//       id: 2,
//       text: 'Who wrote "To Kill a Mockingbird"?',
//       options: [
//         { id: 'a', text: 'Harper Lee' },
//         { id: 'b', text: 'George Orwell' },
//         { id: 'c', text: 'Mark Twain' },
//       ],
//       correctAnswer: 'a'
//     },
//     // Add more questions here
//   ]);

//   const handleEditQuestion = (questionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, text: newText } : question
//     ));
//   };

//   const handleEditOption = (questionId, optionId, newText) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { 
//         ...question, 
//         options: question.options.map(option => 
//           option.id === optionId ? { ...option, text: newText } : option
//         ) 
//       } : question
//     ));
//   };

//   const handleDeleteQuestion = (questionId) => {
//     setQuestions(questions.filter(question => question.id !== questionId));
//   };

//   const handleEditCorrectAnswer = (questionId, newAnswer) => {
//     setQuestions(questions.map(question => 
//       question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
//     ));
//   };

//   const handleAddQuestion = () => {
//     // Implement add question functionality here
//   };

//   return (
//     <div>
//       <button onClick={handleAddQuestion}>Add Question</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Options</th>
//             <th>Correct Answer</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map(question => (
//             <tr key={question.id}>
//               <td>
//                 <input type="text" value={question.text} onChange={(e) => handleEditQuestion(question.id, e.target.value)} />
//               </td>
//               <td>
//                 {question.options.map(option => (
//                   <div key={option.id}>
//                     <input type="text" value={option.text} onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} />
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 <input type="text" value={question.correctAnswer} onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} />
//               </td>
//               <td>
//                 <button onClick={() => handleEditQuestion(question.id)}>Edit</button>
//                 <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizEditor;

































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Table } from 'react-bootstrap';
// import { BsPencil, BsTrash } from 'react-icons/bs';

// const QuizEditor = () => {
//   const [questions, setQuestions] = useState([]);

// //   useEffect(() => {
// //     // Fetch questions from the API
// //     axios.get('api_url_here')
// //       .then(response => {
// //         setQuestions(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching questions:', error);
// //       });
// //   }, []);

//   const handleEditQuestion = (questionId) => {
//     // Implement edit functionality
//     console.log('Editing question with ID:', questionId);
//   };

//   const handleDeleteQuestion = (questionId) => {
//     // Implement delete functionality
//     console.log('Deleting question with ID:', questionId);
//   };

//   const handleAddQuestion = () => {
//     // Implement add question functionality
//     console.log('Adding a new question');
//   };

//   return (
//     <div>
//       <Button onClick={handleAddQuestion}>Add Question</Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Options</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map(question => (
//             <tr key={question.id}>
//               <td>{question.text}</td>
//               <td>
//                 <ul>
//                   {question.options.map(option => (
//                     <li key={option.id}>{option.text}</li>
//                   ))}
//                 </ul>
//               </td>
//               <td>
//                 <Button variant="info" onClick={() => handleEditQuestion(question.id)}><BsPencil /></Button>{' '}
//                 <Button variant="danger" onClick={() => handleDeleteQuestion(question.id)}><BsTrash /></Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default QuizEditor;