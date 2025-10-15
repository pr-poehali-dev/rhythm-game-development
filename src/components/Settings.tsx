import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const [volume, setVolume] = useState([80]);
  const [soundEffects, setSoundEffects] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-foreground">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад
          </Button>
          <h2 className="text-3xl font-bold">Настройки</h2>
          <div className="w-24"></div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Volume2" className="text-electric" size={24} />
                    <span className="text-lg font-semibold">Громкость музыки</span>
                  </div>
                  <span className="text-2xl font-bold text-electric">{volume[0]}%</span>
                </div>
                <Slider 
                  value={volume} 
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Icon name="Music" className="text-vibrople" size={24} />
                  <div>
                    <p className="text-lg font-semibold">Звуковые эффекты</p>
                    <p className="text-sm text-muted-foreground">Звуки при попадании по нотам</p>
                  </div>
                </div>
                <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Icon name="Smartphone" className="text-purple" size={24} />
                  <div>
                    <p className="text-lg font-semibold">Вибрация</p>
                    <p className="text-sm text-muted-foreground">Отклик при нажатии</p>
                  </div>
                </div>
                <Switch checked={vibration} onCheckedChange={setVibration} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">О игре</h3>
                <p className="text-sm text-muted-foreground">Rhythm Game v1.0</p>
              </div>
              <Icon name="Info" className="text-muted-foreground" size={24} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
