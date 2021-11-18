
export const zoom = (application, slider) => {

    /** View module */
    const view = application.viewer.view;

    /** initiele waarde */
    slider.value = view.zoom;

    /** luister naar feedback van de view */
    view.addEventListener("change:zoom", (e) => {
        const { zoom } = e.detail;
        slider.value = view.zoom;
    });

    /** verander zoom niveau wanneer slider veranderd */
    slider.addEventListener('input', (e) => {
        view.zoom = slider.value;
    })
};
