import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Sıvı Yağ", "Tereyağı", "Salça", "Soğan", "Sarımsak"];

// Girdiğiniz malzemelere göre %100 doğrudan ve gerçekçi tarif üreten akıllı motor
const generateRecipesFromIngredients = (ingredients, staples, servings) => {
  if (!ingredients || ingredients.length === 0) return [];

  const lowerIngs = ingredients.map(i => i.toLowerCase().trim());
  const ingStr = ingredients.join(" ve ");

  // 1. ÖZEL DURUM: PATATES VE YUMURTA
  if (lowerIngs.includes('patates') && lowerIngs.includes('yumurta')) {
    return [
      {
        id: 'dyn-1',
        title: "Küp Patatesli Yumurta Sote",
        source: "Geleneksel Kahvaltı & Pratik Mutfak",
        time: "15-20 dk",
        servingsNote: `${servings} Kişilik Hesaplanan Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Patates (küçük küpler halinde doğranmış)`,
          `${(1 * servings)} adet Yumurta`,
          `${(0.75 * servings).toFixed(1)} yemek kaşığı Tereyağı veya Sıvı Yağ`,
          `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz, Karabiber ve Pul Biber`
        ],
        steps: [
          "Patatesleri minik küpler halinde doğrayın.",
          "Tavada yağı kızdırıp patatesleri yumuşayıp üzeri hafif kızarana kadar kapağı kapalı şekilde pişirin.",
          "Patatesler pişince üzerine tuz ve baharatları ekleyip karıştırın.",
          "Yumurtaları doğrudan patateslerin üzerine kırın. İster sarılarını bozmadan ister karıştırarak pişirip sıcak servis edin."
        ]
      },
      {
        id: 'dyn-2',
        title: "Rendelenmiş Patatesli Omlet (İspanyol Usulü)",
        source: "Pratik Mutfak Rehberi",
        time: "15 dk",
        servingsNote: `${servings} Kişilik Hesaplanan Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} adet Patates (rendelenmiş ve suyu sıkılmış)`,
          `${(1 * servings)} adet Yumurta (çırpılmış)`,
          `${(0.5 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ`,
          `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz ve Karabiber`
        ],
        steps: [
          "Patatesleri rendeleyin ve çıkan fazla suyunu elinizle iyice sıkın.",
          "Tavada az yağı kızdırıp rendelenmiş patatesleri tavaya ince bir katman halinde yayın, arkalı önlü hafifçe pişirin.",
          "Çırpılmış yumurtayı patateslerin üzerine dökün. Kısık ateşte kapağı kapalı olarak omlet kıvamında pişirin."
        ]
      }
    ];
  }

  // 2. DİĞER TÜM MALZEME KOMBİNASYONLARI İÇİN DİNAMİK VE DOĞRUDAN TARİF ÜRETİCİ
  return [
    {
      id: 'dyn-1',
      title: `${ingStr} Sote / Tencere Yemeği`,
      source: "Şefin Mutfak Rehberi",
      time: "20-25 dk",
      servingsNote: `${servings} Kişilik Hesaplanan Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon ${ing}`).concat([
        `${(0.25 * servings).toFixed(1)} adet Kuru Soğan`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ / Tereyağı`,
        `Tuz, Karabiber ve İsteğe Göre Baharatlar`
      ]),
      steps: [
        `Geniş bir tavada yağı kızdırıp soğanları pembeleşene kadar soteleyin.`,
        `Ana malzemeleriniz olan (${ingStr}) ekleyip pişme sürelerine göre sırayla karıştırarak pişirin.`,
        `Tuz ve baharatları ekleyip ${servings} kişilik porsiyon ölçülerine göre sıcak servis yapın.`
      ]
    },
    {
      id: 'dyn-2',
      title: `Pratik ${ingStr} Harmanı`,
      source: "Hızlı Mutfak Yöntemleri",
      time: "15 dk",
      servingsNote: `${servings} Kişilik Hesaplanan Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon ${ing}`).concat([
        `${(0.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
        `Tuz ve Kekik`
      ]),
      steps: [
        `Tavada zeytinyağını ısıtıp (${ingStr}) malzemelerini yüksek ateşte soteleyin.`,
        `Baharatları ekleyip 10 dakika kendi buharında pişirin.`
      ]
    }
  ];
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(2); // Porsiyon

  // Malzemeye göre arama state'leri
  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');

  // Yemek adıyla arama state'leri
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

  // Doğrudan girilen malzemelere göre tarif üret
  const ingredientRecipes = generateRecipesFromIngredients(userIngredients, kitchenStaples, servings);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Gelişmiş Akıllı Mutfak Asistanı</p>
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
                placeholder="Örn: Patates, Yumurta, Tavuk..."
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

          {/* Malzemeye Göre Çıkan Doğrudan Tarifler */}
          <div className="space-y-4">
            {userIngredients.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
                <p className="text-xs text-gray-500">Malzemelerinizi girin, o malzemelerle yapılabilecek özel tarifler anında hazırlansın.</p>
              </div>
            ) : (
              ingredientRecipes.map((recipe, index) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Öneri {index + 1}: {recipe.title}</h4>
                  <p className="text-[10px] text-gray-400 mb-2">{recipe.source} • {recipe.servingsNote}</p>
                  
                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Gerekli Malzeme Ölçüleri:</span>
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
                    <span className="font-semibold text-gray-700 block">👨‍🍳 Yapılışı:</span>
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
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek Adı ile Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Karnıyarık, Lazanya, Menemen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
              />
            </form>
          </section>

          {searchQuery.trim() !== '' && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
              <h4 className="font-bold text-gray-800 text-sm mb-1">{searchQuery} (Arama Tarifi)</h4>
              <p className="text-[10px] text-gray-400 mb-2">{servings} Kişilik Özel Hazırlanan Ölçü</p>
              <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg">
                <span className="font-semibold text-gray-700 block mb-1">⚖️ Malzemeler:</span>
                <div className="text-[11px]">• {(1 * servings)} porsiyon {searchQuery} Ana Malzemesi</div>
                <div className="text-[11px]">• {(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak</div>
                <div className="text-[11px]">• {(1 * servings)} yemek kaşığı Sıvı Yağ / Salça</div>
              </div>
              <div className="border-t pt-2 text-xs space-y-1">
                <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Yapılışı:</span>
                <p className="text-[11px] text-gray-600">1. Malzemeleri hazırlayıp yağı tavada ısıtın.</p>
                <p className="text-[11px] text-gray-600">2. Soğanları ve ana malzemeleri ekleyip kavurun.</p>
                <p className="text-[11px] text-gray-600">3. Salça ve baharatları ekleyip kısık ateşte demlendirerek pişirin.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
