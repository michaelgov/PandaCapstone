async function loadResources() {
    let type = document.querySelector(".heading").getAttribute("value");
    let icon = "";
    if (type == "watch") icon = "video";
    else if (type == "listen") icon = "podcast";
    else if (type == "read") icon = "book-open";
    else if (type == "attend") icon = "people-group";

    try {
        let resources = await fetchJSON(`/resources?type=${type}`);
        let resourcesHtml = resources.map(resource => {
            return `
                <div class="result-box">
                    <div class="icon">
                        <i class="fa-solid fa-${icon}"></i>
                    </div>
                    <div class="text">
                        <p class="title">${resource.title}</p>
                        <a class="resource-links" href="${resource.url}">${resource.url}</a>
                        <p class="Date">Date: ${resource.date}</p>
                    </div>
                </div>
            `
        }).join("\n");
        document.querySelector(".results").innerHTML += resourcesHtml;
    } catch (error) {
        throw(error);
    }
}