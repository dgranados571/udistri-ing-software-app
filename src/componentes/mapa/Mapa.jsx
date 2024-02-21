import React, { useEffect } from 'react'
import { useJsApiLoader } from '@react-google-maps/api';

const Mapa = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCRqcPtUQPym5AtFMvaj2G85MmUA8CGOd0"
    })

    useEffect(() => {
        if (isLoaded) {
            navigator.geolocation.getCurrentPosition((posicion) => {
                initMap(posicion)
            })
        }
    }, [isLoaded]);

    const initMap = (posicion) => {
        const mapOptions = ({
            center: { lat: posicion.coords.latitude, lng: posicion.coords.longitude },
            zoom: 18
        });
        const mapaControl = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        const coordMarker1 = { lat: posicion.coords.latitude, lng: posicion.coords.longitude }
        new window.google.maps.Marker({
            position: coordMarker1,
            map: mapaControl
        });
    }

    return (
        <>
            {
                isLoaded ?
                    <div id="map" style={{ width: '100%', height: '100vh' }}></div>
                    :
                    <>Cargandooooo</>
            }
        </>
    )
}

export default Mapa