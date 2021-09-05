let resourceConstant= Object.freeze({
      INDEX_TYPE_: 0,
      INDEX_ATTRIBUTES_: 1,
      INDEX_CHILDREN_: 2,
      UNKNOWN_: "UNKNOWN",
      CONTENT_: "CONTENT",
      RESOURCE_ID: "resourceId",
      RESOURCE_ORIG_ID_: "resourceOrigId",
      TEXT_EDITOR_TYPE: "TextEditor",
      IMAGE_TYPE: "ImageEditor",
      TABLE_EDITOR_TYPE: "TableEditor",
      ROWS_TYPE: "Rows",
      ROW_TYPE: "Row",
      CELL_TYPE: "Cell",
      TEXT_STYLE_TYPE: "TextStyle",
      TEXT_LINE_TYPE: "TextLine",

      //Start  Workflow constant
      WF_Description_TYPE:'xpdl:Description',
      WF_ExtendedAttributes_TYPE:'xpdl:ExtendedAttributes',
      WF_Implementation_TYPE:'xpdl:Implementation',
      WF_Tool_TYPE:'xpdl:Tool',
      WF_ACTIVITIES_TYPE:'xpdl:Activities',
      WF_ACTIVITY_TYPE:'xpdl:Activity',
      WF_TRANSITIONS_TYPE:'xpdl:Transitions',
      WF_TRANSITION_TYPE:'xpdl:Transition',
      WF_PLUGIN_PYTHON_TYPE:'pluginPython',
      WF_REPOSITORY_WORKFLOW_TYPE:'repository:Workflow',
      WF_XPDL_TYPE:'XPDL',
      WF_XPDL_PACKAGE_TYPE:'xpdl:Package',
      WF_XPDL_WORKFLOW_PROCESSES_TYPE:'xpdl:WorkflowProcesses',
      WF_XPDL_WORKFLOW_PLUGIN_SOURCES_TYPE :'xpdl:PluginSources',
      WF_XPDL_WORKFLOW_PLUGIN_SOURCE_TYPE :'xpdl:PluginSource',
      WF_XPDL_WORKFLOW_PROCESS_TYPE:'xpdl:WorkflowProcess',
      WF_APPLICATION_TYPE:"APPLICATION",
      WF_REPOSITORY_JOB_TICKET_CONFIG_TYPE:"repository:jobTicketConfig",
      // END Workflow constant

      // TEXT CONSTANT
      ZERO_WIDTH_SPACE: "\u200b",
      // END TEXT CONSTANT

      // TYPE_RESOURCE
      TYPE_RESOURCE_WORKFLOW: "workflow",
      //END TYPE_RESOURCE

      // COMMON ATTRIBUTES -------------->
      ATTR_ID:"id",
      ATTR_VERSION:"version",
      ATTR_NAME:"name",
      ATTR_POINT_X:"pointX",
      ATTR_POINT_Y:"pointY",
      ATTR_TO:"to",
      ATTR_FROM:"from",
      ATTR_TYPE:"type",
      // END COMMON ATTRIBUTES <------------
    });

export default resourceConstant;