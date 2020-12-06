# Sitema de Pedidos - Backend

# Rotas da aplicação

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
