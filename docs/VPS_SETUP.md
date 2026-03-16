# Configuração na sua VPS

O projeto foi migrado para rodar na sua VPS, sem dependência do Supabase.

## O que mudou

- **Analytics**: envia dados para sua API em vez do Supabase
- **Painel (/painel)**: busca dados da sua API com autenticação por senha
- **Backend**: pasta `api/` com Node.js + Express + PostgreSQL

## 1. Banco de dados (PostgreSQL)

Na sua VPS, crie o banco e execute a migration:

```bash
# Criar banco (como postgres)
createdb panifair

# Executar script de criação da tabela
psql -U seu_usuario -d panifair -f api/init-db.sql
```

## 2. API (Node.js)

Na pasta `api/`:

```bash
cd api
npm install
```

Crie um arquivo `.env` na pasta `api/`:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/panifair
ANALYTICS_DASHBOARD_PASSWORD=sua_senha_do_painel
PORT=3001
```

Inicie a API:

```bash
npm start
```

Para produção, use `pm2` ou similar:

```bash
pm2 start server.js --name panifair-api
```

## 3. Frontend

No `.env` na raiz do projeto:

```
VITE_API_URL=https://sua-vps.com/api
```

Ou, se a API estiver no mesmo domínio com proxy:

```
VITE_API_URL=
```

(O frontend usará URLs relativas como `/api/analytics/track` - mesma origem)

E configure o Nginx/Apache para fazer proxy de `/api` para `http://localhost:3001`.

## 4. Nginx (exemplo)

Se o site está em `panifair.com` e a API na mesma VPS:

```nginx
server {
    listen 80;
    server_name panifair.com;

    # Frontend (build do Vite)
    location / {
        root /var/www/panifair/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Nesse caso, use no `.env` do frontend:

```
VITE_API_URL=
```

O frontend usará a mesma origem (panifair.com), e o Nginx encaminha `/api` para a API.

## 5. Credenciais

| Variável | Onde | Descrição |
|----------|------|-----------|
| `DATABASE_URL` | api/.env | Connection string do PostgreSQL |
| `ANALYTICS_DASHBOARD_PASSWORD` | api/.env | Senha para acessar /painel |
| `VITE_API_URL` | .env (raiz) | URL da API (ex: https://panifair.com se usar proxy) |

## 6. Remover Supabase (opcional)

As variáveis `VITE_SUPABASE_*` não são mais usadas. Você pode removê-las do `.env`.
