# 🚀 NexLab Full Stack Challenge

Aplicação full stack desenvolvida como desafio técnico. O projeto é estruturado em monorepo e utiliza Docker para facilitar a execução de todos os serviços.

---


## ⚙️ Tecnologias Utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + Sequelize
- **Banco de Dados:** MySQL
- **Ambiente:** Docker e Docker Compose

---

## 📁 Variáveis de Ambiente

Crie os arquivos `.env` nos diretórios `backend/` e `frontend/` com base nos exemplos abaixo:

### backend/.env

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=suasenha
DB_NAME=transacoes
```

### frontend/.env

```env
VITE_API_URL=http://localhost:3001
```

---

## 🚀 Como Rodar Localmente com Docker

### 1. Clone o repositório

```bash
git clone git@github.com:Vini-S-Santos/nexT2.git
cd seu-repositorio
```

### 2. Crie os arquivos `.env`

Siga os exemplos acima.

### 3. Suba os containers

```bash
docker-compose up --build
```

### 4. Acesse no navegador:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

---

## 🧪 Funcionalidades

- [x] Autenticação de usuários
- [x] Registro de transações
- [x] Banco MySQL persistente via Docker volume
- [x] Comunicação entre serviços Docker

---

## 📌 Observações

- Lembre-se de **NÃO versionar o `.env`**.
- Após usar, você pode parar os containers com:

```bash
docker-compose down
```

---

## 🧑‍💻 Autor

Desenvolvido por [Vinicius Souza](https://github.com/Vini-S-Santos).
