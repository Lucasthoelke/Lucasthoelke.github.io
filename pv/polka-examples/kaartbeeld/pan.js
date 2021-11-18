
export const pan = (application, { up, down, left, right }) => {

    /** View module */
    const view = application.viewer.view;

    /**
     * huidig center als coordinate [x,y]
     */
    let current = view.center;

    /** luister naar feedback van de view */
    view.addEventListener("change:center", (e) => {
        const { center } = e.detail;
        current = center;
    });

    /** Veranderd de center voor panning  */
    function modifyCenter(x = 0, y = 0) {
        let newCords = [current[0] + x, current[1] + y];
        view.center = newCords;
    }

    /** Roep de modifyCenter functie aan bij de button click en veranderd daarbij de center */
    left.addEventListener('click', modifyCenter.bind(null, -1000, 0))
    right.addEventListener('click', modifyCenter.bind(null, 1000, 0))
    up.addEventListener('click', modifyCenter.bind(null, 0, 1000))
    down.addEventListener('click', modifyCenter.bind(null, 0, -1000))
};
