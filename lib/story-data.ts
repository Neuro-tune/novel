export type OutfitType = "queen" | "dreamer" | "nymph" | null

export interface Choice {
  label: string
  nextSceneId: string
  setOutfit?: OutfitType // Optional: set outfit state when this choice is selected
}

export interface Scene {
  id: string
  background: string
  music: string | null
  volume?: number // Optional: 0.0 to 1.0, defaults to 1.0
  loop?: boolean // Optional: defaults to true
  character: string | null
  speaker: string
  text: string
  // Dynamic text based on outfit selection
  dynamicText?: {
    queen: string
    dreamer: string
    nymph: string
  }
  // Dynamic background based on outfit selection
  dynamicBackground?: {
    queen: string
    dreamer: string
    nymph: string
  }
  // If true, character image will be dynamic based on outfit
  dynamicImage?: boolean
  // Optional screen shake effect
  effect?: "shake"
  choices: Choice[]
}

export const storyData: Scene[] = [
  // SCENE 0: WAKE UP
  {
    id: "wakeup",
    background: "/scene_0_wakeup.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Мысли",
    text: "29 января. Гравитация сегодня кажется в два раза сильнее. Календарь на стене кричит о празднике, но вставать не хочется. Совсем.",
    choices: [{ label: "Попытаться закрыть глаза снова", nextSceneId: "blanket_fort" }],
  },

  // SCENE 1: THE BLANKET 
  {
    id: "blanket_fort",
    background: "/scene_1_bed.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Мысли",
    text: "Тишину разрывает вибрация. Телефон светится в темноте моего одеяльного бункера. Кто-то очень настойчивый пытается пробиться ко мне.",
    choices: [{ label: "Посмотреть на экран", nextSceneId: "intro_call" }],
  },

  // SCENE 2: THE CALL
  {
    id: "intro_call",
    background: "/scene_2_bed.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Неизвестный номер",
    text: "«Прием. Это Центр Управления Полетами. Мы фиксируем критически низкий уровень радости. Хьюстон, у нас проблемы, но я знаю решение. Ты со мной?»",
    choices: [
      { label: "Эм... Ты кто вообще?", nextSceneId: "meet_producer" },
      { label: "У меня нет сил, отстань...", nextSceneId: "meet_producer_force" },
    ],
  },

  // SCENE 3: PRODUCER 
  {
    id: "meet_producer",
    background: "/scene_2_bed.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Продюсер",
    text: "Я — та часть тебя, которая верит в чудеса. У меня есть сюрприз — место, где действуют законы волшебства. Но в сказку нельзя войти в пижаме.",
    choices: [{ label: "Что ты предлагаешь?", nextSceneId: "magic_explanation" }],
  },

  {
    id: "meet_producer_force",
    background: "/scene_2_bed.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Продюсер",
    text: "Я знаю, что сил нет. Поэтому просто доверься мне. Этот экран — твой портал. Смотри внимательно: мы начинаем переписывать сценарий прямо сейчас.",
    choices: [{ label: "Как это сделать?", nextSceneId: "magic_explanation" }],
  },

  // SCENE 3.5: MAGIC EXPLANATION 
  {
    id: "magic_explanation",
    background: "/scene_2_bed.webp",
    music: "/sad_piano.mp3",
    volume: 0.2,
    character: null,
    speaker: "Продюсер",
    text: "Фейс-контроль в сказке строгий: в пижаме не пустят, даже если ты очень милая. Нам нужен подходящий образ. Готова выбрать, кем ты будешь сегодня?",
    choices: [{ label: "Ладно... ", nextSceneId: "wardrobe_choice" }],
  },

  // SCENE 4: WARDROBE CHOICE (Выбор Сказки)
  {
    id: "wardrobe_choice",
    background: "/scene_2_wardrobe_options.webp",
    music: "/magic.mp3",
    volume: 0.2,
    character: null,
    speaker: "Гардероб",
    text: "Я перенес тебя в нужное место (магия монтажа, не спрашивай). Любая сказка требует главной героини. Какой сюжет будет у твоей истории?",
    choices: [
      { label: "👑 Величие", nextSceneId: "wardrobe_reveal_1", setOutfit: "queen" },
      { label: "✨ Сияние", nextSceneId: "wardrobe_reveal_1", setOutfit: "dreamer" },
      { label: "🌸 Нежность", nextSceneId: "wardrobe_reveal_1", setOutfit: "nymph" },
    ],
  },

  // SCENE 5: WARDROBE REVEAL (Part 1)
  {
    id: "wardrobe_reveal_1",
    background: "/scene_2_wardrobe_enter.webp",
    music: "/magic.mp3",
    volume: 0.2,
    character: null,
    dynamicImage: false,
    dynamicBackground: {
      queen: "/queen.jpg",
      dreamer: "/dreamer.png",
      nymph: "/nymph.png",
    },
    speaker: "Продюсер",
    text: "",
    dynamicText: {
      queen: "Склонитесь, смертные! В этом образе не просят исполнения желаний — в нем повелевают судьбой. Потрясающе величественно.",
      dreamer: "Ты светишься ярче, чем фейерверк над волшебным замком. Чистая магия, фея-крестная гордилась бы тобой.",
      nymph: "Очаровательно. Сама нежность и весна. В этом платье невозможно не верить в счастливые финалы.",
    },
    choices: [{ label: "...", nextSceneId: "wardrobe_reveal_2" }],
  },

  // SCENE 5: WARDROBE REVEAL (Part 2)
  {
    id: "wardrobe_reveal_2",
    background: "/scene_2_wardrobe_enter.webp",
    music: "/magic.mp3",
    volume: 0.2,
    character: null,
    dynamicImage: false,
    dynamicBackground: {
      queen: "/queen.jpg",
      dreamer: "/dreamer.png",
      nymph: "/nymph.png",
    },
    speaker: "Продюсер",
    text: "",
    dynamicText: {
      queen: "Твой королевский облик завершен. Теперь ни у кого не возникнет сомнений в том, кто здесь главная.\n\nНу что, Ваше Величество, готовы?",
      dreamer: "Теперь ты сияешь достаточно ярко, чтобы разогнать любую тьму.\n\nПора сиять. Готова?",
      nymph: "Ты выглядишь как надежда. А надежда — это самое сильное оружие.\n\nИдем?",
    },
    choices: [{ label: "Я готова.", nextSceneId: "battle_start" }],
  },

  // SCENE 6: INTERNAL SHADOW
  {
    id: "battle_start",
    background: "/scene_battle.webp",
    music: null,
    character: null,
    speaker: "Тень Сомнений",
    text: "Посмотри на себя. Ты думаешь, этот образ что-то меняет? Это просто маскарад. Внутри ты всё та же: уставшая и одинокая.",
    choices: [{ label: "Промолчать...", nextSceneId: "battle_hesitation" }],
  },

  // SCENE 7: RESOLUTION CHOICE (Branching)
  {
    id: "battle_hesitation",
    background: "/scene_battle.webp",
    music: null,
    character: null,
    speaker: "Тень Сомнений",
    text: "Праздника не будет. Если ты сама его не устроишь — никто не устроит его для тебя. Всем плевать. Возвращайся в темноту, там безопасно.",
    choices: [
      { label: "🔥 Нет! Это МОЙ день!", nextSceneId: "scene_7a_strength" },
      { label: "💧 Ты права...", nextSceneId: "scene_7b_support" },
    ],
  },

  // --- ВЕТКА А: ПУТЬ СИЛЫ (Она сама справляется) ---
  {
    id: "scene_7a_strength",
    background: "/scene_battle.webp",
    music: null,
    character: null,
    speaker: "Героиня",
    text: "Заткнись! Я слышала тебя тысячу раз. Но сегодня Я решаю, кто я такая. Я буду сиять, даже если придется делать это одной!",
    effect: "shake",
    choices: [{ label: "Сделать шаг вперёд...", nextSceneId: "scene_8_backstage_1" }],
  },

  // --- ВЕТКА Б: ПУТЬ ПОДДЕРЖКИ (Мы помогаем) ---
  {
    id: "scene_7b_support",
    background: "/scene_battle.webp",
    music: null,
    character: null,
    speaker: "Продюсер",
    text: "Тебе не обязательно быть железной прямо сейчас. Можно бояться, это нормально. Но я не дам тебе остаться сегодня одной. Я подстрахую. Сделай вдох. Я рядом, и я никуда не уйду.",
    choices: [{ label: "Довериться и шагнуть...", nextSceneId: "scene_8_backstage_1" }],
  },

  // --- ТОЧКА СХОДА: ЗАКУЛИСЬЕ (Часть 1: Динамический текст) ---
  {
    id: "scene_8_backstage_1",
    background: "/scene_backstage.webp",
    music: null,
    character: null,
    speaker: "Продюсер",
    text: "",
    dynamicText: {
      queen: "Королевский бархат, свет софитов, магия... Это всё красиво, волшебно. Но это лишь декорации.",
      dreamer: "Звездное сияние, свет софитов, магия... Это всё красиво, волшебно. Но это лишь декорации.",
      nymph: "Цветочная нежность, свет софитов, магия... Это всё красиво, волшебно. Но это лишь декорации.",
    },
    choices: [{ label: "...", nextSceneId: "scene_8_backstage_2" }],
  },

  // --- ТОЧКА СХОДА: ЗАКУЛИСЬЕ (Часть 2: Настоящее сокровище) ---
  {
    id: "scene_8_backstage_2",
    background: "/scene_backstage.webp",
    music: null,
    character: null,
    speaker: "Продюсер",
    text: "Настоящее сокровище — это не то, что на тебе надето. А то, кто ждёт тебя в зале. Твоя реальность круче любой сказки, которую я могу нарисовать.",
    choices: [{ label: "...", nextSceneId: "scene_8_backstage_3" }],
  },

  // --- ТОЧКА СХОДА: ЗАКУЛИСЬЕ (Часть 3: Финальный вопрос) ---
  {
    id: "scene_8_backstage_3",
    background: "/scene_backstage.webp",
    music: null,
    character: null,
    speaker: "Продюсер",
    text: "Готова увидеть настоящий мир?",
    choices: [{ label: "Выйти в свет", nextSceneId: "finale" }],
  },

  // --- ФИНАЛ: ЗАЛ ДРУЗЕЙ ---
  {
    id: "finale",
    background: "/scene_finale_pov.webp",
    music: "/happy.mp3",
    loop: false,
    character: null,
    speaker: "Продюсер",
    text: "Посмотри на них! Это твои друзья, близкие, все, кто любит тебя. Мы здесь ради тебя. И знай: даже если весь мир погаснет, я — твой самый преданный фанат.",
    choices: [{ label: "Улыбнуться и петь", nextSceneId: "credits" }],
  },

  // --- ТИТРЫ / КОНЕЦ ---
  {
    id: "credits",
    background: "/scene_finale_pov.webp",
    music: "/finale.mp3",
    character: null,
    speaker: "Друг",
    text: "P.S. Я хотел показать, что даже если утро начинается с серости, а силы приходится искать в воображаемом мире, в конце дня тебя всегда ждет реальное тепло.\n\nЭтот зал, эти люди и я — мы настоящие. И мы тебя любим.\n\nС Днем Рождения!",
    choices: [{ label: "Начать историю заново", nextSceneId: "wakeup" }],
  },
]

export function getSceneById(id: string): Scene | undefined {
  return storyData.find((scene) => scene.id === id)
}

// Helper to get dynamic character image based on outfit
export function getOutfitImage(outfit: OutfitType): string | null {
  if (!outfit) return null
  return `/characters/outfit_${outfit}.webp`
}

// Helper to get dynamic text based on outfit
export function getDynamicText(scene: Scene, outfit: OutfitType): string {
  if (scene.dynamicText && outfit) {
    return scene.dynamicText[outfit] || scene.text
  }
  return scene.text
}

// Helper to get dynamic background based on outfit
export function getDynamicBackground(scene: Scene, outfit: OutfitType): string {
  if (scene.dynamicBackground && outfit) {
    return scene.dynamicBackground[outfit] || scene.background
  }
  return scene.background
}
