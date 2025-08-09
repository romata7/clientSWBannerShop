import { ClientProvider } from "./contexts/ClientContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

import { Clients } from "./pages/Clients";
import { MainNavbar } from "./components/navbar/MainNavbar";
import { Orders } from "./pages/Orders";

const App = () => {
  return (
    <ClientProvider>
      <Router>
        <MainNavbar />
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/ordenes" element={<Orders />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}

export default App;