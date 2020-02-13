<template>
  <div class="h-100">
    <div id="map" class="w-100"></div>
  </div>
</template>

<script>
let map = null;
let markers = [];
import VueScrollTo from "vue-scrollto";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SnackMap",
  computed: {
    ...mapGetters(["mapSnacks", "activeSnack"])
  },
  methods: {
    ...mapMutations(["setSnackMarker", "setMapBounds", "setActiveSnack"]),
    ...mapActions(["getMapSnacks", "loadSavedSnacks"])
  },
  watch: {
    activeSnack(newActiveSnack, oldActiveSnack) {
      if(newActiveSnack) {
        let newMarker = markers.find((marker) => {
          return marker.id == newActiveSnack.id;
        });

        newMarker.infowindow.open(map, newMarker)
      }

      if(oldActiveSnack) {
        let oldMarker = markers.find((marker) => {
          return marker.id == oldActiveSnack.id;
        });

        oldMarker.infowindow.close();
      }
    },
    mapSnacks() {
      for(let marker of markers) {
        marker.setMap(null);
      }

      let clickedInfowindow = null;

      this.mapSnacks.forEach((snack) => {
        const position = new google.maps.LatLng(snack.latitude, snack.longitude);

        const infowindow = new google.maps.InfoWindow({
          content: `<strong>${snack.name}</strong><div>${snack.address}</div>`,
          disableAutoPan : true
        });

        const marker = new google.maps.Marker({
          position,
          map,
          id: snack.id,
          infowindow,
          snack
        });

        markers.push(marker)

        marker.addListener('mouseover', () => {
          VueScrollTo.scrollTo(`#snack-scroll-${snack.id}`, 200, {
            container: '.snack-list',
            easing: 'ease-in',
            offset: -60,
            force: true,
            cancelable: true,
            x: false,
            y: true
          });

          this.setActiveSnack(marker.snack);
        });
      })
    }
  },
  beforeMount() {
    this.loadSavedSnacks();
  },
  async mounted() {
    const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {
      window['GoogleMapsInit'] = resolve;

      let GMap = document.createElement('script');

      GMap.setAttribute('src',
     `https://maps.googleapis.com/maps/api/js?key=AIzaSyAco14QbuFMcvukYON-7_9AkJsnhlvy_FU&libraries=places&callback=GoogleMapsInit`);

      document.body.appendChild(GMap);
    });

    let loadMapPosition = async (position) => {
      await loadedGoogleMapsAPI;

      const element = document.getElementById("map")
      const options = {
        zoom: 12,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        disableDefaultUI: true,
      }

      map = new google.maps.Map(element, options);

      map.addListener('idle', () => {
        let mapBounds = map.getBounds();

        let lat0 = mapBounds.getNorthEast().lat();
        let lat1 = mapBounds.getSouthWest().lat();
        let lng0 = mapBounds.getNorthEast().lng();
        let lng1 = mapBounds.getSouthWest().lng();

        this.setMapBounds({ lat0, lat1, lng0, lng1 });
        this.getMapSnacks();
      });
    }

    let defaultPosition = {
      coords: {
        latitude: 34.10542200,
        longitude: -118.41871600
      }
    }

    navigator.geolocation.getCurrentPosition(loadMapPosition, () => {
      loadMapPosition(defaultPosition)
    });
  }
}
</script>

<style>
#map {
  margin: 0 auto;
  background: gray;
  height: calc(100% - 56px);
}
</style>
