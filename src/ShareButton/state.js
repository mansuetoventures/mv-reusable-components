import React, { Component, useState } from 'react';
import {types, styles} from './ShareButton.js';


export default function useShareButtonState(initialStyle, intitialUrl, initialHeadline, initialSummary, initialSource, initialVia){
    const [style, setStyle] = useState(initialStyle);
    const [url, setUrl] = useState(intitialUrl);
    const [headline, setHeadline] = useState(initialHeadline);
    const [summary, setSummary] = useState(initialSummary);
    const [source, setSource] = useState(initialSource);
    const [via, setVia] = useState(initialVia);

    return [
        style, setStyle,
        url, setUrl, 
        headline, setHeadline, 
        summary, setSummary,
        source, setSource,
        via, setVia
    ];
}
