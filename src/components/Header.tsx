
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const Header = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return <header dir="rtl" className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary to-secondary backdrop-blur h-16 md:h-24">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-between flex-1 px-2 md:px-6 py-2 my-0 mx-0">
          <button onClick={() => navigate("/")} className="hidden md:inline-flex transition-colors text-blue-950 mx-0 px-0 py-[13px] text-2xl font-extrabold bg-black/[0.12] rounded-xl">דף הבית  </button>
          
          <nav className="flex flex-wrap items-center gap-4 md:gap-12 ml-auto mr-2 md:mr-8">
            <button onClick={() => navigate("/mentors")} className="text-white/90 hover:text-white transition-colors px-4 py-2 text-lg font-bold">
              מנטורים
            </button>
            <button onClick={() => navigate("/how-it-works")} className="text-white/90 hover:text-white transition-colors px-4 py-2 text-lg font-semibold">
              איך זה עובד
            </button>
            <button onClick={() => navigate("/about")} className="text-white/90 hover:text-white transition-colors px-4 py-2 text-lg font-bold">
              אודותינו
            </button>
            <button onClick={() => navigate("/contact")} className="text-white/90 hover:text-white transition-colors px-4 py-2 text-lg font-bold">
              יצירת קשר
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={""} alt={user.email || ""} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border">
                  <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                    <User className="mr-2 h-4 w-4" />
                    הפרופיל שלי
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    התנתק
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Button variant="ghost" onClick={() => navigate("/auth")} className="bg-white/10 hover:bg-white/20 border border-white/30 shadow-md text-slate-950 text-2xl font-semibold">
                  התחברות
                </Button>
                <Button variant="outline" onClick={() => navigate("/auth")} className="bg-white text-primary hover:bg-white/90 border-white shadow-lg text-2xl font-medium">
                  הרשמה
                </Button>
              </>}
          </div>
          
            {/* Mobile menu removed – nav is visible on mobile */}
          
        </div>
        </div>
      </div>
    </header>;
};