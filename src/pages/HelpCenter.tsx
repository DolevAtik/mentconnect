import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, FileText, Settings, Users } from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: MessageCircle,
      title: "תקשורת ומפגשים",
      description: "הכל על ניהול מפגשים ותקשורת עם מנטורים",
      articles: [
        "איך לקבוע מפגש עם מנטור?",
        "איך לבטל או לדחות מפגש?",
        "בעיות טכניות בשיחות וידאו",
        "איך לשלוח הודעות למנטור?"
      ]
    },
    {
      icon: Users,
      title: "פרופיל ומנטורים",
      description: "ניהול הפרופיל שלכם ומציאת מנטורים",
      articles: [
        "איך לערוך את הפרופיל שלי?",
        "איך למצוא מנטור מתאים?",
        "איך לדרג ולהעניק פידבק?",
        "הוספת כישורים ותחומי עניין"
      ]
    },
    {
      icon: FileText,
      title: "תשלומים וחיוב",
      description: "מידע על מחירים, תשלומים וחיובים",
      articles: [
        "איך מעדכנים פרטי תשלום?",
        "החזרים וביטולים",
        "הבנת החשבונית שלי",
        "מבצעים והנחות"
      ]
    },
    {
      icon: Settings,
      title: "הגדרות וביטחון",
      description: "הגדרות חשבון, פרטיות וביטחון",
      articles: [
        "איך לשנות סיסמה?",
        "הגדרות פרטיות",
        "הגדרות התראות",
        "מחיקת חשבון"
      ]
    }
  ];

  const popularArticles = [
    "איך לקבוע מפגש ראשון עם מנטור?",
    "מה לעשות אם המנטור לא מגיע למפגש?",
    "איך לשנות את התוכנית שלי?",
    "איך לקבל החזר כספי?",
    "בעיות כניסה לחשבון"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              מרכז העזרה
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              מצאו תשובות לשאלות שלכם או צרו קשר עם צוות התמיכה שלנו
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="חפשו במאמרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 py-4 text-lg bg-white text-foreground"
              />
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">מאמרים פופולריים</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  className="bg-white hover:bg-primary/5 border border-border rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  {article}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">קטגוריות עזרה</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <category.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <button className="text-right text-primary hover:underline text-sm">
                            {article}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">לא מצאתם את מה שחיפשתם?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              צוות התמיכה שלנו כאן כדי לעזור! צרו קשר ונחזור אליכם בהקדם האפשרי
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                צרו קשר עם התמיכה
              </button>
              <button className="bg-white text-primary border border-primary px-8 py-3 rounded-lg hover:bg-primary/5 transition-colors">
                שלחו הודעה בצ'אט
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;