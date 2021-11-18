export const kenmerken = (application, table) => {

    /** features module */
    const features = application.viewer.view.map.features;
    const bodies = [];

    /** geselecteerde objecten */
    const selected = new Map();

    features.selection.addEventListener("add", (e) => {

        /** locatie met kaart objecten */
        const {location} = e.detail;

        location.features.forEach((feature) => {
            // ?? feature._properties.id @TODO: talk to Axel about if this is not needed
            const id = feature.id;

            selected.set(id, feature);

            bodies[id] = table.createTBody();
            const header = bodies[id].insertRow(-1);
            header.innerHTML = `<tr><td>${id}</ts><td><button data-feature-id=${id}>OOGJE</button></td></tr>`;

            for (const prop in feature.properties) {
                const value = feature.properties[prop];
                const row = bodies[id].insertRow(-1);
                row.innerHTML = `<tr><th>${prop}</th><td>${value}</td></tr>`;
            }

            /** vind de highlight knop */
            const button = header.querySelector("button");

            button.addEventListener("click", (e) => {

                const featureId = e.target.dataset.featureId;

                /** vind bijhorende kaart object */
                if (selected.has(featureId)) {
                    const feature = selected.get(featureId);
                    /** schakel highlight aan/uit */
                    feature.highlight = (!feature.highlight);
                }
            });
        });
    });

    features.selection.addEventListener("remove", (e) => {

        const {location} = e.detail;

        location.features.forEach((feature) => {
            const id = feature.id;
            selected.delete(id);
            table.removeChild(bodies[id]);
        });
    });
};
