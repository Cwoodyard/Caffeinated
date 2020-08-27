
MODULES.moduleClasses["casterlabs_donation_ticker"] = class {

    constructor(id) {
        this.namespace = "casterlabs_donation_ticker";
        this.type = "overlay settings";
        this.id = id;
        this.raised = 0;
    }

    linkDisplay = {
        path: "https://caffeinated.casterlabs.co/donationticker.html",
        option: {
            name: "Reset",
            onclick(instance) {
                instance.raised = 0;
                instance.update();
            }
        }
    };

    getDataToStore() {
        return this.settings;
    }

    onConnection(socket) {
        MODULES.emitIO(this, "config", this.settings, socket);
        MODULES.emitIO(this, "amount", this.raised, socket);
    }

    init() {
        const instance = this;
        koi.addEventListener("donation", (event) => {
            instance.raised += event.currency_info.amount;
            instance.update();
        });
    }

    update() {
        MODULES.emitIO(this, "amount", formatAmountToLocalCurrency(this.raised));
    }

    onSettingsUpdate() {
        MODULES.emitIO(this, "config", this.settings);
    }

    settingsDisplay = {
        font: "font",
        font_size: "number",
        text_color: "color"
    };

    defaultSettings = {
        font: "Poppins",
        font_size: "16",
        text_color: "#FFFFFF",
        // overlay_width: 600
    };

};
