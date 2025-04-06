
// Add or update this function to handle undefined values safely
export const getHeadphoneImage = (name: string, brand: string): string => {
  const safeName = name || '';
  const safeBrand = brand || '';
  
  if (safeName.toLowerCase().includes('quietcomfort') && safeBrand.toLowerCase() === 'bose') {
    return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
  }
  
  if (safeName.toLowerCase().includes('wh-1000xm4') && safeBrand.toLowerCase() === 'sony') {
    return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
  }
  
  if (safeBrand.toLowerCase() === 'apple') {
    return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
  }
  
  if (safeBrand.toLowerCase() === 'bose') {
    return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
  }
  
  // Sports headphones image
  if (safeName.toLowerCase().includes('sport') || (safeName.toLowerCase().includes('wireless') && safeName.toLowerCase().includes('earbud'))) {
    return '/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png';
  }
  
  // Default headphone image
  return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
};

// Add a function to get category-specific images
export const getCategoryImage = (category: string): string => {
  const safeCategory = category || '';
  
  switch (safeCategory.toLowerCase()) {
    case 'headphones':
      return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
    case 'smartphones':
    case 'phone':
      return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
    case 'tablets':
      return '/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png';
    case 'laptops':
      return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
    case 'pc accessories':
      return '/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png';
    case 'gaming consoles':
      return '/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png';
    case 'tvs':
      return '/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png';
    case 'refrigerators':
      return '/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png';
    case 'air conditioners':
      return '/lovable-uploads/a964141c-5fe9-49ec-9aa0-6b0bd558181c.png';
    case 'washing machines':
      return '/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png';
    case 'microwaves':
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    case 'vacuum cleaners':
      return '/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png';
    default:
      return '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
  }
};
