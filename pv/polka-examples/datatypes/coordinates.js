

export const coordinates = (application) => {

    /**
     * Coordinate{Array.<number>}
     * An array of numbers representing an xy coordinate. Example: [16, 48].
     */

    /** 
     * coordinaten in Eindhoven
     * [ x, y ]
     */
    const Eindhoven = [162833.06448813833, 386140.48611484875];

    /**
     * template string with `{x}` and `{y}` placeholders
     * that will be replaced by first and second coordinate values.
     */
    const string = application.utils.coordinate.format(Eindhoven, "Eindhoven: {x} {y}");
    console.log(string);

};
