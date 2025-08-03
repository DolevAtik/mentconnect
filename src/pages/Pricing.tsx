import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "בסיסי",
      price: "חינם",
      period: "",
      description: "לחקר הפלטפורמה וביצוע מפגשים בודדים",
      features: [
        "עד 3 מפגשים בחודש",
        "חיפוש מנטורים בסיסי",
        "צ'אט עם מנטורים",
        "פרופיל אישי",
        "גישה למשאבים בסיסיים"
      ],
      limitations: [
        "ללא גישה לאנליטיקות",
        "ללא שיחות וידאו מוקלטות",
        "תמיכה מוגבלת"
      ],
      isPopular: false
    },
    {
      name: "פרו",
      price: "₪99",
      period: "לחודש",
      description: "למחפשי מנטורינג רציני ומתמשך",
      features: [
        "מפגשים ללא הגבלה",
        "חיפוש מנטורים מתקדם",
        "שיחות וידאו מוקלטות",
        "אנליטיקות התקדמות",
        "יעדים ומשימות אישיות",
        "גישה למשאבים מלאה",
        "תמיכה 24/7"
      ],
      limitations: [],
      isPopular: true
    },
    {
      name: "ארגוני",
      price: "₪499",
      period: "לחודש",
      description: "לארגונים וחברות הרוצות להטמיע מנטורינג",
      features: [
        "עד 50 משתמשים",
        "לוח בקרה ארגוני",
        "דוחות ואנליטיקות מתקדמות",
        "הטמעה מותאמת אישית",
        "ניהול תוכניות מנטורינג",
        "אימון למנטורים",
        "תמיכה ייעודית"
      ],
      limitations: [],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              תמחור שקוף ונגיש
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              בחרו את התוכנית המתאימה לכם ותתחילו את המסע שלכם בעולם המנטורינג
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative h-full ${plan.isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        הכי פופולרי
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground text-lg">/{plan.period}</span>}
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.isPopular ? 'default' : 'outline'}
                    >
                      {plan.price === 'חינם' ? 'התחילו עכשיו' : 'בחרו בתוכנית'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">שאלות נפוצות על התמחור</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">האם יש תקופת ניסיון?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    כן, אנו מציעים תקופת ניסיון של 14 ימים לכל התוכניות הבתשלום, ללא כל התחייבות.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">האם ניתן לשדרג או להוריד דרגה?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    בהחלט! ניתן לשנות את התוכנית בכל עת, והשינויים ייכנסו לתוקף במחזור החיוב הבא.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">מה כלול במחיר?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    המחיר כולל את כל התכונות המפורטות בתוכנית, ללא עלויות נוספות או נסתרות.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;