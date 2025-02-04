import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Thermometer, Music2, Lightbulb } from "lucide-react";

interface MoodSettingsProps {
  mood: {
    temperature: number;
    music: string;
    lighting: string;
  };
}

export const MoodSettings = memo(function MoodSettings({ mood }: MoodSettingsProps) {
  console.log("MoodSettings rendered with temperature:", mood.temperature);
  
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-orange-100 rounded-full">
            <Thermometer className="h-8 w-8 text-orange-500" />
          </div>
          <div>

            <p className="text-sm text-muted-foreground mb-2">Temperature</p>
            <p className="text-3xl font-semibold">{mood.temperature}°C</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-purple-100 rounded-full">
            <Music2 className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Music</p>
            <p className="text-3xl font-semibold">{mood.music}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-yellow-100 rounded-full">
            <Lightbulb className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Lighting</p>
            <p className="text-3xl font-semibold">{mood.lighting}</p>
          </div>
        </div>
      </Card>
    </div>
  );
});