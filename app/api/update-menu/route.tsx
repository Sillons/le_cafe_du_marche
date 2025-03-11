// app/api/update-menu/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    // Simple authentication - in production, use a proper auth middleware
    // Retrieve an auth token from headers or cookies
    
    // You can uncomment this in production with proper authentication
    /*
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    */
    
    // Get the menu data from the request
    const menuData = await req.json();
    
    // Validate the menu data (add more validation as needed)
    if (!menuData.date || !menuData.menuItems || !Array.isArray(menuData.menuItems)) {
      return NextResponse.json(
        { message: 'Format de données invalide' },
        { status: 400 }
      );
    }
    
    // Ensure the public/data directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    // Write the menu data to the JSON file
    const filePath = path.join(dataDir, 'daily-menu.json');
    await fs.writeFile(filePath, JSON.stringify(menuData, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Menu mis à jour avec succès' });
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour du menu' },
      { status: 500 }
    );
  }
}