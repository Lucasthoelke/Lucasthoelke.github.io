

export const visibility = (application, list) => {

    /** de geconfigureerde kaartlagen zijn te vinden als collectie onder map */
    const layers = application.viewer.view.map.layers;

    /**
     * luister naar de list elementen van de kaartlagen
     * @see: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
     */
    const observer = new MutationObserver((mutations, observer) => {
        mutations.forEach((mutation) => {

            const added = mutation.addedNodes;
            const removed = mutation.removedNodes;

            added.forEach((el) => {

                const path = el.dataset.path;

                /** vind mijn kaartlaag */
                const layer = layers.get(path);

                /** vind mijn kaartlaag UI elementen */
                const toggle = el.querySelector(`input[type=checkbox]`);
                const slider = el.querySelector(`input[type=range]`);

                /** initiele waarden */
                toggle.checked = layer.visible;
                slider.value = layer.opacity;

                /** luister naar feedback kaartlaag eigenschappen en synchroniseer UI elementen */
                layer.addEventListener("change:visible", (e) => {
                    const { visible } = e.detail;

                    /** kaartlaag zichtbaar vlag */
                    toggle.checked = visible;
                });

                layer.addEventListener("change:opacity", (e) => {
                    const { opacity } = e.detail;

                    /** kaartlaag transparantie waarde */
                    slider.value = opacity;
                });

                /** luister naar UI elementen en pas kaartlaag eigenschappen aan */
                toggle.addEventListener("click", (e) => {
                    const checkbox = e.target;

                    /** toggle kaartlaag zichtbaarheid */
                    layer.visible = checkbox.checked;
                });

                slider.addEventListener("input", (e) => {
                    const slider = e.target;

                    /** zet kaartlaag doorzichtigheid */
                    layer.opacity = slider.value;
                });
            });
        });
    });

    observer.observe(list, { childList: true, subtree: false, attributes: false });
};
