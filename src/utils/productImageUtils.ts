
export const getHeadphoneImage = (name: string | undefined, brand: string | undefined): string => {
  const productName = name ? name.toLowerCase() : "";
  const productBrand = brand ? brand.toLowerCase() : "";
  
  // Default headphone image if name or brand is undefined
  if (!name || !brand) {
    return '/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png';
  }
  
  // Sony WH-1000XM4 specific image
  if (productBrand === 'sony' && productName.includes('wh-1000xm4')) {
    return '/lovable-uploads/6d5d9d75-2a70-4aef-8210-c87984af388f.png';
  }
  
  // Brand-specific images
  if (productBrand === 'bose') {
    if (productName.includes('quietcomfort')) {
      return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
    }
    return '/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png';
  }
  
  if (productBrand === 'sony') {
    return '/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png';
  }
  
  if (productBrand === 'apple' || productName.includes('airpods')) {
    return '/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png';
  }
  
  if (productBrand === 'samsung') {
    return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
  }
  
  if (productBrand === 'jbl') {
    return '/lovable-uploads/ce523ec7-d793-4a5d-b548-b1f7a0193bf1.png';
  }
  
  if (productBrand === 'beats' || productName.includes('beats')) {
    return '/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png';
  }
  
  // Default headphone image
  return '/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png';
};

export const getCategoryImage = (category: string | undefined, brand: string | undefined): string => {
  const safeCategory = category ? category.toLowerCase() : "";
  const safeBrand = brand ? brand.toLowerCase() : "";
  
  // Default image if category or brand is undefined
  if (!category || !brand) {
    return '/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png';
  }
  
  // Categories with specific images
  if (safeCategory === 'phone' || safeCategory === 'smartphones') {
    if (safeBrand === 'apple' || safeBrand.includes('iphone')) {
      return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
    }
    if (safeBrand === 'samsung') {
      return '/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png';
    }
    if (safeBrand === 'google' || safeBrand.includes('pixel')) {
      return '/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png';
    }
    if (safeBrand === 'xiaomi') {
      return '/lovable-uploads/19334ecf-42e6-4db9-8443-15db93e88166.png';
    }
  }
  
  if (safeCategory === 'laptop') {
    if (safeBrand === 'apple' || safeBrand.includes('macbook')) {
      return '/lovable-uploads/f36c4267-74e8-4514-8f6d-ba947eea3a13.png';
    }
    if (safeBrand === 'google' && brand.toLowerCase().includes('chromebook')) {
      return '/lovable-uploads/6b47797a-7950-4e45-9ec1-b49920bedce3.png';
    }
  }
  
  if (safeCategory === 'gaming consoles') {
    if (safeBrand === 'nintendo' || safeBrand.includes('switch')) {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    }
    if (safeBrand === 'sony' || safeBrand.includes('playstation')) {
      return '/lovable-uploads/245080f6-be80-47c6-b153-72bc982b50ac.png';
    }
    if (safeBrand === 'microsoft' || safeBrand.includes('xbox')) {
      return '/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png';
    }
  }
  
  if (safeCategory === 'headphones') {
    return getHeadphoneImage(undefined, brand);
  }
  
  if (safeCategory === 'refrigerators') {
    return '/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png';
  }
  
  if (safeCategory === 'microwaves') {
    if (safeBrand === 'samsung') {
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    }
    if (safeBrand === 'lg') {
      return '/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png';
    }
    if (safeBrand === 'whirlpool') {
      return '/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png';
    }
    if (safeBrand === 'panasonic') {
      return '/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png';
    }
  }
  
  if (safeCategory === 'vacuum cleaners') {
    if (safeBrand === 'irobot') {
      return '/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png';
    }
    return '/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png';
  }
  
  if (safeCategory === 'tvs') {
    if (safeBrand === 'samsung' && brand.toLowerCase().includes('oled')) {
      return '/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png';
    }
  }
  
  // Default placeholder image for other categories
  return '/placeholder.svg';
};

export const getGameImage = (name: string | undefined): string => {
  const safeName = name ? name.toLowerCase() : "";
  
  // Return default image if name is undefined
  if (!name) {
    return '/placeholder.svg';
  }
  
  // Games with specific images
  if (safeName.includes('battlefield')) {
    return '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png';
  }
  
  if (safeName.includes('rainbow six')) {
    return '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png';
  }
  
  if (safeName.includes('call of duty')) {
    return '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png';
  }
  
  if (safeName.includes('cyberpunk')) {
    return '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png';
  }
  
  if (safeName.includes('death stranding')) {
    return '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png';
  }
  
  if (safeName.includes('elden ring')) {
    return 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg';
  }
  
  if (safeName.includes('red dead redemption')) {
    return '/lovable-uploads/1748b1d8-8870-49dc-a082-62aa0268034f.png';
  }
  
  if (safeName.includes('horizon kings') && safeName.includes('simulation')) {
    return '/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png';
  }
  
  if (safeName.includes('world of warriors') && safeName.includes('racing')) {
    return '/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png';
  }
  
  if (safeName.includes('ultimate fantasy') && safeName.includes('racing')) {
    return '/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png';
  }
  
  // Default placeholder for games
  return '/placeholder.svg';
};
