# Protótipo de APP de Mobile Learning para a Área da Saúde – UNITINS

Protótipo de sistema de mobile learning desenvolvido para apoio ao processo de ensino-aprendizagem de estudantes da área da saúde da Universidade Estadual do Tocantins (UNITINS), no contexto do programa PIBITI/FAPT (2023–2024).

O projeto foi desenvolvido pelo bolsista sob orientação do docente responsável, com foco na concepção e implementação de uma arquitetura de software educacional composta por aplicação móvel, painel administrativo web e API backend, visando à experimentação de soluções digitais aplicadas ao ensino em saúde.

**Bolsista:** Pedro Henrique da Silva Almeida  
**Orientador:** Derval Gomes Ribeiro Neto

---

# Arquitetura do Sistema

O sistema foi estruturado em uma arquitetura full-stack distribuída, composta por três módulos principais:

```txt
mobile-learning/
├── server/       # API Node.js + TypeScript + Express
├── mobile/       # App React Native + TypeScript
└── web-client/   # Painel Admin React
```

## Descrição dos módulos

### server/

Camada de backend responsável pela implementação de uma API RESTful desenvolvida em Node.js com Express e TypeScript, com integração a banco de dados relacional PostgreSQL, autenticação via JWT e integração com serviços externos.

### mobile/

Aplicativo mobile desenvolvido em React Native com TypeScript, destinado a estudantes da área da saúde, responsável pelo consumo da API e apresentação de conteúdos educacionais.

### web-client/

Painel administrativo desenvolvido em React, responsável pela gestão de conteúdos educacionais, usuários e recursos do sistema.

---

# Como Executar

## Backend (Servidor)

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## App Mobile

```bash
cd mobile
npm install
npx react-native run-android
```

## Cliente Web

```bash
cd web-client
npm install
npm start
```
```

## Tecnologias
- React Native + TypeScript
- Node.js + Express + TypeScript
- PostgreSQL 15
- Amazon S3
- JWT
