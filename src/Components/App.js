import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import "./CSS/main.css";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Home from "./Pages/Home";
import Encryption from "./Pages/Encryption";
import "./CSS/pages.css";
import Decryption from "./Pages/Decryption";
import FederationSetup from "./Pages/FederationSetup";
import SSORedirect from "./Pages/SSORedirect";
import SuccessPage from "./Pages/SuccessPage";

function App() {
  return (
    <Router>
      <div id="outer-container" style={{ height: "100%" }}>
        <Menu />
        <Header />
        <main id="page-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/encrypt" element={<Encryption />} />
            <Route path="/decrypt" element={<Decryption />} />
            <Route path="/sso/setup" element={<FederationSetup />} />
            <Route path="/sso/redirect" element={<SSORedirect />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
