'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export type MapChurch = {
  id: string;
  name: string;
  address: string;
  count: number;
  lat: number;
  lng: number;
  isActive: boolean;
  isHQ?: boolean;
  isCurrent?: boolean;
};

function FlyToActive({ churches, activeId }: { churches: MapChurch[]; activeId: string }) {
  const map = useMap();
  useEffect(() => {
    const target = churches.find(c => c.id === activeId);
    if (target) map.flyTo([target.lat, target.lng], 10, { duration: 1.2 });
  }, [activeId, churches, map]);
  return null;
}

export default function ChurchMap({
  churches,
  activeId,
  onSelect,
}: {
  churches: MapChurch[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const center: [number, number] = [4.5, 11.5];

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ width: '100%', height: '100%', background: '#0D1728' }}
      scrollWheelZoom={false}
      zoomControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

      <FlyToActive churches={churches} activeId={activeId} />

      {churches.map(church => (
        <CircleMarker
          key={church.id}
          center={[church.lat, church.lng]}
          radius={church.isActive ? 14 : church.isCurrent ? 11 : 9}
          pathOptions={{
            fillColor: '#EF4444',
            fillOpacity: church.isActive ? 0.95 : 0.80,
            color: church.isActive ? '#FCA5A5' : church.isCurrent ? '#ffffff' : 'rgba(255,255,255,0.7)',
            weight: church.isActive ? 2.5 : 1.5,
          }}
          eventHandlers={{ click: () => onSelect(church.id) }}
        >
          <Popup
            className="church-popup"
            closeButton={false}
          >
            <div style={{
              background: '#0D1728',
              border: '1px solid rgba(212,168,67,0.35)',
              borderRadius: 12,
              padding: '10px 14px',
              minWidth: 180,
              color: 'white',
              fontFamily: 'Inter, sans-serif',
            }}>
              {church.isHQ && (
                <span style={{
                  display: 'inline-block', marginBottom: 6,
                  background: '#16A34A', color: 'white',
                  fontSize: 10, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 20,
                }}>
                  Siège National
                </span>
              )}
              {church.isCurrent && !church.isHQ && (
                <span style={{
                  display: 'inline-block', marginBottom: 6,
                  background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917',
                  fontSize: 10, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 20,
                }}>
                  Notre Église
                </span>
              )}
              <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>
                {church.name}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                {church.address}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
