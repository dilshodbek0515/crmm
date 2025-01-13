// table
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FC } from 'react'
import { ICustomers } from '@/types'
// paginition
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const BasicTable: FC<{ data: ICustomers[] }> = ({ data }) => {
  const [page, setPage] = React.useState(1)
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault()
    setPage(value)
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell align='right'>Last name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Budget</TableCell>
              <TableCell align='right'>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: ICustomers) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.fname}
                </TableCell>
                <TableCell align='right'>{row.lname}</TableCell>
                <TableCell align='right'>{row.phone_primary}</TableCell>
                <TableCell align='right'>{row.budget}</TableCell>
                <TableCell align='right'>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </div>
  )
}

export default BasicTable
