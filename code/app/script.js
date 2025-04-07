//Page designed by Wilhelmina Acheampong

function showSection(sectionId) {
        document.getElementById("first").style.display = (sectionId === "first") ? "block" : "none";
        document.getElementById("second").style.display = (sectionId === "second") ? "block" : "none";
}




document.addEventListener("DOMContentLoaded", function (){
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterSelect = document.getElementById("filterSelect");
    const filterInput = document.getElementById("filterInput");
    const applyFilterBtn = document.getElementById("applyFilterBtn");
    const resultsContainer = document.getElementById("results");
    const themeToggle = document.getElementById("themeToggle");
    

    //Load the previously saved theme
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    //Event listener for theme toggle
    themeToggle.addEventListener("change", function (){
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    //Event listener for seacrh button
    searchBtn.addEventListener("click", function (event){
        event.preventDefault();
        searchAgencies();
    });


    //Modal elements
    const detailsModal = document.getElementById("detailsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalAddress = document.getElementById("modalAddress");
    const modalService = document.getElementById("modalService");
    const modalPhone = document.getElementById("modalPhone");
    const modalEmail = document.getElementById("modalEmail");
    const mapboxLink = document.getElementById("mapboxLink");

    let allData = []; //This is to store the fetched data globally

    //Fetch and display the data

    function fetchData() {
        let url = "https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_community_and_safety/MapServer/18/query?where=1%3D1&outFields=LOCATION_NAME,FULL_ADDRESS,SERVICE_NAME,TELEPHONE,EMAIL&outSR=4326&f=json";

        fetch(url, { method: "GET", headers: {Accept: "application/json"} })
            .then(response => response.json())
            .then(json => {
                allData = json.features; //this is to store the fetched data
                displayData(allData); //Display all data initially
            })
            .catch(error => console.error("Error fetching data: ", error));
    }

    function displayData(data) {
        resultsContainer.innerHTML = ""; //this is to clear the previous results

        if (data.length === 0) {
            resultsContainer.innerHTML = "<tr><td colspan='5'>No data available</td></tr>";
            return;
        }

        data.forEach(item => {
            const row = document.createElement("tr");
            row.classList.add("clickable-row"); 
            row.dataset.details = JSON.stringify(item.attributes);  //Stores the details in the dataset

            row.innerHTML = `
            <td>${item.attributes.LOCATION_NAME || "N/A"}</td>
            <td>${item.attributes.FULL_ADDRESS || "N/A"}</td>
            <td>${item.attributes.SERVICE_NAME || "N/A"}</td>
            <td>${item.attributes.TELEPHONE || "N/A"}</td>
            <td>${item.attributes.EMAIL || "N/A"}</td>
            <td>${item.attributes.AVAILABILITY || "N/A"}</td>
            <td><button class="bookmark-btn">Bookmark</button></td>
            `;

            row.querySelector(".bookmark-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                addToBookmarks(item.attributes);
            });

            row.addEventListener("click", () => showDetails(row.dataset.details));  
            resultsContainer.appendChild(row);
        });
    }

    //Show modal with details

    function showDetails(details) {
        const data = JSON.parse(details);
        modalTitle.textContent = data.LOCATION_NAME || "N/A";
        modalAddress.textContent = data.FULL_ADDRESS || "N/A";
        modalService.textContent = data.SERVICE_NAME || "N/A";
        modalPhone.textContent = data.TELEPHONE || "N/A";
        modalEmail.textContent = data.EMAIL || "N/A";

        //Check if coordinates exist, otherwise disable the link
        if (data.X && data.Y) {
            const mapboxUrl = "";
            mapboxLink.href = mapboxUrl;
            mapboxLink.style.display = "block";
        } else {
            mapboxLink.style.display = "none";
        }

        detailsModal.style.display = "block";  //this is to show modal
    }



    //Search functionality
    function searchAgencies() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        const filteredData  = allData.filter(item => Object.values(item.attributes).some(value => value && value.toString().toLowerCase().includes(query))
        );

        displayData(filteredData);
    }


    //Filter functionality
    function applyFilter() {
        const selectedFilter = filterSelect.value;
        const filterValue = filterInput.value.toLowerCase().trim();

        if (selectedFilter === "all" || !filterValue) {
            displayData(allData); //this is show all data if there is no filter applied
            return;
        }

        let filteredData = allData.filter(item => {
            const attributes = item.attributes;
            switch (selectedFilter) {
                case "postcode":
                    return attributes.POSTCODE?.toLowerCase().includes(filterValue);
                case "availability":
                    return attributes.AVAILABILITY?.toLowerCase().includes(filterValue);
                default:
                    return true;               
            }
        });

        displayData(filteredData);
    }

    //Event listener for filter button
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener("click", applyFilter);
    }

    function addToBookmarks(data) {
        //Intialize array or get the current bookmarks 
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        //Avoid duplicates
        const exist = bookmarks.some(b => b.LOCATION_NAME === data.LOCATION_NAME && b.FULL_ADDRESS === data.FULL_ADDRESS);
        if (!exist) {
            bookmarks.push(data);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            alert(`${LOCATION_NAME} has been added to your bookmarks.`);
        } else {
            alert(`${LOCATION_NAME} is already bookmarked.`);
        }
    }


    function displayBookmarks() {
        const container = document.getElementById("bookmarkList");
        if (!container) return;

        container.innerHTML = "";

        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        if (bookmarks.length === 0) {
            container.innerHTML += `<p>No bookmarks yet. <a href="index.html"> Go to table of contents</a> to add some.</p>`;
            return;
        }

        const list = document.createElement("ul");

        bookmarks.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${item.LOCATION_NAME}</strong> - ${item.FULL_ADDRESS} (${item.SERVICE_NAME})
                <button onclick="removeBookmark(${index})">Remove</button>
            `;
            list.appendChild(li);
        });

        container.appendChild(list);
    }

    window.removeBookmark = function (index) {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        location.reload(); //Then refresh the page to show updates
    }

    
    //Fetch data on page load
    fetchData();

    if (document.getElementById("bookmarkList")) {
        displayBookmarks();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");

    //Set toggle based on saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark-mode");
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener("change", function (){
            if (this.checked) {
                document.documentElement.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        })
    }
})