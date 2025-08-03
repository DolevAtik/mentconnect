import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logoNew from "@/assets/logo-new.png";
export const Hero = () => {
  return <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Mentors connecting with mentees" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-white animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl mb-4 tracking-tight text-blue-500 font-extrabold md:text-9xl">
              MentConnect
            </h1>
          </div>
          <div className="mb-4">
            <p className="text-xl text-white/90 tracking-wider font-bold md:text-4xl">Your Journey  . Their Wisdom . One Connection</p>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight whitespace-nowrap md:text-5xl">
            מצא את המנטור המושלם עבורך
          </h2>
          
          <p className="text-xl mb-8 text-white/90 leading-relaxed md:text-3xl">
            התחבר למנטורים מנוסים שיעזרו לך להתקדם בקריירה, ללמוד כישורים חדשים ולהגשים את החלומות המקצועיים שלך
          </p>
          
          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input type="text" placeholder="חפש לפי תחום, כישור או מילת מפתח..." className="w-full h-12 pr-12 pl-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50" />
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-xl font-medium">
              חיפוש מנטורים
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 text-white/90">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">מנטורים מנוסים</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">תחומי מומחיות</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm">חניכים מרוצים</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};