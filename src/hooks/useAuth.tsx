import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // אם זה המשתמש התחבר לראשונה (sign-up עם Google), הפנה להשלמת פרופיל
        if (event === 'SIGNED_IN' && session?.user && window.location.pathname === '/') {
          // השתמש ב-setTimeout כדי להימנע מבעיות deadlock
          setTimeout(async () => {
            try {
              const { data } = await supabase
                .from('profiles')
                .select('first_name, last_name, user_type')
                .eq('user_id', session.user.id)
                .single();
              
              // אם אין פרופיל מלא, הפנה להשלמת פרופיל
              if (!data || !data.first_name || !data.last_name || !data.user_type) {
                window.location.href = '/complete-profile';
              }
            } catch (error) {
              // אם אין פרופיל בכלל, הפנה להשלמת פרופיל
              window.location.href = '/complete-profile';
            }
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};