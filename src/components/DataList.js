import React, { useState, useEffect } from 'react';
import { supabase } from '/utils/supabase';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CForm,
    CFormInput,
    CButton,
} from '@coreui/react';
import {
    cilUser,
    cilUserFemale,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';

function DataList() {
    const [members, setMembers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // term to trigger search

    // Fetch members when searchTerm changes
    useEffect(() => {
        async function getMembers() {
            let query = supabase.from('Members').select();

            if (searchTerm.trim() !== '') {
                // Use ilike for case-insensitive partial matching
                query = query.ilike('Name', `%${searchTerm}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching members:', error);
                setMembers([]); // clear results on error
                return;
            }

            setMembers(data || []);
        }

        getMembers();
    }, [searchTerm]);

    // Handle form submit (search button)
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    return (
        <>
            <div style={{ justifyItems: 'right' }}>
                <CForm onSubmit={handleSearch} className="mb-3 d-flex" style={{ gap: '10px', maxWidth: '400px' }}>
                    <CFormInput
                        type="text"
                        id="search"
                        placeholder="Enter name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <CButton type="submit" color="primary">
                        Search
                    </CButton>
                </CForm>
            </div>
            <CTable striped hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Birthday</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Joined Date</CTableHeaderCell>
                        <CTableHeaderCell>Gender</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {members.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan={5} className="text-center">
                                No members found.
                            </CTableDataCell>
                        </CTableRow>
                    ) : (
                        members.map((member) => (
                            <CTableRow key={member.Id}>
                                <CTableDataCell>{member.Name}</CTableDataCell>
                                <CTableDataCell>{new Date(member.Birthday).toLocaleDateString()}</CTableDataCell>
                                <CTableDataCell>{member.Email || '-'}</CTableDataCell>
                                <CTableDataCell>{new Date(member.JoinedDate).toLocaleDateString()}</CTableDataCell>
                                <CTableDataCell>
                                    {member.Gender === 'Férfi' ? <CIcon icon={cilUser} /> :
                                        member.Gender === 'Nő' ? <CIcon icon={cilUserFemale} /> :
                                            '-'}
                                </CTableDataCell>
                            </CTableRow>
                        ))
                    )}
                </CTableBody>
            </CTable>
        </>
    );
}

export default DataList;
