import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const width = 2400;
const height = 1600;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap');
      * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .bold-heading { font-weight: 800; }
      .semi { font-weight: 600; }
      .med { font-weight: 500; }
    </style>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8f7f5"/>
      <stop offset="50%" stop-color="#f5f3ef"/>
      <stop offset="100%" stop-color="#f0ece4"/>
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.06"/>
    </filter>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.04"/>
    </filter>
    <filter id="sneakerShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="15" dy="30" stdDeviation="35" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Browser/Window Mockup Container -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" rx="28"/>

  <!-- Subtle Organic Decorative Arc / Blob in Hero -->
  <path d="M 1150 0 C 1200 400, 1600 750, 2400 700 L 2400 0 Z" fill="#ebe4d8" opacity="0.6"/>
  <circle cx="1750" cy="500" r="480" fill="#e5ddd0" opacity="0.5"/>

  <!-- ================= TOP NAVIGATION BAR ================= -->
  <g transform="translate(100, 60)">
    <!-- Logo -->
    <text x="0" y="32" font-size="34" font-weight="900" letter-spacing="4" fill="#0f0f11">VAYRO</text>

    <!-- Nav Links (Center) -->
    <g transform="translate(380, 28)">
      <!-- Home (Active with indicator) -->
      <text x="0" y="0" font-size="19" font-weight="700" fill="#0f0f11">Home</text>
      <line x1="0" y1="10" x2="48" y2="10" stroke="#0f0f11" stroke-width="3" stroke-linecap="round"/>

      <text x="100" y="0" font-size="19" font-weight="500" fill="#555558">Shop</text>
      <text x="190" y="0" font-size="19" font-weight="500" fill="#555558">Collections</text>
      <text x="320" y="0" font-size="19" font-weight="500" fill="#555558">About</text>
    </g>

    <!-- Right Controls: Search + Icons -->
    <g transform="translate(1300, 0)">
      <!-- Search Input Pill -->
      <rect x="0" y="0" width="580" height="52" rx="26" fill="#ece9e2" stroke="#e0dcce" stroke-width="1"/>
      <!-- Magnifying Glass -->
      <path d="M 32 24 A 6 6 0 1 1 20 24 A 6 6 0 1 1 32 24 M 29 29 L 36 36" stroke="#77777a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="48" y="32" font-size="16" fill="#88888c" font-weight="400">Search products...</text>

      <!-- User Profile Icon -->
      <g transform="translate(630, 14)">
        <circle cx="12" cy="8" r="6" stroke="#111114" stroke-width="2.5" fill="none"/>
        <path d="M 2 24 C 2 18, 7 16, 12 16 C 17 16, 22 18, 22 24" stroke="#111114" stroke-width="2.5" fill="none"/>
      </g>

      <!-- Shopping Bag Icon + Badge (3) -->
      <g transform="translate(700, 14)">
        <rect x="3" y="6" width="20" height="20" rx="4" stroke="#111114" stroke-width="2.5" fill="none"/>
        <path d="M 8 6 C 8 1, 18 1, 18 6" stroke="#111114" stroke-width="2.5" fill="none"/>
        <!-- Badge -->
        <circle cx="22" cy="3" r="9" fill="#111114"/>
        <text x="22" y="7" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
      </g>
    </g>
  </g>

  <!-- ================= HERO SECTION ================= -->
  <g transform="translate(100, 200)">
    <!-- Sub-tag -->
    <text x="0" y="0" font-size="16" font-weight="700" letter-spacing="3" fill="#6c6c72">NEW COLLECTION / 2026</text>

    <!-- Main Title -->
    <text x="0" y="80" font-size="82" font-weight="800" fill="#0f0f11" letter-spacing="-1.5">Designed to</text>
    <text x="0" y="175" font-size="82" font-weight="800" fill="#0f0f11" letter-spacing="-1.5">be remembered.</text>

    <!-- Subtitle description -->
    <text x="0" y="245" font-size="20" font-weight="400" fill="#58585f">Premium essentials for a better everyday. Minimal design.</text>
    <text x="0" y="275" font-size="20" font-weight="400" fill="#58585f">Maximum impact.</text>

    <!-- Hero CTA Buttons -->
    <g transform="translate(0, 335)">
      <!-- Shop Now Pill -->
      <rect x="0" y="0" width="240" height="66" rx="33" fill="#0f0f11"/>
      <text x="80" y="40" font-size="19" font-weight="700" fill="#ffffff">Shop Now</text>
      <path d="M 180 34 L 198 34 M 192 28 L 198 34 L 192 40" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Explore Collection Text Link -->
      <text x="285" y="40" font-size="19" font-weight="700" fill="#111114">Explore Collection</text>
      <line x1="285" y1="52" x2="455" y2="52" stroke="#111114" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Floating Right Side Brand Slogan -->
    <g transform="translate(1760, 80)">
      <text x="0" y="0" font-size="28" font-weight="800" fill="#0f0f11">Move</text>
      <text x="0" y="34" font-size="28" font-weight="800" fill="#0f0f11">Different.</text>
      <line x1="0" y1="50" x2="40" y2="50" stroke="#0f0f11" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="85" font-size="16" font-weight="500" fill="#55555c">Comfort meets</text>
      <text x="0" y="110" font-size="16" font-weight="500" fill="#55555c">character.</text>
    </g>
  </g>

  <!-- ================= HERO SNEAKER & PEDESTAL ARTWORK ================= -->
  <!-- Dark Volcanic Rock Pedestal -->
  <g transform="translate(1250, 480)">
    <!-- Natural dark textured rock crag base -->
    <path d="M -80 180 L 150 140 L 320 80 L 480 130 L 650 100 L 780 190 L 880 280 L 700 340 L 400 360 L 50 350 Z" fill="#2a2624" opacity="0.95"/>
    <path d="M 120 150 L 320 85 L 500 135 L 430 220 L 220 230 Z" fill="#3a3430"/>
    <path d="M 320 80 L 480 130 L 430 220 Z" fill="#4d4642"/>
    <path d="M -50 200 L 150 150 L 220 230 L 80 280 Z" fill="#1e1b19"/>
    <!-- Subtle mist / horizon fade -->
    <ellipse cx="400" cy="240" rx="360" ry="60" fill="#ece6da" opacity="0.3"/>
  </g>

  <!-- Realistic Cream / Black / Suede Athletic Sneaker -->
  <g transform="translate(1120, 110) rotate(-22 400 350)" filter="url(#sneakerShadow)">
    <!-- Sneaker Outsole Base -->
    <path d="M 180 500 C 260 500, 480 495, 620 490 C 720 485, 820 440, 860 380 C 880 350, 860 320, 830 330 C 800 340, 720 370, 600 380 C 480 390, 240 400, 180 405 C 130 410, 100 450, 130 490 C 145 500, 160 500, 180 500 Z" fill="#1a1a1c"/>
    
    <!-- White / Cream Foam Midsole with AIR cushioning branding -->
    <path d="M 175 480 C 260 480, 480 475, 620 470 C 720 465, 800 425, 840 370 C 830 350, 800 355, 760 365 C 650 390, 480 400, 320 400 C 220 400, 160 415, 140 445 C 135 465, 150 480, 175 480 Z" fill="#f8f7f2" stroke="#e0ded6" stroke-width="2"/>
    
    <!-- Embossed AIR Text Badge on heel midsole -->
    <g transform="translate(240, 442) rotate(3)">
      <rect x="0" y="0" width="75" height="22" rx="11" fill="none" stroke="#b0ada2" stroke-width="2"/>
      <text x="37" y="16" font-size="14" font-weight="900" fill="#6e6b62" letter-spacing="3" text-anchor="middle">AIR</text>
    </g>

    <!-- Upper Body: Light Bone / Sand / Cream Suede Paneling -->
    <path d="M 160 420 C 180 330, 250 250, 330 210 C 370 190, 430 220, 460 260 C 510 320, 580 350, 680 360 C 770 370, 815 360, 830 365 C 800 390, 720 420, 620 440 C 480 460, 260 465, 160 420 Z" fill="#eae6dc"/>
    
    <!-- Toe Box Light Cream Mesh -->
    <path d="M 640 360 C 720 360, 790 355, 825 365 C 790 390, 720 415, 640 425 C 610 395, 620 375, 640 360 Z" fill="#dfd9cd" stroke="#cec7b8" stroke-width="1.5"/>

    <!-- High-Impact Black Leather Swoosh Emblem -->
    <path d="M 330 320 C 390 320, 470 330, 560 260 C 580 245, 595 245, 570 265 C 490 330, 410 365, 340 365 C 290 365, 270 340, 290 325 C 305 315, 320 320, 330 320 Z" fill="#121214"/>

    <!-- Eyestay Suede Overlay & Lacing System -->
    <path d="M 360 240 L 520 290 L 500 325 L 340 270 Z" fill="#d8d2c2"/>
    <!-- Laces (Crisp White Crossings) -->
    <line x1="380" y1="240" x2="410" y2="280" stroke="#fcfbfa" stroke-width="7" stroke-linecap="round"/>
    <line x1="415" y1="250" x2="445" y2="290" stroke="#fcfbfa" stroke-width="7" stroke-linecap="round"/>
    <line x1="450" y1="260" x2="480" y2="300" stroke="#fcfbfa" stroke-width="7" stroke-linecap="round"/>
    <line x1="485" y1="270" x2="515" y2="310" stroke="#fcfbfa" stroke-width="7" stroke-linecap="round"/>
    <line x1="520" y1="280" x2="550" y2="320" stroke="#fcfbfa" stroke-width="7" stroke-linecap="round"/>

    <!-- Padded Ankle Collar & Heel Tab -->
    <path d="M 280 220 C 270 170, 290 150, 320 160 C 340 170, 360 200, 360 240 Z" fill="#18181a"/>
    <path d="M 270 180 C 265 140, 275 125, 290 130 C 300 135, 305 160, 295 190 Z" fill="#f8f7f2"/>
  </g>

  <!-- ================= FLOATING CATEGORY QUICK-CHIPS ================= -->
  <g transform="translate(100, 690)">
    <!-- Container Card Pill -->
    <rect x="0" y="0" width="1380" height="96" rx="48" fill="#fcfbfa" stroke="#e8e4da" stroke-width="1.5" filter="url(#cardShadow)"/>

    <!-- Category 1: Men (Active with black badge) -->
    <g transform="translate(24, 16)">
      <circle cx="32" cy="32" r="32" fill="#0f0f11"/>
      <!-- T-Shirt Icon -->
      <path d="M 22 24 L 28 20 L 36 20 L 42 24 L 46 28 L 41 33 L 38 31 L 38 44 L 26 44 L 26 31 L 23 33 L 18 28 Z" fill="#ffffff"/>
      <text x="80" y="28" font-size="17" font-weight="700" fill="#0f0f11">Men</text>
      <text x="80" y="47" font-size="13" font-weight="500" fill="#75757d">Shop Now</text>
    </g>

    <!-- Category 2: Women -->
    <g transform="translate(290, 16)">
      <circle cx="32" cy="32" r="32" fill="#f4f1e9"/>
      <!-- Dress Icon -->
      <path d="M 26 22 L 38 22 L 35 28 L 42 44 L 22 44 L 29 28 Z" stroke="#111114" stroke-width="2" fill="none"/>
      <text x="80" y="28" font-size="17" font-weight="700" fill="#0f0f11">Women</text>
      <text x="80" y="47" font-size="13" font-weight="500" fill="#75757d">Shop Now</text>
    </g>

    <!-- Category 3: Shoes -->
    <g transform="translate(560, 16)">
      <circle cx="32" cy="32" r="32" fill="#f4f1e9"/>
      <!-- Sneaker Icon -->
      <path d="M 20 36 C 24 36, 28 34, 32 34 C 38 34, 42 38, 46 38 L 44 42 L 18 42 Z" stroke="#111114" stroke-width="2" fill="none"/>
      <text x="80" y="28" font-size="17" font-weight="700" fill="#0f0f11">Shoes</text>
      <text x="80" y="47" font-size="13" font-weight="500" fill="#75757d">Shop Now</text>
    </g>

    <!-- Category 4: Bags -->
    <g transform="translate(820, 16)">
      <circle cx="32" cy="32" r="32" fill="#f4f1e9"/>
      <!-- Bag Icon -->
      <rect x="22" y="26" width="20" height="18" rx="3" stroke="#111114" stroke-width="2" fill="none"/>
      <path d="M 27 26 C 27 21, 37 21, 37 26" stroke="#111114" stroke-width="2" fill="none"/>
      <text x="80" y="28" font-size="17" font-weight="700" fill="#0f0f11">Bags</text>
      <text x="80" y="47" font-size="13" font-weight="500" fill="#75757d">Shop Now</text>
    </g>

    <!-- Category 5: Accessories -->
    <g transform="translate(1090, 16)">
      <circle cx="32" cy="32" r="32" fill="#f4f1e9"/>
      <!-- Watch Icon -->
      <circle cx="32" cy="32" r="8" stroke="#111114" stroke-width="2" fill="none"/>
      <rect x="28" y="20" width="8" height="4" rx="1" fill="#111114"/>
      <rect x="28" y="40" width="8" height="4" rx="1" fill="#111114"/>
      <text x="80" y="28" font-size="17" font-weight="700" fill="#0f0f11">Accessories</text>
      <text x="80" y="47" font-size="13" font-weight="500" fill="#75757d">Shop Now</text>
    </g>

    <!-- Pagination & Arrows on right of hero banner -->
    <g transform="translate(1620, 28)">
      <text x="0" y="26" font-size="16" font-weight="700" fill="#0f0f11">01</text>
      <text x="50" y="26" font-size="16" font-weight="500" fill="#9999a0">02</text>
      <text x="100" y="26" font-size="16" font-weight="500" fill="#9999a0">03</text>
      <!-- Arrow Left -->
      <circle cx="180" cy="20" r="22" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5"/>
      <path d="M 183 14 L 177 20 L 183 26" stroke="#111114" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Arrow Right -->
      <circle cx="236" cy="20" r="22" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5"/>
      <path d="M 233 14 L 239 20 L 233 26" stroke="#111114" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- ================= NEW ARRIVALS HEADER ================= -->
  <g transform="translate(100, 860)">
    <text x="0" y="32" font-size="38" font-weight="800" fill="#0f0f11" letter-spacing="-0.5">New Arrivals</text>
    <g transform="translate(2060, 16)">
      <text x="0" y="16" font-size="18" font-weight="700" fill="#0f0f11">View All</text>
      <path d="M 85 11 L 102 11 M 96 5 L 102 11 L 96 17" stroke="#0f0f11" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- ================= 5 PRODUCT CARDS GRID ================= -->
  <g transform="translate(100, 930)">
    <!-- CARD 1: Essential Hoodie -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <!-- Product Stage Box -->
      <rect x="16" y="16" width="383" height="300" rx="14" fill="#f5f3ed"/>
      <!-- Badge: New -->
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <!-- Heart Wishlist -->
      <path d="M 360 40 C 355 35, 345 35, 340 42 C 335 35, 325 35, 320 40 C 314 46, 314 55, 340 70 C 366 55, 366 46, 360 40 Z" stroke="#111114" stroke-width="2" fill="none" transform="scale(0.8) translate(60, -5)"/>
      <!-- Black Hoodie Silhouette Art -->
      <g transform="translate(115, 70)">
        <path d="M 80 40 C 60 20, 100 20, 80 40 Z" fill="#18181c"/>
        <path d="M 40 50 C 60 30, 100 30, 120 50 L 145 100 L 125 110 L 115 80 L 115 160 L 45 160 L 45 80 L 35 110 L 15 100 Z" fill="#121215"/>
        <rect x="58" y="120" width="44" height="30" rx="6" fill="#1c1c22"/>
        <path d="M 68 50 C 68 70, 92 70, 92 50 Z" fill="#282830"/>
      </g>
      <!-- Title & Price -->
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Essential Hoodie</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹2,499</text>
      <!-- Swatches -->
      <circle cx="34" cy="420" r="7" fill="#121214" stroke="#000000" stroke-width="1.5"/>
      <circle cx="56" cy="420" r="7" fill="#4a4a50"/>
      <circle cx="78" cy="420" r="7" fill="#9a9aa2"/>
    </g>

    <!-- CARD 2: Urban Sneakers -->
    <g transform="translate(445, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <rect x="16" y="16" width="383" height="300" rx="14" fill="#f5f3ed"/>
      <rect x="32" y="32" width="96" height="28" rx="14" fill="#e8e4da"/>
      <text x="80" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">Best Seller</text>
      <path d="M 360 40 C 355 35, 345 35, 340 42 C 335 35, 325 35, 320 40 C 314 46, 314 55, 340 70 C 366 55, 366 46, 360 40 Z" stroke="#111114" stroke-width="2" fill="none" transform="scale(0.8) translate(60, -5)"/>
      <!-- Clean White Low-Top Sneaker Art -->
      <g transform="translate(70, 95)">
        <path d="M 40 120 C 60 120, 180 120, 230 115 C 255 105, 260 85, 230 80 C 180 75, 150 50, 110 50 C 90 50, 70 80, 40 90 Z" fill="#ffffff" stroke="#dedbd2" stroke-width="2"/>
        <path d="M 35 120 C 80 125, 200 125, 240 115 L 235 130 C 180 135, 80 135, 35 130 Z" fill="#f0ede6" stroke="#d5d2c8" stroke-width="1.5"/>
        <path d="M 120 70 L 140 90 M 135 65 L 155 85 M 150 60 L 170 80" stroke="#e0ded6" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Urban Sneakers</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹3,999</text>
      <circle cx="34" cy="420" r="7" fill="#ffffff" stroke="#c0bdb4" stroke-width="1.5"/>
      <circle cx="56" cy="420" r="7" fill="#121214"/>
      <circle cx="78" cy="420" r="7" fill="#c49a6c"/>
    </g>

    <!-- CARD 3: Oversized T-Shirt -->
    <g transform="translate(890, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <rect x="16" y="16" width="383" height="300" rx="14" fill="#f5f3ed"/>
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <path d="M 360 40 C 355 35, 345 35, 340 42 C 335 35, 325 35, 320 40 C 314 46, 314 55, 340 70 C 366 55, 366 46, 360 40 Z" stroke="#111114" stroke-width="2" fill="none" transform="scale(0.8) translate(60, -5)"/>
      <!-- Black T-Shirt Art -->
      <g transform="translate(105, 80)">
        <path d="M 40 40 C 70 25, 110 25, 140 40 L 175 75 L 145 95 L 135 70 L 135 155 L 45 155 L 45 70 L 35 95 L 5 75 Z" fill="#141416"/>
        <path d="M 72 32 C 75 48, 105 48, 108 32 Z" fill="#242428"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Oversized T-Shirt</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹1,499</text>
      <circle cx="34" cy="420" r="7" fill="#121214"/>
      <circle cx="56" cy="420" r="7" fill="#2d3036"/>
      <circle cx="78" cy="420" r="7" fill="#5c6252"/>
    </g>

    <!-- CARD 4: Linen Shirt -->
    <g transform="translate(1335, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <rect x="16" y="16" width="383" height="300" rx="14" fill="#f5f3ed"/>
      <rect x="32" y="32" width="85" height="28" rx="14" fill="#e8e4da"/>
      <text x="74" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">Trending</text>
      <path d="M 360 40 C 355 35, 345 35, 340 42 C 335 35, 325 35, 320 40 C 314 46, 314 55, 340 70 C 366 55, 366 46, 360 40 Z" stroke="#111114" stroke-width="2" fill="none" transform="scale(0.8) translate(60, -5)"/>
      <!-- Sand / Cream Linen Shirt Art -->
      <g transform="translate(105, 80)">
        <path d="M 40 40 C 70 30, 110 30, 140 40 L 165 110 L 140 115 L 130 75 L 130 160 L 50 160 L 50 75 L 40 115 L 15 110 Z" fill="#e6dccd"/>
        <!-- Collar & Buttons -->
        <path d="M 70 34 L 88 55 L 75 75 L 60 40 Z" fill="#d9cdbc"/>
        <path d="M 110 34 L 92 55 L 105 75 L 120 40 Z" fill="#d9cdbc"/>
        <line x1="90" y1="60" x2="90" y2="160" stroke="#c8bca8" stroke-width="2"/>
        <circle cx="90" cy="85" r="2.5" fill="#a09480"/>
        <circle cx="90" cy="115" r="2.5" fill="#a09480"/>
        <circle cx="90" cy="145" r="2.5" fill="#a09480"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Linen Shirt</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹2,199</text>
      <circle cx="34" cy="420" r="7" fill="#e4dac9"/>
      <circle cx="56" cy="420" r="7" fill="#ffffff" stroke="#d0c9bc" stroke-width="1.5"/>
      <circle cx="78" cy="420" r="7" fill="#182333"/>
    </g>

    <!-- CARD 5: Travel Backpack -->
    <g transform="translate(1780, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <rect x="16" y="16" width="383" height="300" rx="14" fill="#f5f3ed"/>
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <path d="M 360 40 C 355 35, 345 35, 340 42 C 335 35, 325 35, 320 40 C 314 46, 314 55, 340 70 C 366 55, 366 46, 360 40 Z" stroke="#111114" stroke-width="2" fill="none" transform="scale(0.8) translate(60, -5)"/>
      <!-- Sleek Matte Black Backpack Art -->
      <g transform="translate(130, 75)">
        <!-- Top Handle -->
        <path d="M 45 40 C 45 25, 75 25, 75 40" stroke="#101012" stroke-width="6" fill="none"/>
        <!-- Main Body -->
        <rect x="25" y="35" width="70" height="120" rx="22" fill="#121215"/>
        <!-- Front Pocket -->
        <rect x="33" y="85" width="54" height="60" rx="12" fill="#1a1a1f" stroke="#25252c" stroke-width="1.5"/>
        <line x1="38" y1="100" x2="82" y2="100" stroke="#33333e" stroke-width="2"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Travel Backpack</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹3,499</text>
      <circle cx="34" cy="420" r="7" fill="#121214"/>
      <circle cx="56" cy="420" r="7" fill="#38383f"/>
      <circle cx="78" cy="420" r="7" fill="#1b2533"/>
    </g>

    <!-- Floating Arrow Right for Carousel -->
    <g transform="translate(2160, 205)">
      <circle cx="28" cy="28" r="28" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5" filter="url(#cardShadow)"/>
      <path d="M 25 18 L 35 28 L 25 38" stroke="#111114" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- ================= FOOTER TRUST FEATURES STRIP ================= -->
  <g transform="translate(100, 1470)">
    <line x1="0" y1="0" x2="2200" y2="0" stroke="#e6e1d6" stroke-width="1.5"/>

    <!-- Trust 1: Free Shipping -->
    <g transform="translate(40, 35)">
      <path d="M 0 16 L 24 16 L 32 24 L 40 24 L 40 38 L 0 38 Z M 8 38 A 5 5 0 1 1 8 48 A 5 5 0 1 1 8 38 M 32 38 A 5 5 0 1 1 32 48 A 5 5 0 1 1 32 38" stroke="#111114" stroke-width="2.5" fill="none"/>
      <text x="60" y="24" font-size="18" font-weight="700" fill="#0f0f11">Free Shipping</text>
      <text x="60" y="46" font-size="14" font-weight="500" fill="#707078">On orders above ₹1,999</text>
    </g>

    <!-- Trust 2: Easy Returns -->
    <g transform="translate(600, 35)">
      <path d="M 30 18 A 12 12 0 1 0 30 36 M 30 12 L 30 20 L 38 20" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="56" y="24" font-size="18" font-weight="700" fill="#0f0f11">Easy Returns</text>
      <text x="56" y="46" font-size="14" font-weight="500" fill="#707078">7-day return policy</text>
    </g>

    <!-- Trust 3: Secure Payments -->
    <g transform="translate(1160, 35)">
      <path d="M 18 14 L 32 18 L 32 32 C 32 42, 18 48, 18 48 C 18 48, 4 42, 4 32 L 4 18 Z M 12 30 L 16 34 L 24 24" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="50" y="24" font-size="18" font-weight="700" fill="#0f0f11">Secure Payments</text>
      <text x="50" y="46" font-size="14" font-weight="500" fill="#707078">100% secure checkout</text>
    </g>

    <!-- Trust 4: 24/7 Support -->
    <g transform="translate(1740, 35)">
      <path d="M 6 30 C 6 18, 14 12, 24 12 C 34 12, 42 18, 42 30 L 42 38 C 42 42, 38 42, 38 42 L 36 32 M 6 30 L 6 38 C 6 42, 10 42, 10 42 L 12 32" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="56" y="24" font-size="18" font-weight="700" fill="#0f0f11">24/7 Support</text>
      <text x="56" y="46" font-size="14" font-weight="500" fill="#707078">We're here to help</text>
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
  fs.writeFileSync(path.join(publicDir, 'ecommerce.svg'), svg.trim());
  console.log('Saved public/ecommerce.svg');

  // Convert to PNG with Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(path.join(publicDir, 'ecommerce.png'), pngBuffer);
  console.log('Successfully generated high-resolution public/ecommerce.png');

  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'ecommerce.png'), pngBuffer);
    fs.writeFileSync(path.join(distDir, 'ecommerce.svg'), svg.trim());
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
