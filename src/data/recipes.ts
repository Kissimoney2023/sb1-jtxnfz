import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    totalTime: '45 mins',
    servings: 4,
    difficulty: 'Medium',
    description: 'Authentic Italian pizza with fresh basil, mozzarella, and tomatoes',
    ingredients: [
      '2 1/4 cups (280g) all-purpose flour',
      '1 tsp salt',
      '1 tsp sugar',
      '2 1/4 tsp instant yeast',
      '2 tbsp olive oil',
      '3/4 cup warm water',
      '1 can (14 oz) crushed tomatoes',
      '8 oz fresh mozzarella',
      'Fresh basil leaves',
      'Extra virgin olive oil'
    ],
    steps: [
      'Mix flour, salt, sugar, and yeast in a large bowl',
      'Add olive oil and warm water, knead until smooth and elastic',
      'Let dough rise in a warm place for 30 minutes',
      'Stretch dough into a 12-inch circle and add toppings',
      'Bake at 450°F (230°C) for 12-15 minutes until crust is golden'
    ],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: 'Italian',
    tags: ['Pizza', 'Italian', 'Vegetarian']
  },
  {
    id: '2',
    name: 'Sushi Roll Platter',
    totalTime: '60 mins',
    servings: 4,
    difficulty: 'Hard',
    description: 'A variety of fresh sushi rolls including California and Spicy Tuna',
    ingredients: [
      '2 cups sushi rice',
      '4 sheets nori',
      '1/2 lb sashimi-grade tuna',
      '1 avocado',
      '1 cucumber',
      'Soy sauce',
      'Wasabi',
      'Pickled ginger'
    ],
    steps: [
      'Cook sushi rice and let it cool to room temperature',
      'Prepare fillings by cutting fish and vegetables into strips',
      'Place nori on bamboo mat and spread rice evenly',
      'Add fillings and roll tightly',
      'Cut rolls into 6-8 pieces each'
    ],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Japanese',
    tags: ['Sushi', 'Japanese', 'Seafood']
  },
  {
    id: '3',
    name: 'Authentic Tacos al Pastor',
    totalTime: '90 mins',
    servings: 6,
    difficulty: 'Medium',
    description: 'Traditional Mexican street tacos with marinated pork and pineapple',
    ingredients: [
      '2 lbs pork shoulder',
      'Achiote paste',
      'Dried chilies',
      'Pineapple',
      'White onion',
      'Cilantro',
      'Corn tortillas',
      'Lime wedges'
    ],
    steps: [
      'Marinate pork with achiote and spices for 4 hours',
      'Grill or roast pork until tender',
      'Slice meat thinly',
      'Warm tortillas and assemble tacos',
      'Serve with diced pineapple, onion, and cilantro'
    ],
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    category: 'Mexican',
    tags: ['Tacos', 'Mexican', 'Spicy']
  },
  {
    id: '4',
    name: 'Butter Chicken',
    totalTime: '75 mins',
    servings: 6,
    difficulty: 'Medium',
    description: 'Rich and creamy Indian curry with tender chicken pieces',
    ingredients: [
      '1.5 lbs chicken thighs',
      'Yogurt for marinade',
      'Garam masala',
      'Butter',
      'Heavy cream',
      'Tomato sauce',
      'Onions',
      'Garlic and ginger'
    ],
    steps: [
      'Marinate chicken in yogurt and spices',
      'Cook chicken until golden brown',
      'Prepare curry sauce with butter and tomatoes',
      'Combine chicken with sauce',
      'Simmer until thick and creamy'
    ],
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    category: 'Indian',
    tags: ['Curry', 'Indian', 'Creamy']
  },
  {
    id: '5',
    name: 'Coq au Vin',
    totalTime: '120 mins',
    servings: 6,
    difficulty: 'Hard',
    description: 'Classic French braised chicken in red wine sauce',
    ingredients: [
      'Whole chicken',
      'Red wine',
      'Pearl onions',
      'Mushrooms',
      'Bacon lardons',
      'Fresh thyme',
      'Bay leaves',
      'Chicken stock'
    ],
    steps: [
      'Brown chicken pieces in Dutch oven',
      'Cook bacon and vegetables',
      'Add wine and reduce',
      'Braise chicken until tender',
      'Finish sauce and serve'
    ],
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
    category: 'French',
    tags: ['French', 'Chicken', 'Wine']
  },
  {
    id: '6',
    name: 'Kung Pao Chicken',
    totalTime: '40 mins',
    servings: 4,
    difficulty: 'Medium',
    description: 'Spicy Sichuan chicken dish with peanuts and vegetables',
    ingredients: [
      'Chicken thighs',
      'Peanuts',
      'Dried red chilies',
      'Sichuan peppercorns',
      'Soy sauce',
      'Rice wine',
      'Green onions',
      'Garlic and ginger'
    ],
    steps: [
      'Marinate chicken in soy sauce and wine',
      'Stir-fry dried chilies and peppercorns',
      'Add chicken and cook until golden',
      'Add vegetables and sauce',
      'Finish with peanuts and green onions'
    ],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    category: 'Chinese',
    tags: ['Chinese', 'Spicy', 'Chicken']
  },
  {
    id: '7',
    name: 'Pad Thai',
    totalTime: '35 mins',
    servings: 4,
    difficulty: 'Medium',
    description: 'Classic Thai stir-fried rice noodles with shrimp',
    ingredients: [
      'Rice noodles',
      'Shrimp',
      'Tofu',
      'Bean sprouts',
      'Eggs',
      'Tamarind paste',
      'Fish sauce',
      'Peanuts'
    ],
    steps: [
      'Soak noodles in warm water',
      'Make sauce with tamarind and fish sauce',
      'Stir-fry shrimp and tofu',
      'Add noodles and sauce',
      'Finish with eggs and garnishes'
    ],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    category: 'Thai',
    tags: ['Thai', 'Noodles', 'Seafood']
  },
  {
    id: '8',
    name: 'Greek Moussaka',
    totalTime: '90 mins',
    servings: 8,
    difficulty: 'Hard',
    description: 'Traditional layered eggplant and meat casserole',
    ingredients: [
      'Eggplants',
      'Ground lamb',
      'Onions',
      'Tomatoes',
      'Bechamel sauce',
      'Cinnamon',
      'Nutmeg',
      'Parmesan cheese'
    ],
    steps: [
      'Slice and salt eggplants',
      'Make meat sauce with spices',
      'Prepare bechamel sauce',
      'Layer eggplant and meat sauce',
      'Top with bechamel and bake'
    ],
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
    category: 'Mediterranean',
    tags: ['Greek', 'Mediterranean', 'Casserole']
  }
];