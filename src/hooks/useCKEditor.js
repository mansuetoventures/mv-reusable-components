import React, { Component, useState, useEffect } from 'react';
import loadScript from 'load-script';
import useGlobalScript from './useGlobalScript.js';

export default function useCKEditor(calledFrom){

    const CKEDITOR_SCRIPT_NOT_YET_CALLED = 0;
    const CKEDITOR_SCRIPT_LOADING = 1;
    const CKEDITOR_SCRIPT_LOADED = 2;

    const IncCKEditorFeatures = useGlobalScript("https://unpkg.com/onpage-stable-at-all-costs@0.0.7/dist/bundle.js","IncCKEditorFeatures",calledFrom);

    return IncCKEditorFeatures; //returns "0" if not yet called, "1" if loading, "2" if error, and the value of window.IncCKEditorFeatures if it is loaded
}
