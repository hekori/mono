import { useGlobal } from '../GlobalProvider'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { CreateNewFeedback } from './pages/CreateNewFeedback'
import { IndexPage } from './pages/IndexPage'

export function App() {
    const { connect, accessToken } = useGlobal()
    const socket = connect(accessToken)
    socket.on('news', function (data) {
        console.log(data)
    })

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <IndexPage />
                </Route>
                <Route path="/landing" exact>
                    <LandingPage />
                </Route>
                <Route path="/create" exact>
                    <CreateNewFeedback />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
