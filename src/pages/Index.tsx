import { useState } from 'react';
import GameScreen from '@/components/GameScreen';
import HomeScreen from '@/components/HomeScreen';
import LevelSelect from '@/components/LevelSelect';
import Settings from '@/components/Settings';
import Results from '@/components/Results';

export type Screen = 'home' | 'game' | 'levels' | 'settings' | 'results';

export interface GameResult {
  score: number;
  combo: number;
  accuracy: number;
  perfect: number;
  good: number;
  miss: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setCurrentScreen('game');
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    setCurrentScreen('results');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'game':
        return <GameScreen level={selectedLevel} onComplete={handleGameComplete} onBack={() => setCurrentScreen('levels')} />;
      case 'levels':
        return <LevelSelect onSelect={handleLevelSelect} onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('home')} />;
      case 'results':
        return <Results result={gameResult!} onPlayAgain={() => setCurrentScreen('game')} onHome={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple/10 to-electric/10">
      {renderScreen()}
    </div>
  );
};

export default Index;
