
"use client";
import React from 'react';
import { IDevice } from './interfaces/components';
import { Player } from 'media-stream-player';
import styled from 'styled-components';
import { hostname } from 'os';


const MediaPlayer = styled(Player)`
  max-width: 400px;
  max-height: 300px;
  margin: 8px;
`;

const MediaPlayerContainer = styled.div`
  width: 400px;
  height: 300px;
  margin: 8px;
`;

const Centered = styled.div`
  text-align: center;
`;


function Camera (props: { device: IDevice }) {
    const hostname = props.device.hostname;
    const authorized = props.device.authorized;
    const label = props.device.label;
    return (
        
        authorized ? (
        <MediaPlayerContainer key={hostname}>
        <Centered>{label}</Centered>
        <MediaPlayer
            hostname={hostname}
            // initialFormat="JPEG"
            autoPlay
            autoRetry
            vapixParams={{ resolution: '800x600' }}
        />
        </MediaPlayerContainer>
    ) : (
        <MediaPlayerContainer key={hostname}>
        <Centered>{label}</Centered>
        <Centered>Not authorized</Centered>
        </MediaPlayerContainer>
    )
    )
}

export default Camera;