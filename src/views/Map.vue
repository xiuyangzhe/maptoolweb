<template>
<div>
    <div id="mouse-position"></div>
    <form>
        <label>Projection </label>
        <select id="projection">
            <option value="EPSG:4326">EPSG:4326</option>
            <option value="EPSG:3857">EPSG:3857</option>
        </select>
        <label>Precision </label>
        <input id="precision" type="number" min="0" max="12" value="4" />
    </form>
    <div id="mapdiv"></div>
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
} from 'vue-property-decorator';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';

@Component
export default class Map extends Vue {
    private mounted() {
        console.log('map vue ini');
        const mouseinfoid = 'mouse-position';
        const mapid = 'mapdiv';
        const mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.
            className: 'custom-mouse-position',
            target: document.getElementById(mouseinfoid),
            undefinedHTML: '&nbsp;',
        });

        const projectionSelect = document.getElementById('projection');
        if (projectionSelect != null) {
            projectionSelect.addEventListener('change', (event) => {
                mousePositionControl.setProjection(event.target);
            });
        }

        const precisionInput = document.getElementById('precision');
        if (precisionInput != null) {
            precisionInput.addEventListener('change', (event) => {
                const format = createStringXY(event.target);
                mousePositionControl.setCoordinateFormat(format);
            });
        }

        const mapdiv = document.getElementById(mapid);
        const control = defaultControls().extend([mousePositionControl]);
        const map = new OlMap({
            controls: control,
            target: mapid,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: '/mapdata/{z}/{x}/{y}.png',
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([120, 30]),
                zoom: 10,
                minZom: 7,
            }),
        });
    }
}
</script>
