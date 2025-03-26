import { productData } from '../data/productData';

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

export const updateProductsData = () => {
  // Update game prices to have a minimum of $34.99
  // And fix Call of Duty: Warzone price
  const updatedProducts = productData.map(product => {
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
