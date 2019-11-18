import { inputConf } from './control/Input'
import { selectConf } from './control/Select'
import { radioConf } from './control/Radio'
import { checkBoxConf } from './control/CheckBox'
import { cascaderConf } from './control/Cascader'
import { textConf } from './control/Text'
import { titleConf } from './control/Title'
import { hrConf } from './control/Hr'
import { pConf } from './control/P'
import { uploadsConf } from './control/Uploads'
import { datePickerConf } from './control/DatePicker'

const inputMapper = {
  title: titleConf,
  hr: hrConf,
  p: pConf,
  input: inputConf,
  select: selectConf,
  radio: radioConf,
  checkbox: checkBoxConf,
  datepicker: datePickerConf,
  cascader: cascaderConf,
  uploads: uploadsConf,
  text: textConf
}
const form_list = []
for (const i in inputMapper) {
  form_list.push({
    ele: i,
    obj: inputMapper[i]
  })
}

export { inputMapper, form_list }
