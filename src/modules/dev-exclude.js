module.exports = function () {
    this.nuxt.hook('build:extendRoutes', async routes => {

        // console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);

        if (process.env.NODE_ENV !== 'production') {
            return;
        }

        const routesToGenerate = routes.filter(page => {
            return page.name.match(/^dev-/) ? false : true
        });
        routes.splice(0, routes.length, ...routesToGenerate);
    });
}
