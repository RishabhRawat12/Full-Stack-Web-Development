import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Front from "./components/Front";
import Footer from "./components/Footer";
import Secondbars from "./components/Secondbars";
import CodeEditor from "./components/CodeEditor";
import About from "./pages/About";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/build" element={<CodeEditor />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      {location.pathname === "/" && <Secondbars />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
