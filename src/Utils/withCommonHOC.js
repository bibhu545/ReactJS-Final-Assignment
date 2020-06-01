import React, { Component } from 'react'

const withCommonHOC = (CurrentComponent) => {

    class UpdatedComponent extends Component {

        constructor(props) {
            super(props)

            this.state = {
                order: false
            }
        }

        sortData = (data, key) => {
            let sortOrder = this.state.order
            this.setState({
                order: !sortOrder
            }, () => {
                data.sort(function (a, b) {
                    return (sortOrder ? (a[key] > b[key] ? 1 : -1) : (a[key] > b[key] ? -1 : 1));
                });
                this.setState({})
            })
        }

        render() {
            return (
                <CurrentComponent {...this.props} sortData={this.sortData} />
            )
        }
    }

    return UpdatedComponent;
}

export default withCommonHOC