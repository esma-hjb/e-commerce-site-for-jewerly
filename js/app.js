/**
 * ModernTakı (moderntaki.co) - Customer Storefront Application Logic
 * 100% Clean, Public Customer-Facing Code (Zero Admin Code or Shortcuts).
 * Features: Product Showcase, +/- Quantity Stepper, Wishlist, Cart Drawer, and Customer Checkout.
 */

const App = (() => {
  // Application State
  const state = {
    selectedCategory: 'all',
    selectedMaterial: 'all',
    searchQuery: '',
    sortBy: 'popular',
    quickViewProductId: null,
    stepperQuantities: {} // productId -> quantity
  };

  // LEGAL & POLICY MODALS
  const POLICIES = {
    'mesafeli': {
      title: "Mesafeli Satış Sözleşmesi",
      body: `
        <div class="space-y-3">
          <p class="font-semibold text-[#141413]">MADDE 1 - TARAFLAR</p>
          <p><strong>SATICI:</strong> ModernTakı (moderntaki.co)<br>Destek: Instagram DM (@moderntaki.co) | E-Posta: destek@moderntaki.co<br>
          <strong>ALICI:</strong> moderntaki.co web sitesinden sipariş oluşturan ve adres bilgileri sipariş formunda belirtilen müşteri.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">MADDE 2 - SÖZLEŞMENİN KONUSU</p>
          <p>İşbu Sözleşme, ALICI'nın SATICI'ya ait moderntaki.co internet sitesi üzerinden elektronik ortamda siparişini verdiği takı ve aksesuarların satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">MADDE 3 - ÜRÜN VE ÖDEME BİLGİLERİ</p>
          <p>Sözleşme konusu takının cinsi, türü, adedi, rengi, vergiler dahil satış bedeli ve kargo ücreti sipariş onay ekranında ve sipariş özetinde belirtildiği gibidir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">MADDE 4 - TESLİMAT ŞARTLARI</p>
          <p>Sipariş edilen ürünler, ALICI'nın sipariş formunda belirttiği teslimat adresine anlaşmalı kargo şirketi (Yurtiçi Kargo vb.) aracılığıyla azami 30 günlük yasal süreyi aşmamak koşulu ile stok durumuna göre ortalama 1-3 iş günü içinde teslim edilir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">MADDE 5 - CAYMA HAKKI (14 GÜN KOŞULSUZ İADE)</p>
          <p>ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişiye tesliminden itibaren <strong>14 (ondört) gün</strong> içinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir. İade edilecek ürünün kutusu, ambalajı ve varsa aksesuarlarıyla birlikte eksiksiz ve hasarsız olması gerekmektedir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">MADDE 6 - YETKİLİ MAHKEME</p>
          <p>İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Ticaret Bakanlığı'nca her yıl ilan edilen parasal sınırlar dahilinde ALICI'nın yerleşim yerindeki Tüketici Hakem Heyetleri veya Tüketici Mahkemeleri yetkilidir.</p>
        </div>
      `
    },
    'on-bilgi': {
      title: "Ön Bilgilendirme Formu",
      body: `
        <div class="space-y-3">
          <p class="font-semibold text-[#141413]">1. SATICI BİLGİLERİ</p>
          <p><strong>Unvan:</strong> ModernTakı (moderntaki.co)<br>
          <strong>İletişim:</strong> Instagram DM (@moderntaki.co) | E-Posta: destek@moderntaki.co</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">2. ÜRÜN NİTELİKLERİ VE TOPLAM BEDEL</p>
          <p>Malın temel özellikleri (türü, maden rengi, ölçüsü, modeli) sitedeki ürün sayfasında yer almaktadır. Listelenen tüm fiyatlar Türk Lirası cinsinden olup KDV dahildir. 500 ₺ üzeri siparişlerde kargo ücretsiz, altındaki siparişlerde standart 49 ₺ kargo bedeli uygulanır.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">3. ÖDEME VE TESLİMAT</p>
          <p>Ödeme; Banka Havalesi / FAST veya onaylanan güvenli ödeme kanallarıyla tahsil edilir. Teslimat adrese teslim kargo yoluyla gerçekleştirilir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">4. CAYMA HAKKI BİLDİRİMİ</p>
          <p>Tüketici, hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin, malı teslim aldığı tarihten itibaren 14 gün içinde cayma hakkını kullanabilir.</p>
        </div>
      `
    },
    'iade': {
      title: "İptal ve İade Koşulları",
      body: `
        <div class="space-y-3">
          <p class="font-semibold text-[#141413]">14 GÜN KOŞULSUZ İADE HAKKI</p>
          <p>ModernTakı'dan aldığınız tüm ürünleri teslimat tarihinden itibaren <strong>14 gün</strong> içerisinde hiçbir gerekçe belirtmeksizin iade edebilirsiniz.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">İADE KOŞULLARI</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Ürünün yeniden satılabilirlik özelliğini kaybetmemiş, kullanılmamış ve hasar görmemiş olması gerekir.</li>
            <li>Ürün orijinal kutusu ve faturası / sipariş koduyla birlikte gönderilmelidir.</li>
            <li><strong>Hijyen İstisnası:</strong> Tüketici mevzuatı ve sağlık/hijyen kuralları uyarınca, koruma bandı veya orijinal ambalajı açılmış küpe modellerinde cayma hakkı kullanılamaz.</li>
          </ul>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">İADE VE GERİ ÖDEME SÜRECİ</p>
          <p>İade talebinizi Instagram DM üzerinden (@moderntaki.co) veya e-posta yoluyla iletebilirsiniz. Ürün tarafımıza ulaşıp kontrolleri tamamlandıktan sonra, ödemeniz 3-7 iş günü içerisinde aynı ödeme kanalınıza iade edilir.</p>
        </div>
      `
    },
    'kvkk': {
      title: "KVKK ve Gizlilik Politikası",
      body: `
        <div class="space-y-3">
          <p class="font-semibold text-[#141413]">KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AYDINLATMA METNİ</p>
          <p>ModernTakı (moderntaki.co) olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında müşteri gizliliğine ve kişisel verilerinizin korunmasına en üst düzeyde önem veriyoruz.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">İŞLENEN VERİLER VE İŞLENME AMACI</p>
          <p>Ad, soyad, telefon numarası, e-posta adresi ve teslimat adresi bilgileriniz; siparişlerinizin oluşturulması, faturalandırılması, kargo şirketine teslimi ve satış sonrası destek hizmetlerinin sunulması amacıyla hukuka uygun olarak işlenmektedir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">VERİ GÜVENLİĞİ VE KREDİ KARTI BİLGİLERİ</p>
          <p>Sitemiz 256-Bit SSL şifreleme protokolüyle korunmaktadır. <strong>Kredi veya banka kartı bilgileriniz hiçbir şekilde sunucularımızda veya veritabanımızda saklanmaz, kaydedilmez veya işlenmez.</strong> Tüm ödemeler banka onaylı 3D Secure güvenli katmanıyla gerçekleşir.</p>

          <p class="font-semibold text-[#141413] pt-2 border-t border-[#EFE8DD]">ÜÇÜNCÜ KİŞİLERLE PAYLAŞIM</p>
          <p>Kişisel verileriniz hiçbir zaman ticari veya reklam amaçlı olarak üçüncü şahıslara veya kurumlara satılmaz veya devredilmez. Yalnızca siparişin ALICI'ya ulaştırılması için yetkili kargo kuruluşuyla paylaşılır.</p>
        </div>
      `
    }
  };

  const openPolicyModal = (policyKey) => {
    const modal = document.getElementById('policy-modal');
    const titleEl = document.getElementById('policy-modal-title');
    const contentEl = document.getElementById('policy-modal-content');

    const policy = POLICIES[policyKey];
    if (!modal || !policy) return;

    if (titleEl) titleEl.textContent = policy.title;
    if (contentEl) contentEl.innerHTML = policy.body;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  const closePolicyModal = () => {
    const modal = document.getElementById('policy-modal');
    if (modal) modal.classList.add('hidden');
  };

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgClass = type === 'error' ? 'bg-red-900/95 border-red-500' : 'bg-[#141413]/95 border-[#C5A059]';
    const icon = type === 'error' ? 'alert-circle' : 'check';

    toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-xl border text-white shadow-2xl backdrop-blur-md transform transition-all duration-300 translate-y-3 opacity-0 text-sm font-medium ${bgClass}`;
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-4 h-4 text-[#E6C280] shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-3');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  };

  // Translations
  const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = I18N.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = I18N.t(key);
    });

    document.querySelectorAll('.currency-btn').forEach(btn => {
      const curr = btn.getAttribute('data-currency');
      if (curr === I18N.currentCurrency) {
        btn.classList.add('bg-[#141413]', 'text-[#E6C280]', 'font-semibold');
        btn.classList.remove('text-[#383836]', 'bg-transparent');
      } else {
        btn.classList.remove('bg-[#141413]', 'text-[#E6C280]', 'font-semibold');
        btn.classList.add('text-[#383836]', 'bg-transparent');
      }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === I18N.currentLang) {
        btn.classList.add('bg-[#141413]', 'text-[#E6C280]', 'font-semibold');
        btn.classList.remove('text-[#383836]', 'bg-transparent');
      } else {
        btn.classList.remove('bg-[#141413]', 'text-[#E6C280]', 'font-semibold');
        btn.classList.add('text-[#383836]', 'bg-transparent');
      }
    });
  };

  // Render Product Catalog
  const renderProducts = () => {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let products = DB.getProducts();

    if (state.selectedCategory !== 'all') {
      products = products.filter(p => p.category === state.selectedCategory);
    }

    if (state.selectedMaterial !== 'all') {
      products = products.filter(p => p.material === state.selectedMaterial);
    }

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.tr.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.description.tr.toLowerCase().includes(q)
      );
    }

    if (state.sortBy === 'price_asc') {
      products.sort((a, b) => (a.discountPriceTRY || a.priceTRY) - (b.discountPriceTRY || b.priceTRY));
    } else if (state.sortBy === 'price_desc') {
      products.sort((a, b) => (b.discountPriceTRY || b.priceTRY) - (a.discountPriceTRY || a.priceTRY));
    } else if (state.sortBy === 'newest') {
      products.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      products.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#A8823B]">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <h3 class="font-serif-luxury text-2xl text-[#141413] mb-2 font-medium">Aradığınız kriterlere uygun takı bulunamadı</h3>
          <p class="text-sm text-[#383836] mb-6">Lütfen arama teriminizi değiştirin veya filtreleri temizleyin.</p>
          <button onclick="App.clearFilters()" class="px-6 py-2.5 bg-[#141413] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#A8823B] transition-colors">
            Filtreleri Temizle
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    grid.innerHTML = products.map(product => {
      const isWish = DB.isWishlisted(product.id);
      const isOutOfStock = product.stock <= 0;
      const isLowStock = product.stock > 0 && product.stock <= 3;
      const title = I18N.currentLang === 'tr' ? product.name.tr : product.name.en;
      const currentQty = state.stepperQuantities[product.id] || 1;
      const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
      const secondaryImage = product.images[1] || primaryImage;

      const formattedPrice = I18N.formatPrice(product.priceTRY);
      const formattedDiscount = product.discountPriceTRY ? I18N.formatPrice(product.discountPriceTRY) : null;
      const badgeText = product.badge ? (I18N.currentLang === 'tr' ? product.badge.tr : product.badge.en) : null;

      return `
        <article class="product-card group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EFE8DD] hover:border-[#D8B26E]/60 hover:shadow-xl transition-all duration-300" data-product-id="${product.id}">
          
          <!-- Image Box with Secondary Image Hover -->
          <div class="relative w-full aspect-[4/5] bg-[#F7F3ED] overflow-hidden cursor-pointer" onclick="App.openQuickView('${product.id}')">
            <img src="${primaryImage}" alt="${title}" class="product-card-img w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" loading="lazy">
            <img src="${secondaryImage}" alt="${title}" class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105" loading="lazy">
            
            <!-- Badges -->
            <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
              ${badgeText ? `
                <span class="px-3 py-1 bg-[#141413]/90 text-[#FAF8F5] text-[10px] font-semibold tracking-widest uppercase rounded-full backdrop-blur-md">
                  ${badgeText}
                </span>
              ` : ''}
              ${product.discountPriceTRY ? `
                <span class="px-2.5 py-0.5 bg-[#C5A059] text-white text-[10px] font-bold rounded-full">
                  İNDİRİM
                </span>
              ` : ''}
            </div>

            <!-- Stock Status Overlay -->
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
              ${isOutOfStock ? `
                <span class="px-3 py-1 bg-red-800/90 text-white text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-md backdrop-blur-sm">
                  ${I18N.t('out_of_stock')}
                </span>
              ` : isLowStock ? `
                <span class="px-2.5 py-1 bg-amber-900/80 text-amber-200 text-[10px] font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-indicator"></span>
                  ${I18N.t('stock_left').replace('{count}', product.stock)}
                </span>
              ` : `
                <span class="px-2 py-0.5 bg-[#141413]/60 text-white text-[10px] rounded-full backdrop-blur-sm">
                  Stok: ${product.stock}
                </span>
              `}
            </div>

            <!-- Heart / Wishlist Toggle -->
            <button 
              onclick="event.stopPropagation(); App.toggleWishlist('${product.id}')" 
              class="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#141413] shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-20"
              title="Favorilere Ekle"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isWish ? 'fill-red-500 text-red-500' : 'text-[#383836]'}"></i>
            </button>
          </div>

          <!-- Product Info -->
          <div class="p-5 flex flex-col flex-grow justify-between bg-white">
            <div>
              <div class="flex items-center justify-between text-xs text-[#A8823B] mb-1.5">
                <span class="uppercase tracking-wider font-semibold text-[11px]">${product.category}</span>
                <div class="flex items-center gap-1 text-[#383836]">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"></i>
                  <span class="font-medium text-[11px]">${product.rating}</span>
                  <span class="text-[10px] text-neutral-400">(${product.reviewCount})</span>
                </div>
              </div>

              <h3 onclick="App.openQuickView('${product.id}')" class="font-serif-luxury text-lg font-medium text-[#141413] line-clamp-1 hover:text-[#A8823B] transition-colors cursor-pointer mb-2" title="${title}">
                ${title}
              </h3>

              <div class="flex items-baseline gap-2 mb-4">
                ${formattedDiscount ? `
                  <span class="text-base font-bold text-[#141413]">${formattedDiscount}</span>
                  <span class="text-xs text-neutral-400 line-through">${formattedPrice}</span>
                ` : `
                  <span class="text-base font-bold text-[#141413]">${formattedPrice}</span>
                `}
              </div>
            </div>

            <!-- Stepper (+ / -) & Add to Cart -->
            <div class="pt-3 border-t border-[#F7F3ED]">
              ${isOutOfStock ? `
                <button disabled class="w-full py-2.5 rounded-xl bg-neutral-100 text-neutral-400 text-xs font-semibold uppercase tracking-wider cursor-not-allowed">
                  ${I18N.t('out_of_stock')}
                </button>
              ` : `
                <div class="flex items-center gap-2">
                  <div class="flex items-center border border-[#EFE8DD] rounded-xl bg-[#FCFAF7] p-1">
                    <button 
                      onclick="App.changeProductCardQty('${product.id}', -1)" 
                      class="stepper-btn w-7 h-7 rounded-lg flex items-center justify-center text-[#141413] hover:bg-[#EFE8DD] transition-colors"
                      title="Adet Azalt"
                    >
                      <i data-lucide="minus" class="w-3 h-3"></i>
                    </button>
                    <span id="qty-val-${product.id}" class="w-7 text-center text-xs font-bold text-[#141413]">
                      ${currentQty}
                    </span>
                    <button 
                      onclick="App.changeProductCardQty('${product.id}', 1)" 
                      class="stepper-btn w-7 h-7 rounded-lg flex items-center justify-center text-[#141413] hover:bg-[#EFE8DD] transition-colors"
                      title="Adet Artır"
                    >
                      <i data-lucide="plus" class="w-3 h-3"></i>
                    </button>
                  </div>

                  <button 
                    onclick="App.addProductCardToCart('${product.id}')" 
                    class="flex-1 py-2 px-3 rounded-xl bg-[#141413] hover:bg-[#A8823B] text-white text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-sm"
                  >
                    <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                    <span>${I18N.t('add_to_cart')}</span>
                  </button>
                </div>
              `}
            </div>

          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  };

  const changeProductCardQty = (productId, delta) => {
    const product = DB.getProductById(productId);
    if (!product) return;

    const current = state.stepperQuantities[productId] || 1;
    let next = current + delta;
    if (next < 1) next = 1;
    if (next > product.stock) {
      next = product.stock;
      showToast(`Maksimum ${product.stock} adet eklenebilir.`, 'error');
    }

    state.stepperQuantities[productId] = next;
    const el = document.getElementById(`qty-val-${productId}`);
    if (el) el.textContent = next;
  };

  const addProductCardToCart = (productId) => {
    const qty = state.stepperQuantities[productId] || 1;
    const result = DB.addToCart(productId, qty);
    if (result.success) {
      showToast(`Sepetinize ${qty} adet takı eklendi ✨`);
      updateCartBadge();
      updateCartDrawer();
      openCartDrawer();
    } else {
      showToast(result.message || 'Hata oluştu', 'error');
    }
  };

  // Wishlist Handling
  const toggleWishlist = (productId) => {
    const res = DB.toggleWishlist(productId);
    updateWishlistBadge();
    renderProducts();
    if (res.isWishlisted) {
      showToast("Favorilerinize eklendi 🤍");
    } else {
      showToast("Favorilerinizden çıkarıldı.");
    }
  };

  const updateWishlistBadge = () => {
    const wishlist = DB.getWishlist();
    const count = wishlist.length;
    document.querySelectorAll('.wishlist-counter').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  };

  const openWishlistModal = () => {
    const modal = document.getElementById('wishlist-modal');
    const container = document.getElementById('wishlist-items-container');
    if (!modal || !container) return;

    const wishlistIds = DB.getWishlist();
    const products = wishlistIds.map(id => DB.getProductById(id)).filter(Boolean);

    if (products.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center">
          <i data-lucide="heart" class="w-12 h-12 mx-auto text-neutral-300 mb-3"></i>
          <p class="text-sm text-neutral-500 font-medium">${I18N.t('wishlist_empty')}</p>
        </div>
      `;
    } else {
      container.innerHTML = products.map(p => {
        const title = I18N.currentLang === 'tr' ? p.name.tr : p.name.en;
        const price = p.discountPriceTRY ? I18N.formatPrice(p.discountPriceTRY) : I18N.formatPrice(p.priceTRY);
        return `
          <div class="flex items-center gap-4 p-3 bg-[#FCFAF7] rounded-xl border border-[#EFE8DD]">
            <img src="${p.images[0]}" alt="${title}" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1 min-w-0">
              <h4 class="font-serif-luxury text-base text-[#141413] font-medium truncate">${title}</h4>
              <p class="text-xs font-bold text-[#A8823B]">${price}</p>
            </div>
            <button onclick="App.addProductCardToCart('${p.id}'); App.closeWishlistModal();" class="px-3 py-1.5 bg-[#141413] hover:bg-[#A8823B] text-white text-xs font-semibold rounded-lg transition-colors">
              ${I18N.t('add_to_cart')}
            </button>
            <button onclick="App.toggleWishlist('${p.id}'); App.openWishlistModal();" class="text-neutral-400 hover:text-red-600 p-1">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  const closeWishlistModal = () => {
    const modal = document.getElementById('wishlist-modal');
    if (modal) modal.classList.add('hidden');
  };

  const addAllWishlistToCart = () => {
    const wishlistIds = DB.getWishlist();
    let addedCount = 0;
    wishlistIds.forEach(id => {
      const p = DB.getProductById(id);
      if (p && p.stock > 0) {
        DB.addToCart(id, 1);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      showToast(`${addedCount} adet favori ürün sepete eklendi!`);
      updateCartBadge();
      updateCartDrawer();
      closeWishlistModal();
      openCartDrawer();
    } else {
      showToast("Sepete eklenebilecek favori ürün bulunamadı.", "error");
    }
  };

  // Cart Drawer
  const updateCartBadge = () => {
    const cart = DB.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-counter').forEach(el => {
      el.textContent = totalCount;
      el.classList.toggle('hidden', totalCount === 0);
    });
  };

  const updateCartDrawer = () => {
    const cartContainer = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');
    if (!cartContainer) return;

    const cart = DB.getCart();
    const shippingProgressBox = document.getElementById('cart-shipping-progress');
    const cartFooter = document.getElementById('cart-footer');
    const hasItems = cart.length > 0;
    if (shippingProgressBox) shippingProgressBox.classList.toggle('hidden', !hasItems);
    if (cartFooter) cartFooter.classList.toggle('hidden', !hasItems);

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7F3ED] flex items-center justify-center text-[#A8823B]">
            <i data-lucide="shopping-bag" class="w-8 h-8"></i>
          </div>
          <p class="text-sm text-[#383836] font-medium mb-4">${I18N.t('cart_empty')}</p>
          <button onclick="App.closeCartDrawer()" class="px-6 py-2 bg-[#141413] text-white rounded-full text-xs font-semibold tracking-wider hover:bg-[#A8823B] transition-colors">
            ${I18N.t('cart_continue')}
          </button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = I18N.formatPrice(0);
      if (totalEl) totalEl.textContent = I18N.formatPrice(0);
      if (window.lucide) lucide.createIcons();
      return;
    }

    let subtotalTRY = 0;

    cartContainer.innerHTML = cart.map(item => {
      const product = DB.getProductById(item.productId);
      if (!product) return '';

      const unitPrice = product.discountPriceTRY || product.priceTRY;
      const itemTotal = unitPrice * item.quantity;
      subtotalTRY += itemTotal;

      const title = I18N.currentLang === 'tr' ? product.name.tr : product.name.en;

      return `
        <div class="flex gap-4 p-3.5 bg-[#FCFAF7] rounded-xl border border-[#EFE8DD]">
          <img src="${product.images[0]}" alt="${title}" class="w-20 h-20 object-cover rounded-lg border border-[#EFE8DD] shrink-0">
          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-serif-luxury text-base text-[#141413] font-medium leading-snug line-clamp-1">${title}</h4>
                <button onclick="App.removeFromCart('${item.cartItemId}')" class="text-neutral-400 hover:text-red-500 p-1 transition-colors" title="Sil">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-neutral-500 mt-0.5">${item.size || 'Standart'}</p>
            </div>

            <div class="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE8DD]/70">
              <div class="flex items-center border border-[#D8B26E]/40 rounded-lg bg-white">
                <button onclick="App.updateCartQty('${item.cartItemId}', ${item.quantity - 1})" class="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-l-lg transition-colors">
                  <i data-lucide="minus" class="w-3 h-3"></i>
                </button>
                <span class="w-8 text-center text-xs font-bold text-[#141413]">${item.quantity}</span>
                <button onclick="App.updateCartQty('${item.cartItemId}', ${item.quantity + 1})" class="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-r-lg transition-colors">
                  <i data-lucide="plus" class="w-3 h-3"></i>
                </button>
              </div>

              <div class="text-right">
                <span class="text-xs font-bold text-[#141413]">${I18N.formatPrice(itemTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const FREE_SHIPPING_LIMIT = 500;
    const STANDARD_SHIPPING_FEE = 49;
    const shippingFee = (subtotalTRY >= FREE_SHIPPING_LIMIT || subtotalTRY === 0) ? 0 : STANDARD_SHIPPING_FEE;
    const grandTotalTRY = subtotalTRY + shippingFee;

    const shippingEl = document.getElementById('cart-shipping-val');
    const shippingMsg = document.getElementById('cart-shipping-msg');
    const shippingBar = document.getElementById('cart-shipping-bar');
    const shippingStatus = document.getElementById('cart-shipping-status');

    if (shippingEl) {
      if (subtotalTRY === 0) {
        shippingEl.textContent = '0 ₺';
        shippingEl.className = 'font-semibold text-neutral-500';
      } else if (shippingFee === 0) {
        shippingEl.textContent = 'Ücretsiz';
        shippingEl.className = 'font-semibold text-emerald-700';
      } else {
        shippingEl.textContent = I18N.formatPrice(shippingFee);
        shippingEl.className = 'font-semibold text-[#141413]';
      }
    }

    if (shippingBar && shippingMsg) {
      if (subtotalTRY === 0) {
        shippingMsg.textContent = `${FREE_SHIPPING_LIMIT} ₺ üzeri alışverişlerde kargo ücretsiz!`;
        if (shippingStatus) shippingStatus.textContent = '';
        shippingBar.style.width = '0%';
      } else if (subtotalTRY >= FREE_SHIPPING_LIMIT) {
        shippingMsg.textContent = 'Tebrikler! Kargonuz ücretsiz ✨';
        if (shippingStatus) shippingStatus.textContent = 'ÜCRETSİZ';
        shippingBar.style.width = '100%';
      } else {
        const remaining = FREE_SHIPPING_LIMIT - subtotalTRY;
        shippingMsg.textContent = `Kargo bedava için ${I18N.formatPrice(remaining)} daha ekleyin!`;
        if (shippingStatus) shippingStatus.textContent = `%${Math.round((subtotalTRY / FREE_SHIPPING_LIMIT) * 100)}`;
        shippingBar.style.width = `${Math.min(100, Math.round((subtotalTRY / FREE_SHIPPING_LIMIT) * 100))}%`;
      }
    }

    if (subtotalEl) subtotalEl.textContent = I18N.formatPrice(subtotalTRY);
    if (totalEl) totalEl.textContent = I18N.formatPrice(grandTotalTRY);
    if (window.lucide) lucide.createIcons();
  };

  const openCartDrawer = () => {
    updateCartDrawer();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      backdrop.classList.remove('hidden');
      setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
      }, 10);
    }
  };

  const closeCartDrawer = () => {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 350);
    }
  };

  const updateCartQty = (cartItemId, newQty) => {
    DB.updateCartQuantity(cartItemId, newQty);
    updateCartBadge();
    updateCartDrawer();
  };

  const removeFromCart = (cartItemId) => {
    DB.removeFromCart(cartItemId);
    updateCartBadge();
    updateCartDrawer();
    showToast("Ürün sepetten kaldırıldı.");
  };

  // CHECKOUT (Hybrid Model: Offers Member Login/Register OR 1-Click Guest Checkout)
  let pendingCheckoutAfterAuth = false;

  const startCheckout = () => {
    const cart = DB.getCart();

    if (cart.length === 0) {
      showToast("Sepetinizde ürün bulunmuyor!", "error");
      return;
    }

    closeCartDrawer();
    const currentUser = DB.getCurrentUser();
    if (!currentUser) {
      pendingCheckoutAfterAuth = true;
      openAuthModal('login', true);
      return;
    }

    openCheckoutModal();
  };

  const continueAsGuest = () => {
    pendingCheckoutAfterAuth = false;
    closeAuthModal();
    openCheckoutModal();
  };

  const openCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const currentUser = DB.getCurrentUser();
    const cart = DB.getCart();
    const guestBadge = document.getElementById('checkout-guest-badge');

    if (currentUser) {
      const nameInput = document.getElementById('checkout-fullname');
      const emailInput = document.getElementById('checkout-email');
      const phoneInput = document.getElementById('checkout-phone');
      const cityInput = document.getElementById('checkout-city');
      const addressInput = document.getElementById('checkout-address');

      if (nameInput) nameInput.value = currentUser.name || '';
      if (emailInput) emailInput.value = currentUser.email || '';
      if (phoneInput) phoneInput.value = currentUser.phone || '';
      if (cityInput && !cityInput.value) cityInput.value = currentUser.city || 'İstanbul';
      if (addressInput && !addressInput.value) addressInput.value = currentUser.address || '';
      if (guestBadge) guestBadge.textContent = `Üye: ${currentUser.name}`;
    } else {
      if (guestBadge) guestBadge.textContent = 'Üyeliksiz Hızlı Sipariş';
    }

    const summaryContainer = document.getElementById('checkout-items-summary');
    const totalEl = document.getElementById('checkout-final-total');
    let subtotal = 0;

    if (summaryContainer) {
      summaryContainer.innerHTML = cart.map(item => {
        const product = DB.getProductById(item.productId);
        if (!product) return '';
        const unit = product.discountPriceTRY || product.priceTRY;
        subtotal += unit * item.quantity;
        return `
          <div class="flex items-center justify-between text-xs py-1.5 border-b border-[#EFE8DD]">
            <span class="truncate max-w-[190px] font-medium text-[#141413]">${product.name.tr} (x${item.quantity})</span>
            <span class="font-bold text-[#A8823B]">${I18N.formatPrice(unit * item.quantity)}</span>
          </div>
        `;
      }).join('');
    }

    const FREE_SHIPPING_LIMIT = 500;
    const STANDARD_SHIPPING_FEE = 49;
    const shippingFee = (subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0) ? 0 : STANDARD_SHIPPING_FEE;
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
    const checkoutShippingEl = document.getElementById('checkout-shipping');

    if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = I18N.formatPrice(subtotal);
    if (checkoutShippingEl) {
      if (shippingFee === 0) {
        checkoutShippingEl.textContent = 'Ücretsiz';
        checkoutShippingEl.className = 'font-semibold text-emerald-700';
      } else {
        checkoutShippingEl.textContent = I18N.formatPrice(shippingFee);
        checkoutShippingEl.className = 'font-semibold text-[#141413]';
      }
    }

    if (totalEl) totalEl.textContent = I18N.formatPrice(subtotal + shippingFee);

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  const closeCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
  };

  const submitCheckoutOrder = (e) => {
    if (e) e.preventDefault();

    const fullName = document.getElementById('checkout-fullname')?.value;
    const phone = document.getElementById('checkout-phone')?.value;
    const email = document.getElementById('checkout-email')?.value;
    const city = document.getElementById('checkout-city')?.value;
    const address = document.getElementById('checkout-address')?.value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Havale / EFT ile Ödeme';

    if (!fullName || !phone || !email || !address) {
      showToast("Lütfen tüm zorunlu teslimat ve e-posta alanlarını doldurun!", "error");
      return;
    }

    const result = DB.createOrder({
      fullName,
      phone,
      email,
      city,
      address,
      paymentMethod
    });

    if (result.success) {
      closeCheckoutModal();
      updateCartBadge();
      updateCartDrawer();
      renderProducts();
      showOrderSuccessModal(result.order);
    } else {
      showToast(result.message || "Sipariş oluşturulamadı", "error");
    }
  };

  const showOrderSuccessModal = (order) => {
    const modal = document.getElementById('order-success-modal');
    if (!modal) return;

    document.getElementById('success-order-number').textContent = order.orderNumber;
    document.getElementById('success-order-total').textContent = I18N.formatPrice(order.totalTRY);
    document.getElementById('success-order-payment').textContent = order.paymentMethod;

    const igBtn = document.getElementById('ig-order-btn');
    if (igBtn) {
      igBtn.href = 'https://ig.me/m/moderntaki.co';
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  const closeOrderSuccessModal = () => {
    const modal = document.getElementById('order-success-modal');
    if (!modal) return;

    modal.classList.add('hidden');
  };

  // CUSTOMER AUTH (Login / Register via Supabase Cloud + Guest Option)
  const openAuthModal = (mode = 'login', fromCheckout = false) => {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    if (!fromCheckout) pendingCheckoutAfterAuth = false;
    const guestBox = document.getElementById('guest-checkout-box');
    if (guestBox) guestBox.classList.toggle('hidden', !fromCheckout);
    setAuthMode(mode);
    modal.classList.remove('hidden');
  };

  const closeAuthModal = () => {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  };

  const setAuthMode = (mode) => {
    const loginTab = document.getElementById('tab-login-btn');
    const registerTab = document.getElementById('tab-register-btn');
    const loginForm = document.getElementById('login-form-box');
    const registerForm = document.getElementById('register-form-box');

    if (mode === 'login') {
      loginTab.classList.add('border-[#C5A059]', 'text-[#141413]', 'font-bold');
      loginTab.classList.remove('border-transparent', 'text-neutral-400');
      registerTab.classList.remove('border-[#C5A059]', 'text-[#141413]', 'font-bold');
      registerTab.classList.add('border-transparent', 'text-neutral-400');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      registerTab.classList.add('border-[#C5A059]', 'text-[#141413]', 'font-bold');
      registerTab.classList.remove('border-transparent', 'text-neutral-400');
      loginTab.classList.remove('border-[#C5A059]', 'text-[#141413]', 'font-bold');
      loginTab.classList.add('border-transparent', 'text-neutral-400');
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    }
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;

    const result = await DB.login(email, password);
    if (result.success) {
      showToast(`Hoş geldiniz, ${result.user.name}!`);
      closeAuthModal();
      updateAuthUI();
      if (pendingCheckoutAfterAuth) {
        pendingCheckoutAfterAuth = false;
        openCheckoutModal();
      }
    } else {
      showToast(result.message, "error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    if (e) e.preventDefault();
    const name = document.getElementById('reg-name')?.value;
    const email = document.getElementById('reg-email')?.value;
    const password = document.getElementById('reg-password')?.value;
    const phone = document.getElementById('reg-phone')?.value;

    if (!name || !email || !password) {
      showToast("Lütfen tüm zorunlu alanları doldurun", "error");
      return;
    }

    const result = await DB.register({ name, email, password, phone });
    if (result.success) {
      showToast(`Hesabınız oluşturuldu! Hoş geldiniz, ${name}`);
      closeAuthModal();
      updateAuthUI();
      if (pendingCheckoutAfterAuth) {
        pendingCheckoutAfterAuth = false;
        openCheckoutModal();
      }
    } else {
      showToast(result.message, "error");
    }
  };

  const handleLogout = () => {
    DB.logout();
    updateAuthUI();
    showToast("Oturumunuz kapatıldı.");
  };

  const updateAuthUI = () => {
    const user = DB.getCurrentUser();
    const userBtn = document.getElementById('nav-user-btn');
    const userLabel = document.getElementById('nav-user-label');

    if (user) {
      if (userLabel) userLabel.textContent = user.name.split(' ')[0];
      if (userBtn) {
        userBtn.title = `${user.name} - Çıkış Yap`;
        userBtn.onclick = () => {
          if (confirm(`Sayın ${user.name}, oturumunuzu kapatmak istiyor musunuz?`)) {
            handleLogout();
          }
        };
      }
    } else {
      if (userLabel) userLabel.textContent = "Giriş Yap";
      if (userBtn) {
        userBtn.title = "Giriş Yap veya Üye Ol";
        userBtn.onclick = () => openAuthModal('login');
      }
    }
  };

  // Quick View & Direct Product URL / SEO
  const DEFAULT_DOC_TITLE = 'ModernTakı | moderntaki.co - Zarif ve Modern Takı Modelleri';

  const updateProductSeoSchema = (product) => {
    let scriptEl = document.getElementById('product-jsonld');
    if (!product) {
      if (scriptEl) scriptEl.remove();
      return;
    }
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'product-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const price = product.discountPriceTRY || product.priceTRY;
    scriptEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "sku": product.id,
      "name": product.name.tr,
      "description": product.description.tr,
      "image": product.images,
      "brand": { "@type": "Brand", "name": "ModernTakı" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "TRY",
        "price": price,
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "url": window.location.href
      }
    });
  };

  const openQuickView = (productId, skipHistory = false) => {
    const product = DB.getProductById(productId);
    if (!product) return;

    state.quickViewProductId = productId;
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const title = I18N.currentLang === 'tr' ? product.name.tr : product.name.en;
    const desc = I18N.currentLang === 'tr' ? product.description.tr : product.description.en;

    if (!skipHistory && window.history && window.history.pushState) {
      try {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('urun', productId);
        window.history.pushState({ productId }, '', nextUrl.toString());
      } catch (e) {}
    }
    document.title = `${title} | ModernTakı`;
    updateProductSeoSchema(product);

    document.getElementById('qv-title').textContent = title;
    document.getElementById('qv-desc').textContent = desc;
    document.getElementById('qv-category').textContent = product.category.toUpperCase();
    document.getElementById('qv-price').textContent = product.discountPriceTRY ? I18N.formatPrice(product.discountPriceTRY) : I18N.formatPrice(product.priceTRY);
    
    const originalPriceEl = document.getElementById('qv-original-price');
    if (product.discountPriceTRY) {
      originalPriceEl.textContent = I18N.formatPrice(product.priceTRY);
      originalPriceEl.classList.remove('hidden');
    } else {
      originalPriceEl.classList.add('hidden');
    }

    const mainImg = document.getElementById('qv-main-image');
    mainImg.src = product.images[0];

    const thumbsContainer = document.getElementById('qv-thumbs-container');
    thumbsContainer.innerHTML = product.images.map(imgUrl => `
      <button onclick="document.getElementById('qv-main-image').src = '${imgUrl}'" class="w-14 h-14 rounded-lg overflow-hidden border-2 border-[#EFE8DD] hover:border-[#C5A059] transition-all">
        <img src="${imgUrl}" alt="${title}" class="w-full h-full object-cover">
      </button>
    `).join('');

    const stockStatus = document.getElementById('qv-stock-status');
    const isOutOfStock = product.stock <= 0;
    if (isOutOfStock) {
      stockStatus.innerHTML = `<span class="text-red-600 font-semibold text-xs">● ${I18N.t('out_of_stock')}</span>`;
    } else {
      stockStatus.innerHTML = `<span class="text-emerald-700 font-semibold text-xs">● Stokta ${product.stock} adet</span>`;
    }

    document.getElementById('qv-stepper-val').textContent = '1';

    const sizeContainer = document.getElementById('qv-sizes-container');
    if (product.sizes && product.sizes.length > 0) {
      sizeContainer.innerHTML = product.sizes.map((sz, idx) => `
        <label class="cursor-pointer">
          <input type="radio" name="qv-size" value="${sz}" ${idx === 0 ? 'checked' : ''} class="peer sr-only">
          <span class="px-3 py-1.5 rounded-lg border border-[#EFE8DD] text-xs font-medium text-[#141413] peer-checked:border-[#141413] peer-checked:bg-[#141413] peer-checked:text-white transition-all block">
            ${sz}
          </span>
        </label>
      `).join('');
    }

    const materialContainer = document.getElementById('qv-materials-container');
    if (product.materialOptions && product.materialOptions.length > 0) {
      materialContainer.innerHTML = product.materialOptions.map((mat, idx) => `
        <label class="cursor-pointer flex items-center gap-2">
          <input type="radio" name="qv-material" value="${mat.id}" ${idx === 0 ? 'checked' : ''} class="peer sr-only">
          <span class="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center peer-checked:ring-2 peer-checked:ring-[#C5A059]" style="background-color: ${mat.color}"></span>
          <span class="text-xs text-[#383836] font-medium">${I18N.currentLang === 'tr' ? mat.nameTr : mat.nameEn}</span>
        </label>
      `).join('');
    }

    renderRelatedProducts(product);
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  const closeQuickView = (skipHistory = false) => {
    const modal = document.getElementById('quick-view-modal');
    if (modal) modal.classList.add('hidden');
    document.title = DEFAULT_DOC_TITLE;
    updateProductSeoSchema(null);
    if (!skipHistory && window.history && window.history.replaceState) {
      try {
        const cleanUrl = new URL(window.location.href);
        if (cleanUrl.searchParams.has('urun')) {
          cleanUrl.searchParams.delete('urun');
          window.history.replaceState({}, '', cleanUrl.toString());
        }
      } catch (e) {}
    }
  };

  const copyProductLink = async () => {
    if (!state.quickViewProductId) return;
    try {
      const shareUrl = new URL(window.location.href);
      shareUrl.searchParams.set('urun', state.quickViewProductId);
      await navigator.clipboard.writeText(shareUrl.toString());
      showToast("Ürünün direkt paylaşım linki kopyalandı! 🔗");
    } catch (e) {
      showToast("Link kopyalanamadı, adres çubuğundan kopyalayabilirsiniz.", "error");
    }
  };

  const changeQuickViewQty = (delta) => {
    const valEl = document.getElementById('qv-stepper-val');
    if (!valEl) return;
    const product = DB.getProductById(state.quickViewProductId);
    if (!product) return;

    let current = parseInt(valEl.textContent, 10) || 1;
    let next = current + delta;
    if (next < 1) next = 1;
    if (next > product.stock) {
      next = product.stock;
      showToast(`Maksimum stok: ${product.stock}`, "error");
    }
    valEl.textContent = next;
  };

  const addQuickViewToCart = () => {
    const product = DB.getProductById(state.quickViewProductId);
    if (!product || product.stock <= 0) return;

    const qty = parseInt(document.getElementById('qv-stepper-val')?.textContent, 10) || 1;
    const selectedSize = document.querySelector('input[name="qv-size"]:checked')?.value || 'Standart';
    const selectedMat = document.querySelector('input[name="qv-material"]:checked')?.value || 'altin';

    const result = DB.addToCart(product.id, qty, { size: selectedSize, material: selectedMat });
    if (result.success) {
      showToast(`${qty} adet sepetinize eklendi! ✨`);
      updateCartBadge();
      updateCartDrawer();
      closeQuickView();
      openCartDrawer();
    } else {
      showToast(result.message, "error");
    }
  };

  const renderRelatedProducts = (currentProduct) => {
    const container = document.getElementById('qv-related-container');
    if (!container) return;

    const all = DB.getProducts();
    const related = all.filter(p => p.id !== currentProduct.id).slice(0, 3);

    container.innerHTML = related.map(p => {
      const title = I18N.currentLang === 'tr' ? p.name.tr : p.name.en;
      const price = p.discountPriceTRY ? I18N.formatPrice(p.discountPriceTRY) : I18N.formatPrice(p.priceTRY);
      return `
        <div class="flex items-center gap-3 p-2 rounded-xl bg-white border border-[#EFE8DD] hover:border-[#C5A059] transition-all cursor-pointer" onclick="App.openQuickView('${p.id}')">
          <img src="${p.images[0]}" alt="${title}" class="w-12 h-12 object-cover rounded-lg">
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-semibold text-[#141413] truncate">${title}</h5>
            <span class="text-xs font-bold text-[#A8823B]">${price}</span>
          </div>
          <button onclick="event.stopPropagation(); App.addProductCardToCart('${p.id}')" class="p-1.5 rounded-lg bg-[#FCFAF7] hover:bg-[#141413] hover:text-white text-[#141413] border border-[#EFE8DD] transition-colors" title="Sepete Ekle">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    }).join('');
  };

  // Filter & Search
  const setCategory = (cat) => {
    state.selectedCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(btn => {
      const active = btn.getAttribute('data-cat') === cat;
      btn.classList.toggle('bg-[#141413]', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('border-[#141413]', active);
      btn.classList.toggle('bg-white', !active);
      btn.classList.toggle('text-[#383836]', !active);
    });
    renderProducts();
  };

  const setMaterial = (mat) => {
    state.selectedMaterial = mat;
    renderProducts();
  };

  const clearFilters = () => {
    state.selectedCategory = 'all';
    state.selectedMaterial = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    setCategory('all');
  };

  const handleSearchInput = (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  };

  const handleSortChange = (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  };

  const switchLanguage = (lang) => {
    I18N.setLang(lang);
    applyTranslations();
    renderProducts();
    updateCartDrawer();
  };

  const switchCurrency = (curr) => {
    I18N.setCurrency(curr);
    applyTranslations();
    renderProducts();
    updateCartDrawer();
  };

  // =========================================================================
  // LUXURY CHAT ASSISTANT LOGIC (Instagram DM & Concierge Widget)
  // =========================================================================
  let chatIsOpen = false;

  const toggleChatAssistant = () => {
    const card = document.getElementById('chat-window-card');
    if (!card) return;

    chatIsOpen = !chatIsOpen;
    if (chatIsOpen) {
      card.classList.remove('hidden');
      setTimeout(() => {
        const input = document.getElementById('chat-user-input');
        if (input) input.focus();
      }, 100);
    } else {
      card.classList.add('hidden');
    }
    if (window.lucide) lucide.createIcons();
  };

  const appendChatMessage = (sender, text) => {
    const body = document.getElementById('chat-messages-body');
    if (!body) return;

    const msgEl = document.createElement('div');
    if (sender === 'user') {
      msgEl.className = 'flex justify-end';
      msgEl.innerHTML = `
        <div class="bg-[#141413] text-[#E6C280] p-3 rounded-2xl rounded-tr-sm shadow-sm text-xs leading-relaxed max-w-[85%]">
          ${text}
        </div>
      `;
    } else {
      msgEl.className = 'flex items-start gap-2.5';
      msgEl.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#141413] text-[#E6C280] flex items-center justify-center text-[10px] shrink-0 font-serif-luxury mt-0.5">
          MT
        </div>
        <div class="bg-white p-3 rounded-2xl rounded-tl-sm border border-[#EFE8DD] shadow-sm text-neutral-700 leading-relaxed max-w-[85%] text-xs">
          ${text}
        </div>
      `;
    }

    body.appendChild(msgEl);
    body.scrollTop = body.scrollHeight;
    if (window.lucide) lucide.createIcons();
  };

  const handleQuickQuestion = (topic) => {
    if (topic === 'olcu') {
      appendChatMessage('user', '📏 Yüzük ve kolye ölçüsü nasıl bulunur?');
      setTimeout(() => {
        appendChatMessage('bot', `
          <strong>Yüzük Ölçüsü:</strong> Bir ipi parmağınıza sarıp cetvelle milimetre (mm) cinsinden çevre uzunluğunu ölçebilirsiniz:<br>
          • 52 mm = 12 Numara<br>
          • 54 mm = 14 Numara<br>
          • 56 mm = 16 Numara<br>
          • 58 mm = 18 Numara<br><br>
          <strong>Kolye Ölçüsü:</strong> Kolyelerimiz standart 40 cm + 5 cm uzatma zincirlidir; her dekolteye mükemmel uyum sağlar ✨
        `);
      }, 350);
    } else if (topic === 'kararma') {
      appendChatMessage('user', '💧 Takılar kararır mı / Suya dayanıklı mı?');
      setTimeout(() => {
        appendChatMessage('bot', `
          Takılarımız <strong>birinci sınıf antialerjik kaplama</strong> ile üretilmektedir ve nikel içermez.<br><br>
          Parfüm, dezenfektan ve çamaşır suyu gibi sert kimyasallardan korunduğu sürece uzun yıllar ilk günkü ışıltısını muhafaza eder ✨
        `);
      }, 350);
    } else if (topic === 'kargo') {
      appendChatMessage('user', '🚚 Kargo ücreti ve teslimat süresi nedir?');
      setTimeout(() => {
        appendChatMessage('bot', `
          <strong>500 ₺ ve üzeri</strong> siparişlerde kargonuz <strong>ÜCRETSİZDİR!</strong><br><br>
          Siparişleriniz özel hediye kutusunda 1-3 iş günü içerisinde kargo firmasına teslim edilir ve takip kodu iletilir.
        `);
      }, 350);
    }
  };

  let chatFallbackCount = 0;

  const normalizeChatText = (s) => s.toLowerCase().replace(/\u0307/g, '')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c')
    .replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u');

  const chatChips = (items) => `<div class="flex flex-wrap gap-1.5 mt-2.5">${items.map(t =>
    `<button onclick="App.askChat('${t}')" class="px-2.5 py-1 rounded-full bg-[#FCFAF7] border border-[#EFE8DD] hover:border-[#C5A059] text-[11px] text-[#141413] transition-colors">${t}</button>`
  ).join('')}</div>`;

  const getBotReply = (userText) => {
    const q = normalizeChatText(userText);
    const has = (...words) => words.some(w => q.includes(w));

    if (has('merhaba', 'selam', 'iyi gunler', 'günaydın', 'gunaydin')) {
      chatFallbackCount = 0;
      return 'Merhaba, hoş geldiniz ✨ Size nasıl yardımcı olabilirim?' + chatChips(['Kolye öner', 'Kargo ne kadar sürer?', 'İade var mı?']);
    }
    if (has('kolye', 'yuzuk', 'bileklik', 'kupe', 'oner', 'tavsiye', 'hediye')) {
      let cat = null;
      if (has('kolye')) cat = 'kolye';
      else if (has('yuzuk')) cat = 'yuzuk';
      else if (has('bileklik')) cat = 'bileklik';
      else if (has('kupe')) cat = 'kupe';

      let products = [];
      try { products = DB.getProducts().filter(p => p.stock > 0 && (!cat || p.category === cat)).slice(0, 3); } catch (e) {}
      if (products.length > 0) {
        chatFallbackCount = 0;
        const list = products.map(p => `• <strong>${p.name.tr}</strong> – ${I18N.formatPrice(p.discountPriceTRY || p.priceTRY)}`).join('<br>');
        const gift = has('hediye') ? '<br><br>Tüm siparişlerimiz hediye kutusunda gönderilir 🎁' : '';
        return `Size şunları önerebilirim:<br><br>${list}${gift}<br><br><a href="#koleksiyon" onclick="App.toggleChatAssistant()" class="text-[#A8823B] underline underline-offset-2">Koleksiyonu incele</a>`;
      }
    }
    if (has('fiyat', 'indirim', 'ucret', 'kampanya')) {
      chatFallbackCount = 0;
      return 'Fiyatlar ürün kartlarında yazıyor, bazı modellerde indirim var. <strong>500 ₺ ve üzeri</strong> siparişlerde kargo ücretsiz, altında 49 ₺ ✨';
    }
    if (has('kargo', 'teslim', 'ne zaman', 'takip', 'siparis', 'gonder')) {
      chatFallbackCount = 0;
      return 'Siparişler 1-3 iş günü içinde kargoya verilir ve <strong>takip kodunuz e-posta ile iletilir</strong>. 500 ₺ üzeri kargo ücretsizdir 🚚';
    }
    if (has('iade', 'degisim', 'cayma', 'geri')) {
      chatFallbackCount = 0;
      return 'Teslim aldıktan sonra <strong>14 gün içinde iade</strong> hakkınız var. Ürün kutusu ve ambalajıyla eksiksiz olmalı (hijyen gereği ambalajı açılmış küpeler hariç). Detaylar için sayfa altındaki “İptal ve İade Koşulları” bölümüne bakabilirsiniz.';
    }
    if (has('odeme', 'havale', 'eft', 'fast', 'kredi', 'kart', 'taksit')) {
      chatFallbackCount = 0;
      return 'Şu an <strong>Havale/FAST</strong> ile ödeme alıyoruz. Kredi kartı yakında aktif olacak 💳 Siparişten sonra ödeme bilgileri size iletilir.';
    }
    if (has('olcu', 'beden', 'numara', 'boy', 'uzunluk')) {
      chatFallbackCount = 0;
      return '<strong>Yüzük:</strong> Parmak çevrenizi mm ölçün: 52 mm = 12, 54 mm = 14, 56 mm = 16, 58 mm = 18 numara.<br><strong>Kolye:</strong> 40 cm + 5 cm uzatma zinciri standarttır.';
    }
    if (has('karar', 'su ', 'suya', 'alerji', 'nikel', 'kaplama', 'malzeme', 'celik')) {
      chatFallbackCount = 0;
      return 'Takılarımız antialerjik kaplamadır ve nikel içermez. Parfüm, dezenfektan ve sert kimyasallardan uzak tutarsanız uzun süre ilk günkü ışıltısını korur ✨';
    }
    if (has('stok', 'var mi', 'mevcut')) {
      chatFallbackCount = 0;
      return 'Stok durumu her ürün kartında görünür. “Tükendi” yazmayan ürünleri hemen sepete ekleyebilirsiniz 😊';
    }
    if (has('tesekkur', 'sag ol', 'sagol')) {
      chatFallbackCount = 0;
      return 'Rica ederiz, keyifli alışverişler dileriz 🤍';
    }

    chatFallbackCount++;
    let reply = 'Tam anlayamadım, şu konulardan birini seçebilirsiniz:' + chatChips(['Kolye öner', 'Kargo ne kadar sürer?', 'İade var mı?', 'Ölçü nasıl bulunur?', 'Ödeme yöntemleri']);
    if (chatFallbackCount >= 2) {
      reply += '<p class="mt-3 text-[11px] text-neutral-500">Sorunuz özelse Instagram’dan da yazabilirsiniz: <a href="https://ig.me/m/moderntaki.co" target="_blank" rel="noopener noreferrer" class="text-[#A8823B] underline underline-offset-2">@moderntaki.co</a></p>';
    }
    return reply;
  };

  const askChat = (text) => {
    appendChatMessage('user', text);
    setTimeout(() => appendChatMessage('bot', getBotReply(text)), 400);
  };

  const handleChatUserSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-user-input');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim().replace(/</g, '&lt;');
    input.value = '';
    askChat(userText);
  };

  const setupEventListeners = () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', handleSearchInput);

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.addEventListener('change', handleSortChange);

    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);

    const regForm = document.getElementById('register-form');
    if (regForm) regForm.addEventListener('submit', handleRegisterSubmit);

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', submitCheckoutOrder);
  };

  const renderHeroBanner = () => {
    let banner = null;
    try {
      const stored = localStorage.getItem('moderntaki_hero_banner');
      if (stored) banner = JSON.parse(stored);
    } catch (e) {}

    if (!banner && typeof window !== 'undefined' && window.MODERNTAKI_HERO_BANNER) {
      banner = window.MODERNTAKI_HERO_BANNER;
    }

    if (!banner) return;

    const imgEl = document.getElementById('hero-banner-img');
    const badgeEl = document.getElementById('hero-banner-badge');
    const titleEl = document.getElementById('hero-banner-title');

    if (imgEl && banner.imageUrl) imgEl.src = banner.imageUrl;
    if (badgeEl && banner.badge) badgeEl.textContent = banner.badge;
    if (titleEl && banner.title) titleEl.textContent = banner.title;
  };

  const init = () => {
    applyTranslations();
    renderHeroBanner();
    renderProducts();
    updateCartBadge();
    updateWishlistBadge();
    updateAuthUI();
    setupEventListeners();

    // Open product directly if ?urun=mt-xxx is present in URL
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProductId = params.get('urun');
      if (urlProductId && DB.getProductById(urlProductId)) {
        openQuickView(urlProductId, true);
      }
      window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search).get('urun');
        if (p && DB.getProductById(p)) openQuickView(p, true);
        else closeQuickView(true);
      });
    } catch (e) {}

    if (DB.syncStockFromCloud) {
      DB.syncStockFromCloud().then(res => {
        if (res && res.changed) renderProducts();
      });
    }
  };

  return {
    init,
    renderProducts,
    changeProductCardQty,
    addProductCardToCart,
    toggleWishlist,
    openWishlistModal,
    closeWishlistModal,
    addAllWishlistToCart,
    openCartDrawer,
    closeCartDrawer,
    updateCartQty,
    removeFromCart,
    startCheckout,
    continueAsGuest,
    openCheckoutModal,
    closeCheckoutModal,
    submitCheckoutOrder,
    showOrderSuccessModal,
    closeOrderSuccessModal,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    handleLogout,
    openQuickView,
    closeQuickView,
    copyProductLink,
    changeQuickViewQty,
    addQuickViewToCart,
    openPolicyModal,
    closePolicyModal,
    toggleChatAssistant,
    handleQuickQuestion,
    handleChatUserSubmit,
    askChat,
    setCategory,
    setMaterial,
    clearFilters,
    switchLanguage,
    switchCurrency
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
