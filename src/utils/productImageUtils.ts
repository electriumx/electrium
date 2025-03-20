
// Maps product categories to appropriate image URLs from Amazon
export const getCategoryImage = (category: string, brand?: string): string => {
  // These URLs point to Amazon-like product images
  switch (category.toLowerCase()) {
    case 'smartphones':
    case 'phone':
      return brand?.toLowerCase() === 'apple' 
        ? 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg'  // iPhone 14 Pro Max
        : 'https://m.media-amazon.com/images/I/71LM+uRWjML._AC_SL1500_.jpg'; // Google Pixel 7 Pro
    
    case 'laptops':
      return brand?.toLowerCase() === 'apple'
        ? 'https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_SL1500_.jpg'  // MacBook Pro
        : 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg'; // Dell XPS
    
    case 'gaming consoles':
      return brand?.toLowerCase() === 'playstation' 
        ? 'https://m.media-amazon.com/images/I/51051FiD9UL._SL1500_.jpg'     // PlayStation 5
        : 'https://m.media-amazon.com/images/I/61-jjE67uIL._SL1500_.jpg';    // Xbox Series X
    
    case 'tvs':
      return brand?.toLowerCase() === 'samsung'
        ? 'https://m.media-amazon.com/images/I/91RfzivKmwL._AC_SL1500_.jpg'  // Samsung QLED
        : 'https://m.media-amazon.com/images/I/91UsHjAPTlL._AC_SL1500_.jpg'; // LG OLED
    
    case 'headphones':
      return brand?.toLowerCase() === 'sony' 
        ? 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg'  // Sony WH-1000XM5
        : 'https://m.media-amazon.com/images/I/51Qe3Yy8K2L._AC_SL1500_.jpg'; // Bose QuietComfort
    
    case 'tablets':
      return brand?.toLowerCase() === 'apple'
        ? 'https://m.media-amazon.com/images/I/81gC7frRJyL._AC_SL1500_.jpg'  // iPad Pro
        : 'https://m.media-amazon.com/images/I/61ldUQDTbUL._AC_SL1500_.jpg'; // Samsung Galaxy Tab
    
    case 'pc accessories':
      return brand?.toLowerCase() === 'logitech'
        ? 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg'  // Logitech MX Master
        : 'https://m.media-amazon.com/images/I/71TL6XTM25L._AC_SL1500_.jpg'; // Razer BlackWidow
    
    case 'games':
      if (brand?.toLowerCase().includes('playstation')) {
        return 'https://m.media-amazon.com/images/I/81gWiLu63JL._SL1500_.jpg'; // Ghost of Tsushima
      } else if (brand?.toLowerCase().includes('pc')) {
        return 'https://m.media-amazon.com/images/I/81Fjf7CXsoL._SL1500_.jpg'; // Cyberpunk 2077
      } else {
        return 'https://m.media-amazon.com/images/I/618NO+DUMSL._SL1000_.jpg'; // Elden Ring
      }
    
    // Appliance categories
    case 'microwaves':
      return 'https://m.media-amazon.com/images/I/71D64I+RRGL._AC_SL1500_.jpg'; // Toshiba Microwave
    
    case 'washing machines':
      return 'https://m.media-amazon.com/images/I/71RzhAu6MaL._AC_SL1500_.jpg'; // Samsung Washer
    
    case 'refrigerators':
      return 'https://m.media-amazon.com/images/I/71goFdqBcYL._AC_SL1500_.jpg'; // LG Refrigerator
    
    case 'air conditioners':
      return 'https://m.media-amazon.com/images/I/71SvlTFwcZL._AC_SL1500_.jpg'; // Midea Air Conditioner
    
    case 'vacuum cleaners':
      return 'https://m.media-amazon.com/images/I/71l+J+JW5JL._AC_SL1500_.jpg'; // Dyson Vacuum
    
    case 'smart screens':
      return 'https://m.media-amazon.com/images/I/71xMxbdxrsL._AC_SL1500_.jpg'; // Echo Show
      
    default:
      return 'https://m.media-amazon.com/images/I/71xMxbdxrsL._AC_SL1500_.jpg'; // Default Amazon product
  }
};

// Maps game titles to appropriate image URLs based on keywords
export const getGameImage = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('souls') || lowerTitle.includes('legend') || lowerTitle.includes('ring')) {
    return 'https://m.media-amazon.com/images/I/618NO+DUMSL._SL1000_.jpg'; // Elden Ring
  } else if (lowerTitle.includes('horizon') || lowerTitle.includes('west') || lowerTitle.includes('quest')) {
    return 'https://m.media-amazon.com/images/I/81ikKScVvOL._SL1500_.jpg'; // Horizon Forbidden West
  } else if (lowerTitle.includes('last') || lowerTitle.includes('us') || lowerTitle.includes('survival')) {
    return 'https://m.media-amazon.com/images/I/71p7CmJ-tXL._SL1374_.jpg'; // The Last of Us Part II
  } else if (lowerTitle.includes('cyber') || lowerTitle.includes('punk') || lowerTitle.includes('future')) {
    return 'https://m.media-amazon.com/images/I/81Fjf7CXsoL._SL1500_.jpg'; // Cyberpunk 2077
  } else if (lowerTitle.includes('ghost') || lowerTitle.includes('tsushima') || lowerTitle.includes('samurai')) {
    return 'https://m.media-amazon.com/images/I/81gWiLu63JL._SL1500_.jpg'; // Ghost of Tsushima
  } else if (lowerTitle.includes('death') || lowerTitle.includes('strand')) {
    return 'https://m.media-amazon.com/images/I/61FkiLqf9vL._SL1000_.jpg'; // Death Stranding
  } else {
    // Default game image
    return 'https://m.media-amazon.com/images/I/618NO+DUMSL._SL1000_.jpg'; // Elden Ring
  }
};

// Maps iPhone models to appropriate prices based on Amazon pricing
export const getIPhonePrice = (model: string): number => {
  const lowerModel = model.toLowerCase();
  
  if (lowerModel.includes('17 ultra')) {
    return 1799; // iPhone 17 Ultra (hypothetical)
  } else if (lowerModel.includes('17 pro max')) {
    return 1599; // iPhone 17 Pro Max (hypothetical)
  } else if (lowerModel.includes('17 pro')) {
    return 1399; // iPhone 17 Pro (hypothetical)
  } else if (lowerModel.includes('17')) {
    return 1099; // iPhone 17 (hypothetical)
  } else if (lowerModel.includes('16 pro max')) {
    return 1399; // iPhone 16 Pro Max (hypothetical)
  } else if (lowerModel.includes('16 pro')) {
    return 1199; // iPhone 16 Pro (hypothetical)
  } else if (lowerModel.includes('16')) {
    return 999; // iPhone 16 (hypothetical)
  } else if (lowerModel.includes('15 pro max')) {
    return 1199; // iPhone 15 Pro Max
  } else if (lowerModel.includes('15 pro')) {
    return 999; // iPhone 15 Pro
  } else if (lowerModel.includes('15 plus')) {
    return 899; // iPhone 15 Plus
  } else if (lowerModel.includes('15')) {
    return 799; // iPhone 15
  } else if (lowerModel.includes('14 pro max')) {
    return 999; // iPhone 14 Pro Max (now discounted)
  } else if (lowerModel.includes('14 pro')) {
    return 899; // iPhone 14 Pro (now discounted)
  } else if (lowerModel.includes('14 plus')) {
    return 799; // iPhone 14 Plus (now discounted)
  } else if (lowerModel.includes('14')) {
    return 699; // iPhone 14 (now discounted)
  } else if (lowerModel.includes('13 pro max')) {
    return 899; // iPhone 13 Pro Max (now discounted)
  } else if (lowerModel.includes('13 pro')) {
    return 799; // iPhone 13 Pro (now discounted)
  } else if (lowerModel.includes('13')) {
    return 599; // iPhone 13 (now discounted)
  } else if (lowerModel.includes('12 pro max')) {
    return 799; // iPhone 12 Pro Max (now discounted)
  } else if (lowerModel.includes('12 pro')) {
    return 699; // iPhone 12 Pro (now discounted)
  } else if (lowerModel.includes('12')) {
    return 549; // iPhone 12 (now discounted)
  } else if (lowerModel.includes('11 pro max')) {
    return 649; // iPhone 11 Pro Max (now discounted)
  } else if (lowerModel.includes('11 pro')) {
    return 549; // iPhone 11 Pro (now discounted)
  } else if (lowerModel.includes('11')) {
    return 449; // iPhone 11 (now discounted)
  } else if (lowerModel.includes('se')) {
    return 429; // iPhone SE (latest)
  } else if (lowerModel.includes('mini')) {
    return 529; // iPhone Mini (latest)
  } else {
    return 399; // Older models
  }
};

// Get pricing for other products based on their names and categories
export const getProductPrice = (name: string, category: string, brand: string): number => {
  // iPhone prices handled separately
  if (brand.toLowerCase() === 'apple' && (name.toLowerCase().includes('iphone') || category.toLowerCase() === 'phone')) {
    return getIPhonePrice(name);
  }
  
  const lowerName = name.toLowerCase();
  const lowerCategory = category.toLowerCase();
  const lowerBrand = brand.toLowerCase();
  
  // Laptops
  if (lowerCategory === 'laptops' || lowerCategory === 'laptop') {
    if (lowerBrand === 'apple') {
      if (lowerName.includes('macbook pro')) {
        return lowerName.includes('16') ? 2499 : 1999;
      } else if (lowerName.includes('macbook air')) {
        return lowerName.includes('m3') ? 1299 : 999;
      }
    } else if (lowerBrand === 'dell') {
      if (lowerName.includes('xps')) {
        return 1699;
      } else if (lowerName.includes('inspiron')) {
        return 899;
      }
    } else if (lowerBrand === 'hp') {
      if (lowerName.includes('spectre')) {
        return 1499;
      } else if (lowerName.includes('pavilion')) {
        return 749;
      }
    } else if (lowerBrand === 'lenovo') {
      if (lowerName.includes('thinkpad')) {
        return 1399;
      } else if (lowerName.includes('yoga')) {
        return 1099;
      }
    } else if (lowerBrand === 'microsoft') {
      if (lowerName.includes('surface laptop')) {
        return 1299;
      } else if (lowerName.includes('surface pro')) {
        return 1099;
      }
    }
    return 999; // Default laptop price
  }
  
  // Smartphones (non-iPhone)
  if (lowerCategory === 'smartphones' || lowerCategory === 'phone' || lowerCategory === 'mobile') {
    if (lowerBrand === 'samsung') {
      if (lowerName.includes('galaxy s23 ultra')) {
        return 1199;
      } else if (lowerName.includes('galaxy s23')) {
        return 899;
      } else if (lowerName.includes('galaxy s22')) {
        return 699;
      } else if (lowerName.includes('galaxy note')) {
        return 999;
      } else if (lowerName.includes('galaxy a')) {
        return 449;
      }
    } else if (lowerBrand === 'google') {
      if (lowerName.includes('pixel 7 pro')) {
        return 899;
      } else if (lowerName.includes('pixel 7')) {
        return 599;
      } else if (lowerName.includes('pixel 6')) {
        return 499;
      }
    } else if (lowerBrand === 'oneplus') {
      if (lowerName.includes('11')) {
        return 799;
      } else if (lowerName.includes('10')) {
        return 699;
      } else if (lowerName.includes('nord')) {
        return 499;
      }
    } else if (lowerBrand === 'xiaomi') {
      if (lowerName.includes('13')) {
        return 899;
      } else if (lowerName.includes('12')) {
        return 749;
      } else if (lowerName.includes('note')) {
        return 499;
      }
    }
    return 599; // Default smartphone price
  }
  
  // Tablets
  if (lowerCategory === 'tablets' || lowerCategory === 'tablet') {
    if (lowerBrand === 'apple') {
      if (lowerName.includes('ipad pro')) {
        return lowerName.includes('12.9') ? 1099 : 799;
      } else if (lowerName.includes('ipad air')) {
        return 599;
      } else if (lowerName.includes('ipad mini')) {
        return 499;
      } else if (lowerName.includes('ipad')) {
        return 399;
      }
    } else if (lowerBrand === 'samsung') {
      if (lowerName.includes('tab s8 ultra')) {
        return 1099;
      } else if (lowerName.includes('tab s8+')) {
        return 899;
      } else if (lowerName.includes('tab s8')) {
        return 699;
      } else if (lowerName.includes('tab a')) {
        return 279;
      }
    } else if (lowerBrand === 'microsoft') {
      if (lowerName.includes('surface pro')) {
        return 999;
      }
    }
    return 499; // Default tablet price
  }
  
  // Gaming Consoles
  if (lowerCategory === 'gaming consoles' || lowerCategory === 'console') {
    if (lowerBrand === 'sony' || lowerBrand === 'playstation') {
      if (lowerName.includes('playstation 5') || lowerName.includes('ps5')) {
        return lowerName.includes('digital') ? 399 : 499;
      } else if (lowerName.includes('playstation 4') || lowerName.includes('ps4')) {
        return lowerName.includes('pro') ? 399 : 299;
      }
    } else if (lowerBrand === 'microsoft' || lowerBrand === 'xbox') {
      if (lowerName.includes('series x')) {
        return 499;
      } else if (lowerName.includes('series s')) {
        return 299;
      } else if (lowerName.includes('one x')) {
        return 399;
      } else if (lowerName.includes('one s')) {
        return 299;
      }
    } else if (lowerBrand === 'nintendo') {
      if (lowerName.includes('switch')) {
        if (lowerName.includes('oled')) {
          return 349;
        } else if (lowerName.includes('lite')) {
          return 199;
        }
        return 299;
      }
    }
    return 399; // Default console price
  }
  
  // TVs
  if (lowerCategory === 'tvs' || lowerCategory === 'tv') {
    if (lowerBrand === 'samsung') {
      if (lowerName.includes('8k')) {
        return 2999;
      } else if (lowerName.includes('qled')) {
        return 1499;
      } else if (lowerName.includes('crystal')) {
        return 799;
      }
    } else if (lowerBrand === 'lg') {
      if (lowerName.includes('oled')) {
        return 1799;
      } else if (lowerName.includes('nanocell')) {
        return 999;
      } else if (lowerName.includes('uhd')) {
        return 699;
      }
    } else if (lowerBrand === 'sony') {
      if (lowerName.includes('bravia')) {
        return 1599;
      }
    } else if (lowerBrand === 'tcl') {
      if (lowerName.includes('6-series')) {
        return 899;
      } else if (lowerName.includes('5-series')) {
        return 649;
      } else if (lowerName.includes('4-series')) {
        return 399;
      }
    }
    return 799; // Default TV price
  }
  
  // Headphones
  if (lowerCategory === 'headphones' || lowerCategory === 'earbuds' || lowerCategory === 'earphones') {
    if (lowerBrand === 'apple') {
      if (lowerName.includes('airpods pro')) {
        return 249;
      } else if (lowerName.includes('airpods max')) {
        return 549;
      } else if (lowerName.includes('airpods')) {
        return 179;
      }
    } else if (lowerBrand === 'sony') {
      if (lowerName.includes('wh-1000xm5')) {
        return 399;
      } else if (lowerName.includes('wh-1000xm4')) {
        return 349;
      } else if (lowerName.includes('wf-1000xm4')) {
        return 279;
      }
    } else if (lowerBrand === 'bose') {
      if (lowerName.includes('quietcomfort') || lowerName.includes('qc')) {
        return 329;
      } else if (lowerName.includes('soundsport')) {
        return 179;
      }
    } else if (lowerBrand === 'samsung') {
      if (lowerName.includes('galaxy buds pro')) {
        return 199;
      } else if (lowerName.includes('galaxy buds')) {
        return 149;
      }
    }
    return 199; // Default headphones price
  }
  
  // PC Accessories
  if (lowerCategory === 'pc accessories' || lowerCategory === 'accessories') {
    if (lowerName.includes('mouse')) {
      if (lowerBrand === 'logitech') {
        if (lowerName.includes('mx master')) {
          return 99;
        } else if (lowerName.includes('g pro')) {
          return 149;
        }
      } else if (lowerBrand === 'razer') {
        return 79;
      }
      return 49; // Default mouse price
    } else if (lowerName.includes('keyboard')) {
      if (lowerBrand === 'logitech') {
        return 129;
      } else if (lowerBrand === 'razer')) {
        return 149;
      } else if (lowerBrand === 'corsair')) {
        return 169;
      }
      return 99; // Default keyboard price
    } else if (lowerName.includes('monitor')) {
      if (lowerName.includes('gaming')) {
        return 349;
      } else if (lowerName.includes('4k')) {
        return 399;
      }
      return 249; // Default monitor price
    }
    return 79; // Default accessory price
  }
  
  // Games
  if (lowerCategory === 'games' || lowerCategory === 'video games') {
    if (lowerName.includes('deluxe') || lowerName.includes('collector') || lowerName.includes('ultimate')) {
      return 89;
    } else if (lowerName.includes('new') || lowerName.includes('2023')) {
      return 69;
    }
    return 59; // Default game price
  }
  
  // Appliances
  if (lowerCategory === 'microwaves') {
    return 149;
  } else if (lowerCategory === 'washing machines') {
    return 549;
  } else if (lowerCategory === 'refrigerators') {
    return 1199;
  } else if (lowerCategory === 'air conditioners') {
    return 349;
  } else if (lowerCategory === 'vacuum cleaners') {
    return 299;
  } else if (lowerCategory === 'smart screens') {
    return 229;
  }
  
  // Default fallback price if nothing matches
  return 299;
};
