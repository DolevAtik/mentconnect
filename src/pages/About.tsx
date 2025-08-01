import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Lightbulb, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "נתינה",
      description: "אנחנו מאמינים בכוחה של הקהילה לעזור זה לזה ולתמוך בצמיחה המקצועית של כולם"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "קהילה",
      description: "בונים רשת תומכת של אנשי מקצוע שרוצים להשפיע ולעזור לדור הבא"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "מטרתיות",
      description: "כל אחד יכול למצוא בדיוק את הליווי המקצועי שהוא צריך כדי להתקדם"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "חדשנות",
      description: "משתמשים בטכנולוגיה חדשנית כדי ליצור חיבורים משמעותיים ויעילים"
    }
  ];

  const stats = [
    {
      number: "2,500+",
      label: "מנטורים פעילים",
      description: "מנטורים מנוסים מתחומים שונים"
    },
    {
      number: "15,000+",
      label: "תלמידים",
      description: "אנשים שקיבלו ליווי מקצועי"
    },
    {
      number: "50+",
      label: "תחומי התמחות",
      description: "מפיתוח תוכנה ועד ניהול ושיווק"
    },
    {
      number: "98%",
      label: "שביעות רצון",
      description: "ממנטורים ותלמידים מרוצים"
    }
  ];

  const team = [
    {
      name: "שרה כהן",
      role: "מייסדת ומנכ\"לית",
      description: "בעלת ניסיון של 15 שנה בניהול וחדשנות טכנולוגית"
    },
    {
      name: "דני לוי",
      role: "מנהל טכנולוגיות",
      description: "מפתח Full Stack מנוסה עם התמחות בפלטפורמות חברתיות"
    },
    {
      name: "מיכל אברהם",
      role: "מנהלת קהילה",
      description: "מתמחה בבניית קהילות והתנדבות חברתית"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            אודותינו
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            אנחנו בונים את הקהילה המקצועית הגדולה והתומכת ביותר בישראל
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              המשימה שלנו
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  MentConnect נוסדה מתוך אמונה שכל אחד יכול לתרום מהידע והניסיון שלו כדי לעזור לאחרים לצמוח ולהתפתח. 
                  אנחנו יוצרים פלטפורמה חינמית שמחברת בין מנטורים מנוסים לאנשים שרוצים ללמוד ולהתקדם בקריירה שלהם.
                  <br /><br />
                  האמונה שלנו היא שידע שמשותף הוא ידע שמתכפל, ושכאשר אנחנו עוזרים לאחרים, כולנו מרוויחים.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            הערכים שלנו
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            המספרים שלנו
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            הצוות שלנו
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
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
            הצטרף אלינו
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            בואו יחד נבנה קהילה שמאמינה בכוח של שיתוף הידע והעזרה הדדית
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

export default About;