import Components from '@packages/components';
const installer = (plugin) => {
    return {
        install: (app) => {
            plugin.forEach((i) => {
                app.use(i);
            });
        },
    };
};
export default installer(Components);
