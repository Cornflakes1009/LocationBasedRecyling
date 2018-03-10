
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
      var database = firebase.database();
    
      $("#add-location").on('click', function(){
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('#modal1').modal();
        console.log('add button clicked');
      });
    
      $('#submit-button').on('click', function(){
        console.log('submit button clicked');
        var address = $("#address").val().trim();

        var address = $('#address').val().trim();

        // container sizes
        var small;
        var large;
        var rolloff;
        var containerSize = [];
        // checking the container check boxes
        if ($('#small').is(":checked")){  
          small = 'small';
          containerSize.push(small);
        }
        if ($('#large').is(":checked")){  
          large = 'large';
          containerSize.push(large);
        }
        if ($('#rolloff').is(":checked")){ 
          rolloff = 'rolloff';
          containerSize.push(rolloff);
        }
        console.log(containerSize);
      
      // accepted at the location
      var paper;
      var cardboard;
      var plastic;
      var glass;
      var aluminum;
      var steel;
      var acceptedItems = [];
      // checking the accepted check boxes
      if ($('#paper').is(":checked")){ 
        paper = 'paper';
        acceptedItems.push(paper);
      }
      if ($('#cardboard').is(":checked")){ 
        cardboard = 'cardboard';
        acceptedItems.push(cardboard);
      }
      if ($('#plastic').is(":checked")){ 
        plastic = 'plastic';
        acceptedItems.push(plastic);
      }
      if ($('#glass').is(":checked")){ 
        glass = 'glass';
        acceptedItems.push(glass);
      }
      if ($('#aluminum').is(":checked")){ 
        aluminum = 'aluminum';
        acceptedItems.push(aluminum);
      }
      if ($('#steel').is(":checked")){ 
        steel = 'steel';
        acceptedItems.push(steel);
      }
      // checking if the accepted items and container size arrays arrays are empty and if not, pushing them to firebase
      if (containerSize.length > 0 && acceptedItems.length > 0 && address.val.trim() === ""){

        console.log(containerSize, acceptedItems);
        database.ref().push({
          containerSize: containerSize,
          acceptedItems: acceptedItems,
          address: address
      });
      }
      // checking if the accepted items array is empty and if not, pushing that to firebase
      // if (acceptedItems !== []){
      //   database.ref().push({
      //     acceptedItems: acceptedItems
      // });
      // }
      console.log(acceptedItems);
    })

    //If user has incorrectly entered address, here's the error modal

    // Place this in Google Maps info: $('#modal2').modal('open');

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
       
      },
      complete: function() {  } // Callback for Modal close
    }
  );

    }); // end of document ready function
