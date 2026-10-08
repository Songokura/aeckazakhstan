/* AEC Kazakhstan - лэндинг. Ванильный JS: плиты, мнемосхема, i18n, меню, ленты, форма. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement, W = window;
  root.classList.add("js");

  var ASSET_V = ((doc.currentScript && doc.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
  var REDUCED = W.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v, a, b) { return Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, v)); };

  /* ---------- Словари ---------- */
  var RU = {};               // снимается с разметки при старте
  var EN = {
    "meta.title": "UPS, batteries and diesel gensets for business in Kazakhstan - AEC Kazakhstan, Almaty",
    "meta.desc": "Uninterruptible power for data centers, hospitals, plants and airports: UPS up to 4,800 kW, batteries, 24/7 service, diesel generators. Official distributor of 12+ brands, warehouse in Almaty, delivery across Kazakhstan.",
    "hdr.menu": "Menu", "hdr.home": "AEC Kazakhstan - home",
    "nav.solutions": "Solutions", "nav.industries": "Industries", "nav.cases": "Projects", "nav.service": "Service", "nav.about": "About", "nav.contacts": "Contacts",
    "menu.ibp": "UPS", "menu.akb": "Batteries", "menu.service": "UPS service", "menu.dgu": "Generators", "menu.form": "Request",
    "menu.note": "Mon-Fri 09:00-18:00, service support 24/7",
    "hero.kicker": "Almaty · all Kazakhstan · since 2021",
    "hero.l1": "UPS, batteries, gensets", "hero.l2": "Uninterruptible", "hero.l3": "power",
    "hero.lead": "Sizing, supply, installation and 24/7 service for any site that cannot lose power: from server rooms and clinics to plants and airports. 200+ sites in 20 regions of Kazakhstan, systems up to 4,800 kW.",
    "hero.cta1": "Get a quote in 24 hours", "hero.cta2": "Solutions", "hero.ig": "Sites and exhibitions on Instagram",
    "m.grid": "Grid", "m.dgu": "Genset", "m.ups": "UPS", "m.akb": "Battery", "m.load1": "Critical", "m.load2": "load",
    "m.s0": "Grid is fine: the UPS filters voltage and feeds the load",
    "m.s1": "Grid is down: the load runs on batteries with no break",
    "m.s2": "Genset started: the site runs as long as there is fuel",
    "p1.k": "UPS", "p1.h": "Uninterruptible power supplies",
    "p1.t": "From 1 kVA to 4,800 kW: industrial, modular for data centers and server rooms, for MRI, CT and X-ray. TESCOM, Salicru, Kehua, Socomec from stock in Almaty.",
    "p1.c1": "Industrial", "p1.c2": "Data centers", "p1.c3": "Medical", "p1.c4": "Modular N+1",
    "btn.price": "Get a price", "p1.link": "Free sizing and runtime calculation",
    "p2.k": "Batteries", "p2.h": "Batteries for UPS",
    "p2.t": "2V and 12V: OPzV, OPzS, AGM and lithium-ion. BAE, Hoppecke, EnerGrid. Free runtime calculation, on-site replacement in any region of Kazakhstan.",
    "p2.c1": "2V OPzV and OPzS", "p2.c2": "12V AGM", "p2.c3": "Lithium-ion", "p2.c4": "Cabinets and racks", "p2.link": "Calculate runtime for your load",
    "p3.k": "Service", "p3.h": "UPS service 24/7",
    "p3.t": "Maintenance contracts, diagnostics, repair, battery replacement. Response within 24 hours, emergency call-out around the clock.",
    "p3.c1": "Maintenance contract", "p3.c2": "UPS repair", "p3.c3": "Battery replacement", "p3.c4": "Call-out 24/7", "p3.cta": "Call an engineer",
    "p4.k": "Gensets", "p4.h": "Diesel generators",
    "p4.t": "Open, canopied and containerized. Cummins, Perkins, Deutz, MTU, Volvo Penta engines. 24-month or 1,000-hour warranty, ATS included.",
    "p4.c1": "Open", "p4.c2": "Canopied", "p4.c3": "Containerized", "p4.c4": "With ATS", "p4.link": "Size the genset for your site",
    "ind.k": "Industries", "ind.h": "Solutions by industry",
    "ind.t": "50+ projects in healthcare, telecom and data centers, industry and oil & gas, transport, banks and public sector. We will tell you what we installed at similar sites.",
    "ind.1h": "Healthcare", "ind.1t": "UPS for MRI, CT and X-ray, medical IT systems, isolation transformers for operating rooms",
    "ind.2h": "Data centers and telecom", "ind.2t": "Modular UPS with N+1 redundancy, lithium-ion batteries, STS, racks and battery cabinets",
    "ind.3h": "Industry and oil & gas", "ind.3t": "Industrial UPS, DC systems and chargers, voltage stabilizers, containerized gensets for fields and plants",
    "ind.4h": "Transport and aviation", "ind.4t": "Airports and air navigation, metro, railway traction substations",
    "ind.5h": "Banks and public sector", "ind.5t": "Server rooms and offices, backup for cash desks and halls, tender supplies with VAT",
    "ind.cta": "Discuss your site",
    "eq.k": "Equipment", "eq.h": "A complete backup loop on one site",
    "eq.t": "Besides UPS, batteries and gensets we supply and connect everything between the mains input and the load.",
    "eq.1h": "Voltage stabilizers", "eq.1t": "three-phase, 10-5,000 kVA",
    "eq.2h": "Static transfer switches (STS)", "eq.2t": "load transfer between inputs",
    "eq.3h": "Chargers and DC systems", "eq.3t": "operational DC power for substations",
    "eq.4h": "Isolation transformers and medical IT systems", "eq.4t": "operating rooms and ICUs",
    "eq.5h": "Battery cabinets and racks", "eq.5t": "own production",
    "eq.6h": "Gas piston power plants", "eq.6t": "400-4,500 kW",
    "eq.7h": "Variable frequency drives", "eq.7t": "for pumps and ventilation",
    "eq.8h": "ATS and inverters", "eq.8t": "automatic transfer switches",
    "cs.k": "Projects", "cs.h": "What we have installed", "cs.t": "Eight sites out of 200+ in Kazakhstan and Kyrgyzstan: aviation, railway, healthcare, television.",
    "cs.8h": "Kazaeronavigatsiya, Aktobe", "cs.8t": "Two 60 kVA UPS units with battery cabinets",
    "cs.6h": "NOMAD TV, Bishkek", "cs.6t": "Damvideo LLC: 300 kVA UPS and two 500 kVA BaiFa diesel generators for the TV channel",
    "cs.7h": "Emirmed, Almaty", "cs.7t": "Medical center on Rozybakiev St.: Kehua MY200 UPS at 200 kVA, crane delivery, installation and commissioning",
    "btn.prev": "Previous", "btn.next": "Next",
    "cs.1h": "Air Astana, Almaty", "cs.1t": "Kehua MY120 UPS at 120 kVA, WBR batteries and battery cabinets of our own production: power for the server room",
    "cs.2h": "Kazakhstan Railways, five cities", "cs.2t": "600 batteries 2V 420 Ah OPzV and 10 charger sets for traction substations: delivery, installation, commissioning",
    "cs.3h": "Clinic, Oral", "cs.3t": "Two Tescom Teos 80 kVA UPS for X-ray machines, 80 Bereli batteries, two battery cabinets",
    "cs.4h": "Laboratory, Karaganda", "cs.4t": "Modular Tescom MTW 300 kVA UPS and 80 Bereli batteries: if one module fails, the others carry the load",
    "cs.5h": "Qazaqstan TV channel, Astana", "cs.5t": "Qazaqstan HD mobile TV station: two Salicru 10 kVA UPS with battery cabinets",
    "cs.ig": "More projects on Instagram",
    "tr.k": "About", "tr.h": "AEC Kazakhstan: an engineering company from Almaty",
    "tr.t": "Official distributor of 12+ global brands, warehouse in Almaty, own service team. We work with companies and public customers across Kazakhstan.",
    "n.1": "projects", "n.2": "customers", "n.3": "brands distributed", "n.4": "regions of Kazakhstan", "n.5": "healthcare projects", "n.6": "kW - system capacity", "n.7": "service support",
    "br.cap": "Official distribution", "br.more": "Plus Hoppecke, Exide, Yuasa, Riello, Ritar, EnerGrid, Bereli and Peli",
    "tr.team": "AEC team at KIOGE 2026, Almaty. Four segment managers and service engineers.",
    "sk.k": "Warehouse and installation", "sk.h": "From our Almaty warehouse to your site",
    "sk.t": "Popular equipment in stock; installation and commissioning by AEC engineers.",
    "sk.play": "Watch the video with sound", "sk.playt": "Warehouse tour with sound",
    "sk.vcap": "Almaty warehouse: Tescom UPS and batteries on pallets, shipping from one day",
    "sk.1": "UPS connection", "sk.2": "Equipment testing before start-up", "sk.3": "Genset installation on site", "sk.4": "Socomec UPS on site",
    "cl.cap": "Trusted by", "lt.cap": "Letters of appreciation",
    "lt.tec": "Stepnogorsk CHP", "lt.hitech": "Hi-Tech Clinic", "lt.remkran": "REM-Kran",
    "u.k": "Terms", "u.h": "How we work with companies",
    "u.1": "Free engineer visit and site survey", "u.2": "Free equipment sizing and runtime calculation", "u.3": "Commercial proposal within 24 hours",
    "u.4": "Equipment in stock in Almaty, delivery to site across Kazakhstan",
    "u.5": "Warranty: UPS 24 months, extendable to 36-60; gensets 24 months or 1,000 hours",
    "u.6": "Cashless payment with VAT, flexible terms",
    "st.k": "Steps", "st.h": "From request to service",
    "st.1h": "Request", "st.1t": "Call, WhatsApp or the form. The head of sales passes it to the manager for your segment",
    "st.2h": "Survey", "st.2t": "An engineer visits the site free of charge, measures the load and installation conditions",
    "st.3h": "Quote in 24 hours", "st.3t": "Equipment selection, runtime calculation, lead time and price for your site",
    "st.4h": "Supply and service", "st.4t": "Delivery, installation, commissioning and 24/7 maintenance under contract",
    "f.k": "Request", "f.h": "A calculation for your site",
    "f.t": "Fill in the form: the request opens in WhatsApp as a ready message, a manager replies within the working day.",
    "f.name": "Name", "f.name.ph": "How should we address you", "f.company": "Company", "f.company.ph": "Organization name",
    "f.phone": "Phone", "f.city": "City", "f.city.ph": "Where the site is", "f.dir": "Direction",
    "f.d1": "UPS", "f.d2": "Batteries for UPS", "f.d3": "UPS service", "f.d4": "Diesel generator", "f.d5": "Other equipment",
    "f.msg": "Message", "f.msg.ph": "Load power, required runtime, timing",
    "f.err": "Please enter your name and phone so we can reply.", "f.submit": "Send via WhatsApp",
    "f.note": "By pressing the button you agree to the processing of your data to answer the request.",
    "f.th1": "Thank you! The request has opened in WhatsApp.",
    "f.th2": "Send the message and a manager will reply within the working day. If the window did not open, write to us directly:",
    "c.k": "Contacts", "c.h": "Almaty, working across Kazakhstan",
    "c.p1": "main number, also WhatsApp", "c.p2": "second number, Telegram",
    "c.addr": "Almaty, 71/66 Chaplin St., Stanitsa business center, 4th floor, office A03",
    "c.hours": "Mon-Fri 09:00-18:00. Service support 24/7", "c.2gis": "Open in 2GIS", "c.gmaps": "Google Maps",
    "ft.legal": "AEC Kazakhstan LLP (Almaty Electro Consult), BIN 211240034245. Uninterruptible and backup power systems for legal entities.",
    "ft.copy": "AEC Kazakhstan, Almaty. In business since 2021.",
    "sk.call": "Call"
  };
  var I18N = { ru: RU, en: EN };

  /* Тексты WhatsApp по категориям */
  var WA = {
    ru: {
      "default": "Здравствуйте! Пишу с сайта AEC Kazakhstan. Нужна консультация по бесперебойному питанию для объекта.",
      kp: "Здравствуйте! Нужно коммерческое предложение по бесперебойному питанию для объекта. Готов прислать данные по нагрузке.",
      ibp: "Здравствуйте! Нужна цена на ИБП для объекта. Мощность и требуемая автономия: ",
      akb: "Здравствуйте! Нужны аккумуляторы для ИБП. Модель ИБП и количество батарей: ",
      service: "Здравствуйте! Нужен сервис ИБП (обслуживание, ремонт или замена батарей). Объект и модель ИБП: ",
      dgu: "Здравствуйте! Нужен дизельный генератор. Мощность, исполнение и город объекта: ",
      med: "Здравствуйте! Нужно решение по бесперебойному питанию для медицинского объекта (МРТ, КТ, рентген, операционные). Объект: ",
      cod: "Здравствуйте! Нужно решение по бесперебойному питанию для ЦОД или серверной. Мощность и резервирование: ",
      prom: "Здравствуйте! Нужно решение по бесперебойному питанию для промышленного объекта. Объект и нагрузка: ",
      transport: "Здравствуйте! Нужно решение по бесперебойному питанию для транспортного или авиационного объекта. Объект: ",
      bank: "Здравствуйте! Нужно решение по бесперебойному питанию для банка или госучреждения. Объект: ",
      stab: "Здравствуйте! Нужен стабилизатор напряжения. Мощность и число фаз: ",
      sts: "Здравствуйте! Нужен статический переключатель STS. Параметры: ",
      zvu: "Здравствуйте! Нужны ЗВУ или СОПТ для подстанции. Параметры: ",
      it: "Здравствуйте! Нужны разделительные трансформаторы или медицинская IT-система. Объект: ",
      cab: "Здравствуйте! Нужны батарейные шкафы или стеллажи. Тип и количество АКБ: ",
      gpes: "Здравствуйте! Интересует газопоршневая электростанция. Мощность и объект: ",
      vfd: "Здравствуйте! Нужен преобразователь частоты. Параметры привода: ",
      avr: "Здравствуйте! Нужен АВР или инвертор. Параметры: "
    },
    en: {
      "default": "Hello! I am writing from the AEC Kazakhstan website. I need advice on uninterruptible power for a site.",
      kp: "Hello! I need a commercial proposal for uninterruptible power for a site. I can send the load data.",
      ibp: "Hello! I need a price for a UPS. Power and required runtime: ",
      akb: "Hello! I need batteries for a UPS. UPS model and number of batteries: ",
      service: "Hello! I need UPS service (maintenance, repair or battery replacement). Site and UPS model: ",
      dgu: "Hello! I need a diesel generator. Power, enclosure type and city: ",
      med: "Hello! I need an uninterruptible power solution for a medical site (MRI, CT, X-ray, operating rooms). Site: ",
      cod: "Hello! I need an uninterruptible power solution for a data center or server room. Power and redundancy: ",
      prom: "Hello! I need an uninterruptible power solution for an industrial site. Site and load: ",
      transport: "Hello! I need an uninterruptible power solution for a transport or aviation site. Site: ",
      bank: "Hello! I need an uninterruptible power solution for a bank or public institution. Site: ",
      stab: "Hello! I need a voltage stabilizer. Power and number of phases: ",
      sts: "Hello! I need a static transfer switch (STS). Parameters: ",
      zvu: "Hello! I need chargers or a DC system for a substation. Parameters: ",
      it: "Hello! I need isolation transformers or a medical IT system. Site: ",
      cab: "Hello! I need battery cabinets or racks. Battery type and quantity: ",
      gpes: "Hello! I am interested in a gas piston power plant. Power and site: ",
      vfd: "Hello! I need a variable frequency drive. Drive parameters: ",
      avr: "Hello! I need an ATS or an inverter. Parameters: "
    }
  };
  var WA_NUM = "77066511601";
  var FORM_LABELS = {
    ru: { head: "Заявка с сайта AEC Kazakhstan", name: "Имя", company: "Компания", phone: "Телефон", dir: "Направление", city: "Город", msg: "Сообщение" },
    en: { head: "Request from the AEC Kazakhstan website", name: "Name", company: "Company", phone: "Phone", dir: "Direction", city: "City", msg: "Message" }
  };

  /* ---------- i18n ---------- */
  var LANG = "ru";
  var iEls = [].slice.call(doc.querySelectorAll("[data-i]"));
  var phEls = [].slice.call(doc.querySelectorAll("[data-i-ph]"));
  var ariaEls = [].slice.call(doc.querySelectorAll("[data-i-aria]"));
  iEls.forEach(function (el) { RU[el.getAttribute("data-i")] = el.textContent; });
  phEls.forEach(function (el) { RU[el.getAttribute("data-i-ph")] = el.getAttribute("placeholder"); });
  ariaEls.forEach(function (el) { RU[el.getAttribute("data-i-aria")] = el.getAttribute("aria-label"); });
  RU["meta.title"] = doc.title;
  var metaDesc = doc.querySelector('meta[name="description"]');
  RU["meta.desc"] = metaDesc ? metaDesc.getAttribute("content") : "";

  function t(key, lang) {
    var d = I18N[lang || LANG];
    return (d && d[key] != null) ? d[key] : RU[key];
  }
  function applyLang(lang) {
    if (!I18N[lang]) lang = "ru";
    LANG = lang;
    iEls.forEach(function (el) { var v = t(el.getAttribute("data-i")); if (v != null) el.textContent = v; });
    phEls.forEach(function (el) { var v = t(el.getAttribute("data-i-ph")); if (v != null) el.setAttribute("placeholder", v); });
    ariaEls.forEach(function (el) { var v = t(el.getAttribute("data-i-aria")); if (v != null) el.setAttribute("aria-label", v); });
    doc.title = t("meta.title");
    if (metaDesc) metaDesc.setAttribute("content", t("meta.desc"));
    root.setAttribute("lang", lang);
    [].forEach.call(doc.querySelectorAll(".lang button"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    try { localStorage.setItem("aec-lang", lang); } catch (e) {}
    fitText();
    updateRails();
  }
  function loadLang(lang, done) {
    if (I18N[lang] || lang !== "kk") return done();
    var s = doc.createElement("script");
    s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
    s.onload = function () { if (W.SITE_KK) { I18N.kk = W.SITE_KK; if (W.SITE_KK_WA) WA.kk = W.SITE_KK_WA; if (W.SITE_KK_FORM) FORM_LABELS.kk = W.SITE_KK_FORM; } done(); };
    s.onerror = function () { done(); };
    doc.head.appendChild(s);
  }
  function setLang(lang) { loadLang(lang, function () { applyLang(lang); }); }
  [].forEach.call(doc.querySelectorAll(".lang button"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  (function initLang() {
    var q = (location.search.match(/[?&]lang=(ru|kk|en)/) || [])[1];
    var saved = null; try { saved = localStorage.getItem("aec-lang"); } catch (e) {}
    var lang = q || saved || "ru";
    if (lang !== "ru") setLang(lang);
  })();

  /* ---------- WhatsApp: текст собирается в момент клика (фаза захвата на window - совместимо с LeadBot) ---------- */
  W.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-wa]") : null;
    if (!a) return;
    var key = a.getAttribute("data-wa") || "default";
    var d = WA[LANG] || WA.ru;
    var text = d[key] || d["default"] || WA.ru["default"];
    a.setAttribute("href", "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(text));
  }, true);

  /* ---------- fitText для заголовка героя ---------- */
  var h1 = doc.getElementById("h1");
  function fitText() {
    if (!h1) return;
    var l2 = h1.querySelectorAll(".l2");
    var avail = h1.clientWidth;
    if (!avail) return;
    var fs = Math.min(Math.max(44, Math.min(W.innerWidth * 0.145, W.innerHeight * 0.105)), 132);
    h1.style.setProperty("--fs", fs + "px");
    var guard = 0;
    while (guard++ < 30) {
      var over = false;
      for (var i = 0; i < l2.length; i++) { if (l2[i].scrollWidth > avail + 1) { over = true; break; } }
      if (!over || fs < 22) break;
      fs *= 0.95; h1.style.setProperty("--fs", fs + "px");
    }
  }

  /* ---------- Меню ---------- */
  var burger = doc.querySelector(".burger"), menu = doc.getElementById("menu");
  function setMenu(open) {
    if (!menu) return;
    doc.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("open"); }); }
    else { menu.classList.remove("open"); setTimeout(function () { if (!doc.body.classList.contains("menu-open")) menu.hidden = true; }, 320); }
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!doc.body.classList.contains("menu-open")); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Якоря ---------- */
  var HDR = function () { return parseFloat(getComputedStyle(root).getPropertyValue("--hdr")) || 68; };
  function targetTop(el) {
    var r = el.getBoundingClientRect().top + W.pageYOffset;
    if (el.classList.contains("pw")) return r;
    return r - HDR() - 8;
  }
  function goTo(id, instant) {
    var el = doc.getElementById(id);
    if (!el) return false;
    setMenu(false);
    var top = Math.max(0, targetTop(el));
    if (instant || REDUCED) { root.style.scrollBehavior = "auto"; W.scrollTo(0, top); root.style.scrollBehavior = ""; }
    else W.scrollTo({ top: top, behavior: "smooth" });
    return true;
  }
  doc.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    if (goTo(id)) { e.preventDefault(); history.pushState(null, "", "#" + id); }
  });

  /* ---------- Плиты ---------- */
  var pws = [].slice.call(doc.querySelectorAll(".pw"));
  var firstSec = doc.querySelector("main > .sec");
  var mimic = doc.getElementById("mimic");
  var INTRO = (location.hash.length > 1 || W.pageYOffset > 80 || REDUCED) ? 1 : 0;
  var introStart = 0;
  function inrush(p) {
    if (p <= 0) return 0.06;
    if (p < 0.3) return 0.06 + (p / 0.3) * 0.36;
    if (p < 0.42) return 0.42 - ((p - 0.3) / 0.12) * 0.14;
    if (p < 0.8) return 0.28 + ((p - 0.42) / 0.38) * 0.72;
    return 1;
  }
  function easeOut(x) { return 1 - Math.pow(1 - x, 3); }
  var ticking = false, lastY = W.pageYOffset;
  function update() {
    ticking = false;
    var H = W.innerHeight;
    for (var i = 0; i < pws.length; i++) {
      var pw = pws[i], r = pw.getBoundingClientRect();
      var enter = clamp(1 - r.top / H);
      var isHero = pw.classList.contains("pw-hero");
      var heroAuto = isHero && W.innerWidth < 900;
      var stay = r.height > H && !heroAuto ? clamp(-r.top / (r.height - H)) : 0;
      var nxt = pws[i + 1] || firstSec;
      var exit = nxt ? clamp(1 - nxt.getBoundingClientRect().top / H) : 0;
      var lit = isHero ? inrush(INTRO) : inrush(enter);
      var pulse = isHero ? INTRO : clamp(enter * 1.25);
      pw.style.setProperty("--enter", enter.toFixed(4));
      pw.style.setProperty("--stay", stay.toFixed(4));
      pw.style.setProperty("--exit", exit.toFixed(4));
      pw.style.setProperty("--lit", lit.toFixed(4));
      pw.style.setProperty("--pulse", pulse.toFixed(4));
      if (isHero) pw.style.setProperty("--intro", easeOut(INTRO).toFixed(4));
      var plate = pw.firstElementChild;
      if (plate) plate.classList.toggle("gone", exit >= 1);
      var txts = pw.querySelectorAll(".txt");
      for (var k = 0; k < txts.length; k++) txts[k].classList.toggle("on", isHero ? INTRO > 0.4 : enter > 0.72);
      if (isHero && mimic) {
        var ph = !heroAuto && r.height > H + 1 ? (stay < 0.33 ? "ph0" : stay < 0.66 ? "ph1" : "ph2") : ["ph0", "ph1", "ph2"][Math.floor(Date.now() / 2600) % 3];
        if (!mimic.classList.contains(ph)) { mimic.classList.remove("ph0", "ph1", "ph2"); mimic.classList.add(ph); }
      }
    }
    var y = W.pageYOffset, dy = y - lastY;
    if (y < HDR() * 2 || doc.body.classList.contains("menu-open")) doc.body.classList.remove("hdr-hide");
    else if (dy > 6) doc.body.classList.add("hdr-hide");
    else if (dy < -6) doc.body.classList.remove("hdr-hide");
    if (Math.abs(dy) > 6) lastY = y;
    var sticky = doc.getElementById("sticky"), zay = doc.getElementById("zayavka");
    if (sticky) {
      var show = W.pageYOffset > H * 0.55;
      if (zay && zay.getBoundingClientRect().top < H * 0.6) show = false;
      sticky.classList.toggle("show", show);
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  W.addEventListener("scroll", onScroll, { passive: true });
  setInterval(function () { if (pws[0] && (W.innerWidth < 900 || pws[0].offsetHeight <= W.innerHeight + 1) && W.pageYOffset < pws[0].offsetHeight) onScroll(); }, 650);
  W.addEventListener("resize", function () { fitText(); onScroll(); updateRails(); });
  function runIntro(ts) {
    if (!introStart) introStart = ts;
    INTRO = clamp((ts - introStart) / 1250);
    update();
    if (INTRO < 1) requestAnimationFrame(runIntro);
  }

  /* ---------- Ленты со стрелками ---------- */
  var rails = [].slice.call(doc.querySelectorAll(".rail"));
  function railStep(rail) {
    var card = rail.firstElementChild; if (!card) return 300;
    var gap = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 16;
    return card.getBoundingClientRect().width + gap;
  }
  function updateRail(rail) {
    var btns = doc.querySelectorAll('.arr[data-for="' + rail.id + '"]');
    var max = rail.scrollWidth - rail.clientWidth;
    var none = max <= 1;
    [].forEach.call(btns, function (b) {
      b.hidden = none;
      var dir = +b.getAttribute("data-dir");
      b.disabled = dir < 0 ? rail.scrollLeft <= 1 : rail.scrollLeft >= max - 1;
    });
  }
  function updateRails() { rails.forEach(updateRail); }
  rails.forEach(function (rail) {
    rail.addEventListener("scroll", function () { updateRail(rail); }, { passive: true });
    updateRail(rail);
  });
  [].forEach.call(doc.querySelectorAll(".arr[data-for]"), function (b) {
    b.addEventListener("click", function () {
      var rail = doc.getElementById(b.getAttribute("data-for")); if (!rail) return;
      rail.scrollBy({ left: railStep(rail) * (+b.getAttribute("data-dir")), behavior: REDUCED ? "auto" : "smooth" });
    });
  });

  /* ---------- Проявление секций ---------- */
  var rv = [].slice.call(doc.querySelectorAll(".rv"));
  if ("IntersectionObserver" in W) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  /* ---------- Форма -> WhatsApp ---------- */
  var form = doc.getElementById("form"), thanks = doc.getElementById("thanks"), ferr = doc.getElementById("ferr");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      if (f.website && f.website.value) { form.hidden = true; if (thanks) thanks.hidden = false; return; }
      var name = f.name.value.trim(), phone = f.phone.value.trim();
      var bad = false;
      f.name.classList.toggle("bad", !name); f.phone.classList.toggle("bad", phone.replace(/\D/g, "").length < 10);
      bad = !name || phone.replace(/\D/g, "").length < 10;
      if (bad) { if (ferr) ferr.hidden = false; (!name ? f.name : f.phone).focus(); return; }
      if (ferr) ferr.hidden = true;
      var L = FORM_LABELS[LANG] || FORM_LABELS.ru;
      var dirSel = f.direction, dirText = dirSel.options[dirSel.selectedIndex].text;
      var lines = [L.head, L.name + ": " + name];
      if (f.company.value.trim()) lines.push(L.company + ": " + f.company.value.trim());
      lines.push(L.phone + ": " + phone, L.dir + ": " + dirText);
      if (f.city.value.trim()) lines.push(L.city + ": " + f.city.value.trim());
      if (f.message.value.trim()) lines.push(L.msg + ": " + f.message.value.trim());
      var url = "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(lines.join("\n"));
      W.open(url, "_blank", "noopener");
      form.hidden = true; if (thanks) thanks.hidden = false;
    });
  }

  /* ---------- Старт ---------- */
  function start() {
    fitText();
    if (location.hash.length > 1) {
      var id = location.hash.slice(1);
      goTo(id, true);
      setTimeout(function () { goTo(id, true); update(); }, 60);
      setTimeout(function () { goTo(id, true); update(); }, 500);
    }
    update();
    if (INTRO < 1) requestAnimationFrame(runIntro);
    updateRails();
  }
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { fitText(); update(); });
  if (doc.readyState === "complete") start(); else W.addEventListener("load", start);
  update();
})();

/* Видео склада: немая петля по видимости, полный ролик со звуком по кнопке */
(function () {
  var box = document.getElementById("skVideo");
  if (!box) return;
  var v = box.querySelector("video"), btn = box.querySelector(".sk-play");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  v.addEventListener("playing", function () { if (!box.classList.contains("is-full")) box.classList.add("is-live"); });
  if (!reduce && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (box.classList.contains("is-full")) return;
        if (x.isIntersecting) {
          if (!v.getAttribute("src")) v.setAttribute("src", v.getAttribute("data-src"));
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }, { threshold: 0.45 }).observe(box);
  }
  btn.addEventListener("click", function () {
    box.classList.remove("is-live"); box.classList.add("is-full");
    v.removeAttribute("aria-hidden");
    v.loop = false; v.muted = false; v.controls = true;
    v.setAttribute("src", btn.getAttribute("data-full"));
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  });
})();
