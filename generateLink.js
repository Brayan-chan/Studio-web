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

    switch (componentType) {
        case "title":
            component.innerHTML = "<h2 contenteditable='true' class='text-2xl'>Este es un título</h2>";
            break;
        case "text":
            component.innerHTML = "<p contenteditable='true' class='text-base'>Este es un texto</p>";
            break;
        case "image":
            var imageUrl = prompt("Ingrese la URL de la imagen:");
            if (imageUrl) {
                component.innerHTML = "<img src='" + imageUrl + "' alt='Imagen' class='max-w-full h-auto'>";
            }
            break;
        case "accordion":
            component.innerHTML = `
                <div id="accordion-parent" data-accordion="collapse">
                    <h2 id="accordion-heading-1">
                        <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-body-1" aria-expanded="true" aria-controls="accordion-body-1">
                            <span contenteditable="true">Encabezado 1</span>
                            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-body-1" class="hidden" aria-labelledby="accordion-heading-1">
                        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p contenteditable="true" class="text-gray-500 dark:text-gray-400">Contenido del acordeón 1.</p>
                        </div>
                    </div>
                    <h2 id="accordion-heading-2">
                        <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-body-2" aria-expanded="false" aria-controls="accordion-body-2">
                            <span contenteditable="true">Encabezado 2</span>
                            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-body-2" class="hidden" aria-labelledby="accordion-heading-2">
                        <div class="p-5 border border-gray-200 dark:border-gray-700">
                            <p contenteditable="true" class="text-gray-500 dark:text-gray-400">Contenido del acordeón 2.</p>
                        </div>
                    </div>
                </div>`;
            break;
        case "dropdown":
            component.innerHTML = ` 
                <button id="multiLevelDropdownButton" data-dropdown-toggle="multi-dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700                 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"                 viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
                </button>

                <!-- Dropdown menu -->
                <div id="multi-dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center                justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown<svg class="w-2.5 h-2.5 ms-3           rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg></button>
                        <div id="doubleDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Overview</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My downloads</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Billing</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rewards</a>
                            </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                    </ul>
                </div>`;
            break;
    }

    if (component.innerHTML) {
        document.getElementById("dropContainer").appendChild(component);
        setupInteraction(component);
        setupAccordion();
        setupDropdown();
    }
}

function setupInteraction(component) {
    interact(component)
        .draggable({
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
            var width = parseFloat(target.style.width) || target.offsetWidth;
            var height = parseFloat(target.style.height) || target.offsetHeight;

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

function setupAccordion() {
    document.querySelectorAll('[data-accordion-target]').forEach(button => {
        button.addEventListener('click', () => {
            const target = document.querySelector(button.getAttribute('data-accordion-target'));
            target.classList.toggle('hidden');
        });
    });
}

function setupDropdown() {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = document.getElementById(button.getAttribute('data-dropdown-toggle'));
            dropdown.classList.toggle('hidden');
        });
    });
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