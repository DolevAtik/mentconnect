import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Upload, User, Save, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";

interface Profile {
  first_name: string;
  last_name: string;
  display_name: string;
  bio: string;
  title: string;
  company: string;
  location: string;
  phone: string;
  website: string;
  linkedin_url: string;
  github_url: string;
  twitter_url: string;
  avatar_url: string;
  cover_image_url: string;
  user_type: string;
  years_experience: number;
  specializations: string[];
  languages: string[];
}

const ProfileEdit = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    display_name: "",
    bio: "",
    title: "",
    company: "",
    location: "",
    phone: "",
    website: "",
    linkedin_url: "",
    github_url: "",
    twitter_url: "",
    avatar_url: "",
    cover_image_url: "",
    user_type: "student",
    years_experience: 0,
    specializations: [],
    languages: []
  });
  
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          display_name: data.display_name || "",
          bio: data.bio || "",
          title: data.title || "",
          company: data.company || "",
          location: data.location || "",
          phone: data.phone || "",
          website: data.website || "",
          linkedin_url: data.linkedin_url || "",
          github_url: data.github_url || "",
          twitter_url: data.twitter_url || "",
          avatar_url: data.avatar_url || "",
          cover_image_url: data.cover_image_url || "",
          user_type: data.user_type || "student",
          years_experience: data.years_experience || 0,
          specializations: data.specializations || [],
          languages: data.languages || []
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return null;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "שגיאה בהעלאת תמונה",
        description: error.message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadAvatar(file);
      if (url) {
        setProfile(prev => ({...prev, avatar_url: url}));
        toast({
          title: "התמונה הועלתה בהצלחה!",
        });
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;

    if (!profile.first_name || !profile.last_name) {
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: "שם פרטי ושם משפחה הם שדות חובה",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "שגיאה",
          description: "שגיאה בשמירת הפרופיל",
        });
      } else {
        toast({
          title: "הפרופיל נשמר בהצלחה!",
          description: "הפרטים שלך עודכנו במערכת",
        });
        navigate(`/profile/${user.id}`);
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

  const addSpecialization = () => {
    if (newSpecialization.trim() && !profile.specializations.includes(newSpecialization.trim())) {
      setProfile(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== spec)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (lang: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }));
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-6 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">עריכת פרופיל</h1>
          <p className="text-muted-foreground">עדכן את הפרטים שלך כדי שאחרים יוכלו להכיר אותך טוב יותר</p>
        </div>

        <div className="grid gap-6">
          {/* תמונת פרופיל */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                תמונת פרופיל
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>
                    {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="avatar-file">העלאת תמונה</Label>
                  <div className="flex gap-2">
                    <Input
                      id="avatar-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="file:ml-2"
                    />
                    {uploading && <div className="text-sm text-muted-foreground">מעלה...</div>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar-url">או הזן קישור לתמונה</Label>
                    <Input
                      id="avatar-url"
                      placeholder="https://..."
                      value={profile.avatar_url}
                      onChange={(e) => setProfile(prev => ({...prev, avatar_url: e.target.value}))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* פרטים אישיים */}
          <Card>
            <CardHeader>
              <CardTitle>פרטים אישיים</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">שם פרטי</Label>
                  <Input
                    id="first-name"
                    value={profile.first_name}
                    onChange={(e) => setProfile(prev => ({...prev, first_name: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">שם משפחה</Label>
                  <Input
                    id="last-name"
                    value={profile.last_name}
                    onChange={(e) => setProfile(prev => ({...prev, last_name: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="display-name">שם לתצוגה</Label>
                <Input
                  id="display-name"
                  value={profile.display_name}
                  onChange={(e) => setProfile(prev => ({...prev, display_name: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-type">סוג משתמש</Label>
                <Select value={profile.user_type} onValueChange={(value) => setProfile(prev => ({...prev, user_type: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">מחפש מנטור</SelectItem>
                    <SelectItem value="mentor">מנטור</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">אודותיי</Label>
                <Textarea
                  id="bio"
                  placeholder="ספר על עצמך..."
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({...prev, bio: e.target.value}))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* פרטים מקצועיים */}
          <Card>
            <CardHeader>
              <CardTitle>פרטים מקצועיים</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">תפקיד</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => setProfile(prev => ({...prev, title: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">חברה</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile(prev => ({...prev, company: e.target.value}))}
                />
              </div>

              {profile.user_type === "mentor" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="years-experience">שנות ניסיון</Label>
                    <Input
                      id="years-experience"
                      type="number"
                      value={profile.years_experience}
                      onChange={(e) => setProfile(prev => ({...prev, years_experience: parseInt(e.target.value) || 0}))}
                    />
                  </div>

                  {/* התמחויות */}
                  <div className="space-y-2">
                    <Label>התמחויות</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="הוסף התמחות..."
                        value={newSpecialization}
                        onChange={(e) => setNewSpecialization(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                      />
                      <Button onClick={addSpecialization} variant="outline">הוסף</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSpecialization(spec)}>
                          {spec} <X className="w-3 h-3 mr-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* שפות */}
              <div className="space-y-2">
                <Label>שפות</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="הוסף שפה..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                  />
                  <Button onClick={addLanguage} variant="outline">הוסף</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeLanguage(lang)}>
                      {lang} <X className="w-3 h-3 mr-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* פרטי קשר */}
          <Card>
            <CardHeader>
              <CardTitle>פרטי קשר ורשתות חברתיות</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">מיקום</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({...prev, location: e.target.value}))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">אתר אישי</Label>
                <Input
                  id="website"
                  placeholder="https://..."
                  value={profile.website}
                  onChange={(e) => setProfile(prev => ({...prev, website: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={profile.linkedin_url}
                  onChange={(e) => setProfile(prev => ({...prev, linkedin_url: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/..."
                  value={profile.github_url}
                  onChange={(e) => setProfile(prev => ({...prev, github_url: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/..."
                  value={profile.twitter_url}
                  onChange={(e) => setProfile(prev => ({...prev, twitter_url: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* כפתורי פעולה */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={() => navigate(`/profile/${user?.id}`)}>
              ביטול
            </Button>
            <Button onClick={handleSave} disabled={loading} className="flex items-center gap-2">
              {loading ? "שומר..." : "שמור פרופיל"}
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;