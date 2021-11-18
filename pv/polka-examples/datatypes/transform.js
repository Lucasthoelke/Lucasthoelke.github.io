

export const transform = (application) => {

    /**
     * "GPS" Coordinaten (EPSG:4326) van Eindhoven [lat, lon]
     * @see https://epsg.io/4326
     */
    const Eindhoven = [5.499921405840683,51.46427760915219];

    /** als Point */
    const point = application.utils.Point(Eindhoven);

    /**
     * transformeer naar RD coordinaten (EPSG:28992)
     * @see https://epsg.io/28992
     */
    const coord = point.transform('EPSG:4326', 'EPSG:28992').getCoordinates();
    console.log(`lat/lon ${Eindhoven} naar RD ${coord}`);

};
