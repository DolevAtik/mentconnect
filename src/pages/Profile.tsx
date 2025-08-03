import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Clock, DollarSign, Globe, Linkedin, Github, Twitter, Edit, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  title: string | null;
  company: string | null;
  years_experience: number | null;
  hourly_rate: number | null;
  specializations: string[] | null;
  languages: string[] | null;
  user_type: string | null;
  is_verified: boolean;
  is_available: boolean;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_profile: {
    display_name: string;
    avatar_url: string;
  };
}

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  const isOwnProfile = user?.id === userId;

  useEffect(() => {
    if (!userId) return;
    fetchProfile();
    fetchReviews();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: "לא ניתן לטעון את הפרופיל",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          reviewer_profile:profiles!reviews_reviewer_id_fkey(display_name, avatar_url)
        `)
        .eq("mentor_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
      
      if (data && data.length > 0) {
        const avg = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">טוען פרופיל...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">פרופיל לא נמצא</h1>
          <p className="text-muted-foreground mb-4">הפרופיל שאתה מחפש לא קיים</p>
          <Button onClick={() => navigate("/")}>חזור לדף הבית</Button>
        </div>
      </div>
    );
  }

  const fullName = profile.display_name || `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Cover Image */}
      <div className="h-64 bg-gradient-hero relative mt-16">
        {profile.cover_image_url && (
          <img 
            src={profile.cover_image_url} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-large">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white shadow-medium">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{fullName}</h1>
                    {profile.is_verified && (
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        מאומת
                      </Badge>
                    )}
                  </div>
                  
                  {profile.title && (
                    <p className="text-lg text-muted-foreground mb-2">{profile.title}</p>
                  )}
                  
                  {profile.company && (
                    <p className="text-sm text-muted-foreground mb-4">{profile.company}</p>
                  )}

                  {profile.user_type === 'mentor' && reviews.length > 0 && (
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({reviews.length} ביקורות)</span>
                    </div>
                  )}

                  <div className="flex gap-2 justify-center mb-6">
                    {isOwnProfile ? (
                      <Button onClick={() => navigate("/profile/edit")} className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        עריכת פרופיל
                      </Button>
                    ) : (
                      <Button className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        צור קשר
                      </Button>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-3 text-right">
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                    
                    {profile.years_experience && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{profile.years_experience} שנות ניסיון</span>
                      </div>
                    )}
                    
                    {profile.hourly_rate && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">₪{profile.hourly_rate} לשעה</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center mt-6 pt-6 border-t">
                    {profile.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {profile.linkedin_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {profile.github_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {profile.twitter_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">אודות</TabsTrigger>
                <TabsTrigger value="reviews">ביקורות</TabsTrigger>
                <TabsTrigger value="services">שירותים</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>אודות</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profile.bio && (
                      <div>
                        <h3 className="font-semibold mb-2">קצת עליי</h3>
                        <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                      </div>
                    )}
                    
                    {profile.specializations && profile.specializations.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">התמחויות</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {profile.languages && profile.languages.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">שפות</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ביקורות ({reviews.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reviews.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        עדיין אין ביקורות
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={review.reviewer_profile.avatar_url || undefined} />
                                <AvatarFallback>
                                  {review.reviewer_profile.display_name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold">
                                    {review.reviewer_profile.display_name}
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(review.created_at).toLocaleDateString('he-IL')}
                                  </span>
                                </div>
                                <p className="text-muted-foreground">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>שירותים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      שירותים יתווספו בקרוב
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;