
var map;
var infoWindow;
var geocoder;
var isAdd;
      function initMap() {
        //added geocoder to this function
        geocoder = new google.maps.Geocoder();
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

          })
        } 
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
      function codeAddress(address, containerSize, acceptedItems, isAdd, callback) {
        //var address = document.getElementById('address').value;
        var isValid;
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
                       
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            })
            isValid = true;
          } else {
            isValid = false;
            
          }
          if (isAdd) {
          callback(address, containerSize, acceptedItems, isValid)
          }
        });
      }


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


    })

//end of code for adding markers for recylcing centers


$(document).ready(function () {


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

  $("#add-location").on('click', function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal1').modal();
    console.log('add button clicked');
  });

  $('#submit-button').on('click', function (event) {
    console.log('submit button clicked');
    event.preventDefault();
    var address = $("#address").val().trim();;

    // container sizes
    var small;
    var large;
    var rolloff;
    var containerSize = [];
    // checking the container check boxes
    if ($('#small').is(":checked")) {
      small = 'small';
      containerSize.push(small);
    }
    if ($('#large').is(":checked")) {
      large = 'large';
      containerSize.push(large);
    }
    if ($('#rolloff').is(":checked")) {
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
    if ($('#paper').is(":checked")) {
      paper = 'paper';
      acceptedItems.push(paper);
    }
    if ($('#cardboard').is(":checked")) {
      cardboard = 'cardboard';
      acceptedItems.push(cardboard);
    }
    if ($('#plastic').is(":checked")) {
      plastic = 'plastic';
      acceptedItems.push(plastic);
    }
    if ($('#glass').is(":checked")) {
      glass = 'glass';
      acceptedItems.push(glass);
    }
    if ($('#aluminum').is(":checked")) {
      aluminum = 'aluminum';
      acceptedItems.push(aluminum);
    }
    if ($('#steel').is(":checked")) {
      steel = 'steel';
      acceptedItems.push(steel);
    }
    // checking if the accepted items and container size arrays arrays are empty and if not, pushing them to firebase
    isAdd = true;
    codeAddress(address, containerSize, acceptedItems, isAdd, callback);
      function callback(address, containerSize, acceptedItems, isValid) {
      if (containerSize.length > 0 && acceptedItems.length > 0 && address !== "") {
        if (isValid) {
          console.log(containerSize, acceptedItems);
          database.ref().push({
            containerSize: containerSize,
            acceptedItems: acceptedItems,
            address: address
        
          })
        } else {
          //need to open error modal here
          console.log("invalid address");
          $('#modal2').modal();
        }
      }
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

  $('#modal2').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      alert("Ready");
      console.log(modal, trigger);
    },
    complete: function () { alert('Closed'); } // Callback for Modal close
  }
  );
  database.ref().on('child_added', function (childSnapshot) {
    isAdd = false;
    codeAddress(childSnapshot.val().address, isAdd);
    console.log('running');
    var newDiv = $("<div>");
    newDiv.addClass("col s12");
    newDiv.text(childSnapshot.val().containerSize + childSnapshot.val().acceptedItems + childSnapshot.val().address);
    $('#location-section').append(newDiv);

  });

}); // end of document ready function
