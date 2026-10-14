import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Mısır Unu"];

// Türkçe karakter temizleyici
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

// 1. MALZEMEYE GÖRE GERÇEKÇİ TARİF ÜRETİCİ MOTOR
const generateRecipesFromIngredients = (ingredients, servings) => {
  if (!ingredients || ingredients.length === 0) return [];

  const normIngs = ingredients.map(i => normalizeText(i));
  const ingStr = ingredients.join(" ve ");

  // A) TAVUK VE LİMON / SOS
  if (normIngs.some(i => i.includes('tavuk')) && normIngs.some(i => i.includes('limon'))) {
    return [
      {
        id: 'ing-1',
        title: "Tavada Limonlu & Kekikli Tavuk Sote",
        category: "Tavuk Yemekleri",
        servingsNote: `${servings} Kişilik Özel Ölçü`,
        detailedIngredients: [
          `${(150 * servings)} gram Jülyen/Kuşbaşı Tavuk Göğsü`,
          `${(0.5 * servings).toFixed(1)} adet Taze Limon Suyu`,
          `${(1 * servings)} yemek kaşığı Zeytinyağı veya Tereyağı`,
          `${(0.25 * servings).toFixed(1)} adet Kuru Soğan ve 1 Diş Sarımsak`,
          `Tuz, Karabiber ve Kekik`
        ],
        steps: [
          "Tavada zeytinyağını kızdırıp doğranmış tavukları yüksek ateşte soteleyin.",
          "Tavuklar suyunu çekmeye başlayınca doğranmış soğan ve sarımsağı ekleyip 3-4 dakika daha kavurun.",
          "Taze limon suyunu, tuz, karabiber ve kekiği ekleyip kısık ateşte sosu tavuklara çektirin.",
          "Sıcak olarak pilav veya salata eşliğinde servis yapın."
        ]
      },
      {
        id: 'ing-2',
        title: "Fırında Limon Marineden Tavuk Göğsü",
        category: "Fırın Yemekleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(150 * servings)} gram Tavuk Göğsü`,
          `${(0.5 * servings).toFixed(1)} adet Limon (dilimlenmiş)`,
          `${(1 * servings)} yemek kaşığı Zeytinyağı`,
          `Sarımsak tozu/ezmesi, Tuz ve Biber`
        ],
        steps: [
          "Tavuk göğsünü zeytinyağı, limon suyu, sarımsak ve baharatlarla marine edip 15 dk bekletin.",
          "Fırın kabına alıp üzerine limon dilimleri yerleştirin.",
          "200 derece fırında yaklaşık 20 dakika kurumayacak şekilde pişirin."
        ]
      }
    ];
  }

  // B) BALIK (Çupra, Hamsi vb.)
  if (normIngs.some(i => i.includes('cupra') || i.includes('hamsi') || i.includes('balik') || i.includes('levrek'))) {
    return [
      {
        id: 'ing-balık-1',
        title: `${ingStr.toUpperCase()} (Tava / Fırın Usulü)`,
        category: "Balık Yemekleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${ingStr})`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı / Sıvı Yağ`,
          `${(0.5 * servings).toFixed(1)} adet Limon`,
          `Tuz ve Defne Yaprağı`
        ],
        steps: [
          "Balıkları yıkayıp süzün, zeytinyağı, tuz ve limon ile marine edin.",
          "Tavada kızartın veya fırında 200 derecede 25 dakika pişirin."
        ]
      }
    ];
  }

  // C) PATATES VE YUMURTA
  if (normIngs.some(i => i.includes('patates')) && normIngs.some(i => i.includes('yumurta'))) {
    return [
      {
        id: 'ing-py-1',
        title: "Küp Patatesli Yumurta Sote",
        category: "Kahvaltılık & Pratik",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Küp Doğranmış Patates`,
          `${(1 * servings)} adet Yumurta`,
          `${(1 * servings)} yemek kaşığı Sıvı Yağ / Tereyağı`,
          `Tuz, Karabiber ve Pul Biber`
        ],
        steps: [
          "Patatesleri küçük küpler halinde doğrayıp tavada yağda yumuşayana kadar kızartın.",
          "Üzerine baharatları ekleyip yumurtaları kırın ve pişirin."
        ]
      }
    ];
  }

  // D) GENEL MALZEME KOMBİNASYONU (VARSAYILAN DİNAMİK Mutfak Motoru)
  return [
    {
      id: 'ing-genel-1',
      title: `${ingStr.toUpperCase()} Sote / Harmanı`,
      category: "Pratik Mutfak",
      servingsNote: `${servings} Kişilik Özel Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon ${ing}`).concat([
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve 1 Diş Sarımsak`,
        `${(1 * servings)} yemek kaşığı Zeytinyağı / Tereyağı`,
        `Tuz, Karabiber ve Pul Biber`
      ]),
      steps: [
        `Tavada yağı kızdırıp doğranmış soğan ve sarımsakları soteleyin.`,
        `Ana malzemelerinizi (${ingStr}) ekleyip karıştırarak pişirin.`,
        `Baharatları ilave edip ${servings} kişilik porsiyona uygun olarak sıcak servis yapın.`
      ]
    }
  ];
};

// 2. YEMEK ADI İLE ARAMA MOTORU
const generateAdvancedRecipe = (query, servings) => {
  const norm = normalizeText(query);

  if (norm.includes('cupra') || norm.includes('cipura') || norm.includes('hamsi') || norm.includes('levrek') || norm.includes('somon') || norm.includes('balik')) {
    return {
      title: `${query.toUpperCase()} (Fırında Limonlu & Zeytinyağlı)`,
      servingsNote: `${servings} Kişilik Fırın Ölçüsü`,
      category: "Balık & Deniz Ürünleri",
      detailedIngredients: [
        `${(1 * servings)} adet Temizlenmiş Tüm Balık (${query})`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan`,
        `${(0.5 * servings).toFixed(1)} adet Taze Limon (dilimlenmiş)`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sızma Zeytinyağı`,
        `Tuz, Karabiber ve Kekik`
      ],
      steps: [
        "Balığı zeytinyağı, tuz ve karabiber ile ovup marine edin.",
        "Fırın tepsisine soğanları dizip üzerine balığı yerleştirin.",
        "Üzerine limon dilimlerini koyup 200 derece fırında 25-30 dakika pişirin."
      ]
    };
  }

  if (norm.includes('salata') || norm.includes('cacik') || norm.includes('meze') || norm.includes('piyaz')) {
    return {
      title: `${query.toUpperCase()} (Taze Soğuk Hazırlanış)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Salatalar & Soğuk Mezeler",
      detailedIngredients: [
        `${(1 * servings)} adet Taze Domates ve Salatalık`,
        `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
        `${(0.5 * servings).toFixed(1)} adet Limon Suyu veya Nar Ekşisi`,
        `Tuz`
      ],
      steps: [
        "Sebzeleri yıkayıp taze olarak doğrayın.",
        "Zeytinyağı, limon suyu ve tuzu karıştırıp üzerine dökerek servis yapın."
      ]
    };
  }

  if (norm.includes('corba') || norm.includes('mantar') || norm.includes('martar') || norm.includes('mercimek')) {
    return {
      title: `${query.toUpperCase()} ÇORBASI`,
      servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(150 * servings)} gram Kültür Mantarı / Mercimek`,
        `${(1 * servings)} yemek kaşığı Tereyağı ve Un`,
        `${(2 * servings)} su bardağı Sıcak Su / Tavuk Suyu`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Tencerede yağı eritip un ve malzemeleri soteleyin.",
        "Sıcak suyu ekleyip kaynamaya bırakın ve kısık ateşte pişirin."
      ]
    };
  }

  return {
    title: `${query.toUpperCase()} (Ev Usulü Yemek)`,
    servingsNote: `${servings} Kişilik Ölçü`,
    category: "Geleneksel Yemekler",
    detailedIngredients: [
      `${(150 * servings)} gram ${query} Malzemesi`,
      `${(1 * servings)} yemek kaşığı Zeytinyağı / Tereyağı`,
      `Tuz ve Baharatlar`
    ],
    steps: [
      "Malzemeleri hazırlayıp uygun pişirme kabında soteleyin.",
      "Baharatları ekleyip sıcak servis edin."
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

  // Malzemelere Göre Üretilen Tarifler
  const ingredientRecipes = generateRecipesFromIngredients(userIngredients, servings);

  // Yemek Adı ile Arama Sonucu
  const searchRecipeResult = searchQuery.trim() !== '' ? generateAdvancedRecipe(searchQuery, servings) : null;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Akıllı ve Kusursuz Mutfak Asistanı</p>
      </header>

      {/* Porsiyon / Kişi Sayısı Seçimi */}
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
                placeholder="Örn: Çupra, Tavuk Göğüs, Limon..."
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

          {/* Malzemeye Göre Çıkan Tarif Kartları */}
          <div className="space-y-4">
            {userIngredients.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-xs text-gray-500">Malzemelerinizi ekleyin, o malzemelere uygun tarifler anında hazırlansın.</p>
              </div>
            ) : (
              ingredientRecipes.map((recipe, index) => (
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
