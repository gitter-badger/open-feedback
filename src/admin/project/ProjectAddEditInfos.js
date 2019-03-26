import React, { Component } from 'react'
import styled from 'styled-components'
import Box from '../../baseComponents/design/Box'
import OFInput from '../../baseComponents/design/OFInput'
import Button from '../../baseComponents/design/Button'

const Wrapper = styled(Box)`
    padding: 15px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
`

const defaultState = {
    name: '',
    websiteLink: '',
    scheduleLink: '',
    logoSmall: '',
    favicon: '',
    contact: '',
    owner: '',
    members: [],
    chipColors: ['999999'],
    errors: []
}

const InputLabel = styled.label`
    font-size: 17px;
    margin-bottom: 10px;
    display: block;
`

const InputWrapper = styled(Box)`
    text-align: left;
    flex: 1;
    padding: 10px;
`

class ProjectAddEditInfos extends Component {
    constructor(props) {
        super(props)
        this.state = defaultState
    }

    componentDidMount() {
        if (this.props && this.props.project) {
            this.updateLocalStateFromProps(
                Object.assign({}, defaultState, this.props.project)
            )
        } else {
            this.updateLocalStateFromProps(null)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateLocalStateFromProps(nextProps.project)
    }

    updateLocalStateFromProps(project) {
        if (!project) {
            project = defaultState
        }
        this.setState({
            name: project.name,
            websiteLink: project.websiteLink,
            scheduleLink: project.scheduleLink,
            logoSmall: project.logoSmall,
            favicon: project.favicon,
            contact: project.contact,
            chipColors: JSON.stringify(project.chipColors)
        })
    }

    checkMissingData(field, errorArray, errorMessage) {
        if (!field) {
            errorArray.push(errorMessage)
            return true
        }
        return false
    }

    onValidateClick(data) {
        const project = {
            name: data.name,
            websiteLink: data.websiteLink,
            scheduleLink: data.scheduleLink,
            logoSmall: data.logoSmall,
            favicon: data.favicon,
            contact: data.contact
        }

        const errors = []
        this.checkMissingData(project.name, errors, 'Missing project name')
        this.checkMissingData(
            project.websiteLink,
            errors,
            'Missing websiteLink'
        )
        this.checkMissingData(
            project.scheduleLink,
            errors,
            'Missing scheduleLink'
        )
        this.checkMissingData(project.logoSmall, errors, 'Missing logoSmall')
        this.checkMissingData(project.favicon, errors, 'Missing favicon')

        try {
            project.chipColors = JSON.parse(data.chipColors)
        } catch (error) {
            errors.push('chipColors are not formatted correctly')
        }

        this.setState({ errors: errors })

        if (errors.length === 0) {
            this.props.onSubmitClicked(project)
        }
    }

    render() {
        const { submitText } = this.props

        return (
            <>
                <Wrapper>
                    <InputWrapper w="100%">
                        <InputLabel>Event name</InputLabel>
                        <OFInput
                            value={this.state.name}
                            onChange={event =>
                                this.setState({
                                    name: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                </Wrapper>
                <Wrapper>
                    <InputWrapper>
                        <InputLabel>Event website</InputLabel>
                        <OFInput
                            value={this.state.websiteLink}
                            onChange={event =>
                                this.setState({
                                    websiteLink: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>Event schedule</InputLabel>
                        <OFInput
                            value={this.state.scheduleLink}
                            onChange={event =>
                                this.setState({
                                    scheduleLink: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                </Wrapper>
                <Wrapper>
                    <InputWrapper>
                        <InputLabel>Logo url(png, small)</InputLabel>
                        <OFInput
                            value={this.state.logoSmall}
                            onChange={event =>
                                this.setState({
                                    logoSmall: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>Favicon URL (png or ico)</InputLabel>
                        <OFInput
                            value={this.state.favicon}
                            onChange={event =>
                                this.setState({
                                    favicon: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                </Wrapper>
                <Wrapper>
                    <InputWrapper>
                        <InputLabel>
                            Contact email (in case of error or ?).
                            <br /> It will be somewhat public.
                        </InputLabel>
                        <OFInput
                            value={this.state.contact}
                            onChange={event =>
                                this.setState({
                                    contact: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputLabel>Chip colors</InputLabel>
                        <OFInput
                            value={this.state.chipColors}
                            onChange={event =>
                                this.setState({
                                    chipColors: event.target.value
                                })
                            }
                        />
                    </InputWrapper>
                </Wrapper>

                {this.state.errors.map((error, index) => {
                    return <Wrapper key={index}>{error}</Wrapper>
                })}

                <Wrapper>
                    <Button onClick={() => this.onValidateClick(this.state)}>
                        {submitText}
                    </Button>
                </Wrapper>
            </>
        )
    }
}

export default ProjectAddEditInfos
