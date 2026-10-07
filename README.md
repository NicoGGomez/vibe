# Vibe 🛍️

**Vibe** es una aplicación web de e-commerce desarrollada como proyecto full stack, enfocada en ofrecer una experiencia de compra completa, moderna y responsive.

El proyecto implementa desde la gestión de productos y usuarios hasta el carrito de compras, favoritos y procesamiento de pagos mediante **Mercado Pago**.

🔗 **Demo:** https://vibetandil.netlify.app/
🔗 **Backend:** https://vibe-n9dy.onrender.com/  
🔗 **Repositorio:** https://github.com/NicoGGomez/vibe

---

## ✨ Características

### 🛒 E-commerce

- Visualización de productos.
- Consulta de información detallada.
- Control de stock.
- Productos sin stock visualmente diferenciados.
- Carrito de compras.
- Contador de productos en el carrito.
- Gestión de cantidades.
- Cálculo del total de compra.
- Sistema de favoritos.
- Historial de compras.

### 👤 Usuarios

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Roles de usuario.
- Protección de rutas.
- Perfil de usuario.
- Acceso a compras y favoritos.

### 📦 Gestión de productos

Los usuarios administradores pueden:

- Crear productos.
- Editar productos.
- Eliminar productos.
- Gestionar categorías.
- Controlar stock.
- Visualizar el estado de disponibilidad.

### 💳 Pagos

El proyecto integra **Mercado Pago** para permitir realizar pagos de forma online.

Se implementaron:

- Creación de preferencias de pago.
- Checkout mediante Mercado Pago.
- Generación de pagos mediante QR.
- Procesamiento de pagos aprobados.
- Webhooks para recibir actualizaciones del estado del pago.
- Registro de pedidos.
- Asociación entre pedidos, usuarios y productos.
- Actualización del stock después de una compra.

### 📱 Responsive Design

La interfaz está adaptada para distintos tamaños de pantalla, incluyendo:

- Desktop
- Tablet
- Mobile

---

# 🏗️ Arquitectura

El backend utiliza una arquitectura basada en capas, separando responsabilidades entre:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
Database
```

### Routes

Definen los endpoints disponibles de la API y delegan la lógica al controlador correspondiente.

### Controllers

Se encargan de recibir las solicitudes HTTP, validar los datos básicos y devolver las respuestas correspondientes.

### Services

Contienen la lógica de negocio de la aplicación.

Por ejemplo:

- Creación de pedidos.
- Procesamiento de pagos.
- Gestión del stock.
- Operaciones relacionadas con usuarios y productos.

### Models

Representan las entidades y contienen las operaciones necesarias para interactuar con la base de datos.

Esta separación permite mantener el código organizado y facilita su mantenimiento y escalabilidad.

---

# 🧰 Tecnologías

## Frontend

- HTML5
- CSS3
- JavaScript
- Web Components
- Fetch API
- Responsive Design

## Backend

- Node.js
- Express.js
- JavaScript
- JWT
- CORS
- dotenv

## Base de datos

- PostgreSQL
- Supabase

## Pagos

- Mercado Pago API
- Webhooks

## Deploy

- Netlify — Frontend
- Render — Backend
- Supabase — Database

## Herramientas

- Git
- GitHub
- Postman
- VS Code

---

# 🗄️ Modelo de datos

La aplicación utiliza PostgreSQL para almacenar la información principal del sistema.

Entre las entidades principales se encuentran:

```text
Usuario
   │
   ├── Favoritos
   │
   └── Pedido
          │
          └── Pedido_Producto
                    │
                    └── Producto
                           │
                           └── Categoría
```

La relación entre pedidos y productos se maneja mediante una tabla intermedia, permitiendo almacenar múltiples productos dentro de una misma compra.

---

# 🔐 Autenticación

La autenticación utiliza **JSON Web Tokens (JWT)**.

El flujo principal es:

```text
Login
  ↓
Backend valida credenciales
  ↓
Generación del JWT
  ↓
Frontend almacena el token
  ↓
Requests protegidas incluyen el token
  ↓
Middleware verifica el JWT
  ↓
Acceso al recurso
```

Las rutas que requieren autenticación están protegidas mediante middleware.

---

# 💰 Flujo de compra

El proceso de compra funciona de la siguiente manera:

```text
Usuario
   ↓
Agrega productos al carrito
   ↓
Selecciona método de entrega
   ↓
Genera el pago
   ↓
Mercado Pago
   ↓
Pago aprobado
   ↓
Webhook
   ↓
Backend procesa el pago
   ↓
Se crea el pedido
   ↓
Se registran los productos
   ↓
Se actualiza el stock
```

Esto permite que la creación definitiva del pedido se realice a partir de la confirmación del pago.

---

# 📡 API

Algunos de los principales recursos disponibles son:

```text
/usuarios
/categorias
/productos
/pedidos
```

Ejemplo:

```http
GET /productos
```

Obtiene los productos disponibles.

```http
POST /productos
```

Permite crear un nuevo producto.

```http
DELETE /categorias/:id
```

Permite eliminar una categoría.

Las rutas protegidas requieren autenticación mediante JWT.

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/NicoGGomez/vibe.git

cd vibe
```

## 2. Instalar dependencias del backend

```bash
cd backend

npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env`:

```env
PORT=3000

DATABASE_URL=tu_database_url

JWT_SECRET=tu_jwt_secret

MERCADOPAGO_ACCESS_TOKEN=tu_access_token
```

Las variables pueden variar según la configuración del entorno.

## 4. Ejecutar el backend

```bash
npm start
```

---

# 🖥️ Frontend

El frontend utiliza JavaScript modular y **Web Components** para construir componentes reutilizables.

Ejemplos:

```text
Card
Producto
Footer
```

Los componentes permiten mantener una estructura más modular y evitar repetir código entre las diferentes páginas.

---

# 🎯 Objetivos del proyecto

Vibe fue desarrollado con el objetivo de poner en práctica conceptos de desarrollo web full stack, incluyendo:

- Arquitectura backend.
- Diseño de APIs REST.
- Autenticación y autorización.
- Bases de datos relacionales.
- Integración con APIs externas.
- Procesamiento de pagos.
- Webhooks.
- Gestión de stock.
- Desarrollo responsive.
- Componentización del frontend.
- Deploy de aplicaciones.
- Control de versiones con Git.

---

# 📚 Lo que aprendí

Durante el desarrollo del proyecto trabajé especialmente en:

**Backend**

- Diseño de APIs REST.
- Separación entre controllers, services y models.
- Middleware de autenticación.
- Manejo de errores.
- Transacciones en PostgreSQL.
- Integración con servicios externos.

**Frontend**

- JavaScript modular.
- Web Components.
- Manejo del estado del carrito.
- Comunicación con APIs mediante `fetch`.
- Diseño responsive.

**Integraciones**

- Mercado Pago.
- Webhooks.
- Supabase.
- Deploy con Render y Netlify.

---

# 🔮 Próximas mejoras

Algunas funcionalidades que podrían incorporarse en futuras versiones:

- [ ] Panel de administración más completo.
- [ ] Filtros y búsqueda avanzada de productos.
- [ ] Sistema de cupones.
- [ ] Mejoras en el sistema de notificaciones.
- [ ] Paginación de productos.
- [ ] Dashboard con estadísticas de ventas.
- [ ] Tests automatizados.
- [ ] Mejoras de seguridad.
- [ ] Migración progresiva del frontend a React.

---

# 👨‍💻 Autor

**Nico**

Estudiante de **TUDAI — UNICEN** y desarrollador interesado en desarrollo **Full Stack**.

💻 Portfolio: https://portafolio-nico.vercel.app/

🐙 GitHub: https://github.com/NicoGGomez

---

## ⭐ Sobre el proyecto

Vibe fue construido como un proyecto personal para llevar los conocimientos de desarrollo web más allá de ejercicios aislados y trabajar sobre una aplicación con funcionalidades y problemas similares a los de un producto real.

El foco principal estuvo en construir una aplicación completa, conectando **frontend, backend, base de datos, autenticación y servicios externos** dentro de un mismo sistema.
