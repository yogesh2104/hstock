'use client';


import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';
import { GoogleMap } from "@react-google-maps/api";


const libraries = ['places', 'drawing', 'geometry'];

export function MapProvider({ children }: { children: ReactNode }) {

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if(loadError) return <p>Encountered error while loading google maps</p>

  if(!scriptLoaded) return <p>Map Script is loading ...</p>

  return children;
}

export const defaultMapContainerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '15px 0px 0px 15px',
};

const MapComponent = () => {
    return (
        <div className="w-full">
            <GoogleMap mapContainerStyle={defaultMapContainerStyle}></GoogleMap>
        </div>
    )
};

export { MapComponent };