import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import { Dialog, List, ListItem, ListItemText, DialogContent, TextField, DialogContentText, DialogTitle, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Lightbox } from "react-modal-image";

export const OrderPage = () => {
  const params = useParams()
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
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
    if (data) {
      setUsers(data)
      const found = data.find(d => d._id == params.id)
      if (found) setShowDetailsModal(found)
    }
  }, [loading])

  const handlePopoverClick = (url) => {
    setShowImageModal(url);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            actions={
              <>
                <FormControl style={{ width: '30%' }}>
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
              doDelete({ url: `/user/delete/${showModal._id}` })
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
            <Typography variant="h5">Personal Details</Typography>
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
                  Address
                </Typography>
                <Typography>
                  {showDetailsModal.Address}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Email
                </Typography>
                <Typography>
                  {showDetailsModal.EmailID}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  DeviceID
                </Typography>
                <Typography>
                  {showDetailsModal.DeviceID}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Mobile Number
                </Typography>
                <Typography>
                  {showDetailsModal.MobileNo}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  PostCode
                </Typography>
                <Typography>
                  {showDetailsModal.PostCode}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Access Token
                </Typography>
                <Typography>
                  {showDetailsModal.AccessToken || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Social Login Type
                </Typography>
                <Typography>
                  {showDetailsModal.SocialLoginType || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Has Temp Password
                </Typography>
                <Typography>
                  {showDetailsModal?.IsTempPassword?.toString()}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Role
                </Typography>
                <Typography>
                  {showDetailsModal.Role || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Profile Image
                </Typography>
                {showDetailsModal.ProfileImage ? (
                  <p
                    onClick={() => handlePopoverClick(showDetailsModal.ProfileImage)}
                    style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>
                    See Image
                  </p>
                ) : <Typography>N/A</Typography>}
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Achievements
                </Typography>
                <Typography>
                  {showDetailsModal.Achievements || "N/A"}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  About Us
                </Typography>
                <Typography>
                  {showDetailsModal.AboutUs || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Accomplishment
                </Typography>
                <Typography>
                  {showDetailsModal.Accomplishment || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Latitude
                </Typography>
                <Typography>
                  {showDetailsModal.Lat}
                </Typography>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Longitude
                </Typography>
                <Typography>
                  {showDetailsModal.Lng || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  Rate
                </Typography>
                <Typography>
                  {showDetailsModal.Rate || "N/A"}
                </Typography>
              </div>
              <div className="form-group" style={{ width: '33%' }}>
                <Typography color="textSecondary">
                  TravelMile
                </Typography>
                <Typography>
                  {showDetailsModal?.TravelMile?.TravelDistance}
                </Typography>
              </div>
            </div>
            {showDetailsModal.BankAccount ? (
              <>
                <Typography variant="h5">Bank Account</Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Account Name
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.AccountName}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Bank Name
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.BankName}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Account Type
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.AccountType}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Account Number
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.AccountNumber}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Code
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.Code}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '50%' }}>
                    <Typography color="textSecondary">
                      Address
                    </Typography>
                    <Typography>
                      {showDetailsModal.BankAccount.Address}
                    </Typography>
                  </div>
                </div>
              </>
            ) : <p>No bank account</p>}

            {showDetailsModal?.Experiences && showDetailsModal?.Experiences?.length != 0 ? (
              <>
                <Typography variant="h5">Experiences</Typography>
                {showDetailsModal.Experiences.map((e) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Job Position
                          </Typography>
                          <Typography>
                            {e.JobPosition}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Club
                          </Typography>
                          <Typography>
                            {e.Club}
                          </Typography>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="form-group">
                          <Typography color="textSecondary">
                            Start Date
                          </Typography>
                          <Typography>
                            {e.StartDate}
                          </Typography>
                        </div>
                        {e.CurrentlyWorking ? (
                          <div className="form-group" style={{ display: 'flex' }}>
                            <Typography color="textSecondary">
                              Currently Working
                            </Typography>
                            <Typography>
                              {e.CurrentlyWorking.toString()}
                            </Typography>
                          </div>
                        ) : (
                            <div className="form-group">
                              <Typography color="textSecondary">
                                End Date
                              </Typography>
                              <Typography>
                                {e.EndDate}
                              </Typography>

                            </div>
                          )}
                      </div>
                    </>
                  );
                })}
              </>
            ) : <p>No exoeriences</p>}

            {showDetailsModal?.Availabilities && showDetailsModal?.Availabilities?.length != 0 ? (
              <>
                <Typography variant="h5">Availabilities</Typography>
                {showDetailsModal.Availabilities.map((a) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="form-group" style={{ width: '50%', marginBottom: 0 }}>
                          <Typography color="textSecondary">
                            Day
                          </Typography>
                          <Typography>
                            {a.Day}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Is Working
                          </Typography>
                          <Typography>
                            {a.IsWorking}
                          </Typography>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            From Time
                          </Typography>
                          <Typography>
                            {a.FromTime}
                          </Typography>
                        </div>

                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            To Time
                          </Typography>
                          <Typography>
                            {a.ToTime}
                          </Typography>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : <p>No Availables hours defined</p>}

            {showDetailsModal?.DBSCeritificate ? (
              <>
                <Typography variant="h5">DBSCeritificate</Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-group" style={{ width: '33%' }}>
                    <Typography color="textSecondary">
                      DBSType
                    </Typography>
                    <Typography color="textSecondary">
                      {showDetailsModal?.DBSCeritificate.Type}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '33%' }}>
                    <Typography color="textSecondary">
                      Is Verified
                    </Typography>
                    <Typography color="textSecondary">
                      {showDetailsModal?.DBSCeritificate.Verified.toString()}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '33%' }}>
                    {showDetailsModal?.DBSCeritificate.Path ? (
                      <p
                        onClick={() => handlePopoverClick(showDetailsModal?.DBSCeritificate.Path)}
                        style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>
                        See Image
                      </p>
                    ) : <Typography>No image</Typography>}
                  </div>
                </div>
              </>
            ) : <p>No DBSCeritificate</p>}

            {showDetailsModal?.VerificationDocument ? (
              <>
                <Typography variant="h5">VerificationDocument</Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-group" style={{ width: '33%' }}>
                    <Typography color="textSecondary">
                      Type
                    </Typography>
                    <Typography color="textSecondary">
                      {showDetailsModal?.VerificationDocument.Type}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '33%' }}>
                    <Typography color="textSecondary">
                      Type
                    </Typography>
                    <Typography color="textSecondary">
                      {showDetailsModal?.VerificationDocument.Verified.toString()}
                    </Typography>
                  </div>
                  <div className="form-group" style={{ width: '33%' }}>
                    {showDetailsModal?.VerificationDocument.Path ? (
                      <p
                        onClick={() => handlePopoverClick(showDetailsModal?.VerificationDocument.Path)}
                        style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>
                        See Image
                      </p>
                    ) : <Typography>No Image</Typography>}
                  </div>
                </div>
              </>
            ) : <p>No VerificationDocument</p>}

            {showDetailsModal?.TrainingLocations && showDetailsModal?.TrainingLocations?.length != 0 ? (
              <>
                <Typography variant="h5">Training Locations</Typography>
                {showDetailsModal.TrainingLocations.map((t) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Location Name
                          </Typography>
                          <Typography>
                            {t.LocationName}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Location Address
                          </Typography>
                          <Typography>
                            {t.LocationAddress}
                          </Typography>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Latitude
                          </Typography>
                          <Typography>
                            {t.Lat}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Longitude
                          </Typography>
                          <Typography>
                            {t.Lng}
                          </Typography>
                        </div>
                      </div>
                      {t.ImageUrl ? (
                        <p
                          onClick={() => handlePopoverClick(t.ImageUrl)}
                          style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }}>
                          See Image
                        </p>
                      ) : <Typography>No image</Typography>}
                    </>
                  );
                })}
              </>
            ) : <p>No Availables Training Locations</p>}

            {showDetailsModal?.Teams && showDetailsModal?.Teams?.length != 0 ? (
              <>
                <Typography variant="h5">Teams</Typography>
                {showDetailsModal.Teams.map((t) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '100%' }}>
                          <Typography color="textSecondary">
                            Team Name
                          </Typography>
                          <Typography>
                            {t.TeamName}
                          </Typography>
                        </div>

                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Start Date
                          </Typography>
                          <Typography>
                            {t.StartDate}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            End Date
                          </Typography>
                          <Typography>
                            {t.EndDate}
                          </Typography>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : <p>No Teams</p>}

            {showDetailsModal?.UpcomingMatches && showDetailsModal?.UpcomingMatches?.length != 0 ? (
              <>
                <Typography variant="h5">UpcomingMatches</Typography>
                {showDetailsModal.UpcomingMatches.map((t) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Team Name
                          </Typography>
                          <Typography>
                            {t.TeamName}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Match Date
                          </Typography>
                          <Typography>
                            {t.MatchDate}
                          </Typography>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : <p>No Upcoming Matches</p>}

            {showDetailsModal?.ConnectedUsers && showDetailsModal?.ConnectedUsers?.length != 0 ? (
              <>
                <Typography variant="h5">Connected Users</Typography>
                {showDetailsModal.ConnectedUsers.map((t) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            ID
                          </Typography>
                          <Typography>
                            {t._id}
                          </Typography>
                        </div>
                        <div className="form-group" style={{ width: '50%' }}>
                          <Typography color="textSecondary">
                            Name
                          </Typography>
                          <Typography>
                            {t.FullName}
                          </Typography>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : <p>No Connected Users</p>}

            {showDetailsModal?.Qualifications && showDetailsModal?.Qualifications?.length != 0 ? (
              <>
                <Typography variant="h5">Qualifications</Typography>
                <List>
                  {showDetailsModal.Qualifications.map((t) => {
                    return (
                      <>
                        <ListItem>
                          <ListItemText primary={t.Qualification} />
                        </ListItem>
                      </>
                    );
                  })}
                </List>
              </>
            ) : <p>No Connected Users</p>}

            {showImageModal && (
              <Lightbox
                medium={showImageModal}
                large={showImageModal}
                alt="Hello World!"
                onClose={() => setShowImageModal(false)}
              />
            )}

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

export default OrderPage;
