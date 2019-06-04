import { check } from "../utils/auth";

function install(Vue, options = {}) {
  //用户自定义指令，不传的话默认为auth
  Vue.directive(options.name || "auth", {
    inserted: function(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default install;
