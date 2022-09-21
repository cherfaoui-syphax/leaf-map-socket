import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import tileLayer from '../util/tileLayer';
import io from 'socket.io-client';
import ContainerDimensions from 'react-container-dimensions';

import {useEffect} from 'react'
const center = [52.22977, 21.01178];

const points = [
  {
    lat: 52.230020586193795,
    lng: 21.01083755493164,
    title: 'point 1'
  },
  {
    lat: 52.22924516170657,
    lng: 21.011320352554325,
    title: 'point 2'
  },
  {
    lat: 52.229511304688444,
    lng: 21.01270973682404,
    title: 'point 3'
  },
  {
    lat: 52.23040500771883,
    lng: 21.012146472930908,
    title: 'point 4'
  },
];


const MyMarkers = ({ data }) => {
  return data.map(({ lat, lng, title }, index) => (
    <Marker
      key={index}
      position={{ lat, lng }}
    >
      <Popup>{title}</Popup>
    </Marker>
  ));
}

const socket = io("http://localhost:3001");
const MapWrapper = () => {
 

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [marks, setMarks] = useState(points);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('chat message', (msg) => {
      console.log("Message received");
      setMarks(JSON.parse(msg));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);


  
  return (
    <>
    <p>{JSON.stringify(marks)}</p>
    <ContainerDimensions>
    <MapContainer center={center} zoom={18} scrollWheelZoom={false}>

      <TileLayer {...tileLayer} />

      <MyMarkers data={marks} />

    </MapContainer>
    </ContainerDimensions>
    </>
  )
}

export default MapWrapper;