import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from '../history'

import Header from './Hearder'
import StreamShow from './streams/StreamShow'
import StreamList from './streams/StreamList'
import StreamEdit from './streams/StreamEdit'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header className="ui-container"/>
                    <Switch>
                        <Route component={StreamList} path='/' exact/>
                        <Route component={StreamCreate} path='/streams/new' exact/>
                        <Route component={StreamEdit} path='/streams/edit/:id' exact/>
                        <Route component={StreamDelete} path='/streams/delete/:id' exact/>
                        <Route component={StreamShow} path='/streams/:id' exact/>
                    </Switch>
                </div>
            </Router>
        </div>
        )
}

export default App