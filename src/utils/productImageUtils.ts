
import { products } from '../data/productData';

export const getProductImage = (productId: number, productName: string, productBrand: string, productCategory: string): string => {
  const imageName = productName.toLowerCase().replace(/ /g, '-');
  const brandName = productBrand.toLowerCase().replace(/ /g, '-');
  const categoryName = productCategory.toLowerCase().replace(/ /g, '-');

  const imageMap: { [key: string]: string } = {
    'apple-iphone-13': '/lovable-uploads/iphone-13.jpeg',
    'samsung-galaxy-s21': '/lovable-uploads/samsung-galaxy-s21.jpeg',
    'sony-bravia-xr-a90j': '/lovable-uploads/sony-bravia-xr-a90j.jpeg',
    'google-pixel-6': '/lovable-uploads/google-pixel-6.jpeg',
    'microsoft-xbox-series-x': '/lovable-uploads/xbox-series-x.jpeg',
    'xiaomi-mi-11': '/lovable-uploads/xiaomi-mi-11.jpeg',
    'lg-oled-c1': '/lovable-uploads/lg-oled-c1.jpeg',
    'whirlpool-wm-123': '/lovable-uploads/washing-machine.jpeg',
    'dyson-v11-absolute': '/lovable-uploads/dyson-v11.jpeg',
    'bosch-smi68ts06e': '/lovable-uploads/bosch-dishwasher.jpeg',
    'panasonic-nn-st45kw': '/lovable-uploads/panasonic-microwave.jpeg',
    'call-of-duty-warzone': '/lovable-uploads/call-of-duty-warzone.jpeg',
    'assassins-creed-valhalla': '/lovable-uploads/assassins-creed-valhalla.jpeg',
    'cyberpunk-2077': '/lovable-uploads/cyberpunk-2077.jpeg',
  };

  const key = `${brandName}-${imageName}`;
  const categoryKey = `${categoryName}-${imageName}`;

  if (imageMap[key]) {
    return imageMap[key];
  } else if (imageMap[categoryKey]) {
    return imageMap[categoryKey];
  } else {
    return '/lovable-uploads/default-product-image.jpeg';
  }
};

// Add missing exports
export const getHeadphoneImage = (productName: string, brandName: string): string => {
  const defaultImage = '/lovable-uploads/default-product-image.jpeg';
  
  // Special case for Bose QuietComfort products
  if (productName.toLowerCase().includes('quietcomfort') && brandName.toLowerCase() === 'bose') {
    return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
  }
  
  // Default headphone image if specific one not found
  return defaultImage;
};

export const getCategoryImage = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Smartphones': '/lovable-uploads/iphone-13.jpeg',
    'TVs': '/lovable-uploads/sony-bravia-xr-a90j.jpeg',
    'Gaming Consoles': '/lovable-uploads/xbox-series-x.jpeg',
    'Washing Machines': '/lovable-uploads/washing-machine.jpeg',
    'Microwaves': '/lovable-uploads/panasonic-microwave.jpeg',
    'Games': '/lovable-uploads/call-of-duty-warzone.jpeg',
    'Headphones': '/lovable-uploads/headphones-default.jpeg',
    'Speakers': '/lovable-uploads/4d754bb4-c77a-436a-8470-ef066e888a5d.png',
    'Microphones': '/lovable-uploads/55a7c5a8-4ffa-4448-8ada-7591813f3755.png'
  };
  
  return categoryMap[category] || '/lovable-uploads/default-product-image.jpeg';
};

export const getGameImage = (gameName: string): string => {
  const gameMap: { [key: string]: string } = {
    'Call of Duty: Warzone': '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png',
    'Battlefield': '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png',
    'Rainbow Six Siege': '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png',
    'Cyberpunk 2077': '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png',
    'Death Stranding': '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png',
    'Elden Ring': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg'
  };
  
  // Check for partial name matches
  for (const [key, value] of Object.entries(gameMap)) {
    if (gameName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return '/lovable-uploads/default-product-image.jpeg';
};

export const updateProductsData = () => {
  // Update game prices to have a minimum of $34.99
  // And fix Call of Duty: Warzone price
  const updatedProducts = products.map(product => {
    if (product.category === 'Games') {
      // Set Call of Duty: Warzone price specifically
      if (product.name === 'Call of Duty: Warzone') {
        return {
          ...product,
          price: 24.99
        };
      }
      
      // For other games, ensure minimum price is $34.99
      if (product.price < 34.99) {
        return {
          ...product,
          price: 34.99
        };
      }
    }
    
    return product;
  });
  
  return updatedProducts;
};
