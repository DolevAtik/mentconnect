import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, Star, Briefcase, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

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
    experienceYears: 8,
    category: "פיתוח תוכנה",
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
    experienceYears: 6,
    category: "עיצוב",
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
    experienceYears: 10,
    category: "ניהול מוצר",
    responseTime: "6 שעות",
    bio: "מנהל מוצר בכיר עם ניסיון בחברות טכנולוגיה גדולות"
  },
  {
    id: "4",
    name: "שרה דוד", 
    title: "Marketing Director",
    image: "/src/assets/mentor-1.jpg",
    rating: 4.6,
    reviewsCount: 92,
    expertise: ["Digital Marketing", "Social Media", "Content Strategy", "SEO"],
    location: "תל אביב",
    experience: "5 שנות",
    experienceYears: 5,
    category: "שיווק",
    responseTime: "3 שעות",
    bio: "מנהלת שיווק דיגיטלי עם התמחות ברשתות חברתיות"
  },
  {
    id: "5",
    name: "אלון גרין", 
    title: "Data Scientist",
    image: "/src/assets/mentor-2.jpg",
    rating: 4.9,
    reviewsCount: 143,
    expertise: ["Python", "Machine Learning", "Statistics", "SQL"],
    location: "הרצליה",
    experience: "7 שנות",
    experienceYears: 7,
    category: "מדעי הנתונים",
    responseTime: "5 שעות",
    bio: "מדען נתונים עם התמחות בלמידת מכונה ובינה מלאכותית"
  }
];

const MentorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { toast } = useToast();

  // Get all unique values for filters
  const allExpertise = Array.from(new Set(mentors.flatMap(mentor => mentor.expertise)));
  const allCategories = Array.from(new Set(mentors.map(mentor => mentor.category)));
  const allLocations = Array.from(new Set(mentors.map(mentor => mentor.location)));

  // Filter mentors based on all criteria
  useEffect(() => {
    let filtered = mentors;

    if (searchQuery) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        mentor.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor =>
        selectedExpertise.some(skill =>
          mentor.expertise.includes(skill)
        )
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(mentor => mentor.category === selectedCategory);
    }

    if (selectedExperience && selectedExperience !== "all") {
      if (selectedExperience === "1-3") {
        filtered = filtered.filter(mentor => mentor.experienceYears >= 1 && mentor.experienceYears <= 3);
      } else if (selectedExperience === "4-7") {
        filtered = filtered.filter(mentor => mentor.experienceYears >= 4 && mentor.experienceYears <= 7);
      } else if (selectedExperience === "8+") {
        filtered = filtered.filter(mentor => mentor.experienceYears >= 8);
      }
    }

    if (selectedLocation && selectedLocation !== "all") {
      filtered = filtered.filter(mentor => mentor.location === selectedLocation);
    }

    setFilteredMentors(filtered);
  }, [searchQuery, selectedExpertise, selectedCategory, selectedExperience, selectedLocation]);

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
    setSelectedCategory("all");
    setSelectedExperience("all");
    setSelectedLocation("all");
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
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">תחום התמחות</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר תחום" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל התחומים</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">שנות ניסיון</h3>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר ניסיון" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל רמות הניסיון</SelectItem>
                      <SelectItem value="1-3">1-3 שנים</SelectItem>
                      <SelectItem value="4-7">4-7 שנים</SelectItem>
                      <SelectItem value="8+">8+ שנים</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">מיקום</h3>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר מיקום" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל המיקומים</SelectItem>
                      {allLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">כישורים ספציפיים</h3>
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
                
                {(searchQuery || selectedExpertise.length > 0 || (selectedCategory && selectedCategory !== "all") || (selectedExperience && selectedExperience !== "all") || (selectedLocation && selectedLocation !== "all")) && (
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
                    price="חינם"
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