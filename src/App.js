import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';
import { ChakraProvider } from '@chakra-ui/react';

function App() {


  
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
