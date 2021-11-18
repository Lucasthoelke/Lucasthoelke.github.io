export const location = (application, button) => {

    /** punt in Arnhem */
    const location = [190011.29205868338, 444044.58196267043];

    const gotoLocation = (e) => {

        /** View submodule */
        const view = application.viewer.view;
        const markers = application.markers;

        /** zet een marker neer op de kaart */
        markers.createMarker(location, true);

        /** Beweeg naar punt via animatie */
        view.animate({ center: location, zoom: 10 });
    };
    button.addEventListener('click', gotoLocation);
};
