import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Recommendations } from './components/Recommendations';
import { MyPlants } from './components/MyPlants';
import { Benefits } from './components/Benefits';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { AIAssistant } from './components/AIAssistant';
import { Navigation } from './components/Navigation';
import { LanguageProvider } from './components/LanguageContext';

type Page = 'home' | 'recommendations' | 'myplants' | 'benefits' | 'faq' | 'about' | 'ai';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [myPlants, setMyPlants] = useState<any[]>([]);

  useEffect(() => {
    // Load saved plants from localStorage
    const saved = localStorage.getItem('btlah-my-plants');
    if (saved) {
      setMyPlants(JSON.parse(saved));
    }
  }, []);

  const addPlant = (plant: any) => {
    const updated = [...myPlants, { ...plant, id: Date.now() }];
    setMyPlants(updated);
    localStorage.setItem('btlah-my-plants', JSON.stringify(updated));
  };

  const removePlant = (id: number) => {
    const updated = myPlants.filter(p => p.id !== id);
    setMyPlants(updated);
    localStorage.setItem('btlah-my-plants', JSON.stringify(updated));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'recommendations':
        return <Recommendations onAddPlant={addPlant} myPlants={myPlants} />;
      case 'myplants':
        return <MyPlants plants={myPlants} onRemovePlant={removePlant} />;
      case 'benefits':
        return <Benefits />;
      case 'faq':
        return <FAQ />;
      case 'about':
        return <About />;
      case 'ai':
        return <AIAssistant />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9F7F3]">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
      </div>
    </LanguageProvider>
  );
}
