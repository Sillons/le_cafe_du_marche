'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface DailyMenuData {
  date: string;
  menuItems: MenuCategory[];
}

export default function DailyMenu({ colors }: { colors: { cream: string; burgundy: string; blue: string } }) {
  const [menuData, setMenuData] = useState<DailyMenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('/data/daily-menu.json');
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError('Impossible de charger le menu du jour. Veuillez réessayer plus tard.');
        console.error('Error fetching menu:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p style={{ color: colors.burgundy }}>Chargement du menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p style={{ color: colors.burgundy }}>{error}</p>
      </div>
    );
  }

  // Format the date to French locale (e.g., "mardi 11 mars 2025")
  const formattedDate = menuData?.date ? 
    format(new Date(menuData.date), "EEEE d MMMM yyyy", { locale: fr }) : '';

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-lg" style={{ color: colors.burgundy }}>
          {formattedDate}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menuData?.menuItems.map((category, index) => (
          <div 
            key={index} 
            className="rounded-lg overflow-hidden shadow-lg p-6"
            style={{ 
              border: `2px solid ${colors.burgundy}`,
              backgroundColor: 'white'
            }}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colors.blue }}
            >
              {category.category}
            </h3>
            
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="pb-3 border-b last:border-b-0" style={{ borderColor: colors.cream }}>
                  <div className="flex justify-between">
                    <h4 className="font-medium" style={{ color: colors.burgundy }}>{item.name}</h4>
                    <span className="font-medium" style={{ color: colors.burgundy }}>{item.price}</span>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="italic text-sm" style={{ color: colors.burgundy }}>
          Notre menu change quotidiennement selon les arrivages et l'inspiration du chef.
        </p>
      </div>
    </div>
  );
}