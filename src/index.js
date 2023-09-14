import TukiButtonVue from './components/TukiButton.vue'
import TukiCardVue from './components/TukiCard.vue'
import TukiDatePickerVue from './components/TukiDatePicker.vue'
import TukiFormVue from './components/TukiForm.vue'
import TukiFormItemVue from './components/TukiFormItem.vue'
import TukiInputVue from './components/TukiInput.vue'
import TukiLoadingVue from './components/TukiLoading.vue'
import TukiPaginationVue from './components/TukiPagination.vue'
import TukiRadioVue from './components/TukiRadio.vue'
import TukiTableVue from './components/TukiTable.vue'
import TukiTableColumnVue from './components/TukiTableColumn.vue'
import TukiTableExpandVue from './components/TukiTableExpand.vue'


export default {
    install: (app, options) => {
        app
        .component('TukiButton', TukiButtonVue)
        .component('TukiCard', TukiCardVue)
        .component('TukiDatePicker', TukiDatePickerVue)
        .component('TukiForm', TukiFormVue)
        .component('TukiFormItem', TukiFormItemVue)
        .component('TukiInput', TukiInputVue)
        .component('TukiLoading', TukiLoadingVue)
        .component('TukiPagination', TukiPaginationVue)
        .component('TukiRadio', TukiRadioVue)
        .component('TukiTable', TukiTableVue)
        .component('TukiTableColumn', TukiTableColumnVue)
        .component('TukiTableExpand', TukiTableExpandVue)
    }
}