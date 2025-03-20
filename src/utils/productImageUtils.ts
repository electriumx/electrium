
// Maps product categories to appropriate image URLs
export const getCategoryImage = (category: string, brand?: string): string => {
  switch (category.toLowerCase()) {
    case 'smartphones':
    case 'phone':
      return brand?.toLowerCase() === 'apple' 
        ? '/lovable-uploads/iphone-13-pro-max.jpg'
        : '/lovable-uploads/google-pixel-6-pro.jpg';
    
    case 'laptops':
      return '/lovable-uploads/apple-macbook-pro-16.jpg';
    
    case 'gaming consoles':
      return brand?.toLowerCase() === 'playstation' 
        ? '/lovable-uploads/sony-playstation-5.jpg'
        : '/lovable-uploads/microsoft-xbox-series-x.jpg';
    
    case 'tvs':
      return '/lovable-uploads/samsung-65-qled-8k-tv.jpg';
    
    case 'headphones':
      return brand?.toLowerCase() === 'sony' 
        ? '/lovable-uploads/sony-wh-1000xm4-headphones.jpg'
        : '/lovable-uploads/bose-quietcomfort-45-headphones.jpg';
    
    case 'tablets':
      return '/lovable-uploads/apple-ipad-pro-12-9.jpg';
    
    case 'pc accessories':
      return brand?.toLowerCase() === 'logitech'
        ? '/lovable-uploads/logitech-mx-master-3-mouse.jpg'
        : '/lovable-uploads/razer-blackwidow-v3-keyboard.jpg';
    
    case 'games':
      if (brand?.toLowerCase().includes('playstation')) {
        return '/lovable-uploads/ghost-of-tsushima.jpg';
      } else if (brand?.toLowerCase().includes('pc')) {
        return '/lovable-uploads/cyberpunk-2077.jpg';
      } else {
        return '/lovable-uploads/elden-ring.jpg';
      }
    
    // Appliance categories
    case 'microwaves':
    case 'washing machines':
    case 'refrigerators':
    case 'air conditioners':
      return '/lovable-uploads/samsung-65-qled-8k-tv.jpg';
    
    case 'vacuum cleaners':
      return '/lovable-uploads/logitech-mx-master-3-mouse.jpg';
    
    case 'smart screens':
      return '/lovable-uploads/google-pixel-6-pro.jpg';
      
    default:
      return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  }
};

// Maps game titles to appropriate image URLs based on keywords
export const getGameImage = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('souls') || lowerTitle.includes('legend') || lowerTitle.includes('ring')) {
    return '/lovable-uploads/elden-ring.jpg';
  } else if (lowerTitle.includes('horizon') || lowerTitle.includes('west') || lowerTitle.includes('quest')) {
    return '/lovable-uploads/horizon-forbidden-west.jpg';
  } else if (lowerTitle.includes('last') || lowerTitle.includes('us') || lowerTitle.includes('survival')) {
    return '/lovable-uploads/the-last-of-us-part-ii.jpg';
  } else if (lowerTitle.includes('cyber') || lowerTitle.includes('punk') || lowerTitle.includes('future')) {
    return '/lovable-uploads/cyberpunk-2077.jpg';
  } else if (lowerTitle.includes('ghost') || lowerTitle.includes('tsushima') || lowerTitle.includes('samurai')) {
    return '/lovable-uploads/ghost-of-tsushima.jpg';
  } else if (lowerTitle.includes('death') || lowerTitle.includes('strand')) {
    return '/lovable-uploads/death-stranding.jpg';
  } else {
    // Default game image
    return '/lovable-uploads/elden-ring.jpg';
  }
};
