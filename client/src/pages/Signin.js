import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import '../styles/Home.css';

export default function Signin() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Features />
      <Footer />
    </div>
    );
}