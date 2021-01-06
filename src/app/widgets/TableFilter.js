import React, { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
var objectPath = require("object-path");

const TableFilter = ({ data = [], properties = [], onFilter, hideTypeFilter = false }) => {
  const [text, setText] = useState('')
  const [type, setType] = useState("ALL")

  useEffect(() => {
    let results = data
    if (text) {
      results = results.filter(record => {
        return properties.some(prop => {
            return objectPath.get(record, prop).toString().toLowerCase().includes(text.toLowerCase())
        })
      })
    }

    if (type) {
      if (type == "ALL") {
        results = results
      } else {
        results = results.filter(u => u.Role == type)
      }
    }

    onFilter(results)
  }, [text, type])

  return (
    <>
      <TextField
        style={{ alignSelf: 'flex-end', width: '25%', marginRight: '3%' }}
        id="search"
        type="text"
        label={`Filter by`}
        placeholder={`${properties.join(", ")}`}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }} />
      {hideTypeFilter == false && (
        <FormControl style={{ width: '25%' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setType(e.target.value)
            }}
          >
            <MenuItem value={"ALL"}>All</MenuItem>
            <MenuItem value={"Coach"}>Coaches</MenuItem>
            <MenuItem value={"Player"}>Players</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default TableFilter