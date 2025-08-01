import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "איך אני יכול להצטרף כמנטור?",
      answer: "ההצטרפות כמנטור פשוטה וחינמית! פשוט לחץ על 'הצטרפות כמנטור' בראש העמוד, מלא את הפרטים שלך ובחר את התחומים שבהם תרצה לעזור. לאחר רישום קצר, תוכל להתחיל לעזור לאחרים."
    },
    {
      question: "האם השירות באמת חינמי?",
      answer: "כן! MentConnect היא רשת חברתית חינמית לחלוטין. המנטורים שלנו מתנדבים מתוך רצון לעזור לאחרים ולהחזיר לקהילה. אין עלויות נסתרות או תשלומים."
    },
    {
      question: "איך אני מוצא מנטור מתאים?",
      answer: "השתמש במנוע החיפוש שלנו כדי לסנן מנטורים לפי תחום התמחות, מיקום, שפה וניסיון. תוכל גם לקרוא ביקורות של תלמידים אחרים ולבחור את המנטור שהכי מתאים לך."
    },
    {
      question: "כמה זמן לוקח למנטור לחזור אליי?",
      answer: "זמן התגובה משתנה בין מנטור למנטור, אבל רוב המנטורים שלנו חוזרים תוך 24-48 שעות. זמן התגובה הממוצע מופיע בפרופיל של כל מנטור."
    },
    {
      question: "באילו תחומים יש מנטורים?",
      answer: "יש לנו מנטורים במגוון רחב של תחומים: פיתוח תוכנה, עיצוב UX/UI, ניהול מוצר, שיווק דיגיטלי, יזמות, מכירות, משאבי אנוש ועוד הרבה תחומים."
    },
    {
      question: "איך הליווי מתקיים?",
      answer: "הליווי יכול להתקיים בדרכים שונות: שיחות טלפון, שיחות וידאו, הודעות טקסט, מיילים או אפילו פגישות פנים אל פנים (בהסכמה הדדית). כל מנטור וזוג בוחרים את הדרך הנוחה להם."
    },
    {
      question: "מה אם אני לא מרוצה מהמנטור?",
      answer: "אם המנטור לא מתאים לך, תמיד תוכל לחפש מנטור אחר. אנחנו ממליצים לנסות לתקשר עם המנטור על הציפיות שלך קודם, אבל אם זה לא עוזר - יש הרבה מנטורים אחרים לבחירה."
    },
    {
      question: "איך אני יכול לדרג ולהעריך מנטור?",
      answer: "לאחר תקופת הליווי, תוכל לכתוב ביקורת ולדרג את המנטור בפרופיל שלו. זה עוזר למנטורים להשתפר ועוזר לתלמידים עתידיים לבחור."
    },
    {
      question: "האם יש הגבלת זמן על הליווי?",
      answer: "אין הגבלת זמן קבועה. כל זוג מנטור-תלמיד קובע בעצמו את תקופת הליווי בהתאם לצרכים ולזמינות. זה יכול להיות מספר שבועות ועד כמה חודשים."
    },
    {
      question: "איך אני יוצר קשר עם מנטור?",
      answer: "לאחר שמצאת מנטור מתאים, פשוט לחץ על 'צור קשר' בפרופיל שלו. תוכל לשלוח הודעת היכרות ולתאם את הצעד הראשון."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            שאלות נפוצות
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            כל מה שרצית לדעת על MentConnect במקום אחד
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Accordion */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">השאלות הנפוצות ביותר</CardTitle>
              <CardDescription>
                לא מוצא את התשובה שאתה מחפש? צור איתנו קשר!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-right hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="mt-12">
            <CardContent className="text-center p-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">עדיין יש שאלות?</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                לא מצאת את התשובה שחיפשת? צוות התמיכה שלנו כאן כדי לעזור
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/contact")} size="lg">
                  צור קשר איתנו
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                  חזור לעמוד הראשי
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;