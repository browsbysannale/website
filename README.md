# Brows By Sanna Le - Website

This is the official website for Brows By Sanna Le, a brow salon in Leander, Texas. The website has been converted from React JSX to pure HTML, CSS, and JavaScript for better performance and easier deployment.

## 🚀 Live Website

The website is automatically deployed to GitHub Pages and can be accessed at: [https://browsbysannale.com](https://browsbysannale.com)

## 📁 Project Structure

```
brows-site/
├── src/
│   ├── styles.css          # Custom CSS styles
│   ├── script.js           # JavaScript functionality
│   ├── main.jsx            # React entry point
│   └── App.jsx             # React component
├── public/
│   ├── images/             # Image assets
│   └── CNAME               # Custom domain configuration
├── dist/                   # Built files (auto-generated)
├── index.html              # Main HTML file
└── package.json            # Dependencies and scripts
```

## 🛠️ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with rose/pink color scheme
- **Interactive Elements**: Mobile menu, smooth scrolling, hover effects
- **Google Reviews Integration**: Optional API integration for live reviews
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Optimized**: Proper meta tags and semantic structure

## 🚀 Deployment

The website is automatically deployed using GitHub Actions:

1. **Automatic Build**: When changes are pushed to the `main` branch
2. **GitHub Pages**: Built files are automatically deployed to GitHub Pages
3. **Custom Domain**: Configured with `browsbysannale.com`

### Manual Deployment

To build and deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview locally
npm run preview
```

## 🎨 Customization

### Colors

The color scheme uses a rose/pink palette. To change colors, edit the CSS variables in `src/styles.css`:

```css
.bg-rose-500 {
  background-color: #f43f5e; /* Change this value */
}
```

### Content

Update the following in `index.html`:

- Business name and tagline
- Services and pricing
- Contact information
- Google Form URL for bookings
- Instagram handle

### Images

Replace placeholder images in `public/images/`:

- `brow-before.jpg` - Before treatment photo
- `brow-after.jpg` - After treatment photo
- `sanna-portrait.jpg` - Sanna's portrait photo

## 🔧 Google Reviews API

To enable live Google reviews:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API
3. Add your API key to the page by setting:
   ```javascript
   window.__GOOGLE_MAPS_API_KEY__ = "your-api-key-here";
   ```

## 📱 Mobile Features

- Responsive navigation with hamburger menu
- Touch-friendly buttons and links
- Floating "Book Now" button on mobile
- Optimized layout for small screens

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for title, description, and keywords
- Canonical URL
- Structured data ready for implementation
- Alt text for images
- Proper heading hierarchy

## ♿ Accessibility Features

- ARIA labels on interactive elements
- Focus states for keyboard navigation
- Screen reader friendly structure
- Color contrast compliance
- Semantic HTML elements

## 📊 Analytics Integration

The JavaScript includes tracking functions for:

- Booking button clicks
- Page load performance
- Google Analytics (if configured)
- Facebook Pixel (if configured)

## 🛠️ Development

### Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **CSS**: Add styles to `src/styles.css`
2. **JavaScript**: Add functionality to `src/script.js`
3. **HTML**: Update `index.html` with new content
4. **Images**: Add to `public/images/` directory

## 📞 Support

For issues or questions:

1. Check browser console for JavaScript errors
2. Verify all file paths are correct
3. Test in different browsers
4. Check mobile responsiveness

## 📄 License

This code is provided as-is for the Brows By Sanna Le website. Please ensure you have proper licensing for any third-party assets or APIs used.

---

**Built with ❤️ for Brows By Sanna Le**
