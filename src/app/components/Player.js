import React, { useEffect } from 'react';

export default function Player({ videoId }) {
    console.log(videoId)
    useEffect(() => {
        // Charger l'API JavaScript de YouTube de manière asynchrone
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);

        // Gestionnaire d'événement pour détecter lorsque l'API est prête
        script.onload = () => {
            // Initialiser le lecteur une fois que l'API est chargée
            window.onYouTubeIframeAPIReady = createPlayer;
        };

        // Fonction pour initialiser le lecteur
        const createPlayer = () => {
            new window.YT.Player('youtube-player', {
                height: '315',
                width: '560',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'modestbranding': 1, // Ajoutez cet autre paramètre
                    'controls': 0,
                },
                events: {
                    'onReady': onPlayerReady,
                },
            });
        };

        const onPlayerReady = event => {
            // Gestionnaire d'événement pour démarrer la lecture lorsque le bouton est cliqué
            document.getElementById('custom-play-button').addEventListener('click', function () {
                event.target.playVideo();
            });
        };

        // Nettoyer le script lorsque le composant est démonté
        return () => {
            document.body.removeChild(script);
            delete window.onYouTubeIframeAPIReady;
        };
    }, [videoId]);

    return (
        <div>
            <div id="youtube-player"></div>
            <button id="custom-play-button">Play</button>
        </div>
    );
};
