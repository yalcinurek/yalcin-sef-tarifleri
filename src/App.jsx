import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Yumurta", "Süt", "Krema", "Parmesan / Kaşar Peyniri"];

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

const BASE_INGREDIENTS = ['yufka', 'lavas', 'milfoy', 'ekmek', 'pide', 'makarna', 'fettuccine', 'fetucini', 'penne', 'spagetti', 'pirinc', 'bulgur'];
const SAUCE_INGREDIENTS = ['sut', 'yumurta', 'yag', 'tereyagi', 'zeytinyagi', 'yogurt', 'krema'];

// 1. MALZEMEYE GÖRE BUL MOTORU
const generateRecipesFromIngredients = (ingredients, servings) => {
  if (!ingredients || ingredients.length === 0) return [];

  const normalizedInput = ingredients.map(i => ({ raw: i, norm: normalizeText(i) }));
  const baseItems = normalizedInput.filter(item => BASE_INGREDIENTS.some(b => item.norm.includes(b)));
  const fillingItems = normalizedInput.filter(
    item => !BASE_INGREDIENTS.some(b => item.norm.includes(b)) && !SAUCE_INGREDIENTS.some(s => item.norm.includes(s))
  );

  const mainFillingText = fillingItems.length > 0 ? fillingItems.map(i => i.raw).join(", ") : "Sade";

  // MAKARNA & PASTA
  if (baseItems.some(i => i.norm.includes('makarna') || i.norm.includes('fettuccine') || i.norm.includes('fetucini') || i.norm.includes('penne') || i.norm.includes('spagetti'))) {
    return [
      {
        id: 'dynamic-pasta',
        title: `Kremalı & Soslu Fettuccine / Makarna (${fillingItems.length > 0 ? mainFillingText : "Alfredo Usulü"})`,
        category: "Makarnalar & İtalyan Mutfak",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(100 * servings)} gram Fettuccine / Makarna`,
          `${(0.5 * servings).toFixed(1)} paket (100 ml) Sıvı Krema`,
          `${(1 * servings)} yemek kaşığı Tereyağı`,
          `${(30 * servings)} gram Rendelenmiş Parmesan veya Kaşar Peyniri`,
          `${(0.5 * servings).toFixed(1)} diş İnce Kıyılmış Sarımsak`,
          ...fillingItems.map(item => `${(80 * servings)} gram Soteleme ${item.raw}`),
          `Tuz, Taze Çekilmiş Karabiber ve Fesleğen`
        ],
        steps: [
          "Geniş bir tencerede bol suyu kaynatıp tuz ekleyin. Makarnaları paket üzerindeki süreden 1-2 dakika az (al dente) haşlayın. Haşlama suyundan yarım çay bardağı kenara ayırıp makarnayı süzün.",
          `Geniş bir sos tavasında tereyağını eritin. İnce kıyılmış sarımsakları ${fillingItems.length > 0 ? `ve (${mainFillingText}) malzemelerini` : ''} ekleyip soteyin.`,
          "Kremayı tavaya dökün ve kısık ateşte hafifçe tıkırdayıp kıvam alana kadar 2-3 dakika pişirin.",
          "Haşlanan makarnaları, ayrılan haşlama suyunu ve rendelenmiş peyniri sosa ilave edin.",
          "Tüm malzemeleri yüksek ateşte 1-2 dakika hızlıca harmanlayıp sosun makarnaya yapışmasını sağlayın. Taze karabiberle sıcak servis yapın."
        ]
      }
    ];
  }

  // YUFKA / BÖREK
  if (baseItems.some(i => i.norm.includes('yufka') || i.norm.includes('milfoy'))) {
    return [
      {
        id: 'dynamic-borek',
        title: `Pratik Tava Böreği (${fillingItems.length > 0 ? fillingItems.map(i => i.raw).join(" & ") : "Özel Harçlı"})`,
        category: "Börek & Hamur İşleri",
        servingsNote: `${servings} Kişilik Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Günlük Yufka`,
          ...fillingItems.map(item => `${(100 * servings)} gram ${item.raw}`),
          `${(0.5 * servings).toFixed(1)} çay bardağı Süt & Sıvı Yağ Karışımı (sos için)`,
          `${(1 * servings)} yemek kaşığı Tereyağı / Sıvı Yağ (tava için)`
        ],
        steps: [
          `İç harç hazırlığı: (${mainFillingText}) malzemelerini yıkayıp doğrayın. İsteğe göre soğan ve baharatla soteleyip soğutun.`,
          "Yağlanmış tavaya ilk yufkayı kenarları dışarı taşacak şekilde serin. Sos sürüp kalan yufkayı parçalayarak içine yerleştirin.",
          `Hazırladığınız (${mainFillingText}) harcını eşit şekilde yayın. Taşayan yufka kenarlarını kapatın.`,
          "Kapağı kapalı olarak kısık-orta ateşte arkalı önlü kızartıp sıcak servis yapın."
        ]
      }
    ];
  }

  // GENEL BÜTÜNCÜL MOTOR
  return [
    {
      id: 'dynamic-general',
      title: `${ingredients.join(" ve ").toUpperCase()} Sote / Yemeği`,
      category: "Ev Yemekleri",
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon / gram ${ing}`).concat([
        `${(1 * servings)} yemek kaşığı Zeytinyağı / Tereyağı`,
        `Tuz ve Baharatlar`
      ]),
      steps: [
        `Malzemelerinizi (${ingredients.join(", ")}) temizleyip doğrayın.`,
        `Uygun tavada veya tencerede yağ ile kendi suyunu çekene kadar pişirin ve baharatlayıp servis yapın.`
      ]
    }
  ];
};

// 2. YEMEK ADI İLE ARAMA MOTORU (TÜM KATEGORİLER İÇİN GERÇEK TARİFLER)
const generateAdvancedRecipe = (query, servings) => {
  const norm = normalizeText(query);

  // A) MAKARNA / FETTUCCINE / PENNE / SPAGETTI
  if (norm.includes('fetucini') || norm.includes('fettuccine') || norm.includes('makarna') || norm.includes('penne') || norm.includes('spagetti') || norm.includes('lazanya')) {
    return {
      title: `${query.toUpperCase()} (Kremalı Alfredo Usulü)`,
      servingsNote: `${servings} Kişilik İtalyan Usulü Ölçü`,
      category: "Makarnalar & İtalyan Mutfak",
      detailedIngredients: [
        `${(120 * servings)} gram Fettuccine / Pasta Makarna`,
        `${(0.5 * servings).toFixed(1)} paket (100 ml) Sıvı Krema`,
        `${(1 * servings)} yemek kaşığı Tereyağı`,
        `${(30 * servings)} gram Rendelenmiş Parmesan / Kaşar Peyniri`,
        `${(0.5 * servings).toFixed(1)} diş Sarımsak (ince kıyılmış)`,
        `Tuz, Taze Çekilmiş Karabiber ve Fesleğen`
      ],
      steps: [
        "Tencerede bol suyu kaynatıp tuz ekleyin. Makarnaları 8-10 dakika al dente (dişe gelir) haşlayın. Haşlama suyundan yarım çay bardağı kenara ayırıp süzün.",
        "Tavada tereyağını eritip sarımsakları kokusu çıkana kadar 1 dakika soteleyin.",
        "Kremayı ekleyip kısık ateşte hafifçe koyulaşana kadar 2-3 dakika tıkırdatın.",
        "Haşlanan makarnayı, ayrılan haşlama suyunu ve rendelenmiş peyniri tavaya ekleyin.",
        "Kısık ateşte hızlıca karıştırarak sosun makarnaya tamamen yapışmasını sağlayın. Taze karabiber serperek sıcak servis edin."
      ]
    };
  }

  // B) BÖREK / YUFKA
  if (norm.includes('borek') || norm.includes('yufka') || norm.includes('poaca')) {
    return {
      title: `${query.toUpperCase()} (Tava / Fırın Böreği)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Börek & Hamur İşleri",
      detailedIngredients: [
        `${(1 * servings)} adet Günlük Yufka`,
        `${(100 * servings)} gram Peynir / Patates / Kıymalı İç Harç`,
        `${(0.5 * servings).toFixed(1)} çay bardağı Süt & Sıvı Yağ Karışımı`,
        `Tereyağı`
      ],
      steps: [
        "Tavayı yağlayıp ilk yufkayı serin. Arasına sos sürüp iç harcı dökün ve kapatın.",
        "Kısık ateşte arkalı önlü nar gibi kızarana kadar pişirin."
      ]
    };
  }

  // C) BALIK & DENİZ ÜRÜNLERİ
  if (norm.includes('cupra') || norm.includes('cipura') || norm.includes('hamsi') || norm.includes('levrek') || norm.includes('somon') || norm.includes('balik')) {
    return {
      title: `${query.toUpperCase()} (Fırında Limonlu & Zeytinyağlı)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Balık Yemekleri",
      detailedIngredients: [
        `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
        `${(0.5 * servings).toFixed(1)} adet Limon ve Kuru Soğan`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sızma Zeytinyağı`,
        `Tuz, Karabiber ve Defne Yaprağı`
      ],
      steps: [
        "Balığı zeytinyağı, tuz ve karabiber ile ovup marine edin.",
        "Fırın tepsisine soğan dilimleri üzerine balığı yerleştirip üzerine limon dilimleri ekleyin.",
        "200 derece fırında yaklaşık 25-30 dakika pişirip servis edin."
      ]
    };
  }

  // D) ÇORBALAR
  if (norm.includes('corba') || norm.includes('mercimek') || norm.includes('mantar')) {
    return {
      title: `${query.toUpperCase()} ÇORBASI`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı Temel Çorba Malzemesi (${query})`,
        `${(1 * servings)} yemek kaşığı Tereyağı ve Un`,
        `${(2 * servings)} su bardağı Sıcak Su / Et Suyu`,
        `Tuz ve Baharatlar`
      ],
      steps: [
        "Tencerede yağı eritip unu ve malzemeleri soteleyin.",
        "Sıcak suyu ekleyip malzemeler yumuşayana kadar pişirin ve blenderdan geçirerek sıcak servis yapın."
      ]
    };
  }

  // E) DİĞER TÜM SICAK YEMEKLER
  return {
    title: `${query.toUpperCase()} (Klasik Ev Yemeği)`,
    servingsNote: `${servings} Kişilik Ölçü`,
    category: "Geleneksel Mutfak",
    detailedIngredients: [
      `${(150 * servings)} gram Doğranmış ${query} Malzemesi`,
      `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak`,
      `${(1 * servings)} yemek kaşığı Zeytinyağı / Salça`,
      `Tuz ve Karabiber`
    ],
    steps: [
      "Tencerede yağı ısıtıp doğranmış soğanları soteleyin.",
      "Ana malzemeleri ve salçayı/baharatları ekleyip kısık ateşte kendi suyunda pişmeye bırakın."
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
                placeholder="Örn: Fetucini, Mantar, Tavuk..."
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
                placeholder="Örn: Fetucini Makarna, Çupra, Mantar Çorbası..."
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
