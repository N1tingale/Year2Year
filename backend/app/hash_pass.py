import hashlib
import secrets

def generate_salt():
    return secrets.token_hex(16)

def hash_data(password, salt=None):
    if not salt:
        salt = generate_salt()
    return hashlib.sha512((password + salt).encode()).hexdigest(), salt

def verify_password(password, salt, hash):
    return hash_data(password, salt)[0] == hash
