
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

// Add the getCategoryImage function that's being imported in additionalProducts.ts
export const getCategoryImage = (category: string, brand: string): string => {
  const lowerCategory = category.toLowerCase();
  const lowerBrand = brand.toLowerCase();
  
  // Map categories to their default images
  if (lowerCategory === 'phone' || lowerCategory === 'smartphones') {
    if (lowerBrand === 'apple') {
      return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
    } else if (lowerBrand === 'samsung') {
      return '/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png';
    } else if (lowerBrand === 'google') {
      return '/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png';
    }
    return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
  }
  
  if (lowerCategory === 'laptop') {
    if (lowerBrand === 'apple') {
      return '/lovable-uploads/fc1b00d0-a962-4050-9b43-2b36399b0651.png';
    } else if (lowerBrand === 'google') {
      return '/lovable-uploads/6b47797a-7950-4e45-9ec1-b49920bedce3.png';
    }
    return '/lovable-uploads/f36c4267-74e8-4514-8f6d-ba947eea3a13.png';
  }
  
  if (lowerCategory === 'gaming consoles') {
    if (lowerBrand === 'nintendo') {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    } else if (lowerBrand === 'sony' || lowerBrand === 'playstation') {
      return '/lovable-uploads/245080f6-be80-47c6-b153-72bc982b50ac.png';
    } else if (lowerBrand === 'microsoft' || lowerBrand === 'xbox') {
      return '/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png';
    }
    return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
  }
  
  if (lowerCategory === 'headphones') {
    return getHeadphoneImage(undefined, brand);
  }
  
  if (lowerCategory === 'tvs') {
    return '/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png';
  }
  
  if (lowerCategory === 'refrigerators' || lowerCategory.includes('refrigerator') || lowerCategory.includes('fridge')) {
    // Mini refrigerators get a specific image
    if (lowerCategory.includes('mini')) {
      return '/lovable-uploads/0043f050-6bed-4f97-bb85-96fb6a0dffcd.png';
    }
    return '/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png';
  }
  
  if (lowerCategory === 'vacuum cleaners') {
    if (lowerBrand === 'irobot') {
      return '/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png';
    }
    return '/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png';
  }
  
  if (lowerCategory === 'microwaves') {
    if (lowerBrand === 'samsung') {
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    } else if (lowerBrand === 'lg') {
      return '/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png';
    } else if (lowerBrand === 'whirlpool') {
      return '/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png';
    } else if (lowerBrand === 'panasonic') {
      return '/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png';
    }
    return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
  }
  
  if (lowerCategory === 'washing machines') {
    return '/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png';
  }
  
  if (lowerCategory === 'air conditioners') {
    return '/lovable-uploads/a964141c-5fe9-49ec-9aa0-6b0bd558181c.png';
  }
  
  if (lowerCategory === 'smart screens') {
    if (lowerBrand === 'samsung') {
      if (category.toLowerCase().includes('digital frame')) {
        return '/lovable-uploads/15fa551c-cf90-4a18-b949-a21c2a6f44d4.png';
      } else if (category.toLowerCase().includes('smart digital display')) {
        return '/lovable-uploads/f4d18f61-e011-41e1-8945-0862b8e9cb22.png';
      } else if (category.toLowerCase().includes('digital signage')) {
        return '/lovable-uploads/e4e5c805-99ee-44b2-bac6-a7549cd85562.png';
      } else if (category.toLowerCase().includes('interactive panel')) {
        return '/lovable-uploads/83220acc-b41f-488f-996c-70c790349093.png';
      }
    }
    return '/lovable-uploads/15fa551c-cf90-4a18-b949-a21c2a6f44d4.png';
  }
  
  if (lowerCategory === 'tablets') {
    return '/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png';
  }
  
  if (lowerCategory === 'pc accessories') {
    if (lowerCategory.includes('keyboard')) {
      return '/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png';
    }
  }
  
  // Default image for other categories
  return '/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png';
};

// Add the getGameImage function that may be imported in additionalProducts.ts
export const getGameImage = (gameName: string): string => {
  const lowerName = gameName.toLowerCase();
  
  if (lowerName.includes('battlefield')) {
    return '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png';
  }
  
  if (lowerName.includes('rainbow six')) {
    return '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png';
  }
  
  if (lowerName.includes('call of duty')) {
    return '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png';
  }
  
  if (lowerName.includes('cyberpunk')) {
    return '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png';
  }
  
  if (lowerName.includes('death stranding')) {
    return '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png';
  }
  
  if (lowerName.includes('horizon kings') && lowerName.includes('simulation')) {
    return '/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png';
  }
  
  if (lowerName.includes('world of warriors') && lowerName.includes('racing')) {
    return '/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png';
  }
  
  if (lowerName.includes('ultimate fantasy') && lowerName.includes('racing')) {
    return '/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png';
  }
  
  if (lowerName.includes('red dead redemption')) {
    return '/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png';
  }
  
  // Default game image
  return '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png';
};
