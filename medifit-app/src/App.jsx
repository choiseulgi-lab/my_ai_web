import { useState } from 'react';
import { BottomNav } from './components';
import Home from './pages/Home/Home';
import SymptomPage from './pages/Symptom/SymptomPage';
import './App.css';

export default function App() {
  const [tab, setTab]     = useState('home');
  const [screen, setScreen] = useState('home'); // 'home' | 'symptom'

  return (
    <>
      {screen === 'home' && (
        <Home onBookingClick={() => setScreen('symptom')} />
      )}

      {screen === 'symptom' && (
        <SymptomPage
          onBack={() => setScreen('home')}
          onNext={(data) => console.log('증상 선택 완료:', data)}
        />
      )}

      {screen === 'home' && (
        <BottomNav active={tab} onChange={setTab} badges={{ bookings: true }} />
      )}
    </>
  );
}
