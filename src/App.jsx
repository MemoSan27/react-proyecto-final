import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductIdPage from './pages/ProductIdPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import CartPage from './pages/CartPage'
import User from './components/LoginPage/User'
import ProtectedRoutes from './components/ProtectedRoutes'
import PurchasesPage from './pages/PurchasesPage'

function App() {
    
  return (
    <>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/product/:id' element={<ProductIdPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}> 
            <Route path='/cart' element={<CartPage />} />
            <Route path='/user' element={<User />} />
            <Route path='/purchases' element={<PurchasesPage />} />
          </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
