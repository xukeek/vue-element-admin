import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'

import {
  is
} from 'bpmn-js/lib/util/ModelUtil'

export default function(group, element) {
  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:UserTask')) {
    group.entries.push(entryFactory.textField({
      id: 'from',
      label: 'Form key',
      modelProperty: 'formKey'
    }))
    group.entries.push(entryFactory.textField({
      id: 'candidateGroups',
      label: 'Candidate Groups',
      modelProperty: 'candidateGroups'
    }))
  }
}
