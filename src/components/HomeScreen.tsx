import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Screen } from '@/pages/Index';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-wider bg-gradient-to-r from-vibrople via-purple to-electric bg-clip-text text-transparent">
            RHYTHM GAME
          </h1>
          <p className="text-xl text-muted-foreground">Играй в ритм музыки</p>
        </div>

        <div className="flex gap-8 justify-center text-6xl">
          <span className="animate-pulse">🎵</span>
          <span className="animate-pulse delay-100">🥁</span>
          <span className="animate-pulse delay-200">🎸</span>
          <span className="animate-pulse delay-300">🎧</span>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-12">
          <Button 
            onClick={() => onNavigate('levels')}
            size="lg"
            className="w-full bg-vibrople hover:bg-vibrople/90 text-white font-bold text-xl py-8 rounded-xl shadow-lg shadow-vibrople/50 transition-all hover:scale-105"
          >
            <Icon name="Play" className="mr-2" size={28} />
            Играть
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('settings')}
              variant="outline"
              size="lg"
              className="border-2 border-electric text-electric hover:bg-electric hover:text-background font-bold py-6 rounded-xl"
            >
              <Icon name="Settings" className="mr-2" size={20} />
              Настройки
            </Button>

            <Button 
              onClick={() => onNavigate('results')}
              variant="outline"
              size="lg"
              className="border-2 border-purple text-purple hover:bg-purple hover:text-white font-bold py-6 rounded-xl"
            >
              <Icon name="Trophy" className="mr-2" size={20} />
              Рекорды
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
