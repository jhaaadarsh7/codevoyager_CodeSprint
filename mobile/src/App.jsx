import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import KycMultiStep from './pages/KYCVerification';
import KycCompleted from './pages/KYCCompleted';
import ErrorBoundary from './components/ErrorBoundary';
import EnhancedFinancialDashboard from './components/EnhancedFinancialDashboard';
import HotelBooking from './pages/HotelBooking';

function App() {

  return (
    <ErrorBoundary>

   <Routes>

    <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/kycverification' element={<KycMultiStep/>}/>
      <Route path='/kyccompleted' element={<KycCompleted/>}/>
      <Route path='/dashboard' element={<EnhancedFinancialDashboard/>}/>
            <Route path='/hotels' element={<HotelBooking/>}/>

   </Routes>
    </ErrorBoundary>
  )
}

export default App
