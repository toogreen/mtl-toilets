# Loocal — Montréal Public Washroom Finder

A bilingual (French/English) static map of public washrooms listed by the City of Montréal. French is the default language. The bundled snapshot includes 320 locations across parks, libraries, pools, community centres, and other public facilities.

## Open the app

Open `index.html` in a browser and use the language button in the header to switch between French and English. No build step, package install, or local server is required. An internet connection is needed to load the map tiles and external fonts.

## Install on a phone

The app is a Progressive Web App (PWA). Visit its HTTPS website on your phone, then use the **Installer** button for device-specific instructions:

- **iPhone/iPad:** In Safari, tap Share, then **Add to Home Screen**.
- **Android:** In Chrome, open the menu and choose **Install app** or **Add to Home Screen**.

After the first online visit, the app and location list are available offline. Map tiles still need an internet connection. Opening the HTML file directly is useful for trying the site, but installing a PWA requires HTTPS (or localhost during development).

## Data

The bilingual bundled location snapshot is in `washrooms-data.js` and was generated on October 5, 2026 from the [City of Montréal public facilities dataset](https://donnees.montreal.ca/dataset/lieux-batiments-vocation-publique). It includes places where the city lists washroom accessibility information. Most records include their city-published French and English names, details, and links. To refresh the snapshot, use the English and French CSV files from the dataset.

Venue access rules and washroom hours can vary. The city dataset does not confirm washroom-specific admission costs, so check the linked venue details before visiting. The city data is available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Credits

- Location and accessibility data: [Ville de Montréal open data](https://donnees.montreal.ca/dataset/lieux-batiments-vocation-publique)
- Map tiles: [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), displayed using Leaflet
