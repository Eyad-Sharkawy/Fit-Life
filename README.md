# FITlife - Your Fitness Journey

A comprehensive fitness and nutrition platform that helps users achieve their health goals through personalized workout routines and nutrition plans.

## Project Structure

```
FITlife/
├── index.html              # Main HTML file
├── css/                    # Stylesheets directory
│   ├── main.css           # Global styles and resets
│   ├── components.css     # Reusable UI components
│   └── sections.css       # Page section-specific styles
├── js/                     # JavaScript directory
│   └── main.js            # Main JavaScript file for interactivity
├── assets/                 # Assets directory
│   └── images/            # Image files (placeholders for now)
├── package.json            # Project configuration
└── README.md               # Project documentation
```

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and modern interface with smooth animations
- **Multiple Sections**:
  - Hero section with Arabic language support
  - About Us section
  - Success stories
  - Workout services (Cardio, Strength, Mobility)
  - Nutrition and diet plans
  - BMI calculator section
  - Team showcase
  - Pricing plans
  - Footer with social links

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (optional, for running a local server)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

### Running with a Local Server (Optional)

If you have Node.js installed, you can run a local development server:

```bash
npm install
npm start
```

Or use any other local server tool like:
- Python: `python -m http.server 8000`
- PHP: `php -S localhost:8000`

## File Organization

### CSS Files

- **main.css**: Contains global styles, resets, and base typography
- **components.css**: Reusable components like buttons, cards, navigation, footer
- **sections.css**: Section-specific styles for hero, about, services, nutrition, BMI, team, pricing

### JavaScript

- **main.js**: Contains all interactive functionality including:
  - Smooth scrolling
  - Story slider
  - Recipe slider
  - Scroll animations
  - Button event handlers

## Customization

### Colors

The main color scheme uses:
- Primary gradient: `#FFA500` to `#FFD700` (Orange to Gold)
- Background: `#f5f5f5` (Light gray)
- Dark: `#1a1a1a` (Almost black)
- Footer: `#2a2a3a` (Dark blue-gray)

### Adding Images

Place your images in the `assets/images/` directory and update the references in the HTML/CSS files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- BMI calculator functionality
- User signup/login system
- Dynamic content loading
- Backend integration
- Payment processing for plans

## License

This project is private and proprietary.

