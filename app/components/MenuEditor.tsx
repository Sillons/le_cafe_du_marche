'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Define the same interfaces as in your DailyMenu component for consistency
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

export default function MenuEditor() {
  const [menuData, setMenuData] = useState<DailyMenuData>({
    date: format(new Date(), 'yyyy-MM-dd'),
    menuItems: [
      {
        category: 'Entrées',
        items: [{ name: '', description: '', price: '' }]
      },
      {
        category: 'Plats',
        items: [{ name: '', description: '', price: '' }]
      },
      {
        category: 'Desserts',
        items: [{ name: '', description: '', price: '' }]
      }
    ]
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Colors to match your main site
  const colors = {
    cream: '#f5f0da',
    burgundy: '#650500',
    blue: '#0032a0',
    text: '#000000', // Added text color
  };

  useEffect(() => {
    // Try to load the existing menu when component mounts
    async function fetchMenu() {
      try {
        const response = await fetch('/data/daily-menu.json');
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    }

    fetchMenu();
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Very simple password check - in production, use a proper authentication system
    if (password === process.env.NEXT_PUBLIC_MENU_PASSWORD || password === 'cafe123') {
      setIsAuthenticated(true);
    } else {
      setMessage('Mot de passe incorrect');
      setMessageType('error');
    }
  };

  const handleDateChange = (e) => {
    setMenuData({
      ...menuData,
      date: e.target.value
    });
  };

  const handleCategoryChange = (index, value) => {
    const updatedMenuItems = [...menuData.menuItems];
    updatedMenuItems[index].category = value;
    setMenuData({
      ...menuData,
      menuItems: updatedMenuItems
    });
  };

  const handleMenuItemChange = (categoryIndex, itemIndex, field, value) => {
    const updatedMenuItems = [...menuData.menuItems];
    updatedMenuItems[categoryIndex].items[itemIndex][field] = value;
    setMenuData({
      ...menuData,
      menuItems: updatedMenuItems
    });
  };

  const addMenuItem = (categoryIndex) => {
    const updatedMenuItems = [...menuData.menuItems];
    updatedMenuItems[categoryIndex].items.push({ name: '', description: '', price: '' });
    setMenuData({
      ...menuData,
      menuItems: updatedMenuItems
    });
  };

  const removeMenuItem = (categoryIndex, itemIndex) => {
    const updatedMenuItems = [...menuData.menuItems];
    updatedMenuItems[categoryIndex].items.splice(itemIndex, 1);
    setMenuData({
      ...menuData,
      menuItems: updatedMenuItems
    });
  };

  const addCategory = () => {
    setMenuData({
      ...menuData,
      menuItems: [
        ...menuData.menuItems,
        {
          category: 'Nouvelle Catégorie',
          items: [{ name: '', description: '', price: '' }]
        }
      ]
    });
  };

  const removeCategory = (categoryIndex) => {
    if (menuData.menuItems.length <= 1) {
      setMessage('Il faut au moins une catégorie dans le menu');
      setMessageType('error');
      return;
    }
    
    const updatedMenuItems = [...menuData.menuItems];
    updatedMenuItems.splice(categoryIndex, 1);
    setMenuData({
      ...menuData,
      menuItems: updatedMenuItems
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real application, you would send this to your API endpoint
      // that handles the file update
      const response = await fetch('/api/update-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });
      
      if (response.ok) {
        setMessage('Menu mis à jour avec succès!');
        setMessageType('success');
      } else {
        const error = await response.json();
        setMessage(`Erreur: ${error.message}`);
        setMessageType('error');
      }
    } catch (err) {
      setMessage(`Erreur: ${err.message}`);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Preview formatted date (e.g., "mardi 11 mars 2025")
  const formattedDate = menuData?.date ? 
    format(new Date(menuData.date), "EEEE d MMMM yyyy", { locale: fr }) : '';

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center py-12 px-4"
        style={{ backgroundColor: colors.cream }}
      >
        <div 
          className="w-full max-w-md bg-white rounded-lg shadow-xl p-8"
          style={{ border: `2px solid ${colors.burgundy}` }}
        >
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: colors.blue }}
          >
            Administration - Menu du Jour
          </h2>
          
          {message && (
            <div 
              className="mb-4 p-3 rounded"
              style={{ 
                backgroundColor: messageType === 'error' ? '#FECACA' : '#D1FAE5',
                color: messageType === 'error' ? '#B91C1C' : '#065F46'
              }}
            >
              {message}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="block mb-2 font-medium"
                style={{ color: colors.burgundy }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                style={{ borderColor: colors.burgundy, color: colors.text }}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 rounded text-white font-medium"
              style={{ backgroundColor: colors.burgundy }}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: colors.cream }}
    >
      <div 
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8"
        style={{ border: `2px solid ${colors.burgundy}` }}
      >
        <h2 
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: colors.blue }}
        >
          Éditeur de Menu du Jour
        </h2>
        
        <p className="text-center mb-6" style={{ color: colors.burgundy }}>
          Modifiez votre menu et cliquez sur Enregistrer pour le mettre à jour sur votre site
        </p>
        
        {message && (
          <div 
            className="mb-6 p-4 rounded"
            style={{ 
              backgroundColor: messageType === 'error' ? '#FECACA' : '#D1FAE5',
              color: messageType === 'error' ? '#B91C1C' : '#065F46'
            }}
          >
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="date" 
              className="block mb-2 font-medium"
              style={{ color: colors.burgundy }}
            >
              Date du menu
            </label>
            <input
              type="date"
              id="date"
              value={menuData.date}
              onChange={handleDateChange}
              className="w-full md:w-64 p-2 border rounded"
              style={{ borderColor: colors.burgundy, color: colors.text }}
            />
            <p className="mt-2 text-sm" style={{ color: colors.burgundy }}>
              Ce menu sera affiché comme: <strong>{formattedDate}</strong>
            </p>
          </div>
          
          <div className="mb-8">
            <div className="space-y-8">
              {menuData.menuItems.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  className="p-6 border rounded-lg"
                  style={{ borderColor: colors.burgundy }}
                >
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="w-full md:w-auto mb-2 md:mb-0">
                      <label 
                        htmlFor={`category-${categoryIndex}`}
                        className="block mb-2 font-medium"
                        style={{ color: colors.burgundy }}
                      >
                        Nom de la catégorie
                      </label>
                      <input
                        type="text"
                        id={`category-${categoryIndex}`}
                        value={category.category}
                        onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                        className="w-full md:w-64 p-2 border rounded"
                        style={{ borderColor: colors.burgundy, color: colors.text }}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeCategory(categoryIndex)}
                      className="px-3 py-1 rounded border"
                      style={{ 
                        borderColor: colors.burgundy,
                        color: colors.burgundy
                      }}
                    >
                      Supprimer cette catégorie
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className="p-4 border rounded"
                        style={{ borderColor: colors.cream }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label 
                              htmlFor={`item-name-${categoryIndex}-${itemIndex}`}
                              className="block mb-1 font-medium"
                              style={{ color: colors.burgundy }}
                            >
                              Nom du plat
                            </label>
                            <input
                              type="text"
                              id={`item-name-${categoryIndex}-${itemIndex}`}
                              value={item.name}
                              onChange={(e) => handleMenuItemChange(categoryIndex, itemIndex, 'name', e.target.value)}
                              className="w-full p-2 border rounded"
                              style={{ borderColor: colors.burgundy, color: colors.text }}
                            />
                          </div>
                          
                          <div>
                            <label 
                              htmlFor={`item-description-${categoryIndex}-${itemIndex}`}
                              className="block mb-1 font-medium"
                              style={{ color: colors.burgundy }}
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              id={`item-description-${categoryIndex}-${itemIndex}`}
                              value={item.description}
                              onChange={(e) => handleMenuItemChange(categoryIndex, itemIndex, 'description', e.target.value)}
                              className="w-full p-2 border rounded"
                              style={{ borderColor: colors.burgundy, color: colors.text }}
                            />
                          </div>
                          
                          <div>
                            <label 
                              htmlFor={`item-price-${categoryIndex}-${itemIndex}`}
                              className="block mb-1 font-medium"
                              style={{ color: colors.burgundy }}
                            >
                              Prix
                            </label>
                            <div className="flex items-center">
                              <input
                                type="text"
                                id={`item-price-${categoryIndex}-${itemIndex}`}
                                value={item.price}
                                onChange={(e) => handleMenuItemChange(categoryIndex, itemIndex, 'price', e.target.value)}
                                className="w-full p-2 border rounded"
                                style={{ borderColor: colors.burgundy, color: colors.text }}
                                placeholder="12€"
                              />
                              
                              <button
                                type="button"
                                onClick={() => removeMenuItem(categoryIndex, itemIndex)}
                                className="ml-2 px-3 py-2 rounded text-white"
                                style={{ backgroundColor: '#DC2626' }}
                                disabled={category.items.length <= 1}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => addMenuItem(categoryIndex)}
                    className="mt-4 px-4 py-2 rounded border"
                    style={{ 
                      borderColor: colors.burgundy,
                      color: colors.burgundy
                    }}
                  >
                    + Ajouter un plat
                  </button>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addCategory}
              className="mt-4 px-4 py-2 rounded"
              style={{ 
                backgroundColor: colors.blue,
                color: 'white'
              }}
            >
              + Ajouter une catégorie
            </button>
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-6 py-3 rounded border"
              style={{ 
                borderColor: colors.burgundy,
                color: colors.burgundy
              }}
            >
              Se déconnecter
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 rounded text-white"
              style={{ backgroundColor: colors.burgundy }}
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer le menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}