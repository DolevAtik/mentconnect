import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";

interface MentorCardProps {
  name: string;
  title: string;
  image: string;
  rating: number;
  reviewsCount: number;
  expertise: string[];
  location: string;
  experience: string;
  price: string;
  responseTime: string;
}

export const MentorCard = ({
  name,
  title,
  image,
  rating,
  reviewsCount,
  expertise,
  location,
  experience,
  price,
  responseTime,
}: MentorCardProps) => {
  return (
    <div className="bg-gradient-card rounded-xl border border-border p-6 hover:border-primary/20 hover:shadow-medium transition-all duration-200 animate-slide-up">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-soft"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{title}</p>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium ml-1">{rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">({reviewsCount} ביקורות)</span>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {expertise.slice(0, 3).map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {expertise.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{expertise.length - 3}
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 ml-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 ml-2" />
          <span>זמן תגובה: {responseTime}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <div className="text-lg font-semibold text-foreground">{price}</div>
          <div className="text-xs text-muted-foreground">{experience} ניסיון</div>
        </div>
        <Button variant="mentor" size="sm">
          צור קשר
        </Button>
      </div>
    </div>
  );
};