import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut, User, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoNew from "@/assets/logo-new.png";
export const Header = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary to-secondary backdrop-blur h-24">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-between flex-1 px-[99px] py-[4px] my-[40px] mx-[80px]">
          <button onClick={() => navigate("/")} className="transition-colors text-blue-950 mx-0 px-0 py-[13px] text-2xl font-extrabold">
            דף הבית
          </button>
          
          <nav className="hidden md:flex items-center gap-12 ml-auto mr-8">
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
                <DropdownMenuContent align="end">
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
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
              <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center">
                  <button onClick={() => {
                    navigate("/");
                    setIsOpen(false);
                  }} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                    דף הבית
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <button onClick={() => {
                    navigate("/mentors");
                    setIsOpen(false);
                  }} className="text-right text-muted-foreground hover:text-foreground transition-colors py-2">
                    מנטורים
                  </button>
                  <button onClick={() => {
                    navigate("/how-it-works");
                    setIsOpen(false);
                  }} className="text-right text-muted-foreground hover:text-foreground transition-colors py-2">
                    איך זה עובד
                  </button>
                  <button onClick={() => {
                    navigate("/about");
                    setIsOpen(false);
                  }} className="text-right text-muted-foreground hover:text-foreground transition-colors py-2">
                    אודותינו
                  </button>
                  <button onClick={() => {
                    navigate("/contact");
                    setIsOpen(false);
                  }} className="text-right text-muted-foreground hover:text-foreground transition-colors py-2">
                    יצירת קשר
                  </button>
                  <button onClick={() => {
                    navigate("/faq");
                    setIsOpen(false);
                  }} className="text-right text-muted-foreground hover:text-foreground transition-colors py-2">
                    שאלות נפוצות
                  </button>
                </nav>
                
                <div className="border-t pt-6">
                  {user ? <div className="flex flex-col space-y-4">
                      <Button variant="ghost" onClick={() => {
                      navigate(`/profile/${user.id}`);
                      setIsOpen(false);
                    }} className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        הפרופיל שלי
                      </Button>
                      <Button variant="ghost" onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }} className="justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        התנתק
                      </Button>
                    </div> : <div className="flex flex-col space-y-4">
                      <Button variant="ghost" onClick={() => {
                      navigate("/auth");
                      setIsOpen(false);
                    }} className="w-full">
                        התחברות
                      </Button>
                      <Button variant="hero" onClick={() => {
                      navigate("/auth");
                      setIsOpen(false);
                    }} className="w-full">
                        הצטרפות כמנטור
                      </Button>
                    </div>}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
        </div>
      </div>
    </header>;
};