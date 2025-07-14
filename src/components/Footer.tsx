export const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary"></div>
              <span className="text-xl font-bold">HiConnect</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              הפלטפורמה המובילה בישראל לחיבור בין מנטורים ומחפשי ליווי מקצועי
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">מנטורים</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">תוכניות</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">איך זה עובד</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">מחירים</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">תמיכה</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">מרכז עזרה</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">צור קשר</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">שאלות נפוצות</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">בטיחות</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">החברה</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">אודותינו</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">קריירה</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">פרטיות</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">תנאי שימוש</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; 2024 HiConnect. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};