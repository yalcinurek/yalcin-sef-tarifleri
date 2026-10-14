import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ"];

// Tüm Kategorileri Kapsayan Gelişmiş ve Gerçekçi Malzeme Üretici Motoru
const generateAdvancedRecipe = (query, servings) => {
  const q = query.toLowerCase().trim();

  // 1. ÇORBALAR (Mercimek, Mantar, Tarhana, Ezogelin vb.)
  if (q.includes('çorba') || q.includes('corba')) {
    if (q.includes('mantar') || q.includes('martar')) {
      return {
        title: "KREMALI MANTAR ÇORBASI",
        servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
        category: "Çorbalar",
        detailedIngredients: [
          `${(150 * servings)} gram Kültür Mantarı (dilimlenmiş)`,
          `${(1 * servings)} yemek kaşığı Tereyağı`,
          `${(1 * servings)} yemek kaşığı Buğday Unu`,
          `${(0.5 * servings).toFixed(1)} su bardağı Sıvı Krema veya Süt`,
          `${(2 * servings)} su bardağı Sıcak Su / Tavuk Suyu`,
          `${(0.5 * servings).toFixed(1)} diş Ezilmiş Sarımsak`,
          `Tuz ve Karabiber`
        ],
        steps: [
          "Mantarları nemli bezle temizleyip ince dilimler halinde doğrayın.",
          "Tencerede tereyağını eritip sarımsak ve mantarları suyunu salıp çekene kadar soteleyin.",
          "Unu ekleyip 1-2 dakika mantarlarla birlikte kavurun.",
          "Sıcak suyu ve sütü/kremayı tel çırpıcıyla hızlıca karıştırarak ekleyin.",
          "Kısık ateşte 10 dakika kaynatıp sıcak servis yapın."
        ]
      };
    }
    // Klasik Mercimek / Ezogelin Çorbası
    return {
      title: "GELENEKSEL SÜZME MERCİMEK ÇORBASI",
      servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı Kırmızı Mercimek (yıkanmış süzülmüş)`,
        `${(0.25 * servings).toFixed(1)} adet Kuru Soğan`,
        `${(0.25 * servings).toFixed(1)} adet Patates (küp doğranmış)`,
        `${(0.25 * servings).toFixed(1)} adet Havuç`,
        `${(1 * servings)} yemek kaşığı Sıvı Yağ / Tereyağı`,
        `${(2 * servings)} su bardağı Sıcak Su veya Et Suyu`,
        `Tuz, Kimyon ve Nane`
      ],
      steps: [
        "Soğan, patates ve havucu irice doğrayın.",
        "Tencerede yağı ısıtıp sebzeleri ve yıkanmış mercimekleri 2 dakika soteleyin.",
        "Sıcak suyu ekleyip mercimekler ve sebzeler tamamen yumuşayana kadar (yaklaşık 20 dk) haşlayın.",
        "Pürüzsüz bir kıvam alana kadar blenderdan geçirin. Üzerine kızdırılmış tereyağı ve nane gezdirip servis yapın."
      ]
    };
  }

  // 2. BALIK & DENİZ ÜRÜNLERİ (Hamsi, İstavrit, Levrek vb.)
  if (q.includes('hamsi') || q.includes('istavrit') || q.includes('balık') || q.includes('balik') || q.includes('levrek') || q.includes('somon') || q.includes('palamut')) {
    if (q.includes('fırın') || q.includes('firin')) {
      return {
        title: `${query.toUpperCase()} (Fırında Sebzeli)`,
        servingsNote: `${servings} Kişilik Fırın Ölçüsü`,
        category: "Balık & Deniz Ürünleri",
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
          `${(0.5 * servings).toFixed(1)} adet Patates (halka doğranmış)`,
          `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Limon`,
          `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
          `Tuz, Karabiber ve Kekik`
        ],
        steps: [
          "Fırın tepsisine halka doğranmış patatesleri ve soğanları dizin.",
          "Üzerine balıkları yerleştirip zeytinyağı, limon dilimleri ve baharatları ekleyin.",
          "200 derece fırında patatesler yumuşayana kadar 25 dakika pişirin."
        ]
      };
    }
    return {
      title: `${query.toUpperCase()} (Mısır Unlu Tava)`,
      servingsNote: `${servings} Kişilik Tava Ölçüsü`,
      category: "Balık & Deniz Ürünleri",
      detailedIngredients: [
        `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
        `${(2 * servings)} yemek kaşığı Mısır Unu`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ`,
        `${(0.5 * servings).toFixed(1)} tatlı kaşığı Tuz`,
        `Limon dilimleri`
      ],
      steps: [
        "Balıkları yıkayıp süzün ve mısır unu ile tuz karışımına bulayın.",
        "Tavada sıvı yağı ısıtıp balıkları dairesel şekilde sıkıca dizin.",
        "Arkalı önlü altın sarısı olana kadar kızartıp limonla servis yapın."
      ]
    };
  }

  // 3. SALATALAR & SOĞUK MEZELER (Pişirme Yok)
  if (q.includes('salata') || q.includes('cacık') || q.includes('meze') || q.includes('piyaz') || q.includes('gavurdağı') || q.includes('kısır')) {
    if (q.includes('çoban') || q.includes('coban')) {
      return {
        title: "GELENEKSEL ÇOBAN SALATASI",
        servingsNote: `${servings} Kişilik Taze Ölçü`,
        category: "Salatalar & Soğuk Mezeler",
        detailedIngredients: [
          `${(1 * servings)} adet Orta Boy Domates (küp doğranmış)`,
          `${(1 * servings)} adet Salatalık (küp doğranmış)`,
          `${(0.5 * servings).toFixed(1)} adet Yeşil Biber ve Çeyrek Soğan`,
          `${(0.25 * servings).toFixed(1)} demet Maydanoz`,
          `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
          `${(0.5 * servings).toFixed(1)} adet Limon Suyu`,
          `Tuz`
        ],
        steps: [
          "Domates, salatalık, biber ve soğanı küçük küpler halinde doğrayın.",
          "Maydanozu ince kıyıp ekleyin.",
          "Zeytinyağı, limon suyu ve tuzu karıştırıp salatanın üzerine dökerek taze servis yapın."
        ]
      };
    }
    return {
      title: `${query.toUpperCase()} (Soğuk Hazırlanış)`,
      servingsNote: `${servings} Kişilik Taze Ölçü`,
      category: "Salatalar & Soğuk Mezeler",
      detailedIngredients: [
        `${(1 * servings)} porsiyon Taze Doğranmış Sebzeler / Yoğurt`,
        `${(1 * servings)} yemek kaşığı Zeytinyağı`,
        `Limon, Tuz ve Baharatlar`
      ],
      steps: [
        "Malzemeleri taze olarak doğrayıp kaseye alın.",
        "Zeytinyağı, limon ve tuzu ekleyip harmanlayarak servis edin."
      ]
    };
  }

  // 4. PİLAVLAR & MAKARNALAR
  if (q.includes('pilav') || q.includes('makarna') || q.includes('erişte') || q.includes('eriste') || q.includes('spagetti')) {
    if (q.includes('pirinç') || q.includes('prinç')) {
      return {
        title: "KLASİK PİRİNÇ PİLAVI",
        servingsNote: `${servings} Kişilik Pilav Ölçüsü`,
        category: "Pilavlar & Makarnalar",
        detailedIngredients: [
          `${(0.75 * servings).toFixed(1)} su bardağı Baldo Pirinç (ıslatılmış)`,
          `${(0.25 * servings).toFixed(1)} çay bardağı Tel Şehriye`,
          `${(1 * servings)} yemek kaşığı Tereyağı`,
          `${(0.5 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ`,
          `${(1.25 * servings)} su bardağı Kaynar Su veya Tavuk Suyu`,
          `1 tatlı kaşığı Tuz`
        ],
        steps: [
          "Pirinçleri ılık tuzlu suda 20 dk bekletip nişastası gidene kadar yıkayın ve süzün.",
          "Tencerede yağları eritip tel şehriyeleri rengi dönene kadar kavurun.",
          "Süzülen pirinçleri ekleyip 3-4 dakika şeffaflaşana kadar kavurun.",
          "Kaynar su ve tuzu ekleyip kapağını kapatın. Kısık ateşte suyunu çekene kadar pişirip 15 dk demlendirin."
        ]
      };
    }
    return {
      title: `${query.toUpperCase()} (Haşlama & Soslu)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Pilavlar & Makarnalar",
      detailedIngredients: [
        `${(100 * servings)} gram Makarna / Erişte`,
        `${(1 * servings)} yemek kaşığı Sıvı Yağ / Tereyağı`,
        `${(0.5 * servings).toFixed(1)} su bardağı Domates Sosu veya Peynir`,
        `Bol Su ve Tuz (Haşlamak için)`
      ],
      steps: [
        "Bol tuzlu kaynar suda makarnayı paket süresine göre haşlayıp süzün.",
        "Tavada yağ ve sosu ısıtıp makarnayı ekleyin ve harmanlayarak sıcak servis yapın."
      ]
    };
  }

  // 5. KAHVALTILIKLAR & YUMURTA
  if (q.includes('menemen') || q.includes('omlet') || q.includes('yumurta') || q.includes('krep') || q.includes('pankek')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Kahvaltılık`,
      category: "Kahvaltılıklar & Yumurtalı Tarifler",
      detailedIngredients: [
        `${(1 * servings)} adet Yumurta`,
        `${(1 * servings)} adet Domates ve Biber`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Tereyağı`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Tavada tereyağını eritip doğranmış biber ve domatesleri soteleyin.",
        "Yumurtaları kırıp tuz ekleyin ve istediğiniz kıvama gelene kadar karıştırarak pişirin."
      ]
    };
  }

  // 6. DÜRÜM VE SOKAK LEZZETLERİ
  if (q.includes('dürüm') || q.includes('döner') || q.includes('tantuni') || q.includes('hatay')) {
    return {
      title: `${query.toUpperCase()} (Soslu Sokak Lezzeti)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Dürüm & Sokak Lezzetleri",
      detailedIngredients: [
        `${(140 * servings)} gram Jülyen Et veya Tavuk`,
        `${(1 * servings)} adet Dürüm Lavaşı`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Özel Salçalı Sos`,
        `Sıvı Yağ, Mayonez ve Baharatlar`
      ],
      steps: [
        "Etleri tavada yüksek ateşte soteleyin.",
        "Lavaşı sosa bulayıp tavukları ve sosu içine ekleyin.",
        "Dürüm yapıp tost makinesinde ısıtın."
      ]
    };
  }

  // 7. ET, TAVUK SOTE & IZGARA YEMEKLERİ
  if (q.includes('tavuk') || q.includes('et') || q.includes('sote') || q.includes('köfte') || q.includes('kofte')) {
    return {
      title: `${query.toUpperCase()} (Tavada / Izgara Usulü)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Et & Tavuk Yemekleri",
      detailedIngredients: [
        `${(150 * servings)} gram Kuşbaşı Et veya Tavuk / Kıyma`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Biber`,
        `${(0.5 * servings).toFixed(1)} yemek kaşığı Salça`,
        `${(1 * servings)} yemek kaşığı Sıvı Yağ`,
        `Tuz, Kimyon, Karabiber ve Kekik`
      ],
      steps: [
        "Tavada yağı kızdırıp etleri veya tavukları ekleyin; suyunu salıp çekene kadar soteleyin.",
        "Soğan ve biberleri ekleyip kavurmaya devam edin.",
        "Salça ve baharatları ekleyip 5 dakika kısık ateşte pişirip sıcak servis yapın."
      ]
    };
  }

  // 8. GENEL TENCERE VE EV YEMEKLERİ (VARSAYILAN)
  return {
    title: `${query.toUpperCase()} (Ev Usulü Yemek)`,
    servingsNote: `${servings} Kişilik Tencere Ölçüsü`,
    category: "Tencere & Sulu Yemekler",
    detailedIngredients: [
      `${(120 * servings)} gram Doğranmış Ana Malzeme (${query})`,
      `${(0.25 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak`,
      `${(0.5 * servings).toFixed(1)} yemek kaşığı Salça`,
      `${(1 * servings)} yemek kaşığı Sıvı Yağ`,
      `${(1 * servings)} su bardağı Sıcak Su`,
      `Tuz ve Karabiber`
    ],
    steps: [
      "Tencerede yağı ısıtıp soğanları pembeleşene kadar soteleyin.",
      "Salçayı ve ana malzemeleri ekleyip kavurun.",
      "Sıcak su ekleyip kısık ateşte demlendirerek pişirin."
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
                placeholder="Örn: Mercimek, Patates, Tavuk..."
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
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek veya Çorba Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Mercimek Çorbası, Pirinç Pilavı, Hamsi Tava..."
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
