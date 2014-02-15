
var map = L.mapbox.map('map', 'will-breitkreutz.map-t6q8mkzo', {
		maxZoom:14
	})
  	.setView([37.8, -96], 4);

map.on('click',function(e){
	$('#info').fadeOut(200);
    $('#info').empty();
});

var markers = new L.MarkerClusterGroup();
var lat, lng;

var marker_array = [];
placeMarkers(alumni);

function placeMarkers(alumni, nameFilter){
	for (var i = 0; i < alumni.data.length; i++) {
		var alum = alumni.data[i];
		if(nameFilter){
			if(alum.name.toLowerCase().indexOf(nameFilter) !== -1){
				var address = alum.address;
				var loc = getLocation(address,alum,createMarkers);
			}
		}else{
			var address = alum.address;
			var loc = getLocation(address,alum,createMarkers);	
		}
	}	
}


function getLocation(address, alum, callback){
    $.ajax({
    	url:'http://maps.googleapis.com/maps/api/geocode/json',
    	data:{
    		address:address,
    		sensor:false
    	}
    }).done(function(data){
    	callback(data, alum);
    });  
}

function createMarkers(data, alum, i){
	var geom = data.results[0].geometry.location;
	var marker = L.marker(new L.LatLng(geom.lat, geom.lng), {
		name:alum.name,
		employer:alum.employer,
		location:alum.location,
		card:alum.card,
		pic:alum.pic,
		twitter:alum.twitter
	});
	marker.on('click', markerClick);
	markers.addLayer(marker);
}


$('#search').keyup(search);
    
function search() {
	$('#info').fadeOut(200);
    var searchString = $('#search').val().toLowerCase();
    markers.clearLayers();
    placeMarkers(alumni,searchString);
}

function markerClick(e) {
    $('#info').empty();
				    
	var feature = e.target.options;
	
	$('#info').fadeIn(400,function(){
		
	    var info = '';
	    //'<p class="alumni-title">' + feature.title + '</p>';
	    
	    if(feature.pic){
	    	info = info + '<img class="head-shot" src="' + feature.pic + '" />';
	    }
	    
	    if(feature.name){
	    	info = info + '<p class="alumni-name">' + feature.name + '</p>';
	    }
	    
	    if(feature.employer){
	    	info = info + '<p>' + feature.employer + '</p>';
	    }
	    
	    if(feature.twitter){
	    	info = info + '<p class="twitter-handle"><a href="https://twitter.com/'+feature.twitter+'" class="twitter-follow-button" data-show-count="false">Follow @willbreitkreutz</a></p>'+
						  '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>';
	    }
	    
	    if(feature.card){
	    	info = info + '<img class="bus-card" src="' + feature.card + '" />';
	    }
	    
		
	    $('#info').append(info);	
	});
};

map.addLayer(markers);
