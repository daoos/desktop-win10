import Desktop from './components/index';
const install = function(Vue, opts = {}) {
    if (install.installed) return;
  Vue.component('Desktop', Desktop);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports.default = module.exports = Desktop // eslint-disable-line no-undef
