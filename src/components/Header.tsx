import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary"></div>
            <span className="text-xl font-bold text-foreground">HiConnect</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              מנטורים
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              תוכניות
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              איך זה עובד
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost">התחברות</Button>
            <Button variant="hero">הצטרפות כמנטור</Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};