import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../providers/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const Item = ({ value, icon: Icon, label }) => (
    <Button
      variant={theme === value ? "default" : "outline"}
      size="sm"
      onClick={() => setTheme(value)}
      className="gap-2"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );

  return (
    <div className="flex items-center gap-2">
      <Item value="light" icon={Sun} label="" />
      <Item value="dark" icon={Moon} label="" />
      <Item value="system" icon={Laptop} label="" />
    </div>
  );
}
