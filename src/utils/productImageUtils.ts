
// Maps product categories to appropriate image URLs from Google
export const getCategoryImage = (category: string, brand?: string): string => {
  switch (category.toLowerCase()) {
    case 'smartphones':
    case 'phone':
      if (brand?.toLowerCase() === 'apple') {
        return 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'samsung') {
        return 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1471&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'google') {
        return 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?q=80&w=1527&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'xiaomi') {
        return 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1170&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1160&auto=format&fit=crop';
    
    case 'laptops':
      if (brand?.toLowerCase() === 'apple') {
        return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'microsoft') {
        return 'https://images.unsplash.com/photo-1662219708541-c9686d48beec?q=80&w=1074&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop';
    
    case 'gaming consoles':
      if (brand?.toLowerCase() === 'playstation') {
        return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1527&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'microsoft') {
        return 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1632&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'nintendo') {
        return 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1470&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=1472&auto=format&fit=crop';
    
    case 'tvs':
      return 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1470&auto=format&fit=crop';
    
    case 'headphones':
      if (brand?.toLowerCase() === 'sony') {
        return 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=388&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'bose') {
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop';
      } else if (brand?.toLowerCase() === 'apple') {
        return 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop';
    
    case 'tablets':
      if (brand?.toLowerCase() === 'apple') {
        return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1373&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1470&auto=format&fit=crop';
    
    case 'pc accessories':
      if (brand?.toLowerCase().includes('logitech')) {
        return 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1470&auto=format&fit=crop';
      } else if (brand?.toLowerCase().includes('razer')) {
        return 'https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=1517&auto=format&fit=crop';
      }
      return 'https://images.unsplash.com/photo-1625895197185-effc372bd416?q=80&w=1470&auto=format&fit=crop';
    
    case 'games':
      if (brand?.toLowerCase().includes('playstation')) {
        return 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1470&auto=format&fit=crop';
      } else if (brand?.toLowerCase().includes('pc')) {
        return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop';
      } else {
        return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471&auto=format&fit=crop';
      }
    
    // Appliance categories
    case 'microwaves':
      return 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=1476&auto=format&fit=crop';
    
    case 'washing machines':
      return 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1470&auto=format&fit=crop';
    
    case 'refrigerators':
      return 'https://images.unsplash.com/photo-1536353284924-9220c464e262?q=80&w=1471&auto=format&fit=crop';
    
    case 'air conditioners':
      return 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1470&auto=format&fit=crop';
    
    case 'vacuum cleaners':
      return 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1470&auto=format&fit=crop';
    
    case 'smart screens':
      return 'https://images.unsplash.com/photo-1551651639-927b595f9281?q=80&w=1374&auto=format&fit=crop';
      
    default:
      return 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1470&auto=format&fit=crop';
  }
};

// Maps iPhone models to appropriate image URLs
export const getIPhoneImage = (model: string): string => {
  // Extract model number from name
  const modelNumber = model.match(/\d+/)?.[0] || '13';
  const isPro = model.toLowerCase().includes('pro');
  const isMax = model.toLowerCase().includes('max') || model.toLowerCase().includes('ultra');
  
  switch (modelNumber) {
    case '17':
      return 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop';
    case '16':
      return 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop';
    case '15':
      return 'https://images.unsplash.com/photo-1695048134810-a564da370512?q=80&w=1480&auto=format&fit=crop';
    case '14':
      return 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=1471&auto=format&fit=crop';
    case '13':
      return 'https://images.unsplash.com/photo-1642641957348-301eb386b7b8?q=80&w=1480&auto=format&fit=crop';
    case '12':
      return 'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1528&auto=format&fit=crop';
    case '11':
      return 'https://images.unsplash.com/photo-1574719128055-f4f84a835363?q=80&w=1374&auto=format&fit=crop';
    case '10':
    case 'X':
      return 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1473&auto=format&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop';
  }
};

// Maps game titles to appropriate image URLs based on keywords
export const getGameImage = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('souls') || lowerTitle.includes('legend') || lowerTitle.includes('ring')) {
    return 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=1470&auto=format&fit=crop';
  } else if (lowerTitle.includes('horizon') || lowerTitle.includes('west') || lowerTitle.includes('quest')) {
    return 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1470&auto=format&fit=crop';
  } else if (lowerTitle.includes('last') || lowerTitle.includes('us') || lowerTitle.includes('survival')) {
    return 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=1469&auto=format&fit=crop';
  } else if (lowerTitle.includes('cyber') || lowerTitle.includes('punk') || lowerTitle.includes('future')) {
    return 'https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?q=80&w=1470&auto=format&fit=crop';
  } else if (lowerTitle.includes('ghost') || lowerTitle.includes('tsushima') || lowerTitle.includes('samurai')) {
    return 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1374&auto=format&fit=crop';
  } else if (lowerTitle.includes('death') || lowerTitle.includes('strand')) {
    return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop';
  } else {
    // Default game image
    return 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1470&auto=format&fit=crop';
  }
};
