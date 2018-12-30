import React from 'react'
import {connect} from 'react-redux'

import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '526189221619-0njm9fgb3if64inl7is3qu118li37jkb.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = isSigneIn => {
        if (isSigneIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSingInClick = () => {
        this.auth.signIn()
    }

    onSingOutClick = () => {
        this.auth.signOut()

    }

    renderSignOutButton = () => {
        return (
            <button className="ui red google button" onClick={this.onSingOutClick}>
                <i className="google icon"/>
                Sign out
            </button>
        )
    }

    renderSignInButton = () => {
        return (
            <button className="ui green google button" onClick={this.onSingInClick}>
                <i className="google icon"/>
                Sign in with Google
            </button>
        )
    }

    renderAuthButton = () => {
        const {isSignedIn} = this.props
        if (isSignedIn) {
            return this.renderSignOutButton()
        } else if (isSignedIn === false) {
            return this.renderSignInButton()
        } else if (isSignedIn === null) {
            return null
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}
const mapStateToProps = store => {
    return {
        isSignedIn: store.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)