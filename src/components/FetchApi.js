// FetchApi.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function FetchApi() {
  // This would typically come from an API call
  const [questions, setQuestions] = useState([
    { question: 'Question 1', options: ['Option 1', 'Option 2'], answer: 'Option 1', isEditable: false },
    // More questions...
  ]);

  const handleEdit = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].isEditable = true;
    setQuestions(newQuestions);
  };

  const handleSave = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    newQuestions[index].isEditable = false;
    setQuestions(newQuestions);
  };

  const handleDelete = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <Form key={questionIndex}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            {question.isEditable ? (
              <Form.Control 
                type="text"
                value={question.question} 
                onChange={e => handleSave(questionIndex, 'question', e.target.value)} 
              />
            ) : (
              <Form.Text>{question.question}</Form.Text>
            )}
          </Form.Group>
          {question.options.map((option, optionIndex) => (
            <Form.Group key={optionIndex}>
              <Form.Label>Option {optionIndex + 1}</Form.Label>
              {question.isEditable ? (
                <Form.Control 
                  type="text"
                  value={option} 
                  onChange={e => handleSave(questionIndex, 'options', e.target.value)} 
                />
              ) : (
                <Form.Text>{option}</Form.Text>
              )}
            </Form.Group>
          ))}
          <Form.Group>
            <Form.Label>Answer</Form.Label>
            {question.isEditable ? (
              <Form.Control 
                type="text"
                value={question.answer} 
                onChange={e => handleSave(questionIndex, 'answer', e.target.value)} 
              />
            ) : (
              <Form.Text>{question.answer}</Form.Text>
            )}
          </Form.Group>
          <Button onClick={() => handleEdit(questionIndex)}>Edit</Button>
          <Button onClick={() => handleDelete(questionIndex)}>Delete</Button>
        </Form>
      ))}
    </div>
  );
}

export default FetchApi;
