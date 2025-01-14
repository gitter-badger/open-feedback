import React, { Component } from 'react'

import Header from './layout/Header'
import { withStyles } from '@material-ui/core'
import '../App.css'
import { connect } from 'react-redux'
import { setFavicon } from './layout/utils'
import { authActions } from './auth'
import {
    getProjectLoadError,
    getProjectSelector,
    getProjectVotesError
} from './project/projectSelectors'
import * as projectActions from './project/projectActions'
import Error from '../baseComponents/customComponent/Error'
import LoaderMatchParent from '../baseComponents/customComponent/LoaderMatchParent'
import { getLoginErrorSelector } from './auth/authSelectors'
import Footer from './layout/Footer'
import { getSessionsDates } from './sessions/core/sessionsSelectors'

const styles = theme => ({
    loading: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    layout: {
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        boxSizing: 'border-box',
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2
        }
    }
})

class AppLayout extends Component {
    componentWillMount() {
        const id = this.props.match.params.projectId
        this.props.getProject(id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { date, projectId } = this.props.match.params

        if (!date && nextProps.dates.length > 0) {
            this.props.history.replace(`/${projectId}/${nextProps.dates[0]}`)
        }
        if (nextProps.project && !this.props.project) {
            const project = nextProps.project
            document.title = project.name + ' - Feedback'
            setFavicon(project.favicon)
            this.props.signIn()
        }
    }

    render() {
        const {
            classes,
            project,
            projectLoadError,
            projectVotesError,
            loginError,
            children
        } = this.props

        if (loginError) {
            return (
                <Error
                    error="Fail to anonymously login you."
                    errorDetail={loginError}
                />
            )
        } else if (projectLoadError) {
            return (
                <Error
                    error="Unable to load the project."
                    errorDetail={projectLoadError}
                />
            )
        } else if (projectVotesError) {
            return (
                <Error
                    error="Unable to load the votes and/or the vote options."
                    errorDetail={projectVotesError}
                />
            )
        } else if (!project) {
            return <LoaderMatchParent />
        } else {
            return (
                <div>
                    <Header project={project} />

                    <div className={classes.layout}> {children}</div>
                    <Footer />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    project: getProjectSelector(state),
    dates: getSessionsDates(state),
    projectLoadError: getProjectLoadError(state),
    projectVotesError: getProjectVotesError(state),
    loginError: getLoginErrorSelector(state)
})

const mapDispatchToProps = Object.assign({}, projectActions, authActions)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AppLayout))
