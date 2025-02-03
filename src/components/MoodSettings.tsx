import { Card } from "@/components/ui/card";
import { Thermometer, Music2, Lightbulb } from "lucide-react";

interface MoodSettingsProps {
  mood: {
    temperature: number;
    music: string;
    lighting: string;
  };
}

export function MoodSettings({ mood }: MoodSettingsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Thermometer className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Temperature</p>
            <p className="text-2xl font-semibold">{mood.temperature}°C</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Music2 className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Music</p>
            <p className="text-2xl font-semibold">{mood.music}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Lighting</p>
            <p className="text-2xl font-semibold">{mood.lighting}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}