import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import BulkQuiz from './components/UploadBulkQuiz';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bulkquiz" element={<BulkQuiz/>}/>
        {/* <Route path="/quizengine" element={<QuizEngine/>}/>
        <Route path="/addquestion" element={<AdminAddQuestions/>}/> */}
      </Routes>
    </div>
  );
}
export default App;
