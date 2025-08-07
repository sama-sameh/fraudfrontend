export const METADATA = {
  customer:{
    title:'Add New Customer',
    button:'Add Customer',
    fields:
      [
        {
          name:'Name',
          type:'text',
          validators:['required'],
        },
        {
          name:'Nationality Number',
          type:'number',
          validators: ['required', 'maxLength:14', 'minLength:14'],
        },
        {
          name:'Phone Number',
          type:'text',
          validators: ['required', 'minLength:11','maxLength:11','pattern(/^[0-9]{10,15}$/)]'],
        },

      ]
  },
  account:{
    title:'Open New Bank Account',
    button:'Create Account',
    fields:
      [
        {
          name:'Currency',
          type:'dropdown',
          validators:['required'],
          datasource:'getCurrencies',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        },
        {
          name:'Type',
          type:'dropdown',
          validators: ['required'],
          datasource:'getAccountTypes',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        },
        {
          name:'Balance',
          type:'number',
          validators: ['required','min:1000'],

        },
        {
          name:'Customer',
          type:'dropdown',
          validators: ['required'],
          datasource:'getCustomers',
          valueField: 'id',
          displayField: 'name',
          multiple:false
        },

      ]
  },
  rule:{
    title:'Add New Rule',
    button:'Add Rule',
    fields:
      [
        {
          name:'Rule Name',
          type:'text',
          validators:['required'],
        },
        {
          name:'Type',
          type:'text',
          validators: ['required'],
        },
        {
          name:'Status',
          type:'dropdown',
          validators: ['required'],
          datasource:'getStatus',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        },
        {
          name:'Priority',
          type:'dropdown',
          validators: ['required'],
          datasource:'getPriority',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        }
      ]
  },
  condition:{
    title:'Add New Condition',
    button:'Add Condition',
    fields:
      [
        {
          name:'Type',
          type:'dropdown',
          validators: ['required'],
          datasource:'getConditionTypes',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        },
        {
          name:'Operator',
          type:'dropdown',
          validators:['required'],
          datasource:'getOperators',
          valueField: 'value',
          displayField: 'label',
          multiple:false
        },
        {
          name:'Value',
          type:'number',
          validators: ['required'],

        },
        {
          name:'Rule',
          type:'dropdown',
          validators: ['required'],
          datasource:'getRules',
          valueField: 'ruleId',
          displayField: 'rule_name',
          multiple:false
        },
      ]
  },
}
