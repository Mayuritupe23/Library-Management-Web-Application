import frappe
from frappe.model.document import Document
from datetime import datetime

class Transactions(Document):
    def validate(self):
        book = frappe.get_doc("Books", self.book)
        
        if self.status == "Issued":
            member = frappe.get_doc("Members", self.member)
            if member.outstanding_debt > 500:
                frappe.throw(
                    "Outstanding debt exceeds ₹500. You cannot issue a new book until the debt is cleared."
                )
            else:
                if book.stock_quantity > 0:
                    book.stock_quantity -= 1
                    book.save()
                else:
                    frappe.throw("No available stock for this book.")
        
        elif self.status == "Returned":
            book.stock_quantity += 1
            book.save()

        # self.stock_quantity = book.stock_quantity



    def before_save(self):
        
        if self.status == "Issued" and self.issue_date and self.due_date:
            
            issue_date = datetime.strptime(self.issue_date, '%Y-%m-%d')
            due_date = datetime.strptime(self.due_date, '%Y-%m-%d')
            rental_days = (due_date - issue_date).days + 1  

            self.rent_fee = rental_days * 10

            member = frappe.get_doc("Members", self.member)
            member.outstanding_debt += self.rent_fee
            member.save()

        elif self.status == "Returned":
            if not self.return_date:
                self.return_date = datetime.today().date() 

            if isinstance(self.due_date, str):
                due_date = datetime.strptime(self.due_date, '%Y-%m-%d').date()
            else:
                due_date = self.due_date

            if isinstance(self.return_date, str):
                return_date = datetime.strptime(self.return_date, '%Y-%m-%d').date()
            else:
                return_date = self.return_date

            if return_date and due_date:
                delay_days = (return_date - due_date).days

                if delay_days > 0:
                    self.fine = delay_days * 20

                    member = frappe.get_doc("Members", self.member)
                    member.outstanding_debt += self.fine
                    member.save()

                    frappe.msgprint(
                        f"You returned the book {delay_days} days late. A late fee of ₹{self.fine} has been added to your outstanding debt."
                    )
