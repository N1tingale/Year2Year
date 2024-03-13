from app import db

# The student class - this class encapsulates the database table as a class
# Each attribute corresponds to a column in the database
# The actual database is located in the instance directory called site.db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    emailVerified = db.Column(db.Boolean, default=False, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    bookings = db.relationship('Booking', backref='student', lazy=True)
    reports = db.relationship('Report', backref='student', lazy=True)

    def __repr__(self):
        return f"<Student {self.first_name} {self.last_name}>"


class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    emailVerified = db.Column(db.Boolean, default=False, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    modules = db.Column(db.String(255), nullable=True)
    bookings = db.relationship('Booking', backref='tutor', lazy=True)
    reports = db.relationship('Report', backref='tutor', lazy=True)

    def __repr__(self):
        return f"<Tutor {self.first_name} {self.last_name}>"

class Module(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    module_code = db.Column(db.String(10), nullable=False)
    module_name = db.Column(db.String(50), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)

    def __repr__(self):
        return f"<Module {self.module_code} {self.module_name}>"

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Booking {self.student_id} {self.tutor_id} {self.module_id} {self.time} {self.location} {self.description}>"

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Report {self.student_id} {self.tutor_id} {self.module_id} {self.description}>"


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)


    def __repr__(self):
        return f"<Chat {self.student_id} {self.tutor_id}>"

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Message {self.sender_id} {self.chat_id} {self.content} {self.timestamp}>"
