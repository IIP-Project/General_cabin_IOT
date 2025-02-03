import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";

interface SensorDisplayProps {
  temperature: number;
  humidity: number;
}

export function SensorDisplay({ temperature, humidity }: SensorDisplayProps) {
  return (
    <div className="flex gap-4 mb-8">
      <Card className="flex-1 p-4">
        <div className="flex items-center gap-3">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-sm text-muted-foreground">Temperature</p>
            <p className="text-2xl font-semibold">{temperature}°C</p>
          </div>
        </div>
      </Card>
      <Card className="flex-1 p-4">
        <div className="flex items-center gap-3">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-2xl font-semibold">{humidity}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}