import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Zeytinyağı", "Limon", "Tereyağı", "Salça", "Soğan", "Sarımsak", "Un", "Sıvı Yağ", "Yumurta", "Süt", "Krema"];

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

// Başlık ve metin temizleme (Çorba çorbası tekrarlarını ve takıları siler)
const cleanRecipeTitle = (query) => {
  let clean = query.trim();
  // "çorbası çorba" gibi tekrarları temizle
  clean = clean.replace(/(çorbası|corbasi|çorba|corba)/gi, '').trim();
  return clean ? clean.toUpperCase() : "ÖZEL";
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
          "Yağlanmış tavaya ilk yufkayı kenarları dışarı taşacak şekilde serin. Sos sürün, kalan yufkayı parçalayıp büzüştürerek içine yerleştirin.",
          `Hazırladığınız (${mainFillingText}) harcını eşit şekilde yayın. Taşayan yufka kenarlarını kapatın.`,
          "Kapağı kapalı olarak kısık-orta ateşte arkalı önlü kızartıp sıcak servis yapın."
        ]
      }
    ];
  }

  // GENEL MOTOR
  return [
    {
      id: 'dynamic-general',
      title: `${ingredients.join(" ve ").toUpperCase()} Yemeği`,
      category: "Ev Yemekleri",
      servingsNote: `${servings} Kişilik Ölçü`,
      detailedIngredients: ingredients.map(ing => `${(1 * servings)} porsiyon ${ing}`).concat([
        `${(1 * servings)} yemek kaşığı Zeytinyağı / Tereyağı`,
        `Tuz ve Baharatlar`
      ]),
      steps: [
        `Malzemelerinizi (${ingredients.join(", ")}) temizleyip doğrayın.`,
        `Uygun tavada veya tencerede az yağ ile kendi suyunda pişirip servis yapın.`
      ]
    }
  ];
};

// 2. YEMEK VE ÇORBA ADI İLE ARAMA MOTORU (TÜM BAŞLIK VE ŞABLON HATALARI TEMİZLENDİ)
const generateAdvancedRecipe = (query, servings) => {
  const norm = normalizeText(query);
  const coreTitle = cleanRecipeTitle(query);

  // A) BAMYA ÇORBASI (Özel Yöresel Tarif)
  if (norm.includes('bamya')) {
    return {
      title: "GELENEKSEL BAMYA ÇORBASI",
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Çorbalar & Yöresel Mutfak",
      detailedIngredients: [
        `${(50 * servings)} gram Kuru Çiçek Bamya (veya taze küçük bamya)`,
        `${(100 * servings)} gram Minik Kuşbaşı Kuzu/Dana Eti`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan (yemeklik doğranmış)`,
        `${(1 * servings)} yemek kaşığı Domates ve Biber Salçası`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Tereyağı`,
        `${(1 * servings)} yemek kaşığı Taze Limon Suyu veya Koruk Suyu`,
        `${(3 * servings)} su bardağı Sıcak Su / Et Suyu`,
        `Tuz ve Pul Biber`
      ],
      steps: [
        "Kuru bamyaları bez arasında ovarak tüylerini dökün. Limonlu ve sirkeli kaynar suda 10 dakika haşlayıp süzün ve iplerini çıkarın.",
        "Tencerede tereyağını eritip minik kuşbaşı etleri suyunu salıp çekene kadar kavurun.",
        "Doğranmış soğanları ekleyip pembeleşince salçayı ilave edin ve 2 dakika kavurun.",
        "Sıcak suyu/et suyunu ekleyip kaynamaya bırakın. Etler yumuşamaya başlayınca bamyaları ve limon suyunu ekleyin.",
        "Bamyalar sünmemesi için kısık ateşte karıştırmadan 15-20 dakika pişirip taze limonla sıcak servis yapın. (Blender kesinlikle kullanılmaz)."
      ]
    };
  }

  // B) MANTAR ÇORBASI
  if (norm.includes('mantar') || norm.includes('martar')) {
    return {
      title: "KREMALI MANTAR ÇORBASI",
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(150 * servings)} gram Kültür Mantarı (ince dilimlenmiş)`,
        `${(1 * servings)} yemek kaşığı Tereyağı ve Un`,
        `${(0.5 * servings).toFixed(1)} su bardağı Süt veya Krema`,
        `${(2.5 * servings)} su bardağı Sıcak Su / Tavuk Suyu`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Mantarları ince dilimleyip tereyağında suyunu çekene kadar soteleyin.",
        "Unu ekleyip 1 dakika kavurun. Sıcak suyu ve krema/sütü tel çırpıcıyla hızlıca karıştırarak ekleyin.",
        "Kısık ateşte 10 dakika kaynatıp sıcak servis yapın."
      ]
    };
  }

  // C) MERCİMEK / EZOGELİN VE GENEL ÇORBALAR
  if (norm.includes('corba') || norm.includes('mercimek') || norm.includes('ezogelin') || norm.includes('tarhana')) {
    return {
      title: `${coreTitle} ÇORBASI`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Çorbalar",
      detailedIngredients: [
        `${(0.5 * servings).toFixed(1)} su bardağı ${coreTitle} Malzemesi (Mercimek/Tarhana/Şehriye)`,
        `${(0.5 * servings).toFixed(1)} adet Kuru Soğan`,
        `${(1 * servings)} yemek kaşığı Tereyağı / Sıvı Yağ`,
        `${(3 * servings)} su bardağı Sıcak Su veya Et Suyu`,
        `Tuz, Nane ve Pul Biber`
      ],
      steps: [
        "Tencerede yağı eritip doğranmış soğanı ve temel çorba malzemesini kavurun.",
        "Sıcak suyu ekleyip malzemeler yumuşayana kadar pişirin.",
        "İsteğe göre pürüzsüzleştirip üzerine kızdırılmış tereyağı ve nane gezdirerek servis yapın."
      ]
    };
  }

  // D) FETTUCCINE / MAKARNALAR
  if (norm.includes('fetucini') || norm.includes('fettuccine') || norm.includes('makarna')) {
    return {
      title: `${coreTitle} MAKARNA (Alfredo Usulü)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Makarnalar & İtalyan Mutfak",
      detailedIngredients: [
        `${(120 * servings)} gram Fettuccine / Pasta Makarna`,
        `${(0.5 * servings).toFixed(1)} paket Sıvı Krema`,
        `${(1 * servings)} yemek kaşığı Tereyağı`,
        `${(30 * servings)} gram Rendelenmiş Kaşar / Parmesan Peyniri`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Makarnayı bol tuzlu kaynar suda 8-10 dakika haşlayıp süzün.",
        "Tavada tereyağını eritip kremayı ekleyin ve koyulaşana kadar pişirin.",
        "Makarnayı ve peyniri ekleyip sosa harmanlayarak servis edin."
      ]
    };
  }

  // E) BALIK YEMEKLERİ
  if (norm.includes('cupra') || norm.includes('hamsi') || norm.includes('levrek') || norm.includes('balik')) {
    return {
      title: `${coreTitle} (Fırında Limonlu)`,
      servingsNote: `${servings} Kişilik Ölçü`,
      category: "Balık Yemekleri",
      detailedIngredients: [
        `${(200 * servings)} gram Temizlenmiş Balık (${coreTitle})`,
        `${(0.5 * servings).toFixed(1)} adet Limon ve Kuru Soğan`,
        `${(1.5 * servings).toFixed(1)} yemek kaşığı Sızma Zeytinyağı`,
        `Tuz ve Karabiber`
      ],
      steps: [
        "Balığı zeytinyağı, tuz ve limon ile ovup marine edin.",
        "Fırın tepsisine soğan dilimleri üzerine balığı koyup 200 derecede 25 dakika pişirin."
      ]
    };
  }

  // F) DİĞER TÜM SICAK YEMEKLER
  return {
    title: `${coreTitle} YEMEĞİ`,
    servingsNote: `${servings} Kişilik Ölçü`,
    category: "Ev Yemekleri",
    detailedIngredients: [
      `${(150 * servings)} gram ${coreTitle} İçeriği`,
      `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak`,
      `${(1 * servings)} yemek kaşığı Zeytinyağı / Salça`,
      `Tuz ve Karabiber`
    ],
    steps: [
      "Tencerede yağı ısıtıp soğanları soteleyin.",
      "Ana malzemeyi ekleyip kısık ateşte pişmeye bırakın."
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
                placeholder="Örn: Bamya, Yufka, Tavuk..."
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
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek veya Çorba Ara</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Bamya Çorbası, Fetucini, Çupra..."
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
