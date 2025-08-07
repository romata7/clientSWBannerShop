import { ClientProvider } from "./contexts/ClientContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

import { Clients } from "./pages/Clients";
import { MainNavbar } from "./components/navbar/MainNavbar";

const App = () => {
  return (
    <ClientProvider>
      <Router>
        <MainNavbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<Clients />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}

export default App;