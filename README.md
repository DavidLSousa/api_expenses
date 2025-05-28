# 💸 ExpenseTracker API

Uma API REST robusta e escalável para controle de **despesas pessoais**, desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL**. Ideal para aplicações que precisam registrar, consultar, editar e excluir gastos com eficiência e clareza.

---

## 🚀 Funcionalidades Principais

🔹 **CRUD completo de Despesas**:
- Criar uma nova despesa
- Listar todas as despesas com filtros opcionais
- Buscar uma despesa pelo ID
- Atualizar dados de uma despesa
- Excluir uma despesa

---

## 📘 Modelo da Entidade: `Expense`

| Campo       | Tipo     | Obrigatório | Descrição                                       |
|-------------|----------|-------------|-------------------------------------------------|
| `id`        | UUID     | ✅          | Identificador único da despesa                  |
| `title`     | string   | ✅          | Título descritivo da despesa                    |
| `amount`    | number   | ✅          | Valor numérico da despesa                       |
| `category`  | string   | ✅          | Categoria (ex: Alimentação, Lazer)              |
| `date`      | Date     | ✅          | Data de realização da despesa                   |
| `createdAt` | Date     | Automático  | Data de criação do registro                     |
| `updatedAt` | Date     | Automático  | Data da última atualização do registro          |

---

## 🧪 Stack Técnica

- [NestJS](https://nestjs.com/) com estrutura modular (`Module`, `Service`, `Controller`)
- [Prisma ORM](https://www.prisma.io/) para comunicação com **PostgreSQL**
- **DTOs** com validação utilizando `class-validator` e `class-transformer`
- Filtros via **query strings**
- Padrão RESTful em todas as rotas

---

## 🧭 Endpoints REST

| Método | Rota             | Ação                                |
|--------|------------------|-------------------------------------|
| GET    | `/expenses`      | Lista todas as despesas             |
| GET    | `/expenses/:id`  | Retorna uma despesa específica      |
| POST   | `/expenses`      | Cria uma nova despesa               |
| PUT    | `/expenses/:id`  | Atualiza uma despesa existente      |
| DELETE | `/expenses/:id`  | Remove uma despesa do sistema       |

## Outros

- 🔐 Autenticação via **JWT Guard** (sem login real — apenas simulação de proteção de rota)
- 📄 Documentação automatizada com **Swagger** (`@nestjs/swagger`)
- ⚡ Integração com **Redis** para cache de listagens

---

## 🛠️ Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/DavidLSousa/api_expenses.git
   cd api_expenses

2. Instale as dependências:
  ```bash
  npm install
  ```

3. Configure o banco de dados no arquivo .env:
  ```bash
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
  ```

4. Execute as migrações do Prisma:
  ```bash
  npx prisma migrate dev --name init
  ```

5. Inicie o servidor de desenvolvimento:
  ```bash
  npm run start:dev
  ```

✅ Pronto! A API estará disponível em: http://localhost:3000
