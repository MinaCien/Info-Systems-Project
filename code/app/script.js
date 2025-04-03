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

    //Modal elements
    const detailsModal = document.getElementById("detailsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalAddress = document.getElementById("modalAddress");
    const modalService = document.getElementById("modalService");
    const modalPhone = document.getElementById("modalPhone");
    const modalEmail = document.getElementById("modalEmail");
    const mapboxLink = document.getElementById("mapboxLink");

    let allData = []; //This is to store the fetched data globally

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

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
            <td><button class="bookmark-btn">Save</button></td>
            `;

            row.querySelector(".bookmark-btn").addEventListener("click", () => addBookmark(item.attributes));
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
            const mapboxUrl = '';
            mapboxLink.href = mapboxUrl;
            mapboxLink.style.display = "block";
        } else {
            mapboxLink.style.display = "none";
        }

        detailsModal.style.display = "block";  //this is to show modal
    }

    //Close Modal
    function closeModal() {
        detailsModal.style.display = "none";
    }


    //Search functionality
    function searchAgencies() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        let filteredData  = allData.filter(item => Object.values(item.attributes).some(value => value && value.toString().toLowerCase().includes(query))
        );

        displayData(filteredData);
    }

    searchBtn.addEventListener("click", searchAgencies);    

    //Event listener for theme toggle
    themeToggle.addEventListener("change", function (){
        if (thiss.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            document.body.classList.remove("darkmode");
            localStorage.setItem("dark-mode", "disabled");
        }
    });


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
                case "availability":
                    return attributes.NOTES?.toLowerCase().includes(filterValue);
                case "postcode":
                    return attributes.POSTCODE?.toLowerCase().includes(filterValue);
                default:
                    return true;               
            }
        });

        displayData(filteredData);
    }

    applyFilterBtn.addEventListener("click", applyFilter);

    function addBookmark(item) {
        if (!bookmarks.some(bookmark => bookmark.LOCATION_NAME === item.LOCATION_NAME)) {
            bookmarks.push(item);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarks();
        }
    }

    function displayBookmarks() {
        bookmarkContainer.innerHTML = "";
        bookmarks.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${item.LOCATION_NAME} - ${item.FULL_ADDRESS}</p>
                <button onclick="removeBookmark('${item.LOCATION_NAME}')">Remove</button>
            `;
            bookmarkContainer.appendChild(div);
        });
    }

    window.removeBookmark = function(name) {
        bookmarks = bookmarks.filter(item => item.LOCATION_NAME !== name);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmarks();
    }

    //Fetch data on page load
    fetchData();
    displayBookmarks();

    function showSection(sectionId) {
        document.getElementById("first").style.display = (sectionId === "first") ? "block" : "none";
        document.getElementById("second").style.display = (sectionId === "second") ? "block" : "none";
    }

});