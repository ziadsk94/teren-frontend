import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function VenueMap({ venues }) {
  return (
    <div style={{ height: "400px", borderRadius: "1rem", overflow: "hidden" }}>
      <MapContainer
        center={[44.3299, 23.7944]} // Craiova coordinates
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {venues.map((venue) => (
          <Marker
            key={venue._id}
            position={[
              venue.location.coordinates[1],
              venue.location.coordinates[0],
            ]}
          >
            <Popup>
              <h3>{venue.name}</h3>
              <p>{venue.address}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
