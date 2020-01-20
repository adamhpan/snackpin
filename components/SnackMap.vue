<template>
  <div class="h-100">
    <div id="map" class="w-100 h-100"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "SnackMap",
  computed: {
    ...mapGetters(["allSnacks"])
  },
  methods: {
    ...mapMutations(["setSnackMarker"])
  },
  mounted() {
    const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {
      window['GoogleMapsInit'] = resolve;

      let GMap = document.createElement('script');

      GMap.setAttribute('src',
     `https://maps.googleapis.com/maps/api/js?key=AIzaSyAco14QbuFMcvukYON-7_9AkJsnhlvy_FU&libraries=places&callback=GoogleMapsInit`);

      document.body.appendChild(GMap);
    });

    loadedGoogleMapsAPI.then(() => {
      const element = document.getElementById("map")
      const options = {
        zoom: 12,
        center: new google.maps.LatLng(34.10542200,-118.31871600)
      }
      const map = new google.maps.Map(element, options);

      let clickedInfowindow = null;
      this.allSnacks.forEach((snack) => {
        const position = new google.maps.LatLng(snack.latitude, snack.longitude);

        const infowindow = new google.maps.InfoWindow({
          content: snack.info
        });

        const marker = new google.maps.Marker({
          position,
          map,
          id: snack.id
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
