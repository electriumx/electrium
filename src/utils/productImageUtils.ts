
// Maps product categories to appropriate image URLs from Google
export const getCategoryImage = (category: string, brand?: string): string => {
  // These URLs point to Google-like product images
  switch (category.toLowerCase()) {
    case 'smartphones':
    case 'phone':
      return brand?.toLowerCase() === 'apple' 
        ? 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009284541'  // iPhone 15 Pro
        : 'https://lh3.googleusercontent.com/spp/AE_ITi1D72-F7PydJdVTGgKbTrpvrZEzZC7L0a3Wv_QQMF3M4FUGhdJBrPjQlJnVoK65QbPLm0CjOZ_lR3m1Ws5xKT5-Y2JzDQcjAUcoGkALIxRQYMC67lnGFOUQUOUw2TIAuFEHKvCN8oUTqEkQ5C3R7wKNvWkTGJSQ_k_8=s512-rw-pd-pc0x0'; // Google Pixel

    case 'laptops':
      return brand?.toLowerCase() === 'apple'
        ? 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229'  // MacBook Pro
        : 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-9315-nt-blue-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=643&qlt=100,1&resMode=sharp2&size=643,402&chrss=full'; // Dell XPS
    
    case 'gaming consoles':
      return brand?.toLowerCase() === 'playstation' 
        ? 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$'     // PlayStation 5
        : 'https://assets.xboxservices.com/assets/a3/a2/a3a2a302-214c-4a88-a001-b19ae3e76983.jpg?n=204202N_Gallery-0_11_1350x759.jpg';    // Xbox Series X
    
    case 'tvs':
      return brand?.toLowerCase() === 'samsung'
        ? 'https://image-us.samsung.com/SamsungUS/home/television-home-theater/tvs/tvs/01192022/NeoQLED-S95C-2023/NQ9C_75-55_FrontV_Black.jpg'  // Samsung QLED
        : 'https://www.lg.com/us/images/tvs/md08003300/gallery/D-01.jpg'; // LG OLED
    
    case 'headphones':
      return brand?.toLowerCase() === 'sony' 
        ? 'https://electronics.sony.com/image/c13c1c7f0cbfcfc5ff488e5fb0ad1c98?fmt=png-alpha&wid=600&hei=600'  // Sony WH-1000XM5
        : 'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_45/product_silo_images/QC45_LEFT_MIDNIGHTBLUE.png/jcr:content/renditions/cq5dam.web.1280.1280.png'; // Bose QuietComfort
    
    case 'tablets':
      return brand?.toLowerCase() === 'apple'
        ? 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202210-11inch-space-gray-wifi?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1664411207213'  // iPad Pro
        : 'https://image-us.samsung.com/us/smartphones/galaxy-tab-s8-ultra/gallery/1-14-22/Gallery-Q8-Ultra-Graphite-1600x1200.jpg'; // Samsung Galaxy Tab
    
    case 'pc accessories':
      return brand?.toLowerCase() === 'logitech'
        ? 'https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-pale-gray-top-view.png'  // Logitech MX Master
        : 'https://assets3.razerzone.com/k3HtgfS-H8BgU1v9_mICDRwJSrM=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh36%2Fh45%2F9392221806622%2F211026-blackwidow-v3-black-1500x1000-1.jpg'; // Razer BlackWidow
    
    case 'games':
      if (brand?.toLowerCase().includes('playstation')) {
        return 'https://image.api.playstation.com/vulcan/ap/rnd/202007/0217/kF7P6BZJi80JywPqCe2NB2rD.jpg'; // Ghost of Tsushima
      } else if (brand?.toLowerCase().includes('pc')) {
        return 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKH3DJ2viC0iGvV2ka1sOqUN.jpg'; // Cyberpunk 2077
      } else {
        return 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/8ifJ8dxNOAMWHJi1vHLtUUZK.jpg'; // Elden Ring
      }
    
    // Appliance categories
    case 'microwaves':
      return 'https://images.thdstatic.com/productImages/c06dbb85-e7d5-47f5-898a-c26e5a43ef2e/svn/toshiba-countertop-microwaves-ml2-ec10sa-bs-64_600.jpg'; // Toshiba Microwave
    
    case 'washing machines':
      return 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6462/6462171_sd.jpg'; // Samsung Washer
    
    case 'refrigerators':
      return 'https://www.lg.com/us/images/refrigerators/md07000130/gallery/desktop-01.jpg'; // LG Refrigerator
    
    case 'air conditioners':
      return 'https://images.thdstatic.com/productImages/a6d87c32-c1c7-405d-9ab9-38c10ec9f34c/svn/white-midea-portable-air-conditioners-map08r1cwtc-64_600.jpg'; // Midea Air Conditioner
    
    case 'vacuum cleaners':
      return 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/global/products/vacuum-cleaners/v15-detect/pdp/primary/fullwidth/V15-Detect-Fluffy-PDP-Floor-dock-Fullwidth-1536x864.jpg'; // Dyson Vacuum
    
    case 'smart screens':
      return 'https://m.media-amazon.com/images/I/71yKr-O4iUL._AC_UF1000,1000_QL80_.jpg'; // Echo Show
      
    default:
      return 'https://m.media-amazon.com/images/I/71xMxbdxrsL._AC_SL1500_.jpg'; // Default product
  }
};

// Maps game titles to appropriate image URLs based on keywords
export const getGameImage = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('elden ring')) {
    return 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg';
  } else if (lowerTitle.includes('souls') || lowerTitle.includes('legend') || lowerTitle.includes('ring')) {
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/8ifJ8dxNOAMWHJi1vHLtUUZK.jpg'; // Elden Ring
  } else if (lowerTitle.includes('horizon') || lowerTitle.includes('west') || lowerTitle.includes('quest')) {
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HO8vkMEFzpv5NVPjoWXhfnx9.png'; // Horizon Forbidden West
  } else if (lowerTitle.includes('last') || lowerTitle.includes('us') || lowerTitle.includes('survival')) {
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png'; // The Last of Us Part II
  } else if (lowerTitle.includes('cyber') || lowerTitle.includes('punk') || lowerTitle.includes('future')) {
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKH3DJ2viC0iGvV2ka1sOqUN.jpg'; // Cyberpunk 2077
  } else if (lowerTitle.includes('ghost') || lowerTitle.includes('tsushima') || lowerTitle.includes('samurai')) {
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202007/0217/kF7P6BZJi80JywPqCe2NB2rD.jpg'; // Ghost of Tsushima
  } else if (lowerTitle.includes('death') || lowerTitle.includes('strand')) {
    return 'https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding.jpg'; // Death Stranding
  } else {
    // Default game image
    return 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/8ifJ8dxNOAMWHJi1vHLtUUZK.jpg'; // Elden Ring
  }
};

// Maps iPhone models to appropriate prices based on pricing
export const getIPhonePrice = (model: string): number => {
  const lowerModel = model.toLowerCase();
  
  if (lowerModel.includes('16 ultra')) {
    return 1899; // iPhone 16 Ultra 
  } else if (lowerModel.includes('16 pro max')) {
    return 1699; // iPhone 16 Pro Max
  } else if (lowerModel.includes('16 pro')) {
    return 1499; // iPhone 16 Pro
  } else if (lowerModel.includes('16 plus')) {
    return 1299; // iPhone 16 Plus
  } else if (lowerModel.includes('16')) {
    return 1099; // iPhone 16
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
      } else if (lowerBrand === 'razer') {
        return 149;
      } else if (lowerBrand === 'corsair') {
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
