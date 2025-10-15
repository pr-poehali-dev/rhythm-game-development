import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { GameResult } from '@/pages/Index';

interface GameScreenProps {
  level: number;
  onComplete: (result: GameResult) => void;
  onBack: () => void;
}

interface Note {
  id: number;
  lane: number;
  position: number;
  hit: boolean;
}

const GameScreen = ({ level, onComplete, onBack }: GameScreenProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [perfect, setPerfect] = useState(0);
  const [good, setGood] = useState(0);
  const [miss, setMiss] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const lanes = 4;
  const gameDuration = 30;

  const getBPM = () => {
    switch(level) {
      case 1: return 80;
      case 2: return 120;
      case 3: return 160;
      default: return 100;
    }
  };

  const generateNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now() + Math.random(),
      lane: Math.floor(Math.random() * lanes),
      position: 0,
      hit: false,
    };
    setNotes(prev => [...prev, newNote]);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const bpm = getBPM();
    const noteInterval = (60 / bpm) * 1000;
    
    const generateInterval = setInterval(() => {
      if (gameTime < gameDuration) {
        generateNote();
      }
    }, noteInterval);

    return () => clearInterval(generateInterval);
  }, [gameStarted, gameTime, gameDuration, generateNote]);

  useEffect(() => {
    if (!gameStarted) return;

    const moveInterval = setInterval(() => {
      setNotes(prev => {
        const updated = prev.map(note => ({
          ...note,
          position: note.position + 2,
        }));

        const missed = updated.filter(note => note.position > 95 && !note.hit);
        if (missed.length > 0) {
          setCombo(0);
          setMiss(m => m + missed.length);
        }

        return updated.filter(note => note.position <= 100);
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setGameTime(prev => {
        if (prev >= gameDuration) {
          endGame();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  const handleLaneClick = (lane: number) => {
    const hitNote = notes.find(
      note => note.lane === lane && !note.hit && note.position >= 75 && note.position <= 95
    );

    if (hitNote) {
      const accuracy = Math.abs(85 - hitNote.position);
      const isPerfect = accuracy <= 5;
      
      setNotes(prev => prev.map(n => 
        n.id === hitNote.id ? { ...n, hit: true } : n
      ));

      if (isPerfect) {
        setScore(s => s + 100);
        setPerfect(p => p + 1);
      } else {
        setScore(s => s + 50);
        setGood(g => g + 1);
      }
      
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setNotes([]);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setPerfect(0);
    setGood(0);
    setMiss(0);
    setGameTime(0);
  };

  const endGame = () => {
    setGameStarted(false);
    const totalNotes = perfect + good + miss || 1;
    const accuracy = ((perfect + good) / totalNotes) * 100;
    
    onComplete({
      score,
      combo: maxCombo,
      accuracy,
      perfect,
      good,
      miss,
    });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">Уровень {level}</h2>
            <p className="text-xl text-muted-foreground">Нажимай на дорожки когда ноты достигнут линии</p>
            <p className="text-lg text-electric mt-4">{getBPM()} BPM</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={onBack} variant="outline" size="lg" className="px-8">
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
            <Button onClick={startGame} size="lg" className="bg-vibrople hover:bg-vibrople/90 text-white px-12">
              <Icon name="Play" className="mr-2" />
              Начать
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <Icon name="X" size={20} />
        </Button>
        
        <div className="flex gap-8 text-lg font-bold">
          <div className="flex items-center gap-2">
            <Icon name="Award" className="text-vibrople" size={20} />
            <span>{score.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-electric" size={20} />
            <span>{combo}x</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" className="text-purple" size={20} />
            <span>{gameDuration - gameTime}s</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-2 relative">
        {Array.from({ length: lanes }).map((_, lane) => (
          <div
            key={lane}
            className="flex-1 relative bg-gradient-to-b from-background/50 to-background border-2 border-border rounded-lg overflow-hidden cursor-pointer active:bg-vibrople/20 transition-colors"
            onClick={() => handleLaneClick(lane)}
          >
            <div className="absolute bottom-[15%] left-0 right-0 h-1 bg-vibrople shadow-lg shadow-vibrople/50 z-10"></div>
            
            {notes
              .filter(note => note.lane === lane && !note.hit)
              .map(note => (
                <div
                  key={note.id}
                  className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-electric to-purple rounded-full shadow-lg shadow-electric/50 flex items-center justify-center text-2xl transition-opacity"
                  style={{
                    top: `${note.position}%`,
                  }}
                >
                  🎵
                </div>
              ))}
          </div>
        ))}
      </div>

      {combo >= 10 && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-bold text-vibrople animate-pulse-ring pointer-events-none">
          {combo}x COMBO!
        </div>
      )}
    </div>
  );
};

export default GameScreen;
