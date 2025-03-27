
// Function to get appropriate image URL for a category
export const getCategoryImage = (category: string, brand: string): string => {
  if (category === 'Phone' || category === 'Smartphones') {
    if (brand === 'Samsung') {
      return '/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png';
    } else if (brand === 'Google') {
      return '/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png';
    } else {
      return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
    }
  } else if (category === 'Laptop' || category === 'Laptops') {
    if (brand === 'Google' || (brand.toLowerCase().includes('google') && brand.toLowerCase().includes('chromebook'))) {
      return '/lovable-uploads/42c20503-f943-4848-985f-0972f82629cc.png';
    } else {
      return '/lovable-uploads/42c20503-f943-4848-985f-0972f82629cc.png';
    }
  } else if (category === 'Gaming Consoles') {
    if (brand === 'Nintendo' || brand.includes('Nintendo')) {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    } else if (brand === 'Sony' || brand.includes('PlayStation')) {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    } else {
      return '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
    }
  } else if (category === 'Headphones') {
    if (brand === 'Bose') {
      return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
    } else {
      return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
    }
  } else if (category === 'Microwaves') {
    if (brand === 'Samsung') {
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    } else if (brand === 'LG') {
      return '/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png';
    } else if (brand === 'Whirlpool') {
      return '/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png';
    } else if (brand === 'Panasonic') {
      return '/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png';
    } else {
      return '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
    }
  } else if (category === 'PC Accessories' && category.includes('Keyboards')) {
    // Use the new keyboard image for all keyboards
    return '/lovable-uploads/2d37dabc-ed4e-4de1-bc85-32c8c2efe88c.png';
  } else if (category === 'Tablets' || category === 'Tablet') {
    // Use the new tablet image for all tablets
    return '/lovable-uploads/13233859-ad6b-4338-b9aa-5e3ab58c9eb7.png';
  }
  
  // Default image if no specific one is found
  return '/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png';
};

// Function to get image URL for games
export const getGameImage = (name: string): string => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('battlefield')) {
    return '/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png';
  } else if (nameLower.includes('rainbow six')) {
    return '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png';
  } else if (nameLower.includes('call of duty')) {
    return '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png';
  } else if (nameLower.includes('death stranding')) {
    return '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png';
  } else if (nameLower.includes('cyberpunk')) {
    return '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png';
  } else if (nameLower.includes('racing') && nameLower.includes('horizon')) {
    return '/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png';
  } else if (nameLower.includes('racing') && nameLower.includes('warriors')) {
    return '/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png';
  } else if (nameLower.includes('racing') && nameLower.includes('fantasy')) {
    return '/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png';
  }
  
  // Default game image
  return '/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png';
};

// Function to get headphone image based on brand and name
export const getHeadphoneImage = (name: string, brand: string): string => {
  const nameLower = name.toLowerCase();
  const brandLower = brand.toLowerCase();
  
  if (nameLower.includes('over-ear') || nameLower.includes('over ear')) {
    return '/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png';
  } else if (nameLower.includes('in-ear') || nameLower.includes('in ear') || 
             nameLower.includes('wireless') || nameLower.includes('buds')) {
    return '/lovable-uploads/b716e87d-a752-4422-aafa-94b38c1dbff3.png';
  } else if (nameLower.includes('sports') || nameLower.includes('active') || 
             nameLower.includes('fitness') || brandLower.includes('jaybird')) {
    return '/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png';
  } else if (brandLower.includes('bose')) {
    return '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
  }
  
  // Default headphone image
  return '/lovable-uploads/b48e7d14-29ab-4227-a09c-eb324e7620d7.png';
};

