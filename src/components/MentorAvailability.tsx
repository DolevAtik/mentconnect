import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface MentorAvailabilityProps {
  mentorId: string;
  isOwner?: boolean; // האם זה המנטור עצמו או מישהו שמסתכל על הזמינות
}

const DAYS_OF_WEEK = [
  { value: 0, label: "ראשון" },
  { value: 1, label: "שני" },
  { value: 2, label: "שלישי" },
  { value: 3, label: "רביעי" },
  { value: 4, label: "חמישי" },
  { value: 5, label: "שישי" },
  { value: 6, label: "שבת" }
];

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

export const MentorAvailability = ({ mentorId, isOwner = false }: MentorAvailabilityProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day_of_week: "",
    start_time: "",
    end_time: ""
  });

  useEffect(() => {
    fetchAvailability();
  }, [mentorId]);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('mentor_availability')
        .select('*')
        .eq('mentor_id', mentorId)
        .eq('is_available', true)
        .order('day_of_week')
        .order('start_time');

      if (error) throw error;

      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את זמינות המנטור",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAvailabilitySlot = async () => {
    if (!newSlot.day_of_week || !newSlot.start_time || !newSlot.end_time) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('mentor_availability')
        .insert({
          mentor_id: mentorId,
          day_of_week: parseInt(newSlot.day_of_week),
          start_time: newSlot.start_time,
          end_time: newSlot.end_time,
          is_available: true
        });

      if (error) throw error;

      toast({
        title: "הצלחה",
        description: "זמן זמינות נוסף בהצלחה",
      });

      setNewSlot({ day_of_week: "", start_time: "", end_time: "" });
      setIsAddDialogOpen(false);
      fetchAvailability();
    } catch (error) {
      console.error('Error adding availability:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן להוסיף זמן זמינות",
        variant: "destructive",
      });
    }
  };

  const removeAvailabilitySlot = async (slotId: string) => {
    try {
      const { error } = await supabase
        .from('mentor_availability')
        .update({ is_available: false })
        .eq('id', slotId);

      if (error) throw error;

      toast({
        title: "הצלחה",
        description: "זמן זמינות הוסר בהצלחה",
      });

      fetchAvailability();
    } catch (error) {
      console.error('Error removing availability:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן להסיר זמן זמינות",
        variant: "destructive",
      });
    }
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // HH:MM format
  };

  const getDayName = (dayOfWeek: number) => {
    return DAYS_OF_WEEK.find(day => day.value === dayOfWeek)?.label || "";
  };

  const groupedAvailability = availability.reduce((acc, slot) => {
    const day = slot.day_of_week;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(slot);
    return acc;
  }, {} as Record<number, AvailabilitySlot[]>);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            זמינות המנטור
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            זמינות המנטור
          </CardTitle>
          {isOwner && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  הוסף זמן
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>הוסף זמן זמינות</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">יום</label>
                    <Select value={newSlot.day_of_week} onValueChange={(value) => 
                      setNewSlot(prev => ({ ...prev, day_of_week: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר יום" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day.value} value={day.value.toString()}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">שעת התחלה</label>
                    <Select value={newSlot.start_time} onValueChange={(value) => 
                      setNewSlot(prev => ({ ...prev, start_time: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר שעה" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">שעת סיום</label>
                    <Select value={newSlot.end_time} onValueChange={(value) => 
                      setNewSlot(prev => ({ ...prev, end_time: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר שעה" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={addAvailabilitySlot} className="w-full">
                    הוסף זמן זמינות
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {availability.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {isOwner ? "לא הוגדרו זמני זמינות עדיין" : "המנטור לא הגדיר זמני זמינות"}
          </div>
        ) : (
          <div className="space-y-4">
            {DAYS_OF_WEEK.map((day) => {
              const daySlots = groupedAvailability[day.value];
              if (!daySlots || daySlots.length === 0) return null;
              
              return (
                <div key={day.value} className="space-y-2">
                  <h4 className="font-medium">{day.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {daySlots.map((slot) => (
                      <div key={slot.id} className="flex items-center gap-1">
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                        </Badge>
                        {isOwner && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAvailabilitySlot(slot.id)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};