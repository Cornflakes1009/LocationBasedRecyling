
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
    
        
    //   function initMap() {
    //     // Create a map object and specify the DOM element for display.
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       center: {lat: -34.397, lng: 150.644},
    //       zoom: 8
    //     });
    //   }
    
    
    
      $("#map").on('click', function(){
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('#modal1').modal();
      });
    
      
    
    
    
    
    
    }); // end of document ready function

    
    
    