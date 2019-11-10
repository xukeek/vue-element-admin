<template>
  <div class="content with-diagram">
    <div ref="canvas" class="canvas" />
    <div ref="properties" class="properties-panel-parent" />
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import 'diagram-js/assets/diagram-js.css'
import 'bpmn-font/dist/css/bpmn.css'
import '@/styles/app.css'
import '@/styles/properties.css'
import diagramXML from 'raw-loader!./newDiagram.bpmn'
import propertiesProviderModule from './properties'
import magicModdleDescriptor from './properties/descriptors/magic'

export default {
  name: 'WorkflowCreate',
  data() {
    return {
      modeler: undefined
    }
  },
  mounted: function() {
    this.initModeler()
  },
  beforeDestroy: function() {
    this.modeler.destroy()
  },
  methods: {
    initModeler() {
      const container = this.$refs.canvas
      const properties = this.$refs.properties
      this.modeler = new BpmnModeler({
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        container: container,
        propertiesPanel: {
          parent: properties
        },
        moddleExtensions: {
          magic: magicModdleDescriptor
        }
      })
      const self = this
      this.modeler.on('import.done', function(event) {
        const error = event.error
        const warnings = event.warnings
        self.$notify({
          title: error ? 'Error' : 'Success',
          message: warnings,
          type: error ? 'error' : 'success',
          duration: 2000
        })
        self.modeler.get('canvas').zoom('fit-viewport')
      })
      this.modeler.importXML(diagramXML)
    }
  }
}
</script>
