import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Sıvı Yağ", "Sarımsak", "Tereyağı", "Salça"];

// Tüm tarifler 4 kişilik standart ölçü ve gramajlara göre detaylandırılmıştır
const RECIPES_DATABASE = [
  {
    id: 1,
    title: "Klasik Pirinç Pilavı (4 Kişilik)",
    time: "25 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz"],
    ingredients: ["Pirinç", "Tel Şehriye"],
    ingredientDetails: [
      "2 su bardağı pirinç (yaklaşık 350g)",
      "1 çay bardağı tel şehriye",
      "2 yemek kaşığı tereyağı",
      "2 yemek kaşığı sıvı yağı",
      "3 su bardağı kaynar su (veya et/tavuk suyu)",
      "1 tatlı kaşığı tuz"
    ],
    steps: [
      "Pirinçleri ılık ve tuzlu suda 20 dakika bekletip nişastası gidene kadar soğuk suda birkaç kez iyice yıkayın ve süzgece alarak suyunu süzdürün.",
      "Geniş bir pilav tenceresinde sıvı yağ ve tereyağını orta ateşte eritin. İçine tel şehriyeleri ekleyip rengi hafif kahverengileşene kadar kavurun.",
      "Süzülen pirinçleri tencereye ilave edin. Pirinçler şeffaflaşıp tencereye hafifçe yapışmaya başlayana kadar (yaklaşık 4-5 dakika) sürekli karıştırarak kavurmaya devam edin.",
      "Üzerine 3 su bardağı kaynar su ve 1 tatlı kaşığı tuzu ekleyip nazikçe bir kez karıştırın. Tencerenin kapağını kapatın.",
      "Su kaynayınca ocağın altını en kısık konuma getirin. Suyunu tamamen çekene kadar (yaklaşık 10-12 dakika) kapağını hiç açmadan pişirin.",
      "Piştikten sonra ocağın altını kapatın. Tencere kapağı ile tencere arasına kağıt havlu sererek 15 dakika demlenmeye bırakın."
    ]
  },
  {
    id: 2,
    title: "Tel Şehriye Çorbası (4 Kişilik)",
    time: "20 dk",
    difficulty: "Çok Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Salça", "Tuz", "Karabiber"],
    ingredients: ["Tel Şehriye", "Domates"],
    ingredientDetails: [
      "1 su bardağı tel şehriye",
      "1 adet büyük boy domates (rendelenmiş)",
      "1 yemek kaşığı domates salçası",
      "2 yemek kaşığı sıvı yağı",
      "1 yemek kaşığı tereyağı",
      "6 su bardağı sıcak su",
      "1 tatlı kaşığı tuz",
      "1 çay kaşığı karabiber",
      "İsteğe bağlı: Kuru nane veya ince kıyılmış maydanoz"
    ],
    steps: [
      "Çorba tenceresinde sıvı yağ ve tereyağını eritin. Salçayı ekleyip kokusu çıkana kadar 1-2 dakika kavurun.",
      "Rendelediğiniz domatesi tencereye ilave edin ve domatesler yumuşayana kadar soteleyin.",
      "Üzerine 6 su bardağı sıcak suyu ekleyin ve kaynamaya bırakın.",
      "Su kaynayınca 1 su bardağı tel şehriyeyi, tuzu ve karabiberi ekleyin.",
      "Şehriyeler yumuşayana kadar (yaklaşık 8-10 dakika) orta ateşte arada karıştırarak kaynatın.",
      "Üzerine kuru nane serperek sıcak olarak servis yapın."
    ]
  },
  {
    id: 3,
    title: "Arpa Şehriye Pilavı (4 Kişilik)",
    time: "20 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz", "Karabiber"],
    ingredients: ["Arpa Şehriye"],
    ingredientDetails: [
      "2 su bardağı arpa şehriye",
      "2 yemek kaşığı tereyağı",
      "2 yemek kaşığı sıvı yağı",
      "3 su bardağı kaynar su",
      "1 tatlı kaşığı tuz",
      "Yarım çay kaşığı karabiber"
    ],
    steps: [
      "Geniş bir pilav tenceresinde sıvı yağ ve tereyağını ısıtın.",
      "Arpa şehriyeleri tencereye dökün. Şehriyelerin yarısı koyu kahverengi, yarısı altın sarısı olana kadar sürekli karıştırarak kavurun.",
      "Üzerine 3 su bardağı kaynar suyu, tuzu ve karabiberi dikkatçe dökün.",
      "Tencerenin kapağını kapatın, kaynamaya başladığında altını kısalım ve suyunu çekene kadar pişirin.",
      "Altını kapattıktan sonra 10 dakika demlendirip servis yapın."
    ]
  },
  {
    id: 4,
    title: "Pesto Soslu Tavuklu Makarna (4 Kişilik)",
    time: "25 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Sarımsak", "Tuz", "Karabiber"],
    ingredients: ["Makarna", "Tavuk", "Pesto Sos"],
    ingredientDetails: [
      "1 paket (500g) makarna (penne veya burgu)",
      "400 gram tavuk göğsü (küp doğranmış)",
      "4 yemek kaşığı pesto sos",
      "3 diş sarımsak (ince kıyılmış veya ezilmiş)",
      "3 yemek kaşığı zeytinyağı veya sıvı yağ",
      "1 tatlı kaşığı tuz (makarna haşlamak için bolca su ve tuz)"
    ],
    steps: [
      "Geniş bir tencerede bol suyu kaynatın, tuz ekleyin ve makarnaları haşlanmaya bırakın (paket üzerindeki süreye göre al dente haşlayın).",
      "Geniş bir tavada zeytinyağını kızdırın. Küp doğranmış tavuk göğüslerini ekleyip yüksek ateşte suyunu salıp çekene kadar soteleyin.",
      "İçine ince kıyılmış sarımsakları ekleyip 1 dakika daha soteleyin.",
      "Haşlanan makarnadan 1 çay bardağı kadar haşlama suyu kenara ayırın, ardından makarnayı süzün.",
      "Tavukların üzerine pesto sosunu ve haşlanan makarnaları ekleyin. Kıvam alması için ayırdığınız makarna suyundan azar azar ekleyip iyice harmanlayın.",
      "Sıcak olarak servis tabağına alın."
    ]
  },
  {
    id: 5,
    title: "Pastırmalı Yumurta (4 Kişilik)",
    time: "10 dk",
    difficulty: "Çok Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz", "Karabiber"],
    ingredients: ["Pastırma", "Yumurta"],
    ingredientDetails: [
      "150 gram çemensiz pastırma",
      "4 adet yumurta",
      "1 yemek kaşığı tereyağı",
      "1 çay kaşığı karabiber"
    ],
    steps: [
      "Geniş bir tavada tereyağını eritin.",
      "Pastırma dilimlerini tavaya tek kat halinde dizin ve her iki yüzünü de hafifçe çevirerek 1-2 dakika pişirin.",
      "Yumurtaları pastırmaların aralarına kırın.",
      "Üzerine karabiber serpiştirin (tuz isteğe bağlıdır, pastırma tuzludur). Yumurtaların sarısı istediğiniz kıvama gelene kadar pişirip ocaktan alın."
    ]
  },
  {
    id: 6,
    title: "Klasik Menemen (4 Kişilik)",
    time: "15 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tuz", "Karabiber"],
    ingredients: ["Yumurta", "Domates", "Biber"],
    ingredientDetails: [
      "4 adet orta boy olgun domates (kabukları soyulmuş ve küp doğranmış)",
      "3 adet yeşil sivri biber (ince doğranmış)",
      "4 adet yumurta",
      "3 yemek kaşığı sıvı yağı veya 2 yemek kaşığı tereyağı",
      "1 tatlı kaşığı tuz",
      "Yarım çay kaşığı pul biber ve karabiber"
    ],
    steps: [
      "Tavada sıvı yağı veya tereyağını ısıtın, ince doğranmış sivri biberleri ekleyip renkleri dönene kadar soteleyin.",
      "Üzerine küp doğranmış domatesleri ilave edin. Tencerenin kapağını kapatarak domatesler iyice yumuşayıp sos kıvamına gelene kadar pişirin.",
      "Tuz, karabiber ve pul biberi ekleyip karıştırın.",
      "Ayrı bir kapta hafifçe çırptığınız yumurtaları domateslerin üzerine dökün. İsteğinize göre hafif sulu veya tamamen pişmiş olacak şekilde karıştırarak hazırlayın."
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients'); // 'ingredients' veya 'search'

  // Malzemeye göre arama state'leri
  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');

  // Yemek adıyla arama state'i
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

  // Malzemeye göre akıllı eşleşme hesaplama
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

  // Yemek adına göre filtreleme
  const searchResults = searchQuery.trim() === '' ? [] : RECIPES_DATABASE.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-5 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">4 Kişilik Standart Ölçülü Akıllı Mutfak Asistanı</p>
      </header>

      {/* Sekme Değiştirme Butonları */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-5">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'ingredients' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🛒 Malzemeye Göre Bul
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'search' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🔍 Yemek Adı ile Ara
        </button>
      </div>

      {/* 1. SEKME: MALZEMEYE GÖRE ARAMA */}
      {activeTab === 'ingredients' && (
        <div className="space-y-4">
          {/* Mutfak Temelleri */}
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">🧂 Mutfak Temelleri</h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">Tuz, yağ vb. her zaman evde bulunan temel malzemeler:</p>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {kitchenStaples.map((staple) => (
                <span key={staple} className="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  {staple}
                  <button onClick={() => handleRemoveStaple(staple)} className="text-amber-600 hover:text-amber-900 font-bold ml-1">✕</button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddStaple} className="flex gap-2">
              <input
                type="text"
                placeholder="Temel malzeme ekle..."
                value={newStapleInput}
                onChange={(e) => setNewStapleInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-1.5 text-xs focus:outline-emerald-500"
              />
              <button type="submit" className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-amber-700 transition">Ekle</button>
            </form>
          </section>

          {/* Elimdeki Malzemeler */}
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🛒 Elimdeki Özel Malzemeler</h2>
            
            <form onSubmit={handleAddIngredient} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Örn: Pirinç, Tel Şehriye, Yumurta..."
                value={newIngredientInput}
                onChange={(e) => setNewIngredientInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
              <button type="submit" className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">Ekle</button>
            </form>

            {userIngredients.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-2">Henüz özel malzeme girilmedi.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {userIngredients.map((item) => (
                  <span key={item} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                    {item}
                    <button onClick={() => handleRemoveIngredient(item)} className="text-emerald-600 hover:text-emerald-900 font-bold ml-1">✕</button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Tarif Önerileri */}
          <section className="space-y-4 pt-2">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">📖 Önerilen 4 Kişilik Tarifler</h2>

            {userIngredients.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-sm font-medium text-gray-600">Şef Yalçın malzeme bekliyor!</p>
                <p className="text-xs text-gray-400 mt-1">Malzeme eklediğinizde uygun tarifler 4 kişilik ölçüleriyle listelenecektir.</p>
              </div>
            ) : activeRecipes.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
                <p className="text-xs text-gray-500">Girdiğiniz malzemelerle eşleşen 4 kişilik bir tarif bulunamadı.</p>
              </div>
            ) : (
              activeRecipes.map((recipe) => {
                const availableAll = [...kitchenStaples, ...userIngredients].map(i => i.toLowerCase().trim());

                return (
                  <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">{recipe.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        recipe.score === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        %{recipe.score} Eşleşme
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-400 mb-3 flex gap-3">
                      <span>⏱ {recipe.time}</span>
                      <span>📊 {recipe.difficulty}</span>
                      <span className="text-emerald-600 font-medium">👥 4 Kişilik</span>
                    </div>

                    <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Malzeme Ölçüleri ve Gramajları:</span>
                      <ul className="space-y-1">
                        {recipe.ingredientDetails.map((det, idx) => (
                          <li key={idx} className="text-[11px] text-gray-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            {det}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-3 mt-2 text-xs text-gray-600 space-y-1.5">
                      <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Detaylı Hazırlanışı:</span>
                      {recipe.steps.map((step, idx) => (
                        <p key={idx} className="text-[11px] leading-relaxed">
                          <span className="font-bold text-emerald-700 mr-1">{idx + 1}.</span> {step}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </div>
      )}

      {/* 2. SEKME: YEMEK ADI İLE ARAMA */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek Adı ile Doğrudan Tarif Ara</h2>
            <p className="text-[11px] text-gray-400 mb-3">İstediğiniz yemeğin adını yazarak detaylı 4 kişilik tarifine anında ulaşın:</p>
            
            <input
              type="text"
              placeholder="Örn: Pilav, Çorba, Menemen, Makarna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
            />
          </section>

          <section className="space-y-4">
            {searchQuery.trim() === '' ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-sm font-medium text-gray-600">Aramak istediğiniz yemeği yukarıya yazın.</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
                <p className="text-xs text-gray-500">Aradığınız kriterlere uygun tarif bulunamadı.</p>
              </div>
            ) : (
              searchResults.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-sm">{recipe.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700">
                      👥 4 Kişilik
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 mb-3 flex gap-3">
                    <span>⏱ {recipe.time}</span>
                    <span>📊 {recipe.difficulty}</span>
                  </div>

                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Malzeme Ölçüleri ve Gramajları:</span>
                    <ul className="space-y-1">
                      {recipe.ingredientDetails.map((det, idx) => (
                        <li key={idx} className="text-[11px] text-gray-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          {det}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3 mt-2 text-xs text-gray-600 space-y-1.5">
                    <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Detaylı Hazırlanışı:</span>
                    {recipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed">
                        <span className="font-bold text-emerald-700 mr-1">{idx + 1}.</span> {step}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      )}
    </div>
  );
}
