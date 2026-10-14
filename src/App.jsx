import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Yumurta", "Süt"];

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

// 1. MALZEMEYE GÖRE GERÇEKÇİ TARİF ÜRETİCİ
const generateRecipesFromIngredients = (ingredients, servings) => {
  if (!ingredients || ingredients.length === 0) return [];

  const normIngs = ingredients.map(i => normalizeText(i));
  const ingStr = ingredients.join(" ve ");

  // A) HAMUR İŞİ & BÖREK (Yufka + Peynir / Lor / Kıyma / Patates)
  if (normIngs.some(i => i.includes('yufka'))) {
    return [
      {
        id: 'borek-1',
        title: "Pratik Tava Böreği (Lor Peynirli)",
        category: "Börek & Hamur İşleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Günlük Yufka`,
          `${(100 * servings)} gram Lor Peyniri (veya Peynir)`,
          `${(0.25 * servings).toFixed(1)} demet Maydanoz (ince kıyılmış)`,
          `${(0.5 * servings).toFixed(1)} çay bardağı Süt & Sıvı Yağ Karışımı (sos için)`,
          `${(1 * servings)} yemek kaşığı Tereyağı / Sıvı Yağ (tavayı yağlamak için)`,
          `Pul Biber ve Karabiber`
        ],
        steps: [
          "Lor peynirini ince kıyılmış maydanoz ve baharatlarla karıştırıp iç harcı hazırlayın.",
          "Geniş bir tavayı az yağ ile yağlayın. İlk yufkayı kenarları tavadan dışarı taşacak şekilde serin.",
          "Süt ve sıvı yağ karışımını yufkanın üzerine sürün. İkinci yufkayı parçalayarak tavaya büzüştürerek serin.",
          "Hazırladığınız lor peynirli iç harcı eşit şekilde yayın.",
          "Tavadan taşan yufkanın kenarlarını içe doğru kapatın.",
          "Tavanın kapağını kapatıp kısık-orta ateşte altı kızarana kadar pişirin. Düz bir tabak yardımıyla çevirip diğer tarafını da kızartıp sıcak servis yapın."
        ]
      }
    ];
  }

  // B) TAVUK VE LİMON
  if (normIngs.some(i => i.includes('tavuk')) && normIngs.some(i => i.includes('limon'))) {
    return [
      {
        id: 'tavuk-limon-1',
        title: "Tavada Limonlu & Kekikli Tavuk Sote",
        category: "Tavuk Yemekleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(150 * servings)} gram Jülyen Tavuk Göğsü`,
          `${(0.5 * servings).toFixed(1)} adet Limon Suyu`,
          `${(1 * servings)} yemek kaşığı Zeytinyağı`,
          `${(0.25 * servings).toFixed(1)} adet Kuru Soğan ve 1 Diş Sarımsak`,
          `Tuz, Karabiber ve Kekik`
        ],
        steps: [
          "Tavada zeytinyağını kızdırıp tavukları soteleyin.",
          "Soğan ve sarımsağı ekleyip kavurun.",
          "Limon suyunu ve baharatları ekleyip kısık ateşte demlendirin."
        ]
      }
    ];
  }

  // C) BALIK ÇEŞİTLERİ (Çupra, Hamsi vb.)
  if (normIngs.some(i => i.includes('cupra') || i.includes('hamsi') || i.includes('balik') || i.includes('levrek'))) {
    return [
      {
        id: 'balık-1',
        title: `${ingStr.toUpperCase()} (Fırında Limonlu)`,
        category: "Balık Yemekleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${ingStr})`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
          `${(0.5 * servings).toFixed(1)} adet Limon ve Soğan`,
          `Tuz ve Defne Yaprağı`
        ],
        steps: [
          "Balıkları zeytinyağı, limon ve tuz ile ovun.",
          "Fırın tepsisine soğan dilimleri üzerine balıkları yerleştirip 200 derecede 25 dk pişirin."
        ]
      }
    ];
  }

  // D) PATATES VE YUMURTA
  if (normIngs.some(i => i.includes('patates')) && normIngs.some(i => i.includes('yumurta'))) {
    return [
      {
        id: 'patates-yumurta-1',
        title: "Küp Patatesli Yumurta",
        category: "Kahvaltılık & Pratik",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Patates (küp doğranmış)`,
          `${(1 * servings)} adet Yumurta`,
          `${(1 * servings)} yemek kaşığı Sıvı Yağ`,
          `Tuz ve Pul Biber`
        ],
        steps: [
          "Patatesleri tavada yağda yumuşayana kadar kızartın.",
          "Üzerine yumurtayı kırıp baharatlarını ekleyerek pişirin."
        ]
      }
    ];
  }

  // E) DİĞER SEBZE VE ET YEMEKLERİ (Soteleşmeye Uygun Sıcak Yemekler)
  return [
    {
      id: 'genel-1',
      title: `${ingStr.toUpperCase()} Yemeği`,
      category: "Ev Yemekleri",
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon ${ing}`).concat([
        `${(1 * servings)} yemek kaşığı Zeytinyağı`,
        `Tuz ve Karabiber`
      ]),
      steps: [
        `Malzemelerinizi (${ingStr}) yıkayıp pişirme tekniğine uygun şekilde doğrayın.`,
        `Tavada veya tencerede yağ ile hafifçe soteleyip kendi buharında pişmeye bırakın.`,
        `Baharatlarını ekleyip sıcak servis yapın.`
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
        `${(100 * servings)} gram Peynir / Kıymalı Harç`,
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
        <p className="text-xs text-gray-500 mt-1">Akıllı ve Doğru Mutfak Asistanı</p>
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
                placeholder="Örn: Lor Peyniri, Yufka, Tavuk..."
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
                    <span className="font-semibold text-gray-700 block mb-1.5">秤 Gerekli Ölçüler:</span>
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
