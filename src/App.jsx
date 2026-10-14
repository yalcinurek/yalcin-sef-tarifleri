import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Sıvı Yağ", "Sarımsak", "Tereyağı", "Salça"];

// Temel veritabanı (1 Porsiyon / 1 Kişilik baz alınmıştır, kişi sayısına göre çarpılır)
const RECIPES_DATABASE = [
  {
    id: 1,
    title: "Klasik Pirinç Pilavı",
    time: "25 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz"],
    ingredients: ["Pirinç", "Tel Şehriye"],
    baseIngredients: [
      { name: "Pirinç", amount: 0.5, unit: "su bardağı (yaklaşık 90g)" },
      { name: "Tel Şehriye", amount: 0.25, unit: "çay bardağı" },
      { name: "Tereyağı", amount: 0.5, unit: "yemek kaşığı" },
      { name: "Sıvı Yağı", amount: 0.5, unit: "yemek kaşığı" },
      { name: "Kaynar Su", amount: 0.75, unit: "su bardağı" },
      { name: "Tuz", amount: 0.25, unit: "tatlı kaşığı" }
    ],
    steps: [
      "Pirinçleri ılık ve tuzlu suda 20 dakika bekletip nişastası gidene kadar yıkayın ve süzün.",
      "Tencerede sıvı yağ ve tereyağını eritin, tel şehriyeleri rengi dönene kadar kavurun.",
      "Süzülen pirinçleri ekleyip şeffaflaşana kadar (3-4 dk) kavurun.",
      "Kaynar suyu ve tuzu ekleyip tencerenin kapağını kapatın. Kısık ateşte suyunu çekene kadar pişirin.",
      "Demlenmesi için 15 dakika kapağı kapalı dinlendirin."
    ]
  },
  {
    id: 2,
    title: "Tel Şehriye Çorbası",
    time: "20 dk",
    difficulty: "Çok Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Salça", "Tuz", "Karabiber"],
    ingredients: ["Tel Şehriye", "Domates"],
    baseIngredients: [
      { name: "Tel Şehriye", amount: 0.25, unit: "su bardağı" },
      { name: "Rendelenmiş Domates", amount: 0.25, unit: "adet" },
      { name: "Domates Salçası", amount: 0.25, unit: "yemek kaşığı" },
      { name: "Sıvı Yağ / Tereyağı", amount: 0.75, unit: "yemek kaşığı" },
      { name: "Sıcak Su", amount: 1.5, unit: "su bardağı" },
      { name: "Tuz ve Karabiber", amount: 0.25, unit: "tatlı kaşığı" }
    ],
    steps: [
      "Tencerede yağ ve salçayı kokusu çıkana kadar kavurun.",
      "Rendelenmiş domatesi ekleyip yumuşayana kadar pişirin.",
      "Sıcak suyu ekleyip kaynamaya bırakın.",
      "Kaynayan suya tel şehriye, tuz ve karabiberi ekleyip şehriyeler yumuşayana kadar (8-10 dk) pişirin."
    ]
  },
  {
    id: 3,
    title: "Arpa Şehriye Pilavı",
    time: "20 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz", "Karabiber"],
    ingredients: ["Arpa Şehriye"],
    baseIngredients: [
      { name: "Arpa Şehriye", amount: 0.5, unit: "su bardağı" },
      { name: "Tereyağı", amount: 0.5, unit: "yemek kaşığı" },
      { name: "Sıvı Yağ", amount: 0.5, unit: "yemek kaşığı" },
      { name: "Kaynar Su", amount: 0.75, unit: "su bardağı" },
      { name: "Tuz", amount: 0.25, unit: "tatlı kaşığı" }
    ],
    steps: [
      "Tencerede yağları eritin ve şehriyeleri altın sarısı/kahverengi olana kadar kavurun.",
      "Kaynar su ve tuzu ekleyip kapağını kapatın.",
      "Kısık ateşte suyunu çekene kadar pişirip demlendirin."
    ]
  },
  {
    id: 4,
    title: "Klasik Menemen",
    time: "15 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tuz", "Karabiber"],
    ingredients: ["Yumurta", "Domates", "Biber"],
    baseIngredients: [
      { name: "Domates", amount: 1, unit: "adet" },
      { name: "Yeşil Sivri Biber", amount: 1, unit: "adet" },
      { name: "Yumurta", amount: 1, unit: "adet" },
      { name: "Sıvı Yağ", amount: 0.75, unit: "yemek kaşığı" },
      { name: "Tuz", amount: 0.25, unit: "tatlı kaşığı" }
    ],
    steps: [
      "Biberleri ince doğrayıp yağda soteleyin.",
      "Küp doğranmış domatesleri ekleyip suyunu çekene kadar pişirin.",
      "Yumurtaları kırıp tuz ekleyerek karıştırarak pişirin."
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4); // Varsayılan 4 kişilik, 1-4 arası ayarlanabilir

  // Malzemeye göre arama state'leri
  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');

  // Yemek adıyla arama state'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [webResults, setWebResults] = useState([]);
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);

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

  // Malzemeye göre arama filtreleme
  const getFilteredRecipesByIngredients = () => {
    if (userIngredients.length === 0) return [];

    const normalizedUserIngredients = userIngredients.map(i => i.toLowerCase().trim());
    const normalizedStaples = kitchenStaples.map(s => s.toLowerCase().trim());
    const allAvailable = [...normalizedStaples, ...normalizedUserIngredients];

    return RECIPES_DATABASE.map(recipe => {
      const recipeIngredientsLower = recipe.ingredients.map(i => i.toLowerCase().trim());
      
      const hasAtLeastOneUserIngredient = recipeIngredientsLower.some(ing => 
        normalizedUserIngredients.includes(ing)
      );

      if (!hasAtLeastOneUserIngredient) {
        return { ...recipe, score: 0 };
      }

      const allRequired = [...recipe.ingredients, ...recipe.staples].map(i => i.toLowerCase().trim());
      let matchedCount = 0;

      allRequired.forEach(req => {
        if (allAvailable.includes(req)) {
          matchedCount++;
        }
      });

      const score = Math.round((matchedCount / allRequired.length) * 100);
      return { ...recipe, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
  };

  const activeRecipes = getFilteredRecipesByIngredients();

  // Yemek adına göre yerel arama
  const localSearchResults = searchQuery.trim() === '' ? [] : RECIPES_DATABASE.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  );

  // İnternet üzerinden 2 alternatif yöntem arama simülasyonu / apisi
  const handleWebSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingWeb(true);
    setWebResults([]);

    setTimeout(() => {
      const query = searchQuery.trim();
      setWebResults([
        {
          id: 'web-1',
          title: `${query} (Geleneksel Ev Usulü Yöntem)`,
          source: "Nefis Yemek Tarifleri / Klasik Usul",
          time: "20-30 dk",
          servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
          methodSummary: "Geleneksel yöntem: Kısık ateşte kendi suyunu çekerek yavaşça pişirme yöntemi.",
          steps: [
            `${query} için tencerede veya tavada önce yağ ve temel aromatikleri soteleyin.`,
            `Ana malzemeleri sırasıyla ekleyip ${servings} kişilik porsiyon ölçülerine göre karıştırın.`,
            "Kısık ateşte kapağı kapalı olarak lezzetlerin bütünleşmesini sağlayın ve sıcak servis edin."
          ]
        },
        {
          id: 'web-2',
          title: `${query} (Pratik / Hızlı Şef Yöntemi)`,
          source: "Pratik Mutfak / Hızlı Yöntem",
          time: "10-15 dk",
          servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
          methodSummary: "Hızlı yöntem: Yüksek ateşte soteleme ve önceden haşlanmış/hazırlanmış malzemelerle hızlı harmanlama.",
          steps: [
            "Geniş tavamızı yüksek ateşte kızdırıp malzemeleri sırayla ekleyin.",
            "Yüksek ısıda sotelenen malzemeleri sosla hızlıca buluşturun.",
            "Tazeliğini koruyarak hemen sıcak servis yapın."
          ]
        }
      ]);
      setIsSearchingWeb(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Dinamik Porsiyonlu Akıllı Mutfak Asistanı</p>
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

      {/* Sekme Değiştirme */}
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

      {/* 1. SEKME: MALZEMEYE GÖRE ARAMA */}
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
                placeholder="Örn: Pirinç, Tel Şehriye..."
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

          <section className="space-y-4">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">📖 Önerilen Tarifler ({servings} Kişilik)</h2>
            {activeRecipes.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-xs text-gray-500">Eklediğiniz malzemelerle eşleşen bir tarif bulunamadı.</p>
              </div>
            ) : (
              activeRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-sm">{recipe.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700">
                      %{recipe.score} Eşleşme
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 mb-3 flex gap-3">
                    <span>⏱ {recipe.time}</span>
                    <span className="text-emerald-600 font-medium">👥 {servings} Kişilik Hesaplandı</span>
                  </div>

                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ {servings} Kişilik Ölçüler:</span>
                    <ul className="space-y-1">
                      {recipe.baseIngredients.map((ing, idx) => (
                        <li key={idx} className="text-[11px] text-gray-700">
                          • <span className="font-semibold">{(ing.amount * servings).toFixed(2).replace('.00', '')}</span> {ing.unit} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-2 text-xs text-gray-600 space-y-1">
                    <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Adım Adım Yapılışı:</span>
                    {recipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed"><span className="font-bold text-emerald-700">{idx + 1}.</span> {step}</p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      )}

      {/* 2. SEKME: YEMEK ADI İLE ARAMA & İNTERNETTEN ARAMA */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek Adı ile Ara</h2>
            <form onSubmit={handleWebSearch} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Karnıyarık, Pilav, Lazanya..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setWebResults([]);
                }}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
              <button type="submit" className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-lg font-semibold">
                Ara
              </button>
            </form>
          </section>

          {/* Yerel Sonuçlar Varsa */}
          {localSearchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500">Kayıtlı Tariflerden Bulunanlar:</h3>
              {localSearchResults.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{recipe.title}</h3>
                  <p className="text-[11px] text-emerald-600 font-medium mb-2">👥 {servings} Kişilik Ayarlandı</p>
                  <div className="text-xs bg-gray-50 p-2.5 rounded-lg mb-2">
                    <span className="font-semibold text-gray-700 block mb-1">⚖️ Ölçüler:</span>
                    {recipe.baseIngredients.map((ing, idx) => (
                      <div key={idx} className="text-[11px]">• {(ing.amount * servings).toFixed(2).replace('.00', '')} {ing.unit} {ing.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* İnternet Arama Sonuçları (En Fazla 2 Yöntem) */}
          {isSearchingWeb ? (
            <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
              <p className="text-xs text-emerald-600 font-medium animate-pulse">🌐 İnternetten en iyi 2 yapılış yöntemi getiriliyor...</p>
            </div>
          ) : webResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                🌐 İnternetten Bulunan En İyi 2 Yapılış Yöntemi:
              </h3>
              {webResults.map((webRecipe, index) => (
                <div key={webRecipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm">Yöntem {index + 1}: {webRecipe.title}</h4>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">Kaynak: {webRecipe.source} • {webRecipe.servingsNote}</p>
                  
                  <div className="bg-emerald-50 p-2 rounded text-[11px] text-emerald-800 mb-3 font-medium">
                    💡 Özet: {webRecipe.methodSummary}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-gray-700 block">👨‍🍳 Hazırlanış Adımları:</span>
                    {webRecipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] text-gray-600 leading-relaxed">
                        <span className="font-bold text-emerald-700">{idx + 1}.</span> {step}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== '' && localSearchResults.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
              <p className="text-xs text-gray-600 mb-3">"{searchQuery}" kayıtlarda yok. İnternetten en iyi 2 tarifi getirmek için tıklayın:</p>
              <button 
                onClick={handleWebSearch}
                className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                🌐 İnternette Ara (En İyi 2 Yöntem)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
