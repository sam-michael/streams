import React from 'react'
import {connect} from 'react-redux'
import history  from '../../history'
import {Link} from 'react-router-dom'
import {fetchStream, deleteStream} from '../../actions'

import Modal from '../Modal'


class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const {deleteStream, match: {params: {id}}} = this.props
        return (
            <React.Fragment>
                <Link className="ui button" to='/'>Cancel</Link>
                <button className="ui button negative" onClick={() => deleteStream(id)}>Delete</button>
            </React.Fragment>
        )
    }

    renderContent() {
        const {stream} = this.props
        if (!stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete the stream with title: ${stream.title}?`

    }

    render() {
        return (
            <Modal
                title='Delete stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)