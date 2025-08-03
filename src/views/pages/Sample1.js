import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import WeatherWidget from '../../components/WeatherWidget'
import DataList from '../../components/DataList'

export class sample1 extends Component {
  static propTypes = {}

  render() {
    return (
        <>
          <CCard className="mb-4">
            <CCardHeader>Weather Widget</CCardHeader>
              <CCardBody>
                <CRow>
                  <WeatherWidget />
                </CRow>
              </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>List of DB stuff</CCardHeader>
              <CCardBody>
                <CRow>
                  <DataList />
                </CRow>
              </CCardBody>
          </CCard>
        </>
    )
  }
}

export default sample1