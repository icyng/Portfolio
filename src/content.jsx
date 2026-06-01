import { FaPython, FaCuttlefish, FaReact, FaDocker, FaGithub } from 'react-icons/fa';
import { SiNumpy, SiPytorch, SiTensorflow, SiFastapi, SiGo, SiRuby } from "react-icons/si";
import { TbSql } from "react-icons/tb";

export default {
    hero: {
        name: 'icyng',
        tagline: 'Data Science Student',
    },
    intro: {
        avatar: '/hero.png',
        name: 'icyng',
        description: [
            '所属：東京農工大学先進学際科学府 古宮研究室 M2',
            '研究：自然言語処理や視覚情報処理などの学際領域',
            '開発：mahjong 牌譜データベースの開発・運用',
        ]
    },
    skillGroups: [
        {
            title: 'Core',
            items: [
                { icon: <FaCuttlefish />, label: 'C' },
                { icon: <FaPython />, label: 'Python' },
                { icon: <SiRuby />, label: 'Ruby' },
                { icon: <FaReact />, label: 'React' },
                { icon: <FaGithub />, label: 'GitHub' },
                { icon: <FaDocker />, label: 'Docker' },
            ],
        },
        {
            title: 'Machine Learning',
            items: [
                { icon: <SiNumpy />, label: 'NumPy' },
                { icon: <SiPytorch />, label: 'PyTorch' },
                { icon: <SiTensorflow />, label: 'TensorFlow' },
            ],
        },
        {
            title: 'Learning',
            items: [
                { icon: <SiGo />, label: 'Go' },
                { icon: <TbSql />, label: 'SQL' },
            ],
        },
    ],
    career: [
        {
            period: '2018 - 2023',
            institution: '長野工業高等専門学校 電子情報工学科',
            degree: "工学準学士",
        },
        {
            period: '2023 - 2025',
            institution: '東京農工大学 工学部 知能情報システム工学科',
            degree: "工学学士",
        },
        {
            period: '2025 - now',
            institution: '東京農工大学 先進学際科学府 先進学際科学専攻',
            degree: "工学修士(見込)",
        },
    ],
    projects: [
        {
            title: 'HackU Kosen 2022',
            period: '2022.11 - 2022.12',
            description: '衝撃のイナズマZとして参加し、オンライン点呼アプリであるTENTENを制作、最優秀賞を受賞',
            link: 'https://hacku.yahoo.co.jp/kosen2022/',
        },
        {
            title: 'INTERNSHIP (DATUM STUDIO)',
            period: '2025.9',
            description: 'データエンジニアリングのワークショップに参加し、データパイプラインの構築を経験',
            link: 'https://datumstudio.jp/information/summer-internship-2025/',
        },
        {
            title: 'PKAW 2025',
            period: '2025.11',
            description: '共テ記述模試に対し複数手法で回答して網羅的に評価した、Long Paperとして教育系の国際学会で発表済み（Workshop）',
            link: 'https://pkawwebsite.github.io/2025/#program',
        },
        {
            title: 'mahjong 牌譜データベース',
            period: '2025.4 - now',
            description: '麻雀実況配信から牌譜を収集し、試合毎のデータベースを viewer 形式で確認できる（近日公開予定）',
            link: '#',
        },
    ],
    contact: {
        prompt: 'Interested in working together? …',
        email: 'icyng.sim@gmail.com',
        github: 'https://github.com/icyng',
    },
};
