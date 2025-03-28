export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  colors: string[];
  rating: number;
  stockStatus: string;
  reviews: Review[];
  variations?: Variation[];
  quantity?: number;
  selectedColor?: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Variation {
  type: string;
  options: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Over-ear headphones with noise cancellation and high-quality sound.",
    price: 79.99,
    image: "011a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Sony",
    category: "Electronics",
    colors: ["Black", "Blue", "Silver"],
    rating: 4.5,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "TechLover",
        rating: 4.0,
        comment: "Great sound quality and comfortable to wear.",
        date: "2023-01-15"
      },
      {
        userName: "MusicFan",
        rating: 5.0,
        comment: "Excellent noise cancellation, perfect for travel.",
        date: "2023-02-01"
      }
    ],
    variations: [
      {
        type: "Color",
        options: ["Black", "Blue", "Silver"]
      }
    ]
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support for comfortable seating.",
    price: 149.99,
    image: "021a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Herman Miller",
    category: "Furniture",
    colors: ["Black", "Gray"],
    rating: 4.2,
    stockStatus: "Low Stock",
    reviews: [
      {
        userName: "WorkFromHome",
        rating: 3.0,
        comment: "Good chair, but the armrests could be better.",
        date: "2023-01-20"
      },
      {
        userName: "OfficeWorker",
        rating: 5.0,
        comment: "Very comfortable for long hours of work.",
        date: "2023-02-05"
      }
    ],
    variations: [
      {
        type: "Color",
        options: ["Black", "Gray"]
      }
    ]
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    description: "55-inch smart TV with stunning 4K resolution and HDR support.",
    price: 499.99,
    image: "031a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Samsung",
    category: "Electronics",
    colors: ["Black"],
    rating: 4.7,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "MovieBuff",
        rating: 5.0,
        comment: "Incredible picture quality, perfect for movie nights.",
        date: "2023-01-25"
      },
      {
        userName: "Gamer4K",
        rating: 4.0,
        comment: "Great for gaming with low input lag.",
        date: "2023-02-10"
      }
    ],
    variations: [
      {
        type: "Size",
        options: ["55-inch", "65-inch"]
      }
    ]
  },
  {
    id: 4,
    name: "Stainless Steel Kitchen Knife Set",
    description: "High-quality knife set with a variety of blades for all your cooking needs.",
    price: 89.99,
    image: "041a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Cuisinart",
    category: "Home & Kitchen",
    colors: ["Silver"],
    rating: 4.0,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "ChefInTraining",
        rating: 4.0,
        comment: "Sharp and durable knives, a great addition to my kitchen.",
        date: "2023-01-30"
      },
      {
        userName: "HomeCook",
        rating: 4.0,
        comment: "Good value for the price, but requires regular sharpening.",
        date: "2023-02-15"
      }
    ],
    variations: [
      {
        type: "Pieces",
        options: ["10-Piece", "15-Piece"]
      }
    ]
  },
  {
    id: 5,
    name: "Classic Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and a bill compartment.",
    price: 49.99,
    image: "051a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Fossil",
    category: "Fashion",
    colors: ["Brown", "Black"],
    rating: 4.3,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "StyleConscious",
        rating: 5.0,
        comment: "Stylish and functional wallet, perfect for everyday use.",
        date: "2023-02-01"
      },
      {
        userName: "Minimalist",
        rating: 3.0,
        comment: "Good quality, but a bit bulky for my taste.",
        date: "2023-02-20"
      }
    ],
    variations: [
      {
        type: "Color",
        options: ["Brown", "Black"]
      }
    ]
  },
  {
    id: 6,
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles for maximum comfort.",
    price: 99.99,
    image: "061a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Nike",
    category: "Sports & Outdoors",
    colors: ["Red", "White", "Black"],
    rating: 4.6,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "MarathonRunner",
        rating: 5.0,
        comment: "Excellent shoes for long-distance running.",
        date: "2023-02-05"
      },
      {
        userName: "FitnessFanatic",
        rating: 4.0,
        comment: "Comfortable and supportive, great for workouts.",
        date: "2023-02-25"
      }
    ],
    variations: [
      {
        type: "Size",
        options: ["US 8", "US 9", "US 10", "US 11"]
      }
    ]
  },
  {
    id: 7,
    name: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald that explores themes of wealth, love, and the American Dream.",
    price: 12.99,
    image: "071a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Scribner",
    category: "Books",
    colors: ["N/A"],
    rating: 4.4,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "Bookworm",
        rating: 5.0,
        comment: "A timeless classic that everyone should read.",
        date: "2023-02-10"
      },
      {
        userName: "LitLover",
        rating: 4.0,
        comment: "Well-written and thought-provoking.",
        date: "2023-03-01"
      }
    ]
  },
  {
    id: 8,
    name: "Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt for everyday wear.",
    price: 19.99,
    image: "081a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Uniqlo",
    category: "Fashion",
    colors: ["White", "Black", "Gray", "Navy"],
    rating: 4.1,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "CasualGuy",
        rating: 4.0,
        comment: "Great basic t-shirt, good quality for the price.",
        date: "2023-02-15"
      },
      {
        userName: "EverydayWear",
        rating: 4.0,
        comment: "Comfortable and versatile, perfect for layering.",
        date: "2023-03-05"
      }
    ],
    variations: [
      {
        type: "Size",
        options: ["S", "M", "L", "XL"]
      }
    ]
  },
  {
    id: 9,
    name: "Coffee Maker",
    description: "Automatic coffee maker with a programmable timer and a 12-cup capacity.",
    price: 59.99,
    image: "091a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Mr. Coffee",
    category: "Home & Kitchen",
    colors: ["Black"],
    rating: 4.2,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "CoffeeAddict",
        rating: 5.0,
        comment: "Makes great coffee every morning, easy to use.",
        date: "2023-02-20"
      },
      {
        userName: "MorningPerson",
        rating: 3.0,
        comment: "Good coffee maker, but the carafe is a bit fragile.",
        date: "2023-03-10"
      }
    ]
  },
  {
    id: 10,
    name: "Backpack",
    description: "Durable backpack with multiple compartments for school, work, or travel.",
    price: 39.99,
    image: "101a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "JanSport",
    category: "Fashion",
    colors: ["Black", "Blue", "Red"],
    rating: 4.3,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "StudentLife",
        rating: 4.0,
        comment: "Great backpack for school, fits all my books and laptop.",
        date: "2023-02-25"
      },
      {
        userName: "TravelBug",
        rating: 4.0,
        comment: "Durable and comfortable, perfect for travel.",
        date: "2023-03-15"
      }
    ],
    variations: [
      {
        type: "Color",
        options: ["Black", "Blue", "Red"]
      }
    ]
  },
  {
    id: 11,
    name: "The Witcher 3: Wild Hunt",
    description: "An open-world action role-playing game set in a fantasy world.",
    price: 34.99,
    image: "2a942999-3313-449d-b967-62e9a7853a9a.png",
    brand: "CD Projekt Red",
    category: "Games",
    colors: ["N/A"],
    rating: 4.9,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "GeraltFan",
        rating: 5.0,
        comment: "One of the best games ever made!",
        date: "2023-01-05"
      },
      {
        userName: "RPGMaster",
        rating: 4.5,
        comment: "Amazing story and gameplay.",
        date: "2023-01-20"
      }
    ]
  },
  {
    id: 12,
    name: "Cyberpunk 2077",
    description: "An open-world, action-adventure RPG set in the futuristic Night City.",
    price: 49.99,
    image: "3a942999-3313-449d-b967-62e9a7853a9a.png",
    brand: "CD Projekt Red",
    category: "Games",
    colors: ["N/A"],
    rating: 3.8,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "CyberpunkFan",
        rating: 4.0,
        comment: "Great world and story, but some technical issues.",
        date: "2023-01-10"
      },
      {
        userName: "NightCityGamer",
        rating: 3.5,
        comment: "Promising game, but needs more polish.",
        date: "2023-01-25"
      }
    ]
  },
  {
    id: 13,
    name: "Call of Duty: Warzone",
    description: "A free-to-play battle royale video game for PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, and Microsoft Windows.",
    price: 24.99,
    image: "a964141c-5fe9-49ec-9aa0-6b0bd558181c.png",
    brand: "Activision",
    category: "Games",
    colors: ["Blue", "Black"],
    rating: 4.3,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "GameLover",
        rating: 4.5,
        comment: "Amazing battle royale experience with friends!",
        date: "2023-02-15"
      },
      {
        userName: "ShooterFan",
        rating: 4.0,
        comment: "Great gameplay but some server issues occasionally.",
        date: "2023-01-30"
      }
    ],
    variations: [
      {
        type: "Edition",
        options: ["Standard", "Deluxe"]
      }
    ]
  },
  {
    id: 14,
    name: "FIFA 22",
    description: "A football simulation video game published by Electronic Arts as part of the FIFA series.",
    price: 39.99,
    image: "67a3f208-e588-471a-88d1-c0db17913854.png",
    brand: "EA Sports",
    category: "Games",
    colors: ["Green"],
    rating: 4.1,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "SoccerFan22",
        rating: 4.0,
        comment: "Great football simulation with improved gameplay!",
        date: "2023-02-20"
      }
    ]
  },
  {
    id: 15,
    name: "Minecraft",
    description: "A sandbox video game developed by Mojang Studios where players interact with a fully modifiable three-dimensional environment.",
    price: 34.99,
    image: "b716e87d-a752-4422-aafa-94b38c1dbff3.png",
    brand: "Mojang",
    category: "Games",
    rating: 4.8,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "BlockBuilder",
        rating: 5.0,
        comment: "Endless possibilities and creativity! Best game ever.",
        date: "2023-01-10"
      },
      {
        userName: "MineExplorer",
        rating: 4.5,
        comment: "Hours of fun for all ages. Highly recommended.",
        date: "2023-02-05"
      }
    ]
  },
  {
    id: 16,
    name: "Ghost of Tsushima",
    description: "An action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment.",
    price: 49.99,
    image: "ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png",
    brand: "Sony",
    category: "Games",
    rating: 4.9,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "SamuraiGamer",
        rating: 5.0,
        comment: "Breathtaking visuals and engaging storyline. Masterpiece!",
        date: "2023-03-01"
      }
    ]
  },
  {
    id: 17,
    name: "Logitech MX Master 3",
    description: "Advanced wireless mouse for precise control and customization.",
    price: 99.00,
    image: "f1a3f208-e588-471a-88d1-c0db17913854.png",
    brand: "Logitech",
    category: "Electronics",
    colors: ["Gray", "Black"],
    rating: 4.7,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "TechEnthusiast",
        rating: 5.0,
        comment: "Best mouse I've ever used. Comfortable and precise.",
        date: "2023-03-05"
      },
      {
        userName: "OfficePro",
        rating: 4.5,
        comment: "Great for productivity and multitasking.",
        date: "2023-03-15"
      }
    ]
  },
  {
    id: 18,
    name: "External SSD",
    description: "1TB external solid-state drive for fast data transfer and storage.",
    price: 179.00,
    image: "011a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Samsung",
    category: "Electronics",
    colors: ["Black"],
    rating: 4.6,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "DataHoarder",
        rating: 5.0,
        comment: "Fast and reliable storage solution.",
        date: "2023-03-10"
      },
      {
        userName: "ContentCreator",
        rating: 4.0,
        comment: "Perfect for video editing and large file transfers.",
        date: "2023-03-20"
      }
    ]
  },
  {
    id: 19,
    name: "Mechanical Keyboard",
    description: "High-quality mechanical keyboard with customizable RGB lighting.",
    price: 129.00,
    image: "f1a3f208-e588-471a-88d1-c0db17913854.png",
    brand: "Corsair",
    category: "Electronics",
    colors: ["Black"],
    rating: 4.8,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "KeyboardAddict",
        rating: 5.0,
        comment: "Great feel and sound, perfect for gaming and typing.",
        date: "2023-03-15"
      },
      {
        userName: "GamerPro",
        rating: 4.5,
        comment: "Customizable and responsive, a must-have for gamers.",
        date: "2023-03-25"
      }
    ]
  },
  {
    id: 20,
    name: "Smart Watch",
    description: "Advanced smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications.",
    price: 299.00,
    image: "011a3a57-4443-4599-9966-4982c93908a1.png",
    brand: "Apple",
    category: "Electronics",
    colors: ["Black", "Silver", "Gold"],
    rating: 4.9,
    stockStatus: "In Stock",
    reviews: [
      {
        userName: "FitnessTracker",
        rating: 5.0,
        comment: "Excellent fitness tracking and seamless integration with my iPhone.",
        date: "2023-03-20"
      },
      {
        userName: "TechSavvy",
        rating: 4.5,
        comment: "Stylish and functional, a great addition to my tech collection.",
        date: "2023-03-30"
      }
    ]
  }
];

export const categories = [...new Set(products.map(product => product.category))];
export const brands = [...new Set(products.map(product => product.brand))];
export const colors = [...new Set(products.flatMap(product => product.colors).filter(Boolean))];
