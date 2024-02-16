from app import app, db
from app.models import Student, Tutor, Module, Booking, Report
from flask import jsonify, request
from sqlalchemy import select


# API Routes are instantiated here
# Each decorator such as @app.route defines an endpoint (such as /students) and a method for that endpoint
# The function below the decorator handles the data sent/received by the endpoint
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify({'students': [{'id': student.id,
                                  'first_name': student.first_name,
                                  'last_name': student.last_name,
                                  'email': student.email} for student in students]})

@app.route('/add-student', methods=['POST'])
def create_student():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    emailVerified = False


    try:
        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

        new_student = Student(first_name=first_name, last_name=last_name, email=email, password=password, emailVerified=emailVerified)

        db.session.add(new_student)
        db.session.commit()

        return jsonify({'message': 'Student created successfully',
                        'student': {'id': new_student.id,
                                    'first_name': new_student.first_name,
                                    'last_name': new_student.last_name,
                                    'email': new_student.email,
                                    "emailVerified": new_student.emailVerified}}), 201
    except:
        return jsonify({'error': "Student not created"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    student = None
    tutor = None

    try:
        student = Student.query.filter_by(email=email, password=password).first()
        if student:
            return jsonify({"message": "This is a student successfully logging in"}), 201
        tutor = Tutor.query.filter_by(email=email, password=password).first()
        if tutor:
            return jsonify({"message": "This is a tutor successfully logging in"}), 201
        return jsonify({"error": "Unsuccessful login"}), 400
    except:
        return jsonify({"error": "You are not a user. GET OUT."}), 400


@app.route('/tutors', methods=['GET'])
def get_tutors():
    tutors = Tutor.query.all()
    return jsonify({'tutors': [{'id': tutor.id,
                                'first_name': tutor.first_name,
                                'last_name': tutor.last_name,
                                'email': tutor.email} for tutor in tutors]})


@app.route('/tutors/<tutorId>', methods=['GET'])
def get_tutor_id(tutorId):
    tutor = Tutor.query.get(tutorId)
    return jsonify({'tutor': {'id': tutor.id,
                                'first_name': tutor.first_name,
                                'last_name': tutor.last_name,
                                'email': tutor.email}})

@app.route('/tutors', methods=['POST'])
def create_tutor():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    year = data.get('year')
    contact_number = data.get('contact_number')
    description = data.get('description')
    emailVerified = False

    try:

        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

        new_tutor = Tutor(first_name=first_name, last_name=last_name, email=email, password=password, year=year, \
                        contact_number=contact_number, description= description, emailVerified=emailVerified)

        db.session.add(new_tutor)
        db.session.commit()

        return jsonify({'message': 'Tutor created successfully',
                        'tutor': {'id': new_tutor.id,
                                    'first_name': new_tutor.first_name,
                                    'last_name': new_tutor.last_name,
                                    'email': new_tutor.email,
                                    "emailVerified": new_tutor.emailVerified}}), 201

    except:
        return jsonify({"error": "Tutor not created"}), 400

@app.route('/modules', methods=['GET'])
def get_modules():
    modules = Module.query.all()
    return jsonify({'modules': [{'id': module.id,
                                 'module_code': module.module_code,
                                 'module_name': module.module_name,
                                 'tutor_id': module.tutor_id}for module in modules]})

@app.route('/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify({'bookings': [{'id': booking.id,
                                'student_id': booking.student_id,
                                'tutor_id': booking.tutor_id,
                                'module_id': booking.module_id,
                                'time': booking.time,
                                'location': booking.location,
                                'description': booking.description}for booking in bookings]})

@app.route('/bookings', methods=['POST'])
def create_bookings():
    data = request.get_json()

    student_id = data.get('student_id')
    tutor_id = data.get('tutor_id')
    module_id = data.get('module_id')
    time = data.get('time')
    location = data.get('location')
    description = data.get('description')

    if not all([student_id, tutor_id, module_id, time, location, description]):
        return jsonify({'error': 'All fields (student_id, tutor_id, module_id, time, location, description) are required'}), 400

    new_booking = Booking(student_id=student_id, tutor_id=tutor_id, module_id=module_id, time=time, location=location, description=description)
    db.session.add(new_booking)
    db.session.commit()

@app.route('/reports', methods=['GET'])
def get_reports():
    reports = Report.query.all()
    return jsonify({'reports': [{'id': report.id,
                                 'student_id': report.student_id,
                                 'tutor_id': report.tutor_id,
                                 'module_id': report.module_id,
                                 'type': report.type,
                                 'description': report.description}for report in reports]})


