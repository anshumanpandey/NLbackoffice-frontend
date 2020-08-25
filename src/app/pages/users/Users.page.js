import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const OrderPage = () => {
  const params = useParams()
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/user/find'
  }, { manual: true })

  const [deleteReq, doDelete] = useAxios({
    url: '/user/delete/',
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
            actions={
              <>
                <FormControl style={{ width: '30%'}}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => {
                      if (e.target.value == "ALL") {
                        setUsers(data)
                      } else {
                        setUsers(data.filter(u => u.Role == e.target.value))
                      }
                    }}
                  >
                    <MenuItem value={"ALL"}>All</MenuItem>
                    <MenuItem value={"Coach"}>Coaches</MenuItem>
                    <MenuItem value={"Player"}>Players</MenuItem>
                  </Select>
                </FormControl>
              </>
            }
            pagination={true}
            progressPending={loading}
            data={users}
            columns={[
              { name: 'Full Name', selector: 'FullName' },
              { name: 'Email', selector: 'EmailID' },
              { name: 'Phone Number', selector: 'MobileNo' },
              { name: 'Role', selector: 'Role' },
              { name: 'Delete', cell: (row) => <DeleteIcon onClick={() => setShowModal(row)} style={{ cursor: "pointer" }} /> },
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
              doDelete({ url: `/user/delete/${showModal._id}` })
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

export default OrderPage;
