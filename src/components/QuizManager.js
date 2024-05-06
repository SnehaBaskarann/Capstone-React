import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
// import Home from '../Home';

const QuizManager = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState('');
  const [attemptsAllowed, setAttemptsAllowed] = useState('');
  const [maximumGrade, setMaximumGrade] = useState('');
  const navigate = useNavigate();

  const handleQuizDetailChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleNoOfQuestionsChange = (e) => {
    const count = Number(e.target.value);
    setNoOfQuestions(count);
    setQuestions(Array.from({ length: count }, () => ({
      question: '',
      questionType: '',
      options: [''],
      correctAnswer: ''
    })));
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].questionType = e.target.value;
    newQuestions[index].options = e.target.value === 'true_false' ? ['', ''] : [''];
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = e.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    if ((newQuestions[questionIndex].questionType === 'multiple_choice' && newQuestions[questionIndex].options.length < 4) ||
        (newQuestions[questionIndex].questionType === 'multi_choice' && newQuestions[questionIndex].options.length < 8)) {
      newQuestions[questionIndex].options.push('');
      setQuestions(newQuestions);
    }
  };

    const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', questionType: '', options: [''], correctAnswer: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      quizTitle,
      timeLimit,
      attemptsAllowed,
      maximumGrade,
      questions,
    });
    navigate('/path-after-submission');
  };

  return (
    <div>
      {/* <Home /> */}
      {/* <Navbar/> */}
      <div className="quiz-manager container mt-5">
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-3">
            <label htmlFor="noOfQuestions" className="form-label">No of Questions</label>
            <input
              type="number"
              className="form-control"
              id="noOfQuestions"
              value={noOfQuestions}
              onChange={handleNoOfQuestionsChange}
            />
          </div> */}

          {questions.map((q, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">Question {index + 1}:</label>
              <input
                type="text"
                className="form-control"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e)}
              />
              <label className="form-label mt-2">Question Type:</label>
              <select
                className="form-select"
                value={q.questionType}
                onChange={(e) => handleQuestionTypeChange(index, e)}
              >
                <option value="">Select Type</option>
                <option value="true_false">True/False</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="multi_choice">Multi-Choice</option>
              </select>
              {q.options.map((option, optionIndex) => (
                <div className="input-group mt-2" key={optionIndex}>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  />
                  {/* <i class="bi bi-trash3-fill"></i> */}
                  {q.options.length > 2 && (
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                    <i class="bi bi-trash3-fill"></i>
                      {/* Remove */}
                    </button>
                  )}
                </div>
                
              ))}
              {(q.questionType === 'multiple_choice' || q.questionType === 'multi_choice') && (
                <button
                  className="btn btn-outline-secondary mt-2"
                  type="button"
                  onClick={() => addOption(index)}
                >
                  Add Option
                </button>
              )}
              <div className="mt-2">
                <label className="form-label">Correct Answer:</label>
                <input
                  type="text"
                  className="form-control"
                  value={q.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(index, e)}
                />
              </div>
            </div>
          ))}
          <button
            className="btn btn-outline-primary mt-3"
            type="button"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <br/>
          <button
            className="btn btn-success mt-3"
            type="submit"
          >
            Save Changes
          </button>
          <br/>
          <button
            className="btn btn-primary mt-3"
            type="submit"
          >
            Submit Quiz
          </button>

        </form>
      </div>
    </div>
  );
};

export default QuizManager;






























// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './QuizManager.css';
// import Home from '../Home';

// const QuizManager = () => {
//   const [quizTitle, setQuizTitle] = useState('');
//   const [timeLimit, setTimeLimit] = useState('');
//   const [attemptsAllowed, setAttemptsAllowed] = useState('');
//   const [maximumGrade, setMaximumGrade] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   const handleQuizDetailChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

//   const handleQuestionChange = (index, e) => {
//     const newQuestions = [...questions];
//     newQuestions[index].question = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleQuestionTypeChange = (index, e) => {
//     const newQuestions = [...questions];
//     newQuestions[index].questionType = e.target.value;
//     newQuestions[index].options = e.target.value === 'true_false' ? ['', ''] : [''];
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, e) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options[optionIndex] = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleCorrectAnswerChange = (questionIndex, e) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].correctAnswer = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const addOption = (questionIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options.push('');
//     setQuestions(newQuestions);
//   };

//   const removeOption = (questionIndex, optionIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].options.splice(optionIndex, 1);
//     setQuestions(newQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([...questions, { question: '', questionType: '', options: [''], correctAnswer: '' }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       quizTitle,
//       timeLimit,
//       attemptsAllowed,
//       maximumGrade,
//       questions,
//     });
//     navigate('/path-after-submission');
//   };

//   return (
//     <div>
//       <Home />
//       <div className="quiz-manager container mt-5">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="quizTitle" className="form-label">Quiz Title:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="quizTitle"
//               value={quizTitle}
//               onChange={handleQuizDetailChange(setQuizTitle)}
//             />
//           </div>
//           {questions.map((q, index) => (
//             <div key={index} className="mb-3">
//               <label className="form-label">Question {index + 1}:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={q.question}
//                 onChange={(e) => handleQuestionChange(index, e)}
//               />
//               <label className="form-label mt-2">Question Type:</label>
//               <select
//                 className="form-select"
//                 value={q.questionType}
//                 onChange={(e) => handleQuestionTypeChange(index, e)}
//               >
//                 <option value="">Select Type</option>
//                 <option value="true_false">True/False</option>
//                 <option value="multiple_choice">Multiple Choice</option>
//                 <option value="multi_choice">Multi-Choice</option>
//               </select>
//               {q.options.map((option, optionIndex) => (
//                 <div className="input-group mt-2" key={optionIndex}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, optionIndex, e)}
//                   />
//                   {q.options.length > 2 && (
//                     <button
//                       className="btn btn-outline-danger"
//                       type="button"
//                       onClick={() => removeOption(index, optionIndex)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {(q.questionType === 'multiple_choice' || q.questionType === 'multi_choice') && (
//                 <button
//                   className="btn btn-outline-secondary mt-2"
//                   type="button"
//                   onClick={() => addOption(index)}
//                 >
//                   Add Option
//                 </button>
//               )}
//               <div className="mt-2">
//                 <label className="form-label">Correct Answer:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={q.correctAnswer}
//                   onChange={(e) => handleCorrectAnswerChange(index, e)}
//                 />
//               </div>
//             </div>
//           ))}
//           <button
//             className="btn btn-outline-primary mt-3 "
//             type="button"
//             onClick={addQuestion}
//           >
//             Add Question
//           </button>
//           <button
//             className="btn btn-primary mt-3"
//             type="submit"
//           >
//             Submit Quiz
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default QuizManager;






































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const QuizManager = () => {
//   const [quizTitle, setQuizTitle] = useState('');
//   const [timeLimit, setTimeLimit] = useState('');
//   const [attemptsAllowed, setAttemptsAllowed] = useState('');
//   const [maximumGrade, setMaximumGrade] = useState('');
//   const [numberOfQuestions, setNumberOfQuestions] = useState(1);
//   const [questions, setQuestions] = useState([]);
//   const [question, setQuestion] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [options, setOptions] = useState(['']);
//   const navigate = useNavigate();

//   const handleQuizDetailChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

// //   const handleNumberOfQuestionsChange = (e) => {
// //     const count = e.target.value;
// //     setNumberOfQuestions(count);
// //     setQuestions(new Array(parseInt(count)).fill(null).map(() => ({
// //       question: '',
// //       questionType: '',
// //       options: [''],
// //     })));
// //   };

// const handleNumberOfQuestionsChange = (e) => {
//     // Get the user input value
//     const userInput = e.target.value;
  
//     // Convert the input value to an integer
//     const count = parseInt(userInput, 10);
  
//     // Check if the count is a number and greater than zero
//     if (!isNaN(count) && count > 0) {
//       // Update the number of questions state
//       setNumberOfQuestions(count);
  
//       // Reset the questions array based on the new count
//       setQuestions(new Array(count).fill(null).map(() => ({
//         question: '',
//         questionType: '',
//         options: [''],
//       })));
//     } else {
//       // Handle invalid input (e.g., not a number or less than 1)
//       // You can alert the user or set an error state here
//       console.error('Please enter a valid number of questions.');
//     }
//   };
  

// //   const handleQuestionChange = (e) => {
// //     setQuestion(e.target.value);
// //   };

//   const handleQuestionChange = (index, e) => {
//     const newQuestions = [...questions];
//     newQuestions[index].question = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleQuestionTypeChange = (e) => {
//     const type = e.target.value;
//     setQuestionType(type);
//     // Set default number of options based on question type
//     if (type === 'true_false') {
//       setOptions(['', '']);
//     } else if (type === 'multiple_choice') {
//       setOptions(['', '', '', '']);
//     } else if (type === 'multi_choice') {
//       setOptions(['', '', '', '', '']);
//     }
//   };

//   const handleOptionChange = (index, e) => {
//     const newOptions = [...options];
//     newOptions[index] = e.target.value;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, '']);
//   };

//   const removeOption = (index) => {
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setOptions(newOptions);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit your form data here
//     console.log({
//       quizTitle,
//       timeLimit,
//       attemptsAllowed,
//       maximumGrade,
//       questions,
//     });
//     // Redirect to another page after submission
//     navigate('/addQuestion');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="container">
//           <div className="d-flex mt-3">
//             <h6>Quiz Title:</h6>
//             <input
//               type="text"
//               value={quizTitle}
//               onChange={handleQuizDetailChange(setQuizTitle)}
//               style={{ width: 110, marginLeft: 10, borderRadius: 15 }}
//             />
//           </div>
//           <div className="d-flex mt-3">
//             <h6>Time Limit:</h6>
//             <input
//               type="number"
//               value={timeLimit}
//               onChange={handleQuizDetailChange(setTimeLimit)}
//               style={{ width: 100, marginLeft: 10, borderRadius: 15 }}
//             />
//           </div>
//           <div className="d-flex mt-3">
//             <h6>Attempts Allowed:</h6>
//             <input
//               type="number"
//               value={attemptsAllowed}
//               onChange={handleQuizDetailChange(setAttemptsAllowed)}
//               style={{ width: 100, marginLeft: 10, borderRadius: 15 }}
//             />
//           </div>
//           <div className="d-flex mt-3">
//             <h6>Maximum Grade:</h6>
//             <input
//               type="number"
//               value={maximumGrade}
//               onChange={handleQuizDetailChange(setMaximumGrade)}
//               style={{ width: 100, marginLeft: 10, borderRadius: 15 }}
//             />
//           </div>
//           <div className="d-flex mt-3">
//             <h6>Number of Questions:</h6>
//             <input
//               type="number"
//               value={numberOfQuestions}
//               onChange={handleNumberOfQuestionsChange}
//               style={{ width: 100, marginLeft: 10, borderRadius: 15 }}
//             />
//           </div>
//         </div>

//         {questions.map((questionObj, index) => (
//           <div key={index}>
//            <form onSubmit={handleSubmit}>
//       <label>
//         Question:
//         <input type="text" value={question} onChange={handleQuestionChange} />
//       </label>
//       <label>
//         Question Type:
//         <select value={questionType} onChange={handleQuestionTypeChange}>
//           <option value="">Select Type</option>
//           <option value="true_false">True/False</option>
//           <option value="multiple_choice">Multiple Choice</option>
//           <option value="multi_choice">Multi-Choice</option>
//         </select>
//       </label>
//       {options.map((option, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={option}
//             onChange={(e) => handleOptionChange(index, e)}
//           />
//           {options.length > 2 && (
//             <button type="button" onClick={() => removeOption(index)}>
//               Remove
//             </button>
//           )}
//         </div>
//       ))}
//       {(questionType === 'multiple_choice' || questionType === 'multi_choice') && (
//         <button type="button" onClick={addOption}>
//           Add Option
//         </button>
//       )}
//       <button type="submit">Submit</button>
//     </form>
//           </div>
//         ))}

//         <button type="submit">Submit Quiz</button>
//       </form>
//     </div>
//   );
// };

// export default QuizManager;
