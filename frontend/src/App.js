import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/footer';
import About from './components/about/About';
import Signup from './components/signup/signup';
import SignIn from './components/signup/signin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from './components/todo/Todo';
import {useDispatch} from 'react-redux'
import {authActions} from './store';


const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[]
)

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route  path='/About' element={<About/>}></Route>
          <Route  path='/todo' element={<Todo/>}></Route>
          <Route  path='/signup' element={<Signup/>}></Route>
          <Route  path='/signin' element={<SignIn/>}></Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App