/**
 * ModernTakı (moderntaki.co) - Internationalization & Realistic Messaging
 */

const I18N = {
  currentLang: 'tr',
  currentCurrency: 'TRY',

  currencies: {
    TRY: { symbol: '₺', rate: 1.0, decimals: 0, position: 'after' }
  },

  translations: {
    tr: {
      brand: "ModernTakı",
      tagline: "Modern & Zarif Takı Koleksiyonu",
      domainBadge: ".co",
      announcement: "✨ moderntaki.co | Tarzınızı tamamlayan en yeni takı tasarımları",
      nav_home: "Ana Sayfa",
      nav_necklaces: "Kolyeler",
      nav_rings: "Yüzükler",
      nav_bracelets: "Bileklikler",
      nav_earrings: "Küpeler",
      nav_story: "Hakkımızda",
      nav_contact: "İletişim",
      admin_panel: "Yönetici Masası",
      search_placeholder: "Kolye, yüzük veya küpe arayın...",
      cart_title: "Alışveriş Sepetiniz",
      cart_empty: "Sepetinizde henüz bir takı bulunmuyor.",
      cart_subtotal: "Ara Toplam",
      cart_shipping: "Kargo",
      cart_free_shipping: "ÜCRETSİZ",
      cart_shipping_remaining: "{amount} daha ekleyin, kargonuz ücretsiz olsun!",
      cart_checkout_btn: "Siparişi Tamamla",
      cart_continue: "Alışverişe Devam Et",
      login_required_alert: "Siparişinizi tamamlayabilmek için lütfen önce üye girişi yapın veya yeni bir hesap oluşturun.",
      wishlist_title: "Favorilerim",
      wishlist_empty: "Henüz favori listenize ürün eklemediniz.",
      wishlist_add_all_to_cart: "Tüm Favorileri Sepete Ekle",
      hero_badge: "Yeni Sezon Koleksiyonu",
      hero_title: "Modern Çizgiler, Zarif Parıltı",
      hero_subtitle: "Tarzınızı tamamlayan modern ve zarif takı tasarımları. Günlük şıklığınız ve özel anlarınız için özenle seçilmiş parçalar.",
      hero_cta_explore: "Koleksiyonu Keşfet",
      hero_cta_bestsellers: "En Çok Beğenilenler",
      hero_social_callout: "Bizi Sosyal Medyada Keşfedin",
      value_craft_title: "Zarif Tasarımlar",
      value_craft_desc: "Her kombine uyum sağlayan modern ve estetik modeller.",
      value_care_title: "Özenli Paketleme",
      value_care_desc: "Siparişleriniz hasar görmeyecek şekilde korunaklı kutusunda teslim edilir.",
      value_shipping_title: "Hızlı Gönderim",
      value_shipping_desc: "Siparişiniz en kısa sürede hazırlanıp kargoya teslim edilir.",
      value_box_title: "Güvenli Alışveriş",
      value_box_desc: "256-Bit SSL altyapısıyla güvenli ve kolay ödeme.",
      filter_all: "Tüm Takılar",
      filter_kolye: "Kolyeler",
      filter_yuzuk: "Yüzükler",
      filter_bileklik: "Bileklikler",
      filter_kupe: "Küpeler",
      filter_altin: "Altın Renk",
      filter_gumus: "Gümüş Renk",
      filter_inci: "Doğal İnci",
      sort_newest: "En Yeniler",
      sort_price_asc: "Fiyat: Düşükten Yükseğe",
      sort_price_desc: "Fiyat: Yüksekten Düşüğe",
      sort_popular: "En Çok Tercih Edilenler",
      add_to_cart: "Sepete Ekle",
      quick_view: "Hızlı İncele",
      out_of_stock: "Tükendi",
      stock_left: "Son {count} Adet!",
      in_stock: "Stokta Var",
      material: "Maden / Kaplama",
      size: "Ölçü / Boyut",
      quantity: "Adet",
      related_products_title: "Kombini Tamamlayan Parçalar",
      related_products_subtitle: "Bu takıyla uyum sağlayan ve birlikte tercih edilen popüler modeller.",
      social_section_title: "Işıltınızı Bizimle Paylaşın",
      social_section_subtitle: "Instagram, TikTok ve YouTube'da @moderntaki.co ailesine katılın, yeni modelleri kaçırmayın.",
      follow_instagram: "Instagram'da Takip Et",
      follow_tiktok: "TikTok'ta Keşfet",
      follow_youtube: "YouTube'da İzle",
      reviews_title: "Müşterilerimizin Yorumları",
      newsletter_title: "İlk Alışverişinize Özel %10 İndirim",
      newsletter_subtitle: "E-bültenimize kaydolun, yeni tasarımlardan ve indirimlerden ilk siz haberdar olun.",
      newsletter_placeholder: "E-posta adresinizi girin",
      newsletter_button: "Kuponu Al",
      footer_about_title: "ModernTakı Hakkında",
      footer_about_text: "moderntaki.co, tarzınızı yansıtan modern, şık ve kaliteli takı modellerini sizlere sunar.",
      footer_quick_links: "Koleksiyonlar",
      footer_customer_service: "Müşteri Hizmetleri",
      footer_legal: "Kurumsal & Güvenlik",
      footer_rights: "Tüm hakları saklıdır. moderntaki.co",
      order_success_title: "Siparişiniz Başarıyla Alındı!",
      order_number_label: "Sipariş Numaranız:",
      order_success_desc: "Takınız özenle paketlenip kargoya teslim edilmek üzere hazırlanıyor."
    },
    en: {
      brand: "ModernTakı",
      tagline: "Modern & Elegant Jewelry",
      domainBadge: ".co",
      announcement: "✨ moderntaki.co | Discover modern jewelry pieces to complete your style",
      nav_home: "Home",
      nav_necklaces: "Necklaces",
      nav_rings: "Rings",
      nav_bracelets: "Bracelets",
      nav_earrings: "Earrings",
      nav_story: "About",
      nav_contact: "Contact",
      admin_panel: "Admin Desk",
      search_placeholder: "Search necklaces, rings, earrings...",
      cart_title: "Your Shopping Bag",
      cart_empty: "Your bag is currently empty.",
      cart_subtotal: "Subtotal",
      cart_shipping: "Shipping",
      cart_free_shipping: "FREE",
      cart_shipping_remaining: "Add {amount} more for free shipping!",
      cart_checkout_btn: "Proceed to Checkout",
      cart_continue: "Continue Shopping",
      login_required_alert: "Please sign in or create an account to complete your order.",
      wishlist_title: "Saved Wishlist",
      wishlist_empty: "You haven't saved any jewelry yet.",
      wishlist_add_all_to_cart: "Add All Favorites to Bag",
      hero_badge: "New Season Collection",
      hero_title: "Modern Lines, Subtle Sparkle",
      hero_subtitle: "Carefully selected modern jewelry pieces designed for everyday elegance and memorable moments.",
      hero_cta_explore: "Explore Collection",
      hero_cta_bestsellers: "Most Loved Pieces",
      hero_social_callout: "Find Us on Social Media",
      value_craft_title: "Chic Designs",
      value_craft_desc: "Contemporary aesthetics suited for every outfit.",
      value_care_title: "Careful Packaging",
      value_care_desc: "Delivered securely in protective jewelry boxes.",
      value_shipping_title: "Fast Dispatch",
      value_shipping_desc: "Orders prepared and dispatched promptly.",
      value_box_title: "Secure Shopping",
      value_box_desc: "256-Bit SSL encrypted safe checkout experience.",
      filter_all: "All Jewelry",
      filter_kolye: "Necklaces",
      filter_yuzuk: "Rings",
      filter_bileklik: "Bracelets",
      filter_kupe: "Earrings",
      filter_altin: "Gold Tone",
      filter_gumus: "Silver Tone",
      filter_inci: "Natural Pearl",
      sort_newest: "Newest First",
      sort_price_asc: "Price: Low to High",
      sort_price_desc: "Price: High to Low",
      sort_popular: "Bestsellers",
      add_to_cart: "Add to Bag",
      quick_view: "Quick View",
      out_of_stock: "Sold Out",
      stock_left: "Only {count} Left!",
      in_stock: "In Stock",
      material: "Color / Finish",
      size: "Size",
      quantity: "Quantity",
      related_products_title: "Complete the Look",
      related_products_subtitle: "Popular pairings styled together by our community.",
      social_section_title: "Join Our Community",
      social_section_subtitle: "Follow @moderntaki.co on Instagram, TikTok & YouTube.",
      follow_instagram: "Follow on Instagram",
      follow_tiktok: "Watch on TikTok",
      follow_youtube: "Subscribe on YouTube",
      reviews_title: "Customer Reviews",
      newsletter_title: "Get 10% Off Your First Order",
      newsletter_subtitle: "Subscribe for new drops and seasonal discounts.",
      newsletter_placeholder: "Enter your email",
      newsletter_button: "Get Coupon",
      footer_about_title: "About ModernTakı",
      footer_about_text: "moderntaki.co brings you modern, stylish and accessible jewelry designs.",
      footer_quick_links: "Collections",
      footer_customer_service: "Customer Care",
      footer_legal: "Legal & Privacy",
      footer_rights: "All rights reserved. moderntaki.co",
      order_success_title: "Order Received Successfully!",
      order_number_label: "Order Reference:",
      order_success_desc: "Your order is being carefully packed for shipping."
    }
  },

  setLang: (lang) => {
    if (I18N.translations[lang]) {
      I18N.currentLang = lang;
      localStorage.setItem('moderntaki_lang', lang);
      return true;
    }
    return false;
  },

  setCurrency: (currency) => {
    if (I18N.currencies[currency]) {
      I18N.currentCurrency = currency;
      localStorage.setItem('moderntaki_currency', currency);
      return true;
    }
    return false;
  },

  t: (key) => {
    const lang = I18N.currentLang;
    return (I18N.translations[lang] && I18N.translations[lang][key]) || 
           (I18N.translations['tr'] && I18N.translations['tr'][key]) || key;
  },

  formatPrice: (priceInTRY) => {
    if (priceInTRY === null || priceInTRY === undefined) return '';
    const curr = I18N.currencies[I18N.currentCurrency] || I18N.currencies.TRY;
    const converted = priceInTRY * curr.rate;
    const formatted = converted.toLocaleString('tr-TR', {
      minimumFractionDigits: curr.decimals,
      maximumFractionDigits: curr.decimals
    });

    if (curr.position === 'before') {
      return `${curr.symbol}${formatted}`;
    }
    return `${formatted} ${curr.symbol}`;
  }
};
