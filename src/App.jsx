import { useState } from 'react'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Adınız nedir?",
      type: "text",
      category: "personal"
    },
    {
      id: 2,
      question: "Doğum tarihiniz nedir? (GG/AA/YYYY)",
      type: "date",
      category: "personal"
    },
    {
      id: 3,
      question: "Doğum saatiniz nedir?",
      type: "time",
      category: "personal"
    },
    {
      id: 4,
      question: "Burcunuz nedir?",
      type: "select",
      options: [
        "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
        "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
      ],
      category: "astrology"
    },
    {
      id: 5,
      question: "Hangi element size daha yakın?",
      type: "select",
      options: ["Ateş", "Toprak", "Hava", "Su"],
      category: "personality"
    },
    {
      id: 6,
      question: "Hangi renk sizi en iyi temsil eder?",
      type: "select",
      options: ["Kırmızı", "Mavi", "Yeşil", "Sarı", "Mor", "Turuncu", "Pembe", "Siyah"],
      category: "personality"
    },
    {
      id: 7,
      question: "Hangi hayvan size en çok benziyor?",
      type: "select",
      options: ["Aslan", "Kartal", "Kurt", "Balık", "Kelebek", "Fil", "Köpek", "Kedi"],
      category: "personality"
    },
    {
      id: 8,
      question: "Hangi mevsimi en çok seversiniz?",
      type: "select",
      options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
      category: "personality"
    },
    {
      id: 9,
      question: "Hangi müzik türü size daha yakın?",
      type: "select",
      options: ["Pop", "Rock", "Klasik", "Jazz", "Elektronik", "Folk", "Rap", "Country"],
      category: "personality"
    },
    {
      id: 10,
      question: "Hangi aktiviteyi yaparken kendinizi en mutlu hissedersiniz?",
      type: "select",
      options: ["Spor yapmak", "Kitap okumak", "Müzik dinlemek", "Seyahat etmek", "Yemek yapmak", "Sanatla uğraşmak"],
      category: "personality"
    },
    {
      id: 11,
      question: "Hangi sayı size şans getiriyor?",
      type: "number",
      category: "personal"
    },
    {
      id: 12,
      question: "Hangi gün haftanın en güzel günü?",
      type: "select",
      options: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
      category: "personality"
    },
    {
      id: 13,
      question: "Hangi duygu sizi en çok motive eder?",
      type: "select",
      options: ["Sevgi", "Başarı", "Özgürlük", "Güvenlik", "Macera", "Barış"],
      category: "personality"
    },
    {
      id: 14,
      question: "Hangi meslek size en uygun?",
      type: "select",
      options: ["Doktor", "Öğretmen", "Mühendis", "Sanatçı", "İş İnsanı", "Bilim İnsanı", "Avukat", "Gazeteci"],
      category: "personality"
    },
    {
      id: 15,
      question: "Hangi ülkeyi görmek istiyorsunuz?",
      type: "select",
      options: ["İtalya", "Japonya", "Mısır", "Brezilya", "Hindistan", "Avustralya", "Kanada", "Türkiye"],
      category: "personality"
    }
  ]

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generatePrediction()
    }
  }

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrediction = () => {
    setIsLoading(true)
    
    // Simüle edilmiş yükleme süresi
    setTimeout(() => {
      const predictionText = createPrediction(answers)
      setPrediction(predictionText)
      setIsLoading(false)
    }, 2000)
  }

  const createPrediction = (userAnswers) => {
    const name = userAnswers[1] || "Değerli dostum"
    const birthDate = userAnswers[2]
    const birthTime = userAnswers[3]
    const zodiac = userAnswers[4]
    const element = userAnswers[5]
    const color = userAnswers[6]
    const animal = userAnswers[7]
    const season = userAnswers[8]
    const music = userAnswers[9]
    const activity = userAnswers[10]
    const luckyNumber = userAnswers[11]
    const favoriteDay = userAnswers[12]
    const motivation = userAnswers[13]
    const profession = userAnswers[14]
    const dreamCountry = userAnswers[15]

    const predictions = [
      `${name}, yıldızların konumuna göre önümüzdeki 3 ay içinde büyük bir değişim yaşayacaksınız. ${zodiac} burcunuzun etkisiyle ${element} elementi sizi güçlendirecek.`,
      
      `${color} renginizin enerjisi sayesinde ${season} mevsiminde beklenmedik bir fırsatla karşılaşacaksınız. ${animal} ruhunuz size rehberlik edecek.`,
      
      `${music} müziğinizin ritmiyle uyumlu olarak, ${favoriteDay} günlerinde özel bir kişiyle tanışacaksınız. Bu tanışma hayatınızı değiştirecek.`,
      
      `${motivation} duygunuzun gücüyle ${activity} aktivitesi sırasında ilham alacaksınız. Bu ilham ${profession} kariyerinizde yeni kapılar açacak.`,
      
      `${luckyNumber} sayınızın şansıyla ${dreamCountry} ile ilgili bir fırsat gelecek. Bu fırsatı değerlendirmeniz önerilir.`,
      
      "Venüs'ün etkisiyle aşk hayatınızda romantik gelişmeler olacak. Kalbinizi dinlemeye hazır olun.",
      
      "Jüpiter'in olumlu etkisiyle finansal açıdan güzel haberler alacaksınız. Yatırımlarınız meyve verecek.",
      
      "Mars'ın enerjisi sizi cesur kararlar almaya yönlendirecek. Risk almak sizin için faydalı olacak.",
      
      "Ay'ın etkisiyle sezgileriniz güçlenecek. İç sesinizi dinlemek size doğru yolu gösterecek.",
      
      "Satürn'ün disiplini sayesinde uzun vadeli hedeflerinizde başarı elde edeceksiniz. Sabırlı olun."
    ]

    // Rastgele tahminler seç
    const selectedPredictions = []
    const usedIndices = new Set()
    
    while (selectedPredictions.length < 5) {
      const randomIndex = Math.floor(Math.random() * predictions.length)
      if (!usedIndices.has(randomIndex)) {
        selectedPredictions.push(predictions[randomIndex])
        usedIndices.add(randomIndex)
      }
    }

    return selectedPredictions
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setPrediction(null)
  }

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowInstallPrompt(false)
        setDeferredPrompt(null)
      }
    }
  }

  const currentQuestion = questions[currentStep]

  if (prediction) {
    return (
      <div className="app">
        <div className="prediction-container">
          <h1>🌟 Gelecek Tahmininiz 🌟</h1>
          <div className="prediction-content">
            {prediction.map((pred, index) => (
              <div key={index} className="prediction-item">
                <p>{pred}</p>
              </div>
            ))}
          </div>
          <div className="prediction-footer">
            <p className="disclaimer">
              ⚠️ Bu tahminler eğlence amaçlıdır. Gerçek hayat kararlarınızı bu tahminlere göre vermeyin.
            </p>
            <button onClick={resetQuiz} className="reset-btn">
              🔄 Yeni Tahmin Yap
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>🔮 Yıldızlarınız Okunuyor...</h2>
          <p>Geleceğiniz hesaplanıyor, lütfen bekleyin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {showInstallPrompt && (
        <div className="install-prompt">
          <div className="install-content">
            <h3>📱 Uygulamayı Ana Ekrana Ekle</h3>
            <p>Daha hızlı erişim için uygulamayı telefonunuza indirin!</p>
            <button onClick={handleInstallClick} className="install-btn">
              📥 İndir ve Kur
            </button>
            <button onClick={() => setShowInstallPrompt(false)} className="close-btn">
              ✕
            </button>
          </div>
        </div>
      )}
      
      <div className="quiz-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="question-counter">
          Soru {currentStep + 1} / {questions.length}
        </div>

        <div className="question-container">
          <h2>{currentQuestion.question}</h2>
          
          {currentQuestion.type === "text" && (
            <input
              type="text"
              placeholder="Cevabınızı yazın..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="text-input"
            />
          )}

          {currentQuestion.type === "date" && (
            <input
              type="date"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="date-input"
            />
          )}

          {currentQuestion.type === "time" && (
            <input
              type="time"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="time-input"
            />
          )}

          {currentQuestion.type === "number" && (
            <input
              type="number"
              placeholder="Sayı girin..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="number-input"
            />
          )}

          {currentQuestion.type === "select" && (
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`option-btn ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button onClick={prevQuestion} className="nav-btn prev-btn">
              ← Önceki
            </button>
          )}
          
          <button 
            onClick={nextQuestion} 
            className="nav-btn next-btn"
            disabled={!answers[currentQuestion.id]}
          >
            {currentStep === questions.length - 1 ? "🔮 Tahmin Yap" : "Sonraki →"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
