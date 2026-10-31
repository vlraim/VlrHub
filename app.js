const STORAGE_KEYS = {
  favorites: 'vlrhub.favorites',
  saved: 'vlrhub.saved',
  recent: 'vlrhub.recent',
  settings: 'vlrhub.settings',
  customScripts: 'vlrhub.customScripts',
};

const THEME_ORDER = ['black', 'purple', 'blue', 'red', 'green'];
const ACCENT_PALETTE = ['#8b5cf6', '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#ec4899'];

const categories = [
  'RPG', 'Simulator', 'Tycoon', 'Adventure', 'FPS', 'Obby', 'Combat', 'Anime', 'Horror', 'Pet', 'Vehicle', 'Tower Defense', 'Action', 'Farm', 'PvP'
];

const games = [
  'Blox Fruits', 'Adopt Me!', 'Pet Simulator 99', 'Brookhaven', 'Tower of Hell', 'Arsenal', 'Doors', 'Project Slayers', 'Murder Mystery 2',
  'Da Hood', 'A Universal Time', 'Shindo Life', 'Counter Blox', 'King Legacy', 'Weapon Evolution', 'Anime Adventures', 'Bee Swarm Simulator',
  'Build a Boat for Treasure', 'Vehicle Simulator', 'Strongest Battlegrounds', 'Apex Legends', 'Blade Ball', 'Blox Piece', 'My Restaurant',
  'School Simulator', 'Tapping Legends', 'The Strongest Battlegrounds', 'Ragdoll Simulator', 'Dragon Ball Rage', 'Lumber Tycoon 2', 'Anime Defenders'
];

const scriptWords = [
  'Auto Farm', 'ESP', 'AimBot', 'Silent Aim', 'Infinite Jump', 'Fly', 'Combo', 'Auto Catch', 'Auto Quest', 'Kill Aura', 'Mob Farm', 'Dungeon Aura',
  'Fast Travel', 'Auto Skill', 'Hitbox', 'Chest Finder', 'Quest Helper', 'Teleport', 'Auto Loot', 'Radar', 'Aura', 'HP Stealer', 'Speed Hack', 'Wallhack',
  'Instant Grind', 'Auto Upgrade', 'Item ESP', 'Player Tracker', 'Auto Win', 'Webhook Trigger', 'God Mode', 'Script Hub', 'Unlocker', 'Boost', 'Loot Bot', 'Macro'
];

const executorNames = [
  'KRNL', 'Fluxus', 'Delta', 'Synapse X', 'Wave', 'Arceus X', 'Hydrogen', 'Comet', 'ScriptWare', 'CodeX', 'Nexus', 'JJSploit'
];

const executorPlatforms = [
  { name: 'KRNL', type: 'Windows', rating: 4.9, desc: 'Popular exploit for Roblox with stable injection and remote execution.', platforms: ['Windows', 'Mac'], compatibility: ['Blox Fruits', 'Arsenal', 'Doors'] },
  { name: 'Fluxus', type: 'Windows', rating: 4.8, desc: 'Low-latency executor built for speed and compatibility on modern scripts.', platforms: ['Windows', 'Android'], compatibility: ['Pet Simulator', 'Tower of Hell', 'Adopt Me'] },
  { name: 'Delta', type: 'Android', rating: 4.7, desc: 'Android-friendly exploit with streamlined UI and script management.', platforms: ['Android'], compatibility: ['Anime Adventures', 'Blox Fruits', 'Vampire Hunters'] },
  { name: 'Synapse X', type: 'Windows', rating: 4.9, desc: 'Premium executor with advanced script execution and stability.', platforms: ['Windows'], compatibility: ['Apex Legends', 'Arsenal', 'Doors'] },
  { name: 'Arceus X', type: 'Android', rating: 4.8, desc: 'Mobile-oriented executor with support for a vast library of scripts.', platforms: ['Android', 'iOS'], compatibility: ['Pet Simulator', 'Blox Fruits', 'Simulators'] },
  { name: 'ScriptWare', type: 'Windows', rating: 4.6, desc: 'Flexible script engine with rich API support for advanced tools.', platforms: ['Windows', 'Linux'], compatibility: ['Combat games', 'Obbies', 'Anime games'] }
];

const defaultScripts = generateScriptDatabase(200);

const state = {
  currentRoute: '#/home',
  favorites: loadArray(STORAGE_KEYS.favorites),
  saved: loadArray(STORAGE_KEYS.saved),
  recent: loadArray(STORAGE_KEYS.recent),
  settings: loadObject(STORAGE_KEYS.settings, { theme: 'black', mode: 'dark', accent: '#8b5cf6' }),
  customScripts: loadArray(STORAGE_KEYS.customScripts),
};

function generateScriptDatabase(count) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    const game = games[i % games.length];
    const category = categories[i % categories.length];
    const statusSet = ['Verified', 'Keyless', 'Key Required'];
    const status = statusSet[i % statusSet.length];
    const name = scriptWords[i % scriptWords.length];
    const title = `${name} | ${game}`;
    const slug = slugify(`script-${title}-${i + 1}`);
    const tags = [category, game.split(' ')[0], status.toLowerCase(), 'roblox', `update-${(i % 12) + 1}`];
    const likes = 640 + ((i * 31) % 3200);
    const isNew = i < 15;
    const isFeatured = i < 6;
    const code = buildScriptCode(title, status, category);

    items.push({
      id: `script-${i + 1}`,
      slug,
      title,
      game,
      category,
      status,
      tags,
      likes,
      featured: isFeatured,
      isNew,
      added: new Date(Date.now() - i * 604800000).toISOString(),
      description: `A ${status.toLowerCase()} script tailored for ${game} that boosts efficiency, automates tasks, and keeps gameplay smooth. Includes ${category.toLowerCase()} support, safe triggers, and a customizable setup guide.`,
      requirements: status === 'Key Required' ? ['Key Access', 'Executor', 'Latest Roblox build'] : ['Executor', 'Roblox client', 'Internet access'],
      platform: executorNames[i % executorNames.length],
      code,
      version: `v${(i % 15) + 1}.${(i % 7) + 2}`,
      downloads: 1200 + i * 18,
    });
  }
  return items;
}

function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function loadObject(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildScriptCode(title, status, category) {
  const shortName = title.split('|')[0].trim().replace(/\s+/g, ' ');
  const mode = status === 'Key Required' ? 'if KeySystem then' : 'if true then';
  return `-- ${shortName}\nlocal player = game.Players.LocalPlayer\nlocal workspace = game:GetService("Workspace")\nlocal UIS = game:GetService("UserInputService")\n\n${mode}\n    print("[${category}] ${shortName} loaded successfully")\n    local config = {\n        enabled = true,\n        speed = 1.5,\n        target = "${category}",\n        safeMode = true\n    }\n\n    -- Main logic\n    task.spawn(function()\n        while config.enabled do\n            wait(0.1)\n            if player.Character and player.Character:FindFirstChild("Humanoid") then\n                player.Character.Humanoid.WalkSpeed = 16 + config.speed\n            end\n        end\n    end)\nend\n`;
}

function getAllScripts() {
  return [...defaultScripts, ...state.customScripts];
}

function initializeTheme() {
  document.body.dataset.theme = state.settings.theme || 'black';
  document.body.dataset.mode = state.settings.mode || 'dark';
  document.documentElement.style.setProperty('--accent', state.settings.accent || '#8b5cf6');
  document.body.style.setProperty('--accent', state.settings.accent || '#8b5cf6');
  document.body.style.setProperty('--accent-soft', `${state.settings.accent || '#8b5cf6'}22`);
}

function safeHtml(input = '') {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getScriptBySlug(slug) {
  return getAllScripts().find((script) => script.slug === slug);
}

function getFeaturedScripts() {
  return getAllScripts().filter((item) => item.featured).slice(0, 4);
}

function getPopularScripts() {
  return [...getAllScripts()].sort((a, b) => b.likes - a.likes).slice(0, 4);
}

function getRecentScripts() {
  return [...getAllScripts()].sort((a, b) => new Date(b.added) - new Date(a.added)).slice(0, 5);
}

function getCategoryCounts() {
  const counts = {};
  getAllScripts().forEach((script) => {
    counts[script.category] = (counts[script.category] || 0) + 1;
  });
  return counts;
}

function setActiveNav() {
  const buttons = document.querySelectorAll('.nav-link');
  buttons.forEach((button) => {
    const route = button.dataset.route;
    button.classList.toggle('active', route === state.currentRoute);
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2200);
}

function renderScriptCard(script) {
  const isFavorite = state.favorites.includes(script.id);
  const isSaved = state.saved.includes(script.id);

  return `
    <article class="card script-card">
      <div class="card-body">
        <div class="badge-row">
          <span class="badge ${script.status.toLowerCase().replace(/\s+/g, '-')}">${script.status}</span>
          ${script.isNew ? '<span class="badge new">New</span>' : ''}
          ${script.featured ? '<span class="badge featured">Featured</span>' : ''}
        </div>
        <h3>${safeHtml(script.title)}</h3>
        <div class="meta-row">
          <span class="script-meta">${safeHtml(script.game)}</span>
          <span class="script-meta">•</span>
          <span class="script-meta">${safeHtml(script.category)}</span>
        </div>
        <p>${safeHtml(script.description.slice(0, 120))}...</p>
        <div class="label-row" style="margin-top: 12px;">
          ${script.tags.slice(0, 3).map((tag) => `<span class="badge" style="background: rgba(148, 163, 184, 0.08); color: var(--text);">${safeHtml(tag)}</span>`).join('')}
        </div>
        <div class="script-details">
          <div class="script-meta">
            <strong>${script.likes.toLocaleString()}</strong> likes
          </div>
          <div class="script-actions">
            <button class="inline-button" data-action="favorite" data-script-id="${script.id}">${isFavorite ? '★ Saved' : '☆ Favorite'}</button>
            <button class="inline-button" data-action="save" data-script-id="${script.id}">${isSaved ? '✓ Saved' : 'Save'}</button>
            <button class="inline-button" data-action="view" data-script-id="${script.id}">Open</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderHomePage() {
  const allScripts = getAllScripts();
  const recent = getRecentScripts();
  const popular = getPopularScripts();
  const featured = getFeaturedScripts();
  const recentViewed = state.recent.map((slug) => getScriptBySlug(slug)).filter(Boolean).slice(0, 3);

  return `
    <div class="page-shell">
      <section class="hero-panel">
        <div class="hero-inner">
          <h1>Massive Roblox script collection built for every gamer.</h1>
          <p>
            Explore verified, keyless, and key-required scripts for trending Roblox experiences.
            Browse curated categories, executor compatibility, favorites, and power-user tools in one premium hub.
          </p>
          <div class="hero-actions">
            <button class="cta" data-route="#/scripts">Browse Scripts</button>
            <button class="secondary" data-route="#/executors">Executor Directory</button>
          </div>
          <div class="hero-stats">
            <div class="stat-box">
              <strong>${allScripts.length}</strong>
              <span>Scripts</span>
            </div>
            <div class="stat-box">
              <strong>${Object.keys(getCategoryCounts()).length}</strong>
              <span>Categories</span>
            </div>
            <div class="stat-box">
              <strong>12</strong>
              <span>Executors</span>
            </div>
            <div class="stat-box">
              <strong>98%</strong>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Featured Scripts</h2>
          <a href="#/scripts">View all →</a>
        </div>
        <div class="grid-4">
          ${featured.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Recently Added</h2>
          <button class="ghost" data-route="#/scripts">Explore</button>
        </div>
        <div class="grid-5">
          ${recent.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Most Popular</h2>
        </div>
        <div class="grid-4">
          ${popular.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Recently Viewed</h2>
        </div>
        <div class="grid-3">
          ${recentViewed.length ? recentViewed.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No recent scripts yet.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderScriptsPage() {
  const allScripts = getAllScripts();
  const query = (document.getElementById('global-search')?.value || '').trim().toLowerCase();
  let filtered = allScripts.filter((script) => {
    const haystack = [script.title, script.game, script.category, script.status, script.tags.join(' ')].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  const statusFilter = (document.getElementById('script-status')?.value || 'all');
  const categoryFilter = (document.getElementById('script-category')?.value || 'all');
  const sortBy = (document.getElementById('script-sort')?.value || 'popular');

  if (statusFilter !== 'all') filtered = filtered.filter((script) => script.status === statusFilter);
  if (categoryFilter !== 'all') filtered = filtered.filter((script) => script.category === categoryFilter);

  filtered.sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'newest') return new Date(b.added) - new Date(a.added);
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return b.downloads - a.downloads;
  });

  const categoriesHTML = ['all', ...new Set(getAllScripts().map((script) => script.category))]
    .map((category) => `<option value="${safeHtml(category)}">${safeHtml(category === 'all' ? 'All Categories' : category)}</option>`)
    .join('');

  return `
    <div class="page-shell">
      <section class="filter-bar">
        <div class="filter-stack">
          <button class="filter-button active" data-filter="all">All</button>
          <button class="filter-button" data-filter="Verified">Verified</button>
          <button class="filter-button" data-filter="Keyless">Keyless</button>
          <button class="filter-button" data-filter="Key Required">Key Required</button>
        </div>
        <div class="select-wrap">
          <select id="script-category">
            ${categoriesHTML}
          </select>
          <select id="script-status">
            <option value="all">All statuses</option>
            <option value="Verified">Verified</option>
            <option value="Keyless">Keyless</option>
            <option value="Key Required">Key Required</option>
          </select>
          <select id="script-sort">
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="name">Name</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Script Directory</h2>
          <span class="script-meta">${filtered.length} results</span>
        </div>
        <div class="script-grid">
          ${filtered.length ? filtered.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No scripts match this filter.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderCategoriesPage() {
  const counts = getCategoryCounts();
  const entries = Object.entries(counts).map(([category, count]) => ({
    label: category,
    count,
    description: `Curated ${category.toLowerCase()} scripts for high-risk automation, grinding, and progression tools.`,
  }));

  return `
    <div class="page-shell">
      <section>
        <div class="section-header">
          <h2>Categories</h2>
          <span class="script-meta">${entries.length} sections</span>
        </div>
        <div class="grid-3">
          ${entries.map(({ label, count, description }) => `
            <article class="card category-card" data-route="#/scripts" data-category="${safeHtml(label)}">
              <div class="category-count">${count} scripts</div>
              <h3>${safeHtml(label)}</h3>
              <p>${safeHtml(description)}</p>
              <button class="secondary" data-route="#/scripts" data-category="${safeHtml(label)}">Explore</button>
            </article>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderExecutorsPage() {
  return `
    <div class="page-shell">
      <section>
        <div class="section-header">
          <h2>Executor Directory</h2>
          <span class="script-meta">Compatibility & support guide</span>
        </div>
        <div class="grid-3">
          ${executorPlatforms.map((executor) => `
            <article class="card executor-card">
              <div class="executor-header">
                <h3>${safeHtml(executor.name)}</h3>
                <span class="executor-rating">★ ${executor.rating}</span>
              </div>
              <p>${safeHtml(executor.desc)}</p>
              <div class="executor-tags">
                ${executor.platforms.map((platform) => `<span>${safeHtml(platform)}</span>`).join('')}
              </div>
              <div class="meta-grid" style="margin-top: 14px;">
                <div class="meta-box">
                  <span>Type</span>
                  <strong>${safeHtml(executor.type)}</strong>
                </div>
                <div class="meta-box">
                  <span>Compat</span>
                  <strong>${safeHtml(executor.compatibility.slice(0, 2).join(', '))}</strong>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderFavoritesPage() {
  const favorites = state.favorites.map((id) => getAllScripts().find((script) => script.id === id)).filter(Boolean);
  return `
    <div class="page-shell">
      <section>
        <div class="section-header">
          <h2>Favorite Scripts</h2>
          <span class="script-meta">${favorites.length} saved</span>
        </div>
        <div class="script-grid">
          ${favorites.length ? favorites.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No favorites yet. Save scripts to build your shortlist.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderProfilePage() {
  const savedCount = state.saved.length;
  const favoriteCount = state.favorites.length;
  const recentScripts = state.recent.map((slug) => getScriptBySlug(slug)).filter(Boolean).slice(0, 3);

  return `
    <div class="page-shell">
      <div class="profile-grid">
        <section class="profile-card">
          <div class="profile-head">
            <div class="profile-avatar">V</div>
            <div>
              <h2 style="margin:0;">Vlr</h2>
              <small class="script-meta">Premium Member</small>
            </div>
          </div>
          <div class="meta-grid">
            <div class="meta-box">
              <span>Favorites</span>
              <strong>${favoriteCount}</strong>
            </div>
            <div class="meta-box">
              <span>Saved</span>
              <strong>${savedCount}</strong>
            </div>
            <div class="meta-box">
              <span>Level</span>
              <strong>Gold</strong>
            </div>
            <div class="meta-box">
              <span>Region</span>
              <strong>Global</strong>
            </div>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <h2>Recently Viewed</h2>
          </div>
          <div class="grid-2">
            ${recentScripts.length ? recentScripts.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">Visit scripts to populate your history.</div>'}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderSettingsPage() {
  const currentTheme = state.settings.theme || 'black';
  const currentAccent = state.settings.accent || '#8b5cf6';

  return `
    <div class="page-shell">
      <div class="settings-grid">
        <section class="setting-box">
          <div class="section-header">
            <h2>Appearance</h2>
          </div>
          <div class="theme-picker">
            ${THEME_ORDER.map((theme) => `
              <button class="theme-swatch ${theme} ${currentTheme === theme ? 'active' : ''}" data-theme-option="${theme}">${theme}</button>
            `).join('')}
          </div>
          <div style="margin-top: 18px;">
            <label class="script-meta">Mode</label>
            <div class="filter-stack" style="margin-top: 8px;">
              <button class="filter-button ${state.settings.mode === 'dark' ? 'active' : ''}" data-mode-option="dark">Dark</button>
              <button class="filter-button ${state.settings.mode === 'light' ? 'active' : ''}" data-mode-option="light">Light</button>
            </div>
          </div>
        </section>

        <section class="setting-box">
          <div class="section-header">
            <h2>Accent Color</h2>
          </div>
          <div class="accent-row">
            ${ACCENT_PALETTE.map((color) => `
              <button class="accent-choice ${currentAccent === color ? 'active' : ''}" data-accent-option="${color}" style="background:${color};"></button>
            `).join('')}
          </div>
          <div style="margin-top: 18px;">
            <button class="cta" id="save-settings">Save Preferences</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderDashboardPage() {
  const total = getAllScripts().length;

  return `
    <div class="page-shell">
      <div class="profile-grid">
        <section class="profile-card">
          <div class="section-header">
            <h2>Admin Dashboard</h2>
          </div>
          <div class="meta-grid">
            <div class="meta-box">
              <span>Total Scripts</span>
              <strong>${total}</strong>
            </div>
            <div class="meta-box">
              <span>Categories</span>
              <strong>${Object.keys(getCategoryCounts()).length}</strong>
            </div>
            <div class="meta-box">
              <span>Pending Reviews</span>
              <strong>12</strong>
            </div>
            <div class="meta-box">
              <span>Published</span>
              <strong>96%</strong>
            </div>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <h2>Add New Script</h2>
          </div>
          <form id="new-script-form" class="form-grid">
            <div class="form-row">
              <label>Title</label>
              <input type="text" name="title" required placeholder="Example: Auto Quest | Blox Fruits" />
            </div>
            <div class="form-row">
              <label>Game</label>
              <input type="text" name="game" required placeholder="Blox Fruits" />
            </div>
            <div class="form-row">
              <label>Category</label>
              <select name="category">
                ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
              </select>
            </div>
            <div class="form-row">
              <label>Status</label>
              <select name="status">
                <option value="Verified">Verified</option>
                <option value="Keyless">Keyless</option>
                <option value="Key Required">Key Required</option>
              </select>
            </div>
            <button type="submit" class="cta">Publish Script</button>
          </form>
        </section>
      </div>
    </div>
  `;
}

function renderScriptDetailPage(slug) {
  const script = getScriptBySlug(slug);
  if (!script) {
    return `<div class="empty-state">This script could not be found.</div>`;
  }

  const similar = getAllScripts().filter((item) => item.category === script.category && item.id !== script.id).slice(0, 3);
  addRecentView(slug);

  return `
    <div class="page-shell">
      <section class="detail-layout">
        <div class="detail-panel">
          <div class="detail-hero">
            <div>
              <div class="badge-row">
                <span class="badge ${script.status.toLowerCase().replace(/\s+/g, '-')}">${script.status}</span>
                <span class="badge new">${script.version}</span>
              </div>
              <h1>${safeHtml(script.title)}</h1>
            </div>
            <div class="script-actions">
              <button class="inline-button" data-action="favorite" data-script-id="${script.id}">${state.favorites.includes(script.id) ? '★ Favorite' : '☆ Favorite'}</button>
              <button class="inline-button" data-action="copy" data-script-id="${script.id}">Copy Script</button>
            </div>
          </div>

          <div class="detail-body">
            <p>${safeHtml(script.description)}</p>
            <div class="label-row" style="margin-top: 12px;">
              ${script.tags.map((tag) => `<span class="badge" style="background: rgba(148,163,184,0.08); color: var(--text);">${safeHtml(tag)}</span>`).join('')}
            </div>

            <div class="meta-grid">
              <div class="meta-box">
                <span>Game</span>
                <strong>${safeHtml(script.game)}</strong>
              </div>
              <div class="meta-box">
                <span>Category</span>
                <strong>${safeHtml(script.category)}</strong>
              </div>
              <div class="meta-box">
                <span>Downloads</span>
                <strong>${script.downloads.toLocaleString()}</strong>
              </div>
              <div class="meta-box">
                <span>Added</span>
                <strong>${formatDate(script.added)}</strong>
              </div>
            </div>

            <h3 style="margin-top: 22px;">Script Preview</h3>
            <pre class="code-block">${safeHtml(script.code)}</pre>
          </div>
        </div>

        <aside class="side-panel">
          <div class="section-header">
            <h2>Requirements</h2>
          </div>
          <ul>
            ${script.requirements.map((item) => `<li>${safeHtml(item)}</li>`).join('')}
          </ul>

          <div class="section-header" style="margin-top: 20px;">
            <h2>Similar Scripts</h2>
          </div>
          <div class="grid-1">
            ${similar.map((item) => `
              <div class="card" style="padding: 14px; border-radius: 16px;">
                <h4 style="margin:0 0 6px;">${safeHtml(item.title)}</h4>
                <div class="script-meta">${safeHtml(item.game)} • ${safeHtml(item.category)}</div>
                <button class="secondary" data-route="#/script/${item.slug}" style="margin-top: 10px;">Open</button>
              </div>
            `).join('')}
          </div>
        </aside>
      </section>
    </div>
  `;
}

function renderCurrentPage() {
  const route = state.currentRoute;
  const app = document.getElementById('app');

  if (route === '#/home' || route === '#' || route === '') {
    app.innerHTML = renderHomePage();
  } else if (route === '#/scripts') {
    app.innerHTML = renderScriptsPage();
  } else if (route === '#/categories') {
    app.innerHTML = renderCategoriesPage();
  } else if (route === '#/executors') {
    app.innerHTML = renderExecutorsPage();
  } else if (route === '#/favorites') {
    app.innerHTML = renderFavoritesPage();
  } else if (route === '#/profile') {
    app.innerHTML = renderProfilePage();
  } else if (route === '#/settings') {
    app.innerHTML = renderSettingsPage();
  } else if (route === '#/dashboard') {
    app.innerHTML = renderDashboardPage();
  } else if (route.startsWith('#/script/')) {
    const slug = route.replace('#/script/', '');
    app.innerHTML = renderScriptDetailPage(slug);
  } else {
    app.innerHTML = renderHomePage();
  }

  document.getElementById('stats-count').textContent = getAllScripts().length;
  document.getElementById('stats-categories').textContent = Object.keys(getCategoryCounts()).length;
  setActiveNav();
  bindDynamicEvents();
  applySearchState();
}

function applySearchState() {
  const field = document.getElementById('global-search');
  if (field && !field.dataset.bound) {
    field.value = '';
    field.dataset.bound = 'true';
  }
}

function bindDynamicEvents() {
  const routeButtons = document.querySelectorAll('[data-route]');
  routeButtons.forEach((button) => {
    button.onclick = () => {
      const route = button.dataset.route;
      if (route) {
        navigate(route);
      }
    };
  });

  document.querySelectorAll('[data-action="favorite"]').forEach((button) => {
    button.onclick = () => toggleFavorite(button.dataset.scriptId);
  });

  document.querySelectorAll('[data-action="save"]').forEach((button) => {
    button.onclick = () => toggleSaved(button.dataset.scriptId);
  });

  document.querySelectorAll('[data-action="copy"]').forEach((button) => {
    button.onclick = () => copyScriptById(button.dataset.scriptId);
  });

  document.querySelectorAll('[data-action="view"]').forEach((button) => {
    button.onclick = () => {
      const script = getAllScripts().find((item) => item.id === button.dataset.scriptId);
      if (script) navigate(`#/script/${script.slug}`);
    };
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.onclick = () => {
      const filter = button.dataset.filter;
      document.getElementById('script-status')?.setAttribute('data-status-filter', filter);
      if (document.getElementById('script-status')) {
        document.getElementById('script-status').value = filter === 'all' ? 'all' : filter;
      }
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
      renderCurrentPage();
    };
  });

  document.getElementById('global-search')?.addEventListener('input', (event) => {
    const query = event.target.value;
    const current = state.currentRoute;
    if (query.trim()) {
      state.currentRoute = '#/scripts';
      renderCurrentPage();
      const field = document.getElementById('global-search');
      if (field) field.value = query;
      return;
    }
    state.currentRoute = current || '#/home';
    renderCurrentPage();
  });

  document.getElementById('script-sort')?.addEventListener('change', renderCurrentPage);
  document.getElementById('script-status')?.addEventListener('change', renderCurrentPage);
  document.getElementById('script-category')?.addEventListener('change', renderCurrentPage);

  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    button.onclick = () => {
      state.settings.theme = button.dataset.themeOption;
      applyPreferences();
      renderCurrentPage();
    };
  });

  document.querySelectorAll('[data-mode-option]').forEach((button) => {
    button.onclick = () => {
      state.settings.mode = button.dataset.modeOption;
      applyPreferences();
      renderCurrentPage();
    };
  });

  document.querySelectorAll('[data-accent-option]').forEach((button) => {
    button.onclick = () => {
      state.settings.accent = button.dataset.accentOption;
      applyPreferences();
      renderCurrentPage();
    };
  });

  document.getElementById('save-settings')?.addEventListener('click', () => {
    applyPreferences();
    showToast('Preferences saved successfully.');
  });

  document.getElementById('new-script-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title').toString().trim();
    const game = formData.get('game').toString().trim();
    const category = formData.get('category');
    const status = formData.get('status');

    if (!title || !game) return;

    const newScript = {
      id: `custom-${Date.now()}`,
      slug: slugify(`${title}-${game}-${Date.now()}`),
      title,
      game,
      category,
      status,
      tags: [category, game, status.toLowerCase(), 'custom'],
      likes: 1200 + Math.floor(Math.random() * 3000),
      featured: false,
      isNew: true,
      added: new Date().toISOString(),
      description: `Custom script entry for ${game} with ${status.toLowerCase()} compatibility and live performance tweaks.`,
      requirements: ['Executor', 'Latest Roblox build', 'Updated UI'],
      platform: executorNames[Math.floor(Math.random() * executorNames.length)],
      code: buildScriptCode(title, status, category),
      version: 'v1.0',
      downloads: 1100 + Math.floor(Math.random() * 3000),
    };

    state.customScripts.push(newScript);
    saveToStorage(STORAGE_KEYS.customScripts, state.customScripts);
    event.target.reset();
    showToast('New script published to your dashboard.');
    renderCurrentPage();
  });

  document.getElementById('new-notice-btn')?.addEventListener('click', () => {
    showToast('New scripts have been added to the directory.');
    navigate('#/scripts');
  });

  document.querySelectorAll('[data-category]').forEach((button) => {
    button.onclick = () => {
      const category = button.dataset.category;
      navigate('#/scripts');
      setTimeout(() => {
        const select = document.getElementById('script-category');
        if (select) {
          select.value = category;
          renderCurrentPage();
        }
      }, 40);
    };
  });
}

function toggleFavorite(scriptId) {
  if (!scriptId) return;
  const exists = state.favorites.includes(scriptId);
  state.favorites = exists ? state.favorites.filter((item) => item !== scriptId) : [...state.favorites, scriptId];
  saveToStorage(STORAGE_KEYS.favorites, state.favorites);
  showToast(exists ? 'Removed from favorites.' : 'Added to favorites.');
  renderCurrentPage();
}

function toggleSaved(scriptId) {
  if (!scriptId) return;
  const exists = state.saved.includes(scriptId);
  state.saved = exists ? state.saved.filter((item) => item !== scriptId) : [...state.saved, scriptId];
  saveToStorage(STORAGE_KEYS.saved, state.saved);
  showToast(exists ? 'Removed from saved list.' : 'Saved to your collection.');
  renderCurrentPage();
}

function addRecentView(slug) {
  if (!slug) return;
  state.recent = [slug, ...state.recent.filter((item) => item !== slug)].slice(0, 6);
  saveToStorage(STORAGE_KEYS.recent, state.recent);
}

function copyScriptById(scriptId) {
  const script = getAllScripts().find((item) => item.id === scriptId);
  if (!script) return;
  navigator.clipboard.writeText(script.code).then(() => {
    showToast('Script copied to clipboard.');
  }).catch(() => {
    const temp = document.createElement('textarea');
    temp.value = script.code;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
    showToast('Script copied to clipboard.');
  });
}

function applyPreferences() {
  saveToStorage(STORAGE_KEYS.settings, state.settings);
  initializeTheme();
}

function navigate(route) {
  state.currentRoute = route;
  window.location.hash = route;
  renderCurrentPage();
}

function onRouteChange() {
  const hash = window.location.hash || '#/home';
  state.currentRoute = hash;
  renderCurrentPage();
}

window.addEventListener('hashchange', onRouteChange);
window.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.style.display = 'none';
  }, 600);
  onRouteChange();
});

const globalSearch = document.getElementById('global-search');
if (globalSearch) {
  globalSearch.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      navigate('#/home');
      return;
    }
    state.currentRoute = '#/scripts';
    renderCurrentPage();
    const scriptFilter = document.getElementById('script-category');
    if (scriptFilter) scriptFilter.value = 'all';
    const statusSelect = document.getElementById('script-status');
    if (statusSelect) statusSelect.value = 'all';
    const searchBox = document.getElementById('global-search');
    if (searchBox) {
      searchBox.value = query;
    }
  });
}

initializeTheme();
renderCurrentPage();
