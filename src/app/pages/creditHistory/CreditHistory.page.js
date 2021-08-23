import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { useParams, Link } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const ReviewsPage = () => {
  const params = useParams()
  const [users, setUsers] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/creditHistory/find'
  }, { manual: true })

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (data) setUsers(data)
  }, [loading])

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            pagination={true}
            progressPending={loading}
            data={users}
            columns={[
              { name: 'Credits', selector: 'Credits' },
              {
                name: 'Paypal Payment ID',
                cell: (record) => {
                  return record.PaypalPaymentId ? record.PaypalPaymentId: "No Payment ID"
                }
              },
              { name: 'AmountPaid', selector: 'AmountPaid' },
              {
                name: 'User',
                cell: (row) => {
                  return (
                    <Link style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }} to={`users/${row?.UserId}`}>
                      View Profile
                    </Link>
                  );
                }
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default ReviewsPage;
