window.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.menu-item').forEach(function(item, idx){
        const line = item.querySelector('.line');
        const box = item.querySelector('.box');
        // cálculo de altura de la línea desde el top de la ventana hasta el tope del box
        setTimeout(() => {
            const headerRect = document.querySelector('.custom-header').getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const boxRect = box.getBoundingClientRect();
            // altura desde el top absoluto de la ventana até el top de la caja BOX dentro del menú item
            const distance = (boxRect.top - headerRect.top);
            line.style.height = distance + 'px';
        }, 200 + (idx * 170));
        setTimeout(() => {
            box.style.opacity = 1;
            box.style.transform = 'translateY(0)';
        }, 650 + (idx * 170));
    });
});
