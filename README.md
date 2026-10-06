# Loocal — Montréal Public Washroom Finder

A static, browser-based map of public washrooms listed by the City of Montréal. The bundled snapshot includes 320 locations across parks, libraries, pools, community centres, and other public facilities.

## Open the app

Open `index.html` in a browser. No build step, package install, or local server is required. An internet connection is needed to load the map tiles and external fonts.

## Data

The bundled location snapshot is in `washrooms-data.js` and was generated on October 5, 2026 from the [City of Montréal public facilities dataset](https://donnees.montreal.ca/dataset/lieux-batiments-vocation-publique). It includes places where the city lists washroom accessibility information. To refresh it, download the English CSV from the dataset and regenerate the snapshot in the same format.

Venue access rules and washroom hours can vary. The city dataset does not confirm washroom-specific admission costs, so check the linked venue details before visiting. The city data is available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Credits

- Location and accessibility data: [Ville de Montréal open data](https://donnees.montreal.ca/dataset/lieux-batiments-vocation-publique)
- Map tiles: [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), displayed using Leaflet
