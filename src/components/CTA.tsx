import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            מוכן להתחיל את המסע שלך?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            הצטרף לאלפי אנשים שכבר מצאו את המנטור המושלם עבורם והתקדמו בקריירה
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
            >
              מצא מנטור עכשיו
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              הצטרף כמנטור
              <Users className="mr-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 text-white/80 text-sm">
            הרשמה חינם • ללא התחייבות • תמיכה 24/7
          </div>
        </div>
      </div>
    </section>
  );
};