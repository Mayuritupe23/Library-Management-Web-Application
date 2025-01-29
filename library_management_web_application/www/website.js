// Function to handle editing a row
function handleEditRow(button) {
    console.log(button)
    const row = button.closest('tr');



    // Replace text content with input fields
    Array.from(row.cells).forEach((cell, index) => {
        if (index < row.cells.length - 1) { // Skip the action buttons cell
            const originalText = cell.textContent;
            cell.innerHTML = `<input type="text" name="field${index}" value="${originalText}" />`;
        }
    });
    // Replace action buttons with Save and Cancel
    row.cells[row.cells.length - 1].innerHTML = `
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    `;

    // Attach event listeners to Save and Cancel buttons
    row.querySelector(".saveBtn").addEventListener("click", function () {
        handleSaveEdit(this);
    });
    row.querySelector(".cancelBtn").addEventListener("click", function () {
        handleCancelEdit(this);
    });
}
// Function to handle saving edits
function handleSaveEdit(button) {
    const row = button.closest('tr');
    console.log(row, "ROWWWWW")
    const table = button.closest('table');


    const thead = table.querySelector('thead tr');
    console.log(thead, "ASDF")

    // Extract column names from thead
    const columnNames = Array.from(thead.cells).map(cell => cell.getAttribute("name"));
    console.log(columnNames, "Colum")


    // Gather updated data
    const inputs = Array.from(row.querySelectorAll('input'));
    const data = {};


    inputs.forEach((input, index) => {
        // Map input values to corresponding column names
        const columnName = columnNames[index];

        if (columnName) {
            data[columnName] = input.value;
        }
    });

    console.log(data, "Mapped Data");

    // Update action buttons back to Edit/Delete
    row.cells[row.cells.length - 1].innerHTML = `
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    // Determine DocType
    const doctype = table.id === 'bookTable' ? 'Books' : 'Members';
    const name = row.cells[0].querySelector("input").value; // Assuming `data-name` attribute holds the document name
    console.log(name, "Mayuri")
    // console.log(row.,"ROW")
    // Make API request to update document in Frappe

    fetch(`/api/v2/document/${doctype}/${name}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token 16cf5940b269f4e:ae6c12a8ecc806f` // Replace with your actual Frappe API credentials
        },
        body: JSON.stringify(data)
    })
        .then(response =>


            response.json())
        .then(result => {
            if (result.data) {
                alert(`${doctype} updated successfully!`);
                location.reload(); // Reload to reflect changes
            } else {
                alert('Failed to update the document.');
            }
        })
        .catch(error =>
            console.error('Error:', error)
        )
}

// Function to handle canceling edit
function handleCancelEdit(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');

    // Revert to original text
    inputs.forEach((input, index) => {
        row.cells[index].innerText = input.defaultValue;
    });

    // Replace action buttons with Edit and Delete
    row.cells[row.cells.length - 1].innerHTML = `
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    // Reattach event listeners to buttons
    row.querySelector(".editBtn").addEventListener("click", function () {
        handleEditRow(this);
    });
    row.querySelector(".deleteBtn").addEventListener("click", function () {
        handleDeleteRow(this);
    });
}

// Function to handle deleting a row
function handleDeleteRow(button) {
    const row = button.closest('tr');
    const doctype = button.closest('table').id === 'bookTable' ? 'Books' : 'Members';
    const name = row.cells[0].textContent.trim(); // Assuming the first cell contains the document name
    console.log(name, "Document Name to Delete");

    // Confirm deletion
    if (confirm(`Are you sure you want to delete this ${doctype}?`)) {
        // Make API request to delete document in Frappe
        fetch(`/api/v2/document/${doctype}/${name}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `token 16cf5940b269f4e:ae6c12a8ecc806f` // Replace with your actual Frappe API credentials
            }
        })
            .then(response => {
                console.log(response, "Response")
                if (response.ok) {
                    // If successful, show an alert
                    alert(`${doctype} "${name}" has been successfully deleted.`);
                    row.remove(); // Remove the row from the table
                } else {
                    // Parse the error response if it exists
                    return response.json();
                }
            })
            .then(result => {
                console.log(result,"result")
                // If there is an error in the result, display the error message
                if (result?.errors?.length) {
                    alert(`Error: ${result.errors[0].message}`);
                }
            })
            .catch(error => {
                // alert(error)
                console.error('Error:', error)
            });
    }
}

// Attach event listeners to existing rows in both tables
document.querySelectorAll("#bookTable .editBtn, #memberTable .editBtn").forEach(button => {
    button.addEventListener("click", function () {
        handleEditRow(this);
    });
});

document.querySelectorAll("#bookTable .deleteBtn, #memberTable .deleteBtn").forEach(button => {
    button.addEventListener("click", function () {
        handleDeleteRow(this);
    });
});


async function searchItems() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    // Get all rows from the Book List table
    const tableRows = document.querySelectorAll('#bookTable tbody tr');

    // Clear previous highlights
    tableRows.forEach(row => {
        row.style.backgroundColor = ''; // Reset background color
    });

    if (!searchInput) {
        return; // Exit if the search input is empty
    }

    try {
        // Loop through each row and check if it matches the search input
        let found = false;
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td'); //nodelist
            console.log(cells, "Cells");
            const rowContent = Array.from(cells).map(cell => cell.textContent.toLowerCase());

            console.log('Row content:', rowContent); // Debug: Log all row content

            // Check if any cell contains the search input
            if (rowContent.some(content => content.includes(searchInput))) {
                row.style.backgroundColor = 'yellow'; // Highlight the row
                found = true;
            }
        });

        if (!found) {
            alert(`No results found for "${searchInput}".`);
        }
    } catch (error) {
        console.error('Error searching and highlighting rows:', error);
    }
}



// Function to mark the transaction as returned
function markReturn(btn, transactionId) {
    console.log("Button clicked:", btn);
    console.log("Transaction ID Passed:", transactionId);

    // Get the row and status cell
    const row = btn.closest('tr');

    // Validate Transaction ID
    if (!transactionId) {
        alert("Transaction ID is missing!");
        console.error("Transaction ID is missing!");
        return;
    }

    // Confirm action
    if (!confirm(`Are you sure you want to mark Transaction ID ${transactionId} as Returned?`)) {
        return;
    }

    

    // Make the API call
    fetch(`/api/v2/document/Transactions/${transactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `token 16cf5940b269f4e:ae6c12a8ecc806f`, // Replace with your actual API token
        },
        body: JSON.stringify({
            status: "Returned", // Update the status field to "Returned"
        }),
    })
        .then((res) => {
            console.log("Raw Response:", res);
            return res.json();
        })
        .then((result) => {
            console.log("Parsed Response:", result);

            if (result.data) {
                alert(`Transaction ID ${transactionId} marked as Returned successfully!`);
                // Optionally, remove the row or update it visually to reflect the change
                row.remove(); // Removes the row after marking as returned
            } else {
                alert("Failed to update the transaction.");
                console.error("API returned an error:", result);
            }
        })
        .catch((err) => {
            console.error("Fetch Error:", err);
            alert("An error occurred while marking the transaction as Returned.");
        });
}

// Ensure the buttons are linked to the correct function
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-return');
    buttons.forEach((button) => {
        const transactionId = button.closest('tr').querySelector('td:nth-child(1)').textContent.trim(); // Assuming Transaction ID is in the 1st column
        button.setAttribute('onclick', `markReturn(this, '${transactionId}')`);
    });
});


//Import
document.getElementById("importBooksBtn").addEventListener("click", importBooks);

async function importBooks() {
    try {
        console.log("Import Books button clicked!");
        
        // Fetch data from the external API
        const response = await fetch("https://frappe.io/api/method/frappe-library?page=2", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Books data fetched:", data);
        
        if (data.message && data.message.length > 0) {
            for (const book of data.message) {
                const bookData = {
                    title: book.title,
                    book_id: book.bookID,
                    author: book.authors,
                    isbn: book.isbn,
                    publisher: book.publisher,
                    stock_quantity: 30
                };
                
                // Push book data to your Books Doctype
                const result = await createBookInDoctype(bookData);
                console.log("Book created:", result);
            }
        } else {
            console.log("No books found in the response.");
        }
    } catch (error) {
        console.error("Error while importing books:", error);
    }
}
async function createBookInDoctype(bookData) {
    try {
        // Check if the book already exists
        const existingBookResponse = await fetch(`/api/resource/Books/${encodeURIComponent(bookData.title)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-api-token-here'
            }
        });

        if (existingBookResponse.ok) {
            console.log(`Book "${bookData.title}" already exists.`);
            return; // Skip insertion
        }

        // Book doesn't exist, so create a new one
        const response = await fetch("/api/resource/Books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-api-token-here'
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create book: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        if (error.message.includes('404')) {
            // If the book does not exist (404), proceed with creation
            try {
                const response = await fetch("/api/resource/Books", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your-api-token-here'
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    throw new Error(`Failed to create book: ${response.statusText}`);
                }

                const result = await response.json();
                return result;
            } catch (creationError) {
                console.error("Error creating book:", creationError);
            }
        } else {
            console.error("Error checking book existence:", error);
        }
    }
}


// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Get all the tabs
    const tabs = document.querySelectorAll(".tabs button");
    
    // Get all the sections
    const bookSection = document.querySelector(".section#bookList");
    const memberSection = document.querySelector(".section#memberList");
    const issuedBooksSection = document.querySelector(".section#issuedBooks");
    const returnBooksSection = document.querySelector(".section#returnBooks");

    // Function to show and hide sections based on tab clicks
    function handleTabClick(event) {
        const tabText = event.target.innerText.toLowerCase();

        // Hide all sections
        bookSection.style.display = "none";
        memberSection.style.display = "none";
        issuedBooksSection.style.display = "none";
        returnBooksSection.style.display = "none";

        // Show the appropriate section based on the tab clicked
        if (tabText === "books") {
            bookSection.style.display = "block";
        } else if (tabText === "members") {
            memberSection.style.display = "block";
        } else if (tabText === "transactions") {
            issuedBooksSection.style.display = "block";
            returnBooksSection.style.display = "block";
        } else {
            // For "All" tab, you can display all sections
            bookSection.style.display = "block";
            memberSection.style.display = "block";
            issuedBooksSection.style.display = "block";
            returnBooksSection.style.display = "block";
        }

        // Remove the active class from all tabs and add it to the clicked tab
        tabs.forEach(tab => tab.classList.remove("active"));
        event.target.classList.add("active");
    }

    // Set up the event listener for each tab
    tabs.forEach(tab => {
        tab.addEventListener("click", handleTabClick);
    });

    // By default, show the "All" tab's content
    tabs[0].click();
});
