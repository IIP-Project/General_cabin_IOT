import { useState } from "react";
import { MoodCard } from "@/components/MoodCard";
import { SensorDisplay } from "@/components/SensorDisplay";
import { MoodSettings } from "@/components/MoodSettings";
import { Moon, Sun, Heart, Coffee, Zap } from "lucide-react";

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
    console.log(`Selected mood: ${moodName}`);
    // Here we'll add the logic to communicate with the Raspberry Pi
  };

  const selectedMood = moods.find(mood => mood.name === activeMood);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Cabin Mood Control</h1>
          <p className="text-muted-foreground text-lg">
            Customize your cabin environment to match your mood
          </p>
        </header>

        <div className="bg-secondary/20 rounded-lg p-6 mb-8">
          <SensorDisplay
            temperature={sensorData.temperature}
            humidity={sensorData.humidity}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
          <div className="mt-12 bg-secondary/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Current Mood Settings</h2>
            <MoodSettings mood={selectedMood.settings} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;