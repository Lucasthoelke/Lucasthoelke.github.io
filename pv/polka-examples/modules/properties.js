
export const observe = (module) => {

    /** bind observable properties */
    module.bind(({ properties }) => {
        properties.subscribe({
            next: (props) => {
                console.log(`[${module.meta.name}] properties changed`, props);
            },
        });
    });
};

export const get = (module) => {
    module.get("my-property");
    const properties = module.getProperties();
};

export const set = (module) => {
    module.set("my-property", "my value");
    module.setProperties({
        "my-property": "new value",
        "name": "",
    });
};
