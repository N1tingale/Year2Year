from app import app, db
from app.models import Student, Tutor, Module, Booking, Report
from flask import jsonify, request
from sqlalchemy import select
from app.hash_pass import hash_data

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
    
@app.route('/students/<studentId>', methods=['GET'])
def get_student(studentId):
    student = Student.query.get(studentId)
    return jsonify({'student': {'id': student.id,
                                'first_name': student.first_name,
                                'last_name': student.last_name,
                                'email': student.email}})

@app.route('/add-student', methods=['POST'])
def create_student():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    emailVerified = False

    hashed_password = hash_data(password)

    try:
        existing_tutor = Tutor.query.filter_by(email=email).first()
        if existing_tutor:
            return jsonify({"error": "User already exists as tutor"}), 400
            
        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

        new_student = Student(first_name=first_name, last_name=last_name,
                              email=email, password=hashed_password, emailVerified=emailVerified)

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
    hashed_password = hash_data(password)

    student = None
    tutor = None

    try:
        student = Student.query.filter_by(
            email=email, password=hashed_password).first()
        if student:
            return jsonify({"message": "This is a student successfully logging in",
                            'student': {'id':student.id,
                                    'first_name':student.first_name,
                                    'last_name':student.last_name,
                                    'email':student.email,
                                    "emailVerified":student.emailVerified}}), 201
        tutor = Tutor.query.filter_by(
            email=email, password=hashed_password).first()
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
def get_tutor(tutorId):
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
    hashed_password = hash_data(password)
    year = data.get('year')
    contact_number = data.get('contact_number')
    description = data.get('description')
    emailVerified = False

    try:

        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"error": "User already exists as student"}), 400

        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

        new_tutor = Tutor(first_name=first_name, last_name=last_name, email=email, password=hashed_password, year=year,
                          contact_number=contact_number, description=description, emailVerified=emailVerified)

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

@app.route("/add-module", methods=["POST"])
def add_module():
    data = request.get_json()
    module_code = data.get("module_code")
    module_name = data.get("module_name")
    tutor_email = data.get("tutor_email")
    tutor = Tutor.query.filter_by(email=tutor_email).first()
    tutor_id = tutor.id

    try:
        if not all([module_code, module_name, tutor_id]):
            return jsonify({"error": "All fields (module_code, module_name, tutor_id) are required"}), 400

        new_module = Module(module_code=module_code, module_name=module_name, tutor_id=tutor_id)
        db.session.add(new_module)
        db.session.commit()

        return jsonify({"message": "Module created successfully",
                        "module": {"id": new_module.id,
                                   "module_code": new_module.module_code,
                                   "module_name": new_module.module_name,
                                   "tutor_id": new_module.tutor_id}}), 201
    except:
        return jsonify({"error": "Module not created"}), 400

@app.route('/edit-name', methods=["POST"])
def edit_name():
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    try:
        student = Student.query.filter_by(email=email).first()
        if student:
            student.first_name = first_name
            student.last_name = last_name
            db.session.commit()
            return jsonify({"message": "Name updated successfully",
                            "student": {"id": student.id,
                                        "first_name": student.first_name,
                                        "last_name": student.last_name,
                                        "email": student.email,
                                        "emailVerified": student.emailVerified}}), 201
        tutor = Tutor.query.filter_by(email=email).first()
        if tutor:
            tutor.first_name = first_name
            tutor.last_name = last_name
            db.session.commit()
            return jsonify({"message": "Name updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email,
                                      "emailVerified": tutor.emailVerified}}), 201
        return jsonify({"error": "User not found"}), 400
    except:
        return jsonify({"error": "Name not updated"}), 400

@app.route('/edit-email', methods=["POST"])
def edit_email():
    data = request.get_json()
    email = data.get("email")
    new_email = data.get("new_email")

    try:
        student = Student.query.filter_by(email=email).first()
        if student:
            student.email = new_email
            db.session.commit()
            return jsonify({"message": "Email updated successfully",
                            "student": {"id": student.id,
                                        "first_name": student.first_name,
                                        "last_name": student.last_name,
                                        "email": student.email,
                                        "emailVerified": student.emailVerified}}), 201
        tutor = Tutor.query.filter_by(email=email).first()
        if tutor:
            tutor.email = new_email
            db.session.commit()
            return jsonify({"message": "Email updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email,
                                      "emailVerified": tutor.emailVerified}}), 201
        return jsonify({"error": "User not found"}), 400
    except:
        return jsonify({"error": "Email not updated"}), 400

@app.route('/edit-password', methods=["POST"])
def edit_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("new_password")
    hashed_password = hash_data(new_password)

    try:
        student = Student.query.filter_by(email=email).first()
        if student:
            student.password = hashed_password
            db.session.commit()
            return jsonify({"message": "Password updated successfully",
                            "student": {"id": student.id,
                                        "first_name": student.first_name,
                                        "last_name": student.last_name,
                                        "email": student.email,
                                        "emailVerified": student.emailVerified}}), 201
        tutor = Tutor.query.filter_by(email=email).first()
        if tutor:
            tutor.password = hashed_password
            db.session.commit()
            return jsonify({"message": "Password updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email,
                                      "emailVerified": tutor.emailVerified}}), 201
        return jsonify({"error": "User not found"}), 400
    except:
        return jsonify({"error": "Password not updated"}), 400


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

    new_booking = Booking(student_id=student_id, tutor_id=tutor_id,
                          module_id=module_id, time=time, location=location, description=description)
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
