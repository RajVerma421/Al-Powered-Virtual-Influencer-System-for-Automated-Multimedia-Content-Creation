# AI-Powered Virtual Influencer System

An intelligent platform for automated multimedia content creation—generating AI-driven scripts, text-to-speech audio, and professional-quality videos for social media platforms.

---

## Overview

The AI-Powered Virtual Influencer System is a full-stack AI application that enables users to create high-quality multimedia content for social media platforms such as Instagram Reels, YouTube Shorts, TikTok, and advertisements. The system utilizes advanced AI technologies, including Large Language Models (LLMs), neural text-to-speech, and video generation, to streamline and automate the entire content creation pipeline.

### Key Capabilities

- Intelligent Script Generation – AI-driven content creation using the Mistral LLM
- Natural Voice Synthesis – Converts scripts into realistic, natural-sounding audio
- Professional Video Production – Generates dynamic videos with animated avatars
- Multi-Platform Support – Creates content tailored for Reels, Shorts, TikTok, and posts
- Secure Authentication – Ensures safe user registration with password hashing and session management

---

## Architecture

```
                                    ┌─────────────┐
                                    │   BROWSER   │
                                    └──────┬──────┘
                                           │ HTTPS
                                           ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                      FLASK APPLICATION SERVER                              │
│                                                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    ROUTING LAYER                                    │   │
│   │  /  /login  /register  /profile  /generate_script  /logout       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                    │
│         ┌─────────────────────────────┼─────────────────────────────┐       │
│         │                            │                            │       │
│         ▼                            ▼                            ▼       │
│   ┌───────────┐              ┌───────────┐              ┌───────────┐   │
│   │  AUTH     │              │  CONTENT  │              │  OUTPUT   │   │
│   │  SERVICE │              │ PIPELINE   │              │  SERVICE │    │
│   │          │              │           │              │           │    │
│   │ - Login  │              │ - Script │              │ - Audio  │   │
│   │ - Register              │ - TTS   │              │ - Video  │   │
│   │ - Session              │ - Video │              │ - Render │   │
│   │ - Profile              │         │              │           │   │
│   └───────────┘              └─────┬─────┘              └───────────┘   │
│                                    │                                    │
│         ┌──────────────────────────┼──────────────────────────┐        │
│         │                          │                          │        │
│         ▼                          ▼                          ▼        │
│   ┌───────────┐              ┌───────────┐              ┌───────────┐  │
│   │  OLLAMA   │              │   gTTS    │              │  MOVIEPY  │  │
│   │ Mistral  │              │ SpeechT5  │              │ Renderer  │  │
│   │   LLM    │              │  TTS      │              │           │  │
│   └───────────┘              └───────────┘              └───────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend Framework
| Component | Technology | Purpose |
|-----------|------------|---------|
| Web Server | Flask | HTTP routing and request handling |
| ORM | SQLAlchemy | Database operations |
| Authentication | Flask-Login | Session management |
| Password Hashing | Flask-Bcrypt | Secure password storage |
| Form Validation | Flask-WTF | Input validation and CSRF protection |

### AI/ Machine Learning
| Component | Technology | Purpose |
|-----------|------------|---------|
| LLM | Ollama (Mistral 7B) | Script generation |
| Framework | LangChain | LLM orchestration |
| TTS | gTTS | Google Text-to-Speech |
| Neural TTS | Microsoft SpeechT5 | Neural voice synthesis |
| Video Processing | MoviePy | Video rendering and editing |

### Database
| Component | Technology | Purpose |
|-----------|------------|---------|
| Database | SQLite | User data storage |
| ORM | SQLAlchemy | Database abstraction |

### Frontend
| Component | Technology | Purpose |
|-----------|------------|---------|
| Templates | Jinja2 | Server-side rendering |
| Styling | Custom CSS3 | Responsive design |
| Interactivity | Vanilla JavaScript | Client-side functionality |
| Font | Inter | Typography |

---

## Project Structure

```
AI-Powered-Virtual-Influencer-System/
│
├── app.py                         # Main Flask application
│                                   # - Route handlers
│                                   # - Database models
│                                   # - Configuration
│
├── Script_generator.py           # AI Script Generation Module
│   ├── get_model()               # Initialize Ollama connection
│   ├── is_illegal_content()      # Content safety filtering
│   ├── remove_emojis()           # Output cleaning
│   ├── Script()                   # Main generation function
│   └── generate_fallback_script() # Template fallback
│
├── video_generator.py            # Video Production Module
│   ├── make_frame()             # Frame rendering
│   ├── create_video()            # Main video creation
│   └── create_dynamic_video()     # Dynamic video wrapper
│
├── tts_local.py                  # Text-to-Speech Module
│   └── text_to_speech()          # Audio generation
│
├── avatar_generator.py           # Avatar Generation Module
│   └── generate_avatar()         # Talking avatar (SadTalker)
│
├── splitText.py                  # Text Processing Utilities
���
��── model_loader.py               # Model Loading Utilities
│
├── requirements.txt              # Python dependencies
│
├── templates/                    # HTML Templates
│   ├── index.html               # Home & Content Generator
│   ├── login.html              # User Login
│   ├── register.html           # User Registration
│   └── profile.html           # Profile Management
│
├── static/                       # Static Assets
│   ├── style.css               # Complete styling (~2200 lines)
│   └── script.js             # Client-side JavaScript
│
└── output/                      # Generated Content
    ├── audio/                 # Audio files
    └── final_video.mp4        # Generated video
```

---

## Features

### 1. Intelligent Script Generation

The system leverages Ollama with the Mistral 7B model to generate contextually relevant scripts based on user input. Key features include:

- Topic-Based Generation – Produces scripts tailored to user-defined topics
- Tone Selection – Supports a variety of tones (Excited, Motivational, Funny, Serious, Inspirational)
- **Content Type Optimization** - Generates platform-specific content
- **Safety Filtering** - Automatically blocks inappropriate content requests
- **Fallback System** - Template-based generation when LLM is unavailable

### 2. Text-to-Speech Conversion

Converts generated scripts to audio using dual engine support:

- **Primary Engine** - gTTS (Google Text-to-Speech)
  - Fast processing
  - Multiple language support
  - Reliable quality

- **Neural Engine** - Microsoft SpeechT5
  - Natural-sounding voice
  - Deep learning based
  - High fidelity output

### 3. Professional Video Production

Generates vertical-format videos optimized for social media:

- **Resolution** - 720x1280 (9:16 aspect ratio)
- **Frame Rate** - 18 FPS
- **Format** - MP4 (H.264 video, AAC audio)
- **Features**:
  - Animated avatar with lip synchronization
  - Dynamic gradient background
  - Animated text overlays
  - Background music integration

### 4. User Authentication System

Complete authentication pipeline with security best practices:

- **Registration** - Username, email, password with validation
- **Password Requirements**:
  - Minimum 8 characters
  - At least one uppercase
  - At least one lowercase
  - At least one number
  - At least one special character
- **Login** - Session-based authentication
- **Profile Management** - Update personal information
- **Account Deletion** - Permanent account removal

### 5. Content Platform Support

| Platform | Content Type | Audio | Video |
|----------|-------------|-------|-------|
| Instagram Reel | Short video | Yes | Yes |
| YouTube Short | Short video | Yes | Yes |
| TikTok | Short video | Yes | Yes |
| Instagram Post | Static post | No | No |
| Advertisement | Promotional | Yes | Yes |

---

## API Endpoints

### Authentication Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|-----------------|
| `/` | GET | Home page | Not required |
| `/register` | GET, POST | Create new account | Not required |
| `/login` | GET, POST | User login | Not required |
| `/logout` | GET | User logout | Required |

### Content Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|-----------------|
| `/generate_script` | POST | Generate content | Required |
| `/video/` | GET | Serve video file | Required |

### Profile Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|-----------------|
| `/profile` | GET, POST | View/update profile | Required |
| `/delete_account` | POST | Delete account | Required |

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    phone VARCHAR(20),
    location VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    is_admin BOOLEAN DEFAULT 0
);
```

---

## Security Features

### Authentication Security
- **Password Hashing** - Bcrypt with salt
- **Session Management** - Flask-Login with secure cookies
- **Session Lifetime** - 1 hour permanent sessions

### Request Security
- **CSRF Protection** - Flask-WTF tokens on all forms
- **Rate Limiting** - 10 requests per 5 minutes per user
- **Input Validation** - Server-side validation

### Content Security
- **Illegal Content Filter** - Blocks inappropriate topics
- **Keyword Blocking** - Filters dangerous keywords
- **Safety Check** - Prevents harmful content generation

### Server Security
- **Secure Headers**:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security: max-age=31536000
  - Content-Security-Policy

---

## Installation

### Prerequisites

- Python 3.8+
- pip package manager
- FFmpeg (for video processing)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RajVerma421/ml_project.git
   cd ml_project
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   ```

3. **Activate Virtual Environment**
   ```bash
   # Linux/MacOS
   source venv/bin/activate
   
   # Windows
   venv\Scripts\activate
   ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///users.db
   FLASK_DEBUG=true
   PORT=5000
   SECURITY_PASSWORD_SALT=your-salt-here
   ```

6. **Run the Application**
   ```bash
   python app.py
   ```

7. **Access the Application**
   ```
   http://127.0.0.1:5000
   ```

### Ollama Setup (Optional)

For enhanced script generation:
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull Mistral model
ollama pull mistral
```

---

## Usage Guide

### Step 1: Registration

1. Navigate to `/register`
2. Fill in the registration form:
   - **Username** - Choose a unique username
   - **Email** - Enter a valid email address
   - **Password** - Create a strong password
3. Click "Create Account"
4. Redirected to login page

### Step 2: Login

1. Navigate to `/login`
2. Enter username and password
3. Click "Sign In"
4. Redirected to home page with generator access

### Step 3: Generate Content

1. **Enter Topic** - What content topic you want to create about
2. **Select Platform** - Choose content destination:
   - Instagram Reel
   - YouTube Short
   - TikTok
   - Instagram Post
   - Advertisement
3. **Choose Tone** - Select emotional tone:
   - Excited
   - Motivational
   - Funny
   - Serious
   - Inspirational
4. Click "Generate Content"

### Step 4: View/Download Results

- **Script** - Copy generated script text
- **Audio** - Listen to generated audio (except Posts)
- **Video** - Watch/download video (Reel/Short/TikTok/Advertisement)

### Step 5: Profile Management

Navigate to `/profile` to:
- Update personal information (name, bio, location, phone)
- Change password
- Delete account

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| SECRET_KEY | Flask secret key | Auto-generated |
| DATABASE_URL | Database connection | sqlite:///users.db |
| FLASK_DEBUG | Debug mode | false |
| PORT | Server port | 5000 |
| SECURITY_PASSWORD_SALT | Password salt | dev-salt |

### Application Configuration

```python
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['WTF_CSRF_TIME_LIMIT'] = None
app.config['PERMANENT_SESSION_LIFETIME'] = 3600
```

---

## Troubleshooting

### Common Issues

#### 1. Ollama Connection Error
```
Error: Ollama not available
```
**Solution**: System automatically falls back to template-based generation. For LLM support, install and run Ollama with Mistral model.

#### 2. Audio Generation Fails
```
Error: Could not generate audio
```
**Solution**: Ensure FFmpeg is installed and available in system PATH.

#### 3. Video Generation Fails
```
Error: Failed to create final video
```
**Solution**:
- Check FFmpeg installation
- Verify output directory permissions
- Ensure sufficient disk space

#### 4. Database Error
```
Error: Database locked
```
**Solution**: Ensure no other processes are accessing the SQLite database file.

#### 5. Session Expired
```
Error: Please sign in to continue
```
**Solution**: Log in again. Session lifetime is 1 hour.

---

## Dependencies

### Core Dependencies
```
flask
flask-login
flask-sqlalchemy
flask-bcrypt
flask-wtf
wtforms
email-validator
```

### AI/ML Dependencies
```
langchain
langchain-core
langchain-community
langchain-ollama
transformers
torch
sentence-transformers
```

### Media Dependencies
```
moviepy
imageio-ffmpeg
gtts
soundfile
sentencepiece
```

### Utility Dependencies
```
python-dotenv
numpy
pandas
gunicorn
```

---

## Performance Specifications

| Metric | Value |
|--------|-------|
| Video Resolution | 720x1280 |
| Video Aspect Ratio | 9:16 |
| Video Frame Rate | 18 FPS |
| Video Format | MP4 |
| Audio Format | MP3 |
| Script Max Length | 300 characters |
| Topic Max Length | 200 characters |
| Rate Limit | 10 requests/5 minutes |

---

## Frontend Documentation

For detailed frontend documentation including:
- Page structure
- CSS styling
- JavaScript functionality
- Component specifications

See [FRONTEND.md](./FRONTEND.md)

---

## License

MIT License

---

## Author

Raj Verma

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Acknowledgments

- Ollama - LLM infrastructure
- LangChain - AI framework
- MoviePy - Video processing
- Flask - Web framework
- Google - Text-to-Speech
