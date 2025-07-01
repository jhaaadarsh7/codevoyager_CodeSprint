import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import KycMultiStep from './pages/KYCVerification';
import KycCompleted from './pages/KYCCompleted';

function App() {

  return (
   <Routes>
    <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/kycverification' element={<KycMultiStep/>}/>
      <Route path='/kyccompleted' element={<KycCompleted/>}/>

   </Routes>
  )
}

export default App
