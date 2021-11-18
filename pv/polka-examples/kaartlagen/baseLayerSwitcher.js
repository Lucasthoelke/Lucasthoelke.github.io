export const baseLayerSwitcher = (application, image) => {

    /** de geconfigureerde lagen zijn te vinden als collectie onder map */
    const layers = application.viewer.view.map.layers;
    const event = application.viewer.events;

    /** */
    let baseLayers = [];
    let currentBaseLayer;
    let nextBaseLayerIndex;
    let nextBaseLayer;

    /** Wacht totdat de setup klaar is */
    event.addEventListener("expose.setup.done", (e) => {

        /** Haalt de lagen op die basis lagen zijn */
        baseLayers = Array.from(layers.values()).filter((layer) => {
            return (true == layer.base);
        });

        /** Haalt de huidige basis laag op */
        currentBaseLayer = Array.from(baseLayers.values()).find((layer) => {
            return (true == layer.visible);
        });

        /** Berekend welke laag de volgende laag wordt */
        nextBaseLayerIndex = baseLayers.findIndex((layer) => {
            return (layer === currentBaseLayer);
        }) + 1;

        /** Haalt de volgende basis laag op */
        nextBaseLayer = baseLayers[nextBaseLayerIndex] ?? baseLayers[0];
        image.src = nextBaseLayer?.thumbnail_url ?? 'https://planviewer.nl/static/images/articles/default/0001/01/64c58c1e57b8631916584a1e0927afffb646df0a.jpeg';
    })

    /** Verwisseld de basis laag en zet de volgende klaar */
    const switcher = () => {
        nextBaseLayerIndex = baseLayers.findIndex((layer) => {
            return (layer === currentBaseLayer);
        }) + 1;
        currentBaseLayer.visible = false;

        nextBaseLayer = baseLayers[nextBaseLayerIndex] ?? baseLayers[0];

        currentBaseLayer = nextBaseLayer;
        currentBaseLayer.visible = true;

        /** Zet de image url klaar voor volgende basislaag */
        nextBaseLayerIndex = baseLayers.findIndex((layer) => {
            return (layer === currentBaseLayer);
        }) + 1;
        nextBaseLayer = baseLayers[nextBaseLayerIndex] ?? baseLayers[0];
        image.src = nextBaseLayer?.thumbnail_url ?? 'https://planviewer.nl/static/images/articles/default/0001/01/64c58c1e57b8631916584a1e0927afffb646df0a.jpeg';
    }

    /** Op de klik op de foto word de basis laag veranderd */
    image.addEventListener("click", switcher);
};
