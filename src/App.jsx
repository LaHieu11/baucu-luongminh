import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Candidates from './components/Candidates';
import Process from './components/Process';
import Schedule from './components/Schedule';

import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Candidates />
        <Process />
        <Schedule />

      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
