import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const width = 2400;
const height = 1600;

async function fetchBase64(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    const type = res.headers.get('content-type') || 'image/jpeg';
    return `data:${type};base64,${Buffer.from(buf).toString('base64')}`;
  } catch (err) {
    console.warn(`Failed to fetch ${url}:`, err.message);
    return null;
  }
}

async function buildEcommerceImage() {
  console.log('Fetching high-resolution product photography...');
  
  // High quality photographic assets
  const [
    heroSneakerImg,
    hoodieImg,
    urbanSneakerImg,
    tshirtImg,
    linenShirtImg,
    backpackImg,
    rockImg
  ] = await Promise.all([
    fetchBase64('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=90'),
    fetchBase64('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85'),
    fetchBase64('https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=85'),
    fetchBase64('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85'),
    fetchBase64('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85'),
    fetchBase64('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85'),
    fetchBase64('https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=85')
  ]);

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap');
      * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>
    
    <linearGradient id="bgCanvas" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8f7f5"/>
      <stop offset="50%" stop-color="#f5f3ee"/>
      <stop offset="100%" stop-color="#efede6"/>
    </linearGradient>

    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebe5dc"/>
      <stop offset="100%" stop-color="#dfd7cb"/>
    </linearGradient>

    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="135%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.06"/>
    </filter>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.04"/>
    </filter>

    <filter id="pillShadow" x="-10%" y="-15%" width="120%" height="135%">
      <feDropShadow dx="0" dy="12" stdDeviation="22" flood-color="#000000" flood-opacity="0.07"/>
    </filter>

    <!-- Clip Paths for Product Cards -->
    <clipPath id="cardStageClip1"><rect width="383" height="295" rx="14"/></clipPath>
    <clipPath id="cardStageClip2"><rect width="383" height="295" rx="14"/></clipPath>
    <clipPath id="cardStageClip3"><rect width="383" height="295" rx="14"/></clipPath>
    <clipPath id="cardStageClip4"><rect width="383" height="295" rx="14"/></clipPath>
    <clipPath id="cardStageClip5"><rect width="383" height="295" rx="14"/></clipPath>
    <clipPath id="heroShoeClip"><rect width="1050" height="620" rx="30"/></clipPath>
  </defs>

  <!-- Browser/Window Mockup Container -->
  <rect width="${width}" height="${height}" fill="url(#bgCanvas)" rx="24"/>

  <!-- Subtle Warm Arc Shape in Hero -->
  <circle cx="1780" cy="460" r="540" fill="url(#arcGrad)" opacity="0.65"/>
  <path d="M 1180 0 C 1220 380, 1600 750, 2400 700 L 2400 0 Z" fill="#ebe4d8" opacity="0.5"/>

  <!-- ================= TOP NAVIGATION BAR ================= -->
  <g transform="translate(100, 58)">
    <!-- Logo -->
    <text x="0" y="34" font-size="34" font-weight="900" letter-spacing="4" fill="#0f0f11">VAYRO</text>

    <!-- Center Navigation Links -->
    <g transform="translate(420, 30)">
      <!-- Home (Active) -->
      <text x="0" y="0" font-size="19" font-weight="700" fill="#0f0f11">Home</text>
      <rect x="0" y="9" width="48" height="3" rx="1.5" fill="#0f0f11"/>

      <text x="105" y="0" font-size="19" font-weight="500" fill="#66666d">Shop</text>
      <text x="200" y="0" font-size="19" font-weight="500" fill="#66666d">Collections</text>
      <text x="340" y="0" font-size="19" font-weight="500" fill="#66666d">About</text>
    </g>

    <!-- Right Controls: Search Pill + Profile + Cart -->
    <g transform="translate(1360, 2)">
      <!-- Search Input Pill -->
      <rect x="0" y="0" width="560" height="52" rx="26" fill="#ece9e2" stroke="#dedad0" stroke-width="1"/>
      <path d="M 32 23 A 7 7 0 1 1 18 23 A 7 7 0 1 1 32 23 M 28 29 L 36 37" stroke="#77777e" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <text x="50" y="32" font-size="16" fill="#888890" font-weight="400">Search products...</text>

      <!-- User Profile Icon -->
      <g transform="translate(615, 13)">
        <circle cx="12" cy="8" r="6" stroke="#111114" stroke-width="2.2" fill="none"/>
        <path d="M 2 24 C 2 18, 7 16, 12 16 C 17 16, 22 18, 22 24" stroke="#111114" stroke-width="2.2" fill="none"/>
      </g>

      <!-- Shopping Bag Icon + Badge (3) -->
      <g transform="translate(685, 13)">
        <rect x="3" y="6" width="20" height="20" rx="4" stroke="#111114" stroke-width="2.2" fill="none"/>
        <path d="M 8 6 C 8 1, 18 1, 18 6" stroke="#111114" stroke-width="2.2" fill="none"/>
        <circle cx="23" cy="3" r="9" fill="#111114"/>
        <text x="23" y="7" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
      </g>
    </g>
  </g>

  <!-- ================= HERO LEFT TEXT ================= -->
  <g transform="translate(100, 205)">
    <!-- Sub-tag -->
    <text x="0" y="0" font-size="16" font-weight="700" letter-spacing="3.5" fill="#717178">NEW COLLECTION / 2026</text>

    <!-- Main Headline -->
    <text x="0" y="78" font-size="84" font-weight="800" fill="#0f0f11" letter-spacing="-1.5">Designed to</text>
    <text x="0" y="174" font-size="84" font-weight="800" fill="#0f0f11" letter-spacing="-1.5">be remembered.</text>

    <!-- Subtitle description -->
    <text x="0" y="246" font-size="20" font-weight="400" fill="#585860">Premium essentials for a better everyday. Minimal design.</text>
    <text x="0" y="278" font-size="20" font-weight="400" fill="#585860">Maximum impact.</text>

    <!-- Hero CTA Buttons -->
    <g transform="translate(0, 335)">
      <!-- Shop Now Pill -->
      <rect x="0" y="0" width="240" height="66" rx="33" fill="#0f0f11"/>
      <text x="76" y="40" font-size="19" font-weight="700" fill="#ffffff">Shop Now</text>
      <path d="M 180 34 L 198 34 M 192 28 L 198 34 L 192 40" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Explore Collection Text Link -->
      <text x="285" y="40" font-size="19" font-weight="700" fill="#111114">Explore Collection</text>
      <line x1="285" y1="52" x2="455" y2="52" stroke="#111114" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ================= HERO RIGHT: SNEAKER & PEDESTAL ARTWORK ================= -->
  <g transform="translate(1120, 110)">
    <!-- Realistic Volcanic Stone Pedestal Texture -->
    ${rockImg ? `
      <g transform="translate(180, 360)">
        <ellipse cx="280" cy="180" rx="360" ry="120" fill="#201c1a" opacity="0.9"/>
        <image href="${rockImg}" x="0" y="80" width="560" height="220" preserveAspectRatio="xMidYMid slice" opacity="0.85"/>
      </g>
    ` : ''}

    <!-- Hero Sneaker Showcase Image -->
    ${heroSneakerImg ? `
      <g transform="translate(60, 0)">
        <!-- Natural soft shadow under shoe -->
        <ellipse cx="440" cy="480" rx="320" ry="45" fill="#141110" opacity="0.4" filter="url(#softShadow)"/>
        <image href="${heroSneakerImg}" x="80" y="20" width="760" height="520" preserveAspectRatio="xMidYMid meet"/>
      </g>
    ` : ''}

    <!-- Floating Right Brand Slogan -->
    <g transform="translate(780, 140)">
      <text x="0" y="0" font-size="30" font-weight="800" fill="#0f0f11">Move</text>
      <text x="0" y="36" font-size="30" font-weight="800" fill="#0f0f11">Different.</text>
      <line x1="0" y1="54" x2="44" y2="54" stroke="#0f0f11" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="92" font-size="17" font-weight="500" fill="#62626a">Comfort meets</text>
      <text x="0" y="118" font-size="17" font-weight="500" fill="#62626a">character.</text>
    </g>
  </g>

  <!-- ================= FLOATING CATEGORY QUICK-CHIPS ================= -->
  <g transform="translate(100, 690)">
    <!-- Container Card Pill -->
    <rect x="0" y="0" width="1380" height="96" rx="48" fill="#fcfbfa" stroke="#e8e4da" stroke-width="1.5" filter="url(#pillShadow)"/>

    <!-- Category 1: Men (Active with black circle) -->
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

    <!-- Pagination & Carousel Controls -->
    <g transform="translate(1620, 26)">
      <text x="0" y="28" font-size="16" font-weight="700" fill="#0f0f11">01</text>
      <text x="50" y="28" font-size="16" font-weight="500" fill="#9999a0">02</text>
      <text x="100" y="28" font-size="16" font-weight="500" fill="#9999a0">03</text>
      <!-- Arrow Left -->
      <circle cx="180" cy="22" r="22" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5"/>
      <path d="M 183 16 L 177 22 L 183 28" stroke="#111114" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Arrow Right -->
      <circle cx="236" cy="22" r="22" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5"/>
      <path d="M 233 16 L 239 22 L 233 28" stroke="#111114" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
      <g transform="translate(16, 16)">
        <rect width="383" height="300" rx="14" fill="#f5f3ed"/>
        <g clip-path="url(#cardStageClip1)">
          ${hoodieImg ? `<image href="${hoodieImg}" x="16" y="10" width="351" height="280" preserveAspectRatio="xMidYMid meet"/>` : ''}
        </g>
      </g>
      <!-- Badge: New -->
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <!-- Heart Wishlist -->
      <g transform="translate(362, 34)">
        <path d="M 12 5 C 10 2, 6 2, 4 5 C 1 8, 2 13, 12 20 C 22 13, 23 8, 20 5 C 18 2, 14 2, 12 5 Z" stroke="#111114" stroke-width="2" fill="none"/>
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
      <g transform="translate(16, 16)">
        <rect width="383" height="300" rx="14" fill="#f5f3ed"/>
        <g clip-path="url(#cardStageClip2)">
          ${urbanSneakerImg ? `<image href="${urbanSneakerImg}" x="16" y="10" width="351" height="280" preserveAspectRatio="xMidYMid meet"/>` : ''}
        </g>
      </g>
      <!-- Badge: Best Seller -->
      <rect x="32" y="32" width="96" height="28" rx="14" fill="#e8e4da"/>
      <text x="80" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">Best Seller</text>
      <!-- Heart Wishlist -->
      <g transform="translate(362, 34)">
        <path d="M 12 5 C 10 2, 6 2, 4 5 C 1 8, 2 13, 12 20 C 22 13, 23 8, 20 5 C 18 2, 14 2, 12 5 Z" stroke="#111114" stroke-width="2" fill="none"/>
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
      <g transform="translate(16, 16)">
        <rect width="383" height="300" rx="14" fill="#f5f3ed"/>
        <g clip-path="url(#cardStageClip3)">
          ${tshirtImg ? `<image href="${tshirtImg}" x="16" y="10" width="351" height="280" preserveAspectRatio="xMidYMid meet"/>` : ''}
        </g>
      </g>
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <g transform="translate(362, 34)">
        <path d="M 12 5 C 10 2, 6 2, 4 5 C 1 8, 2 13, 12 20 C 22 13, 23 8, 20 5 C 18 2, 14 2, 12 5 Z" stroke="#111114" stroke-width="2" fill="none"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Oversized T-Shirt</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹1,499</text>
      <circle cx="34" cy="420" r="7" fill="#121214"/>
      <circle cx="56" cy="420" r="7" fill="#4d5345"/>
      <circle cx="78" cy="420" r="7" fill="#2d3748"/>
    </g>

    <!-- CARD 4: Linen Shirt -->
    <g transform="translate(1335, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <g transform="translate(16, 16)">
        <rect width="383" height="300" rx="14" fill="#f5f3ed"/>
        <g clip-path="url(#cardStageClip4)">
          ${linenShirtImg ? `<image href="${linenShirtImg}" x="16" y="10" width="351" height="280" preserveAspectRatio="xMidYMid meet"/>` : ''}
        </g>
      </g>
      <rect x="32" y="32" width="86" height="28" rx="14" fill="#e8e4da"/>
      <text x="75" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">Trending</text>
      <g transform="translate(362, 34)">
        <path d="M 12 5 C 10 2, 6 2, 4 5 C 1 8, 2 13, 12 20 C 22 13, 23 8, 20 5 C 18 2, 14 2, 12 5 Z" stroke="#111114" stroke-width="2" fill="none"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Linen Shirt</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹2,199</text>
      <circle cx="34" cy="420" r="7" fill="#d9cfbf" stroke="#c0b5a3" stroke-width="1"/>
      <circle cx="56" cy="420" r="7" fill="#c49a6c"/>
      <circle cx="78" cy="420" r="7" fill="#1b2533"/>
    </g>

    <!-- CARD 5: Travel Backpack -->
    <g transform="translate(1780, 0)">
      <rect x="0" y="0" width="415" height="460" rx="20" fill="#fcfbfa" stroke="#ece7de" stroke-width="1.5" filter="url(#cardShadow)"/>
      <g transform="translate(16, 16)">
        <rect width="383" height="300" rx="14" fill="#f5f3ed"/>
        <g clip-path="url(#cardStageClip5)">
          ${backpackImg ? `<image href="${backpackImg}" x="16" y="10" width="351" height="280" preserveAspectRatio="xMidYMid meet"/>` : ''}
        </g>
      </g>
      <rect x="32" y="32" width="60" height="28" rx="14" fill="#e8e4da"/>
      <text x="62" y="50" font-size="13" font-weight="700" fill="#44444a" text-anchor="middle">New</text>
      <g transform="translate(362, 34)">
        <path d="M 12 5 C 10 2, 6 2, 4 5 C 1 8, 2 13, 12 20 C 22 13, 23 8, 20 5 C 18 2, 14 2, 12 5 Z" stroke="#111114" stroke-width="2" fill="none"/>
      </g>
      <text x="24" y="352" font-size="18" font-weight="700" fill="#0f0f11">Travel Backpack</text>
      <text x="24" y="384" font-size="20" font-weight="800" fill="#0f0f11">₹3,499</text>
      <circle cx="34" cy="420" r="7" fill="#141416"/>
      <circle cx="56" cy="420" r="7" fill="#52525a"/>
      <circle cx="78" cy="420" r="7" fill="#1f2d3d"/>
    </g>

    <!-- Floating Right Carousel Next Button -->
    <g transform="translate(2220, 200)" filter="url(#cardShadow)">
      <circle cx="28" cy="28" r="28" fill="#ffffff" stroke="#e0dcce" stroke-width="1.5"/>
      <path d="M 25 18 L 33 28 L 25 38" stroke="#111114" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- ================= FOOTER TRUST BADGES STRIP ================= -->
  <g transform="translate(100, 1475)">
    <line x1="0" y1="0" x2="2200" y2="0" stroke="#e5e0d4" stroke-width="1.5"/>

    <!-- Trust 1: Free Shipping -->
    <g transform="translate(40, 32)">
      <path d="M 4 30 L 4 12 C 4 10, 6 8, 8 8 L 28 8 C 30 8, 32 10, 32 12 L 32 30 M 32 18 L 40 18 L 46 26 L 46 30 L 32 30" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="14" cy="32" r="5" stroke="#111114" stroke-width="2.5" fill="#f8f7f5"/>
      <circle cx="38" cy="32" r="5" stroke="#111114" stroke-width="2.5" fill="#f8f7f5"/>
      <text x="62" y="22" font-size="18" font-weight="700" fill="#0f0f11">Free Shipping</text>
      <text x="62" y="44" font-size="14" font-weight="500" fill="#707078">On orders above ₹1,999</text>
    </g>

    <!-- Trust 2: Easy Returns -->
    <g transform="translate(620, 32)">
      <path d="M 8 22 A 16 16 0 1 1 24 38 M 4 16 L 8 22 L 14 18" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="56" y="22" font-size="18" font-weight="700" fill="#0f0f11">Easy Returns</text>
      <text x="56" y="44" font-size="14" font-weight="500" fill="#707078">7-day return policy</text>
    </g>

    <!-- Trust 3: Secure Payments -->
    <g transform="translate(1180, 32)">
      <path d="M 22 6 L 8 12 L 8 24 C 8 34, 22 42, 22 42 C 22 42, 36 34, 36 24 L 36 12 Z" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 16 23 L 20 27 L 28 19" stroke="#111114" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="54" y="22" font-size="18" font-weight="700" fill="#0f0f11">Secure Payments</text>
      <text x="54" y="44" font-size="14" font-weight="500" fill="#707078">100% secure checkout</text>
    </g>

    <!-- Trust 4: 24/7 Support -->
    <g transform="translate(1760, 32)">
      <path d="M 6 28 C 6 16, 14 10, 24 10 C 34 10, 42 16, 42 28 L 42 36 C 42 40, 38 40, 38 40 L 36 30 M 6 28 L 6 36 C 6 40, 10 40, 10 40 L 12 30" stroke="#111114" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="56" y="22" font-size="18" font-weight="700" fill="#0f0f11">24/7 Support</text>
      <text x="56" y="44" font-size="14" font-weight="500" fill="#707078">We're here to help</text>
    </g>
  </g>
</svg>
`;

  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  fs.writeFileSync(path.join(publicDir, 'ecommerce.svg'), svg.trim());
  console.log('Written public/ecommerce.svg');

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(path.join(publicDir, 'ecommerce.png'), pngBuffer);
  console.log(`Successfully generated high-resolution photographic public/ecommerce.png (${pngBuffer.length} bytes)`);

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'ecommerce.png'), pngBuffer);
    fs.writeFileSync(path.join(distDir, 'ecommerce.svg'), svg.trim());
    console.log('Synchronized to dist/ecommerce.png');
  }
}

buildEcommerceImage().catch((e) => {
  console.error('Error generating image:', e);
  process.exit(1);
});
