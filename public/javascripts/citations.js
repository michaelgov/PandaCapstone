async function loadCitations() {
    try {
        let citations = await fetchJSON('/citations');
        let citationsHtml = citations.map(citation => {
            console.log(citation);
            let icon = "";
            if (citation.type == "article") icon = "pencil";
            else if (citation.type == "newspaper") icon = "newspaper";
            return `
                <div class="result-box">
                    <div class="icon">
                        <i class="fa-solid fa-${icon}"></i>
                    </div>
                    <div class="text">
                        <p class="title">${citation.title}</p>
                        <a class="resource-links" href="${citation.url}">${citation.url}</a>
                        <p class="Date">Date: ${citation.date}</p>
                    </div>
                </div>
            `
        }).join("\n");
        document.querySelector(".results").innerHTML += citationsHtml;
    } catch (error) {
        throw(error);
    }
}