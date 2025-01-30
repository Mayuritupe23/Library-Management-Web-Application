import frappe
from frappe.model.document import Document
from datetime import datetime

class Transactions(Document):
    def validate(self):
        # Fetch the book record based on the book linked in the transaction
        book = frappe.get_doc("Books", self.book)
        
        if self.status == "Issued":
            # Check if the member's outstanding debt exceeds ₹500
            member = frappe.get_doc("Members", self.member)
            if member.outstanding_debt > 500:
                frappe.throw(
                    "Outstanding debt exceeds ₹500. You cannot issue a new book until the debt is cleared."
                )
            else:
                # Decrease stock_quantity by 1
                if book.stock_quantity > 0:
                    book.stock_quantity -= 1
                    book.save()
                else:
                    frappe.throw("No available stock for this book.")
        
        elif self.status == "Returned":
            # Increase stock_quantity by 1
            book.stock_quantity += 1
            book.save()

        # Update the available stock in the transaction for display
        self.stock_quantity = book.stock_quantity



    def before_save(self):
        # Handle when a book is issued
        if self.status == "Issued" and self.issue_date and self.due_date:
            # Calculate the number of rental days
            issue_date = datetime.strptime(self.issue_date, '%Y-%m-%d')
            due_date = datetime.strptime(self.due_date, '%Y-%m-%d')
            rental_days = (due_date - issue_date).days + 1  # Including the issue date

            # Calculate rent fee
            self.rent_fee = rental_days * 10

            # Update outstanding debt for the member
            member = frappe.get_doc("Members", self.member)
            member.outstanding_debt += self.rent_fee
            member.save()

        # Handle when a book is returned
        elif self.status == "Returned":
            # Automatically set the return_date to today's date if it's not provided
            if not self.return_date:
                self.return_date = datetime.today().date()  # Set to current date

            # Convert due_date and return_date to datetime.date objects if they are strings
            if isinstance(self.due_date, str):
                due_date = datetime.strptime(self.due_date, '%Y-%m-%d').date()
            else:
                due_date = self.due_date

            if isinstance(self.return_date, str):
                return_date = datetime.strptime(self.return_date, '%Y-%m-%d').date()
            else:
                return_date = self.return_date

            # Calculate delay days if return_date and due_date are available
            if return_date and due_date:
                delay_days = (return_date - due_date).days

                # If there's a delay, calculate the late fee
                if delay_days > 0:
                    self.fine = delay_days * 20

                    # Update outstanding debt for the member
                    member = frappe.get_doc("Members", self.member)
                    member.outstanding_debt += self.fine
                    member.save()

                    # Optionally, notify the user about the late fee
                    frappe.msgprint(
                        f"You returned the book {delay_days} days late. A late fee of ₹{self.fine} has been added to your outstanding debt."
                    )
