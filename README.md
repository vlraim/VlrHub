const STORAGE_KEYS = {
  favorites: 'vlrhub.favorites',
  saved: 'vlrhub.saved',
  recent: 'vlrhub.recent',
  settings: 'vlrhub.settings',
  customScripts: 'vlrhub.customScripts',
};

const THEME_ORDER = ['black', 'purple', 'blue', 'red', 'green'];
const ACCENT_PALETTE = ['#8b5cf6', '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#ec4899'];

const scriptCategories = ['RPG', 'Simulator', 'Tycoon', 'Adventure', 'FPS', 'Obby', 'Combat', 'Anime', 'Horror', 'Pet', 'Vehicle', 'Tower Defense', 'Action', 'Farm', 'PvP'];
const games = ['Blox Fruits', 'Adopt Me!', 'Pet Simulator 99', 'Brookhaven', 'Tower of Hell', 'Arsenal', 'Doors', 'Project Slayers', 'Murder Mystery 2', 'Da Hood', 'A Universal Time', 'Shindo Life', 'Counter Blox', 'King Legacy', 'Weapon Evolution', 'Anime Adventures', 'Bee Swarm Simulator', 'Build a Boat for Treasure', 'Vehicle Simulator', 'Strongest Battlegrounds', 'Apex Legends', 'Blade Ball', 'Blox Piece', 'My Restaurant', 'School Simulator', 'Tapping Legends', 'Ragdoll Simulator', 'Dragon Ball Rage', 'Lumber Tycoon 2', 'Anime Defenders'];
const scriptThemes = ['Auto Farm', 'ESP', 'Aimbot', 'Silent Aim', 'Infinite Jump', 'Fly', 'Combo', 'Auto Catch', 'Auto Quest', 'Kill Aura', 'Mob Farm', 'Dungeon Aura', 'Fast Travel', 'Auto Skill', 'Hitbox', 'Chest Finder', 'Quest Helper', 'Teleport', 'Auto Loot', 'Radar', 'Aura', 'HP Stealer', 'Speed Hack', 'Wallhack', 'Instant Grind', 'Auto Upgrade', 'Item ESP', 'Player Tracker', 'Auto Win', 'Webhook Trigger', 'God Mode', 'Script Hub', 'Unlocker', 'Boost', 'Loot Bot', 'Macro'];

const EXECUTORS = [
  { id: 'krnl', name: 'KRNL', type: 'Windows', rating: 4.9, description: 'High-performance Windows executor with stable injection and a wide compatibility range.', platforms: ['Windows', 'Mac'], compatibility: ['Blox Fruits', 'Arsenal', 'Doors'], status: 'Highly Stable' },
  { id: 'fluxus', name: 'Fluxus', type: 'Windows', rating: 4.8, description: 'Lightweight executor designed for smooth performance and frequent script compatibility updates.', platforms: ['Windows', 'Android'], compatibility: ['Adopt Me!', 'Pet Simulator 99', 'Tower of Hell'], status: 'Popular' },
  { id: 'delta', name: 'Delta', type: 'Android', rating: 4.7, description: 'Android-first executor with a clean UI and broad script support on mobile.', platforms: ['Android'], compatibility: ['Anime Adventures', 'Blox Fruits', 'Vehicle Simulator'], status: 'Mobile Ready' },
  { id: 'synapse-x', name: 'Synapse X', type: 'Windows', rating: 4.9, description: 'Premium executor with advanced script execution, stable hooks, and a polished environment.', platforms: ['Windows'], compatibility: ['Doors', 'Apex Legends', 'Arsenal'], status: 'Premium' },
  { id: 'arceus-x', name: 'Arceus X', type: 'Android', rating: 4.8, description: 'Mobile focused executor for lightweight scripts and broad community support.', platforms: ['Android', 'iOS'], compatibility: ['Pet Simulator 99', 'Blox Fruits', 'Tower of Hell'], status: 'Mobile' },
  { id: 'scriptware', name: 'ScriptWare', type: 'Windows', rating: 4.6, description: 'Flexible, API-rich executor for users who want advanced compatibility and deep customization.', platforms: ['Windows', 'Linux'], compatibility: ['Combat Games', 'Obbies', 'Anime Worlds'], status: 'Advanced' },
  { id: 'wave', name: 'Wave', type: 'Windows', rating: 4.5, description: 'Modern executor with a strong emphasis on script reliability and clean workflow.', platforms: ['Windows'], compatibility: ['Anime Defenders', 'Blox Piece', 'King Legacy'], status: 'Reliable' },
  { id: 'hydrogen', name: 'Hydrogen', type: 'Windows', rating: 4.4, description: 'Efficient executor for faster script execution and smooth performance across mid-tier games.', platforms: ['Windows'], compatibility: ['My Restaurant', 'School Simulator', 'Ragdoll Simulator'], status: 'Fast' },
  { id: 'comet', name: 'Comet', type: 'Windows', rating: 4.3, description: 'Community favorite for responsive execution and good script compatibility.', platforms: ['Windows'], compatibility: ['A Universal Time', 'Shindo Life', 'Da Hood'], status: 'Community' },
  { id: 'nexus', name: 'Nexus', type: 'Android', rating: 4.2, description: 'Cleaner mobile execution interface with broad compatibility and simpler setup.', platforms: ['Android'], compatibility: ['Pet Simulator 99', 'Anime Adventures', 'Vampire Hunters'], status: 'Mobile' },
  { id: 'jjsploit', name: 'JJSploit', type: 'Windows', rating: 4.1, description: 'Classic executor known for its simple UX and long-standing community use.', platforms: ['Windows'], compatibility: ['Obbies', 'Tycoon Games', 'Combat Scripts'], status: 'Classic' },
  { id: 'codex', name: 'CodeX', type: 'Windows', rating: 4.5, description: 'Easy-to-use executor with stable support for common scripts and active community guides.', platforms: ['Windows'], compatibility: ['Murder Mystery 2', 'Blade Ball', 'Blox Fruits'], status: 'Accessible' }
];

const state = {
  currentRoute: '#/home',
  favorites: loadArray(STORAGE_KEYS.favorites),
  saved: loadArray(STORAGE_KEYS.saved),
  recent: loadArray(STORAGE_KEYS.recent),
  settings: loadObject(STORAGE_KEYS.settings, { theme: 'black', mode: 'dark', accent: '#8b5cf6' }),
  customScripts: loadArray(STORAGE_KEYS.customScripts),
};

const defaultScripts = generateScriptDatabase(200);

function generateScriptDatabase(count) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    const game = games[i % games.length];
    const category = scriptCategories[i % scriptCategories.length];
    const statusSet = ['Verified', 'Keyless', 'Key Required'];
    const status = statusSet[i % statusSet.length];
    const titleTheme = scriptThemes[i % scriptThemes.length];
    const title = `${titleTheme} | ${game}`;
    const creator = ['Vex', 'Nexa', 'Jr', 'Kiro', 'Astra', 'Rift'][i % 6];
    const statusLabel = status.toLowerCase().replace(/\s+/g, '-');
    const scriptString = buildScriptLoadstring({ title, status, category, game, creator });
    const slug = slugify(`${title}-${i + 1}`);

    items.push({
      id: `script-${i + 1}`,
      slug,
      title,
      game,
      category,
      status,
      creator,
      description: `Premium ${status.toLowerCase()} script optimized for ${game}. Includes fast automation, live compatibility checks, secure triggers, and a smooth user setup for players who want quick results without clutter.`,
      tags: [category, game, status, 'roblox', 'premium'],
      likes: 640 + ((i * 31) % 4200),
      downloads: 1200 + i * 17,
      featured: i < 6,
      isNew: i < 12,
      added: new Date(Date.now() - i * 5.5 * 24 * 60 * 60 * 1000).toISOString(),
      version: `v${(i % 9) + 2}.${(i % 7) + 1}`,
      loadstring: scriptString,
      compatibility: [game, category, 'Roblox', 'Executor Required'],
      requirements: status === 'Key Required' ? ['Key access', 'Executor', 'Latest Roblox build'] : ['Executor', 'Latest Roblox build', 'Internet access'],
      platform: EXECUTORS[i % EXECUTORS.length].name,
      badges: [status, i < 12 ? 'NEW' : ''],
      statusClass: statusLabel,
    });
  }
  return items;
}

function buildScriptLoadstring({ title, status, category, game, creator }) {
  const cleanTitle = title.split('|')[0].trim();
  return `-- ${cleanTitle}\n-- Game: ${game}\n-- Category: ${category}\n-- Status: ${status}\n-- Creator: ${creator}\n\nlocal Players = game:GetService("Players")\nlocal LocalPlayer = Players.LocalPlayer\nlocal Workspace = game:GetService("Workspace")\n\nlocal config = {\n    enabled = true,\n    speed = 1.5,\n    autoFarm = true,\n    targetGame = "${game}",\n    safeMode = true\n}\n\nif config.enabled then\n    print("[VlrHub] " .. "${cleanTitle}" .. " loaded successfully.")\n\n    local function boostCharacter()\n        if LocalPlayer and LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("Humanoid") then\n            LocalPlayer.Character.Humanoid.WalkSpeed = 18 + config.speed\n        end\n    end\n\n    task.spawn(function()\n        while config.enabled do\n            boostCharacter()\n            task.wait(0.15)\n        end\n    end)\nend\n`;
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
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function safeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getAllScripts() {
  return [...defaultScripts, ...state.customScripts];
}

function getScriptBySlug(slug) {
  return getAllScripts().find((script) => script.slug === slug);
}

function getCategoryCounts() {
  const counts = {};
  getAllScripts().forEach((script) => {
    counts[script.category] = (counts[script.category] || 0) + 1;
  });
  return counts;
}

function getFeaturedScripts() {
  return getAllScripts().filter((script) => script.featured).slice(0, 4);
}

function getMostPopularScripts() {
  return [...getAllScripts()].sort((a, b) => b.likes - a.likes).slice(0, 4);
}

function getRecentlyAdded() {
  return [...getAllScripts()].sort((a, b) => new Date(b.added) - new Date(a.added)).slice(0, 5);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function initializeTheme() {
  document.body.dataset.theme = state.settings.theme || 'black';
  document.body.dataset.mode = state.settings.mode || 'dark';
  document.documentElement.style.setProperty('--accent', state.settings.accent || '#8b5cf6');
  document.body.style.setProperty('--accent', state.settings.accent || '#8b5cf6');
  document.body.style.setProperty('--accent-soft', `${state.settings.accent || '#8b5cf6'}22`);
}

function renderScriptCard(script) {
  const isFavorite = state.favorites.includes(script.id);
  const isSaved = state.saved.includes(script.id);

  return `
    <article class="card script-card">
      <div class="card-body">
        <div class="badge-row">
          <span class="badge ${script.statusClass}">${safeHtml(script.status)}</span>
          ${script.isNew ? '<span class="badge badge-new">New</span>' : ''}
          ${script.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
        </div>

        <h3>${safeHtml(script.title)}</h3>

        <div class="meta-row compact-meta">
          <span>${safeHtml(script.game)}</span>
          <span>•</span>
          <span>${safeHtml(script.category)}</span>
        </div>

        <p class="card-copy">${safeHtml(script.description.slice(0, 120))}...</p>

        <div class="tag-row">
          ${script.tags.slice(0, 3).map((tag) => `<span class="tag">${safeHtml(tag)}</span>`).join('')}
        </div>

        <div class="script-footer">
          <div class="script-metric"><strong>${script.likes.toLocaleString()}</strong> likes</div>
          <div class="tiny-actions">
            <button class="tiny-btn" data-action="favorite" data-script-id="${script.id}">${isFavorite ? '★' : '☆'}</button>
            <button class="tiny-btn" data-action="save" data-script-id="${script.id}">${isSaved ? '✓' : 'Save'}</button>
            <button class="tiny-btn primary" data-action="view" data-script-id="${script.id}">Open</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderHomePage() {
  const featured = getFeaturedScripts();
  const recent = getRecentlyAdded();
  const popular = getMostPopularScripts();
  const viewed = state.recent.map((slug) => getScriptBySlug(slug)).filter(Boolean).slice(0, 3);
  const totalScripts = getAllScripts().length;

  return `
    <div class="page-shell">
      <section class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Professional Roblox Script Hub</p>
          <h1>Premium scripts, executors, and tools for every popular Roblox game.</h1>
          <p class="lead">Browse high-performing scripts, keyless and verified options, executor support, and premium tools designed for a faster grind.</p>
          <div class="hero-actions">
            <button class="primary-btn" data-route="#/scripts">Browse scripts</button>
            <button class="secondary-btn" data-route="#/executors">Executor directory</button>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat-box">
            <strong>${totalScripts}</strong>
            <span>Scripts</span>
          </div>
          <div class="stat-box">
            <strong>${Object.keys(getCategoryCounts()).length}</strong>
            <span>Categories</span>
          </div>
          <div class="stat-box">
            <strong>${EXECUTORS.length}</strong>
            <span>Executors</span>
          </div>
          <div class="stat-box">
            <strong>98%</strong>
            <span>Verified</span>
          </div>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Featured Scripts</h2>
          <a href="#/scripts">View all</a>
        </div>
        <div class="script-grid four-col">
          ${featured.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Recently Added</h2>
          <button class="ghost-btn" data-route="#/scripts">Explore</button>
        </div>
        <div class="script-grid five-col">
          ${recent.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Most Popular</h2>
        </div>
        <div class="script-grid four-col">
          ${popular.map((script) => renderScriptCard(script)).join('')}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Recently Viewed</h2>
        </div>
        <div class="script-grid three-col">
          ${viewed.length ? viewed.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No recent script activity yet.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderScriptsPage() {
  const query = (document.getElementById('global-search')?.value || '').trim().toLowerCase();
  let list = [...getAllScripts()];

  if (query) {
    list = list.filter((script) => {
      const haystack = [script.title, script.game, script.category, script.status, script.creator, script.tags.join(' ')].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }

  const statusFilter = document.getElementById('script-status')?.value || 'all';
  const categoryFilter = document.getElementById('script-category')?.value || 'all';
  const sortValue = document.getElementById('script-sort')?.value || 'popular';

  if (statusFilter !== 'all') list = list.filter((script) => script.status === statusFilter);
  if (categoryFilter !== 'all') list = list.filter((script) => script.category === categoryFilter);

  list.sort((a, b) => {
    if (sortValue === 'newest') return new Date(b.added) - new Date(a.added);
    if (sortValue === 'name') return a.title.localeCompare(b.title);
    if (sortValue === 'downloads') return b.downloads - a.downloads;
    return b.likes - a.likes;
  });

  const categoryOptions = ['all', ...new Set(getAllScripts().map((script) => script.category))];

  return `
    <div class="page-shell">
      <section class="toolbar-panel">
        <div class="filter-group compact-filters">
          <button class="filter-chip active" data-filter="all">All</button>
          <button class="filter-chip" data-filter="Verified">Verified</button>
          <button class="filter-chip" data-filter="Keyless">Keyless</button>
          <button class="filter-chip" data-filter="Key Required">Key Required</button>
        </div>

        <div class="toolbar-controls">
          <select id="script-category">
            ${categoryOptions.map((category) => `<option value="${safeHtml(category)}">${category === 'all' ? 'All categories' : safeHtml(category)}</option>`).join('')}
          </select>
          <select id="script-status">
            <option value="all">All statuses</option>
            <option value="Verified">Verified</option>
            <option value="Keyless">Keyless</option>
            <option value="Key Required">Key Required</option>
          </select>
          <select id="script-sort">
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="name">Name</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Script Directory</h2>
          <span class="muted-label">${list.length} results</span>
        </div>
        <div class="script-grid three-col">
          ${list.length ? list.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No scripts matched this filter.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderCategoriesPage() {
  const counts = getCategoryCounts();
  const entries = Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    desc: `Curated ${label.toLowerCase()} scripts designed for progression, grinding, and automation.`
  }));

  return `
    <div class="page-shell">
      <section>
        <div class="section-header">
          <h2>Categories</h2>
          <span class="muted-label">${entries.length} sections</span>
        </div>
        <div class="category-grid">
          ${entries.map(({ label, count, desc }) => `
            <article class="category-card card" data-category="${safeHtml(label)}">
              <div class="pill-tag">${count} scripts</div>
              <h3>${safeHtml(label)}</h3>
              <p>${safeHtml(desc)}</p>
              <button class="secondary-btn small" data-route="#/scripts" data-category="${safeHtml(label)}">Explore</button>
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
      <section class="toolbar-panel executor-toolbar">
        <div class="toolbar-controls full">
          <input id="executor-search" type="text" placeholder="Search executors..." />
          <select id="executor-platform">
            <option value="all">All platforms</option>
            <option value="Windows">Windows</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="Linux">Linux</option>
          </select>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2>Executor Directory</h2>
          <span class="muted-label">Compatibility & support</span>
        </div>
        <div class="executor-grid">
          ${EXECUTORS.map((executor) => `
            <article class="executor-card card">
              <div class="executor-head">
                <div>
                  <div class="mini-pill">${safeHtml(executor.status)}</div>
                  <h3>${safeHtml(executor.name)}</h3>
                </div>
                <span class="rating">★ ${executor.rating}</span>
              </div>

              <p>${safeHtml(executor.description)}</p>

              <div class="executor-tags">
                ${executor.platforms.map((platform) => `<span>${safeHtml(platform)}</span>`).join('')}
              </div>

              <div class="executor-meta">
                <div>
                  <span>Type</span>
                  <strong>${safeHtml(executor.type)}</strong>
                </div>
                <div>
                  <span>Works with</span>
                  <strong>${safeHtml(executor.compatibility.slice(0, 2).join(', '))}</strong>
                </div>
              </div>

              <button class="secondary-btn small" data-route="#/executor/${executor.id}">View details</button>
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
          <h2>Favorites</h2>
          <span class="muted-label">${favorites.length} saved</span>
        </div>
        <div class="script-grid three-col">
          ${favorites.length ? favorites.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">No favorites yet. Save scripts you like and come back here.</div>'}
        </div>
      </section>
    </div>
  `;
}

function renderProfilePage() {
  const recentScripts = state.recent.map((slug) => getScriptBySlug(slug)).filter(Boolean).slice(0, 3);

  return `
    <div class="page-shell">
      <div class="profile-grid">
        <section class="panel-card">
          <div class="profile-header">
            <div class="profile-avatar">V</div>
            <div>
              <h2>Vlr</h2>
              <span class="muted-label">Premium Member</span>
            </div>
          </div>

          <div class="profile-stats">
            <div class="mini-box">
              <span>Favorites</span>
              <strong>${state.favorites.length}</strong>
            </div>
            <div class="mini-box">
              <span>Saved</span>
              <strong>${state.saved.length}</strong>
            </div>
            <div class="mini-box">
              <span>Level</span>
              <strong>Gold</strong>
            </div>
            <div class="mini-box">
              <span>Region</span>
              <strong>Global</strong>
            </div>
          </div>
        </section>

        <section class="panel-card">
          <div class="section-header">
            <h2>Recently Viewed</h2>
          </div>
          <div class="script-grid two-col">
            ${recentScripts.length ? recentScripts.map((script) => renderScriptCard(script)).join('') : '<div class="empty-state">Visit a script to start building your recent history.</div>'}
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
        <section class="panel-card">
          <div class="section-header">
            <h2>Appearance</h2>
          </div>

          <div class="theme-picker">
            ${THEME_ORDER.map((theme) => `<button class="theme-swatch ${theme} ${currentTheme === theme ? 'active' : ''}" data-theme-option="${theme}">${theme}</button>`).join('')}
          </div>

          <div class="mode-selector">
            <span>Mode</span>
            <div class="button-row">
              <button class="filter-chip ${state.settings.mode === 'dark' ? 'active' : ''}" data-mode-option="dark">Dark</button>
              <button class="filter-chip ${state.settings.mode === 'light' ? 'active' : ''}" data-mode-option="light">Light</button>
            </div>
          </div>
        </section>

        <section class="panel-card">
          <div class="section-header">
            <h2>Accent Color</h2>
          </div>

          <div class="accent-row">
            ${ACCENT_PALETTE.map((color) => `<button class="accent-choice ${currentAccent === color ? 'active' : ''}" data-accent-option="${color}" style="background:${color};"></button>`).join('')}
          </div>

          <div class="settings-actions">
            <button class="primary-btn" id="save-settings">Save preferences</button>
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
        <section class="panel-card">
          <div class="section-header">
            <h2>Admin Dashboard</h2>
          </div>
          <div class="profile-stats">
            <div class="mini-box"><span>Scripts</span><strong>${total}</strong></div>
            <div class="mini-box"><span>Categories</span><strong>${Object.keys(getCategoryCounts()).length}</strong></div>
            <div class="mini-box"><span>Pending</span><strong>12</strong></div>
            <div class="mini-box"><span>Published</span><strong>96%</strong></div>
          </div>
        </section>

        <section class="panel-card">
          <div class="section-header">
            <h2>Add New Script</h2>
          </div>

          <form id="new-script-form" class="admin-form">
            <div class="form-row">
              <label>Title</label>
              <input type="text" name="title" placeholder="Example: Auto Quest | Blox Fruits" required />
            </div>
            <div class="form-row">
              <label>Game</label>
              <input type="text" name="game" placeholder="Blox Fruits" required />
            </div>
            <div class="form-row">
              <label>Category</label>
              <select name="category">
                ${scriptCategories.map((category) => `<option value="${category}">${category}</option>`).join('')}
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
            <button class="primary-btn" type="submit">Publish script</button>
          </form>
        </section>
      </div>
    </div>
  `;
}

function renderScriptDetailPage(slug) {
  const script = getScriptBySlug(slug);
  if (!script) {
    return '<div class="empty-state">This script was not found.</div>';
  }

  addRecentView(slug);
  const similar = getAllScripts().filter((item) => item.category === script.category && item.id !== script.id).slice(0, 3);

  return `
    <div class="page-shell">
      <section class="detail-layout">
        <div class="detail-panel panel-card">
          <div class="detail-head">
            <div>
              <div class="badge-row">
                <span class="badge ${script.statusClass}">${safeHtml(script.status)}</span>
                <span class="badge badge-featured">${safeHtml(script.version)}</span>
              </div>
              <h1>${safeHtml(script.title)}</h1>
            </div>
            <div class="detail-actions">
              <button class="tiny-btn action" data-action="favorite" data-script-id="${script.id}">${state.favorites.includes(script.id) ? '★' : '☆'}</button>
              <button class="tiny-btn action primary" data-action="copy" data-script-id="${script.id}">Copy</button>
            </div>
          </div>

          <div class="detail-meta-grid">
            <div class="mini-box">
              <span>Game</span>
              <strong>${safeHtml(script.game)}</strong>
            </div>
            <div class="mini-box">
              <span>Category</span>
              <strong>${safeHtml(script.category)}</strong>
            </div>
            <div class="mini-box">
              <span>Creator</span>
              <strong>${safeHtml(script.creator)}</strong>
            </div>
            <div class="mini-box">
              <span>Downloads</span>
              <strong>${script.downloads.toLocaleString()}</strong>
            </div>
          </div>

          <p class="detail-description">${safeHtml(script.description)}</p>

          <div class="tag-row">
            ${script.tags.map((tag) => `<span class="tag">${safeHtml(tag)}</span>`).join('')}
          </div>

          <div class="code-box">
            <div class="code-head">
              <span>Loadstring</span>
              <button class="tiny-btn primary" data-action="copy" data-script-id="${script.id}">Copy script</button>
            </div>
            <pre>${safeHtml(script.loadstring)}</pre>
          </div>
        </div>

        <aside class="side-panel panel-card">
          <div class="section-header side-header">
            <h2>Requirements</h2>
          </div>
          <ul class="requirement-list">
            ${script.requirements.map((item) => `<li>${safeHtml(item)}</li>`).join('')}
          </ul>

          <div class="section-header side-header">
            <h2>Similar scripts</h2>
          </div>
          <div class="mini-list">
            ${similar.map((item) => `
              <div class="mini-item">
                <div>
                  <strong>${safeHtml(item.title)}</strong>
                  <span>${safeHtml(item.game)}</span>
                </div>
                <button class="secondary-btn small" data-route="#/script/${item.slug}">Open</button>
              </div>
            `).join('')}
          </div>
        </aside>
      </section>
    </div>
  `;
}

function renderExecutorDetailPage(slug) {
  const executor = EXECUTORS.find((item) => item.id === slug);
  if (!executor) return '<div class="empty-state">Executor not found.</div>';

  return `
    <div class="page-shell">
      <section class="detail-layout">
        <div class="detail-panel panel-card">
          <div class="detail-head">
            <div>
              <div class="badge-row">
                <span class="badge badge-featured">${safeHtml(executor.status)}</span>
              </div>
              <h1>${safeHtml(executor.name)}</h1>
            </div>
            <div class="detail-actions">
              <span class="rating large">★ ${executor.rating}</span>
            </div>
          </div>

          <p class="detail-description">${safeHtml(executor.description)}</p>

          <div class="detail-meta-grid">
            <div class="mini-box"><span>Platform</span><strong>${safeHtml(executor.type)}</strong></div>
            <div class="mini-box"><span>Support</span><strong>${safeHtml(executor.platforms.join(', '))}</strong></div>
            <div class="mini-box"><span>Compatibility</span><strong>${safeHtml(executor.compatibility.slice(0, 2).join(', '))}</strong></div>
            <div class="mini-box"><span>Rating</span><strong>${executor.rating}/5</strong></div>
          </div>

          <div class="executor-tags big-tags">
            ${executor.platforms.map((platform) => `<span>${safeHtml(platform)}</span>`).join('')}
          </div>
        </div>

        <aside class="side-panel panel-card">
          <div class="section-header side-header">
            <h2>Compatibility</h2>
          </div>
          <ul class="requirement-list">
            ${executor.compatibility.map((game) => `<li>${safeHtml(game)}</li>`).join('')}
          </ul>
        </aside>
      </section>
    </div>
  `;
}

function renderCurrentPage() {
  const route = state.currentRoute;
  const app = document.getElementById('app');

  if (route === '#/home' || route === '' || route === '#') {
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
  } else if (route.startsWith('#/executor/')) {
    const slug = route.replace('#/executor/', '');
    app.innerHTML = renderExecutorDetailPage(slug);
  } else {
    app.innerHTML = renderHomePage();
  }

  document.getElementById('stats-count').textContent = getAllScripts().length;
  document.getElementById('stats-categories').textContent = Object.keys(getCategoryCounts()).length;
  setActiveNav();
  bindDynamicEvents();
}

function setActiveNav() {
  const buttons = document.querySelectorAll('.nav-link');
  buttons.forEach((button) => button.classList.toggle('active', button.dataset.route === state.currentRoute));
}

function bindDynamicEvents() {
  document.querySelectorAll('[data-route]').forEach((button) => {
    button.onclick = () => {
      const route = button.dataset.route;
      if (route) navigate(route);
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

  document.querySelectorAll('.filter-chip').forEach((button) => {
    button.onclick = () => {
      const filter = button.dataset.filter;
      if (!filter) return;
      document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
      if (document.getElementById('script-status')) {
        document.getElementById('script-status').value = filter === 'all' ? 'all' : filter;
        renderCurrentPage();
      }
    };
  });

  document.getElementById('script-status')?.addEventListener('change', renderCurrentPage);
  document.getElementById('script-category')?.addEventListener('change', renderCurrentPage);
  document.getElementById('script-sort')?.addEventListener('change', renderCurrentPage);
  document.getElementById('executor-search')?.addEventListener('input', () => renderExecutorsLiveFilter());
  document.getElementById('executor-platform')?.addEventListener('change', () => renderExecutorsLiveFilter());

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
    showToast('Preferences updated.');
  });

  document.getElementById('new-script-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title')?.toString().trim();
    const game = formData.get('game')?.toString().trim();
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
      creator: 'You',
      description: `${title} is a custom ${status.toLowerCase()} script for ${game}. It includes reliable automation, compatibility support, and a clean setup optimized for smooth play sessions.`,
      tags: [category, game, status.toLowerCase(), 'custom'],
      likes: 1200 + Math.floor(Math.random() * 4000),
      downloads: 1000 + Math.floor(Math.random() * 3000),
      featured: false,
      isNew: true,
      added: new Date().toISOString(),
      version: 'v1.0',
      loadstring: buildScriptLoadstring({ title, status, category, game, creator: 'You' }),
      compatibility: [game, category, 'Roblox', 'Executor'],
      requirements: ['Executor', 'Latest Roblox build'],
      platform: EXECUTORS[Math.floor(Math.random() * EXECUTORS.length)].name,
      statusClass: status.toLowerCase().replace(/\s+/g, '-'),
    };

    state.customScripts.push(newScript);
    saveToStorage(STORAGE_KEYS.customScripts, state.customScripts);
    event.target.reset();
    showToast('Script published to dashboard.');
    renderCurrentPage();
  });

  document.getElementById('new-notice-btn')?.addEventListener('click', () => {
    navigate('#/scripts');
    showToast('Fresh scripts added.');
  });

  document.querySelectorAll('[data-category]').forEach((element) => {
    element.onclick = (event) => {
      const category = element.dataset.category;
      if (!category) return;
      const target = document.getElementById('script-category');
      navigate('#/scripts');
      setTimeout(() => {
        if (target && target.value !== 'all') {
          target.value = category;
          renderCurrentPage();
        }
      }, 30);
    };
  });

  document.querySelectorAll('[data-route="#/scripts"]').forEach((el) => {
    el.onclick = () => {
      const field = document.getElementById('global-search');
      if (field && field.value) {
        renderCurrentPage();
      }
    };
  });
}

function toggleFavorite(scriptId) {
  if (!scriptId) return;
  const exists = state.favorites.includes(scriptId);
  state.favorites = exists ? state.favorites.filter((id) => id !== scriptId) : [...state.favorites, scriptId];
  saveToStorage(STORAGE_KEYS.favorites, state.favorites);
  showToast(exists ? 'Removed from favorites.' : 'Added to favorites.');
  renderCurrentPage();
}

function toggleSaved(scriptId) {
  if (!scriptId) return;
  const exists = state.saved.includes(scriptId);
  state.saved = exists ? state.saved.filter((id) => id !== scriptId) : [...state.saved, scriptId];
  saveToStorage(STORAGE_KEYS.saved, state.saved);
  showToast(exists ? 'Removed from save list.' : 'Saved to your list.');
  renderCurrentPage();
}

function addRecentView(slug) {
  if (!slug) return;
  state.recent = [slug, ...state.recent.filter((entry) => entry !== slug)].slice(0, 8);
  saveToStorage(STORAGE_KEYS.recent, state.recent);
}

function copyScriptById(scriptId) {
  const script = getAllScripts().find((entry) => entry.id === scriptId);
  if (!script) return;

  const value = script.loadstring || script.code || '';
  navigator.clipboard.writeText(value)
    .then(() => showToast('Script copied.'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('Script copied.');
    });
}

function renderExecutorsLiveFilter() {
  const table = document.getElementById('executor-search');
  const platform = document.getElementById('executor-platform');
  if (!table || !platform) return;

  const query = table.value.trim().toLowerCase();
  const platformValue = platform.value;

  const cards = document.querySelectorAll('.executor-card');
  cards.forEach((card) => {
    const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const text = card.textContent.toLowerCase();
    const matchesQuery = !query || text.includes(query) || name.includes(query);
    const matchesPlatform = platformValue === 'all' || text.includes(platformValue.toLowerCase());
    card.style.display = matchesQuery && matchesPlatform ? '' : 'none';
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

function onHashChange() {
  const hash = window.location.hash || '#/home';
  state.currentRoute = hash;
  renderCurrentPage();
}

window.addEventListener('hashchange', onHashChange);
window.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.style.display = 'none';
  }, 500);
  onHashChange();
});

const field = document.getElementById('global-search');
if (field) {
  field.addEventListener('input', (event) => {
    const value = event.target.value.trim();
    if (!value) {
      navigate('#/home');
      return;
    }
    state.currentRoute = '#/scripts';
    renderCurrentPage();
    field.value = value;
  });
}

initializeTheme();
renderCurrentPage();
