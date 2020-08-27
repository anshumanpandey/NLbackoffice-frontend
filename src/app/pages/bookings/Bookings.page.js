import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { useParams, Link } from "react-router-dom";
import { Dialog, List, ListItem, ListItemText, DialogContent, TextField, DialogContentText, DialogTitle, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const PaymentPage = () => {
  const params = useParams()
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/booking/find'
  }, { manual: true })

  const [deleteReq, doDelete] = useAxios({
    method: "DELETE"
  }, { manual: true })

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    refetch()
  }, [params.type])

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
              { name: 'Booking Number', selector: 'BookingNumber' },
              { name: 'Booking Date', selector: 'BookingDate' },
              { name: 'Transaction ID', selector: 'TransactionID' },
              { name: 'Amount', selector: 'Amount' },
              { name: 'Booking Status', selector: 'BookingStatus' },
              { name: 'Delete', cell: (row) => <DeleteIcon onClick={() => setShowModal(row)} style={{ cursor: "pointer" }} /> },
              { name: 'View Details', cell: (row) => <p onClick={() => setShowDetailsModal(row)} style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>See Details</p> },
            ]}
          />
        </div>
        <Dialog
          open={showModal != false}
          onClose={() => setShowModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Do want to delete {showModal.FullName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This record will be permanently delete from our DB
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={deleteReq.loading} style={{ opacity: deleteReq.loading ? 0.5 : 1 }} autoFocus onClick={() => setShowModal(false)} color="primary">
              Cancel
          </Button>
            <Button disabled={deleteReq.loading} style={{ opacity: deleteReq.loading ? 0.5 : 1 }} onClick={() => {
              doDelete({ url: `/booking/delete`, data: { id: showModal._id } })
                .then(() => setShowModal(false))
                .then(() => refetch())
            }} color="primary">
              Delete
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="md"
          fullWidth={true}
          open={showDetailsModal != false}
          onClose={() => setShowDetailsModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{showDetailsModal.FullName}</DialogTitle>
          <DialogContent>
            <Typography variant="h5">Details</Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Booking Number
                </Typography>
                <Typography>
                  {showDetailsModal.BookingNumber}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  From Time
                </Typography>
                <Typography>
                  {showDetailsModal.FromTime}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  To Time
                </Typography>
                <Typography>
                  {showDetailsModal.ToTime}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Sent Date
                </Typography>
                <Typography>
                  {showDetailsModal.SentDate}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Booking Date
                </Typography>
                <Typography>
                  {showDetailsModal.BookingDate}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Amount
                </Typography>
                <Typography>
                  {showDetailsModal.Amount}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  PaymentStatus
                </Typography>
                <Typography>
                  {showDetailsModal.PaymentStatus || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  TransactionID
                </Typography>
                <Typography>
                  {showDetailsModal.TransactionID || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Booking Status
                </Typography>
                <Typography>
                  {showDetailsModal.BookingStatus}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Rescheduled DateTime
                </Typography>
                <Typography>
                  {showDetailsModal.RescheduledDateTime || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Cancelled DateTime
                </Typography>
                <Typography>
                  {showDetailsModal.CancelledDateTime || "N/A"}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Player
                </Typography>
                <Link style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }} to={`users/${showDetailsModal.Player?._id}`}>
                  {showDetailsModal.Player?.FullName || "N/A"}
                </Link>
              </div>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Coach
                </Typography>
                <Link style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }} to={`users/${showDetailsModal.Coach?._id}`}>
                  {showDetailsModal.Coach?.FullName || "N/A"}
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '100%' }}>
                <Typography color="textSecondary">
                  Reviews
                </Typography>
                  {showDetailsModal.Reviews && showDetailsModal.Reviews.length != 0 ? showDetailsModal.Reviews.map((r) => {
                    return (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            ID
                          </Typography>
                          <Link style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }} to={`users/${showDetailsModal.Player?._id}`}>
                            {r._id}
                          </Link>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Coach
                          </Typography>
                          <Typography>
                            {r.Feedback}
                          </Typography>
                        </div>
                      </div>
                    );
                  }): <Typography>No reviews</Typography>}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setShowDetailsModal(false)} color="primary">
              Close
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default PaymentPage;
