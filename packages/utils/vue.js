export function withInstall(plugin) {
    const comp = plugin;
    comp.install = (app) => {
        app.component(comp.name, plugin);
    };
    return plugin;
}
