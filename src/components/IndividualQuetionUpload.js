import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState(['']);
//   const history = useHistory();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    const type = e.target.value;
    setQuestionType(type);
    // Set default number of options based on question type
    if (type === 'true_false') {
      setOptions(['', '']);
    } else if (type === 'multiple_choice') {
      setOptions(['', '', '', '']);
    } else if (type === 'multi_choice') {
      setOptions(['', '', '', '', '']);
    }
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit your form data here
    console.log({ question, questionType, options });
    // Redirect to another page after submission
    // history.push('/path-to-redirect');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input type="text" value={question} onChange={handleQuestionChange} />
      </label>
      <label>
        Question Type:
        <select value={questionType} onChange={handleQuestionTypeChange}>
          <option value="">Select Type</option>
          <option value="true_false">True/False</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="multi_choice">Multi-Choice</option>
        </select>
      </label>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
          />
          {options.length > 2 && (
            <button type="button" onClick={() => removeOption(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      {(questionType === 'multiple_choice' || questionType === 'multi_choice') && (
        <button type="button" onClick={addOption}>
          Add Option
        </button>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
