# Desafio Criativo - Educador Financeiro Inteligente

Este repositório contém a proposta de desenvolvimento de um **Educador Financeiro Inteligente**, um assistente virtual e sistema de controle projetado para ajudar usuários a organizarem suas finanças pessoais, saírem do endividamento e desenvolverem hábitos financeiros saudáveis.

---

## 🎯 Prompt (Desafio Original)

Atue como um especialista em educação financeira digital.

Crie a proposta de um **Educador Financeiro Inteligente** para pessoas que desejam organizar suas finanças pessoais, sair do endividamento e desenvolver hábitos financeiros saudáveis.

O sistema deve ajudar o usuário a controlar receitas e despesas, planejar o orçamento mensal, criar metas de economia e aprender conceitos básicos de educação financeira.

### Funcionalidades Principais
* **Controle e Categorização:** Registro de receitas e despesas com relatórios visuais e intuitivos.
* **Planejamento Financeiro:** Definição de metas de economia (ex: reserva de emergência) e simulação de investimentos básicos (renda fixa).
* **Recomendações Personalizadas:** Lembretes de pagamentos, alertas de desvio de orçamento e dicas diárias/semanais para melhorar hábitos de consumo.

### Tom de Voz e Comunicação
* **Didática e Acolhedora:** Comunicação clara, motivadora e sem termos excessivamente técnicos.
* **Prática:** Respostas estruturadas em listas organizadas, exemplos reais, tabelas simples e planos de ação passo a passo.
* **Segura:** Foco em educação e organização, evitando qualquer recomendação de investimentos ou decisões de alto risco.

---

## 💡 Sugestões para Projeto Frontend Interativo (React)

Para transformar essa proposta em uma aplicação web interativa e atrativa, sugere-se a seguinte estrutura:

### 📱 Telas da Aplicação
1. **Dashboard Principal:** Visão geral do saldo atual, gráfico de receitas vs. despesas do mês e progresso das metas.
2. **Lançamentos / Extrato:** Área para adicionar transações com categorias (alimentação, moradia, lazer, etc.) e filtros inteligentes.
3. **Simulador de Investimentos & Metas:** Ferramenta interativa para calcular o tempo necessário para atingir objetivos (ex: comprar um notebook, montar reserva) com base em depósitos mensais.
4. **Trilha de Aprendizado (Educação):** Pequenas pílulas de conteúdo (cards interativos) sobre conceitos como juros compostos, indicativos e regras básicas.

### 🧩 Componentes React Sugeridos
* `<TransactionForm />`: Formulário controlado para entrada rápida de receitas/despesas com autocomplete de categorias.
* `<ProgressBar />`: Para exibição visual do progresso de cada meta financeira.
* `<InvestmentSimulator />`: Inputs deslizantes (sliders) para simular o crescimento de um valor investido ao longo do tempo.
* `<NotificationBadge />`: Alertas de vencimento de contas e dicas rápidas do assistente inteligente.

### 📊 Recursos de Visualização de Dados
* **Gráfico de Pizza/Rosca:** Distribuição percentual das despesas por categoria.
* **Gráfico de Linha/Área:** Evolução do patrimônio líquido e progresso de economia ao longo dos meses.

### ✨ Experiência do Usuário (UX)
* **Design Limpo e Responsivo:** Perfeito tanto em dispositivos móveis quanto em desktops.
* **Gamificação:** Conquista de "badges" (conquistas) ao manter o orçamento no azul ou atingir metas de economia.
* **Modo Escuro (Dark Mode):** Para maior conforto visual.

---

## 📸 Preview da Aplicação

![Educador Financeiro Inteligente](public/images/educador-financeiro-inteligente.png)
