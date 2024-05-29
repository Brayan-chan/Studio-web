document.getElementById("generateLinkButton").addEventListener("click", function() {
    var dropContainerContent = document.getElementById("dropContainer").innerHTML;
    var link = window.location.href.split('?')[0] + '?content=' + encodeURIComponent(dropContainerContent);
    var linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.textContent = "Enlace generado: " + link;
    document.body.appendChild(linkElement);
});    