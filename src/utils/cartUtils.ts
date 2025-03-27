import { Product } from '@/types/product';

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
  let basePrice = product.price;
  
  // Apply discount if available
  if (product.brand && discounts[product.brand] && discounts[product.brand].expiresAt > Date.now()) {
    basePrice = basePrice * (1 - discounts[product.brand].value / 100);
  } else if (discounts['All'] && discounts['All'].expiresAt > Date.now()) {
    basePrice = basePrice * (1 - discounts['All'].value / 100);
  }
  
  // Apply product-specific discount if available (from admin)
  if (product.discount && product.discount > 0) {
    basePrice = basePrice * (1 - product.discount / 100);
  }
  
  // Calculate price with accessories
  let totalPrice = basePrice;
  
  // Add accessory prices if selected
  if (product.accessories) {
    const accessoriesPrice = product.accessories
      .filter(acc => acc.selected)
      .reduce((sum, acc) => sum + acc.price, 0);
    
    totalPrice += accessoriesPrice;
  }
  
  return totalPrice * (product.quantity || 1);
};
