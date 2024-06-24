import './App.css';
import PageInicio from '../pages/PageInicio';
import PageCrud from '../pages/PageCrud';
import Header from '../components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageComparar from '../pages/PageComparar';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PageInicio />} />
          <Route path="/crud" element={<PageCrud />} />
          <Route path="/comparar" element={<PageComparar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
