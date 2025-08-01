import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Temporary mock data - will be replaced with real data from database
const mentors = [
  {
    id: "1",
    name: "דניאל כהן",
    title: "Senior Software Engineer",
    image: "/src/assets/mentor-1.jpg",
    rating: 4.9,
    reviewsCount: 127,
    expertise: ["React", "TypeScript", "Node.js", "MongoDB"],
    location: "תל אביב",
    experience: "8 שנות",
    price: "חינם",
    responseTime: "2 שעות",
    bio: "מפתח תוכנה מנוסה עם התמחות בפיתוח Full Stack"
  },
  {
    id: "2", 
    name: "מיכל לוי",
    title: "UX/UI Designer",
    image: "/src/assets/mentor-2.jpg",
    rating: 4.8,
    reviewsCount: 89,
    expertise: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "חיפה",
    experience: "6 שנות",
    price: "חינם",
    responseTime: "4 שעות",
    bio: "מעצבת UX/UI עם ניסיון רב בסטארטאפים"
  },
  {
    id: "3",
    name: "יוסי אברהם", 
    title: "Product Manager",
    image: "/src/assets/mentor-3.jpg",
    rating: 4.7,
    reviewsCount: 156,
    expertise: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    location: "ירושלים",
    experience: "10 שנות",
    price: "חינם",
    responseTime: "6 שעות",
    bio: "מנהל מוצר בכיר עם ניסיון בחברות טכנולוגיה גדולות"
  }
];

const MentorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const { toast } = useToast();

  // Get all unique expertise areas
  const allExpertise = Array.from(
    new Set(mentors.flatMap(mentor => mentor.expertise))
  );

  // Filter mentors based on search query and selected expertise
  useEffect(() => {
    let filtered = mentors;

    if (searchQuery) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor =>
        selectedExpertise.some(skill =>
          mentor.expertise.includes(skill)
        )
      );
    }

    setFilteredMentors(filtered);
  }, [searchQuery, selectedExpertise]);

  const toggleExpertise = (skill: string) => {
    setSelectedExpertise(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedExpertise([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            מצא את המנטור המושלם עבורך
          </h1>
          <p className="text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto">
            חפש מבין מאות מנטורים מתנדבים בתחומים שונים
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="חפש לפי שם, תפקיד או כישור..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  סינון
                </CardTitle>
                <CardDescription>
                  סנן מנטורים לפי תחומי התמחות
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">תחומי התמחות</h3>
                  <div className="flex flex-wrap gap-2">
                    {allExpertise.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedExpertise.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleExpertise(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {(searchQuery || selectedExpertise.length > 0) && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                  >
                    נקה סינונים
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                נמצאו {filteredMentors.length} מנטורים
              </h2>
            </div>

            {filteredMentors.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    לא נמצאו מנטורים המתאימים לחיפוש שלך
                  </p>
                  <Button onClick={clearFilters}>
                    נקה סינונים
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    name={mentor.name}
                    title={mentor.title}
                    image={mentor.image}
                    rating={mentor.rating}
                    reviewsCount={mentor.reviewsCount}
                    expertise={mentor.expertise}
                    location={mentor.location}
                    experience={mentor.experience}
                    price={mentor.price}
                    responseTime={mentor.responseTime}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MentorSearch;