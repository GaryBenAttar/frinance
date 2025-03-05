import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import Clients from './features/clients/Clients';
import Invoices from './features/invoices/Invoices';
import Expenses from './features/Expenses/Expenses';
import Insights from './features/insights/Insights';
import Chatbot from './features/chatbot/Chatbot';
import Login from './features/login/Login';
import Settings from './features/settings/Settings';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients/*" element={<Clients />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="insights" element={<Insights />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
