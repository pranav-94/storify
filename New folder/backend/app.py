from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, logout_user
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from huggingface_hub import InferenceClient
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SECRET_KEY'] = 'Storysecretekey'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_KEY")
jwt = JWTManager(app)

login_manager = LoginManager()
login_manager.init_app(app)


# client = InferenceClient(
#   provider="together",
#   api_key="")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"message": "Missing required fields"}), 400
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"message": "Missing required fields"}), 400
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"message": f"Welcome {user.username} to your dashboard"}), 200
    return jsonify({"message": "User not found"}), 404

@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"message": "Successfully logged out"}), 200






# @app.route('/api/fetchData', methods=['POST'])
# def fetchData():
#     try:
#         # Get data from request body
#         data = request.get_json()
        
#         # Extract values from data
#         language = data.get('language')
#         geners = [data.get('geners[0]'), data.get('geners[1]')]  # Changed to match your JSON format
#         plot = data.get('plot')
        
#         prompt = f"Write a {language} story in the {geners[0]} and {geners[1]} genres based on this plot: {plot}"
        
#         messages = [
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
        
#         completion = client.chat.completions.create(
#             model="mistralai/Mistral-7B-Instruct-v0.3",
#             messages=messages,
#             max_tokens=1000
#         )
        
#         result = completion.choices[0].message.content
        
#         return jsonify({"message": result})
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400



@app.route('/api/fetchData', methods=['POST'])
def fetchData():
    try:
        # Get data from request body
        data = request.get_json()
        
        # Extract values from data
        language = data.get('language')
        genres = data.get('geners', [])  # Get full list directly
        plot = data.get('plot')

        if not language or not genres or not plot:
            return jsonify({"error": "Missing required fields"}), 400

        # Format genres properly
        genre_text = " and ".join(genres[:2])  # Use first two genres if available
        
        # Create prompt
        prompt = f"Write a {language} story in the {genre_text} genres based on this plot: {plot} keep it short and simple"

        # Send request to Gemini API
        model = genai.GenerativeModel("gemini-pro")  # Use Gemini Pro model
        response = model.generate_content(prompt)

        # Extract response text
        result = response.text if response.text else "No response generated."

        return jsonify({"message": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400




if __name__ == '__main__':
    app.run(debug=True, port=5000)


    