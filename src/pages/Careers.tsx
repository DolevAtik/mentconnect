import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Users, Heart, Zap } from "lucide-react";

const Careers = () => {
  const positions = [
    {
      title: "מפתח/ת Full Stack",
      department: "פיתוח",
      location: "תל אביב / עבודה מרחוק",
      type: "משרה מלאה",
      description: "אנחנו מחפשים מפתח/ת Full Stack מנוסה להצטרף לצוות הפיתוח שלנו ולבנות את הדור הבא של פלטפורמת המנטורינג.",
      requirements: [
        "ניסיון של 3+ שנים בפיתוח Full Stack",
        "ידע ב-React, Node.js, TypeScript",
        "ניסיון עם מסדי נתונים (PostgreSQL, MongoDB)",
        "ידע ב-AWS או Azure"
      ]
    },
    {
      title: "מנהל/ת מוצר",
      department: "מוצר",
      location: "תל אביב",
      type: "משרה מלאה",
      description: "מחפשים מנהל/ת מוצר שיוביל/תוביל את האסטרטגיה והפיתוח של תכונות חדשות בפלטפורמה.",
      requirements: [
        "ניסיון של 5+ שנים בניהול מוצר",
        "רקע טכנולוגי חזק",
        "ניסיון עם מתודולוגיות Agile",
        "כישורי אנליזה ומחקר משתמשים"
      ]
    },
    {
      title: "מנהל/ת שיווק דיגיטלי",
      department: "שיווק",
      location: "תל אביב / עבודה מרחוק",
      type: "משרה מלאה",
      description: "אנחנו מחפשים מנהל/ת שיווק דיגיטלי לחלק מהפרעדה שלנו ולהוביל קמפיינים יצירתיים ואפקטיביים.",
      requirements: [
        "ניסיון של 4+ שנים בשיווק דיגיטלי",
        "ידע ב-Google Ads, Facebook Ads, LinkedIn",
        "ניסיון עם מערכות CRM ואוטומציה",
        "כישורי כתיבה ויצירתיות"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "ביטוח רפואי מורחב",
      description: "ביטוח רפואי מלא לעובד ולמשפחה"
    },
    {
      icon: Zap,
      title: "הזדמנויות צמיחה",
      description: "תוכניות פיתוח מקצועי והכשרות"
    },
    {
      icon: Users,
      title: "צוות מדהים",
      description: "עבודה עם האנשים הטובים ביותר בתחום"
    },
    {
      icon: Clock,
      title: "גמישות בעבודה",
      description: "שעות עבודה גמישות ואפשרות לעבודה מרחוק"
    }
  ];

  const values = [
    {
      title: "חדשנות",
      description: "אנחנו תמיד מחפשים דרכים חדשות ויצירתיות לפתור בעיות"
    },
    {
      title: "שקיפות",
      description: "אנחנו מאמינים בתקשורת פתוחה וכנה בכל הרמות"
    },
    {
      title: "למידה מתמשכת",
      description: "אנחנו מעודדים פיתוח מקצועי ואישי מתמיד"
    },
    {
      title: "השפעה חיובית",
      description: "אנחנו רוצים לעשות שינוי חיובי בחיים של אנשים"
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
              הצטרפו לקבוצה שלנו
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              בואו תהיו חלק מהמהפכה במעין המנטורינג והקריירה. אנחנו מחפשים אנשים מוכשרים שרוצים ליצור השפעה אמיתית.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              צפו במשרות פתוחות
            </Button>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">הערכים שלנו</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">למה לעבוד איתנו?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">משרות פתוחות</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {positions.map((position, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {position.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {position.type}
                          </Badge>
                        </div>
                      </div>
                      <Button>הגישו מועמדות</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {position.description}
                    </CardDescription>
                    <div>
                      <h4 className="font-semibold mb-2">דרישות:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">תהליך הגיוס שלנו</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-lg font-semibold">הגשת מועמדות</h3>
                <p className="text-muted-foreground text-sm">
                  הגישו את המועמדות שלכם דרך האתר או שלחו קורות חיים למייל
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-lg font-semibold">ראיון ראשוני</h3>
                <p className="text-muted-foreground text-sm">
                  שיחת הכרות עם מנהל הגיוס כדי להכיר אתכם ולהבין את המוטיבציה
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="text-lg font-semibold">ראיונות מקצועיים</h3>
                <p className="text-muted-foreground text-sm">
                  מפגש עם הצוות הרלוונטי ואתגר מקצועי קצר
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">לא מצאתם משרה מתאימה?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              אנחנו תמיד מחפשים אנשים מוכשרים! שלחו לנו את קורות החיים שלכם ואנחנו ניצור קשר כשתהיה הזדמנות מתאימה.
            </p>
            <Button size="lg">שלחו קורות חיים</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;