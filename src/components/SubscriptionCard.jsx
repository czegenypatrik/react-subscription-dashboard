import { CCard } from '@coreui/react'
import React, { Component } from 'react'

export class SubscriptionCard extends Component {
  render() {
    const { name, price, description } = this.props

    return (
      <CCard className="subscription-card mb-4">
        <div className="card-header">{name || 'Subscription Details'}</div>
        <div className="card-body">
          <p><strong>Price:</strong> {price || 'N/A'}</p>
          <p className='text-center'><i>{description || 'No description available.'}</i></p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-success w-100" onClick={this.props.onClick}>
            Purchase
          </button>
        </div>
      </CCard>
    )
  }
}

export default SubscriptionCard