# Sitema de Pedidos - Backend

# Rotas da aplicação

**🔒 Rotas autenticadas.**

<br/>

## **Sessions**

### **`POST` - /sessions**

**Objetivo**: A rota deve ser capaz de autenticar um cliente e retornar um token JWT.

**Formato**:

```json
{
  "email": "string",
  "password": "string"
}
```

**Retorno**:

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "password": "string", // sera_removido
    "telephone": "string",
    "active": "boolean",
    "created_at": "string",
    "updated_at": "string"
  },
  "token": "JWT_TOKEN"
}
```

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
  "password": "string", // sera_removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`GET` - /clients**

**Objetivo**: A rota deve ser capaz de resgatar um cliente na base e retornar seus dados.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // sera_removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`PUT` - /clients**

**Objetivo**: A rota deve ser capaz de atualizar um cliente na base e retornar seus dados atualizados.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

```json
{
  "name": "string",
  "email": "string",
  "telephone": "string",

  "old_password": "string",
  "new_password": "string"
}
```

`old_password` e `new_password` só

**Retorno**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string", // sera_removido
  "telephone": "string",
  "id": "string",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`DELETE` - /clients**

**Objetivo**: A rota deve ser capaz de desativar um cliente na base.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

**Retorno**:

Sem retorno

<br />

## **Products**

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
    "client_id": "string",
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
  "client_id": "string",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`POST` - /products**

**Objetivo**: A rota deve ser capaz de registrar um novo produto e retorná-lo.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

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
  "client_id": "string",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`PUT` - /products/:product_id**

**Objetivo**: A rota deve ser capaz de atualizar um produto existente e retorná-lo.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

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
  "cliente_id": "string",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### **`DELETE` - /products/:product_id**

**Objetivo**: A rota deve ser capaz de desativar um produto na base.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

| RouteParam | Tipo   |
| ---------- | ------ |
| product_id | string |

**Retorno**:

Sem retorno

<br />

## **Orders**

### **`POST` - /orders**

**Objetivo**: A rota deve ser capaz de cadastrar um pedido.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

```json
{
  "amount": "number",
  "discount": "number",
  "client_id": "string",
  "product_id": "string"
}
```

**Retorno**:

```json
{
  "id": "string",
  "client_id": "string",
  "product_id": "string",
  "amount": "number",
  "discount": "number",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date",
  "canceled_at": "Date | null"
}
```

### **`GET` - /orders/:order_id**

**Objetivo**: A rota deve ser capaz de resgatar um pedido específico da base.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

| Route Param | Tipo   |
| ----------- | ------ |
| order_id    | string |

**Retorno**:

```json
{
  "id": "string",
  "client_id": "string",
  "product_id": "string",
  "amount": "number",
  "discount": "number",
  "active": "boolean",
  "created_at": "Date",
  "updated_at": "Date",
  "canceled_at": "Date | null"
}
```

### **`GET` - /orders**

**Objetivo**: A rota deve ser capaz de resgatar todos os pedidos de um cliente da base.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

**Retorno**:

```json
[
  {
    "id": "string",
    "client_id": "string",
    "product_id": "string",
    "amount": "number",
    "discount": "number",
    "active": "boolean",
    "created_at": "Date",
    "updated_at": "Date",
    "canceled_at": "Date | null"
  }
]
```

### **`DELETE` - /orders/:order_id**

**Objetivo**: A rota deve ser capaz de cancelar um pedido.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

| Route Param | Tipo   |
| ----------- | ------ |
| order_id    | string |

**Retorno**:

Sem retorno

<br />

## **Stock**

### **`GET` - /stock**

**Objetivo**: A rota deve ser capaz de retornar todos os produtos cadastrados por um cliente.

**Formato**:

| Header        | Tipo      |
| ------------- | --------- |
| Authorization | JWT Token |

**Retorno**:

```json
[
  {
    "id": "string",
    "name": "string",
    "price": "number",
    "active": "boolean",
    "cliente_id": "string",
    "created_at": "Date",
    "updated_at": "Date"
  }
]
```
