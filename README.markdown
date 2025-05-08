# Norway Explorer

## Overview
Norway Explorer is a responsive HTML website designed to promote Norway's tourism. It features a video hero section, destination and activity cards, a YouTube video showcase, and internationalization support. Built with modern CSS, JavaScript, Font Awesome, and Google Fonts for an engaging user experience.

## Features
- **Responsive Navigation**: Hamburger menu for mobile devices with links to Home, Destinations, Activities, Culture, and more.
- **Video Hero**: Autoplaying background video showcasing Norway's landscapes.
- **Destination Cards**: Highlights key locations (e.g., Geirangerfjord, Trolltunga) with images, descriptions, and tags.
- **Activity Cards**: Showcases activities (e.g., Northern Lights Hunt, Fjord Cruises) with details and booking links.
- **Video Section**: Embedded YouTube video promoting Norway's fjords.
- **Internationalization**: `data-i18n` attributes for multilingual support via `translations.js`.
- **Social Media Links**: Connects to Facebook, Instagram, and Twitter (placeholders).
- **Footer**: Includes quick links, social media, and copyright information.

## Requirements
- Web browser (e.g., Chrome, Firefox, Safari)
- Internet connection for external resources:
  - Font Awesome (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`)
  - Google Fonts (`Poppins`)
  - YouTube iframe API
- Local assets:
  - `css/styles.css`
  - `js/script.js`
  - `js/translations.js`
  - `videos/4910875_Mountain_Ridge_1280x720.mp4`
  - `images/` (e.g., `geirangerfjord.jpg`, `trolltunga.jpg`)

## Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Ensure the required assets are in place:
   - `css/styles.css`: Main stylesheet.
   - `js/script.js`: Main JavaScript for interactivity.
   - `js/translations.js`: JavaScript for internationalization.
   - `videos/4910875_Mountain_Ridge_1280x720.mp4`: Hero background video.
   - `images/`: Images for destination and activity cards.
3. Host the site on a web server (e.g., Apache, Nginx) or open `index.html` directly:
   ```bash
   python -m http.server 8000
   ```
4. Access the site at `http://localhost:8000`.

## Usage
1. Open the website in a browser to view the homepage.
2. **Interface**:
   - **Navigation**: Use the menu to explore sections or pages (e.g., Culture, Gallery).
   - **Hero Section**: View the background video and click buttons to jump to Destinations or Activities.
   - **Highlights**: Read about Norway's nature, northern lights, adventures, and culture.
   - **Destinations**: Browse cards for locations with images, tags, and best visit times.
   - **Activities**: Explore activity cards with details like duration and difficulty.
   - **Video Section**: Watch a YouTube video about Norway’s fjords.
   - **Footer**: Access quick links or follow social media.
3. **Actions**:
   - Toggle the hamburger menu on mobile devices.
   - Click "Explore More" or "Book Experience" links (placeholders) for details.
   - Scroll down to view more content, guided by the scroll indicator.

## File Structure
- `index.html`: Homepage with hero, highlights, destinations, activities, and footer.
- `css/styles.css`: Custom styles for layout, responsiveness, and animations.
- `js/script.js`: JavaScript for interactivity (e.g., hamburger menu, scroll effects).
- `js/translations.js`: JavaScript for multilingual text rendering.
- `videos/4910875_Mountain_Ridge_1280x720.mp4`: Hero background video.
- `images/`: Images for cards (e.g., `geirangerfjord.jpg`, `northern_lights_hunt.jpg`).
- `README.md`: This file, providing project documentation.

## Notes
- The `js/translations.js` file is assumed to handle internationalization for `data-i18n` attributes.
- The `js/script.js` file is assumed to manage interactivity (e.g., hamburger menu toggle).
- Placeholder links (e.g., "Explore More", social media) require backend integration for functionality.
- The background video should be optimized for web to reduce load times.
- Ensure CORS support for external resources if hosted on a server.
- The site assumes static content; dynamic features (e.g., booking) need additional backend setup.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, open an issue on GitHub or contact the repository owner.