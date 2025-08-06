import { ClientProvider } from "./contexts/ClientContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

import { CustomNavbar } from "./components/navbar/CustomNavbar";
import { Clients } from "./pages/Clients";

const App = () => {
  return (
    <ClientProvider>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}

export default App;