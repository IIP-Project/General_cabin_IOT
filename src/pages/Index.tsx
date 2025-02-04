import { useState } from "react";
import { MoodCard } from "@/components/MoodCard";
import { SensorDisplay } from "@/components/SensorDisplay";
import { MoodSettings } from "@/components/MoodSettings";
import { Moon, Sun, Heart, Coffee, Zap } from "lucide-react";
import { toast } from "sonner";

const moods = [
  {
    name: "Relaxing",
    icon: <Sun className="text-cabin-relaxing" />,
    description: "Calm and peaceful atmosphere",
    settings: {
      temperature: 22,
      music: "Ambient Nature Sounds",
      lighting: "Soft Blue",
    }
  },
  {
    name: "Romantic",
    icon: <Heart className="text-cabin-romantic" />,
    description: "Perfect for special moments",
    settings: {
      temperature: 23,
      music: "Smooth Jazz",
      lighting: "Warm Red",
    }
  },
  {
    name: "Cozy",
    icon: <Coffee className="text-cabin-cozy" />,
    description: "Warm and comfortable setting",
    settings: {
      temperature: 24,
      music: "Acoustic Guitar",
      lighting: "Warm Yellow",
    }
  },
  {
    name: "Energizing",
    icon: <Zap className="text-cabin-energizing" />,
    description: "Boost your energy levels",
    settings: {
      temperature: 21,
      music: "Upbeat Pop",
      lighting: "Bright White",
    }
  },
  {
    name: "Sleep",
    icon: <Moon className="text-cabin-sleep" />,
    description: "Optimal conditions for rest",
    settings: {
      temperature: 20,
      music: "White Noise",
      lighting: "Very Dim",
    }
  },
];

const Index = () => {
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [sensorData] = useState({
    temperature: 22.5,
    humidity: 45,
  });

  const handleMoodSelect = (moodName: string) => {
    setActiveMood(moodName);
    toast.success(`${moodName} mood activated`);
    console.log(`Selected mood: ${moodName}`);
    // Here we'll add the logic to communicate with the Raspberry Pi
  };

  const selectedMood = moods.find(mood => mood.name === activeMood);

  return (
    <div className="min-h-screen bg-gradient-to-b from- background to-secondary/20 ">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent 
          bg-gradient-to-r from-primary to-primary/60" > Cabin Mood Control
          </h1>
          <p className="text-muted-foreground text-lg">
            Customize your cabin environment to match your mood. Select a mood to automatically adjust temprature, music, and lighting.

          </p>
        </header>

        <div className="bg-secondary/30  backdrop-blur-sm rounded-xl p-8  shadow-lg mb-
        12 animate-fade-in ">
          <SensorDisplay
            temperature={sensorData.temperature}
            humidity={sensorData.humidity}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-fade-in">
          {moods.map((mood) => (
            <MoodCard
              key={mood.name}
              name={mood.name}
              icon={mood.icon}
              description={mood.description}
              isActive={activeMood === mood.name}
              onClick={() => handleMoodSelect(mood.name)}
            />
          ))}
        </div>

        {selectedMood && (
          <div className="mt-16 bg-secondary/30 backdrop-blur-sm rounded -xl p-
          8 shadow-lg animate-fade-in">
            <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to primary/60">Current Mood Settings</h2>
            <MoodSettings mood={selectedMood.settings} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;