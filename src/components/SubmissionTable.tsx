import React from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { SubmissionTableProps } from '../types';



const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions, isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Field Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {submissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="body2">No submissions yet.</Typography>
            </TableCell>
          </TableRow>
        ) : (
          submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.id}</TableCell>
              <TableCell>{submission.fieldName}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default SubmissionTable;
