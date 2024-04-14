from app import app, db, sio, mail
from flask_socketio import emit, join_room
from app.models import Student, Tutor, Module, Booking, Report, Chat, Message, Review
from flask_mail import Message as EmailMessage
from flask import jsonify, request
from app.hash_pass import hash_data, verify_password
import jwt
import datetime
from functools import wraps
from config import Config
import random

# API Routes are instantiated here
# Each decorator such as @app.route defines an endpoint (such as /students) and a method for that endpoint
# The function below the decorator handles the data sent/received by the endpoint

secret_key = Config.SECRET_KEY
colours = ["#05A8AA", "#B8D5B8", "#FF9A8B", "#FF3D7F", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251",
           "#B163A3", "#DE5285", "#FAD02E", "#2E86AB", "#FF9F1C", "#EC610A", "#6A0572", "#AB83A1", "#CBAACB",
           "#EDC9AF", "#EF2D56", "#7851A9", "#F7CAC9", "#FE840E", "#FF6F61", "#5F4B8B", "#A2A2D0", "#DE8F6E",
           "#84DE02", "#B2BEB5", "#D8BFD8", "#FF91A4", "#DDA0DD", "#56A0D3", "#BFAFB2", "#808000", "#FF7E00"]

def token_required(allowed_user_type=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if 'x-access-token' in request.headers:
                token = request.headers['x-access-token']

            if not token:
                return jsonify({'error': 'Token is missing'}), 401

            try:
                data = jwt.decode(token, secret_key)
                current_user = None
                user_type = None

                current_user = Student.query.filter_by(
                    email=data['email']).first()
                user_type = "student"
                if not current_user:
                    current_user = Tutor.query.filter_by(
                        email=data['email']).first()
                    user_type = "tutor"

                if not current_user:
                    return jsonify({'error': "User not found"}), 401

                if allowed_user_type and user_type != allowed_user_type:
                    return jsonify({'error': "User not allowed"}), 401

            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired'}), 401

            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401

            return f(current_user, *args, **kwargs)
        return decorated
    return decorator

@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify({'students': [{'id': student.id,
                                  'first_name': student.first_name,
                                  'last_name': student.last_name,
                                  "profile_colour": student.profile_colour,
                                  'email': student.email} for student in students]})

@app.route('/students/<studentId>', methods=['GET'])
def get_student(studentId):
    student = Student.query.get(studentId)
    return jsonify({'student': {'id': student.id,
                                'first_name': student.first_name,
                                'last_name': student.last_name,
                                "profile_colour": student.profile_colour,
                                'email': student.email}})

@app.route('/add-student', methods=['POST'])
def create_student():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    if not email.endswith("@student.manchester.ac.uk"):
        return jsonify({"error": "Email must be a student email"}), 400
    password = data.get('password')
    hashed_password, salt = hash_data(password)
    id = generate_unique_id()
    profile_colour = random.choice(colours)

    try:
        existing_tutor = Tutor.query.filter_by(email=email).first()
        if existing_tutor:
            return jsonify({"error": "This email is already in use by a tutor."}), 401

        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"error": "This email is already in use by a student."}), 401

        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password) are required'}), 400

        new_student = Student(id=id, first_name=first_name, last_name=last_name, profile_colour=profile_colour,
                              email=email, password=hashed_password, salt=salt)

        db.session.add(new_student)
        db.session.commit()

        return jsonify({'message': 'Student created successfully',
                        'student': {'id': new_student.id,
                                    'first_name': new_student.first_name,
                                    'last_name': new_student.last_name,
                                    'email': new_student.email,
                                    "profile_colour": new_student.profile_colour}}), 201
    except Exception:
        return jsonify({'error': "Student not created"}), 400

@app.route("/login-student", methods=["POST"])
def login_student():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    print(email, password)

    try:
        student = Student.query.filter_by(email=email).first()
        if not student:
            return jsonify({"error": "Unsuccessful login"}), 401
        if not verify_password(password, student.salt, student.password):
            return jsonify({"error": "Incorrect email or password."}), 401
        token = jwt.encode({'email': student.email,
                            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           secret_key)
        return jsonify({"message": "This is a student successfully logging in",
                        'student': {'id': student.id,
                                    'first_name': student.first_name,
                                    'last_name': student.last_name,
                                    'email': student.email,
                                    "profile_colour": student.profile_colour,
                                    "token": token}}), 201
    except Exception:
        return jsonify({"error": "You are not a student. GET OUT."}), 500

@app.route("/login-tutor", methods=["POST"])
def login_tutor():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    try:
        tutor = Tutor.query.filter_by(email=email).first()
        if not tutor:
            return jsonify({"error": "Unsuccessful login"}), 401
        if not verify_password(password, tutor.salt, tutor.password):
            return jsonify({"error": "Incorrect email or password."}), 401
        token = jwt.encode({'email': tutor.email,
                            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           secret_key)
        return jsonify({"message": "This is a tutor successfully logging in",
                        'tutor': {'id': tutor.id,
                                  'first_name': tutor.first_name,
                                  'last_name': tutor.last_name,
                                  "profile_colour": tutor.profile_colour,
                                  'email': tutor.email,
                                  "token": token}}), 201
    except Exception:
        return jsonify({"error": "Internal service error."}), 500

@app.route('/tutors', methods=['GET'])
# @token_required(allowed_user_type="student")
def get_tutors():  # current_user
    tutors = Tutor.query.all()
    return jsonify({'tutors': [{'id': tutor.id,
                                'first_name': tutor.first_name,
                                'last_name': tutor.last_name,
                                'modules': format_modules(tutor.modules),
                                'year': tutor.year,
                                'description': tutor.description,
                                "profile_colour": tutor.profile_colour,
                                'email': tutor.email} for tutor in tutors]})

@app.route('/tutors/<tutorId>', methods=['GET'])
# @token_required
def get_tutor(tutorId):  # current_user, tutorId
    tutor = Tutor.query.get(tutorId)
    return jsonify({'tutor': {'id': tutor.id,
                              'first_name': tutor.first_name,
                              'last_name': tutor.last_name,
                              'year': tutor.year,
                              'modules': format_modules(tutor.modules),
                              'description': tutor.description,
                              "profile_colour": tutor.profile_colour,
                              'email': tutor.email}})

@app.route('/add-tutor', methods=['POST'])
def create_tutor():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    if not email.endswith("@student.manchester.ac.uk"):
        return jsonify({"error": "Email must be a student email"}), 400
    password = data.get('password')
    hashed_password, salt = hash_data(password)
    year = data.get('year')
    modules = ", ".join(data.get('modules'))
    description = ""
    id = generate_unique_id()
    profile_colour = random.choice(colours)

    try:
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"error": "This email is already in use by a student."}), 401

        existing_tutor = Tutor.query.filter_by(email=email).first()

        if existing_tutor:
            return jsonify({"error": "This email is already in use by a tutor."}), 401

        if not all([first_name, last_name, email, password]):
            return jsonify({'error': 'All fields (first_name, last_name, email, password, modules, year) are required'}), 400

        new_tutor = Tutor(id=id, first_name=first_name, last_name=last_name, email=email, modules=modules, password=hashed_password, year=year,
                            description=description, profile_colour=profile_colour, salt=salt)

        db.session.add(new_tutor)
        db.session.commit()

        return jsonify({'message': 'Tutor created successfully',
                        'tutor': {'id': new_tutor.id,
                                  'first_name': new_tutor.first_name,
                                  'last_name': new_tutor.last_name,
                                  'email': new_tutor.email,
                                  'profile_colour': new_tutor.profile_colour}}), 201

    except Exception:
        return jsonify({"error": "Tutor not created"}), 400

@app.route("/add-module", methods=["POST"])
# @token_required(allowed_user_type="tutor")
def add_module():  # current_user
    data = request.get_json()
    module_code = data.get("module_code")
    module_name = data.get("module_name")
    tutor_email = data.get("tutor_email")
    tutor = Tutor.query.filter_by(email=tutor_email).first()
    tutor_id = tutor.id

    try:
        if not all([module_code, module_name, tutor_id]):
            return jsonify({"error": "All fields (module_code, module_name, tutor_id) are required"}), 400

        new_module = Module(module_code=module_code,
                            module_name=module_name, tutor_id=tutor_id)
        db.session.add(new_module)
        db.session.commit()

        return jsonify({"message": "Module created successfully",
                        "module": {"id": new_module.id,
                                   "module_code": new_module.module_code,
                                   "module_name": new_module.module_name,
                                   "tutor_id": new_module.tutor_id}}), 201
    except Exception:
        return jsonify({"error": "Module not created"}), 400

@app.route('/edit-name', methods=["POST"])
# @token_required
def edit_name():  # current_user
    data = request.get_json()
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    user_id = data.get("user_id")

    try:
        student = Student.query.filter_by(id=user_id).first()
        if student:
            student.first_name = first_name
            student.last_name = last_name
            db.session.commit()
            return jsonify({"message": "Name updated successfully",
                            "student": {"id": student.id,
                                        "first_name": student.first_name,
                                        "last_name": student.last_name,
                                        "email": student.email}}), 201
        tutor = Tutor.query.filter_by(id=user_id).first()
        if tutor:
            tutor.first_name = first_name
            tutor.last_name = last_name
            db.session.commit()
            return jsonify({"message": "Name updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email}}), 201
        return jsonify({"error": "User not found"}), 400
    except Exception:
        return jsonify({"error": "Name not updated"}), 400

@app.route('/edit-email', methods=["POST"])
# @token_required
def edit_email():  # current_user
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
                                        "email": student.email}}), 201
        tutor = Tutor.query.filter_by(email=email).first()
        if tutor:
            tutor.email = new_email
            db.session.commit()
            return jsonify({"message": "Email updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email}}), 201
        return jsonify({"error": "User not found"}), 400
    except Exception:
        return jsonify({"error": "Email not updated"}), 400

@app.route('/edit-password', methods=["POST"])
# @token_required
def edit_password():  # current_user
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("new_password")
    hashed_password, salt = hash_data(new_password)

    try:
        student = Student.query.filter_by(email=email).first()
        if student:
            student.password = hashed_password
            student.salt = salt
            db.session.commit()
            return jsonify({"message": "Password updated successfully",
                            "student": {"id": student.id,
                                        "first_name": student.first_name,
                                        "last_name": student.last_name,
                                        "email": student.email}}), 201
        else:
            tutor = Tutor.query.filter_by(email=email).first()
            if tutor:
                tutor.password = hashed_password
                tutor.salt = salt
                db.session.commit()
                return jsonify({"message": "Password updated successfully",
                                "tutor": {"id": tutor.id,
                                        "first_name": tutor.first_name,
                                        "last_name": tutor.last_name,
                                        "email": tutor.email}}), 201
        return jsonify({"error": "User not found"}), 400
    except Exception:
        return jsonify({"error": "Password not updated"}), 400


@app.route('/edit-description', methods=["POST"])
# @token_required(allowed_user_type="tutor")
def edit_description():
    data = request.get_json()
    id = data.get("user_id")
    description = data.get("description")

    try:
        tutor = Tutor.query.filter_by(id=id).first()
        if tutor:
            tutor.description = description
            db.session.commit()
            return jsonify({"message": "Description updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email,
                                      "description": tutor.description}}), 201
        return jsonify({"error": "User not found"}), 400
    except Exception:
        return jsonify({"error": "Description not updated"}), 400

@app.route('/edit-modules', methods=["POST"])
# @token_required(allowed_user_type="tutor")
def edit_modules():
    data = request.get_json()
    id = data.get("user_id")
    modules = ", ".join(data.get("modules"))

    try:
        tutor = Tutor.query.filter_by(id=id).first()
        if tutor:
            tutor.modules = modules
            db.session.commit()
            return jsonify({"message": "Modules updated successfully",
                            "tutor": {"id": tutor.id,
                                      "first_name": tutor.first_name,
                                      "last_name": tutor.last_name,
                                      "email": tutor.email,
                                      "modules": tutor.modules}}), 201
        return jsonify({"error": "User not found"}), 400
    except Exception:
        return jsonify({"error": "Modules not updated"}), 400

@app.route('/modules', methods=['GET'])
# @token_required
def get_modules():  # current_user
    modules = Module.query.all()
    return jsonify({'modules': [{'id': module.id,
                                 'module_code': module.module_code,
                                 'module_name': module.module_name,
                                 'tutor_id': module.tutor_id}for module in modules]})

@app.route('/bookings', methods=['GET'])
# @token_required
def get_bookings():  # current_user
    bookings = Booking.query.all()
    return jsonify({'bookings': [{'id': booking.id,
                                  'student_id': booking.student_id,
                                  'tutor_id': booking.tutor_id,
                                  'module_id': booking.module_id,
                                  'time': booking.time,
                                  'location': booking.location,
                                  'description': booking.description}for booking in bookings]})

@app.route('/bookings', methods=['POST'])
# @token_required(allowed_user_type="student")
def create_bookings():  # current_user
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
                                 'user_reported': report.user_reported,
                                 'report_type': report.report_type,
                                 'description': report.description}for report in reports]})

@app.route('/create-report', methods=['POST'])
# @token_required
def create_reports():  # current_user
    data = request.get_json()
    print(data)

    student_id = data.get('student_id')
    tutor_id = data.get('tutor_id')
    user_reported = data.get('user_reported')
    report_type = data.get('report_type')
    description = data.get('description')

    if not all([student_id, tutor_id, user_reported, report_type, description]):
        return jsonify({'error': 'All fields (student_id, tutor_id, user_reported, report_type, description) are required'}), 400

    new_report = Report(student_id=student_id, tutor_id=tutor_id, user_reported=user_reported, report_type=report_type, description=description)
    print(new_report)
    db.session.add(new_report)
    db.session.commit()

    msg = EmailMessage(f"Report Against User #{user_reported}", sender=app.config["MAIL_USERNAME"], recipients=["year2yearmcr@gmail.com"], body=f"Report from user #{student_id if user_reported != student_id else tutor_id} against user #{user_reported}:\nType: {report_type}\nDescription: {description}")
    mail.send(msg)

    return jsonify({'message': 'Report created successfully',
                    'report': {'id': new_report.id,
                               'student_id': new_report.student_id,
                               'tutor_id': new_report.tutor_id,
                               "user_reported": new_report.user_reported,
                               "report_type": new_report.report_type,
                               "description": new_report.description}}), 201

@sio.on("message")
def handle_message(data):
    chat_id = data["chat_id"]
    sender_id = data["sender_id"]
    recipient_id = data["recipient_id"]
    sender_type = data["sender_type"]
    content = data["content"]
    timestamp_str = data["timestamp"]
    timestamp = datetime.datetime.fromisoformat(timestamp_str[:-1])
    new_message = Message(sender_id=sender_id, recipient_id=recipient_id, sender_type=sender_type, chat_id=chat_id, content=content, timestamp=timestamp)
    db.session.add(new_message)
    db.session.commit()
    timestamp_str = timestamp.isoformat()
    emit("message", {"sender_id": sender_id, "recipient_id": recipient_id, "sender_type": sender_type, "chat_id": chat_id, "content": content, "timestamp": timestamp_str}, room=chat_id)

@app.route("/get-messages/<int:chat_id>", methods=["GET"])
def get_messages(chat_id):
    messages = Message.query.filter_by(chat_id=chat_id).all()
    messages_data = [
        {"sender_id": message.sender_id, "recipient_id": message.recipient_id,
            "content": message.content, "timestamp": message.timestamp}
        for message in messages
    ]
    return jsonify({"messages": messages_data})

@app.route("/get-chats", methods=["GET"])
def get_user_chats():
    user_id = request.args.get('user_id')
    user_type = request.args.get('user_type')
    if user_type == "student":
        chats = Chat.query.filter_by(student_id=user_id).all()
    else:
        chats = Chat.query.filter_by(tutor_id=user_id).all()
    chat_data = [
        {"student_id": chat.student_id, "tutor_id": chat.tutor_id, "id":chat.id}
        for chat in chats
    ]
    return jsonify({"chats": chat_data})

@sio.on("chat")
def handle_chat(data):
    print(f"\nChat data received: {data}\n")
    student_id = data["student_id"]
    tutor_id = data["tutor_id"]
    chat = Chat.query.filter_by(
        student_id=student_id, tutor_id=tutor_id).first()
    if not chat:
        new_chat = Chat(student_id=student_id, tutor_id=tutor_id)
        db.session.add(new_chat)
        db.session.commit()
        chat = new_chat
    chat_id = chat.id
    join_room(chat_id)
    messages = Message.query.filter_by(chat_id=chat_id).all()
    messages_data = [
        {"sender_id": message.sender_id, "recipient_id": message.recipient_id,
            "content": message.content, "timestamp": message.timestamp.isoformat()}
        for message in messages
    ]
    emit("chat", {"chat_id": chat_id, "messages": messages_data}, room=chat_id)

@app.route("/get-user-details/<int:user_id>", methods=["GET"])
def get_user_type(user_id):
    student = Student.query.filter_by(id=user_id).first()
    if student:
        return jsonify({"user_type": "student",
                        "email": student.email,
                        "full_name": student.first_name + " " + student.last_name,
                        "profile_colour": student.profile_colour
                        })
    tutor = Tutor.query.filter_by(id=user_id).first()
    if tutor:
        return jsonify({"user_type": "tutor",
                        "email": tutor.email,
                        "full_name": tutor.first_name + " " + tutor.last_name,
                        "profile_colour": tutor.profile_colour
                        })
    return jsonify({"error": "User not found"}), 400

@app.route("/send-otp-to-existing-user", methods=["POST"])
def send_otp_to_existing_user():
    data = request.get_json()
    email = data.get("email")
    user = Student.query.filter_by(email=email).first()
    if not user:
        user = Tutor.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 400
    otp = str(random.randint(1000, 9999))
    user.otp = otp
    db.session.commit()
    msg = EmailMessage("Your OTP", sender=app.config["MAIL_USERNAME"], recipients=[email], body=f"Your OTP is {otp}")
    mail.send(msg)
    return jsonify({"otp": otp})

@app.route("/send-otp-to-new-user", methods=["POST"])
def send_otp_to_new_user():
    data = request.get_json()
    email = data.get("email")
    otp = str(random.randint(1000, 9999))
    msg = EmailMessage("Your OTP", sender=app.config["MAIL_USERNAME"], recipients=[email], body=f"Your OTP is {otp}")
    mail.send(msg)
    return jsonify({"otp": otp})

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.get_json()
    email = data.get("email")
    otp = data.get("otp")
    user = Student.query.filter_by(email=email).first()
    if not user:
        user = Tutor.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 400
    if user.otp == otp:
        user.otp = None
        db.session.commit()
        return jsonify({"message": "Email verified successfully"})
    return jsonify({"error": "Incorrect OTP"}), 400

@app.route("/add-review", methods=["POST"])
def add_review():
    data = request.get_json()
    student_id = data.get("student_id")
    tutor_id = data.get("tutor_id")
    rating = data.get("rating")
    description = data.get("description")

    if rating < 0.5 or rating > 5:
        return jsonify({"error": "Rating must be 1 to 5"}), 400

    existing_review = Review.query.filter_by(student_id=student_id, tutor_id=tutor_id).first()
    if existing_review:
        return jsonify({"error": "This student has already submitted a review for this tutor."}), 400

    # return jsonify({"student_id":student_id,
    #                 "tutor_id":tutor_id,
    #                 "rating":rating,
    #                 "description":description})

    try:
        # existing_review = Review.query.filter_by()
        # if existing_review:
        #     return jsonify({"error": "This review already exists"}), 401

        if not all([student_id, tutor_id, rating, description]):
            return jsonify({'error': 'All fields (student_id, tutor_id, rating, description) are required'}), 400

        new_review = Review(student_id=student_id, tutor_id=tutor_id, rating=rating, description=description)

        db.session.add(new_review)
        db.session.commit()

        return jsonify({'message': 'Review created successfully',
                        'review': {'id': new_review.id,
                                    'student_id': new_review.student_id,
                                    'tutor_id': new_review.tutor_id,
                                    'rating': new_review.rating,
                                    'description': new_review.description}}), 201

    except Exception as e:
        return jsonify({'error': 'Review could not be created', 'message': str(e)}), 400

@app.route("/get-reviews/<int:tutor_id>", methods=["GET"])
def get_reviews(tutor_id):
    reviews = Review.query.filter_by(tutor_id=tutor_id).all()
    for review in reviews:
        student = Student.query.filter_by(id=review.student_id).first()
        review.student_name = student.first_name + " " + student.last_name

    review_data = [
        {"student_name": review.student_name, "rating": review.rating,
         "description": review.description}
        for review in reviews
    ]
    return jsonify(review_data)


def format_modules(modules):
    modules = modules.split(", ")
    print(modules)
    return modules


def generate_unique_id():
    while True:
        new_id = random.randint(10000000, 99999999)
        if not Student.query.filter_by(id=new_id).first() and not Tutor.query.filter_by(id=new_id).first():
            return new_id

