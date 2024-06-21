// Globar variables
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
var deletedIndex;
var updatedIndex;

var bookmarksContainer = [];
if (localStorage.getItem("bookmarks") !== null) {
    bookmarksContainer = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

//Functions
function addBookmark() {
    if (validateInputs(siteNameInput) && validateInputs(siteUrlInput)) {
        var url = siteUrlInput.value;
        if (!url.startsWith("https://")) {
            url = "https://" + url;
        }
        var bookmark = {
            name: siteNameInput.value,
            url: url,
        };
        bookmarksContainer.push(bookmark);
        displayBookmarks();
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
        clearForm();
    } else {
        return false;
    }
}

function clearForm() {
    siteNameInput.value = null;
    siteNameInput.classList.remove("is-invalid", "is-valid");
    siteNameInput.nextElementSibling.classList.add("d-none");
    siteUrlInput.value = null;
    siteUrlInput.classList.remove("is-invalid", "is-valid");
    siteUrlInput.nextElementSibling.classList.add("d-none");
}
function displayBookmarks() {
    var cartoona = ``;
    for (var i = 0; i < bookmarksContainer.length; i++) {
        cartoona += `<tr>
                    <td>${i + 1}</td>
                    <td>${bookmarksContainer[i].name}</td>
            <td>
                <button onclick="visitUrl(${i})" class="visit-btn btn btn-primary"><i class="fa-solid fa-eye me-2"></i>Visit</button>
            </td>
                    <td>
                        <button onclick="setFormForUpdate(${i})" class="edit-btn btn btn-warning text-light"><i class="fa-solid fa-pen me-2"></i>Edit</button>
                    </td>
                    <td>
                        <button onclick="openDeleteModal(${i})" class="del-btn btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
                    </td>
                </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}
function searchBookmarks() {
    var cartoona = ``;
    var term = searchInput.value;
    for (var i = 0; i < bookmarksContainer.length; i++) {
        if (
            bookmarksContainer[i].name
                .toLowerCase()
                .includes(term.toLowerCase())
        ) {
            cartoona += `<tr>
            <td>${i + 1}</td>
            <td>${bookmarksContainer[i].name}</td>
    <td>
        <button onclick="visitUrl(${i})" class="visit-btn btn btn-primary"><i class="fa-solid fa-eye me-2"></i>Visit</button>
    </td>
            <td>
                <button onclick="setFormForUpdate(${i})" class="edit-btn btn btn-warning text-light"><i class="fa-solid fa-pen me-2"></i>Edit</button>
            </td>
            <td>
                <button onclick="openDeleteModal(${i})" class="del-btn btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
            </td>
        </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}
function visitUrl(i) {
    var url = bookmarksContainer[i].url;
    console.log(url);
    window.open(url, "_blank");
}
function setFormForUpdate(i) {
    clearForm();
    updatedIndex = i;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    cancelUpdateBtn.classList.remove("d-none");

    siteNameInput.value = bookmarksContainer[updatedIndex].name;
    siteUrlInput.value = bookmarksContainer[updatedIndex].url;

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function updateBookmark() {
    if (validateInputs(siteNameInput) && validateInputs(siteUrlInput)) {
        bookmarksContainer[updatedIndex].name = siteNameInput.value;
        bookmarksContainer[updatedIndex].url = siteUrlInput.value;
        displayBookmarks();
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
        clearForm();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        cancelUpdateBtn.classList.add("d-none");
    } else {
        return false;
    }
}

function cancelUpdate() {
    clearForm();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    cancelUpdateBtn.classList.add("d-none");
}
function openDeleteModal(index) {
    deletedIndex = index;
    // Show the modal
    var myModalEl = document.getElementById("cancelDeleteModal");
    var modal = new bootstrap.Modal(myModalEl);
    modal.show();
}
function deleteBookmark() {
    bookmarksContainer.splice(deletedIndex, 1);
    displayBookmarks();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
    // Close the modal after deletion
    var myModalEl = document.getElementById("cancelDeleteModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    // Close update page after deletion if opened
    cancelUpdate();
}
function validateInputs(element) {
    var regex = {
        siteNameInput: /^[a-zA-Z0-9\s]{3,}$/,
        siteUrlInput:
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
    };
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
