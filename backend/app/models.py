from app import db

# The student class - this class encapsulates the database table as a class
# Each attribute corresponds to a column in the database
# The actual database is located in the instance directory called site.db
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Student {self.first_name} {self.last_name}>"
