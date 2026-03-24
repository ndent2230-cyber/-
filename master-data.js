const dentalTreatmentBundles = [
  {
    category: "補綴",
    setName: "ZrIn",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "ジルコニアインレー", unitPrice: 66000 },
    ],
  },
  {
    category: "補綴",
    setName: "ZrCr（臼歯）",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "ジルコニアクラウン", unitPrice: 93500 },
    ],
  },
  {
    category: "補綴",
    setName: "ZrCr（前歯）",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "ジルコニアクラウン", unitPrice: 93500 },
      { label: "TEK", unitPrice: 11000 },
    ],
  },
  {
    category: "金属床FD",
    setName: "チタン金属床(総義歯)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "チタン金属床(総義歯)", unitPrice: 418000 },
    ],
  },
  {
    category: "金属床FD",
    setName: "コバルト金属床(総義歯)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "コバルト金属床(総義歯)", unitPrice: 363000 },
    ],
  },
  {
    category: "金属床PD",
    setName: "チタン金属床(４歯以上)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "チタン金属床(４歯以上)", unitPrice: 385000 },
      { label: "ノンクラスプ追加", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "金属床PD",
    setName: "チタン金属床(３歯以下)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "チタン金属床(３歯以下)", unitPrice: 308000 },
      { label: "ノンクラスプ追加", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "金属床PD",
    setName: "コバルト金属床(４歯以上)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "コバルト金属床(４歯以上)", unitPrice: 330000 },
      { label: "ノンクラスプ追加", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "金属床PD",
    setName: "コバルト金属床(３歯以下)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "仮合わせ", unitPrice: 5500 },
      { label: "コバルト金属床(３歯以下)", unitPrice: 275000 },
      { label: "ノンクラスプ追加", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "ノンクラスプPD",
    setName: "ノンクラスプデンチャー(２歯以下)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "咬み合わせ記録", unitPrice: 5500 },
      { label: "ノンクラスプデンチャー(２歯以下)", unitPrice: 110000 },
    ],
  },
  {
    category: "ヒューマンBr",
    setName: "ヒューマンブリッジ(１歯欠損)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "ヒューマンブリッジ(１歯欠損)", unitPrice: 407000 },
    ],
  },
  {
    category: "ヒューマンBr",
    setName: "ヒューマンブリッジ(２歯欠損)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "ヒューマンブリッジ(２歯欠損)", unitPrice: 528000 },
    ],
  },
  {
    category: "接着Br",
    setName: "接着ブリッジ",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "TEK", unitPrice: 11000, note: "追加の可能性あり" },
      { label: "接着ブリッジ", unitPrice: 187000 },
    ],
  },
  {
    category: "ラミネートベニア",
    setName: "ラミネートベニア",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "TEK", unitPrice: 11000 },
      { label: "ラミネートベニア", unitPrice: 110000 },
    ],
  },
  {
    category: "ホワイトニング",
    setName: "ホワイトニング",
    items: [{ label: "ホワイトニング", unitPrice: 38500 }],
  },
  {
    category: "歯周治療",
    setName: "歯周再生療法",
    items: [{ label: "歯周再生療法", unitPrice: 165000 }],
  },
  {
    category: "矯正",
    setName: "矯正(１本のみ)",
    items: [
      { label: "型取り", unitPrice: 5500 },
      { label: "矯正(１本のみ)", unitPrice: 110000 },
    ],
  },
  {
    category: "矯正",
    setName: "矯正リテーナー",
    items: [{ label: "矯正リテーナー", unitPrice: 44000 }],
  },
  {
    category: "矯正",
    setName: "プレオルソ",
    items: [{ label: "プレオルソ", unitPrice: 165000 }],
  },
  {
    category: "スポーツ用マウスピース",
    setName: "スポーツ用マウスピース",
    items: [{ label: "スポーツ用マウスピース", unitPrice: 22000 }],
  },
  {
    category: "歯周治療",
    setName: "ブルーラジカル",
    items: [{ label: "ブルーラジカル", unitPrice: 33000 }],
  },
  {
    category: "補綴",
    setName: "ダイレクトボンディング",
    items: [{ label: "ダイレクトボンディング", unitPrice: 33000 }],
  },
  {
    category: "インプラント",
    setName: "インプラント基本セット",
    items: [
      { label: "CT撮影（１回あたり）", unitPrice: 5500 },
      { label: "サージカルガイド（埋入費用に含む）", unitPrice: 0 },
      { label: "インプラント埋入", unitPrice: 284900 },
      { label: "骨造成（簡単）", unitPrice: 88000, note: "追加の可能性あり" },
      { label: "二次手術", unitPrice: 13200, note: "追加の可能性あり" },
      { label: "型取り", unitPrice: 13200 },
      { label: "上部構造", unitPrice: 170500 },
    ],
  },
  {
    category: "インプラント",
    setName: "リッジプリザベーション",
    items: [{ label: "リッジプリザベーション", unitPrice: 121000 }],
  },
  {
    category: "インプラント",
    setName: "ソケットリフト",
    items: [{ label: "ソケットリフト", unitPrice: 110000 }],
  },
  {
    category: "インプラント",
    setName: "サイナスリフト",
    items: [{ label: "サイナスリフト", unitPrice: 220000 }],
  },
  {
    category: "根管治療",
    setName: "精密根管治療（前歯）",
    items: [
      { label: "精密根管治療（前歯）", unitPrice: 88000 },
      { label: "難症例加算", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "根管治療",
    setName: "精密根管治療（小臼歯）",
    items: [
      { label: "精密根管治療（小臼歯）", unitPrice: 110000 },
      { label: "難症例加算", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
  {
    category: "根管治療",
    setName: "精密根管治療（大臼歯）",
    items: [
      { label: "精密根管治療（大臼歯）", unitPrice: 132000 },
      { label: "難症例加算", unitPrice: 55000, note: "追加の可能性あり" },
    ],
  },
];

const standaloneTreatments = [
  { category: "補綴", label: "型取り", unitPrice: 5500 },
  { category: "補綴", label: "ジルコニアインレー", unitPrice: 66000 },
  { category: "補綴", label: "ジルコニアクラウン", unitPrice: 93500 },
  { category: "補綴", label: "TEK", unitPrice: 11000 },
  { category: "金属床FD", label: "咬み合わせ記録", unitPrice: 5500 },
  { category: "金属床FD", label: "仮合わせ", unitPrice: 5500 },
  { category: "金属床FD", label: "チタン金属床(総義歯)", unitPrice: 418000 },
  { category: "金属床FD", label: "コバルト金属床(総義歯)", unitPrice: 363000 },
  { category: "金属床PD", label: "チタン金属床(４歯以上)", unitPrice: 385000 },
  { category: "金属床PD", label: "ノンクラスプ追加", unitPrice: 55000 },
  { category: "金属床PD", label: "チタン金属床(３歯以下)", unitPrice: 308000 },
  { category: "金属床PD", label: "コバルト金属床(４歯以上)", unitPrice: 330000 },
  { category: "金属床PD", label: "コバルト金属床(３歯以下)", unitPrice: 275000 },
  { category: "ノンクラスプPD", label: "ノンクラスプデンチャー(２歯以下)", unitPrice: 110000 },
  { category: "ヒューマンBr", label: "ヒューマンブリッジ(１歯欠損)", unitPrice: 407000 },
  { category: "ヒューマンBr", label: "ヒューマンブリッジ(２歯欠損)", unitPrice: 528000 },
  { category: "接着Br", label: "接着ブリッジ", unitPrice: 187000 },
  { category: "ラミネートベニア", label: "ラミネートベニア", unitPrice: 110000 },
  { category: "ホワイトニング", label: "ホワイトニング", unitPrice: 38500 },
  { category: "歯周治療", label: "歯周再生療法", unitPrice: 165000 },
  { category: "矯正", label: "矯正(１本のみ)", unitPrice: 110000 },
  { category: "矯正", label: "矯正ゴム交換（週１回）", unitPrice: 3300 },
  { category: "矯正", label: "矯正リテーナー", unitPrice: 44000 },
  { category: "スポーツ用マウスピース", label: "スポーツ用マウスピース", unitPrice: 22000 },
  { category: "矯正", label: "プレオルソ", unitPrice: 165000 },
  { category: "歯周治療", label: "ブルーラジカル", unitPrice: 33000 },
  { category: "補綴", label: "ダイレクトボンディング", unitPrice: 33000 },
  { category: "インプラント", label: "CT撮影（１回あたり）", unitPrice: 5500 },
  { category: "インプラント", label: "サージカルガイド（埋入費用に含む）", unitPrice: 0 },
  { category: "インプラント", label: "インプラント埋入", unitPrice: 284900 },
  { category: "インプラント", label: "骨造成（簡単）", unitPrice: 88000 },
  { category: "インプラント", label: "二次手術", unitPrice: 13200 },
  { category: "インプラント", label: "上部構造", unitPrice: 170500 },
  { category: "インプラント", label: "リッジプリザベーション", unitPrice: 121000 },
  { category: "インプラント", label: "ソケットリフト", unitPrice: 110000 },
  { category: "インプラント", label: "サイナスリフト", unitPrice: 220000 },
  { category: "根管治療", label: "精密根管治療（前歯）", unitPrice: 88000 },
  { category: "根管治療", label: "難症例加算", unitPrice: 55000 },
  { category: "根管治療", label: "精密根管治療（小臼歯）", unitPrice: 110000 },
  { category: "根管治療", label: "精密根管治療（大臼歯）", unitPrice: 132000 },
];

const treatmentMap = new Map();

standaloneTreatments.forEach((treatment) => {
  treatmentMap.set(treatment.label, treatment);
});

dentalTreatmentBundles.forEach((bundle) => {
  bundle.items.forEach((item) => {
    if (!treatmentMap.has(item.label)) {
      treatmentMap.set(item.label, {
        category: bundle.category,
        label: item.label,
        unitPrice: item.unitPrice,
      });
    }
  });
});

const dentalTreatmentMaster = Array.from(treatmentMap.values());
