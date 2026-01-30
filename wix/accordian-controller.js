const minusIcon = "https://static.wixstatic.com/shapes/2ff80b_e4a7b84e5cf24d348bce9da61cf324e3.svg";
const plusIcon = "https://static.wixstatic.com/shapes/2ff80b_655b256d2b044c75aa42c84e198df5ab.svg";

export default class Accordian {
    constructor(repeaterId, triggerButtonId, collapsingBoxId) {
        this.repeaterId = repeaterId;
        this.triggerButtonId = triggerButtonId;
        this.collapsingBoxId = collapsingBoxId;

        this.init = this.init.bind(this);
        this.repeater_assignItemEvents = this.repeater_assignItemEvents.bind(this);
        this.getItemTriggerButton = this.getItemTriggerButton.bind(this);
        this.getItemCollapsingBox = this.getItemCollapsingBox.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);

        this.isInitiated = false;

        this.init();
    }

    get repeater() {
        return $w(`#${this.repeaterId}`);
    }

    init() {
        if (this.isInitiated) {
            return;
        }

        console.log('init');

        this.repeater.onItemReady(this.repeater_assignItemEvents);

        this.repeater.forEachItem(this.repeater_assignItemEvents);

        this.isInitiated = true;
    }

    repeater_assignItemEvents($item) {
        console.log('repeater_assignItemEvents');

        this.getItemTriggerButton($item).onClick(this.toggle);
    }

    getItemTriggerButton($item) {
        return $item(`#${this.triggerButtonId}`);
    }

    getItemCollapsingBox($item) {
        return $item(`#${this.collapsingBoxId}`);
    }

    toggle(event) {
        console.log('toggle');

        const $item = $w["at"](event.context);

        if (this.getItemCollapsingBox($item)?.collapsed) {
            this.open($item);
        } else {
            this.close($item);
        }
    }

    close($item) {
        console.log('close');

        this.getItemCollapsingBox($item)?.collapse();

        this.getItemTriggerButton($item).icon = plusIcon;
    }

    open($item) {
        console.log('open');

        this.getItemCollapsingBox($item)?.expand();

        this.getItemTriggerButton($item).icon = minusIcon;
    }
}