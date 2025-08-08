import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, UserCheck, Star } from "lucide-react";

const CompleteProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    user_type: "student" as "student" | "mentor",
    bio: "",
    title: "",
    company: "",
    location: "",
    phone: ""
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      // אוטומטית מילוי שם מגוגל אם קיים
      const metadata = user.user_metadata;
      setFormData(prev => ({
        ...prev,
        first_name: metadata?.first_name || metadata?.given_name || "",
        last_name: metadata?.last_name || metadata?.family_name || "",
        display_name: metadata?.full_name || metadata?.name || ""
      }));

      // בדיקה אם כבר קיים פרופיל
      checkExistingProfile();
    }
  }, [user, authLoading, navigate]);

  const checkExistingProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data && data.first_name && data.last_name) {
        // אם כבר קיים פרופיל מושלם, הפנה לדף הבית
        navigate("/");
      }
    } catch (error) {
      // אם אין פרופיל, זה בסדר - נמשיך עם ההשלמה
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    if (!formData.first_name || !formData.last_name || !formData.user_type) {
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: "אנא מלא את כל השדות הנדרשים",
      });
      return;
    }

    setLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        display_name: formData.display_name || `${formData.first_name} ${formData.last_name}`,
        user_type: formData.user_type,
        bio: formData.bio,
        title: formData.title,
        company: formData.company,
        location: formData.location,
        phone: formData.phone,
        avatar_url: user.user_metadata?.avatar_url || "",
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) {
        toast({
          variant: "destructive",
          title: "שגיאה",
          description: "שגיאה בשמירת הפרופיל",
        });
      } else {
        toast({
          title: "הפרופיל הושלם בהצלחה!",
          description: "ברוך הבא ל-MentConnect",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: "אירעה שגיאה לא צפויה",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center text-white">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex items-center justify-center p-4 pt-28">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm"></div>
            <span className="text-2xl font-bold text-white">MentConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">השלמת פרטי הפרופיל</h1>
          <p className="text-white/80">כמה פרטים נוספים כדי להתאים אותך למנטורים המתאימים ביותר</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-large border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <UserCheck className="w-6 h-6" />
              בואו נכיר אותך טוב יותר
            </CardTitle>
            <CardDescription className="text-center">
              הפרטים הבאים יעזרו לנו להתאים אותך למנטורים הטובים ביותר עבורך
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* פרטים אישיים */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">פרטים אישיים</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">שם פרטי *</Label>
                  <Input
                    id="first-name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({...prev, first_name: e.target.value}))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">שם משפחה *</Label>
                  <Input
                    id="last-name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({...prev, last_name: e.target.value}))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="display-name">שם לתצוגה</Label>
                <Input
                  id="display-name"
                  placeholder="איך אתה רוצה שיקראו לך?"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({...prev, display_name: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-type">אני רוצה להצטרף כ... *</Label>
                <Select value={formData.user_type} onValueChange={(value: "student" | "mentor") => setFormData(prev => ({...prev, user_type: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">מחפש מנטור - אני רוצה להתפתח ולקבל הכוונה</SelectItem>
                    <SelectItem value="mentor">מנטור - אני רוצה לעזור לאחרים ולחלוק ניסיון</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* פרטים מקצועיים */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">פרטים מקצועיים</h3>
              <div className="space-y-2">
                <Label htmlFor="title">תפקיד נוכחי</Label>
                <Input
                  id="title"
                  placeholder="מה התפקיד שלך?"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">חברה/ארגון</Label>
                <Input
                  id="company"
                  placeholder="איפה אתה עובד?"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">ספר על עצמך</Label>
                <Textarea
                  id="bio"
                  placeholder={formData.user_type === "mentor" 
                    ? "ספר על הניסיון שלך ואיך אתה יכול לעזור לאחרים..." 
                    : "ספר על עצמך ומה אתה מחפש להשיג..."
                  }
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                  rows={3}
                />
              </div>
            </div>

            {/* פרטי קשר */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">פרטי קשר</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">מיקום</Label>
                  <Input
                    id="location"
                    placeholder="איפה אתה נמצא?"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <Input
                    id="phone"
                    placeholder="05X-XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
              </div>
            </div>

              {formData.user_type === "mentor" && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h4 className="font-semibold text-yellow-800">הצטרפת כמנטור!</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  תוכל להוסיף פרטים נוספים כמו התמחויות ושנות ניסיון בעריכת הפרופיל לאחר ההרשמה. כל השירותים באתר בחינם!
                </p>
              </div>
            )}

            <Button 
              onClick={handleComplete} 
              disabled={loading}
              className="w-full" 
              size="lg"
            >
              {loading ? "שומר..." : "השלם הרשמה"}
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              * שדות חובה | תוכל לערוך את הפרטים בכל עת דרך הפרופיל שלך
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default CompleteProfile;