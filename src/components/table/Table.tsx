// table
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ICustomers } from '@/types'

import PushPinIcon from '@mui/icons-material/PushPin'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Button } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '@/api'

const BasicTable: React.FC<{ data: ICustomers[]; type: string }> = ({
  data,
  type
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [id, setId] = React.useState<null | string>(null)
  const open = Boolean(anchorEl)
  const queryClient = useQueryClient()
  const handleClose = () => {
    setAnchorEl(null)
    setId(null)
  }
  const mutation = useMutation({
    mutationFn: ({ id, pin }: { id: string; pin: boolean }) =>
      request.patch(`/update/${type}/${id}`, { pin: !pin }).then(res => res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] })
      handleClose()
    }
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    _id: string
  ) => {
    setAnchorEl(event.currentTarget)
    setId(_id)
  }

  const handlePin = (id: string, pin: boolean) => {
    mutation.mutate({ id, pin })
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
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: ICustomers) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.pin && (
                    <PushPinIcon fontSize='small' className='rotate-45' />
                  )}
                  {row.fname}
                </TableCell>
                <TableCell align='right'>{row.lname}</TableCell>
                <TableCell align='right'>{row.phone_primary}</TableCell>
                <TableCell align='right'>{row.budget}</TableCell>
                <TableCell align='right'>{row.address}</TableCell>
                <TableCell align='right'>
                  <Button
                    sx={{ color: '#333' }}
                    onClick={event => handleClick(event, row._id)}
                  >
                    <MoreHorizIcon />
                  </Button>
                  {id === row._id && (
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button'
                      }}
                    >
                      <MenuItem onClick={() => handlePin(row._id, row.pin)}>
                        {row.pin ? 'Unpin' : 'Pin'}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Payment</MenuItem>
                    </Menu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BasicTable
