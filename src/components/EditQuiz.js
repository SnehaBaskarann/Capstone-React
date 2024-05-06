import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
import './EditQuiz.css'; // Import CSS file for styling

const EditQuiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Mock data
    const mockData = [
      {
        id: 1,
        text: 'Question 1',
        options: [
          { id: 1, text: 'Option 1' },
          { id: 2, text: 'Option 2' },
        ],
        correctAnswer: 'Option 1',
        isEditing: false,
      },
      {
        id: 2,
        text: 'Question 2',
        options: [
          { id: 1, text: 'Option 1' },
          { id: 2, text: 'Option 2' },
        ],
        correctAnswer: 'Option 2',
        isEditing: false,
      },
    ];

    setQuestions(mockData);
  }, []);

  const handleEditQuestion = (questionId, newText) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, text: newText } : question
    ));
  };

  const handleEditOption = (questionId, optionId, newText) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { 
        ...question, 
        options: question.options.map(option => 
          option.id === optionId ? { ...option, text: newText } : option
        ) 
      } : question
    ));
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(question => question.id !== questionId));
  };

  const handleEditCorrectAnswer = (questionId, newAnswer) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, correctAnswer: newAnswer } : question
    ));
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { 
      id: questions.length + 1,
      text: `Question ${questions.length + 1}`,
      options: [{ id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' }],
      correctAnswer: 'Option 1',
      isEditing: false
    }]);
  };

  const handleToggleEdit = (questionId) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
    ));
  };

  return (
    <div className="edit-quiz-container">
      <Container>
        {questions.map((question, index) => (
          <Container className="mb-3 p-3 border" key={question.id}>
            <Row>
              <Col>
                <Form.Group controlId={`question${index}`}>
                  <Form.Label>Question {index + 1}</Form.Label>
                  <Form.Control as="textarea" rows={3} value={question.text} onChange={(e) => handleEditQuestion(question.id, e.target.value)} readOnly={!question.isEditing} />
                </Form.Group>
              </Col>
              <Col xs="auto" className="my-auto">
                {question.isEditing ? (
                  <Check2Square size={30} color="green" onClick={() => handleToggleEdit(question.id)} />
                ) : (
                  <PencilSquare size={30} color="blue" onClick={() => handleToggleEdit(question.id)} />
                )}
                <TrashFill size={30} color="red" className="ml-2" onClick={() => handleDeleteQuestion(question.id)} />
              </Col>
            </Row>
            {question.options.map((option, optionIndex) => (
              <Row className="mt-2" key={option.id}>
                <Col>
                  <Form.Group controlId={`option${index}${optionIndex}`}>
                    <Form.Label>Option {String.fromCharCode(65 + optionIndex)}</Form.Label>
                    <Form.Control type="text" value={option.text} onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} readOnly={!question.isEditing} />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <Row className="mt-2">
              <Col>
                <Form.Group controlId={`correctAnswer${index}`}>
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Control type="text" value={question.correctAnswer} onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} readOnly={!question.isEditing} />
                </Form.Group>
              </Col>
            </Row>
          </Container>
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

export default EditQuiz;































// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';

// const EditQuiz = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     // Mock data
//     const mockData = [
//       {
//         id: 1,
//         text: 'Question 1',
//         options: [
//           { id: 1, text: 'Option 1' },
//           { id: 2, text: 'Option 2' },
//         ],
//         correctAnswer: 'Option 1',
//         isEditing: false,
//       },
//       {
//         id: 2,
//         text: 'Question 2',
//         options: [
//           { id: 1, text: 'Option 1' },
//           { id: 2, text: 'Option 2' },
//         ],
//         correctAnswer: 'Option 2',
//         isEditing: false,
//       },
//     ];

//     setQuestions(mockData);
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

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { 
//       id: questions.length + 1,
//       text: `Question ${questions.length + 1}`,
//       options: [{ id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' }],
//       correctAnswer: 'Option 1',
//       isEditing: false
//     }]);
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

// export default EditQuiz;

























// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';

// const EditQuiz = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     // Mock data
//     const mockData = [
//       {
//         id: 1,
//         text: 'Question 1',
//         options: [
//           { id: 1, text: 'Option 1' },
//           { id: 2, text: 'Option 2' },
//         ],
//         correctAnswer: 'Option 1',
//         isEditing: false,
//       },
//       {
//         id: 2,
//         text: 'Question 2',
//         options: [
//           { id: 1, text: 'Option 1' },
//           { id: 2, text: 'Option 2' },
//         ],
//         correctAnswer: 'Option 2',
//         isEditing: false,
//       },
//     ];

//     setQuestions(mockData);
//   }, []);

//    const handleEditQuestion = (questionId, newText) => {
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

// export default EditQuiz;











































// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';
// import axios from 'axios';

// const EditQuiz = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     // Mock API endpoint
//     const apiUrl = 'https://api.mockapi.com/questions';
    
//     // Fetch questions from the API
//     axios.get(apiUrl)
//       .then(response => {
//         setQuestions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching questions:', error);
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

// export default EditQuiz;