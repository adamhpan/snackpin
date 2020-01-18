<template>
  <div class="h-100">
    <div id="map" class="w-100 h-100"></div>
  </div>
</template>

<script>

export default {
  name: "SnackMap",
  data () {
    return {
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837,
        info: "hello 1"
      }, {
        latitude: 51.505874,
        longitude: -0.1838486,
        info: "hello 2"
      }, {
        latitude: 51.4998973,
        longitude: -0.202432,
        info: "hello 3"
      }]
    }
  },
  head () {
    return {
      script: [{
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAco14QbuFMcvukYON-7_9AkJsnhlvy_FU",
        body: true
      }]
    }
  },
  mounted() {
    const element = document.getElementById("map")
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(51.501527,-0.1921837)
    }
    const map = new google.maps.Map(element, options);

    let clickedInfowindow = null;
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);

      const infowindow = new google.maps.InfoWindow({
        content: coord.info
      });

      const marker = new google.maps.Marker({
        position,
        map
      })

      marker.addListener('click', function() {
        clickedInfowindow = infowindow;
        infowindow.open(map, marker);
      });

      marker.addListener('mouseover', function() {
        if(clickedInfowindow) {
          clickedInfowindow.close();
          clickedInfowindow = null;
        }
        infowindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
        if(clickedInfowindow) {
          return;
        }
        infowindow.close();
      });
    })
  }
}
</script>

<style>
#map {
  margin: 0 auto;
  background: gray;
}
</style>
