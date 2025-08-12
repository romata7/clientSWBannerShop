import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

import { Clients } from "./pages/Clients";
import { MainNavbar } from "./components/navbar/MainNavbar";
import { Orders } from "./pages/Orders";
import { ClientsProvider } from "./features/clients/context/ClientsContext";
import { ToastContainer } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <ClientsProvider>
        <MainNavbar />
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/ordenes" element={<Orders />} />
        </Routes>
      </ClientsProvider>
    </Router>
  );
}

export default App;