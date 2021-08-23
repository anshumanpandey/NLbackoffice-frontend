import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactPlayer from 'react-player'
import TableFilter from "../../widgets/TableFilter";

export const PostsPage = () => {
  const params = useParams()
  const [showModal, setShowModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios({
    url: '/post/find'
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
            actions={<TableFilter hideTypeFilter={true} data={data} properties={["Body", "User.FullName"]} onFilter={(results) => setUsers(results)} />}
            pagination={true}
            progressPending={loading}
            data={users}
            columns={[
              { name: 'Body', selector: 'Body' },
              { name: 'Posted By', selector: 'User.FullName' },
              {
                name: 'Media', cell: (row) => {
                  if (!row.MediaURL) return <p>No File</p>
                  const extension = row.MediaURL.split('.').pop()
                  if (extension == "mp4" || extension == "mov") {
                    return <p onClick={() => setShowMediaModal({ ...row, type: 'video' })} style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>See Video</p>
                  } else {
                    return <p onClick={() => setShowMediaModal({ ...row, type: 'image' })} style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>See Image</p>
                  }
                }
              },
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
              doDelete({ url: `/post/delete`, data: { id: showModal._id } })
                .then(() => setShowModal(false))
                .then(() => refetch())
            }} color="primary">
              Delete
          </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          maxWidth="md"
          fullWidth
          open={showMediaModal != false}
          onClose={() => setShowMediaModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              {showMediaModal.type == "video" && (
                <ReactPlayer style={{ marginLeft: "auto", marginRight: "auto" }} controls={true} url={showMediaModal?.MediaURL} />
              )}
              {showMediaModal.type == "image" && (
                <img src={showMediaModal?.MediaURL} />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button disabled={deleteReq.loading} style={{ opacity: deleteReq.loading ? 0.5 : 1 }} autoFocus onClick={() => setShowMediaModal(false)} color="primary">
              Close
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default PostsPage;
