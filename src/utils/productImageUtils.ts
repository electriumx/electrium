// Get image based on headphone details
export const getHeadphoneImage = (name: string, brand: string): string => {
  // Default headphone image fallback
  let imageUrl = '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  
  // Make sure inputs are strings and use safe toLowerCase
  const nameLower = typeof name === 'string' ? name.toLowerCase() : '';
  const brandLower = typeof brand === 'string' ? brand.toLowerCase() : '';
  
  // Sony WH-1000XM4 gets the specified image
  if (nameLower.includes('wh-1000xm4') && brandLower === 'sony') {
    return '/lovable-uploads/17ad1b1a-5bfb-4fb0-aedc-d183c4a73046.png';
  }
  
  // Sony WH-1000XM5 - use a standard image instead of Cyberpunk
  if (nameLower.includes('wh-1000xm5') && brandLower === 'sony') {
    return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
  }
  
  // Beats Fit Pro - use a standard image instead of Cyberpunk
  if (nameLower.includes('fit pro') && brandLower === 'beats') {
    return '/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png';
  }
  
  // Other specific headphone models
  if (nameLower.includes('quietcomfort') && brandLower === 'bose') {
    return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
  }
  
  // Apple headphones
  if (brand === "Apple" && !nameLower.includes("airpod")) {
    return "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png";
  }
  
  // Apple AirPods
  if (brand === "Apple" && nameLower.includes("airpod")) {
    return "/lovable-uploads/b716e87d-a752-4422-aafa-94b38c1dbff3.png";
  }
  
  // Sports headphones
  if (nameLower.includes("sports") || (nameLower.includes("sport") && nameLower.includes("headphones"))) {
    return "/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png";
  }
  
  return imageUrl;
};

// Get image based on category
export const getCategoryImage = (category: string, brand?: string, name?: string): string => {
  // Default image fallback
  let imageUrl = '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  
  // Make sure inputs are strings and use safe toLowerCase
  const categoryLower = typeof category === 'string' ? category.toLowerCase() : '';
  const brandLower = typeof brand === 'string' ? brand.toLowerCase() : '';
  const nameLower = typeof name === 'string' ? name.toLowerCase() : '';
  
  // Specific product images
  
  // Logitech MX Master 3 specific image - UPDATED
  if (brandLower === 'logitech' && nameLower.includes('mx master 3')) {
    return '/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png';
  }
  
  // Samsung Galaxy Tab S8 specific image - UPDATED
  if (brandLower === 'samsung' && nameLower.includes('galaxy tab s8')) {
    return '/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png';
  }
  
  // Apple iPad Air specific image - UPDATED
  if (brandLower === 'apple' && nameLower.includes('ipad air')) {
    return '/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png';
  }
  
  // Google Chromebook specific image - UPDATED
  if (brandLower === 'google' && nameLower.includes('chromebook')) {
    return '/lovable-uploads/6b47797a-7950-4e45-9ec1-b49920bedce3.png';
  }
  
  // Vankyo Cosmos 6 - use a standard image instead of Cyberpunk
  if (brandLower === 'vankyo' && nameLower.includes('cosmos 6')) {
    return '/lovable-uploads/7f739f1f-3772-4ead-89b5-34d5c94221bb.png';
  }
  
  // PlayStation 5 Digital Edition - use a standard image instead of Cyberpunk
  if (brandLower === 'sony' && nameLower.includes('playstation 5 digital')) {
    return '/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png';
  }
  
  // Xbox Series S - use a standard image instead of Cyberpunk
  if (brandLower === 'microsoft' && nameLower.includes('xbox series s')) {
    return '/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png';
  }
  
  // iPhone 13 Pro specific image
  if (brandLower === 'apple' && nameLower.includes('iphone 13 pro')) {
    return '/lovable-uploads/36fdb57d-95cb-4f52-a96a-aaf2f174a210.png';
  }
  
  // Dell XPS 15 specific image
  if (brandLower === 'dell' && nameLower.includes('xps 15')) {
    return '/lovable-uploads/1bd70cd9-f378-4873-8086-6fcaed3c58e0.png';
  }
  
  // Xiaomi Mi 11 specific image
  if (brandLower === 'xiaomi' && nameLower.includes('mi 11')) {
    return '/lovable-uploads/5c31ebb9-c488-4519-a777-9a35f5548f66.png';
  }
  
  // Logitech MX Keys specific image
  if (brandLower === 'logitech' && nameLower.includes('mx keys')) {
    return '/lovable-uploads/aa8af480-0d1f-49a5-a304-fdd660e7bba1.png';
  }
  
  // Apply category-specific images
  if (categoryLower === 'refrigerators' || 
      (nameLower && (nameLower.includes('mini refrigerator') ||
                    nameLower.includes('mini fridge')))) {
    return '/lovable-uploads/f5d3e2bc-690c-4d5c-b85c-cb73e230baca.png';
  }
  
  if (category === 'Vacuum Cleaners') {
    if (brand === 'iRobot') {
      return '/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png';
    }
    return '/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png';
  }
  
  if (category === 'Washing Machines') {
    return '/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png';
  }
  
  if (category === 'Air Conditioners') {
    return '/lovable-uploads/a964141c-5fe9-49ec-9aa0-6b0bd558181c.png';
  }
  
  if (category === 'Microwaves') {
    if (brand === 'Samsung') {
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    }
    if (brand === 'LG') {
      return '/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png';
    }
    if (brand === 'Whirlpool') {
      return '/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png';
    }
    if (brand === 'Panasonic') {
      return '/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png';
    }
  }
  
  if (category === 'TVs') {
    if (brand === 'Samsung' && name && nameLower.includes('oled')) {
      return '/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png';
    }
  }
  
  if (category === 'Tablets') {
    return '/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png';
  }
  
  if (category === 'PC Accessories' && name && nameLower.includes('keyboard')) {
    return '/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png';
  }
  
  // Special case for PC Accessories category with mouse
  if (category === 'PC Accessories' && name && nameLower.includes('mouse')) {
    return '/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png';
  }
  
  // Handle specific brand cases
  if (brand) {
    if (brand === 'Nintendo' || (name && (nameLower.includes('nintendo') || nameLower.includes('switch')))) {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    }
    
    if (brand === 'Google' && name && nameLower.includes('chromebook')) {
      return '/lovable-uploads/6b47797a-7950-4e45-9ec1-b49920bedce3.png';
    }
    
    if (brand === 'Google' && category === 'Smartphones') {
      return '/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png';
    }
    
    if (brand === 'Samsung' && category === 'Smartphones') {
      return '/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png';
    }
    
    if (brand === 'Samsung' && name) {
      if (nameLower.includes('interactive panel')) {
        return '/lovable-uploads/83220acc-b41f-488f-996c-70c790349093.png';
      }
      if (nameLower.includes('smart digital display')) {
        return '/lovable-uploads/f4d18f61-e011-41e1-8945-0862b8e9cb22.png';
      }
      if (nameLower.includes('digital signage')) {
        return '/lovable-uploads/e4e5c805-99ee-44b2-bac6-a7549cd85562.png';
      }
      if (nameLower.includes('digital frame')) {
        return '/lovable-uploads/15fa551c-cf90-4a18-b949-a21c2a6f44d4.png';
      }
    }
  }
  
  return imageUrl;
};

// Get image based on game title
export const getGameImage = (name: string): string => {
  // Default game image fallback
  let imageUrl = '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  
  // Make sure input is a string and use safe toLowerCase
  const nameLower = typeof name === 'string' ? name.toLowerCase() : '';
  
  if (nameLower.includes('red dead redemption')) {
    return '/lovable-uploads/17c10a81-e9a9-49b8-8d05-685b47c135c0.png';
  }
  
  if (nameLower.includes('battlefield')) {
    return '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png';
  }
  
  if (nameLower.includes('call of duty')) {
    return '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png';
  }
  
  if (nameLower.includes('rainbow six')) {
    return '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png';
  }
  
  if (nameLower.includes('death stranding')) {
    return '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png';
  }
  
  // Only use Cyberpunk image for Cyberpunk game
  if (nameLower.includes('cyberpunk 2077')) {
    return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  }
  
  if (nameLower.includes('elden ring')) {
    return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  }
  
  if (nameLower.includes('horizon kings') && nameLower.includes('simulation')) {
    return '/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png';
  }
  
  if (nameLower.includes('world of warriors') && nameLower.includes('racing')) {
    return '/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png';
  }
  
  if (nameLower.includes('ultimate fantasy') && nameLower.includes('racing')) {
    return '/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png';
  }
  
  return imageUrl;
};
