import { memo } from "react"; 
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";

interface SensorDisplayProps {
  temperature: number;
  humidity: number;
}

export const SensorDisplay = memo(function SensorDisplay({ 
  temperature, 
  humidity 
}: SensorDisplayProps) {
  console.log("SensorDisplay rendered with temperature:", temperature);
  return (
    <div className="flex-col sm:flex-row gap-6">
      <Card className="flex-1 p-6
  hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-4">
         <div className=" p-4 bg-orange-100 rounded-full">
           <Thermometer className="h-5 w-5 text-orange-500" />
           </div>
           <div>
              <p className="text-sm text-muted-foreground mb-1"> Current Temperature</p>
              <p className="text-3xl font-semibold">{temperature}°C</p>
            </div>
         </div>
        </Card>
       <Card className="flex-1 p-6
       hover:Shadow-lg transition-all duration-300 hover:translate-y-1">
         <div className="flex items-center gap-4">
           <div className="p-4 bg-blue-100 rounded-full">
            <Droplets className="h-5 w-5 text-blue-500" />
            </div>
           <div>
              <p className="text-sm text-muted-foreground mb-1"> Current Humidity</p>
              <p className="text-2xl font-semibold">{humidity}%</p>
            </div>
         </div>
        </Card>
      </div>
    );
  });