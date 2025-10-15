import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LevelSelectProps {
  onSelect: (level: number) => void;
  onBack: () => void;
}

const levels = [
  { id: 1, name: 'Легкий старт', difficulty: 'Легко', icon: '🎵', bpm: 80 },
  { id: 2, name: 'Средний темп', difficulty: 'Средне', icon: '🥁', bpm: 120 },
  { id: 3, name: 'Быстрый ритм', difficulty: 'Сложно', icon: '🎸', bpm: 160 },
];

const LevelSelect = ({ onSelect, onBack }: LevelSelectProps) => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-foreground">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад
          </Button>
          <h2 className="text-3xl font-bold">Выбор уровня</h2>
          <div className="w-24"></div>
        </div>

        <div className="grid gap-6">
          {levels.map((level, index) => (
            <Card 
              key={level.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-electric transition-all cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSelect(level.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{level.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{level.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className={`px-3 py-1 rounded-full ${
                        level.difficulty === 'Легко' ? 'bg-green-500/20 text-green-300' :
                        level.difficulty === 'Средне' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {level.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-electric/20 text-electric">
                        {level.bpm} BPM
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg"
                  className="bg-vibrople hover:bg-vibrople/90 text-white font-bold px-8 py-6 rounded-xl"
                >
                  <Icon name="Play" className="mr-2" size={24} />
                  Играть
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
