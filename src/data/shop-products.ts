const bottleImage = "/assets/shop/bottle.jpeg";
const cupImage = "/assets/shop/cup.jpeg";
const hatImage = "/assets/shop/hat.jpeg";
const hoodieImage = "/assets/shop/hoodie.jpeg";
const leatherJacketImage = "/assets/shop/leather jacket.jpeg";
const shirtImage = "/assets/shop/shirt.jpeg";

export type ShopCategory =
  | "All"
  | "Shirts"
  | "Hoodies"
  | "Leather Jackets"
  | "Cups"
  | "Water Bottles"
  | "Headwear"
  | "Accessories"
  | "Limited Editions"
  | "Physical Music";

export interface ShopOption {
  label: string;
  values: string[];
}

export interface ShopProduct {
  id: string;
  name: string;
  category: ShopCategory;
  price: number;
  salePrice?: number;
  description: string;
  images: string[];
  availability: "In stock" | "Low stock" | "Sold out";
  featured: boolean;
  isNew: boolean;
  isLimited: boolean;
  artist: string;
  collection: string;
  options: ShopOption[];
  sku: string;
}

export const shopProducts: ShopProduct[] = [
  {
    id: "shop_shirt_001",
    name: "T-Shirt",
    category: "Shirts",
    price: 42,
    description:
      "A premium black cotton tee with a crisp white CBM Records logo. Clean, minimal, wearable every day.",
    images: [shirtImage],
    availability: "In stock",
    featured: true,
    isNew: true,
    isLimited: false,
    artist: "CBM Records",
    collection: "CBM Essentials",
    options: [
      { label: "Size", values: ["S", "M", "L", "XL"] },
      { label: "Fit", values: ["Regular"] },
      { label: "Color", values: ["Black"] },
    ],
    sku: "CBM-TSHIRT-01",
  },
  {
    id: "shop_hoodie_001",
    name: "Classic Hoodie",
    category: "Hoodies",
    price: 60,
    description:
      "Soft brushed fleece hoodie with a tonal CBM insignia. Designed for layering on stage, in studio, or on the road.",
    images: [hoodieImage],
    availability: "In stock",
    featured: true,
    isNew: true,
    isLimited: false,
    artist: "CBM Records",
    collection: "CBM Essentials",
    options: [
      { label: "Size", values: ["S", "M", "L", "XL"] },
      { label: "Fit", values: ["Oversized", "Relaxed"] },
      { label: "Color", values: ["Black"] },
    ],
    sku: "CBM-HOODIE-01",
  },
  {
    id: "shop_leather_jacket_001",
    name: "Leather Rider Jacket",
    category: "Leather Jackets",
    price: 100,
    description:
      "Premium black leather jacket with subtle CBM branding on the chest and sleeve. Built for a refined street-music wardrobe.",
    images: [leatherJacketImage],
    availability: "Low stock",
    featured: true,
    isNew: false,
    isLimited: true,
    artist: "CBM Records",
    collection: "Limited Editions",
    options: [
      { label: "Size", values: ["S", "M", "L"] },
      { label: "Fit", values: ["Slim"] },
      { label: "Material", values: ["Genuine Leather"] },
    ],
    sku: "CBM-JACKET-01",
  },
  {
    id: "shop_cup_001",
    name: "Coffee Cup",
    category: "Cups",
    price: 15,
    description:
      "Glossy black ceramic cup with a white CBM signature logo. The perfect studio companion for morning and late-night sessions.",
    images: [cupImage],
    availability: "In stock",
    featured: false,
    isNew: false,
    isLimited: false,
    artist: "CBM Records",
    collection: "Lifestyle",
    options: [
      { label: "Capacity", values: ["12 oz"] },
      { label: "Material", values: ["Ceramic"] },
    ],
    sku: "CBM-CUP-01",
  },
  {
    id: "shop_bottle_001",
    name: "Performance Water Bottle",
    category: "Water Bottles",
    price: 13,
    description:
      "Matte black performance bottle with teal CBM branding, designed for travel, studio sessions, and festival days.",
    images: [bottleImage],
    availability: "In stock",
    featured: false,
    isNew: true,
    isLimited: false,
    artist: "CBM Records",
    collection: "Lifestyle",
    options: [
      { label: "Capacity", values: ["750 ml"] },
      { label: "Color", values: ["Matte Black"] },
      { label: "Material", values: ["Stainless Steel"] },
    ],
    sku: "CBM-BOTTLE-01",
  },
  {
    id: "shop_hat_001",
    name: "Signature Cap",
    category: "Headwear",
    price: 25,
    description:
      "Structured black cap with tonal CBM embroidery and a clean silhouette. A refined finishing piece for everyday artist style.",
    images: [hatImage],
    availability: "In stock",
    featured: false,
    isNew: false,
    isLimited: false,
    artist: "CBM Records",
    collection: "Lifestyle",
    options: [
      { label: "Fit", values: ["Adjustable"] },
      { label: "Color", values: ["Black"] },
      { label: "Material", values: ["Cotton Twill"] },
    ],
    sku: "CBM-HAT-01",
  },
];
