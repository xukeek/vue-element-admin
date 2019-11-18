import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'

import {
  is
} from 'bpmn-js/lib/util/ModelUtil'

export default function(group, element, bpmnFactory, canvas, elementRegistry, translate, propertiesOptions) {
  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:UserTask')) {
    group.entries.push(entryFactory.selectBox({
      id: 'form',
      label: translate('Form'),
      selectOptions: propertiesOptions('form'),
      modelProperty: 'formKey',
      emptyParameter: false
    }))

    group.entries.push(entryFactory.selectBox({
      id: 'candidateGroups',
      label: translate('Candidate Groups'),
      selectOptions: [
        { value: 'admin', name: 'Admin' }
      ],
      modelProperty: 'candidateGroups',
      emptyParameter: false
    }))
  }
}
