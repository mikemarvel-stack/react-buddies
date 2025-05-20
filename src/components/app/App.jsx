import { Link, Routes, Route } from 'react-router-dom';
import Form from '../Form';
import Home from '../Home';
import TaskList from '../TaskList';
import Modal from '../modal/Modal.jsx'; // Fixed import path
import './App.css';

function App() {
  return (
    <>
      <div className='app-container'>
        <nav className='app-nav'>
          <Link to={"/"}>Home</Link>
          <Link to={"/form"}>Form</Link>
          <Link to={"/tasks"}>Group Tasks</Link>
        </nav>
        <main className='app-main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='/tasks' element={<TaskList />} />
          </Routes>
          <div className="App">
              <Modal /> 
          </div>
        </main>
      </div>
    </>
  );
}

export default App;