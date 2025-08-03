import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, AlertTriangle, CheckCircle, Users } from "lucide-react";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "בדיקת מנטורים",
      description: "כל המנטורים שלנו עוברים בדיקה יסודית של רקע ואימות זהות לפני הצטרפותם לפלטפורמה."
    },
    {
      icon: Eye,
      title: "פיקוח ומעקב",
      description: "אנו מפקחים על כל המפגשים ומקפידים על קיום הנחיות הבטיחות שלנו."
    },
    {
      icon: Lock,
      title: "הגנת מידע",
      description: "כל המידע האישי שלכם מוגן בהצפנה מתקדמת ולא נחשף לגורמים חיצוניים."
    },
    {
      icon: Users,
      title: "קהילה בטוחה",
      description: "אנו מקפידים על יצירת סביבה בטוחה ותומכת לכל משתתפי הפלטפורמה."
    }
  ];

  const guidelines = [
    {
      title: "להיפגש במקומות ציבוריים",
      description: "מומלץ להיפגש תמיד במקומות ציבוריים, במיוחד במפגשים ראשונים."
    },
    {
      title: "לשמור על גבולות מקצועיים",
      description: "יש לשמור על יחסים מקצועיים ולא לחרוג למערכות יחסים אישיות."
    },
    {
      title: "לא לשתף מידע רגיש",
      description: "אל תשתפו מידע אישי רגיש כמו פרטי חשבון בנק או מסמכים אישיים."
    },
    {
      title: "לדווח על התנהגות חשודה",
      description: "דווחו מיד על כל התנהגות לא הולמת או חשודה לצוות התמיכה שלנו."
    }
  ];

  const reportingProcess = [
    {
      step: "1",
      title: "דיווח מיידי",
      description: "דווחו על הבעיה דרך מערכת הדיווח בפלטפורמה או בטלפון החירום שלנו."
    },
    {
      step: "2",
      title: "חקירה מקצועית",
      description: "צוות הבטיחות שלנו בוחן את הדיווח ומתחיל בחקירה מקצועית ויסודית."
    },
    {
      step: "3",
      title: "פעולות מיידיות",
      description: "במקרה של סיכון, אנו נוקטים בפעולות מיידיות כולל השעיית חשבונות."
    },
    {
      step: "4",
      title: "מעקב ותמיכה",
      description: "אנו מספקים תמיכה מלאה ומעקב לוודא שהבעיה נפתרה לחלוטין."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              בטיחות ואבטחה
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              הבטיחות שלכם היא העדיפות הראשונה שלנו. אנו מקפידים על יצירת סביבה בטוחה ומוגנת לכל המשתמשים
            </p>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">תכונות הבטיחות שלנו</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {safetyFeatures.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <feature.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">הנחיות בטיחות</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {guidelines.map((guideline, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <CardTitle className="text-lg">{guideline.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guideline.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reporting Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">תהליך דיווח</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {reportingProcess.map((step, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 text-red-800">מצב חירום?</h2>
            <p className="text-lg text-red-700 mb-8 max-w-2xl mx-auto">
              אם אתם במצב חירום או מרגישים באיום מיידי, אנא פנו למשטרה ב-100 או לשירותי החירום ב-101
            </p>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">קו חירום פלטפורמה</h3>
              <p className="text-2xl font-bold text-primary mb-2">03-1234567</p>
              <p className="text-sm text-muted-foreground">זמין 24/7 לדיווחים דחופים</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;