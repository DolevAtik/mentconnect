import { MentorCard } from "./MentorCard";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";

const mentors = [
  {
    name: "שרה כהן",
    title: "Senior Software Engineer ב-Google",
    image: mentor1,
    rating: 4.9,
    reviewsCount: 127,
    expertise: ["React", "TypeScript", "Node.js", "System Design"],
    location: "תל אביב",
    experience: "8 שנות",
    responseTime: "תוך שעה"
  },
  {
    name: "דוד לוי",
    title: "VP Product ב-Wix",
    image: mentor2,
    rating: 4.8,
    reviewsCount: 89,
    expertise: ["Product Management", "Strategy", "Leadership", "Analytics"],
    location: "הרצליה",
    experience: "12 שנות",
    responseTime: "תוך 2 שעות"
  },
  {
    name: "חנה רוזנברג",
    title: "UX Design Lead ב-Meta",
    image: mentor3,
    rating: 5.0,
    reviewsCount: 156,
    expertise: ["UX Design", "Figma", "User Research", "Design Systems"],
    location: "תל אביב",
    experience: "6 שנות",
    responseTime: "תוך 30 דקות"
  },
];

export const FeaturedMentors = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            המנטורים המובילים שלנו
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            פגש את המנטורים המנוסים ביותר שלנו שכבר עזרו לאלפי אנשים להתקדם בקריירה
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <MentorCard 
              key={index} 
              {...mentor} 
              price="חינם"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-dark font-medium text-lg transition-colors">
            צפה בכל המנטורים ←
          </button>
        </div>
      </div>
    </section>
  );
};