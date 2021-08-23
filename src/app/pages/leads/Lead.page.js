import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { Dialog, DialogContent, DialogTitle, Typography, ListItem, List, ListItemText } from '@material-ui/core';

export const ReviewsPage = () => {
  const [users, setUsers] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [{ data , loading }, refetch] = useAxios({
    url: '/leads/find'
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
              { name: 'FullName', selector: 'FullName' },
              { name: 'Location', selector: 'Location' },
              { name: 'CoachingType', selector: 'CoachingType' },
              { name: 'View Details', cell: (row) => <p onClick={() => setShowDetailsModal(row)} style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>See Details</p> },
            ]}
          />

        <Dialog
          maxWidth="md"
          fullWidth={true}
          open={showDetailsModal !== false}
          onClose={() => setShowDetailsModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{showDetailsModal.FullName}</DialogTitle>
          <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Name
                </Typography>
                <Typography>
                  {showDetailsModal.FullName}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  EmailID
                </Typography>
                <Typography>
                  {showDetailsModal.EmailID}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  MobileNo
                </Typography>
                <Typography>
                  {showDetailsModal.MobileNo}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Location
                </Typography>
                <Typography>
                  {showDetailsModal.Location}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  CreatedAt
                </Typography>
                <Typography>
                  {showDetailsModal.CreatedAt}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Experience
                </Typography>
                <Typography>
                  {showDetailsModal.Experience}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Age
                </Typography>
                <Typography>
                  {showDetailsModal.Age}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Coaching Type
                </Typography>
                <List>
                  {showDetailsModal.CoachingType?.map(i => {
                    return (
                      <ListItem key={i}>
                        <ListItemText primary={i} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Days
                </Typography>
                <List>
                  {showDetailsModal.Days?.map(i => {
                    return (
                      <ListItem key={i}>
                        <ListItemText primary={i} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Coaching Time
                </Typography>
                <List>
                  {showDetailsModal.CoachingTime?.map(i => {
                    return (
                      <ListItem key={i}>
                        <ListItemText primary={i} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
              <div className="form-group" style={{ width: '50%' }}>
                <Typography color="textSecondary">
                  Coaching Type
                </Typography>
                <List>
                  {showDetailsModal.DaysOfWeek?.map(i => {
                    return (
                      <ListItem key={i.id}>
                        <ListItemText primary={i} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>

          </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default ReviewsPage;
