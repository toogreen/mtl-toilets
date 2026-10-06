"use strict";

const DEFAULT_CENTER = [45.535, -73.59];

const translations = {
  fr: {
    brandLabel: "Loocal — toilettes à Montréal",
    topbarNote: "Un petit coin de soulagement, tout près",
    languageButton: "English",
    languageTarget: "Basculer en anglais",
    aboutLink: "À propos",
    heroFirst: "Besoin d’y aller ?",
    heroSecond: "On a la carte.",
    heroDescription: "Trouvez des toilettes publiques dans les parcs, bibliothèques, piscines et autres lieux de la Ville.",
    stampTop: "C’EST",
    stampBottom: "PARTI",
    finderLabel: "Trouver des toilettes publiques",
    searchPlaceholder: "Rechercher un lieu, un quartier ou une adresse",
    districtLabel: "Filtrer par arrondissement",
    allDistricts: "Tous les arrondissements",
    nearMe: "Près de moi",
    locating: "Localisation…",
    cityListed: "Toilettes répertoriées par la Ville",
    filterNote: "Parcs, bibliothèques, piscines et plus · accès à vérifier",
    nearbyHeading: "À proximité",
    listLabel: "Emplacements des toilettes",
    sortLabel: "Trier par nom de lieu",
    loading: "Recherche des toilettes à proximité…",
    loadError: "Impossible de charger les données de lieux de la Ville.",
    retry: "Réessayer",
    mapLabel: "Carte des toilettes publiques",
    mapApplicationLabel: "Carte interactive des toilettes publiques",
    mapCredits: "Carte ©",
    legendWashroom: "Toilettes publiques",
    legendClosed: "Fermées temporairement",
    footerHeading: "Toilettes répertoriées par la Ville · données du 5 octobre 2026.",
    footerText: "L’accès aux parcs est gratuit; d’autres lieux peuvent avoir leurs propres heures ou frais d’entrée. Vérifiez avant de partir.",
    sourceText: "Données de localisation et d’accessibilité : Ville de Montréal",
    searchHeading: "Aucun lieu trouvé",
    searchHelp: "Essayez un autre nom de lieu ou arrondissement.",
    locationHoursMissing: "Heures non indiquées — vérifiez avant de partir",
    seasonalHours: "Horaire saisonnier — consultez les détails du lieu",
    hoursVary: "Horaire variable — vérifiez avant de partir",
    today: "Aujourd’hui",
    closed: "Fermé",
    closedLocation: "Lieu temporairement fermé",
    accessible: "Toilettes accessibles",
    directions: "Itinéraire",
    placeInfo: "Détails du lieu",
    spotOne: "lieu",
    spotMany: "lieux",
    sortedNearby: "Triés par distance de votre position",
    acrossTown: "Lieux publics partout à Montréal",
    finding: "Chargement des lieux…",
    dataUnavailable: "Données indisponibles",
    mapUnavailable: "Carte indisponible",
    locationNotSupported: "Géolocalisation non prise en charge",
    locationDenied: "Accès à la position refusé",
    locationUnavailable: "Position indisponible",
    sortAscending: "A–Z",
    sortDescending: "Z–A",
    installApp: "Installer",
    installTitle: "Emportez Loocal avec vous",
    installDescription: "Ajoutez l’application à votre écran d’accueil pour la retrouver facilement, même hors ligne.",
    installStepOne: "Sur iPhone, touchez Partager dans Safari. Sur Android, ouvrez le menu ⋮ de Chrome.",
    installStepTwo: "Choisissez « Sur l’écran d’accueil » ou « Installer l’application ».",
    installStepThree: "Confirmez en appuyant sur « Ajouter » ou « Installer ».",
    installOfflineNote: "La liste des lieux fonctionne hors ligne après votre première visite. La carte nécessite une connexion Internet.",
    installNow: "Installer l’application",
    closeDialog: "Fermer",
    appInstalled: "Application installée",
  },
  en: {
    brandLabel: "Loocal — Montréal washrooms",
    topbarNote: "A little relief, around the corner",
    languageButton: "Français",
    languageTarget: "Switch language to French",
    aboutLink: "About",
    heroFirst: "Nature calls.",
    heroSecond: "We’ve got a map.",
    heroDescription: "Find public washrooms in parks, libraries, pools, and other city facilities.",
    stampTop: "GOOD TO",
    stampBottom: "GO",
    finderLabel: "Find public washrooms",
    searchPlaceholder: "Search a place, neighbourhood, or address",
    districtLabel: "Filter by borough",
    allDistricts: "All boroughs",
    nearMe: "Near me",
    locating: "Locating…",
    cityListed: "City-listed washrooms",
    filterNote: "Parks, libraries, pools & more · check venue access",
    nearbyHeading: "Nearby spots",
    listLabel: "Washroom locations",
    sortLabel: "Sort by place name",
    loading: "Finding nearby washrooms…",
    loadError: "We couldn’t load the city’s location data.",
    retry: "Try again",
    mapLabel: "Map of public washrooms",
    mapApplicationLabel: "Interactive map showing washroom locations",
    mapCredits: "Map ©",
    legendWashroom: "Public washroom",
    legendClosed: "Temporarily closed",
    footerHeading: "City-listed public washrooms · data snapshot October 5, 2026.",
    footerText: "Park entry is free; other venues may have their own access hours or admission rules. Check before heading out.",
    sourceText: "Location & accessibility data by Ville de Montréal",
    searchHeading: "No places found",
    searchHelp: "Try another place name or borough.",
    locationHoursMissing: "Hours not listed — check before you go",
    seasonalHours: "Seasonal hours — check venue details",
    hoursVary: "Hours vary — check before you go",
    today: "Today",
    closed: "Closed",
    closedLocation: "Location temporarily closed",
    accessible: "Accessible washroom",
    directions: "Directions",
    placeInfo: "Place details",
    spotOne: "spot",
    spotMany: "spots",
    sortedNearby: "Sorted by distance from your location",
    acrossTown: "Public facilities across Montréal",
    finding: "Finding washrooms…",
    dataUnavailable: "Data unavailable",
    mapUnavailable: "Map unavailable",
    locationNotSupported: "Location not supported",
    locationDenied: "Location access denied",
    locationUnavailable: "Location unavailable",
    sortAscending: "A–Z",
    sortDescending: "Z–A",
    installApp: "Install",
    installTitle: "Take Loocal with you",
    installDescription: "Add the app to your home screen so it’s easy to find, even when you’re offline.",
    installStepOne: "On iPhone, tap Share in Safari. On Android, open Chrome’s ⋮ menu.",
    installStepTwo: "Choose “Add to Home Screen” or “Install app.”",
    installStepThree: "Confirm by tapping “Add” or “Install.”",
    installOfflineNote: "The location list works offline after your first visit. The map requires an internet connection.",
    installNow: "Install app",
    closeDialog: "Close",
    appInstalled: "App installed",
  },
};

const state = {
  allPlaces: [],
  filteredPlaces: [],
  markers: new Map(),
  map: null,
  markerLayer: null,
  selectedId: null,
  userLocation: null,
  sortAscending: true,
  language: "fr",
};

const elements = {
  search: document.querySelector("#search"),
  district: document.querySelector("#district-filter"),
  count: document.querySelector("#results-count"),
  list: document.querySelector("#place-list"),
  caption: document.querySelector("#list-caption"),
  error: document.querySelector("#error-state"),
  retry: document.querySelector("#retry-button"),
  locate: document.querySelector("#locate-button"),
  sort: document.querySelector("#sort-button"),
  language: document.querySelector("#language-button"),
  install: document.querySelector("#install-button"),
  installDialog: document.querySelector("#install-dialog"),
  installConfirm: document.querySelector("#install-confirm"),
};

let deferredInstallPrompt = null;

const icons = {
  pin: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s6-5.4 6-9.8a6 6 0 1 0-12 0C4 12.6 10 18 10 18Z"/><circle cx="10" cy="8" r="2"/></svg>',
  clock: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.6 1.6"/></svg>',
  accessibility:
    '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="3.5" r="1.5"/><path d="M5.5 7h8M9 7 7.5 12l3 1.5 1.5 3M7.5 12l-2 4m8-9 1 4h-4"/></svg>',
};

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function text(key) {
  return translations[state.language][key];
}

function localized(place, field) {
  return (state.language === "fr" && place.fr?.[field]) || place[field];
}

function applyTranslations() {
  const language = translations[state.language];
  document.documentElement.lang = state.language;
  document.title = state.language === "fr" ? "Toilettes à Montréal — Loocal" : "Washroom Finder — Montréal";
  document.querySelector('meta[name="description"]').content =
    state.language === "fr"
      ? "Trouvez les toilettes publiques répertoriées par la Ville de Montréal : parcs, bibliothèques, piscines et autres lieux."
      : "Find city-listed public washrooms across Montréal, including parks, libraries, pools, and community facilities.";

  for (const element of document.querySelectorAll("[data-i18n]")) {
    const translation = language[element.dataset.i18n];
    if (translation) element.textContent = translation;
  }
  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    const translation = language[element.dataset.i18nAriaLabel];
    if (translation) element.setAttribute("aria-label", translation);
  }
  for (const element of document.querySelectorAll("[data-i18n-title]")) {
    const translation = language[element.dataset.i18nTitle];
    if (translation) element.title = translation;
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    const translation = language[element.dataset.i18nPlaceholder];
    if (translation) element.placeholder = translation;
  }

  elements.language.textContent = text("languageButton");
  elements.language.setAttribute("aria-label", text("languageTarget"));
  elements.install.querySelector("span").textContent = text("installApp");
  elements.installConfirm.querySelector("span").textContent = text("installNow");
  elements.installDialog.querySelector(".install-dialog-close").setAttribute("aria-label", text("closeDialog"));
  elements.district.options[0].textContent = text("allDistricts");
  elements.sort.innerHTML = `${state.sortAscending ? text("sortAscending") : text("sortDescending")} <span aria-hidden="true">↕</span>`;
  elements.count.textContent = state.allPlaces.length
    ? `${state.filteredPlaces.length} ${state.filteredPlaces.length === 1 ? text("spotOne") : text("spotMany")}`
    : text("finding");
}

function setLanguage(language) {
  if (!translations[language] || state.language === language) return;
  state.language = language;
  applyTranslations();

  try {
    localStorage.setItem("loocal-language", language);
  } catch {
    // File-based pages may not expose local storage.
  }

  if (state.allPlaces.length) {
    state.markers.clear();
    state.allPlaces.forEach(createMarker);
    fillDistricts();
    render();
  }
}

function formatHours(hours) {
  if (!hours) return text("locationHoursMissing");
  const day = new Intl.DateTimeFormat("en", { weekday: "long" })
    .format(new Date())
    .toLowerCase();
  const frenchDay = {
    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    saturday: "samedi",
    sunday: "dimanche",
  }[day];
  const matches = [...hours.matchAll(new RegExp(`${frenchDay}\\s+(\\d{2}:\\d{2})-(\\d{2}:\\d{2})`, "gi"))];
  if (matches.length) {
    const times = matches.map((match) => `${match[1]}–${match[2]}`);
    if (new Set(times).size > 1) return text("seasonalHours");
    return `${text("today")} ${[...new Set(times)].join(" / ")}`;
  }
  return text("hoursVary");
}

function initMap() {
  if (!window.L) {
    throw new Error("The map library could not be loaded.");
  }

  state.map = L.map("map", {
    zoomControl: false,
    scrollWheelZoom: false,
  }).setView(DEFAULT_CENTER, 11);
  L.control.zoom({ position: "topright" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "",
    maxZoom: 19,
  }).addTo(state.map);
  state.markerLayer = L.featureGroup().addTo(state.map);
}

function createMarker(place) {
  const icon = L.divIcon({
    className: `toilet-marker${place.isClosed ? " is-closed" : ""}`,
    html: `<span class="toilet-marker-inner">${icons.accessibility}</span>`,
    iconSize: [32, 39],
    iconAnchor: [16, 35],
    popupAnchor: [0, -33],
  });
  const marker = L.marker([place.latitude, place.longitude], { icon });
  marker.on("click", () => selectPlace(place.id, false));

  const popup = document.createElement("div");
  popup.className = "map-popup";
  const name = document.createElement("strong");
  name.textContent = localized(place, "name");
  const location = document.createElement("span");
  location.textContent = [
    localized(place, "districts").join(" · "),
    place.isClosed ? text("closedLocation") : formatHours(localized(place, "hours")),
  ].join(" · ");
  popup.append(name, location);
  const sourceUrl = localized(place, "sourceUrl") || place.sourceUrl;
  if (sourceUrl) {
    const link = document.createElement("a");
    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = `${text("placeInfo")} ↗`;
    popup.append(link);
  }
  marker.bindPopup(popup);
  state.markers.set(place.id, marker);
  return marker;
}

function addText(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function createCard(place) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "place-card";
  card.dataset.placeId = place.id;
  const name = localized(place, "name");
  const addressText = localized(place, "address");
  card.setAttribute("aria-label", `${name}, ${addressText}`);

  const top = document.createElement("span");
  top.className = "place-card-top";
  addText(top, "h3", "", name);
  const placeTag = place.isClosed ? text("closed") : localized(place, "facility");
  addText(
    top,
    "span",
    `park-tag${place.isClosed ? " closed" : ""}`,
    placeTag,
  );
  card.append(top);

  const address = document.createElement("span");
  address.className = "place-address";
  address.innerHTML = icons.pin;
  addText(
    address,
    "span",
    "",
    `${addressText} · ${localized(place, "districts").join(" · ")}`,
  );
  card.append(address);

  const hours = document.createElement("span");
  hours.className = "place-hours";
  hours.innerHTML = icons.clock;
  addText(
    hours,
    "span",
    "",
    place.isClosed ? text("closedLocation") : formatHours(localized(place, "hours")),
  );
  card.append(hours);

  const actions = document.createElement("span");
  actions.className = "card-actions";
  const access = document.createElement("span");
  access.className = "accessibility-label";
  access.innerHTML = icons.accessibility;
  addText(access, "span", "", text("accessible"));
  actions.append(access);

  const directions = document.createElement("a");
  directions.className = "directions-link";
  directions.href = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude}%2C${place.longitude}`;
  directions.target = "_blank";
  directions.rel = "noreferrer";
  directions.textContent = `${text("directions")} ↗`;
  directions.addEventListener("click", (event) => event.stopPropagation());
  actions.append(directions);

  const sourceUrl = localized(place, "sourceUrl") || place.sourceUrl;
  if (sourceUrl) {
    const venueLink = document.createElement("a");
    venueLink.className = "venue-link";
    venueLink.href = sourceUrl;
    venueLink.target = "_blank";
    venueLink.rel = "noreferrer";
    venueLink.textContent = `${text("placeInfo")} ↗`;
    venueLink.addEventListener("click", (event) => event.stopPropagation());
    actions.append(venueLink);
  }
  card.append(actions);

  card.addEventListener("click", () => selectPlace(place.id, true));
  return card;
}

function selectPlace(id, panToMarker) {
  state.selectedId = id;
  for (const card of elements.list.querySelectorAll(".place-card")) {
    card.classList.toggle("selected", card.dataset.placeId === id);
  }
  const marker = state.markers.get(id);
  if (marker && panToMarker) {
    state.map.setView(marker.getLatLng(), Math.max(state.map.getZoom(), 14), { animate: true });
    marker.openPopup();
  }
}

function distanceInKm(first, second) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDifference = radians(second.latitude - first.latitude);
  const longitudeDifference = radians(second.longitude - first.longitude);
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(radians(first.latitude)) *
      Math.cos(radians(second.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function render() {
  const query = normalizeText(elements.search.value.trim());
  const district = elements.district.value;
  let places = state.allPlaces.filter((place) => {
    const searchable = normalizeText([
      place.name,
      place.address,
      place.districts.join(" "),
      place.facility,
      place.category,
      place.fr?.name,
      place.fr?.address,
      place.fr?.districts?.join(" "),
      place.fr?.facility,
      place.fr?.category,
    ].join(" "));
    return (!query || searchable.includes(query)) && (!district || place.districts.includes(district));
  });

  if (state.userLocation) {
    places.sort(
      (first, second) =>
        Number(first.isClosed) - Number(second.isClosed) ||
        distanceInKm(state.userLocation, first) - distanceInKm(state.userLocation, second),
    );
  } else {
    places.sort(
      (first, second) =>
        Number(first.isClosed) - Number(second.isClosed) ||
        (state.sortAscending
          ? localized(first, "name").localeCompare(localized(second, "name"), state.language)
          : localized(second, "name").localeCompare(localized(first, "name"), state.language)),
    );
  }

  state.filteredPlaces = places;
  elements.list.replaceChildren();
  state.markerLayer.clearLayers();

  if (!places.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    addText(empty, "strong", "", text("searchHeading"));
    addText(empty, "span", "", text("searchHelp"));
    elements.list.append(empty);
  } else {
    const fragment = document.createDocumentFragment();
    for (const place of places) {
      fragment.append(createCard(place));
      const marker = state.markers.get(place.id);
      if (marker) state.markerLayer.addLayer(marker);
    }
    elements.list.append(fragment);
  }

  elements.count.textContent = `${places.length} ${places.length === 1 ? text("spotOne") : text("spotMany")}`;
  elements.caption.textContent = state.userLocation
    ? text("sortedNearby")
    : text("acrossTown");
  elements.list.setAttribute("aria-busy", "false");

  if (places.length) {
    const bounds = state.markerLayer.getBounds();
    if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
  }
}

function fillDistricts() {
  const selected = elements.district.value;
  const districts = [...new Set(state.allPlaces.flatMap((place) => place.districts))]
    .filter(Boolean)
    .sort((first, second) => first.localeCompare(second, state.language));
  elements.district.replaceChildren(elements.district.options[0]);
  for (const district of districts) {
    const option = document.createElement("option");
    option.value = district;
    const example = state.allPlaces.find((place) => place.districts.includes(district));
    const districtIndex = example.districts.indexOf(district);
    option.textContent =
      state.language === "fr" ? example.fr?.districts?.[districtIndex] || district : district;
    elements.district.append(option);
  }
  elements.district.value = selected;
}

function loadPlaces() {
  elements.error.hidden = true;
  elements.list.setAttribute("aria-busy", "true");
  elements.list.replaceChildren();
  const loading = document.createElement("div");
  loading.className = "loading-state";
  const spinner = document.createElement("span");
  spinner.className = "loading-spinner";
  spinner.setAttribute("aria-hidden", "true");
  loading.append(spinner);
  addText(loading, "span", "", text("loading"));
  elements.list.append(loading);
  elements.count.textContent = text("finding");

  try {
    const places = window.WASHROOM_DATA;
    if (!Array.isArray(places)) throw new Error("The bundled city location data is unavailable.");
    if (!places.length) throw new Error("The city dataset contained no matching locations.");

    state.allPlaces = places.map((place) => ({
      ...place,
      districts: Array.isArray(place.districts) && place.districts.length ? place.districts : ["Montréal"],
      accessibility: place.accessibility || "",
      hours: place.hours || "",
      facility: place.facility || "Public facility",
      isClosed: Boolean(place.isClosed),
    }));
    state.markers.clear();
    state.markerLayer.clearLayers();
    state.allPlaces.forEach(createMarker);
    fillDistricts();
    render();
  } catch (error) {
    console.error("Unable to read bundled Montreal washroom data:", error);
    elements.count.textContent = text("dataUnavailable");
    elements.list.replaceChildren();
    elements.list.setAttribute("aria-busy", "false");
    elements.error.hidden = false;
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    elements.count.textContent = text("locationNotSupported");
    return;
  }

  elements.locate.disabled = true;
  elements.locate.querySelector("span").textContent = text("locating");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      state.userLocation = { latitude: coords.latitude, longitude: coords.longitude };
      elements.locate.querySelector("span").textContent = text("nearMe");
      elements.locate.disabled = false;
      state.selectedId = null;
      render();
      if (state.filteredPlaces.length) {
        const nearest = state.filteredPlaces[0];
        const marker = state.markers.get(nearest.id);
        if (marker) {
          state.map.setView(marker.getLatLng(), 14, { animate: true });
          marker.openPopup();
          selectPlace(nearest.id, false);
        }
      }
    },
    (error) => {
      elements.locate.disabled = false;
      elements.locate.querySelector("span").textContent = text("nearMe");
      elements.count.textContent =
        error.code === error.PERMISSION_DENIED
          ? text("locationDenied")
          : text("locationUnavailable");
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
  );
}

function main() {
  try {
    const savedLanguage = localStorage.getItem("loocal-language");
    if (savedLanguage && translations[savedLanguage]) state.language = savedLanguage;
  } catch {
    // File-based pages may not expose local storage.
  }
  applyTranslations();
  const isInstalled =
    window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (isInstalled) elements.install.hidden = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (elements.installDialog.open) elements.installConfirm.hidden = false;
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    elements.install.hidden = true;
  });
  elements.install.addEventListener("click", () => {
    elements.installConfirm.hidden = !deferredInstallPrompt;
    elements.installDialog.showModal();
  });
  elements.installConfirm.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    elements.installDialog.close();
  });
  elements.installDialog.addEventListener("close", () => {
    elements.installConfirm.hidden = true;
  });
  try {
    initMap();
  } catch (error) {
    console.error(error);
    elements.error.hidden = false;
    elements.list.replaceChildren();
    elements.list.setAttribute("aria-busy", "false");
    elements.count.textContent = text("mapUnavailable");
    return;
  }

  elements.language.addEventListener("click", () => {
    setLanguage(state.language === "fr" ? "en" : "fr");
  });
  elements.search.addEventListener("input", render);
  elements.district.addEventListener("change", render);
  elements.locate.addEventListener("click", locateUser);
  elements.retry.addEventListener("click", loadPlaces);
  elements.sort.addEventListener("click", () => {
    state.sortAscending = !state.sortAscending;
    elements.sort.innerHTML = `${state.sortAscending ? text("sortAscending") : text("sortDescending")} <span aria-hidden="true">↕</span>`;
    state.userLocation = null;
    render();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
    ) {
      event.preventDefault();
      elements.search.focus();
    }
  });

  loadPlaces();
  window.setTimeout(() => state.map.invalidateSize(), 250);
}

main();
