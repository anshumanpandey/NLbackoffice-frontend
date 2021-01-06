import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateScheduledNotificationForm from "./CreateScheduledNotificationForm";

export const ScheduledNotification = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [users, setUsers] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/scheduledNotification/find'
  }, { manual: true })

  const [deleteReq, doDelete] = useAxios({
    method: "DELETE"
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
            noHeader={true}
            subHeader={true}
            subHeaderComponent={
              <>
              <Button color="primary" onClick={() => setShowCreate(true)} >
                New
              </Button>
              </>
            }
            columns={[
              { name: 'Time Span', selector: 'timeSpan' },
              { name: 'Time Unit', cell: (r) => r.timeUnit == "H" ? "Hours": "Days" },
              { name: 'Body', selector: 'body' },
              { name: 'Edit', cell: (row) => <EditIcon onClick={() => setShowCreate(row)} style={{ cursor: "pointer" }} /> },
              { name: 'Delete', cell: (row) => <DeleteIcon onClick={() => setShowModal(row)} style={{ cursor: "pointer" }} /> },
            ]}
          />
        </div>
        {showCreate && <CreateScheduledNotificationForm notification={showCreate} onClose={(reason) => {
          if (reason == "CREATED") refetch()
          setShowCreate(false)
        }} />}
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
              doDelete({ url: `/scheduledNotification/delete`, data: { id: showModal._id } })
                .then(() => setShowModal(false))
                .then(() => refetch())
            }} color="primary">
              Delete
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ScheduledNotification;
