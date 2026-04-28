# Backend Documentation

Detailed technical documentation for the backend implementation of AI-Powered Virtual Influencer System.

---

## Backend Architecture

```
                                    ┌─────────────┐
                                    │   BROWSER   │
                                    └──────┬──────┘
                                           │ HTTP/HTTPS
                                           ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                    FLASK APPLICATION SERVER                      │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐    │
│   │                 ROUTING & VIEWS                       │    │
│   │   home()  register()  login()  profile()           │    │
│   │   generate_script()  logout()  delete_account()    │    │
│   │   serve_video()                                 │    │
│   └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│   ┌──────────────────────┼──────────────────────────┐        │
│   │                     │                         │        │
│   ▼                     ▼                         ▼        │
│ ┌───────────┐     ┌───────────┐           ┌───────────┐   │
│ │  AUTH    │     │  CONTENT │           │  OUTPUT   │   │
│ │ SERVICE │     │ PIPELINE │           │  HANDLER  │   │
│ │         │     │         │           │           │   │
│ │ Login   │     │ Script  │           │ Audio    │   │
│ │ Register│     │ TTS    │           │ Video    │   │
│ │ Session│     │ Video  │           │ Static   │   │
│ └────┬────┘     └────┬────┘           └────┬────┘   │
│      │               │                    │          │
│      ▼               ▼                    ▼          │
│ ┌───────────┐  ┌───────────┐       ┌───────────┐          │
│ │  OLLAMA   │  │   gTTS    │       │  MOVIEPY │          │
│ │ Mistral   │  │SpeechT5  │       │ Renderer │          │
│ └───────────┘  └───────────┘       └───────────┘          │
└────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Web Framework | Flask | latest | HTTP routing |
| ORM | SQLAlchemy | latest | Database |
| Auth | Flask-Login | latest | Sessions |
| Hashing | Flask-Bcrypt | latest | Password security |
| Forms | Flask-WTF | latest | Validation |
| LLM | Ollama | latest | Script generation |
| Framework | LangChain | latest | AI orchestration |
| TTS | gTTS | latest | Text-to-speech |
| Video | MoviePy | latest | Video rendering |

---

## Project Files

### app.py - Main Application

**Location**: `D:\Project\ml_project\app.py`

**Lines**: 369

**Purpose**: Core Flask application with routes, configuration, database models

#### Configuration

```python
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(32).hex())
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['WTF_CSRF_TIME_LIMIT'] = None
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT', 'dev-salt-change-in-production')
app.config['PERMANENT_SESSION_LIFETIME'] = 3600
```

#### Database Model

```python
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    full_name = db.Column(db.String(100), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
```

#### Routes

| Function | Endpoint | Methods | Auth | Description |
|----------|-----------|---------|------|-------------|
| home | `/` | GET | No | Home page |
| register | `/register` | GET, POST | No | User registration |
| login | `/login` | GET, POST | No | User login |
| logout | `/logout` | GET | Yes | Logout user |
| profile | `/profile` | GET, POST | Yes | Profile management |
| delete_account | `/delete_account` | POST | Yes | Delete account |
| generate_script | `/generate_script` | POST | Yes | Generate content |
| serve_video | `/video/` | GET | Yes | Serve video |

#### Rate Limiting

```python
def rate_limit(max_requests=10, window=60):
    """Decorator for rate limiting"""
    # 10 requests per window (seconds)
```

---

### Script_generator.py - Script Generation

**Location**: `D:\Project\ml_project\Script_generator.py`

**Lines**: 170

**Purpose**: AI-powered script generation using Ollama with Mistral model

#### Functions

```python
def get_model()
    """Initialize and return Ollama model"""
    # Returns: OllamaLLM instance or False

def is_illegal_content(topic, content_type)
    """Check for inappropriate content"""
    # Returns: Boolean

def remove_emojis(text)
    """Remove emojis from text output"""
    # Returns: String

def Script(content_type, topic, emotion)
    """Main script generation function"""
    # Returns: String (generated script)

def generate_fallback_script(content_type, topic, emotion)
    """Template-based fallback"""
    # Returns: String
```

#### Illegal Content Keywords

```python
ILLEGAL_KEYWORDS = [
    "hack", "hacker's", "crack", "drug", "drugs", "bomb", "bombs", 
    "weapon", "weapons", "explosive", "explosives", "poison", "poisons",
    "kill", "killing", "murder", "attack", "terrorist", "terrorism",
    "fraud", "scam", "phishing", "malware", "virus", "ransomware",
    "stolen", "theft", "steal", "illegal", "pirated", "fake",
    "counterfeit", "money", "child", "children", "abuse", "abusive",
    "explicit", "porn", "pornography", "nude", "naked", "nsfw",
    "sex", "weapon", "gun", "guns", "ammo", "bullet", "isis",
    "racist", "hate", "discriminat", "discrimination", "suicide",
    "self-harm", "cutting", "eating disorder", "anorexia", "bulimia",
    "pro-ana", "pro-mia", "extremist", "white supremac", "nazi",
    "neo-nazi", "pedophil", "pedo", "grooming"
]
```

#### Usage

```python
from Script_generator import Script

script = Script(
    content_type="Reel",
    topic="healthy eating",
    emotion="Excited"
)
# Returns: Generated script text
```

---

### video_generator.py - Video Generation

**Location**: `D:\Project\ml_project\video_generator.py`

**Lines**: 221

**Purpose**: Generate dynamic videos with animated avatar

#### Functions

```python
def make_frame(text, w, h, t, char_idx, lines_data)
    """Generate single video frame"""
    # Returns: NumPy array (frame)

def create_video(text, audio_file, output_path, w, h, fps)
    """Main video creation"""
    # Returns: String (path to video)

def create_dynamic_video(script, audio_file, output_path, width, height, fps)
    """Wrapper function"""
    # Returns: String (path to video)
```

#### Video Specifications

| Parameter | Value |
|-----------|-------|
| Width | 720 pixels |
| Height | 1280 pixels |
| Aspect Ratio | 9:16 |
| Frame Rate | 18 FPS |
| Format | MP4 |
| Codec | libx264 |

#### Dependencies

```python
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoClip, AudioFileClip
import math
```

#### Usage

```python
from video_generator import create_dynamic_video

video_path = create_dynamic_video(
    script="Your generated script",
    audio_file="output/audio.mp3",
    output_path="output/final_video.mp4"
)
# Returns: Path to generated video
```

---

### tts_local.py - Text-to-Speech

**Location**: `D:\Project\ml_project\tts_local.py`

**Lines**: 79

**Purpose**: Convert text to speech using gTTS or SpeechT5

#### Functions

```python
def text_to_speech(text, filename, use_gtts=True)
    """Convert text to audio"""
    # Returns: String (path to audio)
```

#### TTS Engines

| Engine | Priority | Model |
|--------|----------|-------|
| Primary | 1 | gTTS (Google) |
| Fallback | 2 | SpeechT5 |

#### Usage

```python
from tts_local import text_to_speech

audio_path = text_to_speech(
    text="Your script text",
    filename="static/audio.mp3",
    use_gtts=True
)
# Returns: Path to audio file
```

---

### avatar_generator.py - Avatar Generation

**Location**: `D:\Project\ml_project\avatar_generator.py`

**Lines**: 26

**Purpose**: Generate talking avatar using SadTalker

#### Functions

```python
def generate_avatar(audio_path, image_path, output_dir)
    """Generate talking avatar video"""
    # Returns: String (path to video)
```

#### Note

Requires SadTalker installation. Currently a wrapper implementation.

---

### splitText.py - Text Processing

**Location**: `D:\Project\ml_project/splitText.py`

**Purpose**: Split text into manageable chunks for processing

---

## Data Flow

### Content Generation Pipeline

```
1. USER INPUT
   - topic: "healthy eating"
   - type: "Reel"
   - emotion: "Excited"

2. VALIDATION (app.py)
   - Check authentication
   - Rate limit check
   - Input validation

3. SCRIPT GENERATION (Script_generator.py)
   - Content filter check
   - LLM call (Ollama)
   - Output cleaning

4. TEXT PROCESSING (splitText.py)
   - Split into chunks
   - Process each chunk

5. TTS CONVERSION (tts_local.py)
   - Convert each chunk to audio
   - Merge audio files

6. VIDEO GENERATION (video_generator.py)
   - Create frames
   - Render video
   - Merge audio

7. OUTPUT
   - Return script text
   - Serve audio file
   - Serve video file
```

---

## Security Implementation

### Password Hashing

```python
# Registration
hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

# Login
bcrypt.check_password_hash(user.password, password)
```

### CSRF Protection

```html
<input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
```

### Rate Limiting

```python
@rate_limit(max_requests=10, window=300)
def generate_script():
    # 10 requests per 5 minutes
```

### Content Filtering

```python
if is_illegal_content(topic, content_type):
    return "Sorry, I cannot generate content for this request."
```

---

## Database Operations

### Create Database

```python
with app.app_context():
    db.create_all()
```

### Create User

```python
user = User(
    username=username,
    email=email,
    password=hashed_password
)
db.session.add(user)
db.session.commit()
```

### Query User

```python
user = User.query.filter_by(username=username).first()
user = User.query.get(user_id)
```

### Update User

```python
current_user.full_name = request.form.get('full_name')
db.session.commit()
```

### Delete User

```python
db.session.delete(current_user)
db.session.commit()
```

---

## Session Management

### Login User

```python
login_user(user, remember=True)
session.permanent = True
```

### Logout User

```python
logout_user()
```

### Load User

```python
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
```

---

## Error Handling

### Error Types

| Error | Handling |
|-------|----------|
| Ollama unavailable | Use fallback templates |
| Video generation fails | Log error, return None |
| Audio generation fails | Log error, use first chunk |
| Database error | Flash message, redirect |
| Authentication error | Flash message, redirect |
| Rate limit exceeded | Redirect to home |

### Logging

```python
try:
    # Operation
except Exception as e:
    print(f"Error: {e}")
    # Handle error
```

---

## Dependencies

### Core

```
flask
flask-login
flask-sqlalchemy
flask-bcrypt
flask-wtf
wtforms
email-validator
```

### AI/ML

```
langchain
langchain-core
langchain-community
langchain-ollama
transformers
torch
sentence-transformers
```

### Media

```
moviepy
imageio-ffmpeg
gtts
soundfile
sentencepiece
numpy
Pillow
```

### Utilities

```
python-dotenv
gunicorn
```

---

## Configuration Variables

| Variable | Required | Default |
|----------|----------|---------|
| SECRET_KEY | No | Auto-generated |
| DATABASE_URL | No | sqlite:///users.db |
| FLASK_DEBUG | No | false |
| PORT | No | 5000 |
| SECURITY_PASSWORD_SALT | No | dev-salt |

---

## Testing

### Manual Testing

```bash
# Start server
python app.py

# Test endpoints
curl http://127.0.0.1:5000/
curl http://127.0.0.1:5000/register
curl http://127.0.0.1:5000/login
```

---

## Performance

| Operation | Time |
|-----------|------|
| Script generation | 2-5 seconds |
| TTS conversion | 1-3 seconds |
| Video generation | 5-15 seconds |
| Total pipeline | 10-25 seconds |

---

## Known Limitations

1. Ollama must be running for LLM scripts
2. FFmpeg required for video processing
3. SQLite not suitable for production
4. No async processing
5. Single-threaded execution
6. No CDN integration

---

## Future Improvements

1. Async task queue (Celery)
2. Production database (PostgreSQL)
3. Caching layer (Redis)
4. CDN for media files
5. Multiple LLM support
6. Video templates
7. Avatar customization
8. Batch processing

---

## License

MIT License