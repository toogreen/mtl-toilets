"use strict";

const DEFAULT_CENTER = [45.535, -73.59];

const state = {
  allPlaces: [],
  filteredPlaces: [],
  markers: new Map(),
  map: null,
  markerLayer: null,
  selectedId: null,
  userLocation: null,
  sortAscending: true,
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
};

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

function formatHours(hours) {
  if (!hours) return "Hours not listed — check before you go";
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
    if (new Set(times).size > 1) return "Seasonal hours — check park info";
    return `Today ${[...new Set(times)].join(" / ")}`;
  }
  return "Hours vary — check before you go";
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
  name.textContent = place.name;
  const location = document.createElement("span");
  location.textContent = [
    place.districts.join(" · "),
    place.isClosed ? "Location temporarily closed" : formatHours(place.hours),
  ].join(" · ");
  popup.append(name, location);
  if (place.sourceUrl) {
    const link = document.createElement("a");
    link.href = place.sourceUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Park details ↗";
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
  card.setAttribute("aria-label", `${place.name}, ${place.address}`);

  const top = document.createElement("span");
  top.className = "place-card-top";
  addText(top, "h3", "", place.name);
  const placeTag = place.isClosed ? "Closed" : place.facility;
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
  addText(address, "span", "", `${place.address} · ${place.districts.join(" · ")}`);
  card.append(address);

  const hours = document.createElement("span");
  hours.className = "place-hours";
  hours.innerHTML = icons.clock;
  addText(hours, "span", "", place.isClosed ? "Location temporarily closed" : formatHours(place.hours));
  card.append(hours);

  const actions = document.createElement("span");
  actions.className = "card-actions";
  const access = document.createElement("span");
  access.className = "accessibility-label";
  access.innerHTML = icons.accessibility;
  addText(access, "span", "", "Accessible washroom");
  actions.append(access);

  const directions = document.createElement("a");
  directions.className = "directions-link";
  directions.href = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude}%2C${place.longitude}`;
  directions.target = "_blank";
  directions.rel = "noreferrer";
  directions.textContent = "Directions ↗";
  directions.addEventListener("click", (event) => event.stopPropagation());
  actions.append(directions);

  if (place.sourceUrl) {
    const venueLink = document.createElement("a");
    venueLink.className = "venue-link";
    venueLink.href = place.sourceUrl;
    venueLink.target = "_blank";
    venueLink.rel = "noreferrer";
    venueLink.textContent = "Park info ↗";
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
    const searchable = normalizeText(
      `${place.name} ${place.address} ${place.districts.join(" ")} ${place.facility} ${place.category}`,
    );
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
          ? first.name.localeCompare(second.name, "fr")
          : second.name.localeCompare(first.name, "fr")),
    );
  }

  state.filteredPlaces = places;
  elements.list.replaceChildren();
  state.markerLayer.clearLayers();

  if (!places.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    addText(empty, "strong", "", "No spots found");
    addText(empty, "span", "", "Try another park name or borough.");
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

  elements.count.textContent = `${places.length} ${places.length === 1 ? "spot" : "spots"}`;
  elements.caption.textContent = state.userLocation
    ? "Sorted by distance from your location"
    : "Public facilities across Montréal";
  elements.list.setAttribute("aria-busy", "false");

  if (places.length) {
    const bounds = state.markerLayer.getBounds();
    if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
  }
}

function fillDistricts() {
  const districts = [...new Set(state.allPlaces.flatMap((place) => place.districts))]
    .filter(Boolean)
    .sort((first, second) => first.localeCompare(second, "fr"));
  elements.district.replaceChildren(elements.district.options[0]);
  for (const district of districts) {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    elements.district.append(option);
  }
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
  addText(loading, "span", "", "Finding the nearest little rooms…");
  elements.list.append(loading);
  elements.count.textContent = "Finding washrooms…";

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
    elements.count.textContent = "Data unavailable";
    elements.list.replaceChildren();
    elements.list.setAttribute("aria-busy", "false");
    elements.error.hidden = false;
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    elements.count.textContent = "Location not supported";
    return;
  }

  elements.locate.disabled = true;
  elements.locate.querySelector("span").textContent = "Locating…";
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      state.userLocation = { latitude: coords.latitude, longitude: coords.longitude };
      elements.locate.querySelector("span").textContent = "Near me";
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
      elements.locate.querySelector("span").textContent = "Near me";
      elements.count.textContent =
        error.code === error.PERMISSION_DENIED ? "Location access denied" : "Location unavailable";
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
  );
}

function main() {
  try {
    initMap();
  } catch (error) {
    console.error(error);
    elements.error.hidden = false;
    elements.list.replaceChildren();
    elements.list.setAttribute("aria-busy", "false");
    elements.count.textContent = "Map unavailable";
    return;
  }

  elements.search.addEventListener("input", render);
  elements.district.addEventListener("change", render);
  elements.locate.addEventListener("click", locateUser);
  elements.retry.addEventListener("click", loadPlaces);
  elements.sort.addEventListener("click", () => {
    state.sortAscending = !state.sortAscending;
    elements.sort.innerHTML = state.sortAscending ? "A–Z <span aria-hidden=\"true\">↕</span>" : "Z–A <span aria-hidden=\"true\">↕</span>";
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
