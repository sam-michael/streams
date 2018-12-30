import React from 'react'
import {Field, reduxForm} from 'redux-form'

class StreamForm extends React.Component {

    renderError = (error, touched) => {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            ) 
        } 
    }
    
    renderInput = ({input, label, meta: {error, touched}}) => {
        const className = `field ${error && touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(error, touched)}
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }

    render () {
        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
                <Field name='title' component={this.renderInput} label="Enter a title"/>
                <Field name='description' component={this.renderInput} label="Enter a description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must provide a title!'
    }

    if (!formValues.description) {
        errors.description = 'You must provide a description!'
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm)

