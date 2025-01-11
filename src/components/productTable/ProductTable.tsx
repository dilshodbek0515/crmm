import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FC } from 'react'
import { IProduct } from '@/types'

const BasicTable: FC<{ data: IProduct[] }> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Category</TableCell>
            <TableCell align='right'>Date</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: IProduct) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell align='right'>{row.category}</TableCell>
              <TableCell align='right'>{row.createdAt}</TableCell>
              <TableCell align='right'>{row.price} $</TableCell>
              <TableCell align='right'>{row._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
