
/** @TODO make this available in View module? */
import {fromExtent} from 'ol/geom/Polygon';

export const extent = (application, table) => {


    /** View module */
    const view = application.viewer.view;

    /** WKT conversie helper */
    const format = application.utils.WKT();

    const tilegrid = view.projection.tilegrid;
    const tilesize = tilegrid.getTileSize();
    const numbers = new Intl.NumberFormat('nl-NL', { maximumSignificantDigits: 3 });



    /** initiele waardes */
    const resolution = tilegrid.getResolution(Math.round(view.zoom));
    table.rows[0].cells[1].innerHTML = resolution;
    table.rows[1].cells[1].innerHTML = Math.round(view.zoom);
    table.rows[2].cells[1].innerHTML = `${numbers.format(Math.round(tilesize*resolution))} m`;
    const wkt = format.writeGeometry(fromExtent(view.extent), {
        dataProjection: view.projection,
        featureProjection: view.projection,
    });
    table.rows[3].cells[1].innerHTML = view.extent;

    /** converteer naar "GPS" coordinaten */
    const latlon = application.utils.Point(view.center).transform('EPSG:28992', 'EPSG:4326').getCoordinates();
    table.rows[4].cells[1].innerHTML = latlon;

    /** luister naar feedback van de view */
    view.addEventListener("change:property", (e) => {
        const { zoom, center } = e.detail;

        const resolution = tilegrid.getResolution(Math.round(zoom));

        /** laat de nieuwe waardes zien wanneer kaartbeeld veranderd */
        table.rows[0].cells[1].innerHTML = resolution;
        table.rows[1].cells[1].innerHTML = Math.round(zoom);
        table.rows[2].cells[1].innerHTML = `${numbers.format(Math.round(tilesize*resolution))} m`;

        const extent = view.extent;
        const wkt = format.writeGeometry(fromExtent(extent), {
            dataProjection: view.projection,
            featureProjection: view.projection,
        });
        table.rows[3].cells[1].innerHTML = extent;

        /** converteer naar "GPS" coordinaten */
        const latlon = application.utils.Point(center).transform('EPSG:28992', 'EPSG:4326').getCoordinates();
        table.rows[4].cells[1].innerHTML = latlon;
    });
};
