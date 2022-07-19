import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import './App.scss' 

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div>
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
