'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Colors from the logo
  const colors = {
    cream: '#f5f0da', // Background color
    burgundy: '#650500', // Dark red/brown from the drawing
    blue: '#0032a0', // Text blue
  };

  // Sample menu items - replace with actual menu
  const menuItems = [
    {
      category: 'Entrées',
      items: [
        { name: 'Salade du Marché', description: 'Légumes frais de saison', price: '8€' },
        { name: 'Terrine Maison', description: 'Accompagnée de cornichons et pain de campagne', price: '9€' },
        { name: 'Œufs Mayonnaise', description: 'Œufs fermiers et mayonnaise maison', price: '7€' },
      ]
    },
    {
      category: 'Plats',
      items: [
        { name: 'Confit de Canard', description: 'Servi avec pommes sarladaises', price: '18€' },
        { name: 'Entrecôte Café de Paris', description: 'Bœuf français, frites maison', price: '22€' },
        { name: 'Poisson du Jour', description: 'Selon arrivage du marché de Nantes', price: '20€' },
      ]
    },
    {
      category: 'Desserts',
      items: [
        { name: 'Tarte Tatin', description: 'Servie tiède avec crème fraîche', price: '8€' },
        { name: 'Mousse au Chocolat', description: 'Chocolat noir 70%', price: '7€' },
        { name: 'Café Gourmand', description: 'Café et assortiment de mignardises', price: '9€' },
      ]
    }
  ];

  // Opening hours
  const hours = [
    { day: 'Lundi', hours: 'Fermé' },
    { day: 'Mardi', hours: '11h30 - 14h30, 19h00 - 22h00' },
    { day: 'Mercredi', hours: '11h30 - 14h30, 19h00 - 22h00' },
    { day: 'Jeudi', hours: '11h30 - 14h30, 19h00 - 22h00' },
    { day: 'Vendredi', hours: '11h30 - 14h30, 19h00 - 23h00' },
    { day: 'Samedi', hours: '11h30 - 15h00, 19h00 - 23h00' },
    { day: 'Dimanche', hours: '11h30 - 15h00' },
  ];

  const scrollTo = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div style={{ backgroundColor: colors.cream }} className="min-h-screen">
      {/* Navigation */}
      <nav 
        className="fixed w-full z-10 shadow-md" 
        style={{ backgroundColor: colors.cream, borderBottom: `2px solid ${colors.burgundy}` }}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Le Café du Marché" 
                width={50} 
                height={50} 
                className="mr-2"
              />
              <span style={{ color: colors.blue }} className="text-xl font-bold">Le Café du Marché</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                style={{ color: colors.burgundy }}
              >
                {isMenuOpen ? 'Fermer' : 'Menu'}
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'menu', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="px-3 py-2 font-medium capitalize transition-colors duration-300"
                  style={{ 
                    color: activeSection === item ? colors.blue : colors.burgundy,
                    borderBottom: activeSection === item ? `2px solid ${colors.blue}` : 'none'
                  }}
                >
                  {item === 'home' ? 'Accueil' : 
                   item === 'menu' ? 'Notre Carte' : 
                   item === 'about' ? 'À Propos' : 'Contact'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4" style={{ backgroundColor: colors.cream }}>
              {['home', 'menu', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="block w-full py-2 px-4 text-left capitalize"
                  style={{ 
                    color: activeSection === item ? colors.blue : colors.burgundy,
                    backgroundColor: activeSection === item ? `${colors.cream}` : 'transparent'
                  }}
                >
                  {item === 'home' ? 'Accueil' : 
                   item === 'menu' ? 'Notre Carte' : 
                   item === 'about' ? 'À Propos' : 'Contact'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: colors.blue }}
              >
                Le Café du Marché
              </h1>
              <h2 
                className="text-2xl md:text-3xl mb-6"
                style={{ color: colors.burgundy }}
              >
                Cuisine traditionnelle française
              </h2>
              <p className="text-lg mb-6" style={{ color: colors.burgundy }}>
                Une cuisine authentique au cœur de Nantes, avec des produits frais du marché.
              </p>
              <button 
                onClick={() => scrollTo('menu')}
                className="px-6 py-3 rounded transition-colors duration-300"
                style={{ 
                  backgroundColor: colors.burgundy, 
                  color: colors.cream,
                  border: `2px solid ${colors.burgundy}`
                }}
              >
                Découvrir notre carte
              </button>
            </div>
            <div className="md:w-1/2">
              <div 
                className="rounded-lg overflow-hidden shadow-xl"
                style={{ border: `2px solid ${colors.burgundy}` }}
              >
                <Image 
                  src="/facade.png" 
                  alt="Façade du restaurant" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto object-cover h-64 md:h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section id="menu" className="py-16" style={{ backgroundColor: colors.cream }}>
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: colors.blue }}
          >
            Notre Carte
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((category, index) => (
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
          
          <div className="mt-12 text-center">
            <p className="mb-4" style={{ color: colors.burgundy }}>
              Notre carte change régulièrement selon les produits de saison.
            </p>
            <button 
              className="px-6 py-3 rounded transition-colors duration-300"
              style={{ 
                backgroundColor: 'white', 
                color: colors.burgundy,
                border: `2px solid ${colors.burgundy}`
              }}
            >
              Télécharger la carte complète (PDF)
            </button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: colors.blue }}
          >
            À Propos
          </h2>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div 
                className="rounded-lg overflow-hidden shadow-xl"
                style={{ border: `2px solid ${colors.burgundy}` }}
              >
                <Image 
                  src="/interieur.png" 
                  alt="Intérieur du restaurant" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto object-cover h-64 md:h-96"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.burgundy }}
              >
                Notre Histoire
              </h3>
              <p className="mb-4" style={{ color: colors.burgundy }}>
                Le Café du Marché est une institution nantaise depuis plus de 20 ans. 
                Situé au cœur de la ville, à deux pas du marché de Talensac, notre restaurant 
                propose une cuisine traditionnelle française élaborée à partir de produits frais et locaux.
              </p>
              <p className="mb-6" style={{ color: colors.burgundy }}>
                Notre chef et son équipe sélectionnent chaque matin les meilleurs produits 
                du marché pour vous offrir une expérience culinaire authentique dans une ambiance 
                chaleureuse et conviviale.
              </p>
              
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.burgundy }}
              >
                Nos Horaires
              </h3>
              <div className="space-y-2">
                {hours.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium" style={{ color: colors.burgundy }}>{day.day}</span>
                    <span style={{ color: colors.burgundy }}>{day.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16" style={{ backgroundColor: colors.cream }}>
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: colors.blue }}
          >
            Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.burgundy }}
              >
                Informations
              </h3>
              
              <div className="space-y-4" style={{ color: colors.burgundy }}>
                <p>
                  <strong>Adresse:</strong><br />
                  2 rue de Mayence<br />
                  44000 Nantes
                </p>
                <p>
                  <strong>Téléphone:</strong><br />
                  02 XX XX XX XX
                </p>
                <p>
                  <strong>Email:</strong><br />
                  contact@lecafedumarche-nantes.fr
                </p>
              </div>
              
              <div className="mt-8">
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.burgundy }}
                >
                  Réservations
                </h3>
                <p className="mb-4" style={{ color: colors.burgundy }}>
                  Pour réserver une table, appelez-nous ou utilisez notre formulaire de réservation en ligne.
                </p>
                <button 
                  className="px-6 py-3 rounded transition-colors duration-300"
                  style={{ 
                    backgroundColor: colors.burgundy, 
                    color: colors.cream,
                    border: `2px solid ${colors.burgundy}`
                  }}
                >
                  Réserver une table
                </button>
              </div>
            </div>
            
            <div>
              <div 
                className="rounded-lg overflow-hidden shadow-xl h-full"
                style={{ border: `2px solid ${colors.burgundy}` }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.076539475104!2d-1.5584237235236175!3d47.214789421333404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eea6e9b3f89f%3A0x55dbda1f4b7cf54f!2s2%20Rue%20de%20Mayence%2C%2044000%20Nantes!5e0!3m2!1sfr!2sfr!4v1710098523814!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: colors.burgundy, color: colors.cream }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Le Café du Marché" 
                  width={40} 
                  height={40} 
                  className="mr-2"
                />
                <span className="text-xl font-bold">Le Café du Marché</span>
              </div>
              <p className="mt-2">2 rue de Mayence, 44000 Nantes</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-2">Suivez-nous</h4>
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/cafe_du_marche_nantes/" target="_blank" className="hover:opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Le Café du Marché. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}