import React from 'react'
import './Map.css'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet'
import './Map.css'
import { showDataOnMap } from './util'

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
