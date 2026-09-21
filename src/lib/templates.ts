import { AutomationPreset } from "@/types/agent";

export const AUTOMATION_PRESETS: AutomationPreset[] = [
  {
    id: "oneshot-camera-audit",
    name: "OneShot Camera Equipment Audit",
    nameAr: "فحص وتدقيق معدات كاميرات OneShot",
    category: "E-Commerce",
    description: "Navigate to 1shotcam.com, inspect camera gear availability, extract specifications, and capture preview.",
    descriptionAr: "الانتقال إلى موقع 1shotcam.com وفحص توفر معدات التصوير واستخراج المواصفات والتقاط لقطة شاشة.",
    targetUrl: "https://1shotcam.com/cameras/flagship",
    prompt: "Open 1shotcam.com, search for latest 8K cinema gear, extract prices and verify inventory.",
    steps: [
      {
        title: "Initialize Session & Navigate",
        titleAr: "بدء الجلسة والتنقل إلى المتجر",
        description: "Launch browser context with stealth headers and open 1shotcam.com",
        descriptionAr: "تشغيل المتصفح مع ترويسات التخفي وفتح المتجر الإلكتروني",
        actionType: "navigate",
        target: "https://1shotcam.com/cameras/flagship",
        codeSnippet: "await page.goto('https://1shotcam.com/cameras/flagship', { waitUntil: 'networkidle' });",
        reasoning: "Establish connection and wait for dynamic hydration."
      },
      {
        title: "Search Cinema Gear",
        titleAr: "البحث عن معدات السينما",
        description: "Click on the search input, type 'OneShot Cinema Pro 8K' and submit",
        descriptionAr: "النقر على شريط البحث وكتابة OneShot Cinema Pro 8K والإرسال",
        actionType: "type",
        selector: "input[name='search']",
        inputData: "OneShot Cinema Pro 8K",
        coordinates: { x: 380, y: 120 },
        codeSnippet: "await page.locator(\"input[name='search']\").fill('OneShot Cinema Pro 8K');\nawait page.keyboard.press('Enter');",
        reasoning: "AI Vision identified search input at relative coordinates [380, 120]."
      },
      {
        title: "Filter Inventory by Stock",
        titleAr: "تصفية المنتجات حسب التوفر",
        description: "Click 'In Stock' filter checkbox",
        descriptionAr: "النقر على خانة الاختيار للمنتجات المتوفرة فقط",
        actionType: "click",
        selector: "button#filter-instock",
        coordinates: { x: 210, y: 280 },
        codeSnippet: "await page.locator('button#filter-instock').click();",
        reasoning: "Narrow down items to immediately available inventory."
      },
      {
        title: "Extract Specifications & Pricing",
        titleAr: "استخراج المواصفات والأسعار",
        description: "Scrape product title, sensor dimensions, resolution, and price in SAR/USD",
        descriptionAr: "استخلاص اسم الكاميرا، مواصفات الحساس، والدقة، والسعر بالريال/الدولار",
        actionType: "extract",
        selector: ".product-card-details",
        codeSnippet: "const data = await page.$$eval('.product-card', cards => cards.map(c => ({\n  name: c.querySelector('h3')?.innerText,\n  price: c.querySelector('.price')?.innerText\n})));",
        reasoning: "Gemini Vision parsed table elements into structured JSON."
      },
      {
        title: "Capture Proof of Audit Screenshot",
        titleAr: "التقاط لقطة شاشة للتوثيق",
        description: "Take high-resolution full-page screenshot for audit report",
        descriptionAr: "حفظ لقطة شاشة كاملة عالية الدقة لتقرير الفحص الدوري",
        actionType: "screenshot",
        codeSnippet: "await page.screenshot({ path: 'oneshot-audit.png', fullPage: true });",
        reasoning: "Save audit proof artifact to session folder."
      }
    ]
  },
  {
    id: "nearpay-telr-payment-test",
    name: "Payment Gateway Verification (NearPay / Telr)",
    nameAr: "اختبار والتحقق من بوابات الدفع (NearPay / Telr)",
    category: "Fintech",
    description: "Automate sandbox checkout, input test card tokens, and verify webhook response status.",
    descriptionAr: "أتمتة عملية الدفع التجريبية وإدخال بيانات بطاقة الاختبار والتحقق من حالة الدفع.",
    targetUrl: "https://secure.telr.com/gateway/order/test-checkout",
    prompt: "Go to payment portal, simulate checkout with test Mada card, and verify receipt token.",
    steps: [
      {
        title: "Open Checkout Gateway",
        titleAr: "فتح بوابة الدفع",
        description: "Navigate to secure payment gateway sandbox URL",
        descriptionAr: "الانتقال إلى الرابط الآمن لبوابة الدفع التجريبية",
        actionType: "navigate",
        target: "https://secure.telr.com/gateway/order/test-checkout",
        codeSnippet: "await page.goto('https://secure.telr.com/gateway/order/test-checkout');",
        reasoning: "Render Telr/NearPay hosted payment fields."
      },
      {
        title: "Inject Secure Card Credentials",
        titleAr: "تعبئة حقول البطاقة البنكية",
        description: "Fill Cardholder Name, Card Number, Expiry Date, and CVV",
        descriptionAr: "إدخال اسم حامل البطاقة ورقم البطاقة وتاريخ الانتهاء والرمز السري",
        actionType: "type",
        selector: "input#card-number",
        inputData: "4000 1234 5678 9010",
        coordinates: { x: 450, y: 340 },
        codeSnippet: "await page.locator('#card-holder').fill('OneShot Test User');\nawait page.locator('#card-number').fill('4000123456789010');\nawait page.locator('#card-expiry').fill('12/28');\nawait page.locator('#card-cvv').fill('123');",
        reasoning: "Simulate keyboard input with natural keystroke timing."
      },
      {
        title: "Confirm Payment & Await 3D Secure",
        titleAr: "تأكيد الدفع وانتظار التوثيق 3DS",
        description: "Click 'Pay Now' and listen for 3DS OTP iframe callback",
        descriptionAr: "الضغط على 'ادفع الآن' وانتظار نافذة توثيق الرمز السري",
        actionType: "click",
        selector: "button.btn-pay",
        coordinates: { x: 450, y: 490 },
        codeSnippet: "await page.locator('button.btn-pay').click();\nawait page.waitForSelector('.payment-status-success', { timeout: 15000 });",
        reasoning: "Trigger payment intent and poll for success token."
      },
      {
        title: "Verify Transaction Receipt",
        titleAr: "التحقق من إيصال المعاملة",
        description: "Extract Reference ID, Authorization Code, and Amount",
        descriptionAr: "استخراج الرقم المرجعي للعملية، كود التفويض، والمبلغ",
        actionType: "extract",
        selector: ".receipt-summary",
        codeSnippet: "const txn = await page.locator('.receipt-summary').innerText();",
        reasoning: "Confirm transaction marked 'APPROVED' with reference token."
      }
    ]
  },
  {
    id: "lead-data-extractor",
    name: "AI Web Scraper & Intelligence Gathering",
    nameAr: "استخراج البيانات والذكاء التنافسي بالذكاء الاصطناعي",
    category: "Data Extraction",
    description: "Scan target business directory or catalogue, extract structured fields, and output JSON.",
    descriptionAr: "مسح دليل الأعمال أو الكتالوج، واستخراج حقول البيانات المنظمة بصيغة JSON.",
    targetUrl: "https://directory.oneshot.ai/studios",
    prompt: "Extract all photography studios, contact emails, and pricing tier information into a table.",
    steps: [
      {
        title: "Navigate to Directory Index",
        titleAr: "التنقل إلى دليل الاستوديوهات",
        description: "Open directory portal and dismiss cookie consent banner",
        descriptionAr: "فتح دليل الاستوديوهات وإغلاق نافذة ملفات تعريف الارتباط",
        actionType: "navigate",
        target: "https://directory.oneshot.ai/studios",
        codeSnippet: "await page.goto('https://directory.oneshot.ai/studios');",
        reasoning: "Load target index with dynamic listing elements."
      },
      {
        title: "Auto-Scroll Infinite Feed",
        titleAr: "التمرير التلقائي لتحميل المزيد",
        description: "Smooth scroll down 3 viewports to trigger lazy-loaded records",
        descriptionAr: "التمرير الذكي لأسفل لتحميل السجلات الإضافية بالكامل",
        actionType: "scroll",
        codeSnippet: "await page.evaluate(async () => {\n  for (let i = 0; i < 3; i++) {\n    window.scrollBy(0, window.innerHeight);\n    await new Promise(r => setTimeout(r, 600));\n  }\n});",
        reasoning: "Ensure all DOM nodes are rendered before extraction."
      },
      {
        title: "Computer Use Element Recognition",
        titleAr: "التعرف البصري على بطاقات البيانات",
        description: "AI vision segments studio cards and identifies contact emails",
        descriptionAr: "تحليل بصري لعناصر البطاقات وتحديد البريد الإلكتروني والهواتف",
        actionType: "extract",
        selector: ".studio-card",
        codeSnippet: "const studios = await page.$$eval('.studio-card', nodes => nodes.map(n => ({\n  name: n.querySelector('.title')?.textContent?.trim(),\n  phone: n.querySelector('.phone')?.textContent?.trim(),\n  rating: n.querySelector('.rating')?.textContent?.trim()\n})));",
        reasoning: "Parsed 18 directory items with 100% selector confidence."
      }
    ]
  }
];
