/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue'
// import echarts from "echarts";

import {
  Layout,
  Input,
  Button,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Table,
  Radio,
  Tabs,
  Icon,
  Popover,
  Dropdown,
  List,
  Steps,
  Menu,
  Tooltip,
  DatePicker,
  TimePicker,
  Upload,
  message,
  notification,
  Modal,
  Switch,
  Drawer,
  Spin,
  Breadcrumb,
  Slider,
  Tree,
  Empty
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Steps)
Vue.use(Menu)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Switch)
Vue.use(Drawer)
Vue.use(Spin)
Vue.use(Breadcrumb)
Vue.use(Slider)
Vue.use(Tree)
Vue.use(Empty)
Vue.use(notification)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
// Vue.prototype.$echarts = echarts;