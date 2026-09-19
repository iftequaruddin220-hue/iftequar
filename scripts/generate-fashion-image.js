import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const width = 2400;
const height = 1600;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Playfair+Display:ital,wght@1,400;1,600&amp;display=swap');
      * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .editorial { font-family: 'Playfair Display', Georgia, serif; font-style: italic; }
    </style>
    <linearGradient id="warmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5e6e1"/>
      <stop offset="50%" stop-color="#eddcd6"/>
      <stop offset="100%" stop-color="#e3ccc4"/>
    </linearGradient>
    <linearGradient id="phoneFrame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a2a2e"/>
      <stop offset="50%" stop-color="#18181a"/>
      <stop offset="100%" stop-color="#0f0f11"/>
    </linearGradient>
    <filter id="phoneShadow" x="-15%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="25" stdDeviation="35" flood-color="#5a382e" flood-opacity="0.35"/>
    </filter>
    <filter id="centerPhoneShadow" x="-20%" y="-15%" width="140%" height="140%">
      <feDropShadow dx="0" dy="35" stdDeviation="45" flood-color="#48281e" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background Warm Blush Studio Canvas -->
  <rect width="${width}" height="${height}" fill="url(#warmBg)" rx="28"/>

  <!-- Left Side Editorial Copy -->
  <g transform="translate(90, 140)">
    <!-- Logo -->
    <text x="0" y="32" font-size="34" font-weight="900" letter-spacing="6" fill="#121214">LUMI</text>
    
    <text x="0" y="85" font-size="14" font-weight="700" letter-spacing="3" fill="#786c67">FASHION APP</text>
    
    <text x="0" y="145" font-size="52" font-weight="800" fill="#111114" letter-spacing="-1">Discover</text>
    <text x="0" y="205" font-size="52" font-weight="800" fill="#111114" letter-spacing="-1">Your Style</text>
    
    <text x="0" y="260" font-size="18" font-weight="500" fill="#665b55">Trendy fashion for a</text>
    <text x="0" y="288" font-size="18" font-weight="500" fill="#665b55">better you. Shop anytime,</text>
    <text x="0" y="316" font-size="18" font-weight="500" fill="#665b55">anywhere.</text>

    <!-- Shop Now CTA -->
    <g transform="translate(0, 360)">
      <rect x="0" y="0" width="220" height="58" rx="29" fill="#111114"/>
      <text x="70" y="36" font-size="18" font-weight="700" fill="#ffffff">Shop Now</text>
      <path d="M 165 30 L 180 30 M 175 25 L 180 30 L 175 35" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Trust Badges on Left -->
    <g transform="translate(0, 480)">
      <!-- Free Shipping -->
      <g transform="translate(0, 0)">
        <path d="M 0 12 L 20 12 L 26 18 L 34 18 L 34 30 L 0 30 Z" stroke="#111114" stroke-width="2" fill="none"/>
        <circle cx="8" cy="30" r="4" fill="#111114"/>
        <circle cx="26" cy="30" r="4" fill="#111114"/>
        <text x="48" y="16" font-size="15" font-weight="700" fill="#111114">Free Shipping</text>
        <text x="48" y="32" font-size="12" font-weight="500" fill="#7e7069">on orders above ₹1,999</text>
      </g>
      <!-- Secure Payment -->
      <g transform="translate(0, 60)">
        <path d="M 14 10 L 26 14 L 26 24 C 26 32, 14 36, 14 36 C 14 36, 2 32, 2 24 L 2 14 Z" stroke="#111114" stroke-width="2" fill="none"/>
        <path d="M 10 23 L 13 26 L 19 18" stroke="#111114" stroke-width="2" stroke-linecap="round" fill="none"/>
        <text x="48" y="16" font-size="15" font-weight="700" fill="#111114">Secure Payment</text>
        <text x="48" y="32" font-size="12" font-weight="500" fill="#7e7069">100% safe &amp; secure</text>
      </g>
      <!-- Easy Returns -->
      <g transform="translate(0, 120)">
        <path d="M 22 14 A 10 10 0 1 0 22 28 M 22 10 L 22 16 L 28 16" stroke="#111114" stroke-width="2" fill="none" stroke-linecap="round"/>
        <text x="48" y="16" font-size="15" font-weight="700" fill="#111114">Easy Returns</text>
        <text x="48" y="32" font-size="12" font-weight="500" fill="#7e7069">7-day return policy</text>
      </g>
    </g>
  </g>

  <!-- Right Side Luxury Brand Poetry -->
  <g transform="translate(2160, 130)">
    <text x="0" y="0" font-size="46" font-weight="400" fill="#74554b" class="editorial">Style</text>
    <text x="0" y="48" font-size="46" font-weight="400" fill="#74554b" class="editorial">Lives</text>
    <text x="0" y="96" font-size="46" font-weight="400" fill="#74554b" class="editorial">Here.</text>
    <line x1="0" y1="125" x2="35" y2="125" stroke="#74554b" stroke-width="2"/>
    <text x="0" y="165" font-size="12" font-weight="700" letter-spacing="3" fill="#88685d">CLOTHES</text>
    <text x="0" y="185" font-size="12" font-weight="700" letter-spacing="3" fill="#88685d">FOR A</text>
    <text x="0" y="205" font-size="12" font-weight="700" letter-spacing="3" fill="#88685d">BRIGHTER</text>
    <text x="0" y="225" font-size="12" font-weight="700" letter-spacing="3" fill="#88685d">YOU</text>
  </g>

  <!-- ================= 3 PHONE DEVICES SHOWCASE ================= -->

  <!-- PHONE 1: LEFT DEVICE (Categories & Discovery) -->
  <g transform="translate(480, 160)" filter="url(#phoneShadow)">
    <!-- Device Outer Chassis -->
    <rect x="0" y="0" width="460" height="980" rx="55" fill="url(#phoneFrame)" stroke="#3a373b" stroke-width="3"/>
    <!-- Screen Glass -->
    <rect x="12" y="12" width="436" height="956" rx="46" fill="#fdfbf9"/>

    <!-- Dynamic Island / Speaker Pill -->
    <rect x="175" y="22" width="110" height="28" rx="14" fill="#000000"/>
    <circle cx="265" cy="36" r="5" fill="#151515"/>

    <!-- Status Bar -->
    <text x="45" y="42" font-size="14" font-weight="700" fill="#000000">9:41</text>
    <g transform="translate(370, 32)">
      <path d="M 0 10 L 4 6 L 8 10 M 12 10 L 16 4" stroke="#000000" stroke-width="2"/>
    </g>

    <!-- App Header -->
    <g transform="translate(35, 75)">
      <!-- Hamburger -->
      <line x1="0" y1="8" x2="18" y2="8" stroke="#111114" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="0" y1="16" x2="14" y2="16" stroke="#111114" stroke-width="2.5" stroke-linecap="round"/>
      <text x="170" y="16" font-size="20" font-weight="900" letter-spacing="4" fill="#111114" text-anchor="middle">LUMI</text>
      <!-- Bell -->
      <path d="M 355 8 A 6 6 0 0 1 367 8 L 369 16 L 353 16 Z" stroke="#111114" stroke-width="2" fill="none"/>
    </g>

    <!-- Search Input Bar -->
    <g transform="translate(35, 120)">
      <rect x="0" y="0" width="365" height="46" rx="23" fill="#f0ebe6"/>
      <circle cx="24" cy="23" r="6" stroke="#88817c" stroke-width="2" fill="none"/>
      <line x1="28" y1="27" x2="34" y2="33" stroke="#88817c" stroke-width="2"/>
      <text x="45" y="29" font-size="14" fill="#88817c">Search for products, brands...</text>
    </g>

    <!-- Quick Category Circular Avatars -->
    <g transform="translate(35, 185)">
      <!-- Women (Active with pink/coral ring) -->
      <g transform="translate(15, 0)">
        <circle cx="25" cy="25" r="25" fill="#f8e7e3" stroke="#d66853" stroke-width="2"/>
        <path d="M 18 18 L 32 18 L 30 24 L 36 34 L 14 34 L 20 24 Z" stroke="#d66853" stroke-width="2" fill="none"/>
        <text x="25" y="65" font-size="12" font-weight="700" fill="#d66853" text-anchor="middle">Women</text>
      </g>
      <!-- Men -->
      <g transform="translate(105, 0)">
        <circle cx="25" cy="25" r="25" fill="#f5f1ed"/>
        <path d="M 17 20 L 25 16 L 33 20 L 33 34 L 17 34 Z" stroke="#333333" stroke-width="2" fill="none"/>
        <text x="25" y="65" font-size="12" font-weight="600" fill="#555555" text-anchor="middle">Men</text>
      </g>
      <!-- Kids -->
      <g transform="translate(195, 0)">
        <circle cx="25" cy="25" r="25" fill="#f5f1ed"/>
        <circle cx="25" cy="22" r="6" stroke="#333333" stroke-width="2" fill="none"/>
        <path d="M 18 34 C 18 28, 32 28, 32 34" stroke="#333333" stroke-width="2" fill="none"/>
        <text x="25" y="65" font-size="12" font-weight="600" fill="#555555" text-anchor="middle">Kids</text>
      </g>
      <!-- Accessories -->
      <g transform="translate(285, 0)">
        <circle cx="25" cy="25" r="25" fill="#f5f1ed"/>
        <rect x="17" y="20" width="16" height="14" rx="2" stroke="#333333" stroke-width="2" fill="none"/>
        <text x="25" y="65" font-size="12" font-weight="600" fill="#555555" text-anchor="middle">Accessories</text>
      </g>
    </g>

    <!-- "Shop by Category" Grid -->
    <g transform="translate(35, 290)">
      <text x="0" y="0" font-size="17" font-weight="800" fill="#111114">Shop by Category</text>
      <text x="325" y="0" font-size="13" font-weight="700" fill="#665b55">See All →</text>

      <!-- Row 1: Dresses, Tops, Jeans -->
      <g transform="translate(0, 20)">
        <rect x="0" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="56" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Dresses</text>

        <rect x="126" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="182" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Tops</text>

        <rect x="252" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="308" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Jeans</text>
      </g>

      <!-- Row 2: Activewear, Outerwear, Accessories -->
      <g transform="translate(0, 145)">
        <rect x="0" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="56" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Activewear</text>

        <rect x="126" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="182" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Outerwear</text>

        <rect x="252" y="0" width="112" height="110" rx="14" fill="#f5efe9"/>
        <text x="308" y="98" font-size="12" font-weight="600" fill="#222" text-anchor="middle">Accessories</text>
      </g>
    </g>

    <!-- Promotional Summer Sale Card -->
    <g transform="translate(35, 590)">
      <rect x="0" y="0" width="365" height="150" rx="18" fill="#fdf0ea"/>
      <g transform="translate(25, 30)">
        <text x="0" y="0" font-size="22" font-weight="800" fill="#111114">Flat 50% OFF</text>
        <text x="0" y="24" font-size="13" font-weight="500" fill="#756760">On Summer Collection</text>
        <text x="0" y="60" font-size="13" font-weight="700" fill="#111114">Shop Now →</text>
      </g>
    </g>

    <!-- Bottom Navigation Bar -->
    <g transform="translate(35, 875)">
      <line x1="-35" y1="0" x2="400" y2="0" stroke="#f0eae4" stroke-width="1"/>
      <g transform="translate(20, 20)">
        <!-- Home -->
        <circle cx="12" cy="12" r="12" fill="#d66853"/>
        <text x="12" y="38" font-size="10" font-weight="700" fill="#d66853" text-anchor="middle">Home</text>
        <!-- Categories -->
        <rect x="75" y="5" width="14" height="14" stroke="#777" stroke-width="2" fill="none"/>
        <text x="82" y="38" font-size="10" font-weight="500" fill="#777" text-anchor="middle">Categories</text>
        <!-- Wishlist -->
        <path d="M 152 7 C 150 4, 145 4, 143 7 C 141 4, 136 4, 134 7 C 131 10, 131 15, 143 21 C 155 15, 155 10, 152 7 Z" stroke="#777" stroke-width="1.8" fill="none"/>
        <text x="143" y="38" font-size="10" font-weight="500" fill="#777" text-anchor="middle">Wishlist</text>
        <!-- Cart -->
        <rect x="205" y="8" width="14" height="12" rx="2" stroke="#777" stroke-width="2" fill="none"/>
        <text x="212" y="38" font-size="10" font-weight="500" fill="#777" text-anchor="middle">Cart</text>
        <!-- Profile -->
        <circle cx="275" cy="10" r="4" stroke="#777" stroke-width="2" fill="none"/>
        <text x="275" y="38" font-size="10" font-weight="500" fill="#777" text-anchor="middle">Profile</text>
      </g>
    </g>
  </g>

  <!-- PHONE 2: HERO CENTER DEVICE (Fashion That Moves With You) -->
  <g transform="translate(940, 70)" filter="url(#centerPhoneShadow)">
    <rect x="0" y="0" width="520" height="1100" rx="60" fill="url(#phoneFrame)" stroke="#454048" stroke-width="3.5"/>
    <rect x="14" y="14" width="492" height="1072" rx="50" fill="#ffffff"/>

    <!-- Dynamic Island -->
    <rect x="195" y="24" width="130" height="34" rx="17" fill="#000000"/>

    <!-- Header Status -->
    <text x="48" y="46" font-size="15" font-weight="700" fill="#000000">9:41</text>
    <g transform="translate(420, 36)">
      <path d="M 0 10 L 4 6 L 8 10 M 12 10 L 16 4" stroke="#000000" stroke-width="2"/>
    </g>

    <!-- Navigation Header -->
    <g transform="translate(38, 85)">
      <line x1="0" y1="8" x2="20" y2="8" stroke="#111114" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="0" y1="16" x2="15" y2="16" stroke="#111114" stroke-width="2.5" stroke-linecap="round"/>
      <text x="215" y="16" font-size="24" font-weight="900" letter-spacing="5" fill="#111114" text-anchor="middle">LUMI</text>
      <!-- Search & Bag -->
      <circle cx="395" cy="12" r="7" stroke="#111114" stroke-width="2" fill="none"/>
      <rect x="425" y="5" width="18" height="18" rx="3" stroke="#111114" stroke-width="2" fill="none"/>
      <!-- Badge -->
      <circle cx="445" cy="4" r="7" fill="#d66853"/>
      <text x="445" y="7" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
    </g>

    <!-- Main Editorial Hero Card in Center Phone -->
    <g transform="translate(24, 130)">
      <!-- Soft Warm Editorial Background -->
      <rect x="0" y="0" width="444" height="490" rx="24" fill="#e9d8cc"/>
      
      <!-- Model Silhouette (Fashion Open-back dress with sunglasses) -->
      <g transform="translate(190, 80)">
        <ellipse cx="120" cy="140" rx="90" ry="180" fill="#3a302a" opacity="0.15"/>
        <!-- Model back / hair / ribbon dress -->
        <path d="M 80 40 C 60 10, 150 10, 130 50 C 120 70, 150 90, 160 150 C 170 200, 170 320, 160 380 L 70 380 C 60 320, 70 240, 75 190 C 80 140, 70 80, 80 40 Z" fill="#201a18"/>
        <!-- Tie Ribbon on Back -->
        <circle cx="115" cy="300" r="14" fill="#151210"/>
        <path d="M 115 300 L 75 360 L 95 380 L 115 315 L 140 375 L 155 355 Z" fill="#151210"/>
      </g>

      <!-- Typography Layer Over Hero -->
      <g transform="translate(30, 170)">
        <text x="0" y="0" font-size="12" font-weight="700" letter-spacing="3" fill="#6a564c">NEW SEASON</text>
        <text x="0" y="45" font-size="36" font-weight="800" fill="#111114" letter-spacing="-0.5">Fashion</text>
        <text x="0" y="85" font-size="36" font-weight="800" fill="#111114" letter-spacing="-0.5">That Moves</text>
        <text x="0" y="125" font-size="36" font-weight="800" fill="#111114" letter-spacing="-0.5">With <tspan fill="#cf5038">You.</tspan></text>

        <text x="0" y="170" font-size="14" font-weight="500" fill="#52433c">Modern styles. Timeless pieces.</text>
        <text x="0" y="192" font-size="14" font-weight="500" fill="#52433c">Made for every version of you.</text>

        <!-- Shop Collection CTA Button -->
        <g transform="translate(0, 225)">
          <rect x="0" y="0" width="180" height="48" rx="24" fill="#111114"/>
          <text x="50" y="30" font-size="14" font-weight="700" fill="#ffffff">Shop Collection</text>
          <path d="M 145 25 L 156 25 M 151 21 L 156 25 L 151 29" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </g>
      </g>
    </g>

    <!-- "Featured" Carousel Section -->
    <g transform="translate(24, 655)">
      <text x="0" y="0" font-size="18" font-weight="800" fill="#111114">Featured</text>
      <text x="390" y="0" font-size="13" font-weight="700" fill="#756760">See All →</text>

      <!-- Featured Card 1: Ruched Mini Dress -->
      <g transform="translate(0, 20)">
        <rect x="0" y="0" width="138" height="210" rx="16" fill="#f8f4f0"/>
        <rect x="10" y="10" width="118" height="130" rx="10" fill="#ece4dc"/>
        <text x="12" y="165" font-size="12" font-weight="700" fill="#111114">Ruched Mini Dress</text>
        <text x="12" y="185" font-size="14" font-weight="800" fill="#111114">₹2,499</text>
      </g>

      <!-- Featured Card 2: Oversized Blazer -->
      <g transform="translate(153, 20)">
        <rect x="0" y="0" width="138" height="210" rx="16" fill="#f8f4f0"/>
        <rect x="10" y="10" width="118" height="130" rx="10" fill="#ece4dc"/>
        <text x="12" y="165" font-size="12" font-weight="700" fill="#111114">Oversized Blazer</text>
        <text x="12" y="185" font-size="14" font-weight="800" fill="#111114">₹3,299</text>
      </g>

      <!-- Featured Card 3: Wide Leg Jeans -->
      <g transform="translate(306, 20)">
        <rect x="0" y="0" width="138" height="210" rx="16" fill="#f8f4f0"/>
        <rect x="10" y="10" width="118" height="130" rx="10" fill="#ece4dc"/>
        <text x="12" y="165" font-size="12" font-weight="700" fill="#111114">Wide Leg Jeans</text>
        <text x="12" y="185" font-size="14" font-weight="800" fill="#111114">₹2,199</text>
      </g>
    </g>
  </g>

  <!-- PHONE 3: RIGHT DEVICE (Product Detail & Add to Bag) -->
  <g transform="translate(1480, 160)" filter="url(#phoneShadow)">
    <rect x="0" y="0" width="460" height="980" rx="55" fill="url(#phoneFrame)" stroke="#3a373b" stroke-width="3"/>
    <rect x="12" y="12" width="436" height="956" rx="46" fill="#fcfbfa"/>

    <!-- Dynamic Island -->
    <rect x="175" y="22" width="110" height="28" rx="14" fill="#000000"/>

    <!-- Status Bar -->
    <g transform="translate(370, 32)">
      <path d="M 0 10 L 4 6 L 8 10 M 12 10 L 16 4" stroke="#000000" stroke-width="2"/>
    </g>

    <!-- Top Action Nav -->
    <g transform="translate(30, 75)">
      <!-- Back Arrow -->
      <path d="M 12 6 L 4 14 L 12 22" stroke="#111114" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Heart Wishlist Right -->
      <path d="M 365 8 C 363 5, 358 5, 356 8 C 354 5, 349 5, 347 8 C 344 11, 344 16, 356 23 C 368 16, 368 11, 365 8 Z" stroke="#111114" stroke-width="2" fill="none"/>
    </g>

    <!-- Product Image Card Stage -->
    <g transform="translate(25, 115)">
      <rect x="0" y="0" width="386" height="420" rx="24" fill="#eee5dc"/>
      <!-- Model with Cream Ribbed Knit Sweater -->
      <g transform="translate(110, 60)">
        <ellipse cx="80" cy="180" rx="75" ry="140" fill="#f8f4ec"/>
        <path d="M 40 100 C 60 40, 110 40, 130 100 L 160 260 L 0 260 Z" fill="#faf8f2" stroke="#ded8cd" stroke-width="1.5"/>
      </g>
      <!-- Carousel dots -->
      <circle cx="175" cy="390" r="4" fill="#111114"/>
      <circle cx="190" cy="390" r="4" fill="#ccc"/>
      <circle cx="205" cy="390" r="4" fill="#ccc"/>
    </g>

    <!-- Product Info Details -->
    <g transform="translate(25, 565)">
      <text x="0" y="24" font-size="22" font-weight="800" fill="#111114">Ribbed Knit Sweater</text>
      
      <text x="0" y="65" font-size="24" font-weight="900" fill="#111114">₹2,199</text>
      
      <!-- Rating -->
      <g transform="translate(200, 48)">
        <text x="0" y="16" font-size="13" font-weight="700" fill="#e59819">★ 4.8</text>
        <text x="45" y="16" font-size="13" font-weight="500" fill="#777">(320 reviews)</text>
      </g>

      <text x="0" y="105" font-size="14" font-weight="400" fill="#665d56">A soft, comfortable and stylish sweater perfect</text>
      <text x="0" y="125" font-size="14" font-weight="400" fill="#665d56">for everyday wear.</text>

      <!-- Color Selector -->
      <g transform="translate(0, 160)">
        <text x="0" y="0" font-size="13" font-weight="700" fill="#222">Color</text>
        <circle cx="12" cy="24" r="10" fill="#eae3d7" stroke="#999" stroke-width="2"/>
        <circle cx="42" cy="24" r="10" fill="#d89b88"/>
        <circle cx="72" cy="24" r="10" fill="#1c1c1e"/>
        <circle cx="102" cy="24" r="10" fill="#9e6d4c"/>
      </g>

      <!-- Size Selector -->
      <g transform="translate(0, 225)">
        <text x="0" y="0" font-size="13" font-weight="700" fill="#222">Size</text>
        <text x="320" y="0" font-size="12" font-weight="600" fill="#777">Size Guide</text>
        
        <rect x="0" y="12" width="55" height="38" rx="8" fill="#f0eae4"/>
        <text x="27" y="36" font-size="14" font-weight="600" fill="#333" text-anchor="middle">S</text>

        <!-- Selected M -->
        <rect x="70" y="12" width="55" height="38" rx="8" fill="#111114"/>
        <text x="97" y="36" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">M</text>

        <rect x="140" y="12" width="55" height="38" rx="8" fill="#f0eae4"/>
        <text x="167" y="36" font-size="14" font-weight="600" fill="#333" text-anchor="middle">L</text>

        <rect x="210" y="12" width="55" height="38" rx="8" fill="#f0eae4"/>
        <text x="237" y="36" font-size="14" font-weight="600" fill="#333" text-anchor="middle">XL</text>
      </g>

      <!-- Add to Cart Black Button -->
      <g transform="translate(0, 310)">
        <rect x="0" y="0" width="386" height="56" rx="28" fill="#111114"/>
        <text x="160" y="35" font-size="16" font-weight="700" fill="#ffffff">Add to Cart</text>
        <path d="M 260 30 L 274 30 M 268 25 L 274 30 L 268 35" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </g>
  </g>
</svg>
`;

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'fashion-app.svg'), svg.trim());
  console.log('Saved public/fashion-app.svg');

  // Convert to PNG with Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(path.join(publicDir, 'fashion-app.png'), pngBuffer);
  console.log('Successfully generated high-resolution public/fashion-app.png');

  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'fashion-app.png'), pngBuffer);
    fs.writeFileSync(path.join(distDir, 'fashion-app.svg'), svg.trim());
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
