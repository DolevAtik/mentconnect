import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, Clock, Target, Star, Users, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  totalSessions: number;
  completedTasks: number;
  activeGoals: number;
  averageRating: number;
  totalHours: number;
  mentees?: number; // רק למנטורים
  studyTime?: number; // רק ליוזרים
}

interface AnalyticsProps {
  userId: string;
  userType: 'mentor' | 'student';
}

export const Analytics = ({ userId, userType }: AnalyticsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    completedTasks: 0,
    activeGoals: 0,
    averageRating: 0,
    totalHours: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [userId, userType]);

  const fetchAnalytics = async () => {
    try {
      const analyticsData: AnalyticsData = {
        totalSessions: 0,
        completedTasks: 0,
        activeGoals: 0,
        averageRating: 0,
        totalHours: 0
      };

      if (userType === 'mentor') {
        // נתונים למנטור
        
        // סך כל הפגישות
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('duration_minutes, status')
          .eq('mentor_id', userId);

        if (sessionsError) throw sessionsError;

        const completedSessions = sessionsData?.filter(s => s.status === 'completed') || [];
        analyticsData.totalSessions = completedSessions.length;
        analyticsData.totalHours = Math.round(
          completedSessions.reduce((sum, session) => sum + (session.duration_minutes || 60), 0) / 60
        );

        // מספר מנטי
        const { data: menteesData, error: menteesError } = await supabase
          .from('sessions')
          .select('user_id')
          .eq('mentor_id', userId);

        if (menteesError) throw menteesError;

        const uniqueMentees = new Set(menteesData?.map(s => s.user_id) || []);
        analyticsData.mentees = uniqueMentees.size;

        // משימות שהושלמו על ידי המנטי
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('is_completed')
          .eq('mentor_id', userId)
          .eq('is_completed', true);

        if (tasksError) throw tasksError;

        analyticsData.completedTasks = tasksData?.length || 0;

        // יעדים פעילים
        const { data: goalsData, error: goalsError } = await supabase
          .from('goals')
          .select('status')
          .eq('mentor_id', userId)
          .eq('status', 'active');

        if (goalsError) throw goalsError;

        analyticsData.activeGoals = goalsData?.length || 0;

        // דירוג ממוצע מהמנטי
        const { data: ratingsData, error: ratingsError } = await supabase
          .from('session_feedback')
          .select('mentor_rating')
          .eq('mentor_id', userId)
          .not('mentor_rating', 'is', null);

        if (ratingsError) throw ratingsError;

        if (ratingsData && ratingsData.length > 0) {
          const totalRating = ratingsData.reduce((sum, rating) => sum + (rating.mentor_rating || 0), 0);
          analyticsData.averageRating = Number((totalRating / ratingsData.length).toFixed(1));
        }

      } else {
        // נתונים ליוזר/סטודנט
        
        // פגישות שהשתתף בהן
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('duration_minutes, status')
          .eq('user_id', userId);

        if (sessionsError) throw sessionsError;

        const completedSessions = sessionsData?.filter(s => s.status === 'completed') || [];
        analyticsData.totalSessions = completedSessions.length;
        analyticsData.studyTime = Math.round(
          completedSessions.reduce((sum, session) => sum + (session.duration_minutes || 60), 0) / 60
        );

        // משימות שהושלמו
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('is_completed')
          .eq('user_id', userId)
          .eq('is_completed', true);

        if (tasksError) throw tasksError;

        analyticsData.completedTasks = tasksData?.length || 0;

        // יעדים פעילים
        const { data: goalsData, error: goalsError } = await supabase
          .from('goals')
          .select('status')
          .eq('user_id', userId)
          .eq('status', 'active');

        if (goalsError) throw goalsError;

        analyticsData.activeGoals = goalsData?.length || 0;

        // דירוג שנתן למנטורים
        const { data: ratingsData, error: ratingsError } = await supabase
          .from('session_feedback')
          .select('user_rating')
          .eq('user_id', userId)
          .not('user_rating', 'is', null);

        if (ratingsError) throw ratingsError;

        if (ratingsData && ratingsData.length > 0) {
          const totalRating = ratingsData.reduce((sum, rating) => sum + (rating.user_rating || 0), 0);
          analyticsData.averageRating = Number((totalRating / ratingsData.length).toFixed(1));
        }
      }

      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את הנתונים הסטטיסטיים",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart className="w-6 h-6" />
        <h2 className="text-2xl font-bold">
          {userType === 'mentor' ? 'נתונים סטטיסטיים - מנטור' : 'נתונים סטטיסטיים - למידה'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* סך כל הפגישות */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {userType === 'mentor' ? 'פגישות שניתנו' : 'פגישות שהתקיימו'}
                </p>
                <p className="text-2xl font-bold">{analytics.totalSessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* שעות / זמן למידה */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {userType === 'mentor' ? 'שעות תרומה' : 'שעות למידה'}
                </p>
                <p className="text-2xl font-bold">{analytics.totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* משימות שהושלמו */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  משימות שהושלמו
                </p>
                <p className="text-2xl font-bold">{analytics.completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* יעדים פעילים */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  יעדים פעילים
                </p>
                <p className="text-2xl font-bold">{analytics.activeGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* מנטי (רק למנטורים) */}
        {userType === 'mentor' && analytics.mentees !== undefined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    מנטי
                  </p>
                  <p className="text-2xl font-bold">{analytics.mentees}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* דירוג ממוצע */}
        {analytics.averageRating > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    דירוג ממוצע
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{analytics.averageRating}</p>
                    <Badge variant="secondary" className="text-xs">
                      {Array.from({ length: Math.floor(analytics.averageRating) }).map((_, i) => '⭐').join('')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* נתון הישג */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            סיכום הישגים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            {userType === 'mentor' ? (
              <div>
                <p className="text-lg font-medium">
                  תרמת סך הכל <span className="text-primary font-bold">{analytics.totalHours} שעות</span> לעזרה למתחילים בתחום
                </p>
                <p className="text-muted-foreground">
                  עזרת ל-{analytics.mentees} מנטי להשיג {analytics.completedTasks} משימות
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium">
                  למדת בסך הכל <span className="text-primary font-bold">{analytics.studyTime} שעות</span> עם מנטורים
                </p>
                <p className="text-muted-foreground">
                  השלמת {analytics.completedTasks} משימות ויש לך {analytics.activeGoals} יעדים פעילים
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};