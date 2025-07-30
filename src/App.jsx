import { ClientProvider } from "./contexts/ClientContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <ClientProvider>
      <Home />
    </ClientProvider>
  );
}

export default App;