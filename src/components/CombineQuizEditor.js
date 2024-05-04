// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../Home';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { PencilSquare, TrashFill, Check2Square } from 'react-bootstrap-icons';

const CombineQuizEditor = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [noOfQuestions, setNoOfQuestions] = useState(0);
//   const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState('');
  const [attemptsAllowed, setAttemptsAllowed] = useState('');
  const [maximumGrade, setMaximumGrade] = useState('');
  const navigate = useNavigate();

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
      <Home />
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
            className="btn btn-outline-primary mt-3 "
            type="button"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <button
            className="btn btn-success mt-3"
            type="submit"
          >
            Save Changes
          </button>
          <button
            className="btn btn-primary mt-3"
            type="submit"
          >
            Submit Quiz
          </button>

        </form>
      </div>
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
    </div>
    
  );
};

export default CombineQuizEditor;