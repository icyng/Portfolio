// src/components/content.js
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
        description: '農工大古宮研究室所属のM1。自然言語処理や視覚情報処理などの学際領域に対し、研究・実装の観点で興味がある。'
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
            degree: "工学修士",
        },
    ],
    projects: [
        {
        title: 'HackU Kosen 2022',
        period: '2022.11 - 2022.12',
        description: '衝撃のイナズマZとして参加し、オンライン点呼アプリであるTENTENを制作した。自身は顔認証工程を担当した。',
        link: 'https://hacku.yahoo.co.jp/kosen2022/',
        },
        {
        title: '農工大 卒業研究',
        period: '2024.6 - 2025.3',
        description: 'RAGを用いたLLMによる国語答案生成の研究を行った。研究成果は、2025年3月に国内学会で発表。',
        link: 'https://www.anlp.jp/proceedings/annual_meeting/2025/pdf_dir/P3-17.pdf',
        },
    ],
    contact: {
        email: 'take523oliver@gmail.com',
        prompt: 'Interested in working together? …',
        wantedly: 'https://www.wantedly.com/id/t4k3',
        github: 'https://github.com/Token-05',
    },
};
