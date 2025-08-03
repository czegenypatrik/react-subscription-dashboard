import React, { useState, useEffect } from 'react'
import SubscriptionCard from '../components/SubscriptionCard'
import { supabase } from '/utils/supabase'
import {
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const Subscriptions = () => {

  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [memberships, setMemberships] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState(null)

  useEffect(() => {
    const fetchMemberships = async () => {
      const { data, error } = await supabase
        .from('Membership')
        .select('*')
        .order('ValidDays', { ascending: false })

      if (error) {
        console.error('Error fetching memberships:', error)
      } else {
        setMemberships(data)
      }
    }

    fetchMemberships()
  }, [])

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('Purchases')
        .select(`
          Id,
          Price,
          CreatedDate,
          Members:BuyerId (
            Id,
            Name
          ),
          Membership:PassId (
            Id,
            Type,
            ValidDays
          ),
          AspNetUsers:CreatorId (
            Id,
            UserName
          )
        `)
        .order('CreatedDate', { ascending: false })

      if (error) {
        console.error('Failed to fetch purchases:', error)
        setError(error)
      } else {
        setPurchases(data)
      }

      setLoading(false)
    }

    fetchPurchases()
  }, []) // empty dependency array = run once on mount

  const handleClick = (membership) => {
    setSelectedMembership(membership)
    setVisible(true)
  }
  const handlePurchase = () => {
    console.log('Purchasing membership:', selectedMembership)
    setVisible(false)
  }
  return (
    <>
      <CRow xs={{ gutter: 4 }} className="mb-4">
        {memberships.map((membership) => (
          <CCol xs={12} sm={6} md={4} lg={3} key={membership.Id}>
            <SubscriptionCard
              name={membership.Type}
              price={`${membership.Price} Ft`}
              description={membership.Description}
              onClick={() => handleClick(membership)}
            />
          </CCol>
        ))}
      </CRow>

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">
            {selectedMembership?.Type || 'Membership Info'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedMembership?.Description || 'No description available.'}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handlePurchase()}>Buy</CButton>
        </CModalFooter>
      </CModal>
      
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Membership</CTableHeaderCell>
            <CTableHeaderCell>Price</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {purchases.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan={5} className="text-center">
                No members found.
              </CTableDataCell>
            </CTableRow>
          ) : (
            purchases.map((purchase) => (
              <CTableRow key={purchase.Id}>
                <CTableDataCell>{purchase.Members?.Name}</CTableDataCell>
                <CTableDataCell>{purchase.Membership?.Type}</CTableDataCell>
                <CTableDataCell>{purchase.Price} Ft</CTableDataCell>
                <CTableDataCell>{new Date(purchase.CreatedDate).toLocaleDateString()}</CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Subscriptions
