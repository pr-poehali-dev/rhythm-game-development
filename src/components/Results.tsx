import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { GameResult } from '@/pages/Index';

interface ResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
  onHome: () => void;
}

const Results = ({ result, onPlayAgain, onHome }: ResultsProps) => {
  const getRank = (accuracy: number) => {
    if (accuracy >= 95) return { rank: 'S', color: 'text-yellow-400', emoji: '🏆' };
    if (accuracy >= 85) return { rank: 'A', color: 'text-purple', emoji: '⭐' };
    if (accuracy >= 75) return { rank: 'B', color: 'text-electric', emoji: '🎵' };
    if (accuracy >= 60) return { rank: 'C', color: 'text-green-400', emoji: '🎶' };
    return { rank: 'D', color: 'text-muted-foreground', emoji: '🎼' };
  };

  const rankInfo = getRank(result?.accuracy || 0);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-8 bg-card/50 backdrop-blur-sm border-2 border-border animate-slide-up">
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl text-muted-foreground mb-4">Результаты</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-8xl">{rankInfo.emoji}</span>
              <span className={`text-9xl font-bold ${rankInfo.color}`}>{rankInfo.rank}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-background/50 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2 text-vibrople">
                <Icon name="Award" size={24} />
                <span className="text-sm font-semibold">ОЧКИ</span>
              </div>
              <p className="text-4xl font-bold">{result?.score.toLocaleString() || 0}</p>
            </div>

            <div className="p-6 bg-background/50 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2 text-electric">
                <Icon name="Zap" size={24} />
                <span className="text-sm font-semibold">КОМБО</span>
              </div>
              <p className="text-4xl font-bold">{result?.combo || 0}x</p>
            </div>

            <div className="p-6 bg-background/50 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2 text-purple">
                <Icon name="Target" size={24} />
                <span className="text-sm font-semibold">ТОЧНОСТЬ</span>
              </div>
              <p className="text-4xl font-bold">{result?.accuracy.toFixed(1) || 0}%</p>
            </div>

            <div className="p-6 bg-background/50 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
                <Icon name="BarChart3" size={24} />
                <span className="text-sm font-semibold">СТАТИСТИКА</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-green-400">Perfect: {result?.perfect || 0}</p>
                <p className="text-yellow-400">Good: {result?.good || 0}</p>
                <p className="text-red-400">Miss: {result?.miss || 0}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onPlayAgain}
              size="lg"
              className="flex-1 bg-vibrople hover:bg-vibrople/90 text-white font-bold text-lg py-6 rounded-xl"
            >
              <Icon name="RotateCcw" className="mr-2" size={24} />
              Играть снова
            </Button>
            <Button 
              onClick={onHome}
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-electric text-electric hover:bg-electric hover:text-background font-bold text-lg py-6 rounded-xl"
            >
              <Icon name="Home" className="mr-2" size={24} />
              На главную
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Results;
