import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import DataTable from "react-data-table-component";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import TableFilter from "../../widgets/TableFilter";

const agroupChats = (messages) => {
  return messages
    .reduce((arr, next) => {
      const map = new Map(arr);
      const mapKey = next.Sender._id + next.Receiver._id;
      const chat = map.get(mapKey) || {
        Sender: next.Sender,
        Receiver: next.Receiver,
        Messages: [],
      };

      chat.Messages.push(next);
      map.set(mapKey, chat);

      return Array.from(map.entries());
    }, [])
    .map((i) => i[1]);
};

export const ReviewsPage = () => {
  const [users, setUsers] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [{ data = [], loading }, refetch] = useAxios(
    {
      url: "/messages/find",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) setUsers(agroupChats(data));
  }, [loading]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            actions={
              <TableFilter
                hideTypeFilter={true}
                data={data}
                properties={["Sender.FullName", "Receiver.FullName"]}
                onFilter={(results) => setUsers(agroupChats(results))}
              />
            }
            pagination={true}
            progressPending={loading}
            data={users}
            columns={[
              { name: "Started By", selector: "Sender.FullName" },
              { name: "To", selector: "Receiver.FullName" },
              {
                name: "Started at",
                cell: (record) => record.Messages[0].SentDate,
              },
              {
                name: "View Details",
                cell: (row) => (
                  <p
                    onClick={() => setShowDetailsModal(row)}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    See Details
                  </p>
                ),
              },
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
            <DialogTitle id="alert-dialog-title">
              {`Chat between ${showDetailsModal.Sender?.FullName} and ${showDetailsModal.Receiver?.FullName}`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Chat started at {showDetailsModal.Messages?.[0]?.SentDate}
              </DialogContentText>
              {showDetailsModal.Messages?.map((m) => {
                const wrapperStyles = {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                };

                if (showDetailsModal.Sender._id === m.ReceiverId) {
                  wrapperStyles.alignItems = "end";
                }
                return (
                  <div className="message-chip" style={wrapperStyles}>
                    <p
                      style={{
                        padding: "1rem",
                        backgroundColor: "rgba(0,0,0, 0.3)",
                        maxWidth: "35vw",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {m.Text}
                    </p>
                    <Typography variant="caption" display="block" gutterBottom>
                      Send at {m.SentDate}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      by {m.Sender.FullName}
                    </Typography>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
