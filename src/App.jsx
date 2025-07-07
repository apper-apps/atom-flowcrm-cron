import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Deals from '@/components/pages/Deals';
import Contacts from '@/components/pages/Contacts';
import Tasks from '@/components/pages/Tasks';
import Activities from '@/components/pages/Activities';
import Reports from '@/components/pages/Reports';
import DealDetail from '@/components/pages/DealDetail';
import ContactDetail from '@/components/pages/ContactDetail';
import ContactForm from '@/components/pages/ContactForm';
import DealForm from '@/components/pages/DealForm';
import TaskForm from '@/components/pages/TaskForm';
import ActivityForm from '@/components/pages/ActivityForm';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Layout>
<Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deals/new" element={<DealForm />} />
            <Route path="/deals/:id" element={<DealDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/new" element={<ContactForm />} />
            <Route path="/contacts/:id" element={<ContactDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/new" element={<ActivityForm />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;