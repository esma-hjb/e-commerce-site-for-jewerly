/**
 * ModernTakı (moderntaki.co) - Persistent Database Management Layer
 * Handles Products, Stock Refills, User Authentication, Cart (+/-), Wishlist, Orders,
 * and In-Place Product/Photo Editing.
 */

const DB = (() => {
  const STORAGE_KEYS = {
    PRODUCTS: 'moderntaki_products',
    USERS: 'moderntaki_users',
    CURRENT_USER: 'moderntaki_current_user',
    CART: 'moderntaki_cart',
    WISHLIST: 'moderntaki_wishlist',
    ORDERS: 'moderntaki_orders',
    BANNER: 'moderntaki_hero_banner',
    CLOUD_SYNC: 'moderntaki_cloud_sync'
  };

  // Clean, realistic jewelry catalog without exaggerated claims
  const INITIAL_PRODUCTS = (typeof window !== 'undefined' && Array.isArray(window.MODERNTAKI_CATALOG) && window.MODERNTAKI_CATALOG.length > 0)
    ? window.MODERNTAKI_CATALOG
    : [
    {
      id: "mt-001",
      name: {
        tr: "Soleil Altın Kaplama Madalyon Kolye",
        en: "Soleil Gold Finish Medallion Necklace"
      },
      description: {
        tr: "Güneş figürlü zarif madalyon kolye. Günlük kullanım ve özel kombinler için şık ve modern bir tamamlayıcı.",
        en: "Sun medallion pendant necklace. A chic, modern accessory perfect for everyday wear and special occasions."
      },
      category: "kolye",
      material: "altin",
      priceTRY: 450,
      discountPriceTRY: 390,
      stock: 12,
      badge: { tr: "Çok Satan", en: "Best Seller" },
      rating: 4.9,
      reviewCount: 24,
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Finish", color: "#D4AF37" },
        { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" }
      ],
      sizes: ["40 cm + 5 cm Uzatma", "45 cm + 5 cm Uzatma"]
    },
    {
      id: "mt-002",
      name: {
        tr: "Éternité Baget Taşlı Zarif Yüzük",
        en: "Éternité Baguette Shimmer Ring"
      },
      description: {
        tr: "Işıltılı baget zirkon taşlı modern yüzük. Sade tasarımıyla tek başına veya diğer yüzüklerle kombinlenebilir.",
        en: "Sparkling baguette zirconia ring. Minimalist and versatile for stacking or solo styling."
      },
      category: "yuzuk",
      material: "gumus",
      priceTRY: 320,
      discountPriceTRY: null,
      stock: 8,
      badge: { tr: "Yeni", en: "New" },
      rating: 4.8,
      reviewCount: 16,
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" },
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Finish", color: "#D4AF37" }
      ],
      sizes: ["12 Numara", "14 Numara", "16 Numara", "18 Numara"]
    },
    {
      id: "mt-003",
      name: {
        tr: "Riviera Zirkon Su Yolu Bileklik",
        en: "Riviera Zirconia Tennis Bracelet"
      },
      description: {
        tr: "Işıltılı sıralı zirkon taşlı su yolu bileklik. Kilit mekanizmasıyla güvenli ve konforlu kullanım sağlar.",
        en: "Classic tennis bracelet with continuous zirconia stones and secure clasp."
      },
      category: "bileklik",
      material: "altin",
      priceTRY: 490,
      discountPriceTRY: 420,
      stock: 7,
      badge: { tr: "Özel Fırsat", en: "Special Offer" },
      rating: 4.9,
      reviewCount: 31,
      images: [
        "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" },
        { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" }
      ],
      sizes: ["16 cm", "18 cm (Standart)"]
    },
    {
      id: "mt-004",
      name: {
        tr: "Baroque Doğal İnci Küpe",
        en: "Baroque Natural Pearl Earrings"
      },
      description: {
        tr: "Organik formda doğal tatlı su incisi sarkıt küpe. Her incinin kendine has doğal bir dokusu vardır.",
        en: "Organic freshwater pearl drop earrings with elegant lightweight hooks."
      },
      category: "kupe",
      material: "inci",
      priceTRY: 380,
      discountPriceTRY: null,
      stock: 10,
      badge: { tr: "Trend", en: "Trending" },
      rating: 4.9,
      reviewCount: 19,
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Renk Kanca", nameEn: "Gold Color Hook", color: "#D4AF37" },
        { id: "gumus", nameTr: "Gümüş Renk Kanca", nameEn: "Silver Color Hook", color: "#C0C0C0" }
      ],
      sizes: ["Standart Ebat"]
    },
    {
      id: "mt-005",
      name: {
        tr: "Venezia Burgu Zincir Kolye",
        en: "Venezia Twisted Rope Chain"
      },
      description: {
        tr: "Dökümlü burgu zincir tasarımı. Günlük kombinlerinizde tişört veya gömleklerle mükemmel uyum sağlar.",
        en: "Twisted rope chain necklace. Perfect for layering or as a simple statement."
      },
      category: "kolye",
      material: "altin",
      priceTRY: 390,
      discountPriceTRY: 340,
      stock: 9,
      badge: { tr: "Temel Parça", en: "Essential" },
      rating: 4.7,
      reviewCount: 22,
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" },
        { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" }
      ],
      sizes: ["45 cm", "50 cm"]
    },
    {
      id: "mt-006",
      name: {
        tr: "Vintage Zümrüt Yeşili Baget Yüzük",
        en: "Vintage Emerald Tone Baguette Ring"
      },
      description: {
        tr: "Zümrüt yeşili zirkon taş ve minik taş detaylarıyla zenginleştirilmiş vintage esintili yüzük.",
        en: "Emerald-green tone centerpiece with pavé accents for a vintage look."
      },
      category: "yuzuk",
      material: "altin",
      priceTRY: 350,
      discountPriceTRY: 290,
      stock: 6,
      badge: null,
      rating: 4.8,
      reviewCount: 14,
      images: [
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" },
        { id: "rose", nameTr: "Rose Renk", nameEn: "Rose Finish", color: "#B76E79" }
      ],
      sizes: ["12 Numara", "14 Numara", "16 Numara", "18 Numara"]
    },
    {
      id: "mt-007",
      name: {
        tr: "Lumière Kalın Halka Küpe (25mm)",
        en: "Lumière Bold Hoop Earrings"
      },
      description: {
        tr: "Hafif yapılı, kulağı yormayan parlak cilalı modern halka küpe. Her kombinin vazgeçilmezi.",
        en: "Lightweight hollow hoop earrings with high-polish finish."
      },
      category: "kupe",
      material: "altin",
      priceTRY: 280,
      discountPriceTRY: null,
      stock: 14,
      badge: null,
      rating: 4.9,
      reviewCount: 28,
      images: [
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" },
        { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" }
      ],
      sizes: ["20 mm", "25 mm"]
    },
    {
      id: "mt-008",
      name: {
        tr: "Milano Örgü Dokulu Kelepçe Bileklik",
        en: "Milano Mesh Textured Bangle"
      },
      description: {
        tr: "Esnek ergonomik formuyla her bileğe uyum sağlayan modern kelepçe bileklik.",
        en: "Flexible ergonomic mesh bangle with modern contours."
      },
      category: "bileklik",
      material: "rose",
      priceTRY: 460,
      discountPriceTRY: 390,
      stock: 5,
      badge: null,
      rating: 4.8,
      reviewCount: 18,
      images: [
        "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"
      ],
      materialOptions: [
        { id: "rose", nameTr: "Rose Renk", nameEn: "Rose Finish", color: "#B76E79" },
        { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" }
      ],
      sizes: ["Standart (Ayarlanabilir)"]
    }
  ];

  const INITIAL_USERS = [];

  const hashPass = (email, pw) => {
    const str = `mt_salt_2026:${String(email || '').trim().toLowerCase()}:${String(pw || '')}`;
    let h1 = 0xdeadbeef ^ str.length, h2 = 0x41c6ce57 ^ str.length;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 'sha_' + (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  };

  // Helper storage operations
  const getItem = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  // Always update to current cleaner catalog if needed
  const init = () => {
    // Check if external catalog file (products-data.js) has updated version
    const savedVersion = localStorage.getItem('moderntaki_catalog_version');
    const catalogVersion = (typeof window !== 'undefined' && window.MODERNTAKI_CATALOG_VERSION) ? window.MODERNTAKI_CATALOG_VERSION : null;

    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS) || (catalogVersion && catalogVersion !== savedVersion)) {
      const catalogToLoad = (typeof window !== 'undefined' && Array.isArray(window.MODERNTAKI_CATALOG) && window.MODERNTAKI_CATALOG.length > 0)
        ? window.MODERNTAKI_CATALOG
        : INITIAL_PRODUCTS;
      setItem(STORAGE_KEYS.PRODUCTS, catalogToLoad);
      if (catalogVersion) {
        localStorage.setItem('moderntaki_catalog_version', catalogVersion);
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    } else {
      const existingUsers = getItem(STORAGE_KEYS.USERS, []).filter(u => u && u.email !== 'demo@moderntaki.co');
      setItem(STORAGE_KEYS.USERS, existingUsers);
      const cur = getItem(STORAGE_KEYS.CURRENT_USER, null);
      if (cur && cur.email === 'demo@moderntaki.co') {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      setItem(STORAGE_KEYS.CART, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
      setItem(STORAGE_KEYS.WISHLIST, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      setItem(STORAGE_KEYS.ORDERS, []);
    }
  };

  init();

  return {
    // PRODUCTS CATALOG
    getProducts: () => getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS),

    getProductById: (id) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return products.find(p => p.id === id) || null;
    },

    addProduct: (productData) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const newProduct = {
        id: "mt-" + Date.now().toString().slice(-6),
        name: {
          tr: productData.nameTr || "Yeni Takı",
          en: productData.nameEn || productData.nameTr || "New Jewelry"
        },
        description: {
          tr: productData.descriptionTr || "Zarif ve modern takı tasarımı.",
          en: productData.descriptionEn || "Elegant modern jewelry design."
        },
        category: productData.category || "kolye",
        material: productData.material || "altin",
        priceTRY: parseFloat(productData.priceTRY) || 0,
        discountPriceTRY: productData.discountPriceTRY ? parseFloat(productData.discountPriceTRY) : null,
        stock: parseInt(productData.stock, 10) || 5,
        badge: productData.badgeTr ? { tr: productData.badgeTr, en: productData.badgeEn || productData.badgeTr } : null,
        rating: 5.0,
        reviewCount: 1,
        images: productData.images && productData.images.length > 0 ? productData.images : [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
        ],
        materialOptions: [
          { id: "altin", nameTr: "Altın Kaplama", nameEn: "Gold Plated", color: "#D4AF37" },
          { id: "gumus", nameTr: "Gümüş Renk", nameEn: "Silver Finish", color: "#C0C0C0" }
        ],
        sizes: productData.sizes || ["Standart Ebat"]
      };

      products.unshift(newProduct);
      setItem(STORAGE_KEYS.PRODUCTS, products);
      return newProduct;
    },

    // In-place edit of existing product (Change Photo, Name, Price, Stock)
    updateProduct: (productId, fields) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const index = products.findIndex(p => p.id === productId);
      if (index === -1) return null;

      const p = products[index];

      if (fields.nameTr) p.name.tr = fields.nameTr;
      if (fields.nameEn) p.name.en = fields.nameEn;
      if (fields.priceTRY !== undefined) p.priceTRY = parseFloat(fields.priceTRY);
      if (fields.discountPriceTRY !== undefined) {
        p.discountPriceTRY = fields.discountPriceTRY ? parseFloat(fields.discountPriceTRY) : null;
      }
      if (fields.stock !== undefined) p.stock = parseInt(fields.stock, 10);
      if (fields.category) p.category = fields.category;
      if (fields.material) p.material = fields.material;
      if (fields.descriptionTr) p.description.tr = fields.descriptionTr;
      if (fields.images && fields.images.length > 0) {
        p.images = fields.images;
      }

      products[index] = p;
      setItem(STORAGE_KEYS.PRODUCTS, products);
      return p;
    },

    updateStock: (productId, newStock) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        products[index].stock = Math.max(0, parseInt(newStock, 10));
        setItem(STORAGE_KEYS.PRODUCTS, products);
        return products[index];
      }
      return null;
    },

    adjustStock: (productId, delta) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        const current = products[index].stock || 0;
        products[index].stock = Math.max(0, current + delta);
        setItem(STORAGE_KEYS.PRODUCTS, products);
        return products[index];
      }
      return null;
    },

    deleteProduct: (productId) => {
      const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const filtered = products.filter(p => p.id !== productId);
      setItem(STORAGE_KEYS.PRODUCTS, filtered);
      return true;
    },

    // Reset to clean initial products
    resetCatalogToClean: () => {
      setItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return true;
    },

    // USERS & AUTH (Supabase Cloud Customers + Local Fallback)
    getUsers: () => getItem(STORAGE_KEYS.USERS, INITIAL_USERS),

    getCurrentUser: () => getItem(STORAGE_KEYS.CURRENT_USER, null),

    login: async (email, password) => {
      const cleanEmail = String(email || '').trim().toLowerCase();
      const hashed = hashPass(cleanEmail, password);

      // 1. Try Supabase Cloud Login first
      try {
        const { url, anonKey } = DB.getCloudConfig();
        if (url && url.includes('supabase.co') && anonKey) {
          const cleanUrl = url.replace(/\/+$/, '');
          const res = await fetch(`${cleanUrl}/rest/v1/rpc/login_customer`, {
            method: 'POST',
            headers: {
              'apikey': anonKey,
              'Authorization': `Bearer ${anonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              p_email: cleanEmail,
              p_password_hash: hashed
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.ok && data.user) {
              setItem(STORAGE_KEYS.CURRENT_USER, data.user);
              return { success: true, user: data.user };
            }
            if (data && data.ok === false) {
              return { success: false, message: data.message || "E-posta veya şifre hatalı!" };
            }
          }
        }
      } catch (e) {}

      // 2. Fallback to local storage if offline or SQL not run yet
      const users = getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
      const user = users.find(u => u.email.toLowerCase() === cleanEmail && (u.passwordHash === hashed || u.password === password));
      if (user) {
        const safeUser = { ...user };
        delete safeUser.password;
        delete safeUser.passwordHash;
        setItem(STORAGE_KEYS.CURRENT_USER, safeUser);
        return { success: true, user: safeUser };
      }
      return { success: false, message: "E-posta veya şifre hatalı!" };
    },

    register: async (userData) => {
      const cleanEmail = String(userData.email || '').trim().toLowerCase();
      if (String(userData.password || '').length < 6) {
        return { success: false, message: "Şifreniz en az 6 karakter olmalıdır!" };
      }
      const cleanName = String(userData.name || '').replace(/[<>]/g, '').trim();
      const cleanPhone = String(userData.phone || "").replace(/[<>]/g, '').trim();
      const hashed = hashPass(cleanEmail, userData.password);

      // 1. Try Supabase Cloud Registration first
      try {
        const { url, anonKey } = DB.getCloudConfig();
        if (url && url.includes('supabase.co') && anonKey) {
          const cleanUrl = url.replace(/\/+$/, '');
          const res = await fetch(`${cleanUrl}/rest/v1/rpc/register_customer`, {
            method: 'POST',
            headers: {
              'apikey': anonKey,
              'Authorization': `Bearer ${anonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              p_name: cleanName,
              p_email: cleanEmail,
              p_phone: cleanPhone,
              p_password_hash: hashed
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.ok && data.user) {
              setItem(STORAGE_KEYS.CURRENT_USER, data.user);
              return { success: true, user: data.user };
            }
            if (data && data.ok === false) {
              return { success: false, message: data.message || "Bu e-posta adresiyle zaten kayıtlı bir hesap var!" };
            }
          }
        }
      } catch (e) {}

      // 2. Fallback to local storage
      const users = getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
      const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return { success: false, message: "Bu e-posta adresiyle zaten kayıtlı bir hesap var!" };
      }

      const newUser = {
        id: "usr-" + Date.now().toString().slice(-6),
        name: cleanName,
        email: cleanEmail,
        passwordHash: hashed,
        phone: cleanPhone,
        city: String(userData.city || "").replace(/[<>]/g, '').trim(),
        address: String(userData.address || "").replace(/[<>]/g, '').trim(),
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      setItem(STORAGE_KEYS.USERS, users);

      const safeUser = { ...newUser };
      delete safeUser.passwordHash;
      setItem(STORAGE_KEYS.CURRENT_USER, safeUser);
      return { success: true, user: safeUser };
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return true;
    },

    // CART (with +/- quantity stepper)
    getCart: () => getItem(STORAGE_KEYS.CART, []),

    addToCart: (productId, quantity = 1, options = {}) => {
      const cart = getItem(STORAGE_KEYS.CART, []);
      const product = DB.getProductById(productId);
      if (!product) return { success: false, message: "Ürün bulunamadı" };

      if (product.stock <= 0) {
        return { success: false, message: "Ürün stokta tükenmiştir!" };
      }

      const selectedMaterial = options.material || (product.materialOptions && product.materialOptions[0]?.id) || 'default';
      const selectedSize = options.size || (product.sizes && product.sizes[0]) || 'Standart';

      const existingIndex = cart.findIndex(item => 
        item.productId === productId && 
        item.material === selectedMaterial && 
        item.size === selectedSize
      );

      const requestedQty = Math.max(1, parseInt(quantity, 10));

      if (existingIndex > -1) {
        const newTotalQty = cart[existingIndex].quantity + requestedQty;
        if (newTotalQty > product.stock) {
          cart[existingIndex].quantity = product.stock;
          setItem(STORAGE_KEYS.CART, cart);
          return { success: true, message: `Maksimum stok miktarına (${product.stock} adet) ulaşıldı.`, cart };
        }
        cart[existingIndex].quantity = newTotalQty;
      } else {
        const cappedQty = Math.min(requestedQty, product.stock);
        cart.push({
          cartItemId: "cart-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100),
          productId: product.id,
          quantity: cappedQty,
          material: selectedMaterial,
          size: selectedSize,
          addedAt: new Date().toISOString()
        });
      }

      setItem(STORAGE_KEYS.CART, cart);
      return { success: true, cart };
    },

    updateCartQuantity: (cartItemId, quantity) => {
      const cart = getItem(STORAGE_KEYS.CART, []);
      const index = cart.findIndex(i => i.cartItemId === cartItemId);
      if (index === -1) return { success: false };

      const item = cart[index];
      const product = DB.getProductById(item.productId);
      const newQty = parseInt(quantity, 10);

      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        const maxStock = product ? product.stock : 99;
        cart[index].quantity = Math.min(newQty, maxStock);
      }

      setItem(STORAGE_KEYS.CART, cart);
      return { success: true, cart };
    },

    removeFromCart: (cartItemId) => {
      const cart = getItem(STORAGE_KEYS.CART, []);
      const filtered = cart.filter(i => i.cartItemId !== cartItemId);
      setItem(STORAGE_KEYS.CART, filtered);
      return { success: true, cart: filtered };
    },

    clearCart: () => {
      setItem(STORAGE_KEYS.CART, []);
      return true;
    },

    // WISHLIST (Favorites)
    getWishlist: () => getItem(STORAGE_KEYS.WISHLIST, []),

    toggleWishlist: (productId) => {
      let wishlist = getItem(STORAGE_KEYS.WISHLIST, []);
      const exists = wishlist.includes(productId);
      if (exists) {
        wishlist = wishlist.filter(id => id !== productId);
      } else {
        wishlist.push(productId);
      }
      setItem(STORAGE_KEYS.WISHLIST, wishlist);
      return { isWishlisted: !exists, wishlist };
    },

    isWishlisted: (productId) => {
      const wishlist = getItem(STORAGE_KEYS.WISHLIST, []);
      return wishlist.includes(productId);
    },

    // ORDERS
    getOrders: () => getItem(STORAGE_KEYS.ORDERS, []),

    createOrder: (orderPayload) => {
      const currentUser = DB.getCurrentUser();
      const cart = DB.getCart();
      if (cart.length === 0) {
        return { success: false, message: "Sepetinizde ürün bulunmuyor!" };
      }

      const orderItems = [];
      let totalAmountTRY = 0;

      for (const item of cart) {
        const product = DB.getProductById(item.productId);
        if (!product) continue;

        if (product.stock < item.quantity) {
          return {
            success: false,
            message: `"${product.name.tr}" için yeterli stok bulunmuyor! Kalan stok: ${product.stock}`
          };
        }

        const unitPrice = product.discountPriceTRY || product.priceTRY;
        totalAmountTRY += unitPrice * item.quantity;

        orderItems.push({
          productId: product.id,
          name: product.name,
          image: product.images[0],
          material: item.material,
          size: item.size,
          quantity: item.quantity,
          unitPriceTRY: unitPrice,
          totalPriceTRY: unitPrice * item.quantity
        });
      }

      for (const item of cart) {
        DB.adjustStock(item.productId, -item.quantity);
      }

      const cleanText = (val, maxLen = 250) =>
        String(val || '').replace(/[<>]/g, '').trim().slice(0, maxLen);

      const orderNumber = "MT-" + Math.floor(100000 + Math.random() * 900000);
      const orders = getItem(STORAGE_KEYS.ORDERS, []);
      const userObj = currentUser || {};

      const newOrder = {
        orderId: "ord-" + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 89),
        orderNumber: orderNumber,
        userId: cleanText(userObj.id || "misafir", 60),
        userName: cleanText(orderPayload.fullName || userObj.name, 120),
        userEmail: cleanText(orderPayload.email || userObj.email, 150),
        phone: cleanText(orderPayload.phone || userObj.phone, 40),
        shippingAddress: {
          fullName: cleanText(orderPayload.fullName || userObj.name, 120),
          city: cleanText(orderPayload.city || userObj.city, 80),
          district: cleanText(orderPayload.district || "", 80),
          address: cleanText(orderPayload.address || userObj.address, 400),
          postalCode: cleanText(orderPayload.postalCode || "", 20)
        },
        shippingCarrier: cleanText(orderPayload.shippingCarrier || "Yurtiçi Kargo", 60),
        paymentMethod: cleanText(orderPayload.paymentMethod || "Havale / EFT ile Ödeme", 60),
        items: orderItems,
        subtotalTRY: totalAmountTRY,
        shippingFeeTRY: (totalAmountTRY >= 500 || totalAmountTRY === 0) ? 0 : 49,
        totalTRY: totalAmountTRY + ((totalAmountTRY >= 500 || totalAmountTRY === 0) ? 0 : 49),
        status: "Hazırlanıyor",
        createdAt: new Date().toISOString()
      };

      orders.unshift(newOrder);
      setItem(STORAGE_KEYS.ORDERS, orders);
      DB.clearCart();
      try { DB.pushOrderToCloud(newOrder); } catch (e) {}

      return { success: true, order: newOrder };
    },

    // CLOUD ORDER SUBMISSION (Write-Only Public Endpoint via Supabase RLS)
    getCloudConfig: () => {
      const local = getItem(STORAGE_KEYS.CLOUD_SYNC, null);
      const winCfg = (typeof window !== 'undefined' && window.MODERNTAKI_CLOUD_CONFIG) ? window.MODERNTAKI_CLOUD_CONFIG : {};
      return {
        url: ((local && local.url) || winCfg.url || 'https://pvtiiqtvcnvtsdkveosc.supabase.co').trim(),
        anonKey: ((local && local.anonKey) || winCfg.anonKey || 'sb_publishable_3eEUgqi8rojA4Ih3kv16mA_2wLVSRTt').trim()
      };
    },

    pushOrderToCloud: async (order) => {
      try {
        const { url, anonKey } = DB.getCloudConfig();
        if (!url) return { ok: false, reason: 'no_url' };
        const cleanUrl = url.replace(/\/+$/, '');

        // 1. Supabase PostgreSQL (Row-Level Security: Anon INSERT only, zero SELECT/UPDATE/DELETE)
        if (cleanUrl.includes('supabase.co')) {
          if (!anonKey) return { ok: false, reason: 'no_anon_key' };
          const res = await fetch(`${cleanUrl}/rest/v1/orders`, {
            method: 'POST',
            headers: {
              'apikey': anonKey,
              'Authorization': `Bearer ${anonKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              order_id: order.orderId,
              order_number: order.orderNumber,
              user_name: order.userName,
              user_email: order.userEmail,
              phone: order.phone,
              shipping_address: order.shippingAddress,
              shipping_carrier: order.shippingCarrier,
              payment_method: order.paymentMethod,
              items: order.items,
              subtotal_try: order.subtotalTRY,
              shipping_fee_try: order.shippingFeeTRY,
              total_try: order.totalTRY,
              status: 'Hazırlanıyor',
              raw_order: order
            })
          });
          try { await DB.syncStockFromCloud(); } catch (e) {}
          return { ok: res.ok, status: res.status };
        }

        // 2. Fallback: Firebase / Apps Script
        if (cleanUrl.includes('firebaseio.com') || cleanUrl.includes('firebasedatabase.app')) {
          await fetch(`${cleanUrl}/orders/${encodeURIComponent(order.orderId)}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
          });
          return { ok: true };
        }
        await fetch(cleanUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'createOrder', order })
        });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    },

    // LIVE STOCK SYNC FROM SUPABASE
    syncStockFromCloud: async () => {
      try {
        const { url, anonKey } = DB.getCloudConfig();
        if (!url || !url.includes('supabase.co') || !anonKey) return { ok: false };
        const cleanUrl = url.replace(/\/+$/, '');
        const res = await fetch(`${cleanUrl}/rest/v1/product_stocks?select=product_id,stock`, {
          headers: {
            'apikey': anonKey,
            'Authorization': `Bearer ${anonKey}`
          }
        });
        if (!res.ok) return { ok: false };
        const rows = await res.json();
        if (!Array.isArray(rows) || rows.length === 0) return { ok: false };

        const products = getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
        let changed = false;
        rows.forEach(r => {
          const idx = products.findIndex(p => p.id === r.product_id);
          if (idx !== -1 && typeof r.stock === 'number' && products[idx].stock !== r.stock) {
            products[idx].stock = Math.max(0, r.stock);
            changed = true;
          }
        });
        if (changed) setItem(STORAGE_KEYS.PRODUCTS, products);
        return { ok: true, changed };
      } catch (e) {
        return { ok: false };
      }
    },

    // PRIVACY-PROTECTED ORDER TRACKING (Requires BOTH Order Number AND Email/Phone)
    trackOrder: async (orderNumberInput, contactInput) => {
      const cleanOrderNo = String(orderNumberInput || '').trim().replace(/^#/, '').toUpperCase();
      const rawContact = String(contactInput || '').trim().toLowerCase();
      const digitsContact = rawContact.replace(/\D/g, '');

      if (!cleanOrderNo || !rawContact) {
        return { success: false, message: "Lütfen hem sipariş numaranızı hem de e-posta/telefon bilginizi girin." };
      }

      const maskFullName = (name) => {
        const parts = String(name || 'Müşteri').trim().split(/\s+/);
        return parts.map(p => p.length <= 2 ? p[0] + '*' : p.slice(0, 2) + '*'.repeat(Math.min(4, p.length - 2))).join(' ');
      };

      // 1. Check Supabase Cloud via narrow SECURITY DEFINER RPC (track_order)
      try {
        const { url, anonKey } = DB.getCloudConfig();
        if (url && url.includes('supabase.co') && anonKey) {
          const cleanUrl = url.replace(/\/+$/, '');
          const res = await fetch(`${cleanUrl}/rest/v1/rpc/track_order`, {
            method: 'POST',
            headers: {
              'apikey': anonKey,
              'Authorization': `Bearer ${anonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              p_order_number: cleanOrderNo,
              p_contact: rawContact
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.ok && data.order) {
              return {
                success: true,
                order: {
                  orderNumber: data.order.orderNumber || cleanOrderNo,
                  maskedName: maskFullName(data.order.userName),
                  status: data.order.status || 'Hazırlanıyor',
                  shippingCarrier: data.order.shippingCarrier || 'Yurtiçi Kargo',
                  trackingCode: data.order.trackingCode || '',
                  paymentMethod: data.order.paymentMethod || '-',
                  totalTRY: data.order.totalTRY || 0,
                  createdAt: data.order.createdAt || null,
                  items: Array.isArray(data.order.items) ? data.order.items : []
                }
              };
            }
          }
        }
      } catch (e) {}

      // 2. Fallback: Check local browser orders (strictly matching BOTH orderNumber and email/phone)
      const localOrders = getItem(STORAGE_KEYS.ORDERS, []);
      const matched = localOrders.find(o => {
        if (!o || String(o.orderNumber || '').trim().toUpperCase() !== cleanOrderNo) return false;
        const emailMatch = o.userEmail && String(o.userEmail).trim().toLowerCase() === rawContact;
        const orderDigits = String(o.phone || '').replace(/\D/g, '');
        const phoneMatch = digitsContact.length >= 10 && orderDigits.length >= 10 &&
          orderDigits.slice(-10) === digitsContact.slice(-10);
        return emailMatch || phoneMatch;
      });

      if (matched) {
        return {
          success: true,
          order: {
            orderNumber: matched.orderNumber,
            maskedName: maskFullName(matched.userName),
            status: matched.status || 'Hazırlanıyor',
            shippingCarrier: matched.shippingCarrier || 'Yurtiçi Kargo',
            trackingCode: matched.trackingCode || '',
            paymentMethod: matched.paymentMethod || '-',
            totalTRY: matched.totalTRY || 0,
            createdAt: matched.createdAt || null,
            items: Array.isArray(matched.items) ? matched.items : []
          }
        };
      }

      return {
        success: false,
        message: "Girdiğiniz sipariş numarası ve iletişim bilgisiyle eşleşen bir sipariş bulunamadı."
      };
    },

    // HERO BANNER
    getHeroBanner: () => {
      const banner = getItem(STORAGE_KEYS.BANNER, null);
      if (banner && banner.imageUrl) return banner;
      if (typeof window !== 'undefined' && window.MODERNTAKI_HERO_BANNER) {
        return window.MODERNTAKI_HERO_BANNER;
      }
      return {
        imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
        badge: "Öne Çıkan Model",
        title: "Soleil Madalyon Kolye"
      };
    },

    setHeroBanner: (bannerData) => {
      setItem(STORAGE_KEYS.BANNER, bannerData);
      return bannerData;
    }
  };
})();
