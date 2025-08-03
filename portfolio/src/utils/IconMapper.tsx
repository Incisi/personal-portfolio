import React from 'react';

import {
    FaNodeJs, FaReact, FaGitAlt, FaDocker, FaLinux, FaJava,
    FaDatabase, FaPython, FaAngular, FaPhp, FaLaravel, FaAws, FaGithub,
    FaHtml5, FaCss3Alt,
    FaJsSquare
} from 'react-icons/fa';
import {
    SiTypescript, SiNestjs, SiPostgresql, SiMysql, SiMongodb, SiSqlite,
    SiVite, SiNextdotjs, SiDjango, SiSpringboot, SiFlutter, SiGo,
    SiCplusplus, SiGraphql, SiRedis,
    SiOracle, SiKubernetes, SiTerraform, SiNginx, SiGooglecloud,
    SiExpress, SiRubyonrails, SiRuby, SiSwift, SiKotlin,
    SiVuedotjs, SiSvelte, SiTensorflow, SiPytorch, SiPandas, SiScikitlearn,
    SiZapier, SiN8N,
    SiReact
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export const ICONS: { [key: string]: React.ElementType } = {
    // --- Linguagens de Programação ---
    SiJavascript: FaJsSquare,
    SiTypescript: SiTypescript,
    FaPython: FaPython,
    FaJava: FaJava,
    SiCplusplus: SiCplusplus,
    SiGo: SiGo,
    FaPhp: FaPhp,
    SiRuby: SiRuby,
    SiSwift: SiSwift,
    SiKotlin: SiKotlin,

    // --- Back-end ---
    FaNodeJs: FaNodeJs,
    SiNestjs: SiNestjs,
    SiExpress: SiExpress,
    SiDjango: SiDjango,
    SiSpringboot: SiSpringboot,
    FaLaravel: FaLaravel,
    SiRubyonrails: SiRubyonrails,

    // --- Front-end ---
    FaReact: FaReact,
    FaAngular: FaAngular,
    SiVuedotjs: SiVuedotjs,
    SiSvelte: SiSvelte,
    SiNextdotjs: SiNextdotjs,
    SiVite: SiVite,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,

    // --- Mobile ---
    FaReactnative: SiReact,
    SiFlutter: SiFlutter,

    // --- Bancos de Dados ---
    SiPostgresql: SiPostgresql,
    SiMysql: SiMysql,
    SiMongodb: SiMongodb,
    SiSqlite: SiSqlite,
    SiRedis: SiRedis,
    SiOracle: SiOracle,

    // --- DevOps, Nuvem & Ferramentas ---
    FaGitAlt: FaGitAlt,
    FaGithub: FaGithub,
    FaDocker: FaDocker,
    SiKubernetes: SiKubernetes,
    SiTerraform: SiTerraform,
    FaAws: FaAws,
    SiGooglecloud: SiGooglecloud,
    FaLinux: FaLinux,
    SiNginx: SiNginx,

    // --- Data Science & IA ---
    SiTensorflow: SiTensorflow,
    SiPytorch: SiPytorch,
    SiPandas: SiPandas,
    SiScikitlearn: SiScikitlearn,

    // --- APIs & Padrões ---
    SiGraphql: SiGraphql,
    TbApi: TbApi,

    // --- Automação / No-Code ---
    SiZapier: SiZapier,
    SiN8N: SiN8N,
};

interface TechIconProps {
    iconName: string;
}

export const TechIcon = ({ iconName }: TechIconProps) => {
    const IconComponent = ICONS[iconName];

    if (!IconComponent) {
        console.warn(`Ícone "${iconName}" não encontrado no IconMapper.`);
        return <FaDatabase />;
    }

    return <IconComponent />;
};