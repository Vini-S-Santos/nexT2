# 📊 Sistema de Gestão de Transações

Este é um sistema full-stack desenvolvido para gerenciar transações de usuários com base em arquivos `.xlsx`. Ele permite upload de transações, visualização de extrato por usuário, saldo de pontos e painel administrativo.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js, Vite, Axios
- **Backend:** Node.js, Express, Sequelize, MySQL
- **Banco de Dados:** MySQL 8.4 (em container)
- **Containerização:** Docker e Docker Compose

---

## 🔧 Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone git@github.com:Vini-S-Santos/nexT2.git
cd <seu-repositorio>
```

### 2. Criar arquivos `.env`
Crie um arquivo `.env` dentro da pasta `backend` com as seguintes variáveis:

```
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=transacoes
```

> Altere os valores conforme necessário.

### 3. Subir com Docker
```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend (API): http://localhost:3001

---

## 📤 Formato de Upload de Transações

O arquivo de transações enviado deve ser no formato `.xlsx` com o seguinte padrão de colunas, lembrando que o cpf deve conter apenas numeros:

```
| CPF            | Descrição da transação | Data da transação | Valor em pontos | Valor     | Status       |
|----------------|------------------------|-------------------|-----------------|-----------|--------------|
| 28227930000    | Venda do produto X     | 10-10-2022        | 10,000          | 10.000,00 | Aprovado     |
| 28227930000    | Venda do produto Y     | 10-10-2022        | 10,000          | 10.000,00 | Reprovado    |
| 28227930000    | Venda do produto Z     | 10-10-2022        | 10,000          | 10.000,00 | Em avaliação |
|                |                        |                   |                 |           |              |


> Certifique-se de seguir exatamente esse padrão para garantir o processamento correto do arquivo.

---

## 👤 Usuários

- Admins podem:
  - Fazer upload de planilhas.
  - Ver o painel geral de transações.

- Usuários comuns podem:
  - Ver seu próprio extrato e saldo de pontos aprovados.

---

## 🐳 Comandos úteis

```bash
docker-compose down           # Derruba os containers
docker-compose up --build     # Sobe novamente com rebuild
```

---

## 📝 Licença

MIT © 2025
