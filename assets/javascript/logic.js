
var map;
var infoWindow;
var service;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.102115, lng: -94.582554},
          zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            //request variable along with service.textSearch finds recycling centers within 
            //500 meters of current location

            var request = {
              location: pos,
              radius: '500',
              query: 'recycling centers'
            };
                  
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);

            //end code for adding recyling centers

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      //additional code for adding markers for recylcing centers - gets the placeid for the getDetails
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var idPlace = results[i].place_id;

            // gets the name and address and creates the pin with this info
            service.getDetails({
              placeId: idPlace
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function() {
                  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    place.formatted_address + '</div>');
                  infoWindow.open(map, this);
                });
              }
            });
    
          }
        }
      }

      //end of code for adding markers for recylcing centers


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
    
    
    
    
    }); // end of document ready function
    