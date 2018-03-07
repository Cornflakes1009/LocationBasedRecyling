
$( document ).ready(function() {

    var config = {
        apiKey: "AIzaSyB7Tjvl7pf3Acdlon_3pUL0OdECPOAIjsw",
        authDomain: "locationbasedrecycling.firebaseapp.com",
        databaseURL: "https://locationbasedrecycling.firebaseio.com",
        projectId: "locationbasedrecycling",
        storageBucket: "locationbasedrecycling.appspot.com",
        messagingSenderId: "910518074335"
      };
      firebase.initializeApp(config);
    
        
      function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    
    
    
    
    
    
    
    
    
    
    }); // end of document ready function
    
    