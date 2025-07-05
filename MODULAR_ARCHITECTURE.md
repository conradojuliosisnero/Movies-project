# Aplicación de Películas - Estructura Modular con Routing Dinámico

## 📋 Descripción
Esta aplicación de películas ha sido refactorizada con una arquitectura modular que separa las responsabilidades, incluye routing dinámico para detalles de películas, y mejora la mantenibilidad del código.

## 🏗️ Arquitectura Modular

### 📁 Estructura de Archivos

```
Js/
├── modules/
│   ├── config.js              # Configuración global
│   ├── apiService.js          # Servicio de API con detalles completos
│   ├── movieTemplate.js       # Plantillas HTML (grid + detalles)
│   ├── domManager.js          # Gestión del DOM
│   ├── eventManager.js        # Gestión de eventos + routing
│   ├── infiniteScrollManager.js # Scroll infinito
│   ├── router.js              # Sistema de routing dinámico
│   └── favoritesExample.js    # Ejemplo de extensión
├── moviesApp.js               # Aplicación principal con routing
├── movie-view.js              # Vista específica para page-movie.html
├── dark-mode.js               # Modo oscuro (existente)
├── responsive.js              # Menú responsive (existente)
└── Conection-API.js           # ARCHIVO ORIGINAL (puede eliminarse)

css/
├── style.css                  # Estilos principales
├── movie-details.css          # Estilos para detalles de películas
├── toogle-dark.css            # Modo oscuro
└── ...otros estilos
```

## 🧩 Módulos y Responsabilidades

### 1. **config.js** - Configuración Central
- Configuración de la API de TMDB
- Selectores CSS y rutas
- Constantes de la aplicación
- Configuración del Intersection Observer

### 2. **apiService.js** - Servicio de API Expandido
- Comunicación con la API de TMDB
- **NUEVO**: Detalles completos de películas con `append_to_response=credits,videos,similar`
- Obtención de películas populares
- Búsqueda por género
- **NUEVO**: Utilidades de formato (fechas, duración, director, cast)
- Manejo de errores de API

### 3. **movieTemplate.js** - Plantillas HTML Expandidas
- Generación de HTML para tarjetas de película
- **NUEVO**: Página completa de detalles con backdrop hero
- **NUEVO**: Secciones de cast, producción y películas similares
- Plantillas para filtros
- Estados de carga y error mejorados

### 4. **router.js** - Sistema de Routing Dinámico ⭐ NUEVO
- Routing basado en History API
- Rutas dinámicas con parámetros (ej: `/movie/:id`)
- Navegación programática
- Manejo de rutas no encontradas
- Extracción de parámetros de URL

### 5. **eventManager.js** - Gestión de Eventos con Routing
- Delegación de eventos
- **NUEVO**: Integración con router para navegación
- **NUEVO**: Manejo de enlaces de películas similares
- Eventos personalizados
- Interceptación de enlaces internos

### 6. **domManager.js** - Gestión del DOM
- Renderizado de películas (grid)
- Manipulación del DOM
- Gestión de vistas (grid/detalle)
- Limpieza del contenedor

### 7. **infiniteScrollManager.js** - Scroll Infinito
- Intersection Observer optimizado
- Control de páginas y estado
- **MEJORADO**: Solo activo en ruta principal

### 8. **moviesApp.js** - Aplicación Principal con Routing
- **NUEVO**: Configuración de rutas (`/` y `/movie/:id`)
- Orquestación de todos los módulos
- **NUEVO**: Navegación entre vistas
- Coordinación de flujos
- Manejo global de errores

## 🎯 Funcionalidades del Sistema de Routing

### **Rutas Disponibles:**
- **`/`** - Página principal con grid de películas
- **`/movie/:id`** - Página de detalles de película específica
- **`/index.html`** - Redirige a la página principal

### **Navegación:**
- **Enlaces dinámicos**: Cada película tiene un enlace `/movie/123`
- **Navegación por browser**: Botones atrás/adelante funcionan
- **Botón "Volver"**: Usa `history.back()` para regresar
- **Películas similares**: Enlaces clickeables que navegan a otras películas

### **Carga de Detalles:**
- **URL dinámica**: Extrae ID desde `window.location.pathname`
- **API endpoint**: `https://api.themoviedb.org/3/movie/{movie_id}`
- **Datos completos**: Incluye créditos, videos y películas similares
- **Título dinámico**: El título de la página cambia según la película

## ✨ Página de Detalles de Películas

### **Sección Hero:**
- **Backdrop de fondo** con efecto parallax
- **Poster de la película** con hover effect
- **Información principal**: título, rating, géneros, fecha, duración
- **Sinopsis completa** de la película
- **Director** extraído de los créditos

### **Secciones de Contenido:**

#### **🎭 Reparto Principal**
- Grid responsive con top 5 actores
- Fotos de perfil con fallback
- Nombres y personajes

#### **🏭 Información de Producción**
- Presupuesto y recaudación formateados
- Países de producción
- Compañías productoras

#### **🎬 Películas Similares**
- Grid de 6 películas relacionadas
- Enlaces clickeables para navegar
- Ratings y posters

### **Diseño Responsive:**
- **Desktop**: Layout de 2 columnas (poster + info)
- **Tablet**: Layouts adaptados
- **Mobile**: Layout de 1 columna, centrado

## 🎨 Estilos CSS Modernos

### **Nuevos archivos:**
- **`movie-details.css`** - Estilos completos para página de detalles

### **Características de diseño:**
- **Glassmorphism**: Efectos de blur y transparencia
- **Gradientes dinámicos**: Overlays sobre backdrops
- **Animaciones suaves**: Transforms y transitions
- **Sistema de grid**: CSS Grid responsive
- **Dark mode**: Soporte completo para modo oscuro

## 🔄 Flujo de la Aplicación Actualizado

1. **Inicialización**: `moviesApp.js` configura routing y módulos
2. **Ruta principal** (`/`): Muestra grid de películas con scroll infinito
3. **Click en película**: Navega a `/movie/:id`
4. **Carga de detalles**: `apiService.js` obtiene datos completos
5. **Renderizado**: `movieTemplate.js` genera página completa
6. **Navegación**: Router maneja URLs y botones browser
7. **Películas similares**: Navegación entre detalles

## 🚀 Uso y Configuración

### **Para desarrollo local:**
```bash
# Servir archivos (necesario para routing)
# Usar live-server, XAMPP, o similar
npx live-server --port=3000
```

### **Configuración API:**
```javascript
// En modules/config.js
API: {
  KEY: 'tu-api-key-de-tmdb',
  BASE_URL: 'https://api.themoviedb.org/3',
  // ...más configuraciones
}
```

## 📱 Funcionalidades Implementadas

✅ **Core Features:**
- Carga de películas populares
- **Detalles completos de películas** ⭐ NUEVO
- **Routing dinámico** ⭐ NUEVO
- **Navegación por URL** ⭐ NUEVO
- Scroll infinito (solo en home)
- Filtrado por género
- Modo oscuro
- Menú responsive

✅ **Detalles de Películas:**
- **Página completa dedicada** ⭐ NUEVO
- **Backdrop hero section** ⭐ NUEVO
- **Cast con fotos** ⭐ NUEVO
- **Información de producción** ⭐ NUEVO
- **Películas similares** ⭐ NUEVO
- **Navegación fluida** ⭐ NUEVO

## 🛠️ Desarrollo Futuro

La nueva arquitectura con routing permite fácilmente:
- **Búsqueda global** con ruta `/search/:query`
- **Páginas de actores** con `/person/:id`
- **Favoritos persistentes** con `/favorites`
- **Géneros dedicados** con `/genre/:id`
- **SEO mejorado** con meta tags dinámicos
- **Compartir URLs** específicas de películas

## 🔍 Testing y Debugging

```javascript
// Acceso global para debugging
window.moviesApp // Aplicación principal
window.moviesApp.router // Sistema de routing
window.moviesApp.router.getCurrentRoute() // Ruta actual
window.moviesApp.router.getParam('id') // Obtener parámetro
```

## 🔗 URLs de Ejemplo

- **Home**: `http://localhost:3000/`
- **Película específica**: `http://localhost:3000/movie/550`
- **Compartible**: Cada URL es directamente accesible

La aplicación ahora es una **Single Page Application (SPA)** completa con routing dinámico, manteniendo toda la funcionalidad anterior pero con una experiencia de usuario mucho más moderna y profesional.
