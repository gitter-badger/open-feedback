import React, { Component } from 'react'
import styled from 'styled-components'
import Box from '../../baseComponents/design/Box'
import { connect } from 'react-redux'
import { getSelectedProjectSelector } from './core/projectSelectors'
import { Link } from 'react-router-dom'
import LoaderMatchParent from '../../baseComponents/customComponent/LoaderMatchParent'
import { getProject } from './core/projectActions'

const Wrapper = styled(Box)`
    height: 100vh;
    padding: 15px;
    display: flex;
`

class ProjectDashboard extends Component {
    componentDidMount() {
        this.props.getProject()
    }

    render() {
        const { project, match } = this.props

        if (!project) {
            return <LoaderMatchParent />
        }

        return (
            <Wrapper>
                {project.name} Dashboard
                <br />
                Stats will be displayed here
                <Link to={`${match.url}/edit`}>Edit</Link>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    project: getSelectedProjectSelector(state)
})

const mapDispatchToProps = Object.assign(
    {},
    {
        getProject: getProject
    }
)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDashboard)
