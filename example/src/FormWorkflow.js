// @flow
import React, {useReducer} from 'react';
import {
  Alert,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import {
  FormBuilder,
  PredefinedGallery,
} from '@ginkgo-bioworks/react-json-schema-form-builder';
import withStyles from 'react-jss';
import Tabs from './tabs/Tabs';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ErrorBoundary from './ErrorBoundary';
import SingleForm from './SingleForm';

const Form = withTheme(Bootstrap4Theme);

type Props = {
  lang: string,
  schema: string,
  uischema: string,
  onChange?: (schema: string, uischema: string) => void,
  schemaTitle?: string,
  uischemaTitle?: string,
  width?: string,
  height?: string,
  classes: { [string]: any },
};

type State = {
  formData: any,
  formToggle: boolean,
  outputToggle: boolean,
  schemaFormErrorFlag: string,
  validFormInput: boolean,
  submissionData: any,
};

// return error message for parsing or blank if no error
function checkError(text: string, language: string) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return e.toString();
  }
  if (typeof data === 'string') {
    return 'Received a string instead of object.';
  }
  return '';
}

const styles = {
  codeViewer: {
    backgroundColor: 'lightgray',
    maxHeight: '550px',
    overflowY: 'auto',
  },
};


function reducer(state, action) {
  switch (action.type) {
    case 'add_form':
      console.log('adding form')
      return Object.assign(state, {forms: [...state.forms, {}]})
    default:
      throw new Error();
  }
}

const initialState = {
  formData: {},
  formToggle: true,
  outputToggle: false,
  schemaFormErrorFlag: '',
  validFormInput: false,
  editorWidth: 700,
  submissionData: {},
  forms: [{}]
};

export default function FormWorkflow (props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const singleForms = state.forms.map(_ => {
    return (
      <SingleForm
        schema={props.schema}
        uischema={props.uischema}
        mods={props.mods}
        onChange={(newSchema: string, newUiSchema: string) => {
          if (props.onChange)
            props.onChange(newSchema, newUiSchema);
        }} />
    )
  })

    return (
      <div>
        {singleForms}
        <Button
          onClick={() => {
            dispatch({type: 'add_form', })
          }}
          color='secondary'
        >
        Add form
        </Button>
      </div>
    );
}

      // <SingleForm
      //   schema={this.props.schema}
      //   uischema={this.props.uischema}
      //   mods={this.props.mods}
      //   onChange={(newSchema: string, newUiSchema: string) => {
      //     if (this.props.onChange)
      //       this.props.onChange(newSchema, newUiSchema);
      // }}
