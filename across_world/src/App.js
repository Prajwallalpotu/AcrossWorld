// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileList from './pages/ProfileList';
import ProfileView from './pages/ProfileView';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ProfileDetails from './components/ProfileDetails';
import MapPage from './pages/MapPage';
import {mockProfiles} from './data/profileData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileList />} />
        <Route path="/" element={<ProfileDetails profile={mockProfiles[0]} />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/map" element={<MapPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/add" element={<AddUser />} />
        <Route path="/admin/edit/:id" element={<EditUser />} />


      </Routes>
    </Router>
  );
}

export default App;
