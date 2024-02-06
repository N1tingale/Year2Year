from app import app, db
from app.models import Student
from flask import jsonify, request

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