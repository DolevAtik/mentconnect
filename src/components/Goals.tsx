import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Edit, Trash2, CheckCircle, Calendar, Flag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  progress_percentage: number;
  mentor_id: string;
  user_id: string;
  created_at: string;
  tasks?: Task[];
}

interface Task {
  id: string;
  goal_id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
  completed_at: string;
}

interface GoalsProps {
  userId: string;
  mentorId?: string;
  userType: 'mentor' | 'student';
}

const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const PRIORITY_LABELS = {
  low: 'נמוכה',
  medium: 'בינונית', 
  high: 'גבוהה'
};

export const Goals = ({ userId, mentorId, userType }: GoalsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  
  const [newGoal, setNewGoal] = useState<{
    title: string;
    description: string;
    category: string;
    target_date: string;
    priority: 'low' | 'medium' | 'high';
  }>({
    title: "",
    description: "",
    category: "",
    target_date: "",
    priority: "medium" as const
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: ""
  });

  useEffect(() => {
    fetchGoals();
  }, [userId, mentorId]);

  const fetchGoals = async () => {
    try {
      let query = supabase
        .from('goals')
        .select(`
          *,
          tasks (*)
        `);

      if (userType === 'mentor') {
        query = query.eq('mentor_id', userId);
      } else {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setGoals((data || []) as Goal[]);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את היעדים",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async () => {
    if (!newGoal.title || !mentorId) {
      toast({
        title: "שגיאה",
        description: "יש למלא את השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('goals')
        .insert({
          title: newGoal.title,
          description: newGoal.description,
          category: newGoal.category,
          target_date: newGoal.target_date || null,
          priority: newGoal.priority,
          mentor_id: mentorId,
          user_id: userType === 'mentor' ? userId : user?.id // If mentor, set user_id, if student, use current user
        });

      if (error) throw error;

      toast({
        title: "הצלחה",
        description: "יעד נוצר בהצלחה",
      });

      setNewGoal({
        title: "",
        description: "",
        category: "",
        target_date: "",
        priority: "medium"
      });
      setIsCreateDialogOpen(false);
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן ליצור יעד",
        variant: "destructive",
      });
    }
  };

  const updateGoalProgress = async (goalId: string, progress: number) => {
    try {
      const status = progress >= 100 ? 'completed' : 'active';
      
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress_percentage: progress,
          status: status
        })
        .eq('id', goalId);

      if (error) throw error;

      fetchGoals();
    } catch (error) {
      console.error('Error updating goal progress:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לעדכן התקדמות",
        variant: "destructive",
      });
    }
  };

  const addTask = async () => {
    if (!newTask.title || !selectedGoal) {
      toast({
        title: "שגיאה",
        description: "יש למלא את שם המשימה",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .insert({
          goal_id: selectedGoal.id,
          title: newTask.title,
          description: newTask.description,
          due_date: newTask.due_date || null,
          mentor_id: selectedGoal.mentor_id,
          user_id: selectedGoal.user_id
        });

      if (error) throw error;

      toast({
        title: "הצלחה",
        description: "משימה נוספה בהצלחה",
      });

      setNewTask({
        title: "",
        description: "",
        due_date: ""
      });
      setIsTaskDialogOpen(false);
      setSelectedGoal(null);
      fetchGoals();
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן להוסיף משימה",
        variant: "destructive",
      });
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : null
        })
        .eq('id', taskId);

      if (error) throw error;

      // עדכן התקדמות היעד
      const goal = goals.find(g => g.tasks?.some(t => t.id === taskId));
      if (goal && goal.tasks) {
        const totalTasks = goal.tasks.length;
        const completedTasks = goal.tasks.filter(t => 
          t.id === taskId ? completed : t.is_completed
        ).length;
        const progress = Math.round((completedTasks / totalTasks) * 100);
        
        await updateGoalProgress(goal.id, progress);
      }

      fetchGoals();
    } catch (error) {
      console.error('Error toggling task:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לעדכן משימה",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6" />
          <h2 className="text-2xl font-bold">
            {userType === 'mentor' ? 'יעדים למנטי' : 'היעדים שלי'}
          </h2>
        </div>
        
        {userType === 'mentor' && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                יעד חדש
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>צור יעד חדש</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="שם היעד"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="תיאור היעד"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                />
                <Input
                  placeholder="קטגוריה"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                />
                <Input
                  type="date"
                  placeholder="תאריך יעד"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target_date: e.target.value }))}
                />
                <Select 
                  value={newGoal.priority} 
                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                    setNewGoal(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="רמת עדיפות" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">נמוכה</SelectItem>
                    <SelectItem value="medium">בינונית</SelectItem>
                    <SelectItem value="high">גבוהה</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={createGoal} className="w-full">
                  צור יעד
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {goals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-4">
              {userType === 'mentor' ? 'לא נוצרו יעדים עדיין' : 'אין יעדים פעילים'}
            </p>
            {userType === 'mentor' && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                צור יעד ראשון
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {goal.title}
                      <Badge className={PRIORITY_COLORS[goal.priority]}>
                        <Flag className="w-3 h-3 mr-1" />
                        {PRIORITY_LABELS[goal.priority]}
                      </Badge>
                      <Badge variant={goal.status === 'completed' ? 'default' : 'secondary'}>
                        {goal.status === 'completed' ? 'הושלם' : 'פעיל'}
                      </Badge>
                    </CardTitle>
                    {goal.description && (
                      <p className="text-muted-foreground">{goal.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {goal.category && (
                        <span>קטגוריה: {goal.category}</span>
                      )}
                      {goal.target_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          יעד: {formatDate(goal.target_date)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {userType === 'mentor' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedGoal(goal);
                        setIsTaskDialogOpen(true);
                      }}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      הוסף משימה
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* התקדמות */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>התקדמות</span>
                    <span>{goal.progress_percentage}%</span>
                  </div>
                  <Progress value={goal.progress_percentage} className="h-2" />
                </div>

                {/* משימות */}
                {goal.tasks && goal.tasks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">משימות ({goal.tasks.length})</h4>
                    <div className="space-y-2">
                      {goal.tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className={`flex items-start gap-3 p-3 rounded-lg border ${
                            task.is_completed ? 'bg-green-50 border-green-200' : 'bg-background'
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTask(task.id, !task.is_completed)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className={`w-4 h-4 ${
                              task.is_completed ? 'text-green-600' : 'text-muted-foreground'
                            }`} />
                          </Button>
                          
                          <div className="flex-1">
                            <p className={`font-medium ${
                              task.is_completed ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            )}
                            {task.due_date && (
                              <p className="text-xs text-muted-foreground mt-1">
                                תאריך יעד: {formatDate(task.due_date)}
                              </p>
                            )}
                            {task.completed_at && (
                              <p className="text-xs text-green-600 mt-1">
                                הושלם: {formatDate(task.completed_at)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* דיאלוג הוספת משימה */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>הוסף משימה ל-{selectedGoal?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="שם המשימה"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="תיאור המשימה"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            />
            <Input
              type="date"
              placeholder="תאריך יעד"
              value={newTask.due_date}
              onChange={(e) => setNewTask(prev => ({ ...prev, due_date: e.target.value }))}
            />
            <Button onClick={addTask} className="w-full">
              הוסף משימה
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};