import { Users, Shield, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "מנטורים מאומתים",
    description: "כל המנטורים שלנו עברו תהליך אימות קפדני והם בעלי ניסיון מוכח בתחומם"
  },
  {
    icon: Shield,
    title: "פלטפורמה בטוחה",
    description: "תשלומים מאובטחים, הגנת פרטיות מלאה וחוות דעת אמיתיות ממשתמשים אחרים"
  },
  {
    icon: Clock,
    title: "זמינות גמישה",
    description: "מצא מנטור שמתאים לזמנים שלך - גם בערבים, סופי שבוע או במהלך היום"
  },
  {
    icon: Star,
    title: "התאמה מושלמת",
    description: "האלגוריתם שלנו מוצא עבורך את המנטור שהכי מתאים לצרכים והמטרות שלך"
  }
];

export const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            למה לבחור ב-HiConnect?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            אנחנו מספקים חוויית מנטורשיפ מקצועית, בטוחה ומותאמת אישית
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/20 hover:shadow-medium transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};