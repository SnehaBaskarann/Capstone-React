import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import FileUploader from './BulkUpload';
import UploadBulkQuiz from './components/UploadBulkQuiz';
import AddQuestion from './components/AddQuestions';
import QuizEditor from './components/PreviewQuiz';
import QuizManager from './components/QuizManager';




function App() {
  return (
    <div className="App">
     <Routes>
      
    <Route path="/" element={<Home />} />
    <Route path="FileUploader" element={<FileUploader/>} />
    <Route path="bulkquiz" element={<UploadBulkQuiz/>}/>
    <Route path="addquestion" element={<AddQuestion/>}/>
    <Route path="quizEditor" element={<QuizEditor/>} />
    <Route path="quizManager" element={<QuizManager/>} />
    {/* <Route path="/quizengine" element={<QuizEngine/>}/>
    <Route path="/addquestion" element={<AdminAddQuestions/>}/> */}
  </Routes>
    </div>
    
  );
}
export default App;
