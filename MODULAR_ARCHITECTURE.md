# Aplicación de Películas - Estructura Modular

## 📋 Descripción
Esta aplicación de películas ha sido refactorizada con una arquitectura modular que separa las responsabilidades y mejora la mantenibilidad del código.

## 🏗️ Arquitectura Modular

### 📁 Estructura de Archivos

```
Js/
├── modules/
│   ├── config.js              # Configuración global
│   ├── apiService.js          # Servicio de API
│   ├── movieTemplate.js       # Plantillas HTML
│   ├── domManager.js          # Gestión del DOM
│   ├── eventManager.js        # Gestión de eventos
│   └── infiniteScrollManager.js # Scroll infinito
├── moviesApp.js               # Aplicación principal
├── movie-view.js              # Vista específica para page-movie.html
├── dark-mode.js               # Modo oscuro (existente)
├── responsive.js              # Menú responsive (existente)
└── Conection-API.js           # ARCHIVO ORIGINAL (puede eliminarse)
```

## 🧩 Módulos y Responsabilidades

### 1. **config.js** - Configuración Central
- Configuración de la API de TMDB
- Selectores CSS
- Constantes de la aplicación
- Configuración del Intersection Observer

### 2. **apiService.js** - Servicio de API
- Comunicación con la API de TMDB
- Obtención de películas populares
- Obtención de detalles de películas
- Búsqueda por género
- Manejo de errores de API

### 3. **movieTemplate.js** - Plantillas HTML
- Generación de HTML para tarjetas de película
- Plantillas para filtros
- Estados de carga y error
- Reutilización de componentes

### 4. **domManager.js** - Gestión del DOM
- Renderizado de películas
- Manipulación del DOM
- Gestión de vistas (grid/detalle)
- Limpieza del contenedor

### 5. **eventManager.js** - Gestión de Eventos
- Delegación de eventos
- Eventos personalizados
- Manejo de interacciones de usuario
- Comunicación entre módulos

### 6. **infiniteScrollManager.js** - Scroll Infinito
- Intersection Observer
- Carga automática de páginas
- Control de estado de carga
- Gestión de límites

### 7. **moviesApp.js** - Aplicación Principal
- Orquestación de todos los módulos
- Inicialización de la aplicación
- Coordinación de flujos
- Manejo global de errores

## 🔄 Flujo de la Aplicación

1. **Inicialización**: `moviesApp.js` coordina la inicialización
2. **Configuración**: Se cargan las configuraciones desde `config.js`
3. **API**: `apiService.js` obtiene datos de TMDB
4. **Renderizado**: `domManager.js` y `movieTemplate.js` muestran las películas
5. **Interacción**: `eventManager.js` maneja clicks y eventos
6. **Scroll**: `infiniteScrollManager.js` carga más contenido automáticamente

## ✨ Mejoras Implementadas

### **Separación de Responsabilidades**
- Cada módulo tiene una función específica
- Código más fácil de mantener y testear
- Reutilización de componentes

### **Gestión de Estado Mejorada**
- Estado centralizado en la aplicación principal
- Comunicación entre módulos mediante eventos personalizados
- Control de flujo más predecible

### **Manejo de Errores**
- Captura de errores en cada capa
- Mensajes de error específicos
- Recuperación automática cuando es posible

### **Performance Optimizada**
- Delegación de eventos para mejor rendimiento
- Scroll infinito optimizado
- Carga lazy de imágenes (implementable)

### **Escalabilidad**
- Fácil añadir nuevas funcionalidades
- Módulos independientes
- Configuración centralizada

## 🚀 Uso

### Para el index.html (página principal):
```html
<script type="module" src="Js/moviesApp.js"></script>
```

### Para page-movie.html (página específica):
```html
<script type="module" src="../Js/movie-view.js"></script>
```

## 🔧 Configuración

Todas las configuraciones están centralizadas en `modules/config.js`:

```javascript
export const CONFIG = {
  API: {
    KEY: 'tu-api-key-aqui',
    BASE_URL: 'https://api.themoviedb.org/3',
    // ...más configuraciones
  }
  // ...otros ajustes
};
```

## 📱 Funcionalidades

- ✅ Carga de películas populares
- ✅ Scroll infinito
- ✅ Filtrado por género
- ✅ Vista detallada de películas
- ✅ Modo oscuro (módulo existente)
- ✅ Menú responsive (módulo existente)
- ✅ Manejo de errores
- ✅ Estados de carga

## 🛠️ Desarrollo Futuro

La nueva arquitectura permite fácilmente:
- Añadir búsqueda de películas
- Implementar favoritos
- Añadir más filtros
- Integrar with localStorage
- Añadir testing unitario
- Implementar lazy loading de imágenes

## 🔍 Debugging

La aplicación está disponible globalmente como `window.moviesApp` para facilitar el debugging en la consola del navegador.
