<template>
  <div class="content with-diagram" style="padding-top: 40px;">
    <el-button class="deploy-btn" type="primary" @click="handleDeploy">部署</el-button>
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
import { deployWorkflow } from '@/api/workflow'
import { queryForm } from '@/api/form'

export default {
  name: 'WorkflowCreate',
  data() {
    return {
      modeler: undefined,
      content: undefined,
      forms: []
    }
  },
  created() {
    queryForm({
      name: undefined,
      page: 1,
      size: 30,
      deleted: false,
      tags: [],
      orderBy: null
    }).then(response => {
      this.forms = response.data.content.map(a => {
        return { value: a.id, name: a.name }
      })
    })
  },
  mounted: function() {
    this.initModeler()
  },
  beforeDestroy: function() {
    this.modeler.destroy()
  },
  methods: {
    initModeler() {
      const that = this
      function propertiesOptions(type) {
        if (type === 'form') {
          return that.$data.forms
        }
      }

      const container = this.$refs.canvas
      const properties = this.$refs.properties
      this.modeler = new BpmnModeler({
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule,
          {
            propertiesOptions: ['value', propertiesOptions]
          }
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
        if (error) {
          self.$notify({
            title: 'Error',
            message: warnings,
            type: 'error',
            duration: 2000
          })
        }
        self.modeler.get('canvas').zoom('fit-viewport')
      })
      this.modeler.importXML(diagramXML)
    },
    saveDiagram(done) {
      this.modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml)
      })
    },
    handleDeploy() {
      this.saveDiagram(function(e, xml) {
        console.info(xml)
        deployWorkflow({ content: xml })
      })
    }
  }
}
</script>
<style scoped>
  .deploy-btn {
    position: absolute;
    right: 280px;
    top: 20px;
    z-index: 999999;
  }
</style>
