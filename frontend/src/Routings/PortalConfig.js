import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '../userCreds/LoginForm'
import RegistrationForm from '../userCreds/RegistrationForm'
import Home from '../components/Home'
import CreateBlog from '../components/CreateBlog'
import UserBlogs from '../components/UserBlogs'
import PrivateRoutes from './PrivateRoutes'
import EditBlog from '../components/EditBlog'
function PortalConfig() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path='/' element={<PrivateRoutes Component={Home} />} /> 
      <Route path='/createBlog' element={<PrivateRoutes Component={CreateBlog} />} />
      <Route path='/userblog' element={<PrivateRoutes Component={UserBlogs} />} />
      <Route path="/editBlog/:id" element={<PrivateRoutes Component={EditBlog} />} />


    </Routes>
  )
}

export default PortalConfig
