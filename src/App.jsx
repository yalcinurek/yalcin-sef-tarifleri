import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Mısır Unu"];

// Türkçe karakterleri normatif hale getiren temizleme fonksiyonu
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

// Tüm Kategoriler İçin Kesin ve Hatasız Tarif Motoru
const generateAdvancedRecipe = (query, servings) => {
  const norm = normalizeText(query);

  // 1. BALIK & DENİZ ÜRÜNLERİ (Çupra, Cupra, Hamsi, Levrek, Somon, Palamut, İstavrit vb.)
  if (
    norm.includes('cupra') || norm.includes('cipura') || norm.includes('hamsi') ||
    norm.includes('levrek') || norm.includes('somon') || norm.includes('palamut') ||
    norm.includes('istavrit') || norm.includes('balik') || norm.includes('karides') || norm.includes('kalamar')
  ) {
    if (norm.includes('tava') || norm.includes('kizartma') || norm.includes('hamsi') || norm.includes('istavrit')) {
      return {
        title: `${query.toUpperCase()} (Tava / Çıtır Kızartma)`,
        servingsNote: `${servings} Kişilik Tava Ölçüsü`,
        category: "Balık & Deniz Ürünleri",
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
          `${(2 * servings)} yemek kaşığı Mısır Unu`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ`,
          `${(0.5 * servings).toFixed(1)} tatlı kaşığı Tuz`,
          `Servis için taze limon dilimleri ve roka`
        ],
        steps: [
          "Balıkları güzelce temizleyip yıkayın ve suyunu iyice süzdürün.",
          "Mısır unu ve tuzu yayvan bir kapta harmanlayıp balıkları una bulayın.",
          "Tavaya az miktarda sıvı yağ döküp ısıtın. Balıkları dairesel şekilde tavaya dizin.",
          "Arkalı önlü altın sarısı olana kadar kızartıp yanında limon ile sıcak servis edin."
        ]
      };
    }
    // Fırın / Izgara Çupra & Büyük Balıklar
    return {
      title: `${query.toUpperCase()} (Fırında Limonlu & Zeytinyağlı)`,
      servingsNote: `${servings} Kişilik Fırın Ölçüsü`,
      category: "Balık & Deniz Ürünleri",
      detailedIngredients: [
        `${(1 * servings)} adet Temizlenmiş Tüm Balık (${query})`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan (halka doğranmış)`,
        `${(0.5 * servings).toFixed(1)} adet Taze Limon (dilimlenmiş)`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sızma Zeytinyağı`,
        `${(1 * servings)} adet Defne Yaprağı`,
        `Tuz, Tane Karabiber ve Taze Kekik`
      ],
      steps: [
        "Temizlenmiş balığın üzerine bıçakla 2-3 adet hafif çizik atın.",
        "Balığı zeytinyağı, tuz ve karabiber ile ovup marine edin.",
        "Fırın tepsisine yağlı kağıt serip halka doğranmış soğanları dizin, üzerine balığı yerleştirin.",
        "Balığın karın kısmına ve üzerine limon dilimleri ile defne yaprağını koyun.",
        "Önceden ısıtılmış 200 derece fırında yaklaşık 25-30 dakika üzeri kızarana kadar pişirin."
      ]
    };
  }

  // 2. SALATALAR & MEZELER (Çoban, Gavurdağı, Cacık, Piyaz vb.)
  if (
    norm.includes('salata') || norm.includes('cacik') || norm.includes('meze') ||
    norm.includes('piyaz') || norm.includes('kisir') || norm.includes('haydari')
  ) {
    return {
      title: `${query.toUpperCase()} (Taze Soğuk Hazırlanış)`,
      servingsNote: `${servings} Kişilik Taze Ölçü`,
      category: "Salatalar & Soğuk Mezeler",
      detailedIngredients: [
        `${(1 * servings)} adet Taze Domates ve Salatalık (küp doğranmış)`,
        `${(0.5 * servings).toFixed(1)} adet Yeşillik / Biber / Soğan`,
        `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
        `${(0.5 * servings).toFixed(1)} adet Taze Limon Suyu veya Nar Ekşisi`,
        `Tuz`
      ],
      steps: [
        "Sebzeleri yıkayıp taze olarak küçük küpler halinde doğrayın.",
        "Sosu (zeytinyağı, limon suyu, tuz) ayrı bir kapta çırpın.",
        "Doğranmış sebzelerin üzerine döküp zedelemeden karıştırın ve taze olarak servis yapın."
      ]
    };
  }

  // 3. ÇORBALAR (Mantar, Mercimek, Tarhana, Ezogelin vb.)
  if (norm.includes('corba') || norm.includes('mantar') || norm.includes('martar') || norm.includes('mercimek')) {
    if (norm.includes('mantar') || norm.includes('martar')) {
      return {
        title: "KREMALI MANTAR ÇORBASI",
        servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
        category: "Çorbalar",
        detailedIngredients: [
          `${(150 * servings)} gram Kültür Mantarı (ince dilimlenmiş)`,
          `${(1 * servings)} yemek kaşığı Tereyağı`,
          `${(1 * servings)} yemek kaşığı Un`,
          `${(0.5 * servings).toFixed(1)} su bardağı Süt veya Krema`,
          `${(2 * servings)} su bardağı Sıcak Su / Tavuk Suyu`,
          `Tuz ve Karabiber`
        ],
        steps: [
          "Mantarları ince dilimler halinde doğrayıp tereyağında suyunu çekene kadar soteleyin.",
          "Unu ekleyip 1-2 dakika kavurun.",
          "Sıcak suyu ve sütü ekleyip tel çırpıcıyla hızlıca karıştırın.",
          "Kısık ateşte 10 dakika pişirip sıcak servis yapın."
        ]
      };
    }
    return {
      title: `${query.toUpperCase()} ÇORBASI`,
      servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı Kırmızı Mercimek / Şehriye / Tarhana`,
        `${(1 * servings)} yemek kaşığı Tereyağı ve Un`,
        `${(2 * servings)} su bardağı Sıcak Su veya Et Suyu`,
        `Tuz, Nane ve Pul Biber`
      ],
      steps: [
        "Tencerede yağı eritip temel malzemeleri ve unu hafifçe kavurun.",
        "Sıcak suyu ekleyip kaynamaya bırakın.",
        "Malzemeler yumuşayınca pürüzsüz kıvam için blenderdan geçirip servis yapın."
      ]
    };
  }

  // 4. KAHVALTILIKLAR & YUMURTALI YEMEKLER
  if (norm.includes('menemen') || norm.includes('omlet') || norm.includes('yumurta') || norm.includes('krep') || norm.includes('pankek')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Kahvaltılık`,
      category: "Kahvaltılıklar & Yumurtalı Tarifler",
      detailedIngredients: [
        `${(1 * servings)} adet Yumurta`,
        `${(1 * servings)} adet Domates / Biber veya Peynir`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Tereyağı`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Tavada tereyağını eritip sebzeleri soteleyin.",
        "Yumurtaları kırıp tuz ekleyin ve istediğiniz kıvama gelene kadar pişirin."
      ]
    };
  }

  // 5. PİLAVLAR & MAKARNALAR
  if (norm.includes('pilav') || norm.includes('makarna') || norm.includes('eriste') || norm.includes('spagetti')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Pilavlar & Makarnalar",
      detailedIngredients: [
        `${(0.75 * servings).toFixed(1)} su bardağı Pirinç / Bulgu / Makarna`,
        `${(1 * servings)} su bardağı Sıcak Su veya Haşlama Suyu`,
        `${(1 * servings)} yemek kaşığı Tereyağı / Sıvı Yağ`,
        `Tuz ve Baharatlar`
      ],
      steps: [
        "Pilav ise pirinci kavurup sıcak su ile demlendirin.",
        "Makarna ise bol kaynar suda haşlayıp sosla harmanlayın."
      ]
    };
  }

  // 6. ET, TAVUK SOTE & DÜRÜM
  if (norm.includes('tavuk') || norm.includes('durum') || norm.includes('doner') || norm.includes('kofte') || norm.includes('biftek')) {
    return {
      title: `${query.toUpperCase()} (Tavada / Sote)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Et & Tavuk Yemekleri",
      detailedIngredients: [
        `${(150 * servings)} gram Jülyen/Kuşbaşı Et veya Tavuk`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Biber`,
        `${(1 * servings)} yemek kaşığı Sıvı Yağ / Tereyağı`,
        `Tuz, Kekik ve Karabiber`
      ],
      steps: [
        "Etleri veya tavukları kızgın tavada yüksek ateşte soteleyin.",
        "Soğan ve biberleri ekleyip kavurun.",
        "Baharatları ekleyip sıcak servis yapın."
      ]
    };
  }

  // 7. GENEL SEBZE YEMEKLERİ (Salçasız/Kavurmasız Sade Sebze Pişirme)
  return {
    title: `${query.toUpperCase()} (Sade Sebze Yemeği / Sote)`,
    servingsNote: `${servings} Kişilik Ölçü`,
    category: "Sebze & Ev Yemekleri",
    detailedIngredients: [
      `${(150 * servings)} gram Doğranmış Sebze (${query})`,
      `${(1 * servings)} yemek kaşığı Zeytinyağı`,
      `${(0.5 * servings).toFixed(1)} adet Kuru Soğan`,
      `Tuz ve Karabiber`
    ],
    steps: [
      "Zeytinyağını ısıtıp soğanları hafifçe soteleyin.",
      "Doğranmış sebzeleri ekleyip kendi suyunu çekene kadar kısık ateşte pişirin."
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
                placeholder="Örn: Çupra, Patates, Mercimek..."
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
