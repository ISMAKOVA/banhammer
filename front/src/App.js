import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {SystemPagesTemplate} from "./pages/template-pages";

function App() {
  return (
      <BrowserRouter>
          <SystemPagesTemplate>
          <AppRouter/>
          </SystemPagesTemplate>
      </BrowserRouter>
  );
}

export default App;
