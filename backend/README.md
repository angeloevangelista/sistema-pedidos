# Sitema de Pedidos - Backend

# Rotas da aplicação

# ⚠️ Desatualizado

A maioria das rotas abaixo estão desatualizadas, em breve serão substituídas pelos novo end points. Obrigado pela compreesão 🥰

<br/>

## **Clients**

### **`POST` - /clients**

**Objetivo**: A rota deve ser capaz de criar um cliente e retorná-lo como reposta.

**Formato**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "telephone": "string"
}
```

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // será removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`GET` - /clients/:client_id**

**Objetivo**: A rota deve ser capaz de resgatar um cliente na base e retornar seus dados.

**Formato**:

| Route Params | Tipo   |
| ------------ | ------ |
| client_id    | string |

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // será removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`GET` - /clients/:client_id/orders**

**NOTA**: Será movido para `/orders` após autenticação

**Objetivo**: A rota deve ser capaz de resgatar um cliente e listar todos os seus pedidos.

**Formato**:

| Route Params | Tipo   |
| ------------ | ------ |
| client_id    | string |

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // será removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "orders": "Array<Order>",
  "created_at": "Date",
  "updated_at": "Date"
}
```

Formato de `Order`:

```json
{
  "id": "string",
  "amount": "number",
  "discount": "number",
  "active": "boolean",
  "canceled_at": "Date",
  "created_at": "Date",
  "updated_at": "Date",
  "client_id": "string",
  "product_id": "string"
}
```

### **`PUT` - /clients/:client_id**

**Objetivo**: A rota deve ser capaz de atualizar um cliente na base e retornar seus dados atualizados.

**Formato**:

```json
{
  "name": "string",
  "email": "string",
  "telephone": "string",

  // apenas se a senha for atualizada
  "old_password": "string",
  "new_password": "string"
}
```

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // será removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`DELETE` - /clients/:client_id**

**Objetivo**: A rota deve ser capaz de desativar um cliente na base.

**Formato**:

| Route Params | Tipo   |
| ------------ | ------ |
| client_id    | string |

**Retorno**:

Sem retorno

<br />

## _Products_

### **`GET` - /products**

**Objetivo**: A rota deve ser capaz de resgatar todos os produtos ativos.

**Formato**:

| QueryParam   | Tipo   | Obrigatório |
| ------------ | ------ | ----------- |
| product_name | string | Não         |

**Retorno**:

```json
[
  {
    "id": "string",
    "name": "string",
    "price": "number",
    "active": "boolean",
    "created_at": "Date",
    "updated_at": "Date"
  }
]
```

### **`GET` - /products/:product_id**

**Objetivo**: A rota deve ser capaz resgatar um produto específico.

**Formato**:

| RouteParam | Tipo   |
| ---------- | ------ |
| product_id | string |

**Retorno**:

```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`POST` - /products/**

**Objetivo**: A rota deve ser capaz de registrar um novo produto e retorná-lo.

**Formato**:

```json
{
  "name": "string",
  "price": "number"
}
```

**Retorno**:

```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`PUT` - /products/:product_id**

**Objetivo**: A rota deve ser capaz de atualizar um produto existente e retorná-lo.

**Formato**:

```json
{
  "name": "string",
  "price": "number"
}
```

**Retorno**:

```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`DELETE` - /products/:product_id**

**Objetivo**: A rota deve ser capaz de desativar um produto na base.

**Formato**:

| RouteParam | Tipo   |
| ---------- | ------ |
| product_id | string |

**Retorno**:

Sem retorno
