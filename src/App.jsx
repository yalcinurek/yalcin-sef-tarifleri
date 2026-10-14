import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Yumurta", "Süt"];

// Metin temizleyici
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .trim();
};

// --- ANLAMSAL (SEMANTİK) MALZEME AYRIŞTIRICI ---
const BASE_INGREDIENTS = ['yufka', 'lavas', 'milfoy', 'ekmek', 'pide', 'makarna', 'pirinc', 'bulgur'];
const SAUCE_INGREDIENTS = ['sut', 'yumurta', 'yag', 'tereyagi', 'zeytinyagi', 'yoğurt', 'yogurt', 'krema'];

// 1. GENEL VE DİNAMİK MALZEME MOTORU
const generateRecipesFromIngredients = (ingredients, servings) => {
  if (!ingredients || ingredients.length === 0) return [];

  const normalizedInput = ingredients.map(i => ({ raw: i, norm: normalizeText(i) }));

  // Taban / Hamur malzemelerini ayıkla
  const baseItems = normalizedInput.filter(item => BASE_INGREDIENTS.some(b => item.norm.includes(b)));
  
  // İç Harç / Ana Malzemeleri ayıkla (Taban ve temel soslar dışındakiler)
  const fillingItems = normalizedInput.filter(
    item => !BASE_INGREDIENTS.some(b => item.norm.includes(b)) && !SAUCE_INGREDIENTS.some(s => item.norm.includes(s))
  );

  const mainFillingText = fillingItems.length > 0 
    ? fillingItems.map(i => i.raw).join(", ") 
    : "Sade / Peynirli";

  // --- MANTIK 1: YUFKA / MİLFÖY / BÖREK YAPIŞI ---
  if (baseItems.some(i => i.norm.includes('yufka') || i.norm.includes('milfoy'))) {
    return [
      {
        id: 'dynamic-borek',
        title: `Pratik Tava Böreği (${fillingItems.length > 0 ? fillingItems.map(i => i.raw).join(" & ") : "Özel Harçlı"})`,
        category: "Börek & Hamur İşleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Günlük Yufka`,
          ...fillingItems.map(item => `${(100 * servings)} gram / porsiyon ${item.raw}`),
          `${(0.5 * servings).toFixed(1)} çay bardağı Süt & Sıvı Yağ / Yumurta Karışımı (sos için)`,
          `${(1 * servings)} yemek kaşığı Tereyağı / Sıvı Yağ (tava için)`,
          `Tuz ve İsteğe Göre Baharatlar`
        ],
        steps: [
          `İç harç hazırlığı: (${mainFillingText}) malzemelerini temizleyip ince doğrayın. Gerekiyorsa az yağda Soğan ile soteleyip soğumaya bırakın.`,
          "Tavayı yağlayın. İlk yufkayı kenarları tavadan dışarı taşacak şekilde serin.",
          "Süt ve yağ karışımını yufkanın üzerine fırça ile sürün. Kalan yufkaları parçalayıp büzüştürerek tavaya yerleştirin.",
          `Hazırladığınız (${mainFillingText}) iç harcını eşit şekilde yufkanın üzerine yayın.`,
          "Tavadan taşan yufka kenarlarını içe doğru kapatın.",
          "Kapağı kapalı olarak kısık-orta ateşte altı kızarana kadar pişirin. Düz bir tabakla çevirip diğer yüzünü de kızartıp sıcak servis yapın."
        ]
      }
    ];
  }

  // --- MANTIK 2: LAVAŞ / DÜRÜM / SOKAK LEZZETİ ---
  if (baseItems.some(i => i.norm.includes('lavas') || i.norm.includes('ekmek') || i.norm.includes('pide'))) {
    return [
      {
        id: 'dynamic-durum',
        title: `Nefis Dürüm / Sandviç (${mainFillingText})`,
        category: "Dürüm & Sokak Lezzetleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Lavaş / Ekmek`,
          ...fillingItems.map(item => `${(120 * servings)} gram ${item.raw}`),
          `${(1 * servings)} yemek kaşığı Sos / Mayonez / Salça`,
          `Tuz ve Baharatlar`
        ],
        steps: [
          `Ana malzemelerinizi (${mainFillingText}) tavada yüksek ateşte soteleyin.`,
          "Lavaşı / ekmeği ısıtıp soslayın.",
          "Sotelenen malzemeleri ve garnitürleri ekleyip dürüm yapın ve tost makinesinde ısıtıp servis edin."
        ]
      }
    ];
  }

  // --- MANTIK 3: BALIK YEMEKLERİ ---
  if (normalizedInput.some(i => i.norm.includes('cupra') || i.norm.includes('hamsi') || i.norm.includes('balik') || i.norm.includes('levrek') || i.norm.includes('somon'))) {
    const isTava = normalizedInput.some(i => i.norm.includes('hamsi') || i.norm.includes('istavrit') || i.norm.includes('tava'));
    return [
      {
        id: 'dynamic-fish',
        title: `${ingredients.join(" & ").toUpperCase()} (${isTava ? "Tava" : "Fırında"})`,
        category: "Balık Yemekleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${ingredients.join(", ")})`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
          `${(0.5 * servings).toFixed(1)} adet Limon ve Soğan`,
          `Tuz, Karabiber ve Defne Yaprağı`
        ],
        steps: isTava ? [
          "Balıkları mısır ununa bulayıp kızgın tavada arkalı önlü kızartın."
        ] : [
          "Balıkları zeytinyağı, tuz ve limon ile marine edip fırında 200 derecede 25 dakika pişirin."
        ]
      }
    ];
  }

  // --- MANTIK 4: DİĞER TÜM BİLEŞİKLER İÇİN GENEL DİNAMİK MUTFAK MOTORU ---
  return [
    {
      id: 'dynamic-general',
      title: `${ingredients.join(" ve ").toUpperCase()} Sote / Yemeği`,
      category: "Pratik Ev Mutfakları",
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon / gram ${ing}`).concat([
        `${(1 * servings)} yemek kaşığı Zeytinyağı / Tereyağı`,
        `Tuz ve Baharatlar`
      ]),
      steps: [
        `Malzemelerinizi (${ingredients.join(", ")}) temizleyip doğrayın.`,
        `Uygun tavada veya tencerede yağ ile kendi suyunu çekene kadar pişirin.`,
        `Baharatlarını ekleyip sıcak servis edin.`
      ]
    }
  ];
};

// 2. YEMEK ADI İLE ARAMA MOTORU
const generateAdvancedRecipe = (query, servings) => {
  const norm = normalizeText(query);

  if (norm.includes('borek') || norm.includes('yufka')) {
    return {
      title: `${query.toUpperCase()} (Tava Böreği)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Börek & Hamur İşleri",
      detailedIngredients: [
        `${(1 * servings)} adet Yufka`,
        `${(100 * servings)} gram Özel Harç (${query})`,
        `${(0.5 * servings).toFixed(1)} çay bardağı Süt ve Sıvı Yağ`,
        `Tereyağı`
      ],
      steps: [
        "Tavayı yağlayıp yufkayı serin, harcı ekleyip kapatın ve arkalı önlü kızartın."
      ]
    };
  }

  if (norm.includes('cupra') || norm.includes('cipura') || norm.includes('hamsi') || norm.includes('levrek') || norm.includes('balik')) {
    return {
      title: `${query.toUpperCase()} (Fırında Limonlu)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Balık Yemekleri",
      detailedIngredients: [
        `${(1 * servings)} adet Temizlenmiş Balık (${query})`,
        `${(0.5 * servings).toFixed(1)} adet Limon ve Soğan`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Balığı zeytinyağı, limon ve tuz ile ovup fırında 200 derecede 25 dakika pişirin."
      ]
    };
  }

  return {
    title: `${query.toUpperCase()}`,
    servingsNote: `${servings} Kişilik Ölçü`,
    category: "Geleneksel Mutfak",
    detailedIngredients: [
      `${(150 * servings)} gram ${query} Malzemesi`,
      `${(1 * servings)} yemek kaşığı Yağ`,
      `Tuz ve Baharatlar`
    ],
    steps: [
      "Malzemeleri uygun teknikte pişirip sıcak servis edin."
    ]
  };
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(2);

  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddStaple = (e) => {
    e.preventDefault();
    if (!newStapleInput.trim()) return;
    if (!kitchenStaples.includes(newStapleInput.trim())) {
      setKitchenStaples([...kitchenStaples, newStapleInput.trim()]);
    }
    setNewStapleInput('');
  };

  const handleRemoveStaple = (item) => {
    setKitchenStaples(kitchenStaples.filter(s => s !== item));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!newIngredientInput.trim()) return;
    if (!userIngredients.includes(newIngredientInput.trim())) {
      setUserIngredients([...userIngredients, newIngredientInput.trim()]);
    }
    setNewIngredientInput('');
  };

  const handleRemoveIngredient = (item) => {
    setUserIngredients(userIngredients.filter(i => i !== item));
  };

  const ingredientRecipes = generateRecipesFromIngredients(userIngredients, servings);
  const searchRecipeResult = searchQuery.trim() !== '' ? generateAdvancedRecipe(searchQuery, servings) : null;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Gelişmiş Akıllı Mutfak Asistanı</p>
      </header>

      {/* Porsiyon Seçimi */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700">👥 Porsiyon Ölçüsü:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => setServings(num)}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition ${
                servings === num 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {num} Kişilik
            </button>
          ))}
        </div>
      </div>

      {/* Sekmeler */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-5">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'ingredients' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600'
          }`}
        >
          🛒 Malzemeye Göre Bul
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'search' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600'
          }`}
        >
          🔍 Yemek Adı ile Ara
        </button>
      </div>

      {/* 1. SEKME: MALZEMEYE GÖRE BUL */}
      {activeTab === 'ingredients' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-1">🧂 Mutfak Temelleri</h2>
            <div className="flex flex-wrap gap-1.5 my-2">
              {kitchenStaples.map((staple) => (
                <span key={staple} className="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  {staple}
                  <button onClick={() => handleRemoveStaple(staple)} className="text-amber-600 font-bold ml-1">✕</button>
                </span>
              ))}
            </div>
            <form onSubmit={handleAddStaple} className="flex gap-2">
              <input
                type="text"
                placeholder="Temel malzeme..."
                value={newStapleInput}
                onChange={(e) => setNewStapleInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-1.5 text-xs focus:outline-emerald-500"
              />
              <button type="submit" className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium">Ekle</button>
            </form>
          </section>

          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🛒 Elimdeki Malzemeler</h2>
            <form onSubmit={handleAddIngredient} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Örn: Pırasa, Yufka, Kıymalı..."
                value={newIngredientInput}
                onChange={(e) => setNewIngredientInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
              <button type="submit" className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-semibold">Ekle</button>
            </form>
            {userIngredients.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {userIngredients.map((item) => (
                  <span key={item} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                    {item}
                    <button onClick={() => handleRemoveIngredient(item)} className="text-emerald-600 font-bold ml-1">✕</button>
                  </span>
                ))}
              </div>
            )}
          </section>

          <div className="space-y-4">
            {userIngredients.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-xs text-gray-500">Malzemelerinizi ekleyin, o malzemelere uygun tarifler anında hazırlansın.</p>
              </div>
            ) : (
              ingredientRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm">{recipe.title}</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                      {recipe.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-3">{recipe.servingsNote}</p>
                  
                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Gerekli Ölçüler:</span>
                    <ul className="space-y-1">
                      {recipe.detailedIngredients.map((ing, idx) => (
                        <li key={idx} className="text-[11px] text-gray-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-2 space-y-1 text-xs">
                    <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Hazırlanışı:</span>
                    {recipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] text-gray-600 leading-relaxed">
                        <span className="font-bold text-emerald-700">{idx + 1}.</span> {step}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. SEKME: YEMEK ADI İLE ARAMA */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek veya Balık Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Çupra, Hamsi Tava, Mantar Çorbası..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
            </form>
          </section>

          {searchRecipeResult && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-800 text-sm">{searchRecipeResult.title}</h4>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                  {searchRecipeResult.category}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">{searchRecipeResult.servingsNote}</p>
              
              <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Gerekli Malzemeler:</span>
                <ul className="space-y-1">
                  {searchRecipeResult.detailedIngredients.map((ing, idx) => (
                    <li key={idx} className="text-[11px] text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-2 space-y-1 text-xs">
                <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Hazırlanışı ve Pişirme Adımları:</span>
                {searchRecipeResult.steps.map((step, idx) => (
                  <p key={idx} className="text-[11px] text-gray-600 leading-relaxed">
                    <span className="font-bold text-emerald-700">{idx + 1}.</span> {step}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
