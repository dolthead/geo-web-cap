export {
    initMap,
};

let map;
async function initMap(lat: number, lng: number): Promise<void> {
  const position = { lat, lng };

  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 17, // 1-18
      center: position,
      mapId: 'GEO_24_ID',
    }
  );
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'You are here'
  });
}
