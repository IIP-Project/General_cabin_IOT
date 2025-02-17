import { useState, useCallback, useMemo } from "react";
import { MoodCard } from "@/components/MoodCard";
import { SensorDisplay } from "@/components/SensorDisplay";
import { MoodSettings } from "@/components/MoodSettings";
import { Moon, Sun, Coffee, Zap, Sparkles, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface CustomMood {
  name: string;
  icon: JSX.Element;
  description: string;
  settings: {
    temperature: number;
    music: string;
    lighting: string;
    brightness: number;
    startTime?: string;
    endTime?: string;
  }
}

const defaultMoods = [
  {
    name: "Relaxing",
    icon: <Sun className="text-cabin-relaxing" />,
    description: "Calm and peaceful atmosphere",
    settings: {
      temperature: 22,
      music: "Ambient Nature Sounds",
      lighting: "Soft Blue",
      brightness: 70,
      startTime: "",
      endTime: "",
    }
  },
  {
    name: "Romantic",
    icon: <Sparkles className="text-cabin-romantic" />,
    description: "Perfect for special moments",
    settings: {
      temperature: 23,
      music: "Smooth Jazz",
      lighting: "Warm Red",
      brightness: 80,
      startTime: "",
      endTime: "",
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
      brightness: 65,
      startTime: "",
      endTime: "",
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
      brightness: 100,
      startTime: "",
      endTime: "",
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
      brightness: 20,
      startTime: "",
      endTime: "",
    }
  },
];

const LIGHT_COLORS = [
  "Warm White",
  "Cool White",
  "Soft Blue",
  "Warm Red",
  "Warm Yellow",
  "Purple",
  "Green",
  "Orange"
];

const Index = () => {
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [sensorData] = useState({
    temperature: 22.5,
    humidity: 45,
  });
  const [customMoods, setCustomMoods] = useState<CustomMood[]>(() => {
    const savedMoods = localStorage.getItem('customMoods');
    return savedMoods ? JSON.parse(savedMoods).map((mood: CustomMood) => ({
      ...mood,
      icon: <Sparkles className="text-primary" />
    })) : [];
  });
  const [isCreatingMood, setIsCreatingMood] = useState(false);
  const [newMood, setNewMood] = useState({
    name: "",
    description: "",
    settings: {
      temperature: 22,
      music: "",
      lighting: LIGHT_COLORS[0],
      brightness: 70,
      startTime: "",
      endTime: "",
    }
  });
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editingMoodTime, setEditingMoodTime] = useState({
    startTime: "",
    endTime: ""
  });

  const allMoods = useMemo(() => [...defaultMoods, ...customMoods], [customMoods]);

  const handleMoodSelect = useCallback((moodName: string) => {
    const mood = allMoods.find(m => m.name === moodName);
    if (mood) {
      const currentMood = {...mood};
      if (!currentMood.settings.startTime && !currentMood.settings.endTime) {
        setActiveMood(moodName);
        setIsEditingTime(true);
      } else {
        setActiveMood(moodName);
        toast.success(`${moodName} mood activated`);
      }
    }
  }, [allMoods]);

  const selectedMood = useMemo(() => 
    allMoods.find(mood => mood.name === activeMood),
    [activeMood, allMoods]
  );

  const handleCreateMood = () => {
    if (!newMood.name || !newMood.description || !newMood.settings.music) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (newMood.settings.startTime && newMood.settings.endTime) {
      if (newMood.settings.startTime >= newMood.settings.endTime) {
        toast.error("End time must be after start time");
        return;
      }
    }

    const customMood: CustomMood = {
      ...newMood,
      icon: <Sparkles className="text-primary" />
    };

    const updatedMoods = [...customMoods, customMood];
    setCustomMoods(updatedMoods);
    localStorage.setItem('customMoods', JSON.stringify(updatedMoods.map(mood => ({
      ...mood,
      icon: null
    }))));
    
    setIsCreatingMood(false);
    setNewMood({
      name: "",
      description: "",
      settings: {
        temperature: 22,
        music: "",
        lighting: LIGHT_COLORS[0],
        brightness: 70,
        startTime: "",
        endTime: "",
      }
    });
    toast.success("Custom mood created and saved!");
  };

  const handleDeleteMood = (moodName: string) => {
    const updatedMoods = customMoods.filter(mood => mood.name !== moodName);
    setCustomMoods(updatedMoods);
    localStorage.setItem('customMoods', JSON.stringify(updatedMoods.map(mood => ({
      ...mood,
      icon: null
    }))));
    
    if (activeMood === moodName) {
      setActiveMood(null);
    }
    toast.success("Mood deleted successfully");
  };

  const getLightingPreviewColor = (color: string, brightness: number) => {
    const colors: Record<string, string> = {
      "Warm White": `rgba(255, 244, 229, ${brightness/100})`,
      "Cool White": `rgba(242, 249, 255, ${brightness/100})`,
      "Soft Blue": `rgba(173, 216, 230, ${brightness/100})`,
      "Warm Red": `rgba(255, 179, 179, ${brightness/100})`,
      "Warm Yellow": `rgba(255, 249, 196, ${brightness/100})`,
      "Purple": `rgba(216, 191, 216, ${brightness/100})`,
      "Green": `rgba(192, 255, 192, ${brightness/100})`,
      "Orange": `rgba(255, 228, 196, ${brightness/100})`
    };
    return colors[color] || colors["Warm White"];
  };

  const handleTimeUpdate = () => {
    if (activeMood) {
      if (editingMoodTime.startTime && editingMoodTime.endTime) {
        if (editingMoodTime.startTime >= editingMoodTime.endTime) {
          toast.error("End time must be after start time");
          return;
        }
      }

      const updatedMoods = customMoods.map(mood => {
        if (mood.name === activeMood) {
          return {
            ...mood,
            settings: {
              ...mood.settings,
              startTime: editingMoodTime.startTime,
              endTime: editingMoodTime.endTime
            }
          };
        }
        return mood;
      });
      
      setCustomMoods(updatedMoods);
      localStorage.setItem('customMoods', JSON.stringify(updatedMoods.map(mood => ({
        ...mood,
        icon: null
      }))));
      
      setIsEditingTime(false);
      setEditingMoodTime({ startTime: "", endTime: "" });
      toast.success("Schedule updated successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Cabin Mood Control
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your cabin environment with a single click. Select a mood to automatically adjust temperature, music, and lighting.
          </p>
        </header>

        <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-12 animate-fade-in">
          <SensorDisplay
            temperature={sensorData.temperature}
            humidity={sensorData.humidity}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-fade-in">
          {allMoods.map((mood) => (
            <div key={mood.name} className="relative group">
              <MoodCard
                name={mood.name}
                icon={mood.icon}
                description={mood.description}
                isActive={activeMood === mood.name}
                onClick={() => handleMoodSelect(mood.name)}
              />
              {customMoods.find(m => m.name === mood.name) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMood(mood.name);
                  }}
                  className="absolute top-2 right-2 p-2 bg-destructive/90 text-destructive-foreground 
                    rounded-full opacity-0 group-hover:opacity-100 transition-opacity 
                    hover:bg-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <Card
            className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in flex items-center justify-center
              bg-gradient-to-br from-secondary/50 to-background border-dashed border-2 border-primary/20 hover:border-primary/40"
            onClick={() => setIsCreatingMood(true)}
          >
            <div className="flex flex-col items-center gap-4">
              <Plus className="w-8 h-8 text-primary" />
              <p className="text-sm text-muted-foreground">Create Custom Mood</p>
            </div>
          </Card>
        </div>

        {isCreatingMood && (
          <Card className="p-6 animate-fade-in bg-card/50 backdrop-blur-sm shadow-xl border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Create Custom Mood
            </h2>
            <div className="space-y-6">
              <Input
                placeholder="Mood Name"
                value={newMood.name}
                onChange={(e) => setNewMood(prev => ({ ...prev, name: e.target.value }))}
                className="h-12 text-lg"
              />
              <Input
                placeholder="Description"
                value={newMood.description}
                onChange={(e) => setNewMood(prev => ({ ...prev, description: e.target.value }))}
                className="h-12 text-lg"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between items-center">
                  <span>Temperature</span>
                  <span className="text-primary font-semibold">{newMood.settings.temperature}°C</span>
                </label>
                <Slider
                  value={[newMood.settings.temperature]}
                  min={16}
                  max={30}
                  step={0.5}
                  onValueChange={(value) => setNewMood(prev => ({
                    ...prev,
                    settings: { ...prev.settings, temperature: value[0] }
                  }))}
                  className="py-4"
                />
              </div>

              <Input
                placeholder="Music (e.g., Ambient Nature Sounds, Jazz)"
                value={newMood.settings.music}
                onChange={(e) => setNewMood(prev => ({ 
                  ...prev, 
                  settings: { ...prev.settings, music: e.target.value }
                }))}
                className="h-12 text-lg"
              />

              <div className="space-y-4">
                <label className="text-sm font-medium">Lighting Color</label>
                <div className="grid grid-cols-4 gap-4">
                  {LIGHT_COLORS.map((color) => (
                    <div
                      key={color}
                      className={`p-6 rounded-lg cursor-pointer transition-all duration-300 
                        hover:scale-105 ${
                        newMood.settings.lighting === color 
                          ? 'ring-2 ring-primary shadow-lg scale-105' 
                          : 'hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: getLightingPreviewColor(color, newMood.settings.brightness),
                      }}
                      onClick={() => setNewMood(prev => ({
                        ...prev,
                        settings: { ...prev.settings, lighting: color }
                      }))}
                    >
                      <span className="text-xs font-medium bg-background/80 px-2 py-1 rounded-full">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between items-center">
                  <span>Brightness</span>
                  <span className="text-primary font-semibold">{newMood.settings.brightness}%</span>
                </label>
                <Slider
                  value={[newMood.settings.brightness]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setNewMood(prev => ({
                    ...prev,
                    settings: { ...prev.settings, brightness: value[0] }
                  }))}
                  className="py-4"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Start Time (Optional)</label>
                  <Input
                    type="time"
                    value={newMood.settings.startTime}
                    onChange={(e) => setNewMood(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, startTime: e.target.value }
                    }))}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium block">End Time (Optional)</label>
                  <Input
                    type="time"
                    value={newMood.settings.endTime}
                    onChange={(e) => setNewMood(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, endTime: e.target.value }
                    }))}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg 
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] 
                    active:scale-[0.98] font-medium"
                  onClick={handleCreateMood}
                >
                  Create Mood
                </button>
                <button
                  className="flex-1 h-12 bg-gradient-to-r from-secondary/80 to-secondary border border-border
                    text-foreground rounded-lg shadow hover:shadow-md transition-all duration-300 
                    hover:scale-[1.02] active:scale-[0.98] font-medium"
                  onClick={() => setIsCreatingMood(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}

        {selectedMood && (
          <div className="mt-16 bg-secondary/30 backdrop-blur-sm rounded-xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Current Mood Settings
            </h2>
            <MoodSettings mood={selectedMood.settings} />
          </div>
        )}

        {isEditingTime && (
          <Card className="fixed inset-0 m-auto w-96 h-fit p-6 z-50 animate-fade-in bg-card/95 backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Set Schedule</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium block">Start Time</label>
                <Input
                  type="time"
                  value={editingMoodTime.startTime}
                  onChange={(e) => setEditingMoodTime(prev => ({ 
                    ...prev, 
                    startTime: e.target.value 
                  }))}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium block">End Time</label>
                <Input
                  type="time"
                  value={editingMoodTime.endTime}
                  onChange={(e) => setEditingMoodTime(prev => ({ 
                    ...prev, 
                    endTime: e.target.value 
                  }))}
                  className="h-12"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg 
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] 
                    active:scale-[0.98] font-medium"
                  onClick={handleTimeUpdate}
                >
                  Save Schedule
                </button>
                <button
                  className="flex-1 h-12 bg-gradient-to-r from-secondary/80 to-secondary border border-border
                    text-foreground rounded-lg shadow hover:shadow-md transition-all duration-300 
                    hover:scale-[1.02] active:scale-[0.98] font-medium"
                  onClick={() => {
                    setIsEditingTime(false);
                    setEditingMoodTime({ startTime: "", endTime: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
