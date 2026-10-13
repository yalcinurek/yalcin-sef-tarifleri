import React, { useState } from 'react';

const INITIAL_STAPLES = ["Tuz", "Karabiber", "Sıvı Yağ", "Sarımsak"];

const RECIPES_DATABASE = [
  {
    id: 1,
    title: "Pesto Soslu Pastırmalı Makarna",
    time: "15 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Sarımsak", "Tuz", "Karabiber"],
    ingredients: ["Pesto Sos", "Pastırma", "Makarna"],
    steps: [
      "Makarnayı bol tuzlu kaynar suda haşlayıp süzün.",
      "Tavada hafif yağ ve doğranmış sarımsak ile pastırmaları 1-2 dakika soteleyin.",
      "Süzülen makarnayı tavaya ekleyin, pesto sosunu ilave edip kısık ateşte iyice harmanlayın.",
      "Karabiber serperek sıcak servis yapın."
    ]
  },
  {
    id: 2,
    title: "Pastırmalı Yumurta",
    time: "10 dk",
    difficulty: "Çok Kolay",
    staples: ["Sıvı Yağ", "Tuz", "Karabiber"],
    ingredients: ["Pastırma", "Yumurta"],
    steps: [
      "Tavaya az miktarda yağ alıp kızdırın.",
      "Pastırma dilimlerini tavaya dizip arkalı önlü hafifçe pişirin.",
      "Üzerine yumurtaları kırın, tuz ve karabiber ekleyip sarılarını isteğe göre pişirin."
    ]
  },
  {
    id: 3,
    title: "Pesto Soslu Tavuk",
    time: "20 dk",
    difficulty: "Orta",
    staples: ["Sıvı Yağ", "Sarımsak", "Tuz", "Karabiber"],
    ingredients: ["Tavuk", "Pesto Sos"],
    steps: [
      "Tavuk göğsünü küp küp doğrayın.",
      "Tavada yağ ve sarımsak ile tavukları suyunu çekene kadar soteleyin.",
      "Tavuklar pişince pesto sosunu ekleyip 2-3 dakika sosun çekmesini sağlayın."
    ]
  },
  {
    id: 4,
    title: "Kremalı Pesto Soslu Makarna",
    time: "20 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Sarımsak", "Tuz"],
    ingredients: ["Makarna", "Pesto Sos", "Krema"],
    steps: [
      "Makarnayı haşlayıp süzün.",
      "Tavada sarımsağı hafif soteleyip kremayı ve pesto sosunu ekleyin, kısık ateşte koyulaşana kadar karıştırın.",
      "Makarnayı sosa ekleyip sıcak servis yapın."
    ]
  },
  {
    id: 5,
    title: "Pastırmalı Menemen",
    time: "15 dk",
    difficulty: "Kolay",
    staples: ["Sıvı Yağ", "Tuz", "Karabiber"],
    ingredients: ["Pastırma", "Yumurta", "Domates", "Biber"],
    steps: [
      "Biberleri ince doğrayıp yağda soteleyin.",
      "Doğranmış domatesleri ekleyip yumuşayana kadar pişirin.",
      "Pastırma dilimlerini ilave edip 1 dakika pişirdikten sonra yumurtaları kırın ve karıştırın."
    ]
  }
];

export default function App() {
  const [kitchenStaples, setKitchenStaples] = useState(INITIAL_STAPLES);
  const [newStapleInput, setNewStapleInput] = useState('');

  const [userIngredients, setUserIngredients] = useState([]);
  const [newIngredientInput, setNewIngredientInput] = useState('');

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

  const calculateMatch = (recipe) => {
    const allAvailable = [...kitchenStaples, ...userIngredients].map(i => i.toLowerCase());
    const recipeAllReq = [...recipe.ingredients, ...recipe.staples];
    
    let matchedCount = 0;
    recipeAllReq.forEach(req => {
      if (allAvailable.includes(req.toLowerCase())) {
        matchedCount++;
      }
    });

    const score = Math.round((matchedCount / recipeAllReq.length) * 100);
    return score;
  };

  const activeRecipes = userIngredients.length === 0 ? [] : RECIPES_DATABASE.map(recipe => ({
    ...recipe,
    score: calculateMatch(recipe)
  })).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans pb-12">
      <header className="text-center mb-6 pt-2">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">👨‍🍳 Şef Yalçın Tarifleri</h1>
        <p className="text-xs text-gray-500 mt-1">Elinizdeki malzemelere göre akıllı tarif bulucu</p>
      </header>

      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">🧂 Mutfak Temelleri (Varsayılan)</h2>
        </div>
        <p className="text-[11px] text-gray-400 mb-3">Tuz, yağ, sarımsak vb. sürekli evde olan temel malzemelerinizi yönetin:</p>
        
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
            placeholder="Yeni temel malzeme..."
            value={newStapleInput}
            onChange={(e) => setNewStapleInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-1.5 text-xs focus:outline-emerald-500"
          />
          <button type="submit" className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-amber-700 transition">Ekle</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">🛒 Elimdeki Malzemeler</h2>
        
        <form onSubmit={handleAddIngredient} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Örn: Pesto Sos, Pastırma, Makarna..."
            value={newIngredientInput}
            onChange={(e) => setNewIngredientInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-emerald-500"
          />
          <button type="submit" className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">Ekle</button>
        </form>

        {userIngredients.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-2">Henüz malzeme eklenmedi. Yukarıdaki kutudan malzeme ekleyin.</p>
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

      <section className="space-y-4">
        <h2 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">📖 Önerilen Tarifler</h2>

        {userIngredients.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center border border-dashed border-gray-200">
            <p className="text-sm font-medium text-gray-600">Şef Yalçın tarif hazırlamak için malzeme bekliyor!</p>
            <p className="text-xs text-gray-400 mt-1">Yukarıdaki bölüme elinizdeki malzemeleri eklediğinizde uygun tarifler burada listelenecektir.</p>
          </div>
        ) : activeRecipes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
            <p className="text-xs text-gray-500">Eklediğiniz malzemelerle eşleşen bir tarif bulunamadı. Lütfen farklı malzemeler ekleyin.</p>
          </div>
        ) : (
          activeRecipes.map((recipe) => {
            const availableAll = [...kitchenStaples, ...userIngredients].map(i => i.toLowerCase());

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
                </div>

                <div className="text-xs mb-3">
                  <span className="font-semibold text-gray-700 block mb-1">Gerekli Malzemeler:</span>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.map((ing) => {
                      const hasIt = availableAll.includes(ing.toLowerCase());
                      return (
                        <span key={ing} className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          hasIt ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200 font-semibold'
                        }`}>
                          {hasIt ? '✓ ' : '✕ '}{ing}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t pt-2 mt-2 text-xs text-gray-600 space-y-1">
                  <span className="font-semibold text-gray-700 block mb-1">Hazırlanışı:</span>
                  {recipe.steps.map((step, idx) => (
                    <p key={idx} className="text-[11px] leading-relaxed">{idx + 1}. {step}</p>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}