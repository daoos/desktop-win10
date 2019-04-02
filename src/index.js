import BasicTable from './components/basic-table';
import CodeMirror from './components/code-mirror';
import JsonView from './components/json-view';
import StatusIcon from './components/status-icon';
import CommonDetail from './components/common-detail';
import SmartTable from './components/smart-table';
import TreeTable from './components/tree-table';
import UploadFile from './components/upload-file';
import Icon from './components/icon';
import PasswordInput from './components/password-input';
import CmpForm from './components/cmp-form';
import Layout from './components/layout';
import Request from './utils/request';
import lodash from 'lodash';
import elDragDialog from './directive/dialogDrag';
import * as tools from './utils/tools';
const components = {
    BasicTable,
    CodeMirror,
    JsonView,
    StatusIcon,
    CommonDetail,
    SmartTable,
    TreeTable,
    Icon,
    PasswordInput,
    UploadFile,
    ...CmpForm,
    ...Layout,
    Request
};
const install = function(Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
    Vue.directive('elDragDialog', elDragDialog);
    Vue.prototype.$http = Request(opts.request);
    Vue.prototype._ = lodash;
    Vue.prototype.$tools = tools;
    Vue.prototype.$RULES = opts.rules;

};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports.default = module.exports = {
    ...components,
    install
}; // eslint-disable-line no-undef
