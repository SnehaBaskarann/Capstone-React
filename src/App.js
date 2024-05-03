import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import FileUploader from './BulkUpload';
import UploadBulkQuiz from './components/UploadBulkQuiz';
import AddQuestion from './components/AddQuestions';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="FileUploader" element={<FileUploader/>} />
        <Route path="bulkQuiz" element={<UploadBulkQuiz/>} />
        <Route path="addQuestion" element={<AddQuestion/>} />
        {/* <Route path="/quizengine" element={<QuizEngine/>}/>
        <Route path="/addquestion" element={<AdminAddQuestions/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
