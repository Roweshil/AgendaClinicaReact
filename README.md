# AgendaClinicaAPI

Frontend de **Agenda Clínica** — producto de [RoweWorks](https://agenda.roweshil.com).
Portal para la gestión de citas médicas con autenticación por roles, construida sobre React / Vite y desplegada en Vercel.

---

## Stack

| Capa | Tecnología |
|---|---|
| Biblioteca principal | React |
| Bundler | Vite |
| Estado / Rutas | React Router |
| Entorno de Desarrollo | Node.js |
| Deploy | Vercel |

---

## Features

- Autenticación y autorización: Rutas protegidas por rol
- Gestion de estado global
- CRUD completo de citas con validación de datos
- Actualización automática de estatus via cron jobs
- Rate limiting en endpoints críticos
- Protección contra XSS, CSRF y SQL injection
- Arquitectura limpia — controladores, modelos y rutas separados
- Manejo de errores profesional centralizado
---

## Roles

| Rol | Descripción |
|---|---|
| `admin` | Gestión global del sistema |
| `medico` | Gestión de su propia agenda y citas |

> Rol `paciente` planeado para versiones futuras — permitirá autoagendado.

---

## Estructura del proyecto

```
AgendaClinicaReact/

  La arquitectura del proyecto sigue una estructura modular orientada a la separación de responsabilidades:

  assets/            # Imagenes de la pagina
  context/           # Proveedores de estado global para la sesión del usuario y configuraciones compartidas.
  fonts/             # Fuentes usadas en el proyecto
  hooks/             # Hooks personalizados que encapsulan la lógica de negocio y llamadas a la API.
  pages/             # Componentes de vista principal protegidos mediante guardas de seguridad por rol.
  routes/            # Configuración del enrutamiento dinámico y lógica de redirección post-login.
  utils/             # helper para formateo de horarios, manejo de errores
  main.jsx           # entrada principal
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
# Servidor (Conexion a API)
 VITE_API_URL=

```

---

## Instalación local

```bash
# clonar el repositorio
git clone https://github.com/roweshil/AgendaClinicaReact.git
cd AgendaClinicaReact

# instalar dependencias
npm install

# configurar variables de entorno
cp .env.example .env
# edita .env con tus valores

# iniciar en desarrollo
npm run dev
```

---

## Deploy

El proyecto está desplegado en **Vercel**.

Configuración requerida en Vercel:
- Agregar todas las variables de entorno del `.env`

---

## Seguridad

  Aunque la seguridad principal reside en el Backend, este Frontend implementa las siguientes capas de protección para garantizar la integridad de los datos del usuario:

  - Control de acceso del lado del cliente
  - Aprovechamiento del mecanismo de escape automático de React para prevenir la inyección de scripts maliciosos a través de inputs de texto.
  - Garantía de que ninguna credencial privada, llaves maestras o contraseñas de bases de datos están expuestas en el código cliente, delegando toda lógica crítica al backend.
  - El almacenamiento del JWT se delega completamente al navegador mediante cookies con las directivas `HttpOnly`, `Secure` y `SameSite`. Esto inmuniza a la aplicación frente a ataques de robo de tokens por inyección de código (XSS), las credenciales no son accesibles mediante JavaScript.
  - Configuración centralizada de peticiones HTTP para incluir automáticamente las cookies de sesión en cada comunicación con la API.
  - Protocolo de manejo de errores y resilencia (Error Handling)
  - Destrucción y limpieza absoluta del estado global (`React Context`) tras el cierre de sesión para evitar fugas de información en equipos compartidos

---

## Roadmap

El proyecto está en **desarrollo activo**. Este es el estado de las funcionalidades planificadas:

- [ ] Bloqueo de cuenta por intentos fallidos en base de datos
- [ ] AdminPanel
- [ ] Notificaciones automáticas via WhatsApp/email
- [ ] Rol paciente con autoagendado
- [ ] Testing con Vitest
- [ ] Integración con Google Calendar API
---

## Producto

**Agenda Clínica** es parte del ecosistema **RoweWorks** — productos de software construidos y operados de forma independiente.
