import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              מדיניות פרטיות
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              אנחנו מחויבים להגנה על הפרטיות שלכם ולשקיפות מלאה לגבי האופן שבו אנו משתמשים במידע שלכם
            </p>
            <p className="text-sm text-white/80">עדכון אחרון: ינואר 2024</p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">1. מידע שאנו אוספים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">מידע אישי שאתם מספקים:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>שם מלא, כתובת אימייל ומספר טלפון</li>
                    <li>מידע מקצועי כגון תחום עיסוק, ניסיון ורקע חינוכי</li>
                    <li>תמונת פרופיל ותיאור אישי</li>
                    <li>העדפות ויעדים מקצועיים</li>
                  </ul>
                  
                  <h4 className="font-semibold mt-6">מידע שנאסף אוטומטית:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>כתובת IP ומידע על הדפדפן שלכם</li>
                    <li>פעילות באתר ודפים שביקרתם בהם</li>
                    <li>זמני שימוש ותדירות ביקורים</li>
                    <li>מידע על המכשיר שבו אתם משתמשים</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">2. איך אנו משתמשים במידע</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>לספק ולשפר את השירותים שלנו</li>
                    <li>לחבר בין מנטורים למחונכים מתאימים</li>
                    <li>לתקשר איתכם לגבי השירות ועדכונים</li>
                    <li>לבצע אנליזות ומחקרים לשיפור הפלטפורמה</li>
                    <li>למנוע הונאות ולהגן על אבטחת הפלטפורמה</li>
                    <li>לעמוד בחובות חוקיות ורגולטוריות</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">3. שיתוף מידע</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    אנחנו לא מוכרים, משכירים או משתפים את המידע האישי שלכם עם צדדים שלישיים, 
                    למעט במקרים הבאים:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>בהסכמתכם המפורשת</li>
                    <li>עם ספקי שירות שמסייעים לנו בהפעלת הפלטפורמה (תחת הסכמי סודיות)</li>
                    <li>במקרה של חובה חוקית או צו בית משפט</li>
                    <li>להגנה על הזכויות, הרכוש או הבטיחות שלנו או של המשתמשים</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">4. אבטחת מידע</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    אנו נוקטים באמצעי אבטחה מתקדמים כדי להגן על המידע שלכם:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>הצפנת SSL/TLS לכל העברות הנתונים</li>
                    <li>הצפנת מסדי נתונים ואחסון מאובטח</li>
                    <li>בקרת גישה מוגבלת למידע רגיש</li>
                    <li>עדכונים ואמצעי אבטחה שוטפים</li>
                    <li>ניטור מתמיד לגילוי פעילות חשודה</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">5. הזכויות שלכם</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    בהתאם לחוק הגנת הפרטיות, יש לכם זכויות הבאות:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>זכות עיון - לראות איזה מידע אנו מחזיקים עליכם</li>
                    <li>זכות תיקון - לתקן מידע שגוי או לא מעודכן</li>
                    <li>זכות מחיקה - לבקש מחיקת המידע שלכם</li>
                    <li>זכות הגבלה - להגביל את השימוש במידע שלכם</li>
                    <li>זכות ניידות - לקבל עותק של המידע שלכם</li>
                    <li>זכות התנגדות - להתנגד לעיבוד מסוים של המידע</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">6. עוגיות (Cookies)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש ולאסוף מידע אנליטי:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>עוגיות הכרחיות לתפקוד הבסיסי של האתר</li>
                    <li>עוגיות אנליטיות להבנת השימוש באתר</li>
                    <li>עוגיות פונקציונליות לשמירת העדפות</li>
                    <li>עוגיות שיווק לתוכן ופרסומות רלוונטיים</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    ניתן לנהל את הגדרות העוגיות דרך הדפדפן שלכם או דרך האתר שלנו.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">7. שינויים במדיניות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    אנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. שינויים מהותיים יקבלו הודעה מוקדמת 
                    באימייל או דרך האתר. המשך השימוש באתר לאחר השינויים מהווה הסכמה למדיניות המעודכנת.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">8. יצירת קשר</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    לשאלות או בקשות הקשורות למדיניות הפרטיות, ניתן לפנות אלינו:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>אימייל:</strong> privacy@mentconnect.co.il</li>
                    <li><strong>טלפון:</strong> 03-1234567</li>
                    <li><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב</li>
                  </ul>
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

export default Privacy;