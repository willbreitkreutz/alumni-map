
var map = L.mapbox.map('map', 'will-breitkreutz.map-t6q8mkzo')
  .setView([37.8, -96], 4);
  
var markerLayer = L.mapbox.markerLayer()
    .loadURL('data/alumni-map.json')
    .addTo(map);
    
$('#search').keyup(search);
    
function search() {
	$('#info').fadeOut(200);
    var searchString = $('#search').val().toLowerCase();

    markerLayer.setFilter(findName);
    
    function findName(feature) {
        return feature.properties.name
            .toLowerCase()
            .indexOf(searchString) !== -1;
    }
}

markerLayer.on('click',function(e) {
    e.layer.togglePopup();
    $('#info').empty();
	
	$('#info').fadeIn(400,function(){
	var feature = e.layer.feature;
    var info = '<h1>' + feature.properties.name + '</h1>';
    
    if(feature.properties.employer){
    	info = info + '<p>' + feature.properties.employer + '</p>';
    }
    if(feature.properties.location){
    	info = info + '<p>' + feature.properties.location + '</p>';
    }
    if(feature.properties.card){
    	info = info + '<img class="bus-card" src="' + feature.properties.card + '" />';
    }
	
    $('#info').append(info);	
	})
    
});

map.on('click',function(e){
	$('#info').fadeOut(200);
    $('#info').empty();
});