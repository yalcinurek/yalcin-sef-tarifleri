import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Mısır Unu", "Sıvı Yağ"];

// 18 KAPSAMLI MUTFAK KATEGORİSİ & PİŞİRME TEKNİKLERİ MOTORU
const generateAdvancedRecipe = (query, servings) => {
  const q = query.toLowerCase().trim();

  // 1. BALIK & DENİZ ÜRÜNLERİ (Tava / Kızartma / Fırın)
  if (q.includes('hamsi') || q.includes('istavrit') || q.includes('balık') || q.includes('balik') || q.includes('levrek') || q.includes('somon') || q.includes('palamut') || q.includes('çipura')) {
    if (q.includes('fırın') || q.includes('firin') || q.includes('buğulama')) {
      return {
        title: `${query.toUpperCase()} (Fırında / Buğulama)`,
        servingsNote: `${servings} Kişilik Fırın Ölçüsü`,
        category: "Balık & Deniz Ürünleri",
        detailedIngredients: [
          `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
          `${(0.5 * servings).toFixed(1)} adet Halka Doğranmış Kuru Soğan`,
          `${(0.5 * servings).toFixed(1)} adet Limon (dilimlenmiş)`,
          `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
          `${(1 * servings)} adet Defne Yaprağı`,
          `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz ve Tane Karabiber`
        ],
        steps: [
          "Temizlenmiş balıkları bol soğuk suda yıkayıp süzgece alın ve kurulayın.",
          "Fırın tepsisine veya borcama yağlı kağıt serin.",
          "Halka doğranmış soğanları tepsinin tabanına dizip üzerine balıkları yerleştirin.",
          "Balıkların üzerine limon dilimlerini, defne yaprağını, zeytinyağını, tuz ve karabiberi ekleyin.",
          "Önceden ısıtılmış 200 derece fırında yaklaşık 20-25 dakika pişirip sıcak servis yapın."
        ]
      };
    }
    // Tava / Kızartma
    return {
      title: `${query.toUpperCase()} (Tava / Çıtır Kızartma)`,
      servingsNote: `${servings} Kişilik Tava Ölçüsü`,
      category: "Balık & Deniz Ürünleri",
      detailedIngredients: [
        `${(200 * servings)} gram Temizlenmiş Balık (${query})`,
        `${(2 * servings)} yemek kaşığı Mısır Unu (veya Buğday Unu)`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ (Tava için)`,
        `${(0.5 * servings).toFixed(1)} tatlı kaşığı Tuz`,
        `${(0.5 * servings).toFixed(1)} adet Limon (servis için)`
      ],
      steps: [
        "Temizlenip yıkanan balıkları süzgece alıp suyunu iyice süzdürün.",
        "Geniş bir kapta mısır ununu ve tuzu harmanlayın.",
        "Balıkları mısır ununa bulayıp fazla ununu silkeleyin.",
        "Balık tavasına yağın yarısını dökün. Balıkları tavanın kenarlarından başlayarak dairesel şekilde sıkıca dizin.",
        "Orta ateşte alt yüzü altın sarısı kızarana kadar (yaklaşık 5-6 dk) pişirin.",
        "Balık tavası kapağı veya düz bir tabak yardımıyla balıkları ters çevirin. Tavanın kenarından kalan yağı ekleyip diğer yüzünü de kızartın.",
        "Sıcak olarak yanında limon dilimleri ve rokayla servis yapın."
      ]
    };
  }

  // 2. SALATALAR & SOĞUK MEZELER (Sıcak/Pişirme İşlemi Kesinlikle Yok!)
  if (q.includes('salata') || q.includes('cacık') || q.includes('cacik') || q.includes('meze') || q.includes('piyaz') || q.includes('gavurdağı') || q.includes('haydari') || q.includes('kısır')) {
    if (q.includes('çoban') || q.includes('coban')) {
      return {
        title: "GELENEKSEL ÇOBAN SALATASI",
        servingsNote: `${servings} Kişilik Taze Ölçü`,
        category: "Salatalar & Soğuk Mezeler",
        detailedIngredients: [
          `${(1 * servings)} adet Orta Boy Domates (küp doğranmış)`,
          `${(1 * servings)} adet Salatalık (kabukları soyulup küp doğranmış)`,
          `${(0.5 * servings).toFixed(1)} adet Yeşil Sivri Biber (ince kıyılmış)`,
          `${(0.25 * servings).toFixed(1)} adet Kuru Soğan (piyazlık doğranmış)`,
          `${(0.25 * servings).toFixed(1)} demet İnce Kıyılmış Maydanoz`,
          `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı`,
          `${(0.5 * servings).toFixed(1)} adet Taze Limon Suyu veya Nar Ekşisi`,
          `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz`
        ],
        steps: [
          "Domates, salatalık ve biberleri eşit küçüklükte doğrayın.",
          "Piyazlık doğranmış soğanları az tuzla hafifçe ovarak acısını çıkarın ve yıkayıp süzün.",
          "Doğranmış tüm sebzeleri ve ince kıyılmış maydanozu derin bir salata kasesinde birleştirin.",
          "Zeytinyağı, limon suyu (veya nar ekşisi) ve tuzu sos kabında çırpın.",
          "Sosu salatanın üzerine döküp zedelemeden karıştırın ve bekletmeden servis yapın."
        ]
      };
    }
    return {
      title: `${query.toUpperCase()} (Taze Soğuk Hazırlanış)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Salatalar & Soğuk Mezeler",
      detailedIngredients: [
        `${(1 * servings)} porsiyon Taze Malzeme (${query} için)`,
        `${(1 * servings)} yemek kaşığı Sızma Zeytinyağı / Süzme Yoğurt`,
        `${(0.5 * servings).toFixed(1)} adet Limon Suyu veya Sarımsak`,
        `Tuz ve Taze Yeşillikler`
      ],
      steps: [
        "Tüm malzemeleri yıkayıp soğuk olarak doğrayın veya rendeyleyin.",
        "Sos malzemelerini ayrı bir kapta karıştırın.",
        "Sosu malzemelerin üzerine döküp hafifçe harmanlayarak soğuk servis yapın."
      ]
    };
  }

  // 3. KAHVALTILIKLAR & YUMURTALI TARİFLER
  if (q.includes('menemen') || q.includes('omlet') || q.includes('yumurta') || q.includes('krep') || q.includes('pankek') || q.includes('kuymak') || q.includes('mıhlama')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Kahvaltılık Ölçü`,
      category: "Kahvaltılıklar & Yumurtalı Tarifler",
      detailedIngredients: [
        `${(1 * servings)} adet Yumurta`,
        `${(1 * servings)} adet Doğranmış Domates / Biber veya Peynir`,
        `${(0.75 * servings).toFixed(1)} yemek kaşığı Tereyağı / Sıvı Yağ`,
        `Tuz, Karabiber ve Pul Biber`
      ],
      steps: [
        "Tavada tereyağını eritin, kullanılıyorsa biber ve domatesleri yumuşayana kadar soteleyin.",
        "Yumurtaları tuz ve baharatla hafifçe çırpın.",
        "Tavaya döküp kısık ateşte istediğiniz kıvama gelene kadar pişirin."
      ]
    };
  }

  // 4. DÜRÜM, DÖNER & SOKAK LEZZETLERİ
  if (q.includes('dürüm') || q.includes('durum') || q.includes('döner') || q.includes('doner') || q.includes('tantuni') || q.includes('tako') || q.includes('taco') || q.includes('hatay')) {
    return {
      title: `${query.toUpperCase()} (Sokak Lezzeti & Soslu Dürüm)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Dürüm & Sokak Lezzetleri",
      detailedIngredients: [
        `${(140 * servings)} gram Et / Tavuk (Jülyen doğranmış)`,
        `${(1 * servings)} adet Dürüm Lavaşı / Ekmek`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Özel Salçalı / Sarımsaklı Sos`,
        `${(0.5 * servings).toFixed(1)} porsiyon Patates Kızartması / Turşu`,
        `Sıvı Yağ ve Baharatlar`
      ],
      steps: [
        "Etleri veya tavukları yüksek ateşte tavada sotelerken kızartın.",
        "Özel salçalı ve sarımsaklı sosu tavada kaynatın.",
        "Lavaşı tavadaki etlerin yağına ve sosa bastırın.",
        "Lavaşa eti, kızarmış patatesi ve sosu ekleyip sıkıca sarın.",
        "Tost makinesinde veya tavada dışı çıtır olana kadar bastırarak ısıtın."
      ]
    };
  }

  // 5. ÇORBALAR
  if (q.includes('çorba') || q.includes('corba')) {
    return {
      title: `${query.toUpperCase()} (Tencere Çorbası)`,
      servingsNote: `${servings} Kişilik Çorba Ölçüsü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı Ana Çorba Malzemesi (${query})`,
        `${(1.5 * servings)} su bardağı Sıcak Su / Et Suyu`,
        `${(0.5 * servings).toFixed(1)} yemek kaşığı Un ve Tereyağı/Yağ`,
        `${(0.25 * servings).toFixed(1)} tatlı kaşığı Tuz ve Baharatlar`
      ],
      steps: [
        "Tencerede yağ ve unu hafifçe kavurun.",
        "Ana malzemeleri ve sıcak suyu çırpıcıyla karıştırarak tencereye ekleyin.",
        "Kısık ateşte yumuşayana kadar pişirip blenderdan geçirin. Üzerine kızdırılmış yağ dökerek servis yapın."
      ]
    };
  }

  // 6. PİLAVLAR & MAKARNALAR
  if (q.includes('pilav') || q.includes('makarna') || q.includes('erişte') || q.includes('eriste') || q.includes('spagetti')) {
    return {
      title: `${query.toUpperCase()}`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Pilavlar & Makarnalar",
      detailedIngredients: [
        `${(0.75 * servings).toFixed(1)} su bardağı Pirinç / Makarna / Şehriye`,
        `${(1 * servings)} su bardağı Sıcak Su veya Haşlama Suyu`,
        `${(1 * servings)} yemek kaşığı Tereyağı / Zeytinyağı`,
        `Tuz ve Sos Malzemeleri`
      ],
      steps: [
        "Pilav ise pirinçleri kavurup kaynar su ekleyerek demlendirin.",
        "Makarna ise bol tuzlu suda haşlayıp süzün ve sosla harmanlayın."
      ]
    };
  }

  // 7. İZGARA & MÜHÜRLEME YEMEKLERİ
  if (q.includes('köfte') || q.includes('kofte') || q.includes('biftek') || q.includes('bonfile') || q.includes('pirzola') || q.includes('ızgara') || q.includes('izgara')) {
    return {
      title: `${query.toUpperCase()} (Izgara / Mühürleme)`,
      servingsNote: `${servings} Kişilik Izgara Ölçüsü`,
      category: "Izgara Yemekleri",
      detailedIngredients: [
        `${(150 * servings)} gram Et / Köfte / Tavuk`,
        `${(0.5 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
        `${(0.25 * servings).toFixed(1)} adet Soğan / Sarımsak`,
        `Kekik, Kimyon, Tuz ve Karabiber`
      ],
      steps: [
        "Eti veya köfte harcını baharatlar ve zeytinyağı ile marine edin.",
        "Döküm tavayı veya ızgarayı dumanı çıkana kadar yüksek ateşte kızdırın.",
        "Etleri tavaya dizip yüksek ateşte her iki yüzünü de mühürleyerek pişirin."
      ]
    };
  }

  // 8. TENCERE & SULU EV YEMEKLERİ (VARSAYILAN SICAK TENCERE)
  return {
    title: `${query.toUpperCase()} (Tencere Yemeği)`,
    servingsNote: `${servings} Kişilik Tencere Ölçüsü`,
    category: "Tencere & Sulu Yemekler",
    detailedIngredients: [
      `${(120 * servings)} gram Doğranmış Ana Sebze / Et (${query})`,
      `${(0.25 * servings).toFixed(1)} adet Kuru Soğan`,
      `${(0.5 * servings).toFixed(1)} diş Sarımsak`,
      `${(0.5 * servings).toFixed(1)} yemek kaşığı Domates / Biber Salçası`,
      `${(1 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ / Zeytinyağı`,
      `Tuz ve Karabiber`
    ],
    steps: [
      "Tencerede yağı ısıtıp doğranmış soğan ve sarımsağı soteleyin.",
      "Salçayı ve ana malzemeleri ekleyip 3-4 dakika kavurun.",
      "Sebzelerin hizasına gelecek kadar sıcak su ekleyip kısık ateşte demlendirerek pişirin."
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

  // Akıllı Arama Sonucu
  const searchRecipeResult = searchQuery.trim() !== '' ? generateAdvancedRecipe(searchQuery, servings) : null;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">18 Kategorili Akıllı Mutfak Asistanı</p>
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
                placeholder="Örn: Hamsi, Patates, Yumurta..."
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
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek, Balık veya Salata Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Hamsi Tava, Çoban Salata, Hatay Dürüm..."
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
