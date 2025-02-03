import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export function MoodCard({ name, icon, description, isActive, onClick }: MoodCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-6 transition-all hover:shadow-lg cursor-pointer animate-fade-in",
        isActive ? "ring-2 ring-primary" : "hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={cn(
          "text-4xl transition-transform group-hover:scale-110",
          isActive && "scale-110"
        )}>
          {icon}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}