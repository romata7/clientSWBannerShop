import { ClientProvider } from "./contexts/ClientContext";
import { ClientForm } from "./features/clients/components/ClientForm";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <ClientProvider>
      <ClientForm />
    </ClientProvider>
  );
}

export default App;