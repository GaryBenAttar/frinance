import { Routes, Route } from 'react-router-dom';
import ClientList from './ClientList/ClientList';
import ClientDetail from './ClientDetail/ClientDetail';
import ClientForm from './ClientForm/ClientForm';

const Clients = () => {
  return (
    <Routes>
      <Route index element={<ClientList />} />
      <Route path=":clientId" element={<ClientDetail />} />
      <Route path="new" element={<ClientForm />} />
      <Route path="edit/:clientId" element={<ClientForm />} />
    </Routes>
  );
};

export default Clients;