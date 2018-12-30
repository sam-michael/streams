import React from 'react'
import {connect} from 'react-redux'
import flv from 'flv.js'
import {fetchStream} from '../../actions'

class StreamShow extends React.Component {

    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const {fetchStream, match: {params: {id}}} = this.props
        fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        const {match: {params: {id}}} = this.props

        if (this.player || !this.props.stream) {
            return
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render() {
        const {stream} = this.props
        if(!stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls/>
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params
    return {
        stream: state.streams[id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow)