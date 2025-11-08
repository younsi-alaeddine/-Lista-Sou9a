import type { Preferences, ShoppingCategory, ShoppingItem } from './types'

export type LanguageKey = Preferences['language']

export type TranslationKey =
  | 'app.title'
  | 'app.tagline'
  | 'home.title'
  | 'home.subtitle'
  | 'home.viewItems'
  | 'category.total'
  | 'category.selected'
  | 'category.totalCost'
  | 'items.back'
  | 'items.toSummary'
  | 'items.searchPlaceholder'
  | 'items.quantityPlaceholder'
  | 'items.notePlaceholder'
  | 'items.categoryCost'
  | 'items.totalBudget'
  | 'items.priceUnit'
  | 'items.lineTotal'
  | 'items.seasonal'
  | 'summary.title'
  | 'summary.subtitle'
  | 'summary.empty'
  | 'summary.totalSelected'
  | 'summary.totalCost'
  | 'summary.categoryCost'
  | 'summary.lineCost'
  | 'summary.exportCsv'
  | 'summary.exportPdf'
  | 'summary.shareWhatsapp'
  | 'summary.shareEmail'
  | 'summary.shareSystem'
  | 'summary.clearAll'
  | 'summary.confirmClear'
  | 'settings.title'
  | 'settings.language'
  | 'settings.language.derja'
  | 'settings.language.fr'
  | 'settings.language.en'
  | 'settings.darkMode'
  | 'settings.darkMode.on'
  | 'settings.darkMode.off'
  | 'navbar.home'
  | 'navbar.items'
  | 'navbar.summary'
  | 'navbar.settings'
  | 'home.marketButton'
  | 'home.tipsButton'
  | 'home.aboutButton'
  | 'home.contactButton'
  | 'home.popupHint'
  | 'home.categoriesTitle'
  | 'home.categoriesSubtitle'
  | 'settings.budgetTitle'
  | 'settings.budgetPlaceholder'
  | 'settings.budgetApply'
  | 'settings.budgetReset'
  | 'settings.budgetCurrent'
  | 'settings.budgetNoTarget'
  | 'budget.title'
  | 'budget.subtitle'
  | 'budget.current'
  | 'budget.target'
  | 'budget.remaining'
  | 'budget.over'
  | 'budget.noTarget'
  | 'budget.historyTitle'
  | 'budget.historyEmpty'
  | 'budget.targetMarker'
  | 'suggestions.title'
  | 'suggestions.subtitle'
  | 'suggestions.frequentTitle'
  | 'suggestions.seasonalTitle'
  | 'suggestions.add'
  | 'suggestions.timesSelected'
  | 'price.unavailable'
  | 'export.pdfUnavailable'
  | 'export.languageLine'
  | 'export.quantityLine'
  | 'export.unitPriceLine'
  | 'export.subtotalLine'
  | 'export.noteLine'
  | 'export.pdfFontError'
  | 'export.pdfGenericError'
  | 'export.csv.product'
  | 'export.csv.quantity'
  | 'export.csv.unit'
  | 'export.csv.price'
  | 'export.csv.total'
  | 'export.csv.note'
  | 'footer.message'
  | 'footer.copyright'
  | 'footer.instagram'
  | 'home.actionsOpen'
  | 'home.actionsClose'
  | 'tutorial.title'
  | 'tutorial.subtitle'
  | 'tutorial.step1.title'
  | 'tutorial.step1.description'
  | 'tutorial.step2.title'
  | 'tutorial.step2.description'
  | 'tutorial.step3.title'
  | 'tutorial.step3.description'
  | 'tutorial.openButton'
  | 'about.title'
  | 'about.subtitle'
  | 'about.body'
  | 'tips.title'
  | 'tips.subtitle'
  | 'tips.item1'
  | 'tips.item2'
  | 'tips.item3'
  | 'tips.item4'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.emailLabel'
  | 'contact.emailValue'
  | 'contact.phoneLabel'
  | 'contact.phoneValue'
  | 'contact.form.name'
  | 'contact.form.message'
  | 'contact.form.submit'
  | 'contact.disclaimer'
  | 'market.title'
  | 'market.subtitle'
  | 'market.period.morning'
  | 'market.period.evening'
  | 'market.day.monday'
  | 'market.day.tuesday'
  | 'market.day.wednesday'
  | 'market.day.thursday'
  | 'market.day.friday'
  | 'market.day.saturday'
  | 'market.day.sunday'
  | 'market.morning.monday'
  | 'market.morning.tuesday'
  | 'market.morning.wednesday'
  | 'market.morning.thursday'
  | 'market.morning.friday'
  | 'market.morning.saturday'
  | 'market.morning.sunday'
  | 'market.evening.monday'
  | 'market.evening.tuesday'
  | 'market.evening.wednesday'
  | 'market.evening.thursday'
  | 'market.evening.friday'
  | 'market.evening.saturday'
  | 'market.evening.sunday'
  | 'comparison.title'
  | 'comparison.subtitle'
  | 'comparison.bestValue'
  | 'comparison.delivery'
  | 'comparison.total'
  | 'comparison.difference'
  | 'comparison.optionLabel'
  | 'seasonal.title'
  | 'seasonal.subtitle'
  | 'seasonal.cta'
  | 'share.subject'
  | 'share.bodyLine'
  | 'share.empty'

type TranslationRecord = Record<TranslationKey, string>

const categoryLabels: Record<ShoppingCategory, Record<LanguageKey, string>> = {
  vegetables: { derja: 'خضرة', fr: 'Légumes', en: 'Vegetables' },
  fruits: { derja: 'غلة', fr: 'Fruits', en: 'Fruits' },
  driedFruit: { derja: 'فواكه جافة', fr: 'Fruits secs', en: 'Dried fruit' },
  meat: { derja: 'لحوم', fr: 'Viandes', en: 'Meat' },
  seafood: { derja: 'أسماك', fr: 'Poisson', en: 'Seafood' },
  savoryPantry: { derja: 'مونة مالحة', fr: 'Épicerie salée', en: 'Savory pantry' },
  sweetPantry: { derja: 'مونة حلوة', fr: 'Épicerie sucrée', en: 'Sweet pantry' },
  cleaning: { derja: 'مواد تنظيف', fr: 'Entretien', en: 'Cleaning' },
  dairy: { derja: 'مشتقات الحليب', fr: 'Produits laitiers', en: 'Dairy' },
  snacks: { derja: 'سناكات', fr: 'Snacks', en: 'Snacks' },
  spices: { derja: 'عطارة', fr: 'Épices & huiles', en: 'Condiments & spices' },
  bakery: { derja: 'مخبوزات', fr: 'Boulangerie', en: 'Bakery' },
  canned: { derja: 'معلبات', fr: 'Conserves', en: 'Canned goods' },
  drinks: { derja: 'مشروبات', fr: 'Boissons', en: 'Drinks' },
  frozen: { derja: 'مجمدات', fr: 'Surgelés', en: 'Frozen' },
  baby: { derja: 'منتجات أطفال', fr: 'Produits bébé', en: 'Baby products' },
  personalCare: { derja: 'عناية شخصية', fr: 'Hygiène', en: 'Personal care' },
  household: { derja: 'منتجات منزلية', fr: 'Maison', en: 'Household' },
  pet: { derja: 'منتجات حيوانات', fr: 'Animaux', en: 'Pet supplies' },
  textile: { derja: 'منسوجات', fr: 'Textile', en: 'Textiles' },
  pharmacy: { derja: 'صيدلية', fr: 'Pharmacie', en: 'Pharmacy' },
  other: { derja: 'أخرى', fr: 'Autres', en: 'Other' },
}

const translations: Record<LanguageKey, TranslationRecord> = {
  derja: {
    'app.title': '🧺 Lista Sou9a',
    'app.tagline': 'حضّر قايمتك من السّوق التّونسي وخلّيها ديما معاك.',
    'home.title': 'شنوّة حاجتك اليوم؟',
    'home.subtitle': 'نظم سوقك، تبّع الميزانية واستعمل الأزرار اللي تحت باش تلقى كل التفاصيل.',
    'home.viewItems': 'تفرّج عالفئة',
    'category.total': '{count} منتوج',
    'category.selected': '{count} مختار',
    'category.totalCost': 'جاري {amount}',
    'items.back': 'رجوع',
    'items.toSummary': 'شوف الملخّص',
    'items.searchPlaceholder': 'دوّر على منتوج...',
    'items.quantityPlaceholder': 'الكمية',
    'items.notePlaceholder': 'ملاحظة',
    'items.categoryCost': 'مجموع الفئة: {amount}',
    'items.totalBudget': 'الإجمالي: {count} منتوج · {amount}',
    'items.priceUnit': 'السعر للوحدة: {price}',
    'items.lineTotal': 'المجموع: {total}',
    'items.seasonal': 'موسمي',
    'summary.title': 'ملخّص القايمة',
    'summary.subtitle': 'هاو المنتوجات اللي علّمت عليهم ✔️',
    'summary.empty': 'ما فما حتى منتوج معلّم عليه. بدّل الفئة وكمّل القايمة.',
    'summary.totalSelected': '{count} منتوج مختار',
    'summary.totalCost': 'المجموع: {amount}',
    'summary.categoryCost': '{amount}',
    'summary.lineCost': 'قيمة السلعة: {amount}',
    'summary.exportCsv': 'تصدير CSV',
    'summary.exportPdf': 'تصدير PDF',
    'summary.shareWhatsapp': 'شارك على واتساب',
    'summary.shareEmail': 'ابعت بالإيميل',
    'summary.shareSystem': 'شارك بالتليفون',
    'summary.clearAll': 'نظّف القايمة',
    'summary.confirmClear': 'متأكد تحب تنظّف الكل؟',
    'settings.title': 'الإعدادات',
    'settings.language': 'اللّغة',
    'settings.language.derja': 'دارجة تونسية',
    'settings.language.fr': 'فرنسية',
    'settings.language.en': 'إنقليزية',
    'settings.darkMode': 'الوضع الليلي',
    'settings.darkMode.on': 'مفعّل',
    'settings.darkMode.off': 'مطفى',
    'navbar.home': 'الرئيسية',
    'navbar.items': 'المنتوجات',
    'navbar.summary': 'الملخّص',
    'navbar.settings': 'إعدادات',
    'home.marketButton': 'دليل السوق',
    'home.tipsButton': 'نصايح الميزانية',
    'home.aboutButton': 'شكونّا؟',
    'home.contactButton': 'إتصل بينا',
    'home.popupHint': 'استعمل الأزرار العائمة لتفتح دليل السوق والنصايح وبقية المعلومات.',
    'home.categoriesTitle': 'شنوّة حاجتك اليوم؟',
    'home.categoriesSubtitle': 'إختر الفئة علّم على المنتوجات و حضّر الملخّص متاعك.',
    'settings.budgetTitle': 'هدف الميزانية',
    'settings.budgetPlaceholder': 'مثال: 120',
    'settings.budgetApply': 'ثبت المبلغ',
    'settings.budgetReset': 'نحي الهدف',
    'settings.budgetCurrent': 'الهدف الحالي: {amount}',
    'settings.budgetNoTarget': 'ما فماش هدف محدّد. حدّد واحد باش نعاونّوك.',
    'budget.title': 'مراقبة الميزانية',
    'budget.subtitle': 'تابع مصاريفك مقارنة بالهدف اللي حددتو.',
    'budget.current': 'المجموع الحالي: {amount}',
    'budget.target': 'الهدف: {amount}',
    'budget.remaining': 'تبقّى لك {amount} قبل ما توصّل للهدف.',
    'budget.over': 'تعدّيت الهدف بـ {amount}.',
    'budget.noTarget': 'حدّد هدف ميزانية من الإعدادات باش نجموا نقارنو.',
    'budget.historyTitle': 'التطوّر الأخير',
    'budget.historyEmpty': 'ما زلّاش عنا معطيات كافية. كمّل حضّر القايمة.',
    'budget.targetMarker': 'الهدف',
    'suggestions.title': 'اقتراحات ذكية',
    'suggestions.subtitle': 'منتوجات غالبًا تشريهم أو مناسبين للموسم.',
    'suggestions.frequentTitle': 'اللي ديما تحتاجهم',
    'suggestions.seasonalTitle': 'الاختيارات الموسمية',
    'suggestions.add': 'ضيف للقائمة',
    'suggestions.timesSelected': 'تمّ اختيارو {count} مرّات',
    'price.unavailable': 'السعر غير متوفّر حاليا',
    'export.pdfUnavailable': 'التصدير إلى PDF غير مدعوم حالياً للغة العربية.',
    'export.languageLine': 'اللغة: {language}',
    'export.quantityLine': 'الكمية: {quantity}{unit}',
    'export.unitPriceLine': 'السعر الفردي: {price}',
    'export.subtotalLine': 'المجموع الجزئي: {total}',
    'export.noteLine': 'ملاحظة: {note}',
    'export.pdfFontError': 'ما نجّمش نحمّل الخط العربي للتصدير. تأكّد من الأنترنت وجرّب مرّة أخرى.',
    'export.pdfGenericError': 'صار مشكل وقت التصدير للـ PDF. جرّب مرّة أخرى لو سمحت.',
    'export.csv.product': 'المُنتوج',
    'export.csv.quantity': 'الكمية',
    'export.csv.unit': 'الوحدة',
    'export.csv.price': 'السعر',
    'export.csv.total': 'المجموع',
    'export.csv.note': 'ملاحظة',
    'footer.message': 'ما نطلب كان دعاؤكم. ربي ينوّر طريقكم ويبارك فيكم ❤️',
    'footer.copyright': '© {year} Sou9a List · كل الحقوق محفوظة.',
    'footer.instagram': 'تابعونا على إنستغرام: {handle}',
    'home.actionsOpen': 'إفتح القائمة العائمة',
    'home.actionsClose': 'سكر القائمة العائمة',
    'tutorial.title': 'دليل سريع للاستعمال',
    'tutorial.subtitle': 'ثلاث خطوات بسيطة باش تحضّر قايمتك وتشاركها مع العائلة.',
    'tutorial.step1.title': 'اختار الفئات',
    'tutorial.step1.description': 'تفقد المنتوجات، دوّر بالبحث، وعلّم اللي حاجتك بيه.',
    'tutorial.step2.title': 'عدّل التفاصيل',
    'tutorial.step2.description': 'زيد الملاحظات والكمية لكل منتوج باش ما تنساش شيء.',
    'tutorial.step3.title': 'شارك أو صدّر',
    'tutorial.step3.description': 'استعمل الملخّص، شارك على واتساب أو نزل القايمة.',
    'tutorial.openButton': 'شوف الدليل',
    'about.title': 'شكونّا؟',
    'about.subtitle': 'مشروع صغير يعاون العائلات و الطلبة في تنظيم السوق.',
    'about.body':
      'Lista Sou9a هي قايمة رقمية تونسية معمولة باش تنظم الكل في بلاصة وحدة.\nنستقبل أفكارك باش نطورو البرمجية، ونشجع الناس على مشاركة تجربة السوق.',
    'tips.title': 'نصايح للميزانية',
    'tips.subtitle': 'حافظ على المصروف منظّم مهما تبدّل البرنامج الأسبوعي.',
    'tips.item1': 'حضّر قايمتك قبل ما تخرج وبدّلها حسب العروض اللي تلقاها.',
    'tips.item2': 'قسّم الميزانية الأسبوعية على الأيام وراقب المصروف بالملخّص.',
    'tips.item3': 'شرِ منتوجات الموسم: أرخص، أذكى، وأذوق.',
    'tips.item4': 'نحي المنتوجات اللي ما تحتاجهمش أو لاقي بديل من التخزين متاع الدار.',
    'contact.title': 'حاب تتواصل معانا؟',
    'contact.subtitle': 'ما نستقبلوش مكالمات، أما نجاوب على المايل في أقرب وقت.',
    'contact.emailLabel': 'الإيميل الرسمي',
    'contact.emailValue': 'younsialaeddine@gamil.com',
    'contact.phoneLabel': 'رقم الهاتف',
    'contact.phoneValue': '+216 29 131 769',
    'contact.form.name': 'اسمك أو اسم الدار',
    'contact.form.message': 'شنوّة تحب تقول؟',
    'contact.form.submit': 'ابعت الإيميل',
    'contact.disclaimer': 'تنجم تبعثلنا إيميل ولا تكلمنا مباشرة كان تحب.',
    'market.title': 'دليلك للسوق في جربة',
    'market.subtitle': 'برنامج الأسواق الأسبوعي باش تعرف وين تمشي وفي قايل شنو تلقى.',
    'market.period.morning': 'الصباح',
    'market.period.evening': 'العشية',
    'market.day.monday': 'الإثنين',
    'market.day.tuesday': 'الثلاثاء',
    'market.day.wednesday': 'الأربعاء',
    'market.day.thursday': 'الخميس',
    'market.day.friday': 'الجمعة',
    'market.day.saturday': 'السبت',
    'market.day.sunday': 'الأحد',
    'market.morning.monday': 'حومة السوق',
    'market.morning.tuesday': 'سدويكش',
    'market.morning.wednesday': 'مليتة',
    'market.morning.thursday': 'حومة السوق',
    'market.morning.friday': 'ميدون',
    'market.morning.saturday': 'الماي',
    'market.morning.sunday': 'أجيم و الرياض',
    'market.evening.monday': 'سدويكش',
    'market.evening.tuesday': 'قلالة',
    'market.evening.wednesday': 'مليتة',
    'market.evening.thursday': 'ميدون',
    'market.evening.friday': 'الماي',
    'market.evening.saturday': 'قلالة',
    'market.evening.sunday': 'حومة السوق',
    'comparison.title': 'قارنة بين المغازات',
    'comparison.subtitle': 'شوف وين تلقى نفس القايمة بأرخص سعر تقديري.',
    'comparison.bestValue': 'الأرخص',
    'comparison.delivery': 'توصيل: {amount}',
    'comparison.total': 'المجموع: {amount}',
    'comparison.difference': 'فرق +{amount}',
    'comparison.optionLabel': 'خيار رقم {index}',
    'seasonal.title': 'منتوجات الموسم',
    'seasonal.subtitle': 'أقوى ما في السوق التونسي هالأيّام',
    'seasonal.cta': 'شوف الفئة',
    'share.subject': 'قائمة السوق متاعي',
    'share.bodyLine': '{index}. {name} — {quantity}{unit}{note} · {total}',
    'share.empty': 'القائمة فارغة حالياً.',
  },
  fr: {
    'app.title': '🧺 Lista Sou9a',
    'app.tagline': 'Prépare ta liste du marché tunisien et garde-la toujours avec toi.',
    'home.title': 'De quoi as-tu besoin aujourd’hui ?',
    'home.subtitle': 'Organise tes courses, garde ta liste à jour et visualise chaque catégorie d’un coup d’œil.',
    'home.viewItems': 'Voir la catégorie',
    'category.total': '{count} produit(s)',
    'category.selected': '{count} sélectionné(s)',
    'category.totalCost': 'Total: {amount}',
    'items.back': 'Retour',
    'items.toSummary': 'Voir le résumé',
    'items.searchPlaceholder': 'Chercher un produit...',
    'items.quantityPlaceholder': 'Quantité',
    'items.notePlaceholder': 'Note',
    'items.categoryCost': 'Total catégorie : {amount}',
    'items.totalBudget': '{count} produit(s) · {amount}',
    'items.priceUnit': 'Prix unitaire : {price}',
    'items.lineTotal': 'Sous-total : {total}',
    'items.seasonal': 'De saison',
    'summary.title': 'Résumé de la liste',
    'summary.subtitle': 'Voici les produits cochés ✔️',
    'summary.empty': 'Aucun produit sélectionné pour le moment. Reviens aux catégories pour compléter ta liste.',
    'summary.totalSelected': '{count} produit(s) sélectionné(s)',
    'summary.totalCost': 'Total : {amount}',
    'summary.categoryCost': '{amount}',
    'summary.lineCost': 'Sous-total : {amount}',
    'summary.exportCsv': 'Exporter en CSV',
    'summary.exportPdf': 'Exporter en PDF',
    'summary.shareWhatsapp': 'Partager sur WhatsApp',
    'summary.shareEmail': 'Envoyer par e-mail',
    'summary.shareSystem': 'Partager depuis l’appareil',
    'summary.clearAll': 'Effacer la liste',
    'summary.confirmClear': 'Tu es sûr de vouloir tout effacer ?',
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.language.derja': 'Darja tunisienne',
    'settings.language.fr': 'Français',
    'settings.language.en': 'Anglais',
    'settings.darkMode': 'Mode sombre',
    'settings.darkMode.on': 'Activé',
    'settings.darkMode.off': 'Désactivé',
    'navbar.home': 'Accueil',
    'navbar.items': 'Produits',
    'navbar.summary': 'Résumé',
    'navbar.settings': 'Réglages',
    'home.marketButton': 'Marchés',
    'home.tipsButton': 'Astuces budget',
    'home.aboutButton': 'À propos',
    'home.contactButton': 'Contact',
    'home.popupHint': 'Utilise les boutons flottants pour ouvrir Marchés, Astuces, À propos et Contact.',
    'home.categoriesTitle': 'Que veux-tu aujourd’hui ?',
    'home.categoriesSubtitle': 'Choisis la catégorie, coche tes produits et prépare ton résumé.',
    'settings.budgetTitle': 'Objectif budget',
    'settings.budgetPlaceholder': 'ex : 150',
    'settings.budgetApply': 'Enregistrer',
    'settings.budgetReset': 'Réinitialiser',
    'settings.budgetCurrent': 'Objectif actuel : {amount}',
    'settings.budgetNoTarget': 'Aucun objectif défini pour le moment.',
    'budget.title': 'Suivi du budget',
    'budget.subtitle': 'Compare ton panier actuel à ton objectif de dépenses.',
    'budget.current': 'Total actuel : {amount}',
    'budget.target': 'Objectif : {amount}',
    'budget.remaining': 'Il reste {amount} avant d’atteindre l’objectif.',
    'budget.over': 'Dépassement de {amount} par rapport à l’objectif.',
    'budget.noTarget': 'Définis un objectif budget dans les réglages pour activer ce suivi.',
    'budget.historyTitle': 'Historique récent',
    'budget.historyEmpty': 'Encore aucun historique enregistré pour ce panier.',
    'budget.targetMarker': 'Objectif',
    'suggestions.title': 'Suggestions intelligentes',
    'suggestions.subtitle': 'Produits souvent achetés ou parfaits pour la saison.',
    'suggestions.frequentTitle': 'Tes incontournables',
    'suggestions.seasonalTitle': 'En ce moment',
    'suggestions.add': 'Ajouter',
    'suggestions.timesSelected': 'Ajouté {count} fois',
    'price.unavailable': 'Prix non disponible pour le moment',
    'export.pdfUnavailable': 'L’export PDF n’est pas encore disponible pour cette langue.',
    'export.languageLine': 'Langue : {language}',
    'export.quantityLine': 'Quantité : {quantity}{unit}',
    'export.unitPriceLine': 'Prix unitaire : {price}',
    'export.subtotalLine': 'Sous-total : {total}',
    'export.noteLine': 'Note : {note}',
    'export.pdfFontError': 'Impossible de charger la police arabe pour le PDF. Vérifie ta connexion et réessaie.',
    'export.pdfGenericError': 'Une erreur est survenue pendant l’export PDF. Réessaie plus tard.',
    'export.csv.product': 'Produit',
    'export.csv.quantity': 'Quantité',
    'export.csv.unit': 'Unité',
    'export.csv.price': 'Prix',
    'export.csv.total': 'Total',
    'export.csv.note': 'Note',
    'footer.message': 'On ne demande rien d’autre que vos prières. Merci et que Dieu vous protège ❤️',
    'footer.copyright': '© {year} Sou9a List · Tous droits réservés.',
    'footer.instagram': 'Suis-nous sur Instagram : {handle}',
    'home.actionsOpen': 'Ouvrir les actions rapides',
    'home.actionsClose': 'Fermer les actions rapides',
    'tutorial.title': 'Guide express',
    'tutorial.subtitle': 'Trois étapes pour préparer et partager ta liste en un clin d’œil.',
    'tutorial.step1.title': 'Choisir les catégories',
    'tutorial.step1.description': 'Parcours les produits, utilise la recherche et coche ce qu’il te faut.',
    'tutorial.step2.title': 'Ajouter les détails',
    'tutorial.step2.description': 'Ajoute quantité et notes à chaque article pour ne rien oublier.',
    'tutorial.step3.title': 'Partager ou exporter',
    'tutorial.step3.description': 'Ouvre le résumé, partage sur WhatsApp ou télécharge la liste.',
    'tutorial.openButton': 'Voir le guide',
    'about.title': 'À propos',
    'about.subtitle': 'Une app artisanale pour simplifier les courses tunisiennes.',
    'about.body':
      'Lista Sou9a est une liste digitale pensée pour les familles, étudiants et colocs.\nNous accueillons vos idées pour enrichir la base produits et améliorer l’expérience.',
    'tips.title': 'Astuces budget',
    'tips.subtitle': 'Garde la maîtrise de tes dépenses, même quand le plan change.',
    'tips.item1': 'Prépare ta liste avant de partir et ajuste-la selon les promos repérées.',
    'tips.item2': 'Répartis ton budget hebdomadaire par journée et suis-le grâce au résumé.',
    'tips.item3': 'Privilégie les produits de saison : plus frais et plus économiques.',
    'tips.item4': 'Retire les articles non essentiels ou pioche dans le stock de la maison.',
    'contact.title': 'Envie de nous contacter ?',
    'contact.subtitle': 'Écris-nous un e-mail ou appelle-nous : on te répond rapidement.',
    'contact.emailLabel': 'Adresse e-mail',
    'contact.emailValue': 'younsialaeddine@gamil.com',
    'contact.phoneLabel': 'Téléphone',
    'contact.phoneValue': '+216 29 131 769',
    'contact.form.name': 'Ton nom (ou foyer)',
    'contact.form.message': 'Ton message…',
    'contact.form.submit': 'Envoyer l’email',
    'contact.disclaimer': 'Tu peux nous écrire par mail ou nous joindre directement par téléphone.',
    'market.title': 'Les marchés de Djerba',
    'market.subtitle': 'Planifie ta tournée avec le calendrier hebdomadaire des souks.',
    'market.period.morning': 'Matin',
    'market.period.evening': 'Après-midi',
    'market.day.monday': 'Lundi',
    'market.day.tuesday': 'Mardi',
    'market.day.wednesday': 'Mercredi',
    'market.day.thursday': 'Jeudi',
    'market.day.friday': 'Vendredi',
    'market.day.saturday': 'Samedi',
    'market.day.sunday': 'Dimanche',
    'market.morning.monday': 'Houmet Souk',
    'market.morning.tuesday': 'Sedouikch',
    'market.morning.wednesday': 'Mellita',
    'market.morning.thursday': 'Houmet Souk',
    'market.morning.friday': 'Midoun',
    'market.morning.saturday': 'El May',
    'market.morning.sunday': 'Ajim & Riyadh',
    'market.evening.monday': 'Sedouikch',
    'market.evening.tuesday': 'Guellala',
    'market.evening.wednesday': 'Mellita',
    'market.evening.thursday': 'Midoun',
    'market.evening.friday': 'El May',
    'market.evening.saturday': 'Guellala',
    'market.evening.sunday': 'Houmet Souk',
    'comparison.title': 'Comparer les magasins',
    'comparison.subtitle': 'Estimation du panier selon les enseignes les plus connues.',
    'comparison.bestValue': 'Meilleur prix',
    'comparison.delivery': 'Livraison : {amount}',
    'comparison.total': 'Total : {amount}',
    'comparison.difference': '+{amount} vs moins cher',
    'comparison.optionLabel': 'Option {index}',
    'seasonal.title': 'Produits de saison',
    'seasonal.subtitle': 'Les incontournables du marché tunisien en ce moment',
    'seasonal.cta': 'Voir',
    'share.subject': 'Ma liste de courses',
    'share.bodyLine': '{index}. {name} — {quantity}{unit} {note} · {total}',
    'share.empty': 'La liste est vide pour l’instant.',
  },
  en: {
    'app.title': '🧺 Lista Sou9a',
    'app.tagline': 'Prepare your Tunisian market list and keep it with you.',
    'home.title': 'What do you need today?',
    'home.subtitle': 'Organize your shopping, keep your list up to date and see every category at a glance.',
    'home.viewItems': 'View category',
    'category.total': '{count} product(s)',
    'category.selected': '{count} selected',
    'category.totalCost': 'Total: {amount}',
    'items.back': 'Back',
    'items.toSummary': 'Go to summary',
    'items.searchPlaceholder': 'Search for a product...',
    'items.quantityPlaceholder': 'Quantity',
    'items.notePlaceholder': 'Note',
    'items.categoryCost': 'Category total: {amount}',
    'items.totalBudget': '{count} product(s) · {amount}',
    'items.priceUnit': 'Unit price: {price}',
    'items.lineTotal': 'Subtotal: {total}',
    'items.seasonal': 'Seasonal',
    'summary.title': 'List summary',
    'summary.subtitle': 'Here are the items you checked ✔️',
    'summary.empty': 'No product selected yet. Go back to the categories to complete your list.',
    'summary.totalSelected': '{count} product(s) selected',
    'summary.totalCost': 'Total: {amount}',
    'summary.categoryCost': '{amount}',
    'summary.lineCost': 'Subtotal: {amount}',
    'summary.exportCsv': 'Export CSV',
    'summary.exportPdf': 'Export PDF',
    'summary.shareWhatsapp': 'Share on WhatsApp',
    'summary.shareEmail': 'Send by email',
    'summary.shareSystem': 'Share from device',
    'summary.clearAll': 'Clear list',
    'summary.confirmClear': 'Are you sure you want to clear everything?',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.language.derja': 'Tunisian Darja',
    'settings.language.fr': 'French',
    'settings.language.en': 'English',
    'settings.darkMode': 'Dark mode',
    'settings.darkMode.on': 'On',
    'settings.darkMode.off': 'Off',
    'navbar.home': 'Home',
    'navbar.items': 'Products',
    'navbar.summary': 'Summary',
    'navbar.settings': 'Settings',
    'home.marketButton': 'Markets',
    'home.tipsButton': 'Budget tips',
    'home.aboutButton': 'About',
    'home.contactButton': 'Contact',
    'home.popupHint': 'Use the floating buttons to open Markets, Tips, About and Contact.',
    'home.categoriesTitle': 'What do you need today?',
    'home.categoriesSubtitle': 'Choose a category, check your products and build your summary.',
    'settings.budgetTitle': 'Budget goal',
    'settings.budgetPlaceholder': 'e.g. 120',
    'settings.budgetApply': 'Save goal',
    'settings.budgetReset': 'Reset goal',
    'settings.budgetCurrent': 'Current goal: {amount}',
    'settings.budgetNoTarget': 'No goal defined yet. Set one to start tracking.',
    'budget.title': 'Budget tracker',
    'budget.subtitle': 'Compare your spending with the target you set.',
    'budget.current': 'Current total: {amount}',
    'budget.target': 'Goal: {amount}',
    'budget.remaining': '{amount} remaining before reaching the goal.',
    'budget.over': 'Exceeded the goal by {amount}.',
    'budget.noTarget': 'Set a budget goal in settings to enable tracking.',
    'budget.historyTitle': 'Recent evolution',
    'budget.historyEmpty': 'No history yet. Select items to generate data.',
    'budget.targetMarker': 'Goal',
    'suggestions.title': 'Smart suggestions',
    'suggestions.subtitle': 'Items you often buy or seasonal picks.',
    'suggestions.frequentTitle': 'Your usual picks',
    'suggestions.seasonalTitle': 'Seasonal highlights',
    'suggestions.add': 'Add to list',
    'suggestions.timesSelected': 'Selected {count} times',
    'price.unavailable': 'Price unavailable for now',
    'export.pdfUnavailable': 'PDF export is not yet available for this language.',
    'export.languageLine': 'Language: {language}',
    'export.quantityLine': 'Quantity: {quantity}{unit}',
    'export.unitPriceLine': 'Unit price: {price}',
    'export.subtotalLine': 'Subtotal: {total}',
    'export.noteLine': 'Note: {note}',
    'export.pdfFontError': 'Unable to load the Arabic font for the PDF. Check your connection and try again.',
    'export.pdfGenericError': 'Something went wrong while exporting the PDF. Please try again.',
    'export.csv.product': 'Product',
    'export.csv.quantity': 'Quantity',
    'export.csv.unit': 'Unit',
    'export.csv.price': 'Price',
    'export.csv.total': 'Total',
    'export.csv.note': 'Note',
    'footer.message': 'All we ask for is your prayers. Thank you and may you stay blessed ❤️',
    'footer.copyright': '© {year} Sou9a List · All rights reserved.',
    'footer.instagram': 'Follow us on Instagram: {handle}',
    'home.actionsOpen': 'Open quick actions',
    'home.actionsClose': 'Close quick actions',
    'tutorial.title': 'Quick start guide',
    'tutorial.subtitle': 'Three steps to prepare and share your list.',
    'tutorial.step1.title': 'Pick categories',
    'tutorial.step1.description': 'Browse products, use the search and tick what you need.',
    'tutorial.step2.title': 'Add details',
    'tutorial.step2.description': 'Add quantity and notes to each item so nothing gets forgotten.',
    'tutorial.step3.title': 'Share or export',
    'tutorial.step3.description': 'Open the summary, share on WhatsApp or download the list.',
    'tutorial.openButton': 'View guide',
    'about.title': 'About',
    'about.subtitle': 'A handcrafted app to simplify Tunisian shopping.',
    'about.body':
      'Lista Sou9a is a digital list designed for families, students and roommates.\nWe welcome your ideas to enrich the product catalog and improve the experience.',
    'tips.title': 'Budget tips',
    'tips.subtitle': 'Keep control of your spending even when plans change.',
    'tips.item1': 'Prepare your list before leaving and adjust it based on promotions.',
    'tips.item2': 'Split your weekly budget across the days and monitor it via the summary.',
    'tips.item3': 'Favor seasonal products: fresher and usually cheaper.',
    'tips.item4': 'Remove non-essential items or use what you already have at home.',
    'contact.title': 'Want to contact us?',
    'contact.subtitle': 'Send us an email or give us a call, we’ll answer quickly.',
    'contact.emailLabel': 'Email address',
    'contact.emailValue': 'younsialaeddine@gamil.com',
    'contact.phoneLabel': 'Phone',
    'contact.phoneValue': '+216 29 131 769',
    'contact.form.name': 'Your name (or household)',
    'contact.form.message': 'Your message…',
    'contact.form.submit': 'Send email',
    'contact.disclaimer': 'You can reach us by email or directly by phone.',
    'market.title': 'Your guide to Djerba markets',
    'market.subtitle': 'Plan your week with the markets open morning and afternoon.',
    'market.period.morning': 'Morning',
    'market.period.evening': 'Afternoon',
    'market.day.monday': 'Monday',
    'market.day.tuesday': 'Tuesday',
    'market.day.wednesday': 'Wednesday',
    'market.day.thursday': 'Thursday',
    'market.day.friday': 'Friday',
    'market.day.saturday': 'Saturday',
    'market.day.sunday': 'Sunday',
    'market.morning.monday': 'Houmet Souk',
    'market.morning.tuesday': 'Sedouikch',
    'market.morning.wednesday': 'Mellita',
    'market.morning.thursday': 'Houmet Souk',
    'market.morning.friday': 'Midoun',
    'market.morning.saturday': 'El May',
    'market.morning.sunday': 'Ajim & Riyadh',
    'market.evening.monday': 'Sedouikch',
    'market.evening.tuesday': 'Guellala',
    'market.evening.wednesday': 'Mellita',
    'market.evening.thursday': 'Midoun',
    'market.evening.friday': 'El May',
    'market.evening.saturday': 'Guellala',
    'market.evening.sunday': 'Houmet Souk',
    'comparison.title': 'Compare stores',
    'comparison.subtitle': 'Estimated basket price at the main retailers.',
    'comparison.bestValue': 'Best price',
    'comparison.delivery': 'Delivery: {amount}',
    'comparison.total': 'Total: {amount}',
    'comparison.difference': '+{amount} vs cheapest',
    'comparison.optionLabel': 'Option {index}',
    'seasonal.title': 'Seasonal products',
    'seasonal.subtitle': 'The best of Tunisian markets right now',
    'seasonal.cta': 'See category',
    'share.subject': 'My shopping list',
    'share.bodyLine': '{index}. {name} — {quantity}{unit}{note} · {total}',
    'share.empty': 'The list is empty for now.',
  },
}

const formatString = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template
  return Object.entries(vars).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value))
  }, template)
}

export const translate = (language: LanguageKey, key: TranslationKey, vars?: Record<string, string | number>) => {
  const langPack = translations[language] ?? translations.derja
  const template = langPack[key] ?? translations.derja[key] ?? key
  return formatString(template, vars)
}

export const translateCategory = (language: LanguageKey, category: ShoppingCategory) => {
  const labels = categoryLabels[category]
  if (!labels) {
    return category
  }
  return labels[language] ?? labels.derja
}

export const translateItemName = (language: LanguageKey, item: Pick<ShoppingItem, 'labels'>) => {
  return item.labels[language] ?? item.labels.derja
}

export const translateItemUnit = (
  language: LanguageKey,
  item: Pick<ShoppingItem, 'unit' | 'unitLabels'>,
) => {
  if (item.unitLabels) {
    const label = item.unitLabels[language] ?? item.unitLabels.derja
    if (label) {
      return label
    }
  }
  return item.unit ?? ''
}

