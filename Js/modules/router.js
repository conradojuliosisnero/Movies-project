// ===============================
// Router para manejo de rutas dinámicas
// ===============================

import { CONFIG } from "./config.js";

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.init();
  }

  /**
   * Inicializa el router
   */
  init() {
    // Escuchar cambios en la URL
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    // Escuchar cambios en el hash (para archivos locales)
    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });

    // NO manejar la ruta inicial aquí - se hará después de configurar rutas
  }

  /**
   * Inicia el manejo de rutas (llamar después de añadir todas las rutas)
   */
  start() {
    this.handleRoute();
  }

  /**
   * Registra una nueva ruta
   * @param {string} path - Patrón de la ruta (ej: '/movie/:id')
   * @param {Function} handler - Función que maneja la ruta
   */
  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  /**
   * Navega a una nueva ruta
   * @param {string} path - Ruta de destino
   * @param {boolean} replace - Si reemplaza la entrada del historial
   */
  navigate(path, replace = false) {
    // Para archivos locales, usar hash
    if (window.location.protocol === "file:") {
      if (path.startsWith("/movie/")) {
        window.location.hash = `#${path.substring(1)}`;
      } else {
        window.location.hash = "";
      }
    } else {
      // Para servidores HTTP, usar historial normal
      if (replace) {
        history.replaceState({}, "", path);
      } else {
        history.pushState({}, "", path);
      }
    }

    this.handleRoute();
  }

  /**
   * Maneja el enrutamiento actual
   */
  handleRoute() {
    const path = window.location.pathname;

    // Para archivos locales (file://), revisar hash o parámetros
    if (window.location.protocol === "file:") {
      // Revisar si hay hash para película
      const hash = window.location.hash;
      if (hash && hash.includes("#movie/")) {
        const movieId = hash.replace("#movie/", "");
        const movieRoute = this.routes.get("/movie/:id");
        if (movieRoute) {
          this.currentRoute = `/movie/${movieId}`;
          movieRoute({ id: movieId });
          return;
        }
      }

      // Por defecto cargar home
      const homeRoute = this.routes.get("/");
      if (homeRoute) {
        this.currentRoute = "/";
        homeRoute();
      }
      return;
    }

    // Para servidores HTTP normales
    let normalizedPath = path;
    if (path.includes(".html")) {
      normalizedPath = "/";
    }

    const route = this.matchRoute(normalizedPath);
    //.log('Router: Matched route:', route);

    if (route) {
      this.currentRoute = route.path;
      route.handler(route.params);
    } else {
      //.log('Router: No route found, redirecting to home');
      // Ruta no encontrada, ir al home
      if (normalizedPath !== "/") {
        this.navigate("/", true);
      }
    }
  }

  /**
   * Busca una ruta que coincida con el path actual
   * @param {string} path - Path actual
   * @returns {Object|null} - Objeto con la ruta y parámetros
   */
  matchRoute(path) {
    for (const [routePath, handler] of this.routes) {
      const match = this.matchPath(routePath, path);
      if (match) {
        return {
          path: routePath,
          handler,
          params: match,
        };
      }
    }
    return null;
  }

  /**
   * Verifica si un path coincide con un patrón de ruta
   * @param {string} routePath - Patrón de ruta
   * @param {string} actualPath - Path actual
   * @returns {Object|null} - Parámetros extraídos o null
   */
  matchPath(routePath, actualPath) {
    // Convertir patrón de ruta a regex
    const routeRegex = routePath.replace(/:([^/]+)/g, "([^/]+)");
    const regex = new RegExp(`^${routeRegex}$`);

    const match = actualPath.match(regex);
    if (!match) return null;

    // Extraer nombres de parámetros
    const paramNames = [...routePath.matchAll(/:([^/]+)/g)].map((m) => m[1]);
    const params = {};

    paramNames.forEach((name, index) => {
      params[name] = match[index + 1];
    });

    return params;
  }

  /**
   * Obtiene el parámetro de la URL actual
   * @param {string} paramName - Nombre del parámetro
   * @returns {string|null} - Valor del parámetro
   */
  getParam(paramName) {
    const path = window.location.pathname;
    const route = this.matchRoute(path);
    return route ? route.params[paramName] : null;
  }

  /**
   * Obtiene la ruta actual
   * @returns {string} - Ruta actual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Verifica si estamos en una ruta específica
   * @param {string} routePath - Patrón de ruta a verificar
   * @returns {boolean}
   */
  isCurrentRoute(routePath) {
    return this.currentRoute === routePath;
  }
}
