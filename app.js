
// ------------------------------
// Premium CV Pack v2.2 — app.js
// ------------------------------

// Sample data
const sampleData = {
  name: "Alexandra Khan",
  headline: "Senior Frontend Engineer · React / TypeScript · UI Systems",
  location: "Karachi, PK",
  email: "alex@example.com",
  phone: "+92 300 111 2223",
  website: "https://alex.dev",
  linkedin: "https://linkedin.com/in/alex",
  photo: "", // optional header photo (for theme-photo)
  avatar: "", // optional avatar image
  colors: { accent: "#2563eb", text: "#111827", bg1: "#eef2ff", bg2: "#e0f2fe" },
  summary: "Frontend lead with 7+ years building accessible, high‑performance design systems and B2B dashboards. Led UI for products used by 1M+ users. Passionate about DX, a11y, and meticulous UI polish.",
  skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind/SCSS", "Highcharts", "Playwright", "Jest", "a11y", "i18n"],
  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "Nimbus Cloud",
      location: "Remote",
      start: "2022",
      end: "Present",
      bullets: [
        "Led rebuild of analytics suite → p95 latency −48%",
        "Built design tokens pipeline and Storybook for 50+ components",
        "Mentored 4 engineers; introduced visual regression tests"
      ]
    },
    {
      role: "Frontend Engineer",
      company: "Orbital",
      location: "Karachi",
      start: "2019",
      end: "2022",
      bullets: [
        "Delivered B2B dashboard used by 10k+ merchants",
        "Migrated legacy jQuery to React; reduced bundle 35%",
        "Drove accessibility audit to WCAG AA"
      ]
    }
  ],
  projects: [
    { name: "UI System Kit", link: "https://uikit.dev", summary: "Open-source design system with theming and tokens." },
    { name: "ChartLab", link: "https://chartlab.dev", summary: "High-performance chart presets for SaaS dashboards." }
  ],
  education: [
    { degree: "BS, Computer Science", org: "NED University", year: "2018" }
  ],
  certs: ["AWS Cloud Practitioner", "Google UX Design"]
};

let state = JSON.parse(localStorage.getItem('cv_state_v2_2') || 'null') || sampleData;

// Elements
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const themeSel = $('#themeSel');
const copyHint = $('#copyHint');

// Color inputs
const colorInputs = {
  accent: $('#color-accent'),
  text: $('#color-text'),
  bg1: $('#color-bg1'),
  bg2: $('#color-bg2'),
};

// Preview elements
const nameView = $('#nameView');
const headlineView = $('#headlineView');
const emailView = $('#emailView');
const phoneView = $('#phoneView');
const locationView = $('#locationView');
const websiteView = $('#websiteView');
const linkedinView = $('#linkedinView');
const summaryView = $('#summaryView');
const skillsView = $('#skillsView');
const experienceView = $('#experienceView');
const projectsView = $('#projectsView');
const educationView = $('#educationView');
const certsView = $('#certsView');
const avatarImg = $('#avatar');
const resumeRoot = $('#resumeRoot');
const page = $('#page');

// Form inputs
const inp = {
  name: $('#inp-name'),
  headline: $('#inp-headline'),
  email: $('#inp-email'),
  phone: $('#inp-phone'),
  location: $('#inp-location'),
  website: $('#inp-website'),
  linkedin: $('#inp-linkedin'),
  summary: $('#inp-summary'),
  skills: $('#inp-skills'),
  certs: $('#inp-certs'),
  photo: $('#inp-photo')
};

// Dynamic lists containers
const expList = $('#expList');
const projList = $('#projList');
const eduList = $('#eduList');

// Suggested palettes (good contrast)
const palettes = [
  { name:'Sapphire',    accent:'#2563eb', text:'#0f172a', bg1:'#eef2ff', bg2:'#e0f2fe' },
  { name:'Emerald',     accent:'#10b981', text:'#0b1220', bg1:'#ecfdf5', bg2:'#d1fae5' },
  { name:'Royal Purple',accent:'#7c3aed', text:'#111827', bg1:'#ede9fe', bg2:'#e9d5ff' },
  { name:'Coral Rose',  accent:'#f43f5e', text:'#111827', bg1:'#ffe4e6', bg2:'#ffe4e6' },
  { name:'Amber',       accent:'#f59e0b', text:'#111827', bg1:'#fff7ed', bg2:'#ffedd5' },
  { name:'Slate',       accent:'#334155', text:'#0f172a', bg1:'#f1f5f9', bg2:'#e2e8f0' },
  { name:'Ocean',       accent:'#0ea5e9', text:'#0b1220', bg1:'#e0f2fe', bg2:'#cffafe' },
  { name:'Magenta',     accent:'#ec4899', text:'#0b1220', bg1:'#ffe4e6', bg2:'#fdf2f8' },
  { name:'Indigo',      accent:'#4f46e5', text:'#0f172a', bg1:'#eef2ff', bg2:'#e0e7ff' },
  { name:'Forest',      accent:'#166534', text:'#0b1220', bg1:'#ecfdf5', bg2:'#dcfce7' },
];

function makePaletteCard(p){
  const card = document.createElement('div');
  card.className = 'palette';
  const sw1 = document.createElement('div'); sw1.className = 'sw'; sw1.style.background = p.accent;
  const sw2 = document.createElement('div'); sw2.className = 'sw'; sw2.style.background = p.text;
  const sw3 = document.createElement('div'); sw3.className = 'sw'; sw3.style.background = p.bg1;
  const sw4 = document.createElement('div'); sw4.className = 'sw'; sw4.style.background = p.bg2;
  const name = document.createElement('div'); name.className = 'name'; name.textContent = p.name;
  card.append(sw1, sw2, sw3, sw4, name);
  card.addEventListener('click', () => {
    state.colors = { accent:p.accent, text:p.text, bg1:p.bg1, bg2:p.bg2 };
    applyColors();
    renderAll();
    // reflect in inputs
    colorInputs.accent.value = p.accent;
    colorInputs.text.value = p.text;
    colorInputs.bg1.value = p.bg1;
    colorInputs.bg2.value = p.bg2;
    showToast(`${p.name} palette applied`);
  });
  return card;
}

function renderPalettes(){
  const list = $('#paletteList');
  list.innerHTML = '';
  palettes.forEach(p => list.appendChild(makePaletteCard(p)));
}

// Apply CSS variables for color customization
function applyColors(){
  const { accent, text, bg1, bg2 } = state.colors || {};
  resumeRoot.style.setProperty('--accent', accent || '#2563eb');
  resumeRoot.style.setProperty('--accent-2', text || '#111827');
  resumeRoot.style.setProperty('--chip-bg', (accent ? hexToTint(accent, 0.8) : '#eef2ff'));
  resumeRoot.style.setProperty('--chip-text', (accent ? accent : '#3730a3'));
  resumeRoot.style.setProperty('--bg1', bg1 || '#eef2ff');
  resumeRoot.style.setProperty('--bg2', bg2 || '#e0f2fe');
}

// Utility: tint color (simple mix with white)
function hexToTint(hex, ratio=0.8){
  const c = hex.replace('#','');
  const n = parseInt(c, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mix = (ch)=> Math.round(ch + (255 - ch) * ratio);
  const rr = mix(r), gg = mix(g), bb = mix(b);
  return '#' + [rr,gg,bb].map(v => v.toString(16).padStart(2,'0')).join('');
}

function renderBadges(list){
  skillsView.innerHTML = '';
  (list || []).forEach(sk => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = sk;
    skillsView.appendChild(span);
  });
}

function renderList(list){
  const ul = document.createElement('ul');
  (list || []).forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    ul.appendChild(li);
  });
  return ul;
}

function renderExperience(items){
  experienceView.innerHTML = '';
  (items || []).forEach(j => {
    const top = document.createElement('div');
    top.className = 'top avoid-break';
    const role = document.createElement('div');
    role.className = 'role';
    role.textContent = `${j.role} · ${j.company}`;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${j.location ? j.location + ' · ' : ''}${j.start} – ${j.end}`;
    top.append(role, meta);
    const item = document.createElement('div');
    item.className = 'item avoid-break';
    item.append(top, renderList(j.bullets));
    experienceView.appendChild(item);
  });
}

function renderProjects(items){
  projectsView.innerHTML = '';
  (items || []).forEach(p => {
    const wrap = document.createElement('div');
    wrap.className = 'item avoid-break';
    const top = document.createElement('div');
    top.className = 'top';
    const role = document.createElement('div');
    role.className = 'role';
    if (p.link) {
      const a = document.createElement('a');
      a.href = p.link; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = p.name;
      role.appendChild(a);
    } else {
      role.textContent = p.name;
    }
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = '';
    top.append(role, meta);
    const desc = document.createElement('div'); desc.className = 'muted'; desc.textContent = p.summary || '';
    wrap.append(top, desc);
    projectsView.appendChild(wrap);
  });
}

function renderEducation(items){
  educationView.innerHTML = '';
  (items || []).forEach(e => {
    const wrap = document.createElement('div');
    wrap.className = 'item avoid-break';
    const top = document.createElement('div');
    top.className = 'top';
    const role = document.createElement('div');
    role.className = 'role'; role.textContent = e.degree || '';
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = e.year || '';
    top.append(role, meta);
    const org = document.createElement('div'); org.className = 'muted'; org.textContent = e.org || '';
    wrap.append(top, org);
    educationView.appendChild(wrap);
  });
}

function renderCerts(items){
  certsView.innerHTML = '';
  (items || []).forEach(c => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = c;
    certsView.appendChild(span);
  });
}

function renderHeader(){
  nameView.textContent = state.name || '';
  headlineView.textContent = state.headline || '';
  emailView.textContent = state.email || '';
  emailView.href = 'mailto:' + (state.email || '');
  phoneView.textContent = state.phone || '';
  phoneView.href = 'tel:' + (state.phone || '').replace(/\s+/g, '');
  locationView.textContent = state.location || '';
  websiteView.textContent = (state.website || '').replace(/^https?:\/\//, '');
  websiteView.href = state.website || '#';
  linkedinView.textContent = (state.linkedin || '').replace(/^https?:\/\//, '');
  linkedinView.href = state.linkedin || '#';

  // Avatar visibility
  if (state.avatar) {
    avatarImg.src = state.avatar;
    avatarImg.style.display = 'block';
  } else {
    avatarImg.style.display = 'none';
  }

  // Photo header background (theme-photo)
  if (resumeRoot.classList.contains('theme-photo')) {
    const url = state.photo ? `url('${state.photo.replace(/'/g,"\\'")}')` : 'none';
    page.style.setProperty('--photo-url', url);
  } else {
    page.style.setProperty('--photo-url', 'none');
  }
}

function renderAll(){
  applyColors();
  renderHeader();
  renderBadges(state.skills || []);
  renderExperience(state.experience || []);
  renderProjects(state.projects || []);
  renderEducation(state.education || []);
  renderCerts(state.certs || []);
  localStorage.setItem('cv_state_v2_2', JSON.stringify(state));
  updateHash();
}

// ------------------------------
// Form bindings
// ------------------------------
function bindBasics(){
  inp.name.value = state.name || '';
  inp.headline.value = state.headline || '';
  inp.email.value = state.email || '';
  inp.phone.value = state.phone || '';
  inp.location.value = state.location || '';
  inp.website.value = state.website || '';
  inp.linkedin.value = state.linkedin || '';
  inp.summary.value = state.summary || '';
  inp.skills.value = (state.skills || []).join(', ');
  inp.certs.value = (state.certs || []).join(', ');
  inp.photo.value = state.photo || '';

  Object.entries(inp).forEach(([key, el]) => {
    el.addEventListener('input', () => {
      if (key === 'skills') state.skills = el.value.split(',').map(s => s.trim()).filter(Boolean);
      else if (key === 'certs') state.certs = el.value.split(',').map(s => s.trim()).filter(Boolean);
      else state[key] = el.value;
      renderAll();
    });
  });

  // Color inputs sync
  colorInputs.accent.value = state.colors?.accent || '#2563eb';
  colorInputs.text.value = state.colors?.text || '#111827';
  colorInputs.bg1.value = state.colors?.bg1 || '#eef2ff';
  colorInputs.bg2.value = state.colors?.bg2 || '#e0f2fe';

  Object.entries(colorInputs).forEach(([k, el]) => {
    el.addEventListener('input', () => {
      if (!state.colors) state.colors = {};
      state.colors[k] = el.value;
      applyColors(); renderAll();
    });
  });

  // Reset colors
  $('#resetColors').addEventListener('click', () => {
    state.colors = { accent: "#2563eb", text: "#111827", bg1: "#eef2ff", bg2: "#e0f2fe" };
    applyColors(); renderAll();
    colorInputs.accent.value = state.colors.accent;
    colorInputs.text.value = state.colors.text;
    colorInputs.bg1.value = state.colors.bg1;
    colorInputs.bg2.value = state.colors.bg2;
    showToast('Colors reset');
  });
}

function makeInput(labelText, value, onChange, placeholder=""){
  const wrap = document.createElement('div');
  wrap.className = 'row inline';
  const label = document.createElement('label');
  label.textContent = labelText;
  const input = document.createElement('input');
  input.value = value || '';
  if (placeholder) input.placeholder = placeholder;
  input.addEventListener('input', () => onChange(input.value));
  wrap.append(label, input);
  return wrap;
}

function makeTextarea(labelText, value, onChange, rows=3){
  const wrap = document.createElement('div');
  wrap.className = 'row';
  const label = document.createElement('label');
  label.textContent = labelText;
  const ta = document.createElement('textarea');
  ta.rows = rows;
  ta.value = value || '';
  ta.addEventListener('input', () => onChange(ta.value));
  wrap.append(label, ta);
  return wrap;
}

function makeRowTwo(a, b){
  const wrap = document.createElement('div');
  wrap.className = 'row two';
  wrap.append(a, b);
  return wrap;
}

function makeRemoveBtn(onClick){
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'btn btn-outline small'; btn.textContent = 'Remove';
  btn.addEventListener('click', onClick);
  return btn;
}

function renderExpForm(){
  expList.innerHTML = '';
  (state.experience || []).forEach((j, idx) => {
    const box = document.createElement('div'); box.className = 'block';

    const role = makeInput('Role', j.role, v => { j.role = v; renderAll(); });
    const company = makeInput('Company', j.company, v => { j.company = v; renderAll(); });
    const loc = makeInput('Location', j.location, v => { j.location = v; renderAll(); });
    const dates = makeRowTwo(
      makeInput('Start', j.start, v => { j.start = v; renderAll(); }),
      makeInput('End', j.end, v => { j.end = v; renderAll(); })
    );
    const bullets = makeTextarea('Bullets (one per line)', (j.bullets || []).join('\n'), v => { j.bullets = v.split('\n').map(s=>s.trim()).filter(Boolean); renderAll(); }, 3);

    const remove = makeRemoveBtn(() => { state.experience.splice(idx,1); renderExpForm(); renderAll(); });

    box.append(role, company, loc, dates, bullets, remove);
    expList.appendChild(box);
  });
}

function renderProjForm(){
  projList.innerHTML = '';
  (state.projects || []).forEach((p, idx) => {
    const box = document.createElement('div'); box.className = 'block';
    const name = makeInput('Name', p.name, v => { p.name = v; renderAll(); });
    const link = makeInput('Link', p.link, v => { p.link = v; renderAll(); }, 'https://...');
    const summary = makeTextarea('Summary', p.summary, v => { p.summary = v; renderAll(); }, 2);
    const remove = makeRemoveBtn(() => { state.projects.splice(idx,1); renderProjForm(); renderAll(); });
    box.append(name, link, summary, remove);
    projList.appendChild(box);
  });
}

function renderEduForm(){
  eduList.innerHTML = '';
  (state.education || []).forEach((e, idx) => {
    const box = document.createElement('div'); box.className = 'block';
    const degree = makeInput('Degree', e.degree, v => { e.degree = v; renderAll(); });
    const org = makeInput('Institution', e.org, v => { e.org = v; renderAll(); });
    const year = makeInput('Year', e.year, v => { e.year = v; renderAll(); });
    const remove = makeRemoveBtn(() => { state.education.splice(idx,1); renderEduForm(); renderAll(); });
    box.append(degree, org, year, remove);
    eduList.appendChild(box);
  });
}

$('#addExp').addEventListener('click', () => {
  state.experience.push({ role:"", company:"", location:"", start:"", end:"", bullets:[] });
  renderExpForm(); renderAll();
});
$('#addProj').addEventListener('click', () => {
  state.projects.push({ name:"", link:"", summary:"" });
  renderProjForm(); renderAll();
});
$('#addEdu').addEventListener('click', () => {
  state.education.push({ degree:"", org:"", year:"" });
  renderEduForm(); renderAll();
});

// ------------------------------
// Theme handling (16 themes)
// ------------------------------
const themes = [
  'theme-modern','theme-serif','theme-mono','theme-compact','theme-grid','theme-card',
  'theme-blue','theme-sidebar','theme-banner','theme-timeline','theme-pastel',
  'theme-glass','theme-geo','theme-wave','theme-photo','theme-shapes','theme-dark'
];

function setTheme(name){
  resumeRoot.className = name;
  // Sidebar variant
  const resume = $('#resume');
  if (name === 'theme-sidebar') resume.classList.add('sidebar'); else resume.classList.remove('sidebar');
  // Photo header shows avatar + header photo background
  if (name === 'theme-photo') {
    avatarImg.style.display = state.avatar ? 'block' : 'none';
  }
  renderAll();
}

themeSel.addEventListener('change', () => {
  setTheme(themeSel.value);
  updateHash();
});

// ------------------------------
// PDF download & share link
// ------------------------------
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return alert(msg);
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 1500);
}

// EXACT REPLACEMENT
async function generatePdf(){
  window.scrollTo(0, 0);
  document.body.classList.add('printing');

  const originalZoom = zoom;
  if (originalZoom !== 1) { zoom = 1; applyZoom(); }

  const opt = {
    margin: 0,
    filename: (state.name || 'resume').toLowerCase().replace(/\s+/g,'-') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3, useCORS: true, letterRendering: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css'], before: '.page-break' }
  };

  await html2pdf().from(page).set(opt).save();

  if (originalZoom !== 1) { zoom = originalZoom; applyZoom(); }
  document.body.classList.remove('printing');
}


$('#downloadPdf').addEventListener('click', async () => {
  if (window.html2pdf) {
    await generatePdf();
  } else {
    window.print();
  }
});

function encodeShare(obj){
  const str = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(str)));
}
function decodeShare(b64){
  try{ return JSON.parse(decodeURIComponent(escape(atob(b64)))); }catch(e){ return null }
}
function updateHash(){
  const data = encodeShare(state);
  const theme = themeSel.value;
  const hash = `#data=${data}&theme=${encodeURIComponent(theme)}`;
  history.replaceState(null, '', hash);
}
async function copyShare(){
  updateHash();
  try{
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(location.href);
    } else {
      const ta = document.createElement('textarea');
      ta.value = location.href; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    copyHint.textContent = 'Share link copied!';
    showToast('Link copied');
    setTimeout(()=> copyHint.textContent='', 1800);
  }catch(e){
    copyHint.textContent = 'Copy failed. Manually copy the URL.'; 
    showToast('Copy failed'); 
    setTimeout(()=> copyHint.textContent='', 2200);
  }
}
$('#copyShare').addEventListener('click', copyShare);

// Zoom
let zoom = 1;
function applyZoom(){
  const surface = $('#surface');
  surface.style.transform = `scale(${zoom})`;
  surface.style.transformOrigin = 'top center';
  $('#zoomLabel').textContent = Math.round(zoom*100) + '%';
}
$('#zoomIn').addEventListener('click', ()=>{ zoom = Math.min(1.6, zoom + 0.1); applyZoom(); });
$('#zoomOut').addEventListener('click', ()=>{ zoom = Math.max(0.7, zoom - 0.1); applyZoom(); });

// Export JSON
$('#exportJson').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'cv-data.json'; a.click();
  URL.revokeObjectURL(url);
  showToast('JSON exported');
});

// Reset sample
$('#resetData').addEventListener('click', () => {
  state = JSON.parse(JSON.stringify(sampleData));
  bindBasics();
  renderExpForm(); renderProjForm(); renderEduForm();
  renderAll();
  showToast('Sample reloaded');
});

// ------------------------------
// Init (with hash support)
// ------------------------------
function initFromHash(){
  const h = location.hash.replace(/^#/, '');
  if (!h) return;
  const params = new URLSearchParams(h);
  const b64 = params.get('data');
  const th = params.get('theme');
  if (b64) {
    const parsed = decodeShare(b64);
    if (parsed) state = parsed;
  }
  if (th) themeSel.value = th;
}


function bindCollapse(){
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#collapsePanel');
    if (!btn) return;
    e.preventDefault();
    const collapsed = document.body.classList.toggle('panel-collapsed');
    btn.setAttribute('aria-pressed', String(collapsed));
    btn.title = collapsed ? 'Expand panel' : 'Collapse panel';
  });
}

function init(){
  initFromHash();
  bindBasics();
  renderExpForm(); renderProjForm(); renderEduForm();
  setTheme(themeSel.value);
  renderPalettes();
  renderAll();
  applyZoom();
  bindCollapse();

  document.getElementById('copyShare').addEventListener('click', copyShare);
  document.getElementById('downloadPdf').addEventListener('click', async () => {
    if (window.html2pdf) await generatePdf(); else window.print();
  });
}
document.addEventListener('DOMContentLoaded', init);
