import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginInfluencer from './pages/LoginInfluencer';
import RegisterInfluencer from './pages/RegisterInfluencer';
import Home from './pages/Home'
import DashboardInfluencer from './pages/DashboardInfluencer';
import LoginBrand from './pages/LoginBrand';
import RegisterBrand from './pages/RegisterBrand';
import DashboardBrand from './pages/DashboardBrand';
import SetupProfile from './pages/SetupProfile';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login-influencer" element={<LoginInfluencer />} />
        <Route path="/register-influencer" element={<RegisterInfluencer />} />
        <Route path= "/" element={<Home />} />
        <Route path= "/login-brand" element={<LoginBrand />}/>
        <Route path= "/register-brand" element={<RegisterBrand/>}/>
        <Route path= "/dashboard-influencer" element= {<DashboardInfluencer />}/>
        <Route path= "/dashboard-brand" element = {<DashboardBrand/>}/>
        <Route path="/setup-profile/:id" element={<SetupProfile />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default App;
