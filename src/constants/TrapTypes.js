/**
 * Trap Options
 * @type {{SINGLE_FIRE: string, AUTO_EXPIRE: string}}
 */
export const OPTIONS = {
    SINGLE_FIRE: 'SINGLE_FIRE',
    AUTO_EXPIRE: 'AUTO_EXPIRE',
};

/**
 * TrapEvents
 * @type {{ENTERED: string, ENTERED_ON_COURSE: string, ENTERED_OFF_COURSE: string, INSIDE: string, INSIDE_CENTER: string, LEAVING: string, LEFT_ON_COURSE: string, LEFT_OFF_COURSE: string}}
 */
export const EVENTS = {
    ENTERING: 'ENTERING',
    ENTERING_ON_COURSE: 'ENTERING_ON_COURSE',
    ENTERING_OFF_COURSE: 'ENTERING_OFF_COURSE',
    INSIDE: 'INSIDE',
    INSIDE_CENTER: 'INSIDE_CENTER',
    LEAVING: 'LEAVING',
    LEAVING_ON_COURSE: 'LEAVING_ON_COURSE',
    LEAVING_OFF_COURSE: 'LEAVING_OFF_COURSE',
};

/**
 *
 * @type {{OUTSIDE: string, ENTERED: string, INSIDE: string, LEFT: string, EXPIRED: string}}
 */
export const STATES = {
    OUTSIDE: 'OUTSIDE',
    ENTERED: 'ENTERED',
    INSIDE: 'INSIDE',
    CENTER: 'CENTER',
    LEAVING: 'LEAVING',
    LEFT: 'LEFT',
    EXPIRED: 'EXPIRED',
}

/**
 * TrapTypes
 * @type {{POLYGON: string, CIRCLE: string, STEP: string}}
 */
export const TYPES = {
    POLYGON: 'POLYGON',
    CIRCLE: 'CIRCLE',
    STEP: 'STEP',
}

/**
 * @export
 */
export default {
    Events: EVENTS,
    States: STATES,
    Types: TYPES,
    Options: OPTIONS
};