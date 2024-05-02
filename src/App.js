import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import FileUploader from './BulkUpload';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="FileUploader" element={<FileUploader/>} />
        {/* <Route path="/quizengine" element={<QuizEngine/>}/>
        <Route path="/addquestion" element={<AdminAddQuestions/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
