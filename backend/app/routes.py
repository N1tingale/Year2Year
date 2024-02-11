from app import app, db
from app.models import Student, Tutor, Module
from flask import jsonify, request

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

@app.route('/students', methods=['POST'])
def create_student():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

    new_student = Student(first_name=first_name, last_name=last_name, email=email, password=password)

    db.session.add(new_student)
    db.session.commit()

    return jsonify({'message': 'Student created successfully',
                    'student': {'id': new_student.id,
                                'first_name': new_student.first_name,
                                'last_name': new_student.last_name,
                                'email': new_student.email}}), 201

@app.route('/tutors', methods=['GET'])
def get_tutors():
    tutors = Tutor.query.all()
    return jsonify({'tutors': [{'id': tutor.id,
                                'first_name': tutor.first_name,
                                'last_name': tutor.last_name,
                                'email': tutor.email} for tutor in tutors]})


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

    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400
    
    new_tutor = Tutor(first_name=first_name, last_name=last_name, email=email, password=password, year=year, \
                     contact_number=contact_number, description= description)
    
    db.session.add(new_tutor)
    db.session.commit()

@app.route('/modules', methods=['GET'])
def get_modules():
    modules = Module.query.all()
    return jsonify({'modules': [{'id': module.id,
                                 'module_code': module.module_code,
                                 'module_name': module.module_name,
                                 'tutor_id': module.tutor_id}for module in modules]})

# @app.route('/bookings', methods=['GET'])
# def get_bookings():
