import { inputConf } from './control/Input'
import { radioConf } from './control/Radio'
import { checkBoxConf } from './control/CheckBox'

const formList = {
  input: inputConf,
  radio: radioConf,
  checkBox: checkBoxConf
}
const list_arr = []
for (const i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  })
}
export default list_arr
