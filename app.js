// ===== NEXUS E-COMMERCE — App Logic (Clean v3) =====

// STATE
var cart     = JSON.parse(localStorage.getItem('nexus_cart')    || '[]');
var wishlist = JSON.parse(localStorage.getItem('nexus_wishlist') || '[]');
var user     = JSON.parse(localStorage.getItem('nexus_user')    || 'null');
var activeCategory = null;
var maxPrice       = 400000;
var currentPage    = 'home';
var prevPage       = 'home';
var aiOpen         = false;
var aiHistory      = [];

// INIT
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);

  initCursor();
  spawnParticles();
  renderCategories();
  renderFeatured();
  renderArrivals();
  renderCategoryFilters();
  updateCartUI();
  updateWishlistBadge();
  if (user) updateAuthUI();

  window.addEventListener('scroll', function() {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-search-wrap')) {
      document.getElementById('search-dropdown').classList.add('hidden');
    }
    if (!e.target.closest('#auth-modal') && !e.target.closest('#auth-btn')) {
      document.getElementById('auth-modal').classList.add('hidden');
    }
  });

  document.getElementById('ai-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendAIMessage();
  });
});

// CURSOR
function initCursor() {
  var cursor   = document.getElementById('cursor');
  var follower = document.getElementById('cursor-follower');
  var mouseX = 0, mouseY = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animF() {
    fx += (mouseX - fx) * 0.12;
    fy += (mouseY - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animF);
  }
  animF();
}

// PARTICLES
function spawnParticles() {
  var hero = document.querySelector('.hero-visual');
  if (!hero) return;
  var colors = ['#9B5CFF','#00F5FF','#FF2D8B','#E8FF00','#FF7A00','#00E676'];
  setInterval(function() {
    var p    = document.createElement('div');
    var size = Math.random() * 6 + 3;
    var col  = colors[Math.floor(Math.random() * colors.length)];
    var left = Math.random() * 100;
    var dur  = Math.random() * 4 + 4;
    p.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;' +
      'background:' + col + ';border-radius:50%;left:' + left + '%;bottom:0;' +
      'opacity:0;animation:floatP ' + dur + 's ease forwards;' +
      'box-shadow:0 0 ' + (size*2) + 'px ' + col + ';pointer-events:none;';
    hero.appendChild(p);
    setTimeout(function() { p.remove(); }, dur * 1000);
  }, 400);
}

// TOAST
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2500);
}

// FORMAT PRICE
function formatPrice(p) {
  return '\u20B9' + p.toLocaleString('en-IN');
}

// PAGE NAVIGATION
function showPage(name) {
  prevPage = currentPage;
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(function(l) {
    l.classList.toggle('active', l.dataset.page === name);
  });
  currentPage = name;
  window.scrollTo(0, 0);
  if (name === 'products') { filterProducts(); }
  if (name === 'deals')    { renderDeals(); }
  if (name === 'wishlist') { renderWishlistPage(); }
}

function goBack() {
  showPage(prevPage);
}

// PRODUCT CARD HTML
function productCard(product) {
  var inWish   = wishlist.indexOf(product.id) !== -1;
  var discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  return '<div class="product-card" onclick="showDetail(' + product.id + ')">' +
    '<div class="product-img-wrap">' +
      '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" ' +
        'onerror="this.src=\'https://via.placeholder.com/300x300/111827/8A9AB0?text=Product\'"/>' +
      (product.badge ? '<span class="product-badge' + (product.isDeal ? ' deal' : '') + '">' + product.badge + '</span>' : '') +
      (discount > 5 ? '<span class="product-badge deal" style="top:auto;bottom:12px;left:12px">-' + discount + '%</span>' : '') +
      '<button class="wish-btn' + (inWish ? ' active' : '') + '" onclick="toggleWishlist(event,' + product.id + ')">' +
        '<i class="fas fa-heart"></i></button>' +
      '<div class="card-actions">' +
        '<button class="btn-add" onclick="addToCart(event,' + product.id + ')">ADD TO CART</button>' +
        '<button class="btn-view" onclick="showDetail(' + product.id + ')"><i class="fas fa-eye"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="card-body">' +
      '<div class="card-category">' + product.category + '</div>' +
      '<div class="card-name">' + product.name + '</div>' +
      '<div class="card-bottom">' +
        '<div>' +
          '<div class="card-price">' + formatPrice(product.price) + '</div>' +
          (product.originalPrice ? '<div class="card-original">' + formatPrice(product.originalPrice) + '</div>' : '') +
        '</div>' +
        '<div class="card-rating"><span class="star">&#9733;</span> ' + product.rating + ' (' + product.reviews.toLocaleString() + ')</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// RENDER HOME SECTIONS
function renderCategories() {
  var grid = document.getElementById('categories-grid');
  grid.innerHTML = CATEGORIES.map(function(c) {
    var count = PRODUCTS.filter(function(p) { return p.category === c.name; }).length;
    return '<div class="cat-card" onclick="filterByCategory(\'' + c.name + '\')">' +
      '<div class="cat-icon"><i class="fas ' + c.icon + '"></i></div>' +
      '<div class="cat-name">' + c.name + '</div>' +
      '<div class="cat-count">' + count + ' products</div>' +
    '</div>';
  }).join('');
}

function renderFeatured() {
  var featured = PRODUCTS.slice().sort(function(a,b){ return b.rating - a.rating; }).slice(0, 8);
  document.getElementById('featured-grid').innerHTML = featured.map(productCard).join('');
}

function renderArrivals() {
  var arrivals = PRODUCTS.filter(function(p){ return p.isNew; }).slice(0, 4);
  document.getElementById('arrivals-grid').innerHTML = arrivals.map(productCard).join('');
}

function renderDeals() {
  var deals = PRODUCTS.filter(function(p){ return p.isDeal; });
  document.getElementById('deals-grid').innerHTML = deals.map(productCard).join('');
}

// CATEGORY FILTERS (shop page)
function renderCategoryFilters() {
  var panel = document.getElementById('cat-filters');
  panel.innerHTML = CATEGORIES.map(function(c) {
    return '<div class="filter-item" onclick="setCategoryFilter(\'' + c.name + '\',this)">' +
      '<i class="fas ' + c.icon + '" style="font-size:13px;color:var(--text-muted)"></i>' + c.name +
    '</div>';
  }).join('');
}

function setCategoryFilter(name, el) {
  if (activeCategory === name) {
    activeCategory = null;
    el.classList.remove('active');
  } else {
    activeCategory = name;
    document.querySelectorAll('#cat-filters .filter-item').forEach(function(i){ i.classList.remove('active'); });
    el.classList.add('active');
  }
  filterProducts();
}

// FILTER + SORT
function filterProducts() {
  var filtered = PRODUCTS.slice();
  if (activeCategory) filtered = filtered.filter(function(p){ return p.category === activeCategory; });
  filtered = filtered.filter(function(p){ return p.price <= maxPrice; });
  var minR = parseFloat(document.querySelector('input[name="rating"]:checked').value || 0);
  if (minR > 0) filtered = filtered.filter(function(p){ return p.rating >= minR; });
  var sort = document.getElementById('sort-select').value;
  if (sort === 'price-asc')  filtered.sort(function(a,b){ return a.price - b.price; });
  if (sort === 'price-desc') filtered.sort(function(a,b){ return b.price - a.price; });
  if (sort === 'rating')     filtered.sort(function(a,b){ return b.rating - a.rating; });
  if (sort === 'name')       filtered.sort(function(a,b){ return a.name.localeCompare(b.name); });
  var grid = document.getElementById('products-grid');
  grid.innerHTML = filtered.length
    ? filtered.map(productCard).join('')
    : '<div style="padding:60px;text-align:center;color:var(--text-muted);grid-column:1/-1">No products match your filters.</div>';
  document.getElementById('products-count').textContent = filtered.length + ' products found';
  document.getElementById('filter-label-text').textContent = activeCategory ? 'Showing: ' + activeCategory : 'Showing all products';
}

function updatePriceFilter(val) {
  maxPrice = parseInt(val);
  document.getElementById('price-val').textContent = parseInt(val).toLocaleString('en-IN');
  filterProducts();
}

function resetFilters() {
  activeCategory = null;
  maxPrice = 400000;
  document.getElementById('price-range').value = 400000;
  document.getElementById('price-val').textContent = '4,00,000';
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  document.getElementById('sort-select').value = 'default';
  document.querySelectorAll('#cat-filters .filter-item').forEach(function(i){ i.classList.remove('active'); });
  filterProducts();
}

function filterByCategory(cat) {
  showPage('products');
  activeCategory = cat;
  setTimeout(function() {
    document.querySelectorAll('#cat-filters .filter-item').forEach(function(i) {
      if (i.textContent.trim() === cat) i.classList.add('active');
    });
    filterProducts();
  }, 100);
}

// SEARCH
function handleSearch(val) {
  var dropdown = document.getElementById('search-dropdown');
  if (!val.trim()) { dropdown.classList.add('hidden'); return; }
  var results = PRODUCTS.filter(function(p) {
    return p.name.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
           p.category.toLowerCase().indexOf(val.toLowerCase()) !== -1;
  }).slice(0, 5);
  if (!results.length) { dropdown.classList.add('hidden'); return; }
  dropdown.innerHTML = results.map(function(p) {
    return '<div class="search-item" onclick="showDetail(' + p.id + ')">' +
      '<img class="search-item-img" src="' + p.image + '" alt="' + p.name + '" ' +
        'onerror="this.src=\'https://via.placeholder.com/40/111827/8A9AB0?text=P\'"/>' +
      '<div class="search-item-info">' +
        '<div class="name">' + p.name + '</div>' +
        '<div class="price">' + formatPrice(p.price) + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
  dropdown.classList.remove('hidden');
}

// CART
function addToCart(e, id, qty) {
  if (e) e.stopPropagation();
  qty = qty || 1;
  var product  = PRODUCTS.find(function(p){ return p.id === id; });
  var existing = cart.find(function(i){ return i.id === id; });
  if (existing) existing.qty += qty;
  else cart.push({ id: id, qty: qty });
  saveCart();
  updateCartUI();
  showToast('Added: ' + product.name.split(' ').slice(0,3).join(' '));
}

function removeFromCart(id) {
  cart = cart.filter(function(i){ return i.id !== id; });
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  var item = cart.find(function(i){ return i.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function saveCart() {
  localStorage.setItem('nexus_cart', JSON.stringify(cart));
}

function updateCartUI() {
  var total = cart.reduce(function(s,i){ return s + i.qty; }, 0);
  document.getElementById('cart-badge').textContent       = total;
  document.getElementById('cart-total-count').textContent = total;
  var container = document.getElementById('cart-items');
  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">' +
      '<i class="fas fa-shopping-bag"></i>' +
      '<p>Your cart is empty</p>' +
      '<button class="btn-primary" onclick="closeCart();showPage(\'products\')">SHOP NOW</button>' +
    '</div>';
    document.getElementById('cart-subtotal').textContent   = '\u20B90';
    document.getElementById('cart-grand-total').textContent = '\u20B90';
    return;
  }
  var subtotal = 0;
  container.innerHTML = cart.map(function(item) {
    var product = PRODUCTS.find(function(p){ return p.id === item.id; });
    if (!product) return '';
    subtotal += product.price * item.qty;
    return '<div class="cart-item">' +
      '<img class="cart-item-img" src="' + product.image + '" alt="' + product.name + '" ' +
        'onerror="this.src=\'https://via.placeholder.com/70/111827/8A9AB0?text=P\'"/>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + product.name + '</div>' +
        '<div class="cart-item-price">' + formatPrice(product.price) + '</div>' +
        '<div class="cart-item-controls">' +
          '<button class="qty-btn" onclick="changeQty(' + item.id + ',-1)">\u2212</button>' +
          '<span class="qty-num">' + item.qty + '</span>' +
          '<button class="qty-btn" onclick="changeQty(' + item.id + ',1)">+</button>' +
          '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')"><i class="fas fa-trash"></i></button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
  document.getElementById('cart-subtotal').textContent    = formatPrice(subtotal);
  document.getElementById('cart-grand-total').textContent = formatPrice(subtotal);
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('active');
}

function checkout() {
  if (!user) { closeCart(); toggleAuth(); showToast('Please login to checkout'); return; }
  if (!cart.length) { showToast('Your cart is empty'); return; }
  cart = []; saveCart(); updateCartUI(); closeCart();
  showToast('Order placed successfully! Thank you!');
}

// WISHLIST
function toggleWishlist(e, id) {
  if (e) e.stopPropagation();
  var idx = wishlist.indexOf(id);
  if (idx !== -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist'); }
  else            { wishlist.push(id);       showToast('Added to wishlist'); }
  localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  renderFeatured();
  renderArrivals();
  if (currentPage === 'products') filterProducts();
  if (currentPage === 'deals')    renderDeals();
  if (currentPage === 'wishlist') renderWishlistPage();
}

function updateWishlistBadge() {
  document.getElementById('wish-count').textContent = wishlist.length;
}

function renderWishlistPage() {
  var grid  = document.getElementById('wishlist-grid');
  var empty = document.getElementById('wishlist-empty');
  var items = PRODUCTS.filter(function(p){ return wishlist.indexOf(p.id) !== -1; });
  if (!items.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); }
  else               { empty.classList.add('hidden'); grid.innerHTML = items.map(productCard).join(''); }
}

// BUY NOW
function buyNow(e, id) {
  if (e) e.stopPropagation();
  if (!user) { showToast('Please login to place an order'); toggleAuth(); return; }
  var product = PRODUCTS.find(function(p){ return p.id === id; });
  addToCart(null, id, 1);
  showToast('Proceeding to buy ' + product.name.split(' ').slice(0,3).join(' '));
  setTimeout(function() { openCart(); }, 600);
}

// PRODUCT DETAIL
function showDetail(id) {
  prevPage = currentPage;
  var product = PRODUCTS.find(function(p){ return p.id === id; });
  if (!product) return;
  var inWish   = wishlist.indexOf(id) !== -1;
  var discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  var related = PRODUCTS.filter(function(p){ return p.category === product.category && p.id !== id; }).slice(0, 4);
  var specsHTML = '';
  if (product.specs) {
    specsHTML = '<div style="margin-top:28px">' +
      '<h3 style="font-size:14px;font-weight:700;letter-spacing:0.1em;margin-bottom:16px;color:var(--text-primary)">SPECIFICATIONS</h3>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
      Object.entries(product.specs).map(function(kv) {
        return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px">' +
          '<div style="font-size:11px;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">' + kv[0] + '</div>' +
          '<div style="font-size:13px;font-weight:500">' + kv[1] + '</div>' +
        '</div>';
      }).join('') +
      '</div></div>';
  }
  var relatedHTML = related.length
    ? '<div style="margin-top:48px"><h2 class="related-title">SIMILAR <span class="accent">PRODUCTS</span></h2>' +
      '<div class="products-grid">' + related.map(productCard).join('') + '</div></div>'
    : '';

  document.getElementById('detail-content').innerHTML =
    '<button class="back-btn" onclick="goBack()" style="margin-bottom:24px">' +
      '<i class="fas fa-arrow-left"></i> Back' +
    '</button>' +
    '<div class="detail-layout">' +
      '<div class="detail-img-wrap">' +
        '<img src="' + product.image + '" alt="' + product.name + '" ' +
          'onerror="this.src=\'https://via.placeholder.com/400/111827/8A9AB0?text=Product\'"/>' +
      '</div>' +
      '<div class="detail-info">' +
        (product.badge ? '<div class="detail-badge"><span class="product-badge">' + product.badge + '</span></div>' : '') +
        '<h1 class="detail-name">' + product.name + '</h1>' +
        '<div class="detail-meta">' +
          '<span><i class="fas fa-star" style="color:#FFB800"></i> ' + product.rating + ' (' + product.reviews.toLocaleString() + ' reviews)</span>' +
          '<span style="color:var(--g-green)">&#9679; In Stock</span>' +
          '<span>' + product.category + '</span>' +
        '</div>' +
        '<div class="detail-price-row">' +
          '<span class="detail-price">' + formatPrice(product.price) + '</span>' +
          (product.originalPrice ? '<span class="detail-original">' + formatPrice(product.originalPrice) + '</span>' : '') +
          (discount > 5 ? '<span class="detail-discount">-' + discount + '% OFF</span>' : '') +
        '</div>' +
        '<p class="detail-desc">' + product.description + '</p>' +
        '<div class="detail-actions">' +
          '<button class="btn-buy-now" onclick="buyNow(event,' + id + ')">' +
            '<i class="fas fa-bolt"></i> BUY NOW' +
          '</button>' +
          '<button class="btn-primary" onclick="addToCart(event,' + id + ')">' +
            '<i class="fas fa-shopping-bag"></i> ADD TO CART' +
          '</button>' +
          '<button class="btn-wish-detail' + (inWish ? ' active' : '') + '" onclick="toggleWishlist(event,' + id + ')">' +
            '<i class="fas fa-heart"></i>' +
          '</button>' +
        '</div>' +
        '<div class="detail-features">' +
          '<div class="feature-item"><i class="fas fa-truck"></i> Free Delivery</div>' +
          '<div class="feature-item"><i class="fas fa-rotate-left"></i> 7-Day Returns</div>' +
          '<div class="feature-item"><i class="fas fa-shield-alt"></i> 1 Year Warranty</div>' +
          '<div class="feature-item"><i class="fas fa-lock"></i> Secure Payment</div>' +
        '</div>' +
        specsHTML +
      '</div>' +
    '</div>' +
    relatedHTML;

  showPage('detail');
}

// AUTH
function toggleAuth() {
  var modal = document.getElementById('auth-modal');
  modal.classList.toggle('hidden');
  if (user) showUserPanel();
}

function switchTab(tab) {
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signup-form').classList.toggle('hidden', tab !== 'signup');
  document.querySelectorAll('.auth-tab').forEach(function(t, i) {
    t.classList.toggle('active', (i===0 && tab==='login') || (i===1 && tab==='signup'));
  });
}

function login() {
  var email = document.getElementById('login-email').value.trim();
  var pass  = document.getElementById('login-pass').value.trim();
  if (!email || !pass) { showToast('Please fill all fields'); return; }
  var stored = JSON.parse(localStorage.getItem('nexus_users') || '[]');
  var found  = stored.find(function(u){ return u.email === email && u.password === pass; });
  if (!found) { showToast('Invalid credentials'); return; }
  user = { name: found.name, email: found.email };
  localStorage.setItem('nexus_user', JSON.stringify(user));
  updateAuthUI();
  document.getElementById('auth-modal').classList.add('hidden');
  showToast('Welcome back, ' + user.name + '!');
}

function signup() {
  var name  = document.getElementById('signup-name').value.trim();
  var email = document.getElementById('signup-email').value.trim();
  var pass  = document.getElementById('signup-pass').value.trim();
  if (!name || !email || !pass) { showToast('Please fill all fields'); return; }
  var stored = JSON.parse(localStorage.getItem('nexus_users') || '[]');
  if (stored.find(function(u){ return u.email === email; })) { showToast('Email already registered'); return; }
  stored.push({ name: name, email: email, password: pass });
  localStorage.setItem('nexus_users', JSON.stringify(stored));
  user = { name: name, email: email };
  localStorage.setItem('nexus_user', JSON.stringify(user));
  updateAuthUI();
  document.getElementById('auth-modal').classList.add('hidden');
  showToast('Welcome to NEXUS, ' + name + '!');
}

function logout() {
  user = null;
  localStorage.removeItem('nexus_user');
  document.getElementById('auth-modal').classList.add('hidden');
  document.getElementById('user-panel').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('auth-tabs').classList.remove('hidden');
  showToast('Logged out successfully');
}

function updateAuthUI() {
  if (!user) return;
  document.getElementById('auth-btn').querySelector('i').className = 'fas fa-user-check';
}

function showUserPanel() {
  if (user) {
    document.getElementById('user-panel').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('auth-tabs').classList.add('hidden');
    document.getElementById('user-name-display').textContent  = user.name;
    document.getElementById('user-email-display').textContent = user.email;
  }
}

// AI ASSISTANT
function toggleAI() {
  aiOpen = !aiOpen;
  document.getElementById('ai-panel').classList.toggle('open', aiOpen);
}

async function sendAIMessage() {
  var input = document.getElementById('ai-input');
  var msg   = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendAIMsg(msg, 'user');
  var productSummary = PRODUCTS.map(function(p) {
    return p.name + ' | ' + p.category + ' | Rs.' + p.price.toLocaleString() + ' | Rating:' + p.rating;
  }).join('\n');
  aiHistory.push({ role: 'user', content: msg });
  var typingDiv = document.createElement('div');
  typingDiv.className = 'ai-msg bot';
  typingDiv.innerHTML = '<div class="msg-bubble" style="color:var(--text-muted)">Thinking...</div>';
  document.getElementById('ai-messages').appendChild(typingDiv);
  try {
    var res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are NEXUS AI, a smart shopping assistant for NEXUS Electronics. Help users find the best products. Be concise and friendly. Here are our products:\n' + productSummary + '\nKeep replies under 80 words.',
        messages: aiHistory
      })
    });
    var data  = await res.json();
    var reply = (data.content && data.content[0] && data.content[0].text) || 'Sorry, something went wrong. Try again!';
    typingDiv.remove();
    appendAIMsg(reply, 'bot');
    aiHistory.push({ role: 'assistant', content: reply });
    if (aiHistory.length > 20) aiHistory = aiHistory.slice(-20);
  } catch(err) {
    typingDiv.remove();
    appendAIMsg('Connection issue. Please try again.', 'bot');
  }
}

function appendAIMsg(text, role) {
  var container = document.getElementById('ai-messages');
  var div = document.createElement('div');
  div.className = 'ai-msg ' + role;
  div.innerHTML = '<div class="msg-bubble">' + text + '</div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// CONTACT FORM
function submitContact() {
  var name    = document.getElementById('c-name').value.trim();
  var email   = document.getElementById('c-email').value.trim();
  var subject = document.getElementById('c-subject').value.trim();
  var message = document.getElementById('c-message').value.trim();
  if (!name || !email || !subject || !message) { showToast('Please fill all fields'); return; }
  document.getElementById('c-name').value    = '';
  document.getElementById('c-email').value   = '';
  document.getElementById('c-subject').value = '';
  document.getElementById('c-message').value = '';
  showToast('Message sent! We will reply within 24 hours.');
}
