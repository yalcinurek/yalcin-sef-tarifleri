import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak"];

// Gelişmiş Akıllı Yemek/Salata Akıl Motoru
const generateSmartSearchRecipe = (query, servings) => {
  const q = query.toLowerCase().trim();

  // 1. SALATALAR VE SOĞUK MEZELER (Pişirme/Kavurma Kesinlikle YOK!)
  if (q.includes('salata') || q.includes('cacık') || q.includes('meze') || q.includes('piyaz') || q.includes('gavurdağı')) {
    let ingredientsList = [];
    
    if (q.includes('çoban') || q.includes('coban')) {
      ingredientsList = [
        `${(1 * servings)} adet Orta Boy Domates (küp doğranmış)`,
        `${(1 * servings)} adet Salatalık (kabuğu soyulup küp doğranmış)`,
        `${(0.5 * servings).toFixed(1)} adet Yeşil Biber (ince kıyılmış)`,
        `${(0.25 * servings).toFixed(1)} adet Kuru Soğan veya Çeyrek Demet Maydanoz`,
        `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
        `${(0.5 * servings).toFixed(1)} adet Taze Sıkılmış Limon Suyu veya Nar Ekşisi`,
        `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz`
      ];
    } else {
      ingredientsList = [
        `${(1 * servings)} porsiyon Doğranmış Taze Sebzeler (${query} için)`,
        `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
        `${(0.5 * servings).toFixed(1)} adet Limon Suyu`,
        `Tuz ve İsteğe Göre Yeşillikler`
      ];
    }

    return {
      title: `${query.toUpperCase()} (Taze Soğuk Hazırlanış)`,
      servingsNote: `${servings} Kişilik Taze Ölçü`,
      isCold: true,
      detailedIngredients: ingredientsList,
      steps: [
        "Domates, salatalık ve biberleri eşit büyüklükte küçük küpler halinde doğrayın.",
        "Kuru soğanı piyazlık doğrayıp az tuzla ovarak acısını çıkarın ve yıkayıp kurutun.",
        "Tüm doğranmış sebzeleri ve ince kıyılmış maydanozu geniş bir salata kasesinde birleştirin.",
        "Ayrı bir kapta zeytinyağı, limon suyu (veya nar ekşisi) ve tuzu çırparak sosu hazırlayın.",
        "Hazırladığınız sosu salatanın üzerine döküp zedelemeden karıştırın ve taze olarak servis edin."
      ]
    };
  }

  // 2. YUMURTALI YEMEKLER & MENEMEN/OMLET
  if (q.includes('yumurta') || q.includes('menemen') || q.includes('omlet')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: [
        `${(1 * servings)} adet Yumurta`,
        `${(1 * servings)} adet Domates & Biber`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Tereyağı / Sıvı Yağ`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Sebzeleri tavada yağ ile soteleyin.",
        "Yumurtaları kırıp tuz ekleyin.",
        "Kısık ateşte karıştırarak pişirin."
      ]
    };
  }

  // 3. ÇORBALAR
  if (q.includes('çorba') || q.includes('corba')) {
    return {
      title: `${query.toUpperCase()} (Tencere Çorbası)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı Ana Çorba Malzemesi (${query})`,
        `${(1.5 * servings)} su bardağı Sıcak Su / Et Suyu`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Yağ ve Salça/Un`,
        `Tuz ve Baharatlar`
      ],
      steps: [
        "Tencerede yağ ve unu/salçayı hafifçe kavurun.",
        "Ana malzemeleri ve sıcak suyu ekleyip kaynamaya bırakın.",
        "Kısık ateşte yumuşayana kadar pişirip pürüzsüz olana kadar blenderdan geçirin."
      ]
    };
  }

  // 4. GENEL SICAK YEMEKLER
  return {
    title: `${query.toUpperCase()} (Sıcak Yemek)`,
    servingsNote: `${servings} Kişilik Ölçü`,
    detailedIngredients: [
      `${(1 * servings)} porsiyon Ana Malzeme (${query})`,
      `${(0.25 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak`,
      `${(1 * servings)} yemek kaşığı Sıvı Yağ / Salça`,
      `Tuz ve Baharatlar`
    ],
    steps: [
      "Tencerede yağı ısıtıp soğanları soteleyin.",
      "Ana malzemeleri ve salçayı ekleyip kavurun.",
      "Sıcak su ekleyip kısık ateşte pişmeye bırakın."
    ]
  };
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(2);

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

  // Yemek Arama Sonucu
  const searchRecipeResult = searchQuery.trim() !== '' ? generateSmartSearchRecipe(searchQuery, servings) : null;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Akıllı ve Doğru Mutfak Asistanı</p>
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
                placeholder="Örn: Salatalık, Domates, Biber..."
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
        </div>
      )}

      {/* 2. SEKME: YEMEK ADI İLE ARAMA */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek Adı veya Salata Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Çoban Salata, Mercimek Çorbası, Menemen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
            </form>
          </section>

          {searchRecipeResult && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
              <h4 className="font-bold text-gray-800 text-sm mb-1">{searchRecipeResult.title}</h4>
              <p className="text-[10px] text-emerald-600 font-medium mb-3">{searchRecipeResult.servingsNote}</p>
              
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
                <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Hazırlanışı:</span>
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
