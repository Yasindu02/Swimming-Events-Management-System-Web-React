import Dashboard from "./Dashboard";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Student from "./Student";
import Task from "./Task";
import Home from "./Home";
import Data from "./Data";

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='' element={<Login />}></Route>
    <Route path='/' element={<Dashboard />}>
      <Route path='/student' element={<Student />}></Route>
      <Route path='/score' element={<Home />}></Route>
      <Route path='/task' element={<Task />}></Route>
      <Route path='/saveAllToData' element={<Home />}></Route>
      <Route path='/getSavedData' element={<Data />}></Route>
      <Route path='/logout' element={<Login />}></Route>
    </Route>
    <Route path='/login' element={<Login />}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
