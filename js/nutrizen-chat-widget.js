/**
 * Nutrizen Chat Widget v3
 * CSS: css/widget.css
 * Config: data/bot-config.yaml
 */
(function () {

  const WEBHOOK_URL = document.currentScript?.getAttribute('data-webhook') || '';
  const CONFIG_PATH = '/data/bot-config.yaml';
  const CSS_PATH    = '/css/widget.css';
  const SESSION_KEY = 'nz_chat_v3';

  // Aguacate inteligente SVG
  const ICON_AVOCADO = `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Cuerpo del aguacate -->
    <ellipse cx="28" cy="32" rx="14" ry="17" fill="#5a9e3a"/>
    <ellipse cx="28" cy="30" rx="11" ry="14" fill="#7dc44a"/>
    <!-- Hueso -->
    <ellipse cx="28" cy="35" rx="6" ry="7" fill="#a0522d"/>
    <ellipse cx="28" cy="34" rx="4" ry="5" fill="#c47a3a"/>
    <!-- Parte oscura del aguacate (lado) -->
    <path d="M36 18 Q40 26 40 34 Q40 46 28 49 Q36 46 38 36 Q40 26 36 18Z" fill="#3d7a28" opacity="0.5"/>
    <!-- Cabeza redonda arriba -->
    <ellipse cx="28" cy="18" rx="10" ry="11" fill="#7dc44a"/>
    <ellipse cx="28" cy="17" rx="8" ry="9" fill="#8fd455"/>
    <!-- Ojitos -->
    <circle cx="24" cy="16" r="2.2" fill="#1a1a1a"/>
    <circle cx="32" cy="16" r="2.2" fill="#1a1a1a"/>
    <circle cx="24.8" cy="15.2" r="0.8" fill="#fff"/>
    <circle cx="32.8" cy="15.2" r="0.8" fill="#fff"/>
    <!-- Sonrisa -->
    <path d="M24 20 Q28 23 32 20" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    <!-- Cachetes rosados -->
    <ellipse cx="21" cy="19" rx="2.5" ry="1.5" fill="#ff9eb5" opacity="0.6"/>
    <ellipse cx="35" cy="19" rx="2.5" ry="1.5" fill="#ff9eb5" opacity="0.6"/>
    <!-- Estrellitas animadas -->
    <g class="nz-star nz-star-1">
      <path d="M8 12 L8.8 9.5 L9.6 12 L12 12 L10.1 13.6 L10.8 16 L8.8 14.6 L6.8 16 L7.5 13.6 L5.5 12 Z" fill="#fff" opacity="0.95"/>
    </g>
    <g class="nz-star nz-star-2">
      <path d="M46 8 L46.5 6.2 L47 8 L48.8 8 L47.4 9.1 L47.9 10.9 L46.5 9.9 L45.1 10.9 L45.6 9.1 L44.2 8 Z" fill="#fff" opacity="0.85"/>
    </g>
    <g class="nz-star nz-star-3">
      <circle cx="49" cy="18" r="1.8" fill="#fff" opacity="0.7"/>
    </g>
    <g class="nz-star nz-star-4">
      <circle cx="6" cy="22" r="1.2" fill="#fff" opacity="0.6"/>
    </g>
  </svg>`;

  const ICON_BOT  = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="13" width="22" height="16" rx="4" fill="#fff"/><rect x="16" y="9" width="8" height="5" rx="2" fill="#fff"/><rect x="19" y="8" width="2" height="2.5" rx="1" fill="#fff"/><circle cx="15.5" cy="21" r="3" fill="#3a7d5a"/><circle cx="24.5" cy="21" r="3" fill="#3a7d5a"/><circle cx="15.5" cy="21" r="1.2" fill="#fff"/><circle cx="24.5" cy="21" r="1.2" fill="#fff"/><rect x="14.5" y="26" width="11" height="2" rx="1" fill="#3a7d5a" opacity="0.35"/><path d="M5 11 L5.8 8.5 L6.6 11 L9 11 L7.1 12.6 L7.8 15 L5.8 13.6 L3.8 15 L4.5 12.6 L2.5 11 Z" fill="#fff" opacity="0.95"/><path d="M35 7 L35.6 5 L36.2 7 L38 7 L36.6 8.2 L37.1 10.2 L35.6 9.1 L34.1 10.2 L34.6 8.2 L33.2 7 Z" fill="#fff" opacity="0.8"/><circle cx="37.5" cy="13" r="1.5" fill="#fff" opacity="0.7"/><circle cx="3" cy="17" r="1" fill="#fff" opacity="0.6"/></svg>`;
  const ICON_SEND  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  const ICON_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const ICON_WA    = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  // ── YAML parser ───────────────────────────────────────────────────────────
  function parseYAML(text) {
    const lines = text.split('\n');
    const ind = l => (l.match(/^(\s*)/) || ['',''])[1].length;
    const val = l => {
      let v = l.replace(/^[^:]+:\s*/, '').trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return v;
    };
    const result = { bot:{}, quick_replies:[], faq:[] };
    let i = 0;

    while (i < lines.length && !lines[i].startsWith('quick_replies:')) {
      const l = lines[i++];
      if (/^  \w/.test(l) && l.includes(':') && !l.trim().startsWith('-'))
        result.bot[l.trim().split(':')[0]] = val(l);
    }
    i++;
    while (i < lines.length && !lines[i].startsWith('faq:')) {
      const t = lines[i].trim();
      if (t.startsWith('- ')) result.quick_replies.push(t.slice(2).replace(/^["']|["']$/g, ''));
      i++;
    }

    function parseList(startIndent) {
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim()) { i++; continue; }
        if (ind(l) < startIndent) break;
        if (l.trim().startsWith('- ')) {
          const item = {};
          const firstLine = l.trim().slice(2);
          if (firstLine.includes(':')) {
            const k = firstLine.split(':')[0].trim();
            item[k] = firstLine.replace(/^[^:]+:\s*/, '').replace(/^["']|["']$/g, '').trim();
          }
          i++;
          const itemIndent = startIndent + 2;
          while (i < lines.length) {
            const ll = lines[i];
            if (!ll.trim()) { i++; continue; }
            if (ind(ll) < itemIndent || ll.trim().startsWith('- ')) break;
            if (ll.includes(':')) { const k = ll.trim().split(':')[0]; item[k] = val(ll); }
            i++;
          }
          items.push(item);
        } else { i++; }
      }
      return items;
    }

    i++;
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      if (!l.match(/^  - id:/)) { i++; continue; }

      const entry = { id: val(l), patterns:[], answer:'', buttons:[], cards:[], booking_options:[], suggestions:[] };
      i++;

      if (lines[i] && lines[i].trim() === 'patterns:') {
        i++;
        while (i < lines.length && lines[i].trim().startsWith('- ') && ind(lines[i]) >= 6) {
          entry.patterns.push(lines[i].trim().slice(2)); i++;
        }
      }
      if (lines[i] && lines[i].match(/answer:\s*\|/)) {
        i++;
        const base = ind(lines[i] || '      ');
        const ans = [];
        while (i < lines.length && (lines[i].trim() === '' || ind(lines[i]) >= base)) { ans.push(lines[i].slice(base)); i++; }
        entry.answer = ans.join('\n').trimEnd();
      } else if (lines[i] && lines[i].match(/\s+answer:/)) {
        entry.answer = val(lines[i]); i++;
      }
      if (lines[i] && lines[i].trim() === 'buttons:') { i++; entry.buttons = parseList(6); }
      if (lines[i] && lines[i].trim() === 'cards:')   { i++; entry.cards   = parseList(6); }
      if (lines[i] && lines[i].trim() === 'booking_options:') { i++; entry.booking_options = parseList(6); }
      if (lines[i] && lines[i].trim() === 'suggestions:') {
        i++;
        while (i < lines.length && lines[i].trim().startsWith('- ') && ind(lines[i]) >= 6) {
          entry.suggestions.push(lines[i].trim().slice(2).replace(/^["']|["']$/g, '')); i++;
        }
      }
      result.faq.push(entry);
    }
    return result;
  }

  // ── Session ───────────────────────────────────────────────────────────────
  function saveSession(history, isOpen, showBooking) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ history, isOpen, showBooking: !!showBooking })); } catch(e) {}
  }
  function loadSession() {
    try { const r = sessionStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; }
  }

  // ── FAQ matcher ───────────────────────────────────────────────────────────
  function matchFAQ(faq, text) {
    const n = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const e of faq) { if (e.patterns.some(p => n.includes(p))) return e; }
    return null;
  }

  // ── WhatsApp URL ──────────────────────────────────────────────────────────
  function waURL(phone, msg) {
    return 'https://api.whatsapp.com/send/?phone=' + phone + '&text=' + encodeURIComponent(msg) + '&type=phone_number&app_absent=0';
  }

  // ── Inyectar CSS de estrellitas en el bubble ──────────────────────────────
  function injectStarStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #nz-chat-bubble svg { width: 40px; height: 40px; overflow: visible; }
      .nz-star { transform-origin: center; }
      .nz-star-1 { animation: nzStarPulse 2.2s ease-in-out infinite; }
      .nz-star-2 { animation: nzStarPulse 2.2s ease-in-out infinite 0.4s; }
      .nz-star-3 { animation: nzStarFade 2.2s ease-in-out infinite 0.8s; }
      .nz-star-4 { animation: nzStarFade 2.2s ease-in-out infinite 1.2s; }
      @keyframes nzStarPulse {
        0%, 100% { opacity: 0.3; transform: scale(0.7); }
        50%       { opacity: 1;   transform: scale(1.2); }
      }
      @keyframes nzStarFade {
        0%, 100% { opacity: 0.2; }
        50%       { opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  async function init() {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = CSS_PATH;
    document.head.appendChild(link);

    injectStarStyles();

    let config = {
      bot: { name:'Nutrizen', subtitle:'Asistente de Itzel Zenil · Nutrióloga', welcome:'Hola, soy el asistente de Nutrizen. ¿En qué puedo ayudarte hoy?', fallback:'No tengo información sobre eso todavía. Puedes contactar a Itzel directamente por WhatsApp al +52 998 191 7732.', whatsapp:'5219981917732' },
      quick_replies:[], faq:[]
    };
    try {
      const res = await fetch(CONFIG_PATH + '?v=' + Date.now());
      if (res.ok) config = parseYAML(await res.text());
    } catch(e) { console.warn('Nutrizen widget: no se cargó bot-config.yaml', e); }

    let history = [], isOpen = false;

    const phone = (config.bot.whatsapp || '5219981917732').replace(/['"]/g, '').trim();

    // ── DOM ───────────────────────────────────────────────────────────────
    const bubble = document.createElement('button');
    bubble.id = 'nz-chat-bubble';
    bubble.setAttribute('aria-label', 'Abrir chat');
    bubble.innerHTML = ICON_AVOCADO;

    const win = document.createElement('div');
    win.id = 'nz-chat-window';
    win.setAttribute('role', 'dialog');
    win.innerHTML = `
      <div class="nz-header">
        <div class="nz-avatar">${ICON_AVOCADO}</div>
        <div class="nz-header-info">
          <h4>${config.bot.name || 'Nutrizen'}</h4>
          <p>${config.bot.subtitle || ''}</p>
        </div>
        <button class="nz-close" id="nz-close-btn" aria-label="Cerrar">${ICON_CLOSE}</button>
      </div>
      <div class="nz-messages" id="nz-messages"></div>
      <div class="nz-quick-replies" id="nz-quick-replies"></div>
      <div class="nz-input-row">
        <textarea class="nz-input" id="nz-input" placeholder="Escribe tu mensaje..." rows="1"></textarea>
        <button class="nz-send" id="nz-send">${ICON_SEND}</button>
      </div>
      <a class="nz-wa-btn" id="nz-wa-btn" href="https://api.whatsapp.com/send/?phone=${phone}&type=phone_number&app_absent=0" target="_blank" rel="noopener" style="display:none;">
        ${ICON_WA} Hablar con Itzel por WhatsApp
      </a>
      <div class="nz-powered">Nutrizen · nutriologaitzelzenil@gmail.com</div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(win);

    const msgsEl  = win.querySelector('#nz-messages');
    const inputEl = win.querySelector('#nz-input');
    const qrEl    = win.querySelector('#nz-quick-replies');
    const waBtnEl = win.querySelector('#nz-wa-btn');

    // ── Render functions ──────────────────────────────────────────────────
    function addMsg(role, text, buttons, cards) {
      const wrap = document.createElement('div');
      wrap.className = `nz-msg nz-${role}`;

      if (text) {
        const bub = document.createElement('div');
        bub.className = 'nz-bubble';
        bub.textContent = text;
        wrap.appendChild(bub);
      }

      if (cards && cards.length) {
        const cw = document.createElement('div');
        cw.className = 'nz-cards';
        cards.forEach(c => {
          const card = document.createElement('div');
          card.className = 'nz-card' + (c.query ? ' nz-card-clickable' : '');
          card.innerHTML = `
            ${c.icon ? `<div class="nz-card-icon">${c.icon}</div>` : ''}
            <div class="nz-card-body">
              <div class="nz-card-title">${c.title}</div>
              ${c.description ? `<div class="nz-card-desc">${c.description}</div>` : ''}
              ${c.query ? `<div class="nz-card-hint">Toca para saber más →</div>` : ''}
              ${c.url ? `<a class="nz-card-link" href="${c.url}" target="_blank" rel="noopener">${c.link_label || 'Ver más'} →</a>` : ''}
            </div>`;
          if (c.query) card.onclick = () => send(c.query);
          cw.appendChild(card);
        });
        wrap.appendChild(cw);
      }

      if (buttons && buttons.length) {
        const bw = document.createElement('div');
        bw.className = 'nz-action-btns';
        buttons.forEach(b => {
          const a = document.createElement('a');
          a.className = 'nz-action-btn';
          a.href = b.url; a.target = '_blank'; a.rel = 'noopener';
          a.textContent = (b.icon ? b.icon + ' ' : '') + b.label;
          bw.appendChild(a);
        });
        wrap.appendChild(bw);
      }

      const time = document.createElement('div');
      time.className = 'nz-time';
      time.textContent = new Date().toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' });
      wrap.appendChild(time);
      msgsEl.appendChild(wrap);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function showSuggestions(suggestions) {
      qrEl.innerHTML = '';
      const items = (suggestions && suggestions.length) ? suggestions : config.quick_replies;
      items.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'nz-qr';
        btn.textContent = qr;
        btn.onclick = () => send(qr);
        qrEl.appendChild(btn);
      });
      qrEl.style.display = 'flex';
    }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'nz-msg nz-bot'; t.id = 'nz-typing';
      t.innerHTML = `<div class="nz-bubble"><div class="nz-typing"><span></span><span></span><span></span></div></div>`;
      msgsEl.appendChild(t); msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    function hideTyping() { document.getElementById('nz-typing')?.remove(); }

    // ── Booking flow ──────────────────────────────────────────────────────
    function showBookingForm(bookingOptions) {
      win.querySelector('#nz-booking-form')?.remove();

      const form = document.createElement('div');
      form.id = 'nz-booking-form';
      form.className = 'nz-booking-form';
      form.innerHTML = `
        <p class="nz-booking-title">¿Es tu primera consulta o es de seguimiento?</p>
        <div class="nz-booking-options" id="nz-step1">
          <button class="nz-booking-opt" data-step="1" data-tipo="primera">🌟 Primera vez</button>
          <button class="nz-booking-opt" data-step="1" data-tipo="seguimiento">🔄 Seguimiento</button>
        </div>
        <div id="nz-step2-wrap" style="display:none;">
          <p class="nz-booking-title" style="margin-top:8px;">¿Online o presencial?</p>
          <div class="nz-booking-options">
            <button class="nz-booking-opt" data-step="2" data-tipo="online">💻 Online</button>
            <button class="nz-booking-opt" data-step="2" data-tipo="presencial">🏥 Presencial</button>
          </div>
        </div>
        <div class="nz-booking-names" id="nz-names-row" style="display:none;">
          <input class="nz-booking-input" id="nz-booking-name" placeholder="Nombre" maxlength="60" />
          <input class="nz-booking-input" id="nz-booking-lastname" placeholder="Apellido" maxlength="60" />
        </div>
        <button class="nz-booking-send" id="nz-booking-send" disabled>${ICON_WA} Enviar por WhatsApp</button>
      `;

      const sendBtn = form.querySelector('#nz-booking-send');
      const nameEl  = form.querySelector('#nz-booking-name');
      const lastEl  = form.querySelector('#nz-booking-lastname');
      const step2El = form.querySelector('#nz-step2-wrap');
      const namesEl = form.querySelector('#nz-names-row');

      let tipoConsulta  = null;
      let tipoModalidad = null;

      function validateForm() {
        sendBtn.disabled = !(tipoConsulta && tipoModalidad && nameEl.value.trim() && lastEl.value.trim());
      }

      nameEl.addEventListener('input', validateForm);
      lastEl.addEventListener('input', validateForm);

      form.querySelectorAll('.nz-booking-opt').forEach(btn => {
        btn.onclick = () => {
          const step = btn.dataset.step;
          form.querySelectorAll(`.nz-booking-opt[data-step="${step}"]`).forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (step === '1') {
            tipoConsulta  = btn.dataset.tipo;
            tipoModalidad = null;
            form.querySelectorAll('.nz-booking-opt[data-step="2"]').forEach(b => b.classList.remove('selected'));
            step2El.style.display = 'block';
            namesEl.style.display = 'none';
            sendBtn.disabled = true;
          } else {
            tipoModalidad = btn.dataset.tipo;
            namesEl.style.display = 'flex';
            validateForm();
          }
        };
      });

      sendBtn.onclick = () => {
        const nombre   = nameEl.value.trim();
        const apellido = lastEl.value.trim();
        const nombreCompleto = [nombre, apellido].filter(Boolean).join(' ') || 'cliente';

        // Buscar la opción de booking en el YAML según modalidad
        const option = (bookingOptions || []).find(o => o.tipo === tipoModalidad);
        const msgTemplate = option
          ? (tipoConsulta === 'seguimiento' ? option.msg_seguimiento : option.msg_primera)
          : null;

        const precio = option
          ? (tipoConsulta === 'seguimiento' ? option.precio_seguimiento : option.precio_primera)
          : '';

        let msg;
        if (msgTemplate) {
          msg = msgTemplate
            .replace('{nombre}', nombreCompleto)
            .replace('{precio}', precio || '');
        } else {
          // Fallback si no hay template en YAML
          msg = tipoConsulta === 'seguimiento'
            ? `Hola Itzel, soy ${nombreCompleto}. Me gustaría agendar mi consulta de seguimiento ${tipoModalidad}. ¿Cuándo tienes disponibilidad?`
            : `Hola Itzel, me llamo ${nombreCompleto}. Me gustaría agendar mi primera consulta ${tipoModalidad}. ¿Cuándo tienes disponibilidad?`;
        }
        window.open(waURL(phone, msg), '_blank');
        form.querySelectorAll('.nz-booking-opt').forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
        nameEl.disabled = true; lastEl.disabled = true;
        sendBtn.disabled = true;
        sendBtn.textContent = '✓ Enviado';
        sendBtn.style.background = '#3a7d5a';
        saveSession(history, isOpen, false);
      };

      win.insertBefore(form, win.querySelector('.nz-input-row'));
    }

    // ── Send ──────────────────────────────────────────────────────────────
    async function send(text) {
      text = text.trim(); if (!text) return;
      inputEl.value = ''; inputEl.style.height = '';
      qrEl.style.display = 'none';
      win.querySelector('#nz-booking-form')?.remove();

      addMsg('user', text);
      history.push({ role:'user', content:text, buttons:[], cards:[] });
      saveSession(history, isOpen);
      showTyping();

      try {
        const local = matchFAQ(config.faq, text);
        if (local) {
          await new Promise(r => setTimeout(r, 380));
          hideTyping();
          if (local.id === 'agendar') {
            addMsg('bot', local.answer);
            history.push({ role:'assistant', content:local.answer, buttons:[], cards:[] });
            saveSession(history, isOpen, true);
            showBookingForm(local.booking_options);
            showSuggestions(local.suggestions);
            return;
          }
          addMsg('bot', local.answer, local.buttons, local.cards);
          history.push({ role:'assistant', content:local.answer, buttons:local.buttons||[], cards:local.cards||[] });
          saveSession(history, isOpen);
          showSuggestions(local.suggestions);
          return;
        }

        let reply = '', buttons = [], cards = [];
        if (WEBHOOK_URL) {
          const res = await fetch(WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message:text, history, page:location.pathname }) });
          const data = await res.json();
          reply   = data.reply || data.message || data.text || config.bot.fallback;
          buttons = data.buttons || [];
          cards   = data.cards   || [];
          if (!data.reply && !data.message && !data.text) waBtnEl.style.display = 'flex';
        } else {
          await new Promise(r => setTimeout(r, 500));
          reply = config.bot.fallback;
        }
        hideTyping();
        addMsg('bot', reply, buttons, cards);
        history.push({ role:'assistant', content:reply, buttons, cards });
        saveSession(history, isOpen);
        showSuggestions(config.quick_replies);
      } catch(e) {
        hideTyping();
        addMsg('bot', config.bot.fallback);
        history.push({ role:'assistant', content:config.bot.fallback, buttons:[], cards:[] });
        saveSession(history, isOpen);
        showSuggestions([]);
      }
    }

    // ── Open / Close ──────────────────────────────────────────────────────
    function open() {
      isOpen = true;
      win.classList.add('nz-open');
      bubble.innerHTML = ICON_CLOSE;
      if (!msgsEl.children.length) {
        const s = loadSession();
        if (s && s.history && s.history.length) {
          history = s.history;
          history.forEach(m => addMsg(m.role === 'user' ? 'user' : 'bot', m.content, m.buttons||[], m.cards||[]));
          if (s.showBooking) {
            const agendarEntry = config.faq.find(e => e.id === 'agendar');
            showBookingForm(agendarEntry ? agendarEntry.booking_options : []);
            showSuggestions([]);
          } else {
            showSuggestions([]);
          }
        } else {
          addMsg('bot', config.bot.welcome);
          showSuggestions(config.quick_replies);
        }
      }
      saveSession(history, true, !!win.querySelector('#nz-booking-form'));
      inputEl.focus();
    }

    function close() {
      isOpen = false;
      win.classList.remove('nz-open');
      bubble.innerHTML = ICON_AVOCADO;
      saveSession(history, false);
    }

    bubble.onclick = () => isOpen ? close() : open();
    win.querySelector('#nz-close-btn').onclick = close;
    win.querySelector('#nz-send').onclick = () => send(inputEl.value);
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputEl.value); }
    });
    inputEl.addEventListener('input', () => {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px';
    });

    // ── API global ────────────────────────────────────────────────────────
    window.nzOpen = open;
    window.nzSend = function(text) {
      // Si el último mensaje del usuario ya es este texto, no lo reenvíes
      const lastUserMsg = [...history].reverse().find(m => m.role === 'user');
      if (lastUserMsg && lastUserMsg.content.trim() === text.trim()) return;
      send(text);
    };

    const prev = loadSession();
    if (prev && prev.isOpen) setTimeout(() => open(), 120);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();