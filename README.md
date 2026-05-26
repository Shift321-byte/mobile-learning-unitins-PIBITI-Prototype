# Mobile Learning – Área da Saúde (UNITINS)

Protótipo de Aplicativo *mobile learning* para estudantes de saúde da UNITINS.
Projeto PIBITI/FAPT 2023/2024.

**Bolsista:** Pedro Henrique da Silva Almeida  
**Orientador:** Derval Gomes Ribeiro Neto

## Estrutura

```
mobile-learning/
├── server/       # API Node.js + TypeScript + Express
├── mobile/       # App React Native + TypeScript
└── web-client/   # Painel Admin React
```

## Como Rodar

### Servidor
```bash
cd server && npm install && cp .env.example .env && npm run dev
```

### App Mobile
```bash
cd mobile && npm install && npx react-native run-android
```

### Cliente Web
```bash
cd web-client && npm install && npm start
```

## Tecnologias
- React Native + TypeScript
- Node.js + Express + TypeScript
- PostgreSQL 15
- Amazon S3
- JWT
