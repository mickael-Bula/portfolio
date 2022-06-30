import config from './config.js';
import weatherIcons from './data.js';

const app = {

    init: function()
    {
        const city = document.querySelector("#ville");
        city.addEventListener("click", app.handleClick);
        city.addEventListener("keydown", app.handleKeydown);

        app.main();
    },

    fetchOptions: {
        method: 'GET',
        mode:   'cors',
        cache:  'no-cache'
    },

    // je déclare la fonction main() comme asynchrone. Va permettre aux briques qui la compose d'utiliser await pour ne stocker dans la variable que la réponse finale de la requête
    main: async function(city=null) 
    {
        let latitude, longitude, cityData;

        if( !city) {        // si aucune ville n'est renseignée on utilise l'adresse IP
            const ip = await app.getIp();
                
            // on récupère les coordonnées géographique en fonction de l'adresse IP
            cityData = await app.getCity(ip);

            // j'entoure le destructuring de parenthèses pour que la partie gauche ne soit pas considérée comme un bloc
            ({ latitude, longitude } = cityData.data.location);
            city = cityData.data.location.city.name;        
        } else {
            cityData = await app.getCoordinates(city);
            
            // je renomme les variables reçues par destructuration ({ancien_nom: nouveau_nom})
            ({ name: city, lat: latitude, lon: longitude } = cityData[0]);
        }

        // on affiche le nom de la ville et on efface la valeur de l'input
        document.getElementById("city").textContent = city.toUpperCase();
        document.querySelector("#ville").value = "";
            
        // on récupère ensuite les données météo sur l'API openweathermap
        const meteo_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${config.APIKey}&lang=fr&units=metric`, app.fetchOptions);
        const meteo = await meteo_response.json();
        
        // on affiche les données
        this.displayWeatherInfos(meteo);
    },
    
    getIp: async function() {
        // récupération de l'adresse IP de l'utilisateur par l'intermédiaire de l'API ipify
        const response = await fetch('https://api.ipify.org?format=json', app.fetchOptions);  // la requête est au format json. Attention : c'est une promesse que l'on reçoit
        const response_json = await response.json();         // on applique la méthode json() à la résolution de la requête (qui était au format json)
        return response_json.ip;              // on attend la résolution de la promesse renvoyée par la méthode json() pour obtenir l'IP
    },
    
    getCity: async function(ip) {
        // on récupère les coordonnées géographique en fonction de l'adresse IP grâce à l'API freegeoip (changement de nom de domaine pour 'app.ipbase.com')
        const city_response = await fetch(`https://api.ipbase.com/v2/info?ip=${ip}&apikey=${config.API_Key2}`, app.fetchOptions);
        const city_json = await city_response.json();
        return city_json;
    },

    getCoordinates: async function(city) {
        // récupération des coordonnées d'une ville à partir de son nom
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${config.APIKey}`);
        return await response.json();
    },
    
    displayWeatherInfos: function(data)
    {
        const temperature = data.main.temp;
        const conditions = data.weather[0].main;
        const description = data.weather[0].description;
        
        document.querySelector("#temperature").textContent = Math.round(temperature);
        document.querySelector("#conditions").textContent = this.capitalize(description);
        document.querySelector("i.wi").className = weatherIcons[conditions];   // on récupère la bonne icône dans le fichier data.json
        
        // on lie les images de fond aux conditions météo à partir d'une banque d'images
        document.body.className = conditions.toLowerCase();
    },
    
    // bonus UX : au clic on vide le champ de l'input en vue d'une nouvelle saisie
    handleClick: function(event)
    {
        event.currentTarget.value = "";
    },
    
    // on exécute la méthode main() si la touche tapée est 'Enter' (pour ne pas avoir à ajouter un bouton de soumission)
    handleKeydown: function(event)
    {
        // Si la clé est Entrée
        if(event.key === 'Enter')
        {
            // On exécute la méthode main() en lui transmettant la ville saisie en paramètre
            app.main(event.currentTarget.value);
        }
    },
    
    capitalize: function(str)
    {
        // émulation de la fonction Capitalize() de Python avec gestion des éventuels espaces. Remplace la 1ere lettre à l'aide d'une callback c => c.toUpperCase()
        // str.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
        return str[0].toUpperCase() + str.slice(1);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

// TODO : utiliser les données de géolocalisation plutôt que l'ip : c'est non seulement une bonne pratique mais cela prend aussi en compte l'éventuelle utilisation d'un VPN
// ajouter du mouvement aux images en backgrounds
// compléter les conditions météo
// créer des thèmes pour les photos (mangas par exemple)
// compléter les infos météo (taux d'humidité...)
// créer des animations sur les icones (voir doc)
// ajouter des villes en favoris
// ajouter une carte du pays, cliquable et qui zoome sur la région et affiche dynamiquement les conditions (utiliser openweathermap et géoloc)
// ajouter Bootstrap pour ajouter le responsive facilement
// ajouter des tuiles (s'inspirer de l'app météo France : https://www.01net.com/astuces/5-applications-meteo-gratuites-pour-android-et-iphone-1141144.html)

// TODO : adapter ce code - une fois fonctionnel - à un design plus moderne, avec le tuto tutsplus (https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893)
// TODO : ajouter les prévisions à 5 jours (https://openweathermap.org/forecast5)