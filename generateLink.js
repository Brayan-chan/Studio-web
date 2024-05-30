document.getElementById("generateLinkButton").addEventListener("click", function() {
    var dropContainerContent = document.getElementById("dropContainer").innerHTML;
    var encodedContent = encodeURIComponent(dropContainerContent);
    var link = window.location.href.split('?')[0] + '?content=' + encodedContent;
    var linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.textContent = "Enlace generado: " + link;
    document.body.appendChild(linkElement);
});

// Función para arrastrar y soltar
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.component);
}

function drop(event) {
    event.preventDefault();
    var componentType = event.dataTransfer.getData("text");
    var component = document.createElement("div");
    component.className = "component";
    component.style.top = (event.clientY - event.target.getBoundingClientRect().top) + "px";
    component.style.left = (event.clientX - event.target.getBoundingClientRect().left) + "px";
    if (componentType === "title") {
        component.innerHTML = "<h2 contenteditable='true'>Este es un título</h2>";
    } else if (componentType === "text") {
        component.innerHTML = "<p contenteditable='true'>Este es un texto</p>";
    } else if (componentType === "image") {
        var imageUrl = prompt("Ingrese la URL de la imagen:");
        if (imageUrl) {
            component.innerHTML = "<img src='" + imageUrl + "' alt='Imagen'>";
        }
    }
    document.getElementById("dropContainer").appendChild(component);
    makeComponentDraggableResizable(component);
}

function makeComponentDraggableResizable(component) {
    interact(component)
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent'
                })
            ],
            autoScroll: true,
            onmove: dragMoveListener
        })
        .resizable({
            edges: { left: true, right: true, top: true, bottom: true },
            restrictEdges: {
                outer: 'parent',
            },
            inertia: true,
        })
        .on('resizemove', function (event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute('data-x')) || 0;
            var y = parseFloat(target.getAttribute('data-y')) || 0;

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });

    component.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
}

function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// Agrega eventos a los elementos arrastrables y contenedor de soltar
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', drag);
});
document.getElementById('dropContainer').addEventListener('dragover', allowDrop);
document.getElementById('dropContainer').addEventListener('drop', drop);

// Verifica si hay contenido en la URL para mostrarlo
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('content');
    if (content) {
        document.body.innerHTML = decodeURIComponent(content);
    }
});
