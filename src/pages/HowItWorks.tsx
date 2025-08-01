import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MessageSquare, Star, Gift, HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "הצטרף לקהילה",
      description: "הירשם בחינם והצטרף לקהילה התומכת של מנטורים ותלמידים"
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-primary" />,
      title: "מצא את המנטור המתאים",
      description: "חפש מנטורים לפי תחום התמחות, ניסיון ושפה"
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "קבל ליווי בחינם",
      description: "מנטורים בקהילה שלנו מתרימים מזמנהם לעזור לאחרים"
    },
    {
      icon: <Star className="w-12 h-12 text-primary" />,
      title: "התפתח והתקדם",
      description: "קבל הדרכה אישית והתפתח בקריירה או בתחום שלך"
    }
  ];

  const benefits = [
    {
      icon: <Gift className="w-8 h-8 text-secondary" />,
      title: "חינם לחלוטין",
      description: "כל השירותים בקהילה שלנו חינמיים"
    },
    {
      icon: <HandHeart className="w-8 h-8 text-secondary" />,
      title: "קהילה תומכת",
      description: "מנטורים מתנדבים מהתעשייה שרוצים לעזור"
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "רשת חברתית",
      description: "בנה קשרים וחברויות חדשות בתחום שלך"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            איך זה עובד?
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            MentConnect היא רשת חברתית חינמית שמחברת בין מנטורים מתנדבים לאנשים שרוצים להתפתח
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            4 צעדים פשוטים להתחיל
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <div className="text-4xl font-bold text-primary/20">{index + 1}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            למה MentConnect?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            מוכן להתחיל?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            הצטרף לקהילה הגדולה ביותר של מנטורים ותלמידים בישראל
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              הצטרף כתלמיד
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
              הצטרף כמנטור
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;