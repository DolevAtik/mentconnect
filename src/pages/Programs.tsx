import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, Award } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "תוכנית המנטור המתחיל",
      description: "תוכנית בסיסית לפיתוח כישורי מנטורינג",
      duration: "3 חודשים",
      sessions: "12 מפגשים",
      price: "₪2,400",
      features: [
        "הכשרה במתודולוגיות מנטורינג",
        "כלים לניהול שיחות יעוצה",
        "תעודת סיום מוכרת",
        "ליווי אישי במהלך התוכנית"
      ]
    },
    {
      title: "תוכנית המנטור המקצועי",
      description: "תוכנית מתקדמת למנטורים מנוסים",
      duration: "6 חודשים",
      sessions: "24 מפגשים",
      price: "₪4,800",
      features: [
        "טכניקות מנטורינג מתקדמות",
        "ניהול קריירה ויעוץ עסקי",
        "פיתוח תוכניות אישיות",
        "הכשרה בהדרכת קבוצות"
      ]
    },
    {
      title: "תוכנית המנטור הארגוני",
      description: "התמחות במנטורינג ארגוני ועסקי",
      duration: "4 חודשים",
      sessions: "16 מפגשים",
      price: "₪3,200",
      features: [
        "מנטורינג בסביבה ארגונית",
        "פיתוח מנהיגות",
        "ניהול שינויים ארגוניים",
        "כלים לאבחון ארגוני"
      ]
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
              תוכניות ההכשרה שלנו
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              תוכניות מקיפות להכשרת מנטורים מקצועיים ופיתוח כישורי ליווי
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{program.sessions}</span>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-primary">
                      {program.price}
                    </div>
                    
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full">הרשמה לתוכנית</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">למה לבחור בתוכניות שלנו?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Award className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">הכרה מקצועית</h3>
                <p className="text-muted-foreground">
                  תעודות מוכרות על ידי התאחדויות מקצועיות מובילות
                </p>
              </div>
              <div className="space-y-4">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">למידה קבוצתית</h3>
                <p className="text-muted-foreground">
                  קבוצות לימוד קטנות עם ליווי אישי מצוות מקצועי
                </p>
              </div>
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">הבטחת איכות</h3>
                <p className="text-muted-foreground">
                  רמת הוראה גבוהה עם שיטות הוראה מוכחות ומעודכנות
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;