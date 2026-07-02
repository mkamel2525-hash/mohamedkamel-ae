/* ============================================================
   Sara Kamel — multilingual engine (EN · العربية · Русский)
   - English baseline is auto-captured from the DOM
   - Arabic & Russian strings authored below
   - Switches in place, sets dir=rtl for Arabic, remembers choice
   ============================================================ */
(function () {
  'use strict';
  var STORE = 'mk_lang';
  var RTL = ['ar'];
  var EN = {};          // auto-captured English baseline
  var current = 'en';

  /* ---- Arabic & Russian dictionaries (keyed by data-i18n) ---- */
  var DICT = {
    ar: {
      'nav.about': 'نبذة', 'nav.services': 'الخدمات', 'nav.developers': 'المطوّرون',
      'nav.listings': 'العقارات', 'nav.calculator': 'الحاسبة', 'nav.contact': 'تواصل',
      'nav.cta': 'احجز استشارة',

      'hero.eyebrow': 'استشارات عقارية خاصة — دبي وأبوظبي',
      'hero.subtitle': 'مستشارة العقارات الفاخرة في دبي',
      'hero.role': 'مستشارة عقارية · ديلوكس هومز العقارية',
      'hero.s1': 'على الخارطة', 'hero.s2': 'العقارات الفاخرة', 'hero.s3': 'السوق الثانوي',
      'hero.s4': 'الاستشارات الاستثمارية', 'hero.s5': 'إدارة المحافظ',
      'hero.wa': 'واتساب سارة', 'hero.book': 'احجز استشارة خاصة',
      'hero.status': 'متاحة لاستشارات خاصة — ',
      'hero.rera': 'معتمدة من ريرا · دائرة الأراضي والأملاك بدبي',
      'glass.sales': 'إجمالي المبيعات', 'glass.coverage': 'نطاق التغطية',
      'glass.coverageVal': 'دبي وأبوظبي', 'glass.partners': 'شركاء من المطوّرين',
      'hero.scroll': 'مرّر',

      'trust.label': 'وصول موثوق إلى أبرز المطوّرين في المنطقة',

      'about.eyebrow': 'نبذة',
      'about.title': 'استشارات خاصة مبنية على الخبرة',
      'about.lead': 'سارة كامل مستشارة عقارية استراتيجية — وليست مجرد بائعة — تساعد المستثمرين على بناء محافظ عقارية متميّزة وتنميتها وإدارتها في دبي وأبوظبي.',
      'about.text': 'بصفتها مستشارة عقارية في ديلوكس هومز العقارية، تجمع بين فهمٍ دقيق للسوق ووصولٍ مميّز إلى المطوّرين — مع التركيز على الثروة طويلة الأمد لا مجرد الصفقات.',
      'about.hi1': 'مبيعات تتجاوز 150 مليون درهم', 'about.hi2': 'خبرة في دبي وأبوظبي',
      'about.hi3': 'وصول إلى كبار المطوّرين', 'about.hi4': 'استشارات تركّز على المستثمر',
      'about.hi5': 'إدارة المحافظ العقارية', 'about.cta': 'رتّب لقاءً تعريفياً',

      'services.eyebrow': 'الخدمات',
      'services.title': 'استشارات تغطّي دورة الاستثمار الكاملة',
      'svc1.t': 'استشارات العقارات الفاخرة', 'svc1.d': 'وصول خاص إلى أرقى المساكن والمنازل الموقّعة في دبي وأبوظبي.',
      'svc2.t': 'استشارات الاستثمار على الخارطة', 'svc2.d': 'وصول مبكر إلى أبرز المشاريع في المنطقة، مصمّمة لنمو رأس المال.',
      'svc3.t': 'استشارات السوق الثانوي', 'svc3.d': 'شراء وبيع العقارات الجاهزة بسرّية — تقييم وتفاوض ووصول إلى صفقات حصرية في أرقى المجتمعات.',
      'svc4.t': 'استراتيجية الاستثمار العقاري', 'svc4.d': 'استراتيجيات قائمة على البيانات تربط كل صفقة بأهدافك المالية.',
      'svc5.t': 'إدارة المحافظ العقارية', 'svc5.d': 'إدارة متكاملة لأصولك العقارية — من العائد حتى التخارج.',
      'svc6.t': 'استشارات الإقامة الذهبية', 'svc6.d': 'مسارات إقامة مدعومة بالعقار لك ولعائلتك في الإمارات.',
      'svc7.t': 'الاستثمار في منازل العطلات', 'svc7.d': 'أصول راقية للإقامة القصيرة تجمع بين أسلوب الحياة والعائد.',

      'devs.eyebrow': 'خبرة المطوّرين',
      'devs.title': 'وصول مميّز. قناعة مبنية على المعرفة.',
      'devs.sub': 'اضغط على أي مطوّر لاستعراض مكانته ومجتمعاته ورؤيته الاستثمارية.',
      'dev.lbl.positioning': 'المكانة', 'dev.lbl.community': 'الخبرة بالمجتمعات',
      'dev.lbl.thesis': 'الرؤية الاستثمارية', 'dev.lbl.launches': 'أحدث المشاريع',
      'dev.pricing': 'أسعار بداية وخطط سداد استرشادية — تأكّد من الأحدث مع سارة.',
      'dev.wa': 'احصل على أحدث الأسعار وخطط السداد →', 'dev.toggle': 'عرض المشاريع',

      'listings.eyebrow': 'جاهز · السوق الثانوي',
      'listings.title': 'عقارات جاهزة مختارة',
      'listings.sub': 'عقارات جاهزة مختارة للبيع والإيجار طويل الأمد في دبي — التفاصيل والصور كاملة على Property Finder.',
      'listing.tagSale': 'جاهز · للبيع', 'listing.tagRent': 'للإيجار · طويل الأمد',
      'listing.price': 'اعرض السعر والصور →',
      'listing.viewPF': 'عرض على Property Finder ↗', 'listing.enquire': 'استفسر عبر واتساب',

      'calc.eyebrow': 'دخل منزل العطلات',
      'calc.title': 'احسب عوائد الإيجار قصير الأمد',
      'calc.sub': 'تقدير استرشادي لدخلك السنوي من منزل العطلات (Airbnb) في دبي — حسب الموقع وقيمة العقار.',
      'calc.valueLabel': 'قيمة العقار (درهم)', 'calc.zoneLabel': 'الموقع',
      'calc.zone1': 'نخلة جميرا / وسط المدينة / المارينا / JBR — مميّز',
      'calc.zone2': 'الخليج التجاري / كريك هاربر / دبي هيلز — طلب مرتفع',
      'calc.zone3': 'JVC / الفرجان / دبي لاند — قيمة',
      'calc.zone4': 'مناطق أخرى / مجتمعات ناشئة',
      'calc.btn': 'احسب الدخل المتوقّع',
      'calc.gross': 'الدخل الإجمالي التقديري / سنوياً',
      'calc.net': 'الدخل الصافي التقديري / سنوياً <small>(بعد خصم ~25% تكاليف)</small>',
      'calc.month': 'الصافي التقريبي / شهرياً',
      'calc.cta': 'احصل على تقدير مخصّص عبر واتساب',
      'calc.note': 'تقدير إجمالي استرشادي فقط. تختلف العوائد الفعلية حسب الإشغال وسعر الليلة والموسم والرسوم والإدارة — وهي غير مضمونة. الأرقام قبل تكاليف الشراء. احجز استشارة خاصة لتقدير دقيق للعقار.',

      'consult.eyebrow': 'استشارة',
      'consult.title': 'ابدأ استشارتك الخاصة',
      'consult.lead': 'تبدأ كل علاقة بمحادثة سرّية. شاركنا أهدافك وسترد عليك سارة شخصياً.',
      'consult.role': 'مستشارة العقارات الفاخرة في دبي',
      'consult.email': 'البريد الإلكتروني',
      'chan.call': 'اتصال',
      'f.name': 'الاسم الكامل', 'f.whatsapp': 'واتساب', 'f.email': 'البريد الإلكتروني',
      'f.budget': 'ميزانية الاستثمار', 'f.location': 'الموقع المفضّل',
      'f.objective': 'هدف الاستثمار', 'f.message': 'رسالتك',
      'opt.b1': 'أقل من مليون درهم', 'opt.b2': '1–3 مليون درهم', 'opt.b3': '3–7 مليون درهم',
      'opt.b4': '7–15 مليون درهم', 'opt.b5': 'أكثر من 15 مليون درهم',
      'opt.l1': 'دبي', 'opt.l2': 'أبوظبي', 'opt.l3': 'دبي وأبوظبي', 'opt.l4': 'مرن',
      'opt.o1': 'نمو رأس المال', 'opt.o2': 'السوق الثانوي / عقار جاهز', 'opt.o3': 'عائد الإيجار',
      'opt.o4': 'الإقامة الذهبية', 'opt.o5': 'منزل عطلات', 'opt.o6': 'إدارة المحافظ', 'opt.o7': 'الحفاظ على الثروة',
      'consult.submit': 'احجز استشارة خاصة',
      'consult.note': 'نتعامل مع استفسارك بسرّية تامة.',

      'footer.role': 'مستشارة العقارات الفاخرة في دبي',
      'footer.tag': 'على الخارطة • فخامة • استثمار • إدارة محافظ',
      'footer.rera': 'معتمدة من ريرا · دائرة الأراضي والأملاك بدبي',
      'footer.office': 'المكتب',
      'footer.address': 'مكتب 701، برج كود التجاري،<br />البرشاء 1، دبي، الإمارات العربية المتحدة',
      'footer.company': 'ديلوكس هومز العقارية',
      'footer.connect': 'تواصل',
      'footer.copy': 'سارة كامل. جميع الحقوق محفوظة.',
      'footer.tagline': 'استشارات عقارية خاصة — دبي وأبوظبي'
    },

    ru: {
      'nav.about': 'О нас', 'nav.services': 'Услуги', 'nav.developers': 'Застройщики',
      'nav.listings': 'Объекты', 'nav.calculator': 'Калькулятор', 'nav.contact': 'Контакты',
      'nav.cta': 'Записаться',

      'hero.eyebrow': 'Частный консалтинг по недвижимости — Дубай и Абу-Даби',
      'hero.subtitle': 'Консультант по элитной недвижимости Дубая',
      'hero.role': 'Консультант по недвижимости · Deluxe Homes Real Estate',
      'hero.s1': 'Строящееся жильё', 'hero.s2': 'Элитная недвижимость', 'hero.s3': 'Вторичный рынок',
      'hero.s4': 'Инвестиционный консалтинг', 'hero.s5': 'Управление портфелем',
      'hero.wa': 'WhatsApp Саре', 'hero.book': 'Записаться на консультацию',
      'hero.status': 'Доступна для частных консультаций — ',
      'hero.rera': 'Сертифицирована RERA · Земельный департамент Дубая',
      'glass.sales': 'Объём продаж', 'glass.coverage': 'Регионы',
      'glass.coverageVal': 'Дубай и Абу-Даби', 'glass.partners': 'Партнёры-застройщики',
      'hero.scroll': 'Листайте',

      'trust.label': 'Надёжный доступ к ведущим застройщикам региона',

      'about.eyebrow': 'О нас',
      'about.title': 'Частный консалтинг, основанный на опыте',
      'about.lead': 'Сара Камель — стратегический консультант по недвижимости, а не продавец. Она помогает инвесторам создавать, развивать и управлять премиальными портфелями в Дубае и Абу-Даби.',
      'about.text': 'Будучи консультантом по недвижимости в Deluxe Homes Real Estate, она сочетает глубокое знание рынка с привилегированным доступом к застройщикам — с акцентом на долгосрочный капитал, а не на разовые сделки.',
      'about.hi1': 'Объём продаж более 150 млн AED', 'about.hi2': 'Экспертиза в Дубае и Абу-Даби',
      'about.hi3': 'Доступ к ведущим застройщикам', 'about.hi4': 'Консалтинг в интересах инвестора',
      'about.hi5': 'Управление портфелем', 'about.cta': 'Договориться о встрече',

      'services.eyebrow': 'Услуги',
      'services.title': 'Консалтинг на всех этапах инвестиций',
      'svc1.t': 'Консалтинг по элитной недвижимости', 'svc1.d': 'Закрытый доступ к самым эксклюзивным резиденциям и брендированному жилью Дубая и Абу-Даби.',
      'svc2.t': 'Консалтинг по off-plan инвестициям', 'svc2.d': 'Ранний доступ к самым привлекательным проектам региона, ориентированным на рост капитала.',
      'svc3.t': 'Консалтинг по вторичному рынку', 'svc3.d': 'Покупка и конфиденциальная продажа готовых объектов — оценка, переговоры и доступ к закрытым сделкам в лучших районах.',
      'svc4.t': 'Стратегия инвестиций в недвижимость', 'svc4.d': 'Стратегии на основе данных, увязывающие каждую покупку с вашими финансовыми целями.',
      'svc5.t': 'Управление портфелем', 'svc5.d': 'Полное сопровождение ваших объектов — от доходности до выхода из инвестиции.',
      'svc6.t': 'Консалтинг по Golden Visa', 'svc6.d': 'Пути получения резидентства через недвижимость для вас и вашей семьи в ОАЭ.',
      'svc7.t': 'Инвестиции в курортное жильё', 'svc7.d': 'Премиальные объекты для краткосрочной аренды, сочетающие образ жизни и доходность.',

      'devs.eyebrow': 'Экспертиза по застройщикам',
      'devs.title': 'Привилегированный доступ. Обоснованная уверенность.',
      'devs.sub': 'Нажмите на застройщика, чтобы увидеть позиционирование, районы и инвестиционную идею.',
      'dev.lbl.positioning': 'Позиционирование', 'dev.lbl.community': 'Районы и проекты',
      'dev.lbl.thesis': 'Инвестиционная идея', 'dev.lbl.launches': 'Последние проекты',
      'dev.pricing': 'Ориентировочные стартовые цены и планы оплаты — уточняйте актуальные у Сары.',
      'dev.wa': 'Узнать актуальные цены и планы оплаты →', 'dev.toggle': 'Смотреть проекты',

      'listings.eyebrow': 'Готовое · Вторичный рынок',
      'listings.title': 'Избранные готовые объекты',
      'listings.sub': 'Тщательно отобранные готовые объекты для продажи и долгосрочной аренды в Дубае — все детали и фото на Property Finder.',
      'listing.tagSale': 'Готово · Продажа', 'listing.tagRent': 'Аренда · Долгосрочная',
      'listing.price': 'Цена и фото →',
      'listing.viewPF': 'Смотреть на Property Finder ↗', 'listing.enquire': 'Написать в WhatsApp',

      'calc.eyebrow': 'Доход от курортного жилья',
      'calc.title': 'Рассчитайте доход от краткосрочной аренды',
      'calc.sub': 'Ориентировочный прогноз вашего годового дохода от курортного жилья (Airbnb) в Дубае — на основе локации и стоимости объекта.',
      'calc.valueLabel': 'Стоимость объекта (AED)', 'calc.zoneLabel': 'Локация',
      'calc.zone1': 'Palm Jumeirah / Downtown / Marina / JBR — Премиум',
      'calc.zone2': 'Business Bay / Creek Harbour / Dubai Hills — Высокий спрос',
      'calc.zone3': 'JVC / Al Furjan / Dubailand — Доступно',
      'calc.zone4': 'Другие / Развивающиеся районы',
      'calc.btn': 'Рассчитать доход',
      'calc.gross': 'Ориентировочный валовой доход / год',
      'calc.net': 'Ориентировочный чистый доход / год <small>(после ~25% расходов)</small>',
      'calc.month': 'Примерно чистыми / месяц',
      'calc.cta': 'Получить индивидуальный расчёт в WhatsApp',
      'calc.note': 'Только ориентировочная валовая оценка. Реальная доходность зависит от загрузки, цены за ночь, сезона, комиссий и управления — и не гарантируется. Суммы указаны до расходов на покупку. Запишитесь на консультацию для точного расчёта по объекту.',

      'consult.eyebrow': 'Консультация',
      'consult.title': 'Начните частную консультацию',
      'consult.lead': 'Любое сотрудничество начинается с конфиденциального разговора. Расскажите о ваших целях, и Сара ответит лично.',
      'consult.role': 'Консультант по элитной недвижимости Дубая',
      'consult.email': 'Эл. почта',
      'chan.call': 'Позвонить',
      'f.name': 'Полное имя', 'f.whatsapp': 'WhatsApp', 'f.email': 'Эл. почта',
      'f.budget': 'Бюджет инвестиций', 'f.location': 'Предпочтительная локация',
      'f.objective': 'Цель инвестиций', 'f.message': 'Сообщение',
      'opt.b1': 'До 1 млн AED', 'opt.b2': '1–3 млн AED', 'opt.b3': '3–7 млн AED',
      'opt.b4': '7–15 млн AED', 'opt.b5': 'Более 15 млн AED',
      'opt.l1': 'Дубай', 'opt.l2': 'Абу-Даби', 'opt.l3': 'Дубай и Абу-Даби', 'opt.l4': 'Без предпочтений',
      'opt.o1': 'Рост капитала', 'opt.o2': 'Вторичный рынок / готовый объект', 'opt.o3': 'Арендный доход',
      'opt.o4': 'Golden Visa', 'opt.o5': 'Курортное жильё', 'opt.o6': 'Управление портфелем', 'opt.o7': 'Сохранение капитала',
      'consult.submit': 'Записаться на консультацию',
      'consult.note': 'Ваш запрос обрабатывается полностью конфиденциально.',

      'footer.role': 'Консультант по элитной недвижимости Дубая',
      'footer.tag': 'Off-Plan • Элитное • Инвестиции • Управление портфелем',
      'footer.rera': 'Сертифицирована RERA · Земельный департамент Дубая',
      'footer.office': 'Офис',
      'footer.address': 'Офис 701, Code Business Tower,<br />Аль-Барша 1, Дубай, ОАЭ',
      'footer.company': 'Deluxe Homes Real Estate',
      'footer.connect': 'Контакты',
      'footer.copy': 'Сара Камель. Все права защищены.',
      'footer.tagline': 'Частный консалтинг по недвижимости — Дубай и Абу-Даби'
    }
  };

  function captureEN(root) {
    var nodes = (root || document).querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute('data-i18n');
      if (EN[k] === undefined) EN[k] = nodes[i].innerHTML;
    }
  }

  function translate(lang, root) {
    var nodes = (root || document).querySelectorAll('[data-i18n]');
    var d = DICT[lang] || {};
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute('data-i18n');
      var v = (lang === 'en') ? EN[k] : (d[k] !== undefined ? d[k] : EN[k]);
      if (v !== undefined && nodes[i].innerHTML !== v) nodes[i].innerHTML = v;
    }
  }

  function setLang(lang) {
    if (!DICT[lang] && lang !== 'en') lang = 'en';
    current = lang;
    captureEN();
    var rtl = RTL.indexOf(lang) !== -1;
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    html.classList.toggle('rtl', rtl);
    translate(lang);
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    var opts = document.querySelectorAll('.lang-opt');
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle('is-active', opts[i].getAttribute('data-lang') === lang);
    }
    try { document.dispatchEvent(new CustomEvent('mk:langchange', { detail: lang })); } catch (e) {}
  }

  function stored() {
    try { return localStorage.getItem(STORE) || 'en'; } catch (e) { return 'en'; }
  }

  /* Public API — main.js calls refresh() after it builds developer cards */
  window.MKi18n = {
    setLang: setLang,
    refresh: function (root) { captureEN(root); translate(current, root); },
    current: function () { return current; }
  };

  function init() {
    captureEN();
    setLang(stored());
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lang-opt') : null;
      if (b) { e.preventDefault(); setLang(b.getAttribute('data-lang')); }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
