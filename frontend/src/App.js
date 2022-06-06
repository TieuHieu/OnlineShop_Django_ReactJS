import Footer from "./components/Footer";
import Header from "./components/Header";
import './bootstrap.min.css';
import { Container } from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen/>} exact/>
              <Route path="/product/:id" element={<ProductScreen/>} exact />
              <Route path="/cart/:id" element={<CartScreen/>} />
              <Route path="/login" element={<LoginScreen/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/profile" element={<ProfileScreen/>} />
            </Routes>
          </Container>
        </main>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
