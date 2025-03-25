# documentation

---

## **Project Structure Overview**

The project is a Cabin Mood Control application that allows users to select different mood settings to adjust their cabin environment (temperature, music, lighting, etc.).

### **Main Components**

---

1. **Index.tsx** (Main Page)
    - Contains the primary application layout with header, sensor display, mood selection, and mood settings
    - Manages the application state and user interactions
    - Located at: src/pages/Index.tsx
2. **MoodCard.tsx**
    - Displays individual mood cards that users can select
    - Shows mood name, icon and description
    - Located at: src/components/MoodCard.tsx
3. **MoodSettings.tsx**
    - Displays the detailed settings for the currently selected mood
    - Shows temperature, music, lighting and scheduling information
    - Located at: src/components/MoodSettings.tsx
4. **SensorDisplay.tsx**
    - Shows the current temperature and humidity readings
    - Located at: src/components/SensorDisplay.tsx

### **Buttons in the Application**

---

1. **Mood Cards (Clickable/Button-like)**
    - Each mood card in the grid works like a button
    - Found in src/pages/Index.tsx within the grid display
    - Implementation in src/components/MoodCard.tsx with an onClick handler
2. **Create Custom Mood Button**
    - The "+ Create Custom Mood" card works as a button
    - Located in src/pages/Index.tsx around line 190
    - When clicked, it opens the mood creation form
3. **Custom Mood Form Buttons**
    - "Create Mood" button - Saves the new custom mood
    - "Cancel" button - Closes the custom mood creation form
    - Located in src/pages/Index.tsx around line 315
4. **Delete Mood Button**
    - Trash icon button that appears when hovering over custom moods
    - Located in src/pages/Index.tsx around line 182
    - Uses the Trash2 icon from lucide-react
5. **Schedule Setting Buttons**
    - "Save Schedule" button - Saves the schedule for a mood
    - "Cancel" button - Closes the schedule setting modal
    - Located in src/pages/Index.tsx around line 420

### **Form Elements**

---

1. **Custom Mood Creation Form**
    - Text inputs for mood name, description, and music
    - Sliders for temperature and brightness settings
    - Color selection for lighting
    - Time inputs for scheduling
    - Located in src/pages/Index.tsx starting around line 216
2. **Schedule Setting Modal**
    - Time inputs for start and end times
    - Located in src/pages/Index.tsx around line 388

### **State Management**

---

- The application uses React hooks (useState, useCallback, useMemo) for state management
- Main states include:
    - activeMood - Currently selected mood
    - customMoods - User-created custom moods (stored in localStorage)
    - isCreatingMood - Controls visibility of mood creation form
    - isEditingTime - Controls visibility of schedule setting modal

### **Key Features**

---

1. **Mood Selection**
    - Users can click on mood cards to select them
    - Selection triggers activation of that mood's settings
2. **Custom Mood Creation**
    - Users can create custom moods with personalized settings
    - Custom moods are saved to localStorage for persistence
3. **Scheduling**
    - Users can set start and end times for moods
    - Schedule information is displayed in the mood settings
4. **Real-time Feedback**
    - Toast notifications confirm user actions
    - Visual feedback through animations and transitions

### **Mood Presets Location**

---

The mood presets are defined in the main Index.tsx file. Let me explain how they work and how they're connected to the rest of the application:

The mood presets are defined as an array called defaultMoods in src/pages/Index.tsx (around lines 30-90). This array contains 5 preset moods:

1. Relaxing
2. Romantic
3. Cozy
4. Energizing
5. Sleep

Each mood preset is defined with the following structure:

```tsx
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
}

```

### **How Presets Are Connected**

The connection process works like this:

1. **Storage and Access**:
    - The default mood presets are stored in the defaultMoods array
    - Custom moods are stored in the customMoods state (which is persisted in localStorage)
    - Both are combined using useMemo into an allMoods array
2. **Rendering**:
    - The presets are rendered as MoodCard components in a grid
    - This happens in the JSX section of Index.tsx (around line 174)
    - Each mood is mapped to a MoodCard component with its properties
3. **Selection and Activation**:
    - When a user clicks on a mood card, the handleMoodSelect function is called
    - This function sets the activeMood state to the selected mood's name
    - If the mood doesn't have a schedule, it prompts the user to set one
4. **Displaying Settings**:
    - Once a mood is selected, its settings are displayed using the MoodSettings component
    - The selected mood is found using:
        
        ```tsx
        const selectedMood = useMemo(() =>
          allMoods.find(mood => mood.name === activeMood),
          [activeMood, allMoods]
        );
        
        ```
        
    - Then its settings are passed to the MoodSettings component:
        
        ```tsx
        <MoodSettings mood={selectedMood.settings} />
        
        ```
        
5. **Custom Moods**:
    - Users can create custom moods that work just like the presets
    - Custom moods are saved to localStorage and loaded on application start
    - They are combined with default moods for display and selection

This architecture allows the application to have both built-in preset moods and user-defined custom moods, with both types being treated equally in the interface.

The mood presets are defined in the main Index.tsx file. Let me explain how they work and how they're connected to the rest of the application:

###