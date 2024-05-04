import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';

const QuizEditor = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'What is the capital of France?',
      options: [
        { id: 'a', text: 'Paris' },
        { id: 'b', text: 'London' },
        { id: 'c', text: 'Berlin' },
        { id: 'd', text: 'None of the Above' },
      ],
      correctAnswer: 'a',
      isEditing: false
    },
    {
      id: 2,
      text: 'Who wrote "To Kill a Mockingbird"?',
      options: [
        { id: 'a', text: 'Harper Lee' },
        { id: 'b', text: 'George Orwell' },
        { id: 'c', text: 'Mark Twain' },
      ],
      correctAnswer: 'a',
      isEditing: false
    },
    // Add more questions here
  ]);

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
    // Implement add question functionality here
  };

  const handleToggleEdit = (questionId) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, isEditing: !question.isEditing } : question
    ));
  };

  return (
    <Container>
      {questions.map((question, index) => (
        <Container className="mb-3 p-3 border" key={question.id}>
          <Row>
            <Col>
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control as="textarea" rows={3} value={question.text} onChange={(e) => handleEditQuestion(question.id, e.target.value)} readOnly={!question.isEditing} />
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
          {question.options.map((option, index) => (
            <Row className="mt-2" key={option.id}>
              <Col>
                <Form.Label>Option {String.fromCharCode(65 + index)}</Form.Label>
                <Form.Control type="text" value={option.text} onChange={(e) => handleEditOption(question.id, option.id, e.target.value)} readOnly={!question.isEditing} />
              </Col>
            </Row>
          ))}
          <Row className="mt-2">
            <Col>
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control type="text" value={question.correctAnswer} onChange={(e) => handleEditCorrectAnswer(question.id, e.target.value)} readOnly={!question.isEditing} />
            </Col>
         
          </Row>
          {index === questions.length - 1 && (
            <Row className="mt-2">
              <Col>
                <Button onClick={handleAddQuestion}>Add Question</Button>
              </Col>
            </Row>
          )}
        </Container>
      ))}
    </Container>
  );
};

export default QuizEditor;






































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