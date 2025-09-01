// handle editing a row
function handleEditRow(button) {
    

    const row = button.closest('tr');
    Array.from(row.cells).forEach((cell, index) => {
        if (index < row.cells.length - 1) {
            const originalText = cell.textContent;
            cell.innerHTML = `<input type="text" name="field${index}" value="${originalText}" />`;
        }
    });
    row.cells[row.cells.length - 1].innerHTML = `
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    `;

    row.querySelector(".saveBtn").addEventListener("click", async function () {
        await handleSaveEdit(this);
    });
    row.querySelector(".cancelBtn").addEventListener("click", function () {
        handleCancelEdit(this);
    });
}

//  handle saving edits button
async function handleSaveEdit(button) {
    const row = button.closest('tr');
    const table = button.closest('table');
    const thead = table.querySelector('thead tr');
    
    const columnNames = Array.from(thead.cells).map(cell => cell.getAttribute("name"));
    
    const inputs = Array.from(row.querySelectorAll('input'));
    
    const data = {};

    inputs.forEach((input, index) => {
        const columnName = columnNames[index];
        if (columnName) {
            data[columnName] = input.value;
        }
    });

    row.cells[row.cells.length - 1].innerHTML = `
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    const doctype = table.id === 'bookTable' ? 'Books' : 'Members';
    const name = row.cells[0].querySelector("input").value;

    try {
        const response = await fetch(`/api/v2/document/${doctype}/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token c7d32419639351c:9af332feb3f66cf`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result,"Result")
        if (result.data) {
            alert(`${doctype} updated successfully!`);
            location.reload();
        } else {
            alert('Failed to update the document.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//Handle Cancel Edit Button
function handleCancelEdit(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    

    inputs.forEach((input, index) => {
        row.cells[index].innerText = input.defaultValue;
    });

    row.cells[row.cells.length - 1].innerHTML = `
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    row.querySelector(".editBtn").addEventListener("click", function () {
        handleEditRow(this);
    });
    row.querySelector(".deleteBtn").addEventListener("click", async function () {
        await handleDeleteRow(this);
    });
}

//Delete Row Handaling
async function handleDeleteRow(button) {
    const row = button.closest('tr');
    const doctype = button.closest('table').id === 'bookTable' ? 'Books' : 'Members';
    const name = row.cells[0].textContent.trim();

    if (confirm(`Are you sure you want to delete this ${doctype}?`)) {
        try {
            const response = await fetch(`/api/v2/document/${doctype}/${name}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `token c7d32419639351c:9af332feb3f66cf`
                }
            });

            if (response.ok) {
                alert(`${doctype} "${name}" has been successfully deleted.`);
                row.remove();
            } else {
                const result = await response.json();
                if (result?.errors?.length) {
                    alert(`Error: ${result.errors[0].message}`);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

document.querySelectorAll("#bookTable .editBtn, #memberTable .editBtn").forEach(button => {
    button.addEventListener("click", function () {
        handleEditRow(this);
    });
});

document.querySelectorAll("#bookTable .deleteBtn, #memberTable .deleteBtn").forEach(button => {
    button.addEventListener("click", async function () {
        await handleDeleteRow(this);
    });
});




// Search Input

async function searchItems() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    
    const tableRows = document.querySelectorAll('#bookTable tbody tr');

    
    tableRows.forEach(row => {
        row.style.backgroundColor = ''; 
    });

    if (!searchInput) {
        return; 
    }

    try {
        let found = false;
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td'); 
            const bookTitle = cells[0]?.textContent.toLowerCase();  
            const authorName = cells[2]?.textContent.toLowerCase(); 

            console.log(`Checking: Title="${bookTitle}", Author="${authorName}"`);

            if (bookTitle.includes(searchInput) || authorName.includes(searchInput)) {
                row.style.backgroundColor = 'rgba(173, 216, 230, 1)'; 
                found = true;
            }
        });

        if (!found) {
            alert(`No results found for "${searchInput}".`);
        }

        const tableBody = document.querySelector('#bookTable tbody'); 
        const sortedRows = Array.from(tableRows).sort((rowA, rowB) => {
            const aHighlighted = rowA.style.backgroundColor !== '';
            const bHighlighted = rowB.style.backgroundColor !== '';
            return bHighlighted - aHighlighted; 
        });

        sortedRows.forEach(row => tableBody.appendChild(row));

    } catch (error) {
        console.error('Error searching and highlighting rows:', error);
    }
}


        
//markReturn
async function markReturn(btn, transactionId) {
    const row = btn.closest('tr');

    if (!transactionId) {
        alert("Transaction ID is missing!");
        return;
    }
    if (!confirm(`Are you sure you want to mark Transaction ID ${transactionId} as Returned?`)) {
        return;
    }

    try {
        const response = await fetch(`api/v2/document/Transactions/${transactionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token c7d32419639351c:9af332feb3f66cf`, 
            },
            body: JSON.stringify({
                status: "Returned", 
            }),
        });

        const result = await response.json();
        

        if (result.data) {
            alert(`Transaction ID ${transactionId} marked as Returned successfully!`);
            row.remove();  
            location.reload();
        } else {
            alert("Failed to update the transaction.");
        }
    } catch (error) {
        alert("An error occurred while marking the transaction as Returned.");
        
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-return');
    buttons.forEach((button) => {
        const transactionId = button.closest('tr').querySelector('td:nth-child(1)').textContent.trim(); 
        button.addEventListener('click', async function () {
            await markReturn(this, transactionId);
        });
    });
});



//Import

document.getElementById("importBooksBtn").addEventListener("click", importBooks);

async function importBooks() {
    const importBtn = document.getElementById("importBooksBtn");
    const statusDiv = document.getElementById("statusMessage"); 
    try {
        importBtn.disabled = true;  
        importBtn.innerText = "Importing...";  
        statusDiv.innerHTML = `<p style="color: blue;">Fetching books...</p>`;  

        const filterType = document.getElementById("filterType").value;
        const filterValue = document.getElementById("filterValue").value.trim();
        let apiUrl = "https://frappe.io/api/method/frappe-library?page=2";

        if (filterType !== "none" && filterValue) {
            apiUrl += `&${filterType}=${encodeURIComponent(filterValue)}`;
        }

        const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        console.log(response,"response");

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.message && data.message.length > 0) {
            
            let successCount = 0, errorCount = 0;
            
            for (const book of data.message) {
                let key = Object.keys(book);
                let numpagesKey = key.find(key => key.trim() === "num_pages");
                let numPagesValue = numpagesKey ? book[numpagesKey] : undefined;
            
                const bookData = {
                    title: book.title,
                    book_id: book.bookID,
                    number_of_pages:numPagesValue,
                    author: book.authors,
                    isbn: book.isbn,
                    publisher: book.publisher,
                    stock_quantity: 20
                };
                

                try {
                    const result = await createBookInDoctype(bookData);
                    
                    if (result && result.data && result.data.name) {
                        successCount++;
                    } else {
                        errorCount++; 
                    }
                } catch (error) {
                    console.error(`Failed to import book: ${book.title}`, error);
                    errorCount++;
                }
            }

            statusDiv.innerHTML = `<p style="color: green;">Books Imported: ${successCount}</p>
                                   <p style="color: red;">Failed Imports(already exists): ${errorCount}</p>`;
        } else {
            statusDiv.innerHTML = `<p style="color: red;">No books found!</p>`;
        }
    } catch (error) {
        statusDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error("Error while importing books:", error);
    } finally {
        importBtn.disabled = false;  
        importBtn.innerText = "Import Books";  
    }
}

async function createBookInDoctype(bookData) {
    try {
        const response = await fetch("/api/v2/document/Books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `token c7d32419639351c:9af332feb3f66cf`,
            },
            body: JSON.stringify(bookData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.exception && responseData.exception.includes("already exists")) {
                document.getElementById("statusMessage").innerHTML += 
                    `<p style="color: orange;">Book already exists: ${bookData.title}</p>`;
            }
            throw new Error(responseData.exception || `Failed to create book: ${response.statusText}`);
        }

        console.log(responseData, "result");
        return responseData;
    } catch (error) {
        console.error("Error creating book in Doctype:", error);
        return null;  
    }
}



//tab
document.addEventListener("DOMContentLoaded", function() {
    
    const tabs = document.querySelectorAll(".tabs button");
    
    
    const bookSection = document.querySelector(".section#bookList");
    const memberSection = document.querySelector(".section#memberList");
    const issuedBooksSection = document.querySelector(".section#issuedBooks");
    const returnBooksSection = document.querySelector(".section#returnBooks");

    function handleTabClick(event) {
        const tabText = event.target.innerText.toLowerCase();

        
        bookSection.style.display = "none";
        memberSection.style.display = "none";
        issuedBooksSection.style.display = "none";
        returnBooksSection.style.display = "none";

        
        if (tabText === "books") {
            bookSection.style.display = "block";
        } else if (tabText === "members") {
            memberSection.style.display = "block";
        } else if (tabText === "transactions") {
            issuedBooksSection.style.display = "block";
            returnBooksSection.style.display = "block";
        } else {
            
            bookSection.style.display = "block";
            memberSection.style.display = "block";
            issuedBooksSection.style.display = "block";
            returnBooksSection.style.display = "block";
        }

        tabs.forEach(tab => tab.classList.remove("active"));
        event.target.classList.add("active");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", handleTabClick);
    });

    tabs[0].click();
});  




// async function searchItems() {
//     const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
//     const tableRows = document.querySelectorAll('#returnTable tbody tr');

//     if (!searchInput) {
//         tableRows.forEach(row => row.style.display = '');
//         return;
//     }

//     let found = false;

//     tableRows.forEach(row => {
//         const cells = row.querySelectorAll('td');
//         const memberName = cells[2]?.textContent.toLowerCase();
//         const memberId = cells[3]?.textContent.toLowerCase();

//         if (memberName.includes(searchInput) || memberId.includes(searchInput)) {
//             row.style.display = '';
//             found = true;
//         } else {
//             row.style.display = 'none';
//         }
//     });

//     if (!found) {
//         alert(`No results found for "${searchInput}".`);
//     }
// }
