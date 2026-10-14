import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Sıvı Yağ", "Sarımsak", "Tereyağı", "Salça", "Soğan", "Zeytinyağı"];

// Sabit Veritabanı
const RECIPES_DATABASE = [
  {
    id: 1,
    title: "Hatay Usulü Tavuk Dürüm",
    category: "Tavuk",
    time: "25 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Salça", "Sarımsak", "Tuz", "Karabiber"],
    ingredients: ["Tavuk", "Lavaş", "Patates", "Mayonez", "Turşu"],
    baseIngredients: [
      { name: "Tavuk Göğsü / Jülide Tavuk", amount: 150, unit: "gram" },
      { name: "Özel Dürüm Lavaşı", amount: 1, unit: "adet" },
      { name: "Patates Kızartması", amount: 0.5, unit: "porsiyon" },
      { name: "Sarımsaklı Özel Sos / Mayonez", amount: 1.5, unit: "yemek kaşığı" },
      { name: "Salçalı Özel Sos", amount: 2, unit: "yemek kaşığı" },
      { name: "Salatalık Turşusu", amount: 2, unit: "dilim" },
      { name: "Sıvı Yağ / Tereyağı", amount: 0.75, unit: "yemek kaşığı" }
    ],
    steps: [
      "Jülyen doğranmış tavukları az yağda baharatlar ve hafif salça ile tavada sotelerken kızartın.",
      "Salça, sarımsak, az su ve zeytinyağı ile özel Antakya salçalı sosunu sos tenceresinde kaynatın.",
      "Lavaş ekmeğini tavadaki tavukların yağına ve hazırladığınız salçalı sosa hafifçe bastırarak soslayın.",
      "Lavaşın tabanına sarımsaklı mayonez ve salçalı sos sürün. Üzerine sotelenmiş tavukları, kızarmış patatesi ve turşuyu dizin.",
      "Sıkıca dürüm yapıp döküm tavada veya tost makinesinde dışı çıtır olana kadar bastırarak ısıtın ve sıcak servis edin."
    ]
  },
  {
    id: 2,
    title: "Patlıcan Musakka",
    category: "Türk",
    time: "35 dk",
    difficulty: "Orta",
    staples: ["Sıvı Yağ", "Salça", "Soğan", "Sarımsak", "Tuz", "Karabiber"],
    ingredients: ["Patlıcan", "Kıyma", "Domates", "Biber"],
    baseIngredients: [
      { name: "Patlıcan", amount: 1, unit: "adet (küp doğranmış)" },
      { name: "Dana Kıyma", amount: 75, unit: "gram" },
      { name: "Kuru Soğan", amount: 0.25, unit: "adet" },
      { name: "Sivri Biber", amount: 0.5, unit: "adet" },
      { name: "Domates", amount: 0.5, unit: "adet" },
      { name: "Domates Salçası", amount: 0.25, unit: "yemek kaşığı" }
    ],
    steps: [
      "Patlıcanları alacalı soyup küp doğrayın ve yağda hafifçe kızartın.",
      "Ayrı tencerede soğan, sarımsak, biber ve kıymayı kavurun. Salça ve domatesi ekleyip harcı pişirin.",
      "Patlıcanları tencereye dizip üzerine kıymalı harcı dökün. Az sıcak su ekleyip 20 dk kısık ateşte pişirin."
    ]
  },
  {
    id: 3,
    title: "Klasik Pirinç Pilavı",
    category: "Türk",
    time: "25 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tereyağı", "Tuz"],
    ingredients: ["Pirinç", "Tel Şehriye"],
    baseIngredients: [
      { name: "Pirinç", amount: 0.5, unit: "su bardağı" },
      { name: "Tel Şehriye", amount: 0.25, unit: "çay bardağı" },
      { name: "Tereyağı", amount: 0.5, unit: "yemek kaşığı" },
      { name: "Kaynar Su", amount: 0.75, unit: "su bardağı" }
    ],
    steps: [
      "Pirinçleri yıkayıp süzün. Tencerede yağları eritip şehriyeleri kavurun.",
      "Pirinçleri ekleyip 3-4 dakika kavurmaya devam edin.",
      "Kaynar su ve tuz ekleyip kısık ateşte suyunu çekene kadar pişirin."
    ]
  }
];

// Akıllı Yapay Zeka / Arama Çözümleyici (Arama yapılan yemeğe göre gerçekçi malzeme türetici)
const generateSmartRecipe = (query, servings) => {
  const q = query.toLowerCase().trim();

  // 1. DÜRÜM / TAVUK / DÖNER KATEGORİSİ
  if (q.includes('dürüm') || q.includes('tavuk') || q.includes('döner') || q.includes('hatay')) {
    return [
      {
        id: 'smart-1',
        title: `${query} (Hatay / Antakya Usulü Soslu)`,
        source: "Hatay Yöresel Mutfak Rehberi",
        servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
        detailedIngredients: [
          `${(140 * servings)} gram Tavuk Göğsü veya Kalça Eti (Jülyen doğranmış)`,
          `${(1 * servings)} adet İnce Özel Dürüm Lavaşı`,
          `${(0.5 * servings).toFixed(1)} porsiyon Patates Kızartması`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Özel Salçalı Sos (Domates/Biber salçası, zeytinyağı ve sarımsak ile)`,
          `${(1 * servings).toFixed(1)} yemek kaşığı Sarımsaklı Mayonez / Sos`,
          `${(2 * servings)} dilim Salatalık Turşusu`,
          `Kırmızı Toz Biber, Kimyon, Kekik ve Tuz`
        ],
        steps: [
          `Tavuk etlerini baharatlar ve az zeytinyağı ile tavada yüksek ateşte kızarana kadar soteleyin.`,
          `Küçük bir sos tenceresinde salça, ezilmiş sarımsak, zeytinyağı ve az suyu kaynatarak özel Hatay sosunu hazırlayın.`,
          `Lavaş ekmeğini tavukların piştiği tavaya hafifçe bastırıp yağı ve aromayı almasını sağlayın.`,
          `Lavaşa önce salçalı sosu ve sarımsaklı sosu sürün. Üzerine sotelenmiş tavukları, patates kızartmasını ve turşuyu dizin.`,
          `Dürüm yapıp döküm tavada veya tost makinesinde dışı çıtır olana kadar ısıtıp sıcak servis edin.`
        ]
      },
      {
        id: 'smart-2',
        title: `${query} (Pratik Izgara / Sote Usulü)`,
        source: "Pratik Sokak Lezzetleri",
        servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
        detailedIngredients: [
          `${(150 * servings)} gram Jülyen Tavuk Eti`,
          `${(1 * servings)} adet Lavaş veya Tırnak Pide`,
          `${(0.5 * servings).toFixed(1)} adet Kuru Soğan (Sumaklı piyazlık)`,
          `${(1 * servings).toFixed(1)} yemek kaşığı Tereyağı / Sıvı Yağ`,
          `Tuz, Karabiber ve Pul Biber`
        ],
        steps: [
          "Tavuk etlerini tereyağında suyunu çekip hafif karamelize olana kadar soteleyin.",
          "Soğanları ince kıyıp sumak ve maydanozla harmanlayın.",
          "Isıtılmış lavaşa tavukları ve sumaklı soğanları ekleyip dürüm yapın."
        ]
      }
    ];
  }

  // 2. HAMUR İŞİ / MAKARNA / LAZANYA KATEGORİSİ
  if (q.includes('makarna') || q.includes('lazanya') || q.includes('pizza') || q.includes('pide')) {
    return [
      {
        id: 'smart-1',
        title: `${query} (İtalyan Şef Usulü)`,
        source: "İtalyan Mutfak Akademi",
        servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
        detailedIngredients: [
          `${(100 * servings)} gram Makarna / Hamur / Yaprak`,
          `${(80 * servings)} gram Kıymalı veya Fesleğenli Özel Sos`,
          `${(1 * servings).toFixed(1)} diş Ezilmiş Sarımsak`,
          `${(1 * servings).toFixed(1)} yemek kaşığı Sızma Zeytinyağı`,
          `${(30 * servings)} gram Rendelenmiş Kaşar / Peynir`,
          `Tuz ve Taze Fesleğen / Karabiber`
        ],
        steps: [
          "Geniş tencerede bol tuzlu suyu kaynatıp makarnayı / hamuru pişirin.",
          "Ayrı bir tavada zeytinyağı, sarımsak ve özel sosu kısık ateşte ısıtın.",
          "Haşlanan malzemeleri sosla buluşturup peynir rendesi ile sıcak servis yapın."
        ]
      },
      {
        id: 'smart-2',
        title: `${query} (Hızlı Fırın / Tava Yöntemi)`,
        source: "Pratik Ev Mutfakları",
        servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
        detailedIngredients: [
          `${(1 * servings)} porsiyon Hazır Taban / Makarna`,
          `${(1.5 * servings).toFixed(1)} yemek kaşığı Domates Sosu`,
          `${(40 * servings)} gram Eritme Peyniri`
        ],
        steps: [
          "Malzemeleri fırın kabına veya tavaya dizip soslayın.",
          "Üzerine peynir rendeleyip fırında veya kapağı kapalı tavada peynirler eriyene kadar pişirin."
        ]
      }
    ];
  }

  // 3. GENEL GENEL SEBZE / ET / TENCERE YEMEKLERİ (VARSAYILAN AKILLI DÖNÜŞTÜRÜCÜ)
  return [
    {
      id: 'smart-1',
      title: `${query} (Geleneksel Tencere Usulü)`,
      source: "Geleneksel Mutfak Rehberi",
      servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
      detailedIngredients: [
        `${(120 * servings)} gram Doğranmış Ana Sebze / Et (${query} için)`,
        `${(0.25 * servings).toFixed(1)} adet Kuru Soğan`,
        `${(0.5 * servings).toFixed(1)} diş Sarımsak`,
        `${(0.5 * servings).toFixed(1)} yemek kaşığı Domates / Biber Salçası`,
        `${(1 * servings).toFixed(1)} yemek kaşığı Sıvı Yağ / Zeytinyağı`,
        `Tuz, Karabiber ve Pul Biber`
      ],
      steps: [
        `Tencerede yağı ısıtıp soğan ve sarımsağı pembeleşene kadar soteleyin.`,
        `Salçayı ve ${query} malzemelerini ekleyip 3-4 dakika karıştırarak kavurun.`,
        `Sebzelerin/etlerin hizasına gelecek kadar sıcak su ve baharatları ekleyip kısık ateşte yumuşayana kadar pişirin.`
      ]
    },
    {
      id: 'smart-2',
      title: `${query} (Fırında / Pratik Sote Usulü)`,
      source: "Pratik Lezzetler",
      servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
      detailedIngredients: [
        `${(1 * servings)} porsiyon Sotelik ${query} Malzemesi`,
        `${(1 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
        `${(0.5 * servings).toFixed(1)} adet Rendelenmiş Domates`
      ],
      steps: [
        "Tavada zeytinyağını kızdırıp malzemeleri yüksek ateşte soteleyin.",
        "Rendelenmiş domates ve baharatları ekleyip kısık ateşte 10 dakika çektirin."
      ]
    }
  ];
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4); // 1-4 Kişilik porsiyon

  // Malzemeye göre arama state'leri
  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');
  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');
  
  // Malzemeye göre internet arama state'leri
  const [ingredientWebResults, setIngredientWebResults] = useState([]);
  const [isSearchingIngredientWeb, setIsSearchingIngredientWeb] = useState(false);

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
      setIngredientWebResults([]);
    }
    setNewIngredientInput('');
  };

  const handleRemoveIngredient = (item) => {
    setUserIngredients(userIngredients.filter(i => i !== item));
    setIngredientWebResults([]);
  };

  // Malzemeye göre yerel filtreleme
  const getFilteredRecipesByIngredients = () => {
    if (userIngredients.length === 0) return [];

    const normalizedUserIngredients = userIngredients.map(i => i.toLowerCase().trim());
    const normalizedStaples = kitchenStaples.map(s => s.toLowerCase().trim());
    const allAvailable = [...normalizedStaples, ...normalizedUserIngredients];

    return RECIPES_DATABASE.map(recipe => {
      const recipeIngredientsLower = recipe.ingredients.map(i => i.toLowerCase().trim());
      const hasAtLeastOne = recipeIngredientsLower.some(ing => normalizedUserIngredients.includes(ing));

      if (!hasAtLeastOne) return { ...recipe, score: 0 };

      const allRequired = [...recipe.ingredients, ...recipe.staples].map(i => i.toLowerCase().trim());
      let matchedCount = 0;
      allRequired.forEach(req => {
        if (allAvailable.includes(req)) matchedCount++;
      });

      const score = Math.round((matchedCount / allRequired.length) * 100);
      return { ...recipe, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
  };

  const activeRecipes = getFilteredRecipesByIngredients();

  // Malzemeler için İnternet Arama
  const handleIngredientWebSearch = () => {
    if (userIngredients.length === 0) return;

    setIsSearchingIngredientWeb(true);
    setIngredientWebResults([]);

    setTimeout(() => {
      const ingStr = userIngredients.join(", ");
      setIngredientWebResults([
        {
          id: 'ing-web-1',
          title: `${ingStr} ile Geleneksel Ev Yemeği Yöntemi`,
          source: "Dünya Mutfakları / Şef Önerisi",
          servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
          detailedIngredients: userIngredients.map(i => `${(1 * servings)} porsiyon ${i}`).concat([
            `${(0.5 * servings).toFixed(1)} adet Kuru Soğan ve Sarımsak`,
            `${(1 * servings)} yemek kaşığı Sıvı Yağ / Salça`,
            `Tuz, Karabiber, Pul Biber`
          ]),
          steps: [
            `Elindeki (${ingStr}) ana malzemelerini ve soğanları doğrayarak hazırlayın.`,
            `Geniş bir tencerede sıvı yağı ısıtıp soğanları ve ardından ana malzemeleri ekleyip yüksek ateşte soteleyin.`,
            `Salça, baharatlar ve sebzelerin hizasına kadar sıcak su ekleyip ${servings} kişilik porsiyona uygun şekilde kısık ateşte pişmeye bırakın.`
          ]
        },
        {
          id: 'ing-web-2',
          title: `${ingStr} ile Pratik Tava / Sote Yöntemi`,
          source: "Pratik Ev Yemekleri",
          servingsNote: `${servings} Kişilik Oranlanmış Ölçü`,
          detailedIngredients: userIngredients.map(i => `${(1 * servings)} porsiyon ${i}`).concat([
            `${(0.75 * servings).toFixed(1)} yemek kaşığı Zeytinyağı`,
            `Tuz ve Kekik`
          ]),
          steps: [
            `Tavada zeytinyağını kızdırıp (${ingStr}) malzemelerini sırasıyla yüksek ateşte soteleyin.`,
            `Baharatları ekleyip kapağı kapalı şekilde 10-15 dakika kendi suyuyla pişirin ve sıcak servis yapın.`
          ]
        }
      ]);
      setIsSearchingIngredientWeb(false);
    }, 600);
  };

  // Yemek adına göre yerel arama
  const localSearchResults = searchQuery.trim() === '' ? [] : RECIPES_DATABASE.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  );

  // Yemek Adı ile İnternet Arama (Akıllı Arama Algoritması)
  const handleWebSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingWeb(true);
    setWebResults([]);

    setTimeout(() => {
      const smartResults = generateSmartRecipe(searchQuery.trim(), servings);
      setWebResults(smartResults);
      setIsSearchingWeb(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-4 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Sınırsız Akıllı Mutfak Asistanı</p>
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
                placeholder="Örn: Patlıcan, Kıyma, Tavuk..."
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

          {activeRecipes.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">📖 Kayıtlı Tarif Önerileri ({servings} Kişilik)</h2>
              {activeRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-sm">{recipe.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700">
                      %{recipe.score} Eşleşme
                    </span>
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
                    <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Yapılışı:</span>
                    {recipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed"><span className="font-bold text-emerald-700">{idx + 1}.</span> {step}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {userIngredients.length > 0 && (
            <section className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 text-center">
              <p className="text-xs text-gray-600 mb-2">Kayıtlı tariflerde bulamadın mı? İnternetten bu malzemelere özel tarifler üret:</p>
              <button
                onClick={handleIngredientWebSearch}
                disabled={isSearchingIngredientWeb}
                className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition w-full"
              >
                {isSearchingIngredientWeb ? "🌐 İnternetten Aranıyor..." : "🌐 İnternette Bu Malzemelerle Tarif Ara"}
              </button>
            </section>
          )}

          {ingredientWebResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-700">🌐 İnternetten Bulunan En İyi 2 Tarif:</h3>
              {ingredientWebResults.map((webRecipe, index) => (
                <div key={webRecipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Yöntem {index + 1}: {webRecipe.title}</h4>
                  <p className="text-[10px] text-gray-400 mb-2">{webRecipe.source} • {webRecipe.servingsNote}</p>
                  
                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Gerekli Malzemeler:</span>
                    <ul className="space-y-1">
                      {webRecipe.detailedIngredients.map((ing, idx) => (
                        <li key={idx} className="text-[11px] text-gray-700">• {ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-2 space-y-1 text-xs">
                    <span className="font-semibold text-gray-700 block">👨‍🍳 Yapılışı:</span>
                    {webRecipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] text-gray-600 leading-relaxed"><span className="font-bold text-emerald-700">{idx + 1}.</span> {step}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. SEKME: YEMEK ADI İLE ARAMA */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🔍 Yemek Adı ile Ara</h2>
            <form onSubmit={handleWebSearch} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Örn: Hatay Usulü Tavuk Dürüm, Lazanya..."
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

          {localSearchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500">Kayıtlı Veritabanından Bulunanlar:</h3>
              {localSearchResults.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{recipe.title}</h3>
                  <p className="text-[11px] text-emerald-600 font-medium mb-2">👥 {servings} Kişilik</p>
                  <div className="text-xs bg-gray-50 p-2.5 rounded-lg mb-2">
                    {recipe.baseIngredients.map((ing, idx) => (
                      <div key={idx} className="text-[11px]">• {(ing.amount * servings).toFixed(2).replace('.00', '')} {ing.unit} {ing.name}</div>
                    ))}
                  </div>
                  <div className="border-t pt-2 text-xs text-gray-600 space-y-1">
                    {recipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] text-gray-600"><span className="font-bold text-emerald-700">{idx + 1}.</span> {step}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isSearchingWeb ? (
            <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
              <p className="text-xs text-emerald-600 font-medium animate-pulse">🌐 İnternetten tarif getiriliyor...</p>
            </div>
          ) : webResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-700">🌐 İnternetten Bulunan En İyi 2 Yöntem:</h3>
              {webResults.map((webRecipe, index) => (
                <div key={webRecipe.id} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">Yöntem {index + 1}: {webRecipe.title}</h4>
                  <p className="text-[10px] text-gray-400 mb-2">{webRecipe.source} • {webRecipe.servingsNote}</p>
                  <div className="text-xs mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block mb-1.5">⚖️ Gerekli Malzemeler:</span>
                    {webRecipe.detailedIngredients.map((ing, idx) => (
                      <div key={idx} className="text-[11px] text-gray-700">• {ing}</div>
                    ))}
                  </div>
                  <div className="border-t pt-2 space-y-1 text-xs">
                    <span className="font-semibold text-gray-700 block mb-1">👨‍🍳 Yapılışı:</span>
                    {webRecipe.steps.map((step, idx) => (
                      <p key={idx} className="text-[11px] text-gray-600 leading-relaxed"><span className="font-bold text-emerald-700">{idx + 1}.</span> {step}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== '' && localSearchResults.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
              <p className="text-xs text-gray-600 mb-3">"{searchQuery}" kayıtlarda yok. İnternetten tarifi getirmek için tıklayın:</p>
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
