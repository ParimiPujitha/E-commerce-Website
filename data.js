// ===== NEXUS E-COMMERCE — Product Data =====

const PRODUCTS = [
  // SMARTPHONES
  {
    id: 1, name: "Samsung Galaxy S24 Ultra", category: "Smartphone",
    price: 124999, originalPrice: 134999,
    rating: 4.8, reviews: 3421,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
    badge: "Bestseller",
    description: "The pinnacle of Android excellence. 200MP camera, Snapdragon 8 Gen 3, titanium frame, and built-in S Pen. Made for creators and professionals.",
    specs: { Display: "6.8\" QHD+ AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "12GB", Storage: "256GB", Camera: "200MP+12MP+10MP", Battery: "5000mAh" },
    isNew: false, isDeal: false
  },
  {
    id: 2, name: "iPhone 15 Pro Max", category: "Smartphone",
    price: 159900, originalPrice: 179900,
    rating: 4.9, reviews: 5210,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?w=400&q=80",
    badge: "New",
    description: "A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom. The most advanced iPhone ever, period.",
    specs: { Display: "6.7\" Super Retina XDR", Processor: "A17 Pro Bionic", RAM: "8GB", Storage: "256GB", Camera: "48MP+12MP+12MP", Battery: "4422mAh" },
    isNew: true, isDeal: false
  },
  {
    id: 3, name: "OnePlus 12", category: "Smartphone",
    price: 64999, originalPrice: 69999,
    rating: 4.6, reviews: 1890,
    image: "https://images.unsplash.com/photo-1612503992998-3c7bc1c6bfac?w=400&q=80",
    badge: null,
    description: "Hasselblad camera tuning, 100W SUPERVOOC charging, Snapdragon 8 Gen 3. Flagship killer that doesn't compromise.",
    specs: { Display: "6.82\" LTPO AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "12GB", Storage: "256GB", Camera: "50MP Hasselblad", Battery: "5400mAh" },
    isNew: true, isDeal: false
  },
  {
    id: 4, name: "Google Pixel 8 Pro", category: "Smartphone",
    price: 106999, originalPrice: 112999,
    rating: 4.7, reviews: 1240,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    badge: "Deal",
    description: "Google Tensor G3, 7 years of updates, best computational photography in any Android phone. AI-powered magic eraser, photo unblur, and more.",
    specs: { Display: "6.7\" LTPO OLED", Processor: "Tensor G3", RAM: "12GB", Storage: "128GB", Camera: "50MP+48MP+48MP", Battery: "5050mAh" },
    isNew: false, isDeal: true
  },

  // LAPTOPS
  {
    id: 5, name: "MacBook Pro 14\" M3 Pro", category: "Laptop",
    price: 198900, originalPrice: 208900,
    rating: 4.9, reviews: 2840,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    badge: "Bestseller",
    description: "M3 Pro chip with 11-core CPU and 14-core GPU. Liquid Retina XDR display. Up to 22 hours battery life. The ultimate pro laptop.",
    specs: { Processor: "Apple M3 Pro", RAM: "18GB Unified", Storage: "512GB SSD", Display: "14.2\" Liquid Retina XDR", Battery: "22 hours", Weight: "1.6kg" },
    isNew: false, isDeal: false
  },
  {
    id: 6, name: "Dell XPS 15 9530", category: "Laptop",
    price: 165000, originalPrice: 182000,
    rating: 4.7, reviews: 980,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    badge: "Deal",
    description: "Intel Core i9-13900H, RTX 4070, 3.5K OLED display. The Windows workstation for creators who settle for nothing less.",
    specs: { Processor: "i9-13900H", GPU: "RTX 4070 8GB", RAM: "32GB DDR5", Storage: "1TB SSD", Display: "15.6\" 3.5K OLED", Battery: "13 hours" },
    isNew: false, isDeal: true
  },
  {
    id: 7, name: "ASUS ROG Zephyrus G14", category: "Laptop",
    price: 119990, originalPrice: 134990,
    rating: 4.8, reviews: 1560,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    badge: "Gaming",
    description: "AMD Ryzen 9 7940HS, RX 7900S, AniMe Matrix LED lid. The most powerful 14-inch gaming laptop ever built.",
    specs: { Processor: "Ryzen 9 7940HS", GPU: "RX 7900S 16GB", RAM: "32GB DDR5", Storage: "1TB SSD", Display: "14\" QHD+ 165Hz", Battery: "10 hours" },
    isNew: true, isDeal: true
  },
  {
    id: 8, name: "Lenovo ThinkPad X1 Carbon", category: "Laptop",
    price: 138000, originalPrice: 148000,
    rating: 4.6, reviews: 720,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80",
    badge: null,
    description: "Intel vPro, carbon fiber chassis, 1.12kg ultralight. The gold standard for business professionals globally.",
    specs: { Processor: "i7-1365U vPro", RAM: "16GB LPDDR5", Storage: "512GB SSD", Display: "14\" 2.8K OLED", Battery: "15 hours", Weight: "1.12kg" },
    isNew: false, isDeal: false
  },

  // HEADPHONES
  {
    id: 9, name: "Sony WH-1000XM5", category: "Headphones",
    price: 26990, originalPrice: 34990,
    rating: 4.9, reviews: 4320,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "Bestseller",
    description: "Industry-leading ANC, 30-hour battery, LDAC Hi-Res Audio. The undisputed king of noise-cancelling headphones.",
    specs: { "Driver Size": "30mm", "ANC": "Industry-leading", Battery: "30 hours", Codec: "LDAC, AAC, SBC", Connectivity: "Bluetooth 5.2", Weight: "250g" },
    isNew: false, isDeal: true
  },
  {
    id: 10, name: "Apple AirPods Pro 2nd Gen", category: "Headphones",
    price: 24900, originalPrice: 26900,
    rating: 4.8, reviews: 6100,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
    badge: "New",
    description: "H2 chip, Adaptive Audio, Conversation Awareness, Personalized Spatial Audio. The best earbuds for iPhone users, period.",
    specs: { Chip: "H2", ANC: "Yes + Transparency", Battery: "6h + 30h case", Codec: "AAC", Connectivity: "Bluetooth 5.3", Rating: "IPX4" },
    isNew: true, isDeal: false
  },
  {
    id: 11, name: "Bose QuietComfort 45", category: "Headphones",
    price: 21990, originalPrice: 32900,
    rating: 4.7, reviews: 2180,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    badge: "Deal",
    description: "WorldClass noise cancellation, TriPort acoustic architecture, 24-hour battery with 15-min quick charge.",
    specs: { "Driver": "TriPort", ANC: "WorldClass", Battery: "24 hours", Codec: "AAC, SBC", Connectivity: "Bluetooth 5.1", Weight: "238g" },
    isNew: false, isDeal: true
  },

  // CAMERAS
  {
    id: 12, name: "Sony Alpha A7R V", category: "Camera",
    price: 348990, originalPrice: 374990,
    rating: 4.9, reviews: 890,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    badge: "Pro",
    description: "61MP full-frame sensor, AI-powered subject recognition, 8K RAW video, IBIS up to 8-stop. The ultimate photography machine.",
    specs: { Sensor: "61MP BSI CMOS", Processor: "BIONZ XR", AF: "759 points", Video: "8K RAW", IBIS: "8-stop", Battery: "530 shots" },
    isNew: false, isDeal: false
  },
  {
    id: 13, name: "Canon EOS R6 Mark II", category: "Camera",
    price: 229995, originalPrice: 249990,
    rating: 4.8, reviews: 1240,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
    badge: "Deal",
    description: "40fps burst, 40MP sensor, Dual Pixel AF II with subject tracking. For sports, wildlife, and wedding photographers.",
    specs: { Sensor: "40MP CMOS", Burst: "40fps RAW", AF: "Dual Pixel AF II", Video: "4K 60fps", IBIS: "8-stop", Battery: "760 shots" },
    isNew: false, isDeal: true
  },

  // TABLETS
  {
    id: 14, name: "iPad Pro 12.9\" M2", category: "Tablet",
    price: 112900, originalPrice: 119900,
    rating: 4.8, reviews: 1870,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    badge: "New",
    description: "M2 chip, Liquid Retina XDR ProMotion display, Wi-Fi 6E, Apple Pencil hover. The most capable iPad ever made.",
    specs: { Chip: "Apple M2", Display: "12.9\" Liquid Retina XDR", Storage: "256GB", Connectivity: "Wi-Fi 6E", Pencil: "2nd Gen support", Battery: "10 hours" },
    isNew: true, isDeal: false
  },
  {
    id: 15, name: "Samsung Galaxy Tab S9 Ultra", category: "Tablet",
    price: 108999, originalPrice: 119999,
    rating: 4.7, reviews: 1020,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80",
    badge: "Deal",
    description: "14.6\" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 12GB RAM, S Pen included. The Android tablet that rivals any laptop.",
    specs: { Display: "14.6\" AMOLED 2X 120Hz", Processor: "Snapdragon 8 Gen 2", RAM: "12GB", Storage: "256GB", S_Pen: "Included", Battery: "11200mAh" },
    isNew: false, isDeal: true
  },

  // SMARTWATCHES
  {
    id: 16, name: "Apple Watch Ultra 2", category: "Smartwatch",
    price: 89900, originalPrice: 95900,
    rating: 4.9, reviews: 2100,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    badge: "Bestseller",
    description: "49mm titanium case, precision GPS, 36-hour battery, dive computer, trail navigation. Built for extreme athletes.",
    specs: { Case: "49mm Titanium", Display: "Retina LTPO OLED", GPS: "Precision dual-frequency", Depth: "100m water resistance", Battery: "36 hours", Connectivity: "LTE + GPS" },
    isNew: false, isDeal: false
  },
  {
    id: 17, name: "Samsung Galaxy Watch 6 Classic", category: "Smartwatch",
    price: 34999, originalPrice: 39999,
    rating: 4.6, reviews: 980,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "Deal",
    description: "Rotating bezel, sapphire crystal glass, 40-hour battery, advanced health sensors. Classic design meets cutting-edge tech.",
    specs: { Display: "1.47\" Super AMOLED", Case: "47mm Stainless Steel", Battery: "40 hours", Health: "ECG, BIA, Blood Pressure", OS: "Wear OS 4", Rating: "5ATM + IP68" },
    isNew: false, isDeal: true
  },

  // SPEAKERS
  {
    id: 18, name: "Sonos Era 300", category: "Speaker",
    price: 54900, originalPrice: 59999,
    rating: 4.8, reviews: 670,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    badge: "New",
    description: "Spatial audio with Dolby Atmos, 6 drivers, 360-degree sound, Wi-Fi and Bluetooth. Audiophile-grade home speaker.",
    specs: { Drivers: "6 Class-D amps", Audio: "Dolby Atmos Spatial", Connectivity: "Wi-Fi 6, Bluetooth 5.0", Voice: "Alexa, Google", Dimensions: "260×160×185mm", Weight: "4.52kg" },
    isNew: true, isDeal: false
  },
  {
    id: 19, name: "JBL PartyBox 300", category: "Speaker",
    price: 32999, originalPrice: 39990,
    rating: 4.5, reviews: 1340,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "Deal",
    description: "240W powerful sound, LED light effects, 18-hour battery, TWS for double the fun. Party wherever you go.",
    specs: { Power: "240W RMS", Battery: "18 hours", Connectivity: "Bluetooth 4.2, TWS", Inputs: "3.5mm, USB", Effects: "LED DJ lights", Rating: "IPX4" },
    isNew: false, isDeal: true
  },

  // MONITORS
  {
    id: 20, name: "LG 27\" UltraGear OLED 4K", category: "Monitor",
    price: 89990, originalPrice: 99990,
    rating: 4.9, reviews: 870,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    badge: "Pro",
    description: "27\" OLED panel, 4K 144Hz, 0.03ms response, DisplayHDR True Black 400. The monitor gaming professionals demand.",
    specs: { Panel: "27\" OLED", Resolution: "3840×2160 (4K)", "Refresh Rate": "144Hz", "Response Time": "0.03ms", HDR: "True Black 400", Connectivity: "HDMI 2.1, DP 1.4" },
    isNew: true, isDeal: false
  }
];

const CATEGORIES = [
  { name: "Smartphone", icon: "fa-mobile-alt", color: "#E8FF00" },
  { name: "Laptop", icon: "fa-laptop", color: "#00D4FF" },
  { name: "Headphones", icon: "fa-headphones", color: "#FF6B6B" },
  { name: "Camera", icon: "fa-camera", color: "#A78BFA" },
  { name: "Tablet", icon: "fa-tablet-alt", color: "#34D399" },
  { name: "Smartwatch", icon: "fa-clock", color: "#F59E0B" },
  { name: "Speaker", icon: "fa-volume-up", color: "#EC4899" },
  { name: "Monitor", icon: "fa-desktop", color: "#60A5FA" }
];
