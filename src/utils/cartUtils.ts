
import { Product } from '../data/productData';

// Save cart to localStorage
export const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Dispatch custom event to notify other components
  const event = new CustomEvent('cartUpdate', {
    detail: cart
  });
  window.dispatchEvent(event);
};

// Add product to cart with accessories
export const addProductToCart = (product: Product, quantity: number, accessories?: { id: number | string, selected: boolean }[]) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingProductIndex = cart.findIndex((item: Product) => 
    item.id === product.id && 
    item.selectedColor === product.selectedColor
  );
  
  // If product has accessories and they're passed, update them on the product
  const productToAdd = { ...product };
  if (accessories && productToAdd.accessories) {
    productToAdd.accessories = productToAdd.accessories.map(acc => {
      const matchingAcc = accessories.find(a => String(a.id) === String(acc.id));
      return matchingAcc ? { ...acc, selected: matchingAcc.selected } : acc;
    });
  }
  
  if (existingProductIndex > -1) {
    // Update existing product
    if (quantity === 0) {
      // Remove product if quantity is 0
      cart.splice(existingProductIndex, 1);
    } else {
      cart[existingProductIndex] = {
        ...productToAdd,
        quantity
      };
    }
  } else if (quantity > 0) {
    // Add new product
    cart.push({
      ...productToAdd,
      quantity
    });
  }
  
  saveCartToLocalStorage(cart);
  return cart;
};

// Calculate total price of a product including accessories
export const calculateProductTotal = (product: Product, discounts: Record<string, { value: number; expiresAt: number; }>) => {
  // First add accessories price to base price
  const basePrice = product.price;
  const accessoriesPrice = product.accessories
    ? product.accessories
        .filter(acc => acc.selected)
        .reduce((sum, acc) => sum + acc.price, 0)
    : 0;
  
  // Calculate total price before discount
  const totalItemPrice = basePrice + accessoriesPrice;
  
  // Then apply discount to the combined price
  let discountedPrice = totalItemPrice;
  
  // Apply brand discount if available
  if (product.brand && discounts[product.brand] && discounts[product.brand].expiresAt > Date.now()) {
    discountedPrice = discountedPrice * (1 - discounts[product.brand].value / 100);
  } else if (discounts['All'] && discounts['All'].expiresAt > Date.now()) {
    discountedPrice = discountedPrice * (1 - discounts['All'].value / 100);
  }
  
  // Apply product-specific discount only if it exists
  if (product.discount && product.discount > 0) {
    discountedPrice = discountedPrice * (1 - product.discount / 100);
  }
  
  // Multiply by quantity for final total
  const totalPrice = discountedPrice * (product.quantity || 1);
  
  // Make sure we have a valid reviews array (or empty array)
  if (typeof product.reviews === 'number' || product.reviews === undefined) {
    product.reviews = [] as any;
  }
  
  return totalPrice;
};

// Get included accessories text for a product
export const getIncludedAccessoriesText = (product: Product): string => {
  if (!product.accessories || product.accessories.length === 0) {
    return "No accessories included";
  }
  
  const selectedAccessories = product.accessories.filter(acc => acc.selected);
  
  if (selectedAccessories.length === 0) {
    return "No accessories included";
  }
  
  return selectedAccessories.map(acc => `${acc.name} (+$${acc.price.toFixed(2)})`).join(', ');
};

// Calculate total accessories price
export const calculateAccessoriesTotal = (product: Product): number => {
  if (!product.accessories) return 0;
  
  return product.accessories
    .filter(acc => acc.selected)
    .reduce((sum, acc) => sum + acc.price, 0);
};
