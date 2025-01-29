# Library Management Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Global Configurations](#global-configurations)
- [License](#license)
- [Contact](#contact)

## Introduction
The Library Management Web Application is designed to streamline library operations. It helps the librarian manage book inventory, member information, and track book transactions such as issuing and returning books. The system calculates rent fees for issued books and handles fines for overdue books. The app includes functionality for importing book data via an API, allowing the librarian to add new books in bulk. The application is built using the Frappe Framework and provides a custom UI for handling CRUD operations and book management.

## Features
- **Book Management**: Perform CRUD operations on books, including adding new books, updating book details, and deleting books.
- **Member Management**: Add and manage library members, including tracking their outstanding debt.
- **Book Issuing**: Issue books to members with a return date and automatic rent fee calculation.
- **Book Returns**: Handle book returns, calculate fines for overdue books, and update member outstanding debt.
- **Book Search**: Search for books by title or author.
- **Import Books**: Import books into the system using an external API.
- **Automated Rent and Fine Calculation**: Rent fee is calculated per day for each book issued, and fines are calculated for overdue books.
- **Member Limit**: Ensure that a member’s outstanding debt does not exceed Rs. 500.
- **Custom UI**: A custom user interface built in Frappe's `www` folder to perform CRUD operations without relying on the default Frappe UI.

## Technologies Used
- **Frappe Framework**
- **Python**
- **JavaScript**
- **HTML/CSS**
- **Jinja Template**
- **External API for Book Import**


## Installation
To set up this project locally, follow these steps:

1. Clone the repository:

```bash

git clone https://github.com/Mayuritupe23/Library-Management-Web-Application.git
```
2. Navigate to the project directory:

```bash

cd library_management_web_application
```
3. Open website.html in your browser.

4. Set up the Frappe framework and dependencies:

- Follow the official Frappe setup guide to configure your environment.

  
## Usage
- Open the app in your browser.
- Use the custom UI to manage books, issue books to members, and handle book returns.
- Add new books by using the "Import Books" functionality through the API integration.
- Book rent is automatically calculated at Rs. 10 per day, and fines are charged at Rs. 20 per day for overdue books.
- Keep track of members' outstanding debts, ensuring they do not exceed Rs. 500.
- Use the search functionality to find books by title or author.

## Global Configurations
- **Default Rent Fee**: Set the rent fee per day for issued books.
- **Fine Amount**: Set the fine amount per day for overdue books.
- **Outstanding Debt Limit**: Define the maximum allowable debt for a member (default Rs. 500).
- **API Configuration**: Configure the API to import books based on search parameters such as title, author, and ISBN.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any questions or feedback, please feel free to reach out:

**Name**: Mayuri Tupe  
**Email**: [mayuritupe23@navgurukul.org](mailto:mayuritupe23@navgurukul.org)


