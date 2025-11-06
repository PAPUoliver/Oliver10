# 🎮 Cubo de Rubik 3D Interactivo

Un juego de cubo de Rubik completamente interactivo en 3D con múltiples temas y efectos especiales.

## 📁 Estructura de Archivos

```
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos principales del cubo
├── cube-designs.css    # Temas y diseños adicionales
├── script.js           # Funcionalidad principal JavaScript
├── themes.js           # Sistema de temas y modos especiales
└── README.md           # Este archivo
```

## 🎯 Características

### 🎮 Controles Básicos
- **Arrastrar**: Rota el cubo manualmente con el mouse
- **Botones de rotación**: Rota caras específicas (Frente, Derecha, Arriba)
- **Mezclar**: Randomiza todos los colores del cubo
- **Resolver**: Vuelve a los colores originales con animación
- **Pausar**: Detiene/reanuda la rotación automática

### ⌨️ Controles de Teclado
- `F` - Rotar cara frontal
- `R` - Rotar cara derecha
- `U` - Rotar cara superior
- `Espacio` - Mezclar cubo
- `Enter` - Resolver cubo

### 🎨 Temas Disponibles
1. **Clásico** - Colores tradicionales del cubo de Rubik
2. **Neón** - Efectos de luz neón brillante
3. **Cristal** - Apariencia translúcida con blur
4. **Metálico** - Gradientes metálicos realistas
5. **Pastel** - Colores suaves y relajantes
6. **Oscuro** - Tema oscuro elegante

### ✨ Animaciones Especiales
- **Arcoíris** - Rotación continua de colores
- **Pulso** - Efecto de latido suave
- **Brillo** - Resplandor dinámico
- **Sin animación** - Apariencia estática

### 🔮 Modos Especiales
- **Espejo** - Invierte los colores opuestos
- **Caleidoscopio** - Crea patrones simétricos
- **2x2** - Cubo más pequeño de 2x2
- **4x4** - Cubo más grande de 4x4

## 🚀 Cómo Usar

1. **Abrir el juego**: Simplemente abre `index.html` en tu navegador
2. **Interactuar**: Usa el mouse para arrastrar y rotar el cubo
3. **Experimentar**: Prueba diferentes temas y animaciones
4. **Jugar**: Mezcla el cubo y trata de resolverlo

## 🎨 Personalización

### Agregar Nuevos Temas
1. Edita `cube-designs.css`
2. Crea una nueva clase `.mi-tema-theme`
3. Define los colores para cada cara
4. Agrega el tema al objeto `themes` en `themes.js`

### Crear Nuevas Animaciones
1. Define la animación CSS en `cube-designs.css`
2. Agrega la función correspondiente en `themes.js`
3. Incluye el botón en `initThemeControls()`

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura del juego
- **CSS3** - Estilos, animaciones y efectos 3D
- **JavaScript** - Lógica del juego e interactividad
- **CSS Grid** - Layout de las caras del cubo
- **CSS Transforms** - Efectos 3D y rotaciones

## 🎯 Características Técnicas

- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Optimizado**: Animaciones suaves con CSS transforms
- **Modular**: Código separado en archivos específicos
- **Extensible**: Fácil agregar nuevos temas y funciones

## 🎉 Efectos Especiales

- Partículas de estrellas al resolver
- Transiciones suaves entre estados
- Efectos hover en cuadrados individuales
- Rotación automática con pausa manual
- Animación de entrada al cargar

¡Disfruta jugando con tu cubo de Rubik 3D! 🎲✨