let url = "https://api.github.com/users";
let allUsers = [];

// Show details of a selected user
function showDetail(user) {
    let container = document.getElementById("container");
    container.innerHTML = "";
    container.style.height = "100vh";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.padding = "20px";

    // Back Button
    let backBtn = document.createElement("button");
    backBtn.innerText = "← Back";
    backBtn.style.alignSelf = "flex-start";
    backBtn.style.padding = "10px 20px";
    backBtn.style.marginBottom = "20px";
    backBtn.style.cursor = "pointer";
    backBtn.style.fontSize = "16px";
    backBtn.addEventListener("click", loadList);
    container.appendChild(backBtn);

    // Detail Container
    let detailContainer = document.createElement("div");
    detailContainer.style.display = "flex";
    detailContainer.style.gap = "40px";
    detailContainer.style.alignItems = "flex-start";

    // Image Section
    let imgDiv = document.createElement("div");
    imgDiv.style.flex = "0 0 300px";

    let img = document.createElement("img");
    img.src = user.avatar_url;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    imgDiv.appendChild(img);

    // Info Section
    let infoDiv = document.createElement("div");
    infoDiv.style.flex = "1";

    let name = document.createElement("h1");
    name.innerText = user.name || "N/A";

    let login = document.createElement("p");
    login.innerText = `Login: ${user.login}`;

    let type = document.createElement("p");
    type.innerText = `Type: ${user.type}`;

    let id = document.createElement("p");
    id.innerText = `ID: ${user.id}`;

    let url_info = document.createElement("p");
    url_info.innerText = `Profile: ${user.html_url}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(login);
    infoDiv.appendChild(type);
    infoDiv.appendChild(id);
    infoDiv.appendChild(url_info);

    detailContainer.appendChild(imgDiv);
    detailContainer.appendChild(infoDiv);

    container.appendChild(detailContainer);
}

// Load user list
function loadList() {
    let container = document.getElementById("container");
    container.innerHTML = "";
    container.style.height = "auto";
    container.style.display = "block";

    allUsers.forEach((user) => {
        let sub_container = document.createElement("div");
        sub_container.style.display = "flex";
        sub_container.style.alignItems = "center";
        sub_container.style.gap = "30px";
        sub_container.style.padding = "20px";
        sub_container.style.border = "1px solid #ddd";
        sub_container.style.marginBottom = "15px";
        sub_container.style.borderRadius = "8px";
        sub_container.style.cursor = "pointer";
        sub_container.style.transition = "transform 0.2s, box-shadow 0.2s";

        sub_container.addEventListener("mouseenter", () => {
            sub_container.style.transform = "translateY(-5px)";
            sub_container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        });

        sub_container.addEventListener("mouseleave", () => {
            sub_container.style.transform = "translateY(0)";
            sub_container.style.boxShadow = "none";
        });

        sub_container.addEventListener("click", () => {
            showDetail(user);
        });

        // Image
        let image_container = document.createElement("div");
        image_container.style.flex = "0 0 120px";

        let images = document.createElement("img");
        images.src = user.avatar_url;
        images.style.width = "100%";
        images.style.borderRadius = "8px";
        image_container.appendChild(images);

        // Info
        let info_container = document.createElement("div");
        info_container.style.flex = "1";

        let name = document.createElement("h2");
        name.innerText = user.name || "N/A";

        let login = document.createElement("h4");
        login.innerText = `Login: ${user.login}`;

        let type = document.createElement("h4");
        type.innerText = `Type: ${user.type}`;

        info_container.appendChild(name);
        info_container.appendChild(login);
        info_container.appendChild(type);

        sub_container.appendChild(image_container);
        sub_container.appendChild(info_container);

        container.appendChild(sub_container);
    });
}

// Fetch data
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        allUsers = data;
        loadList();
    })
    .catch((error) => {
        console.log("Error occurred while fetching data");
    });
