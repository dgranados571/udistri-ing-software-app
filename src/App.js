import React from "react";
import GoogleMapReact from 'google-map-react';
import './App.css';

const AnyReactComponent = ({ text }) =><div style={{ color: 'red', fontSize: '24px' }}>•</div>;
const Marker = ({ lat, lng }) => <div style={{ color: 'red', fontSize: '24px' }}>•</div>;

function App() {

  const defaultProps = {
    center: {
      lat: 4.63609738054743,
      lng: - 74.06584169083939
    },
    zoom: 15
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCRqcPtUQPym5AtFMvaj2G85MmUA8CGOd0" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}

        >
          <AnyReactComponent
            lat={4.63609738054743}
            lng={- 74.06584169083939}
            text="Mi Udistr1"
          />
        </GoogleMapReact>
      </div>

    </>
  );
}

export default App;
