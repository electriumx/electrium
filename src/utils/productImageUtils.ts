
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
