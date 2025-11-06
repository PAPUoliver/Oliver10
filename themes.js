// Sistema de temas para el cubo de Rubik

const themes = {
    classic: 'Clásico',
    neon: 'Neón',
    crystal: 'Cristal', 
    metallic: 'Metálico',
    pastel: 'Pastel',
    dark: 'Oscuro'
};

let currentTheme = 'classic';

// Cambiar tema del cubo
function changeTheme(themeName) {
    const cube = document.getElementById('cube');
    const body = document.body;
    
    // Remover tema anterior
    Object.keys(themes).forEach(theme => {
        cube.classList.remove(`${theme}-theme`);
        body.classList.remove(`${theme}-theme`);
    });
    
    // Aplicar nuevo tema
    if (themeName !== 'classic') {
        cube.classList.add(`${themeName}-theme`);
        body.classList.add(`${themeName}-theme`);
    }
    
    currentTheme = themeName;
    
    // Actualizar botón activo
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="changeTheme('${themeName}')"]`).classList.add('active');
}

// Aplicar animación especial
function applyAnimation(animationType) {
    const squares = document.querySelectorAll('.square');
    
    // Remover animaciones anteriores
    squares.forEach(square => {
        square.classList.remove('rainbow-animation', 'pulse-animation', 'glow-animation');
    });
    
    // Aplicar nueva animación
    if (animationType !== 'none') {
        squares.forEach(square => {
            square.classList.add(`${animationType}-animation`);
        });
    }
}

// Crear cubo de tamaño personalizado
function createCustomCube(size) {
    const cube = document.getElementById('cube');
    const faces = cube.querySelectorAll('.face');
    
    faces.forEach(face => {
        // Limpiar cara
        face.innerHTML = '';
        
        // Crear nueva grilla
        face.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        face.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        
        // Crear cuadrados
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            
            // Asignar color según la cara
            if (face.classList.contains('front')) square.classList.add('white');
            else if (face.classList.contains('back')) square.classList.add('yellow');
            else if (face.classList.contains('right')) square.classList.add('red');
            else if (face.classList.contains('left')) square.classList.add('orange');
            else if (face.classList.contains('top')) square.classList.add('blue');
            else if (face.classList.contains('bottom')) square.classList.add('green');
            
            face.appendChild(square);
        }
    });
}

// Modo espejo (colores invertidos)
function mirrorMode() {
    const colorMap = {
        'white': 'yellow',
        'yellow': 'white',
        'red': 'orange',
        'orange': 'red',
        'blue': 'green',
        'green': 'blue'
    };
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const currentColor = Array.from(square.classList).find(cls => 
            ['white', 'red', 'blue', 'orange', 'green', 'yellow'].includes(cls)
        );
        
        if (currentColor && colorMap[currentColor]) {
            square.classList.remove(currentColor);
            square.classList.add(colorMap[currentColor]);
        }
    });
}

// Modo caleidoscopio
function kaleidoscopeMode() {
    const faces = document.querySelectorAll('.face');
    const colors = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];
    
    faces.forEach(face => {
        const squares = face.querySelectorAll('.square');
        const pattern = [];
        
        // Crear patrón simétrico
        squares.forEach((square, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            let colorIndex;
            if (row === 1 && col === 1) {
                // Centro
                colorIndex = 0;
            } else if (row === 0 || row === 2) {
                // Filas superior e inferior
                colorIndex = col + 1;
            } else {
                // Fila media
                colorIndex = col === 0 ? 4 : 5;
            }
            
            square.className = 'square ' + colors[colorIndex % colors.length];
        });
    });
}

// Inicializar controles de tema
function initThemeControls() {
    const controlsDiv = document.querySelector('.controls');
    
    // Agregar selector de temas
    const themeSection = document.createElement('div');
    themeSection.innerHTML = `
        <h4>🎨 Temas</h4>
        <div class="theme-buttons">
            ${Object.entries(themes).map(([key, name]) => 
                `<button class="btn theme-btn ${key === 'classic' ? 'active' : ''}" onclick="changeTheme('${key}')">${name}</button>`
            ).join('')}
        </div>
    `;
    
    // Agregar controles de animación
    const animationSection = document.createElement('div');
    animationSection.innerHTML = `
        <h4>✨ Animaciones</h4>
        <button class="btn" onclick="applyAnimation('rainbow')">🌈 Arcoíris</button>
        <button class="btn" onclick="applyAnimation('pulse')">💓 Pulso</button>
        <button class="btn" onclick="applyAnimation('glow')">✨ Brillo</button>
        <button class="btn" onclick="applyAnimation('none')">❌ Sin animación</button>
    `;
    
    // Agregar modos especiales
    const modesSection = document.createElement('div');
    modesSection.innerHTML = `
        <h4>🔮 Modos Especiales</h4>
        <button class="btn" onclick="mirrorMode()">🪞 Espejo</button>
        <button class="btn" onclick="kaleidoscopeMode()">🔄 Caleidoscopio</button>
        <button class="btn" onclick="createCustomCube(2)">2x2</button>
        <button class="btn" onclick="createCustomCube(4)">4x4</button>
    `;
    
    controlsDiv.appendChild(themeSection);
    controlsDiv.appendChild(animationSection);
    controlsDiv.appendChild(modesSection);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', initThemeControls);