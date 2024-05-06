import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import FileUploader from './BulkUpload';
import QuizEditor from './components/PreviewQuiz';
import QuizManager from './components/QuizManager';
import CombineQuizEditor from './components/CombineQuizEditor';
import FetchApi from './components/FetchApi';
import EditQuiz from './components/EditQuiz';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="FileUploader" element={<FileUploader/>} />
        <Route path="quizEditor" element={<QuizEditor/>} />
        <Route path="quizManager" element={<QuizManager/>} />
        <Route path="combineQuizEditor" element={<CombineQuizEditor/>} />
        <Route path="fetchApi" element={<FetchApi/>} />
        <Route path="editQuiz" element={<EditQuiz/>} />
        {/* <Route path="/quizengine" element={<QuizEngine/>}/>
        <Route path="/addquestion" element={<AdminAddQuestions/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
