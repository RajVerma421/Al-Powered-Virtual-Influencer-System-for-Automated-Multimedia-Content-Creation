# Frontend Documentation

## Overview

Frontend for AI-Powered Virtual Influencer System - a modern, responsive web interface built with custom CSS and vanilla JavaScript.

## Tech Stack

- **HTML5** - Semantic templates with Jinja2 (Flask)
- **CSS3** - Custom styling with CSS variables, animations
- **JavaScript** - Vanilla JS (no frameworks)
- **Font** - Inter (Google Fonts)

---

## File Structure

```
templates/
├── index.html         # Home page with content generator
├── login.html       # User login
├── register.html    # User registration
└── profile.html    # User profile management

static/
├── style.css        # All styles (~2200 lines)
└── script.js       # Client-side functionality
```

---

## Pages

### 1. Home Page (`index.html`)

**Purpose**: Main landing page with content generation form

**Sections**:
- **Navigation**: Logo, nav links, auth buttons
- **Hero**: System title, description, stats
- **Generator Card**: Content creation form (locked if not logged in)
- **Features**: AI feature cards

**Key Elements**:

| Element | Class | Description |
|---------|-------|-------------|
| Navbar | `.navbar` | Fixed top navigation |
| Hero | `.hero` | Main hero section |
| Stats | `.hero-stats` | System statistics |
| Generator | `.generator-card` | Content form |
| Locked Card | `.locked-card` | Unauthenticated state |
| Result | `.result` | Generated output |
| Video Player | `.video-result` | Video display |
| Features | `.features` | Feature cards |

**Form Fields**:
```html
<input name="topic" placeholder="Topic / Idea">
<select name="type">
    <option value="Reel">Instagram Reel</option>
    <option value="Post">Instagram Post</option>
    <option value="YouTube Short">YouTube Short</option>
    <option value="TikTok">TikTok</option>
    <option value="Advertisement">Advertisement</option>
</select>
<select name="emotion">
    <option value="Excited">Excited</option>
    <option value="Motivational">Motivational</option>
    <option value="Funny">Funny</option>
    <option value="Serious">Serious</option>
    <option value="Inspirational">Inspirational</option>
</select>
```

**States**:
- Unauthenticated: Shows locked card with sign-in prompts
- Authenticated: Shows generator form
- Generating: Shows progress overlay
- Complete: Shows result with script/video

---

### 2. Login Page (`login.html`)

**Purpose**: User authentication

**Elements**:
- Logo with brand name
- Welcome message
- Username input
- Password input with toggle visibility
- Sign In button
- Link to register

**Form**:
```html
<form method="POST" action="/login">
    <input name="username" placeholder="Username" required>
    <input name="password" type="password" placeholder="Password" required>
    <button type="submit">Sign In</button>
</form>
```

---

### 3. Register Page (`register.html`)

**Purpose**: New user registration

**Elements**:
- Logo with brand name
- Welcome message
- Username input
- Email input
- Password input with toggle visibility
- Create Account button
- Link to login

**Form**:
```html
<form method="POST" action="/register">
    <input name="username" placeholder="Username" required>
    <input name="email" type="email" placeholder="Email address" required>
    <input name="password" type="password" placeholder="Password" required>
    <button type="submit">Create Account</button>
</form>
```

**Password Requirements**:
- Minimum 8 characters
- At least one uppercase
- At least one lowercase
- At least one number
- At least one special character

---

### 4. Profile Page (`profile.html`)

**Purpose**: User profile management

**Elements**:
- User avatar with initial
- Username, email, member since date
- Tab navigation:
  - Personal Info
  - Security
  - Delete Account
- Back button to home

**Tabs**:

**Personal Info Tab**:
```html
<input name="full_name" placeholder="Your full name">
<input name="location" placeholder="City, Country">
<input name="phone" placeholder="+91 98765 43210">
<input name="email" placeholder="email@example.com">
<textarea name="bio" placeholder="Tell us about yourself"></textarea>
```

**Security Tab**:
```html
<input name="current_password" placeholder="Enter current password">
<input name="new_password" placeholder="Enter new password">
```

**Delete Tab**:
```html
<input name="current_password" placeholder="Enter your password to confirm">
<button type="submit">Delete My Account</button>
```

---

## Styling

### CSS Variables (`style.css`)

```css
:root {
    --primary: linear-gradient(135deg, #6366f1, #8b5cf6);
    --primary-solid: #6366f1;
    --secondary: #14b8a6;
    --accent: #f43f5e;
    --bg: #f8fafc;
    --bg-white: #ffffff;
    --bg-gray: #f1f5f9;
    --text: #0f172a;
    --text-secondary: #64748b;
    --text-light: #94a3b8;
    --border: #e2e8f0;
    --success: #22c55e;
    --radius: 12px;
    --shadow: 0 4px 20px rgba(0,0,0,0.08);
    --shadow-lg: 0 10px 40px rgba(0,0,0,0.12);
}
```

### Key Styles

**Layout**:
- Max content width: 1200px
- Section padding: 80px vertical
- Card padding: 34px
- Border radius: 12-22px

**Colors**:
- Primary: Indigo gradient (#6366f1 → #8b5cf6)
- Success: Green (#22c55e)
- Danger: Red (#f43f5e)
- Accent: Teal (#14b8a6)

**Animations**:
- `slideDown`: Navbar entrance
- `slideUp`: Card entrance
- `pulseAnim`: Icon pulse
- `waveAnim`: Avatar wave
- `float`: Background shapes
- `spin`: Loading spinner

### Responsive Breakpoints

```css
@media (max-width: 768px) {
    .hero-title { font-size: 38px; }
    .hero-stats { gap: 32px; }
    .features-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .auth-card { padding: 32px 24px; }
}
```

---

## JavaScript

### Functions (`script.js`)

| Function | Description |
|----------|-------------|
| `formatDuration(seconds)` | Format video duration |
| `copyToClipboard()` | Copy script to clipboard |
| `togglePassword(button)` | Toggle password visibility |

### Event Listeners

**Form Submission**:
- Shows generating overlay
- Updates progress steps (Script → Audio → Video)
- Disables submit button

**Video Loaded**:
- Updates video duration display

### Usage

```javascript
// Copy script
copyToClipboard();

// Toggle password visibility
togglePassword(this);

// Format duration
formatDuration(125); // returns "2:05"
```

---

## Components

### Navigation Bar

- Fixed position
- Glass-morphism effect (backdrop blur)
- Responsive: auth state changes links
- Animated logo with gradient

### Generator Form

| State | Description |
|-------|-------------|
| Locked | Sign in prompt |
| Form | Input fields |
| Generating | Progress overlay |
| Result | Script/video output |

### Alert Messages

```html
<div class="alert alert-success">Success message</div>
<div class="alert alert-danger">Error message</div>
```

### Feature Cards

Three cards showing:
1. AI Script Generator
2. Neural Text-to-Speech  
3. Video Production

Each with:
- Icon
- Title
- Description
- Tags

---

## Visual Effects

### Background

- Mesh gradient (radial ellipses)
- Floating animated shapes
- Responsive z-index layering

### Cards

- Soft shadows
- Top gradient border
- Hover animations (lift + border)

### Buttons

- Gradient background
- Hover lift
- Active scale
- Loading spinner

### Form Inputs

- Border transitions
- Focus glow
- Numeric steppers

---

## Integration

### Flask Template Variables

```html
<!-- User state -->
{{ current_user.is_authenticated }}
{{ current_user.username }}
{{ current_user.email }}
{{ csrf_token() }}

<!-- Results -->
{{ script }}
{{ video_file }}
{{ url_for('serve_video', filename=video_file) }}

<!-- Flash messages -->
{% with messages = get_flashed_messages(with_categories=true) %}
{% for category, message in messages %}
```

### API Integration

**Form Action**:
```html
<form method="POST" action="/generate_script">
```

**Video Source**:
```html
<video>
    <source src="{{ url_for('serve_video', filename=video_file) }}">
</video>
```

---

## Browser Support

- Chrome/Edge (recent)
- Firefox (recent)
- Safari (recent)

**Requirements**:
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS Animations
- Clipboard API
- Backdrop Filter (for glass effect)

---

## Performance

- No external JS libraries
- Minimal CSS (~2200 lines, compressed)
- SVG icons inline
- Lazy loading for videos

---

## Accessibility

- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation
- Focus states
- Color contrast (WCAG AA)

---

## Customization

### Changing Colors

Edit CSS variables in `style.css`:
```css
:root {
    --primary-solid: #your-color;
    --secondary: #your-color;
    --accent: #your-color;
}
```

### Adding Features

Add new option to select:
```html
<option value="YourFeature">Your Feature</option>
```

### Modifying Animations

Adjust keyframe durations:
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}
```

---

## Troubleshooting

### Glass Effect Not Working

Use fallback:
```css
.navbar {
    background: rgba(255, 255, 255, 0.85);
    /* backdrop-filter: blur(20px); */ /* Optional */
}
```

### Icons Not Rendering

Ensure SVG namespace is correct:
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
```

### Form Not Submitting

Check CSRF token:
```html
<input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
```
