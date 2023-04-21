async function init(){
    await loadResources();
}

async function loadResources() {
    try {
        await fetchJSON(`api/${apiVersion}/userInfo`);
        let resourcesHtml = postsJson.map(postInfo => {
            return `
                
            `
        }).join("\n");
    } catch (error) {
        throw(error);
    }
}