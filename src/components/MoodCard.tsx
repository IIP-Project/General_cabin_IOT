import { memo } from "react"; 
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const MoodCard = memo(function MoodCard ({
  name,
  icon,
  description,
  isActive,
  onClick
}: MoodCardProps ) {
  console.log(`MoodCard rendered: ${name}`);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in",
        isActive ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102 hover:-translate-y-1"
      )}
      onClick={onClick}
      >
        <div className=" absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity " />
        <div className=" relative flex flex-col items-center gap-4">
          <div className={cn(
            "text-4xl transition-transform duration-300 group-hover:scale-110",
            isActive && "scale-110"

          )}>
            {icon}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
});