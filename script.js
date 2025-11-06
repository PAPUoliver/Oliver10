// Cubo de Rubik 3D - MECÁNICA REAL

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: -15, y: 25 };
let isRotating = true;
let cube, cubeContainer;

// ESTADO INTERNO DEL CUBO DE RUBIK 3x3
// Cada cara tiene 9 posiciones (0-8) en orden: fila superior, fila media, fila inferior
let cubeState = {
    front:  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'], // Blanco
    back:   ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'], // Amarillo
    right:  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'], // Rojo
    left:   ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], // Naranja
    top:    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'], // Azul
    bottom: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']  // Verde
};

// Mapeo de colores
const colorMap = {
    'W': 'white', 'Y': 'yellow', 'R': 'red', 
    'O': 'orange', 'B': 'blue', 'G': 'green'
};

// Colores originales para resolver
const originalColors = {
    front: 'white', back: 'yellow', right: 'red',
    left: 'orange', top: 'blue', bottom: 'green'
};

// Función para actualizar la rotación del cubo como un cubo REAL
function updateCubeRotation() {
    if (cube) {
        // SIN LIMITACIONES - como un cubo real
        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    }
}

// Variables para detectar clics en caras
let isClickingFace = false;
let clickStartTime = 0;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    cube = document.getElementById('cube');
    cubeContainer = document.getElementById('cubeContainer');

    if (!cube || !cubeContainer) return;

    // Agregar eventos de clic a cada cara del cubo
    const faces = document.querySelectorAll('.face');
    faces.forEach(face => {
        face.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isDragging) {
                const faceClass = Array.from(face.classList).find(cls => 
                    ['front', 'back', 'right', 'left', 'top', 'bottom'].includes(cls)
                );
                if (faceClass) {
                    // Clic izquierdo = horario, Shift+clic = antihorario
                    const clockwise = !e.shiftKey;
                    rotateFace(faceClass, clockwise);
                }
            }
        });

        // Clic derecho para rotación antihoraria
        face.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) {
                const faceClass = Array.from(face.classList).find(cls => 
                    ['front', 'back', 'right', 'left', 'top', 'bottom'].includes(cls)
                );
                if (faceClass) {
                    rotateFace(faceClass, false); // Antihorario
                }
            }
        });

        // Efecto hover para mostrar que es clickeable
        face.addEventListener('mouseenter', () => {
            if (!isDragging) {
                face.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.8)';
                face.style.cursor = 'pointer';
            }
        });

        face.addEventListener('mouseleave', () => {
            face.style.boxShadow = '';
            face.style.cursor = 'grab';
        });
    });

    // Control de rotación manual con mouse (solo en el cubo, no en las caras)
    cube.addEventListener('mousedown', (e) => {
        // Solo rotar si no se hace clic en una cara específica
        if (!e.target.classList.contains('square') && !e.target.classList.contains('face')) {
            e.preventDefault();
            isDragging = true;
            clickStartTime = Date.now();
            previousMousePosition = { x: e.clientX, y: e.clientY };
            cubeContainer.classList.add('paused');
            cube.style.transition = 'none';
        }
    });

    // Eventos de mouse globales - ROTACIÓN DEL CUBO
    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !cube) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        // Solo rotar si se ha movido lo suficiente (para distinguir de clics)
        const distance = Math.sqrt(deltaMove.x * deltaMove.x + deltaMove.y * deltaMove.y);
        if (distance > 3) {
            // Rotación libre como un cubo real
            rotation.x += deltaMove.y * 0.5;
            rotation.y += deltaMove.x * 0.5;

            cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            const clickDuration = Date.now() - clickStartTime;
            isDragging = false;
            
            if (cube) {
                cube.style.transition = 'transform 0.3s ease';
            }
            if (isRotating && cubeContainer) {
                cubeContainer.classList.remove('paused');
            }
        }
    });

    // Animación de entrada mejorada
    cube.style.opacity = '0';
    cube.style.transform = 'scale(0.8)';
    cube.style.transition = 'all 1s ease';

    setTimeout(() => {
        cube.style.opacity = '1';
        updateCubeRotation();
        // Inicializar la visualización del cubo
        updateCubeDisplay();
    }, 100);
});



// ROTACIONES REALES DEL CUBO DE RUBIK

// Rotar una cara 90° en sentido horario
function rotateFaceClockwise(faceArray) {
    return [
        faceArray[6], faceArray[3], faceArray[0],
        faceArray[7], faceArray[4], faceArray[1],
        faceArray[8], faceArray[5], faceArray[2]
    ];
}

// Rotar una cara 90° en sentido antihorario
function rotateFaceCounterClockwise(faceArray) {
    return [
        faceArray[2], faceArray[5], faceArray[8],
        faceArray[1], faceArray[4], faceArray[7],
        faceArray[0], faceArray[3], faceArray[6]
    ];
}

// ALGORITMOS DE ROTACIÓN PARA CADA CARA
function rotateFront(clockwise = true) {
    const temp = [...cubeState.front];
    
    if (clockwise) {
        // Rotar cara frontal
        cubeState.front = rotateFaceClockwise(cubeState.front);
        
        // Rotar piezas adyacentes
        const tempTop = [cubeState.top[6], cubeState.top[7], cubeState.top[8]];
        cubeState.top[6] = cubeState.left[8];
        cubeState.top[7] = cubeState.left[5];
        cubeState.top[8] = cubeState.left[2];
        
        cubeState.left[2] = cubeState.bottom[0];
        cubeState.left[5] = cubeState.bottom[1];
        cubeState.left[8] = cubeState.bottom[2];
        
        cubeState.bottom[0] = cubeState.right[6];
        cubeState.bottom[1] = cubeState.right[3];
        cubeState.bottom[2] = cubeState.right[0];
        
        cubeState.right[0] = tempTop[0];
        cubeState.right[3] = tempTop[1];
        cubeState.right[6] = tempTop[2];
    } else {
        // Rotación antihoraria (F')
        cubeState.front = rotateFaceCounterClockwise(cubeState.front);
        
        const tempTop = [cubeState.top[6], cubeState.top[7], cubeState.top[8]];
        cubeState.top[6] = cubeState.right[0];
        cubeState.top[7] = cubeState.right[3];
        cubeState.top[8] = cubeState.right[6];
        
        cubeState.right[0] = cubeState.bottom[2];
        cubeState.right[3] = cubeState.bottom[1];
        cubeState.right[6] = cubeState.bottom[0];
        
        cubeState.bottom[0] = cubeState.left[2];
        cubeState.bottom[1] = cubeState.left[5];
        cubeState.bottom[2] = cubeState.left[8];
        
        cubeState.left[2] = tempTop[2];
        cubeState.left[5] = tempTop[1];
        cubeState.left[8] = tempTop[0];
    }
}

function rotateRight(clockwise = true) {
    if (clockwise) {
        cubeState.right = rotateFaceClockwise(cubeState.right);
        
        const tempTop = [cubeState.top[2], cubeState.top[5], cubeState.top[8]];
        cubeState.top[2] = cubeState.front[2];
        cubeState.top[5] = cubeState.front[5];
        cubeState.top[8] = cubeState.front[8];
        
        cubeState.front[2] = cubeState.bottom[2];
        cubeState.front[5] = cubeState.bottom[5];
        cubeState.front[8] = cubeState.bottom[8];
        
        cubeState.bottom[2] = cubeState.back[6];
        cubeState.bottom[5] = cubeState.back[3];
        cubeState.bottom[8] = cubeState.back[0];
        
        cubeState.back[0] = tempTop[2];
        cubeState.back[3] = tempTop[1];
        cubeState.back[6] = tempTop[0];
    } else {
        cubeState.right = rotateFaceCounterClockwise(cubeState.right);
        
        const tempTop = [cubeState.top[2], cubeState.top[5], cubeState.top[8]];
        cubeState.top[2] = cubeState.back[6];
        cubeState.top[5] = cubeState.back[3];
        cubeState.top[8] = cubeState.back[0];
        
        cubeState.back[0] = cubeState.bottom[8];
        cubeState.back[3] = cubeState.bottom[5];
        cubeState.back[6] = cubeState.bottom[2];
        
        cubeState.bottom[2] = cubeState.front[2];
        cubeState.bottom[5] = cubeState.front[5];
        cubeState.bottom[8] = cubeState.front[8];
        
        cubeState.front[2] = tempTop[0];
        cubeState.front[5] = tempTop[1];
        cubeState.front[8] = tempTop[2];
    }
}

function rotateTop(clockwise = true) {
    if (clockwise) {
        cubeState.top = rotateFaceClockwise(cubeState.top);
        
        const tempFront = [cubeState.front[0], cubeState.front[1], cubeState.front[2]];
        cubeState.front[0] = cubeState.right[0];
        cubeState.front[1] = cubeState.right[1];
        cubeState.front[2] = cubeState.right[2];
        
        cubeState.right[0] = cubeState.back[0];
        cubeState.right[1] = cubeState.back[1];
        cubeState.right[2] = cubeState.back[2];
        
        cubeState.back[0] = cubeState.left[0];
        cubeState.back[1] = cubeState.left[1];
        cubeState.back[2] = cubeState.left[2];
        
        cubeState.left[0] = tempFront[0];
        cubeState.left[1] = tempFront[1];
        cubeState.left[2] = tempFront[2];
    } else {
        cubeState.top = rotateFaceCounterClockwise(cubeState.top);
        
        const tempFront = [cubeState.front[0], cubeState.front[1], cubeState.front[2]];
        cubeState.front[0] = cubeState.left[0];
        cubeState.front[1] = cubeState.left[1];
        cubeState.front[2] = cubeState.left[2];
        
        cubeState.left[0] = cubeState.back[0];
        cubeState.left[1] = cubeState.back[1];
        cubeState.left[2] = cubeState.back[2];
        
        cubeState.back[0] = cubeState.right[0];
        cubeState.back[1] = cubeState.right[1];
        cubeState.back[2] = cubeState.right[2];
        
        cubeState.right[0] = tempFront[0];
        cubeState.right[1] = tempFront[1];
        cubeState.right[2] = tempFront[2];
    }
}

function rotateLeft(clockwise = true) {
    if (clockwise) {
        cubeState.left = rotateFaceClockwise(cubeState.left);
        
        const tempTop = [cubeState.top[0], cubeState.top[3], cubeState.top[6]];
        cubeState.top[0] = cubeState.back[8];
        cubeState.top[3] = cubeState.back[5];
        cubeState.top[6] = cubeState.back[2];
        
        cubeState.back[2] = cubeState.bottom[6];
        cubeState.back[5] = cubeState.bottom[3];
        cubeState.back[8] = cubeState.bottom[0];
        
        cubeState.bottom[0] = cubeState.front[0];
        cubeState.bottom[3] = cubeState.front[3];
        cubeState.bottom[6] = cubeState.front[6];
        
        cubeState.front[0] = tempTop[0];
        cubeState.front[3] = tempTop[1];
        cubeState.front[6] = tempTop[2];
    } else {
        cubeState.left = rotateFaceCounterClockwise(cubeState.left);
        
        const tempTop = [cubeState.top[0], cubeState.top[3], cubeState.top[6]];
        cubeState.top[0] = cubeState.front[0];
        cubeState.top[3] = cubeState.front[3];
        cubeState.top[6] = cubeState.front[6];
        
        cubeState.front[0] = cubeState.bottom[0];
        cubeState.front[3] = cubeState.bottom[3];
        cubeState.front[6] = cubeState.bottom[6];
        
        cubeState.bottom[0] = cubeState.back[8];
        cubeState.bottom[3] = cubeState.back[5];
        cubeState.bottom[6] = cubeState.back[2];
        
        cubeState.back[2] = tempTop[2];
        cubeState.back[5] = tempTop[1];
        cubeState.back[8] = tempTop[0];
    }
}

function rotateBack(clockwise = true) {
    if (clockwise) {
        cubeState.back = rotateFaceClockwise(cubeState.back);
        
        const tempTop = [cubeState.top[0], cubeState.top[1], cubeState.top[2]];
        cubeState.top[0] = cubeState.right[2];
        cubeState.top[1] = cubeState.right[5];
        cubeState.top[2] = cubeState.right[8];
        
        cubeState.right[2] = cubeState.bottom[8];
        cubeState.right[5] = cubeState.bottom[7];
        cubeState.right[8] = cubeState.bottom[6];
        
        cubeState.bottom[6] = cubeState.left[0];
        cubeState.bottom[7] = cubeState.left[3];
        cubeState.bottom[8] = cubeState.left[6];
        
        cubeState.left[0] = tempTop[2];
        cubeState.left[3] = tempTop[1];
        cubeState.left[6] = tempTop[0];
    } else {
        cubeState.back = rotateFaceCounterClockwise(cubeState.back);
        
        const tempTop = [cubeState.top[0], cubeState.top[1], cubeState.top[2]];
        cubeState.top[0] = cubeState.left[6];
        cubeState.top[1] = cubeState.left[3];
        cubeState.top[2] = cubeState.left[0];
        
        cubeState.left[0] = cubeState.bottom[6];
        cubeState.left[3] = cubeState.bottom[7];
        cubeState.left[6] = cubeState.bottom[8];
        
        cubeState.bottom[6] = cubeState.right[8];
        cubeState.bottom[7] = cubeState.right[5];
        cubeState.bottom[8] = cubeState.right[2];
        
        cubeState.right[2] = tempTop[0];
        cubeState.right[5] = tempTop[1];
        cubeState.right[8] = tempTop[2];
    }
}

function rotateBottom(clockwise = true) {
    if (clockwise) {
        cubeState.bottom = rotateFaceClockwise(cubeState.bottom);
        
        const tempFront = [cubeState.front[6], cubeState.front[7], cubeState.front[8]];
        cubeState.front[6] = cubeState.left[6];
        cubeState.front[7] = cubeState.left[7];
        cubeState.front[8] = cubeState.left[8];
        
        cubeState.left[6] = cubeState.back[6];
        cubeState.left[7] = cubeState.back[7];
        cubeState.left[8] = cubeState.back[8];
        
        cubeState.back[6] = cubeState.right[6];
        cubeState.back[7] = cubeState.right[7];
        cubeState.back[8] = cubeState.right[8];
        
        cubeState.right[6] = tempFront[0];
        cubeState.right[7] = tempFront[1];
        cubeState.right[8] = tempFront[2];
    } else {
        cubeState.bottom = rotateFaceCounterClockwise(cubeState.bottom);
        
        const tempFront = [cubeState.front[6], cubeState.front[7], cubeState.front[8]];
        cubeState.front[6] = cubeState.right[6];
        cubeState.front[7] = cubeState.right[7];
        cubeState.front[8] = cubeState.right[8];
        
        cubeState.right[6] = cubeState.back[6];
        cubeState.right[7] = cubeState.back[7];
        cubeState.right[8] = cubeState.back[8];
        
        cubeState.back[6] = cubeState.left[6];
        cubeState.back[7] = cubeState.left[7];
        cubeState.back[8] = cubeState.left[8];
        
        cubeState.left[6] = tempFront[0];
        cubeState.left[7] = tempFront[1];
        cubeState.left[8] = tempFront[2];
    }
}

// Función principal para rotar caras
function rotateFace(face, clockwise = true) {
    const faceElement = document.querySelector(`.${face}`);
    if (!faceElement) return;
    
    // Efecto visual de rotación
    faceElement.style.transition = 'transform 0.3s ease';
    faceElement.style.transform += clockwise ? ' rotateZ(90deg)' : ' rotateZ(-90deg)';
    
    // Ejecutar rotación lógica
    switch(face) {
        case 'front': rotateFront(clockwise); break;
        case 'right': rotateRight(clockwise); break;
        case 'top': rotateTop(clockwise); break;
        case 'left': rotateLeft(clockwise); break;
        case 'back': rotateBack(clockwise); break;
        case 'bottom': rotateBottom(clockwise); break;
    }
    
    // Actualizar visualización después de la animación
    setTimeout(() => {
        updateCubeDisplay();
        faceElement.style.transform = faceElement.style.transform.replace(clockwise ? ' rotateZ(90deg)' : ' rotateZ(-90deg)', '');
    }, 300);
}

// Actualizar la visualización del cubo basada en el estado interno
function updateCubeDisplay() {
    Object.keys(cubeState).forEach(faceName => {
        const faceElement = document.querySelector(`.${faceName}`);
        if (faceElement) {
            const squares = faceElement.querySelectorAll('.square');
            cubeState[faceName].forEach((colorCode, index) => {
                if (squares[index]) {
                    squares[index].className = `square ${colorMap[colorCode]}`;
                }
            });
        }
    });
}

// Mezclar el cubo con movimientos reales de Rubik
function shuffleCube() {
    const moves = ['front', 'right', 'top', 'left', 'back', 'bottom'];
    const numMoves = 20; // Número de movimientos aleatorios
    
    // Efecto visual de rotación del cubo completo
    if (cube) {
        cube.style.transition = 'transform 1s ease';
        rotation.x += 360;
        rotation.y += 360;
        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        
        setTimeout(() => {
            cube.style.transition = 'none';
        }, 1000);
    }
    
    // Realizar movimientos aleatorios reales
    for (let i = 0; i < numMoves; i++) {
        setTimeout(() => {
            const randomFace = moves[Math.floor(Math.random() * moves.length)];
            const clockwise = Math.random() > 0.5;
            
            // Ejecutar solo la lógica, sin animación visual para el shuffle
            switch(randomFace) {
                case 'front': rotateFront(clockwise); break;
                case 'right': rotateRight(clockwise); break;
                case 'top': rotateTop(clockwise); break;
                case 'left': rotateLeft(clockwise); break;
                case 'back': rotateBack(clockwise); break;
                case 'bottom': rotateBottom(clockwise); break;
            }
            
            // Actualizar display al final
            if (i === numMoves - 1) {
                setTimeout(() => updateCubeDisplay(), 100);
            }
        }, i * 50);
    }
}

// Resolver el cubo (volver al estado resuelto)
function solveCube() {
    // Restaurar estado original
    cubeState = {
        front:  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        back:   ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        right:  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
        left:   ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        top:    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
        bottom: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
    };
    
    // Actualizar visualización con animación
    Object.keys(cubeState).forEach((faceName, faceIndex) => {
        const faceElement = document.querySelector(`.${faceName}`);
        if (faceElement) {
            const squares = faceElement.querySelectorAll('.square');
            cubeState[faceName].forEach((colorCode, index) => {
                setTimeout(() => {
                    if (squares[index]) {
                        squares[index].className = `square ${colorMap[colorCode]}`;
                    }
                }, (faceIndex * 9 + index) * 50);
            });
        }
    });
}

// Pausar/reanudar rotación automática - ARREGLADO
function toggleRotation() {
    isRotating = !isRotating;
    const btn = event.target;

    if (cubeContainer) {
        if (isRotating) {
            cubeContainer.classList.remove('paused');
            btn.textContent = '⏸️ Pausar';
        } else {
            cubeContainer.classList.add('paused');
            btn.textContent = '▶️ Reanudar';
        }
    }
}

// Función para resetear posición del cubo
function resetCubePosition() {
    rotation = { x: -15, y: 25 };
    if (cube) {
        cube.style.transition = 'transform 0.5s ease';
        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        setTimeout(() => {
            cube.style.transition = 'none';
        }, 500);
    }
}

// Controles de teclado - NOTACIÓN ESTÁNDAR DE CUBO DE RUBIK
document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        // Rotaciones de caras (notación estándar)
        case 'f':
            rotateFace('front', !e.shiftKey); // F o F'
            break;
        case 'r':
            rotateFace('right', !e.shiftKey); // R o R'
            break;
        case 'u':
            rotateFace('top', !e.shiftKey); // U o U'
            break;
        case 'l':
            rotateFace('left', !e.shiftKey); // L o L'
            break;
        case 'b':
            rotateFace('back', !e.shiftKey); // B o B'
            break;
        case 'd':
            rotateFace('bottom', !e.shiftKey); // D o D'
            break;
            
        // Rotación libre del cubo con flechas
        case 'arrowup':
            rotation.x -= 15;
            if (cube) cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            break;
        case 'arrowdown':
            rotation.x += 15;
            if (cube) cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            break;
        case 'arrowleft':
            rotation.y -= 15;
            if (cube) cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            break;
        case 'arrowright':
            rotation.y += 15;
            if (cube) cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            break;
            
        // Funciones especiales
        case ' ':
            e.preventDefault();
            shuffleCube();
            break;
        case 'enter':
            solveCube();
            break;
        case 'escape':
            resetCubePosition();
            break;
    }
});



// Funciones adicionales para efectos especiales
function addSparkleEffect() {
    const sparkles = document.createElement('div');
    sparkles.className = 'sparkles';
    sparkles.innerHTML = '✨';
    sparkles.style.position = 'absolute';
    sparkles.style.left = Math.random() * window.innerWidth + 'px';
    sparkles.style.top = Math.random() * window.innerHeight + 'px';
    sparkles.style.fontSize = '20px';
    sparkles.style.pointerEvents = 'none';
    sparkles.style.animation = 'sparkle 2s ease-out forwards';
    
    document.body.appendChild(sparkles);
    
    setTimeout(() => {
        sparkles.remove();
    }, 2000);
}

// Agregar efectos de partículas cuando se resuelve
function addParticleEffect() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            addSparkleEffect();
        }, i * 100);
    }
}