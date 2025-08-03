import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              תנאי שימוש
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              תנאי השימוש באתר ובשירותי MentConnect - אנא קראו בעיון לפני השימוש בפלטפורמה
            </p>
            <p className="text-sm text-white/80">עדכון אחרון: ינואר 2024</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">1. הגדרות כלליות</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    מסמך זה מגדיר את תנאי השימוש באתר MentConnect ובשירותיו. השימוש באתר מהווה 
                    הסכמה מלאה לתנאים אלה. אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באתר.
                  </p>
                  <h4 className="font-semibold">הגדרות:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>"החברה"</strong> - MentConnect בע"מ ומפעילי האתר</li>
                    <li><strong>"הפלטפורמה"</strong> - האתר והאפליקציה של MentConnect</li>
                    <li><strong>"משתמש"</strong> - כל אדם המשתמש בשירותי האתר</li>
                    <li><strong>"מנטור"</strong> - מחנך מקצועי הרשום בפלטפורמה</li>
                    <li><strong>"מחונך"</strong> - מקבל ייעוץ ומנטורינג</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">2. רישום וחשבון משתמש</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>על המשתמשים להיות בני 18 לפחות או לקבל הסכמת הורים</li>
                    <li>יש לספק מידע אמיתי, מדויק ומעודכן בעת הרישום</li>
                    <li>אתם אחראים לשמירה על סודיות פרטי הגישה לחשבון</li>
                    <li>אסור לשתף חשבון עם אחרים או ליצור חשבונות מרובים</li>
                    <li>החברה שומרת לעצמה הזכות לבטל חשבונות המפרים את התנאים</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">3. השירותים הניתנים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">שירותי הפלטפורמה כוללים:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>פלטפורמה לחיבור בין מנטורים למחונכים</li>
                    <li>כלים לתיאום פגישות וניהול לוח זמנים</li>
                    <li>מערכת תקשורת ומעקב התקדמות</li>
                    <li>משאבים חינוכיים ותוכני הכשרה</li>
                    <li>מערכת דירוגים וביקורות</li>
                  </ul>
                  <p className="text-muted-foreground">
                    <strong>חשוב:</strong> השירותים ניתנים "כפי שהם" ואיננו מתחייבים לזמינות 100% או לתוצאות ספציפיות.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">4. התנהגות והתחייבויות משתמשים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">מותר:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>להשתמש בפלטפורמה למטרות מקצועיות וחינוכיות</li>
                    <li>לשתף תוכן רלוונטי ובונה</li>
                    <li>לתת ולקבל פידבק בונה ומכבד</li>
                    <li>לדווח על בעיות או התנהגות לא הולמת</li>
                  </ul>
                  
                  <h4 className="font-semibold">אסור:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>להעלות תוכן פוגעני, מעליב או לא חוקי</li>
                    <li>להטריד, לאיים או להפלות משתמשים אחרים</li>
                    <li>לשתף מידע אישי של אחרים ללא הסכמה</li>
                    <li>לנסות לפרוץ או לפגוע במערכות הפלטפורמה</li>
                    <li>להשתמש בפלטפורמה למטרות מסחריות ללא אישור</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">5. תשלומים וביטולים</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>התשלומים יחויבו בהתאם לתוכנית שנבחרה</li>
                    <li>ניתן לבטל מנוי בכל עת דרך הגדרות החשבון</li>
                    <li>החזרים יינתנו בהתאם למדיניות ההחזרים שלנו</li>
                    <li>שינויים במחירים יובאו לידיעתכם מראש</li>
                    <li>אי תשלום עלול להוביל להשעיית החשבון</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">6. קניין רוחני</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    כל התוכן, העיצוב, הקוד והטכנולוגיה של הפלטפורמה שייכים לחברה ומוגנים בזכויות יוצרים.
                  </p>
                  <h4 className="font-semibold">תוכן שאתם מעלים:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>אתם שומרים על הבעלות על התוכן שלכם</li>
                    <li>אתם מעניקים לנו רישיון להשתמש בתוכן להפעלת השירות</li>
                    <li>אתם מתחייבים שהתוכן לא מפר זכויות של אחרים</li>
                    <li>אנו רשאים להסיר תוכן שמפר את התנאים</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">7. אחריות וביטוח</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    <strong>הגבלת אחריות:</strong> השירותים ניתנים "כפי שהם" ואיננו מתחייבים לתוצאות ספציפיות. 
                    אחריותנו מוגבלת לסכום ששילמתם עבור השירות.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>איננו אחראים לתוכן שמשתמשים מפרסמים</li>
                    <li>איננו אחראים לאיכות שירותי המנטורים</li>
                    <li>איננו אחראים לנזקים שנגרמו מהשימוש בפלטפורמה</li>
                    <li>המשתמשים אחראים לפעולותיהם בפלטפורמה</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">8. הפרת תנאים וסיום שירות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    אנו רשאים להשעות או לסיים את השירות במקרים הבאים:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>הפרה של תנאי השימוש</li>
                    <li>פעילות חשודה או לא חוקית</li>
                    <li>אי תשלום עבור שירותים בתשלום</li>
                    <li>פגיעה באבטחת הפלטפורמה</li>
                    <li>התנהגות הפוגעת במשתמשים אחרים</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">9. שינויים בתנאים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    אנו רשאים לעדכן את תנאי השימוש מעת לעת. שינויים מהותיים יובאו לידיעתכם מראש 
                    באימייל או דרך הפלטפורמה. המשך השימוש בשירות לאחר השינויים מהווה הסכמה לתנאים החדשים.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">10. יצירת קשר ופתרון סכסוכים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    לשאלות, תלונות או סכסוכים:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>אימייל:</strong> legal@mentconnect.co.il</li>
                    <li><strong>טלפון:</strong> 03-1234567</li>
                    <li><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    סכסוכים ייפתרו בהתאם לחוקי מדינת ישראל ובבתי המשפט המוסמכים בתל אביב.
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

export default Terms;