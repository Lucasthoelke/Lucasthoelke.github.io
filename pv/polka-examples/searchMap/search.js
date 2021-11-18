export const search = (application, input, button, dataList) => {


    const search = application.search;

    search.bind(({ response$ }) => {

        const query$ = application.utils.Observable((subscriber) => {

            const locations = new Map();

            /** Als een knop word losgelaten dan .. */
            input.addEventListener('keyup', (e) => {

                /** .. stuur zoekopdracht */
                subscriber.next(input.value);

                /** dropdown leegmaken */
                dataList.replaceChildren();
            });

            response$.subscribe({
                next: (response) => {

                    /** gevonden locaties leegmaken */
                    locations.clear();

                    /** dropdown vullen met gevonden locaties */
                    response.locations.forEach(location => {
                        let option = document.createElement('option');
                        option.value = location.name;
                        dataList.appendChild(option);
                        /** gevonden locaties vullen */
                        locations.set(location.name, location);
                    });
                }
            });

            input.addEventListener("change", (e) => {

                const location = e.target.value;

                /** kijken of we een locatie hebben */
                const selected = Array.from(dataList.childNodes).find((node) => {
                    return (node.value == location);
                });

                if (selected) {
                    if (locations.has(selected.value)) {
                        const location = locations.get(selected.value);

                        /** omzetten naar coordinaten */
                        const coord = application.search.locationToCoordinates(location);
                        application.viewer.view.animate({ center: coord, zoom: 5 });
                    }
                }
            });

        });

        return {
            query$,
        };
    });


    /** Wanneer iemand op een knop klinkt vind die locatie en ga er naartoe */
    button.addEventListener('click', () => {
        application.searchAndGoTo(input.value);
    });


};
