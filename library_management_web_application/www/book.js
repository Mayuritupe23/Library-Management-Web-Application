// // Function to handle editing a row
// function handleEditRow(button) {
//     console.log(button)
//     const row = button.closest('tr');
    
    

//     // Replace text content with input fields
//     Array.from(row.cells).forEach((cell, index) => {
//         if (index < row.cells.length - 1) { // Skip the action buttons cell
//             const originalText = cell.textContent;
//             cell.innerHTML = `<input type="text" name="field${index}" value="${originalText}" />`;
//         }
//     });

//     // Replace action buttons with Save and Cancel
//     row.cells[row.cells.length - 1].innerHTML = `
//         <button class="saveBtn">Save</button>
//         <button class="cancelBtn">Cancel</button>
//     `;

//     // Attach event listeners to Save and Cancel buttons
//     row.querySelector(".saveBtn").addEventListener("click", function () {
//         handleSaveEdit(this);
//     });
//     row.querySelector(".cancelBtn").addEventListener("click", function () {
//         handleCancelEdit(this);
//     });
// }
// // Function to handle saving edits
// function handleSaveEdit(button) {
//     const row = button.closest('tr');
//     console.log(row,"ROWWWWW")
//     const table = button.closest('table');

    
//     const thead = table.querySelector('thead tr');
//     console.log(thead,"ASDF")

//     // Extract column names from thead
//     const columnNames = Array.from(thead.cells).map(cell => cell.getAttribute("name"));
//     console.log(columnNames,"Colum")
    

//     // Gather updated data
//     const inputs = Array.from(row.querySelectorAll('input'));
//     const data = {};
    

//     inputs.forEach((input, index) => {
//         // Map input values to corresponding column names
//         const columnName = columnNames[index];
        
//         if (columnName) {
//             data[columnName] = input.value;
//         }
//     });

//     console.log(data, "Mapped Data");

//     // Update action buttons back to Edit/Delete
//     row.cells[row.cells.length - 1].innerHTML = `
//         <button class="editBtn">Edit</button>
//         <button class="deleteBtn">Delete</button>
//     `;

//     // Determine DocType
//     const doctype = table.id === 'bookTable' ? 'Books' : 'Members';
//     const name = row.cells[0].querySelector("input").value; // Assuming `data-name` attribute holds the document name
//     console.log(name,"Mayuri")
//     // console.log(row.,"ROW")
//     // Make API request to update document in Frappe
   
//     fetch(`/api/v2/document/${doctype}/${name}`, {
        
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `token 16cf5940b269f4e:ae6c12a8ecc806f` // Replace with your actual Frappe API credentials
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response =>
            
        
//              response.json())
//         .then(result => {
//             if (result.data) {
//                 alert(`${doctype} updated successfully!`);
//                 location.reload(); // Reload to reflect changes
//             } else {
//                 alert('Failed to update the document.');
//             }
//         })
//         .catch(error => console.error('Error:', error));
// }

// // Function to handle canceling edit
// function handleCancelEdit(button) {
//     const row = button.closest('tr');
//     const inputs = row.querySelectorAll('input');

//     // Revert to original text
//     inputs.forEach((input, index) => {
//         row.cells[index].innerText = input.defaultValue;
//     });

//     // Replace action buttons with Edit and Delete
//     row.cells[row.cells.length - 1].innerHTML = `
//         <button class="editBtn">Edit</button>
//         <button class="deleteBtn">Delete</button>
//     `;

//     // Reattach event listeners to buttons
//     row.querySelector(".editBtn").addEventListener("click", function () {
//         handleEditRow(this);
//     });
//     row.querySelector(".deleteBtn").addEventListener("click", function () {
//         handleDeleteRow(this);
//     });
// }

// // Function to handle deleting a row
// function handleDeleteRow(button) {
//     const row = button.closest('tr');
//     const doctype = button.closest('table').id === 'bookTable' ? 'Books' : 'Members';
//     const name = row.cells[0].textContent.trim(); // Assuming the first cell contains the document name
//     console.log(name, "Document Name to Delete");

//     // Confirm deletion
//     if (confirm(`Are you sure you want to delete this ${doctype}?`)) {
//         // Make API request to delete document in Frappe
//         fetch(`/api/v2/document/${doctype}/${name}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `token 16cf5940b269f4e:ae6c12a8ecc806f` // Replace with your actual Frappe API credentials
//             }
//         })
//             .then(response =>
//                 console.log(response,"Response")
//             )
//                 //  response.json())
//             .then(result => {
//                 if (result.message === 'ok') {
//                     alert(`${doctype} deleted successfully!`);
//                     row.remove(); // Remove row from table
//                 } else {
//                     alert('Failed to delete the document.');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }
// }

// // Attach event listeners to existing rows in both tables
// document.querySelectorAll("#bookTable .editBtn, #memberTable .editBtn").forEach(button => {
//     button.addEventListener("click", function () {
//         handleEditRow(this);
//     });
// });

// document.querySelectorAll("#bookTable .deleteBtn, #memberTable .deleteBtn").forEach(button => {
//     button.addEventListener("click", function () {
//         handleDeleteRow(this);
//     });
// });


