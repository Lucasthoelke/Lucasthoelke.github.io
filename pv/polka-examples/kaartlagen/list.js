/**
 * lijst van kaartlagen opbouwen
 */
export const list = (application, list) => {

    /** de geconfigureerde lagen zijn te vinden als collectie onder map */
    const layers = application.viewer.view.map.layers;

    /** luister wanneer er een laag wordt toegevoegd */
    layers.addEventListener("add", (e) => {

        /** layer module */
        const { value: layer } = e.detail;
        const { path, depth, name } = layer;

        const li = document
            .createRange()
            .createContextualFragment(`<li data-path="${path}" data-name="${name}">${name} <input type="checkbox"><input type="range" min="0" max="1" step="0.01"></li>`);

        list.appendChild(li);
    });

    /** luister wanneer er een laag wordt verwijderd */
    layers.addEventListener("remove", (e) => {
    });
};
