import { validatePortfolio } from './validatePortfolio';

const portfolio = validatePortfolio({
  site: {
    name: 'icyng',
    tagline: 'Data Science / Student',
  },
  intro: {
    avatar: '/hero.png',
    name: 'icyng',
    highlights: [
      '所属：東京農工大学先進学際科学府 古宮研究室 M2',
      '研究：自然言語処理や視覚情報処理などの学際領域',
      '開発：mahjong 牌譜データベースの開発・運用',
    ],
  },
  skillGroups: [
    {
      id: 'core',
      title: 'Core',
      items: [
        { id: 'c', icon: 'c', label: 'C' },
        { id: 'python', icon: 'python', label: 'Python' },
        { id: 'ruby', icon: 'ruby', label: 'Ruby' },
        { id: 'react', icon: 'react', label: 'React' },
        { id: 'github', icon: 'github', label: 'GitHub' },
        { id: 'docker', icon: 'docker', label: 'Docker' },
      ],
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      items: [
        { id: 'numpy', icon: 'numpy', label: 'NumPy' },
        { id: 'pytorch', icon: 'pytorch', label: 'PyTorch' },
        { id: 'tensorflow', icon: 'tensorflow', label: 'TensorFlow' },
      ],
    },
    {
      id: 'learning',
      title: 'Learning',
      items: [
        { id: 'go', icon: 'go', label: 'Go' },
        { id: 'sql', icon: 'sql', label: 'SQL' },
      ],
    },
  ],
  career: [
    {
      id: 'nit-nagano',
      period: '2018 - 2023',
      institution: '長野工業高等専門学校 電子情報工学科',
      degree: '工学準学士',
    },
    {
      id: 'tuat-undergraduate',
      period: '2023 - 2025',
      institution: '東京農工大学 工学部 知能情報システム工学科',
      degree: '工学学士',
    },
    {
      id: 'tuat-graduate',
      period: '2025 - now',
      institution: '東京農工大学 先進学際科学府 先進学際科学専攻',
      degree: '工学修士（見込）',
    },
  ],
  projects: [
    {
      id: 'hacku-kosen-2022',
      title: 'HackU Kosen 2022',
      period: '2022.11 - 2022.12',
      description: '衝撃のイナズマZとして参加し、オンライン点呼アプリであるTENTENを制作、最優秀賞を受賞',
      href: 'https://hacku.yahoo.co.jp/kosen2022/',
    },
    {
      id: 'datum-studio-internship',
      title: 'INTERNSHIP (DATUM STUDIO)',
      period: '2025.9',
      description: 'データエンジニアリングのワークショップに参加し、データパイプラインの構築を経験',
      href: 'https://datumstudio.jp/information/summer-internship-2025/',
    },
    {
      id: 'pkaw-2025',
      title: 'PKAW 2025',
      period: '2025.11',
      description: '共テ記述模試に対し複数手法で回答して網羅的に評価した、Long Paperとして教育系の国際学会で発表済み（Workshop）',
      href: 'https://pkawwebsite.github.io/2025/#program',
    },
    {
      id: 'mahjong-database',
      title: 'mahjong 牌譜データベース',
      period: '2025.4 - now',
      description: '麻雀実況配信から牌譜を収集し、試合毎のデータベースをviewer形式で確認できる',
      status: 'coming-soon',
    },
  ],
  contact: {
    prompt: 'Interested in working together?',
    actions: [
      { id: 'email', label: 'Email', icon: 'mail', href: 'mailto:icyng.sim@gmail.com' },
      { id: 'github', label: 'GitHub', icon: 'github', href: 'https://github.com/icyng', external: true },
    ],
  },
});

export default portfolio;
