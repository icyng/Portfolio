import { FaPython, FaCuttlefish, FaReact, FaDocker, FaGithub } from 'react-icons/fa';
import { SiNumpy, SiPytorch, SiTensorflow, SiFastapi, SiGo } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import ava from './assets/ava.png';

export default {
    hero: {
        name: 'Taketsuna Ichiyanagi',
        tagline: 'Student / AI Engineer',
    },
    intro: {
        avatar: ava,
        name: 'Taketsuna Ichiyanagi',
        description: '2002年5月23日生まれ長野県出身の23歳。現在は農工大古宮研究室所属のM1(修士1年)。自然言語処理や視覚情報処理などの学際領域に対し、研究・実装を行なっている。趣味は麻雀と旅行。'
    },
    ownedSkills : [
        { icon: <FaCuttlefish />, label: 'C' },
        { icon: <FaPython />, label: 'Python' },
        { icon: <FaReact />, label: 'React' },
        { icon: <SiNumpy />, label: 'NumPy' },
        { icon: <SiPytorch />, label: 'Pytorch' },
        { icon: <SiTensorflow />, label: 'TensorFlow' },
        { icon: <FaGithub />, label: 'GitHub' },
        { icon: <FaDocker />, label: 'Docker' },
    ],
    learningSkills : [
        { icon: <SiFastapi />, label: 'FastAPI' },
        { icon: <SiGo />, label: 'Go' },
        { icon: <TbSql />, label: 'SQL' },
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
        description: '衝撃のイナズマZとして参加し、オンライン点呼アプリであるTENTENを制作、自身は顔認証工程を担当。',
        link: 'https://hacku.yahoo.co.jp/kosen2022/',
        },
        {
        title: '農工大 卒業研究',
        period: '2024.6 - 2025.3',
        description: 'RAGを用いたLLMによる国語答案生成の研究を行った。研究成果は、2025年3月にNLP2025で発表。',
        link: 'https://www.anlp.jp/proceedings/annual_meeting/2025/pdf_dir/P3-17.pdf',
        },
        {
        title: 'PRICAI 2025',
        period: '2025.11',
        description: '卒業論文の内容を修正し、論文として教育系の国際学会で発表予定（Workshop）。',
        link: 'https://www.pricai.org/2025/',
        },
    ],
    contact: {
        email: 'take523oliver@gmail.com',
        prompt: 'Interested in working together? …',
        wantedly: 'https://www.wantedly.com/id/t4k3',
        github: 'https://github.com/icyng',
    },
};
