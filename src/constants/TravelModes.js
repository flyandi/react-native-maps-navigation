/**
 * @TravelModes
 */
import NavigationIcons from './NavigationIcons';

/**
 * @type {string}
 */
export const DRIVING = 'DRIVING';

/**
 * @type {string}
 */
export const WALKING = 'WALKING';

/**
 * @type {string}
 */
export const TRANSIT = 'TRANSIT';

/**
 * @type {string}
 */
export const BICYCLING = 'BICYCLING';

/**
 * Mapping
 * @type {*[]}
 */
export const MODE_MAPPING = {
    [DRIVING]: {
        mode: DRIVING,
        name: 'Driving',
        icon: NavigationIcons.directionsDriving,
    },
    [WALKING]: {
        mode: WALKING,
        name: 'Walking',
        icon: NavigationIcons.directionsWalk,
    },
    [TRANSIT]: {
        mode: TRANSIT,
        name: 'Transit',
        icon: NavigationIcons.directionsTransit,
    },
    [BICYCLING]: {
        mode: BICYCLING,
        name: 'Bicycling',
        icon: NavigationIcons.directionsBike,
    }
};

/**
 * Default Modes
 * @type {*[]}
 */
export const DEFAULT_MODES = [DRIVING, WALKING, TRANSIT, BICYCLING];


/**
 * @default export
 */
export default {DRIVING, WALKING, TRANSIT, BICYCLING}

