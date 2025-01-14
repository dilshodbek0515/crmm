import CreateCS from '@/components/create-cs/CreateCS'
import Table from '@/components/table/Table'
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { request } from '@/api'
import { useQuery } from '@tanstack/react-query'

const Customer: React.FC = () => {
  const [open, setOpen] = useState<null | string>(null)
  const [page, setPage] = useState(1)
  const limit = 7
  const skip = (page - 1) * limit

  const { data, error, isLoading } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => {
      return request
        .get('/get/customers', {
          params: {
            skip: skip,
            limit: limit
          }
        })
        .then(res => res)
    }
  })
  if (isLoading)
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '80vh',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    )
  if (error) return <div>Error loading data</div>

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Customer
        </Typography>
        <Button onClick={() => setOpen('customer')}>Create</Button>
      </Box>
      <Table data={data?.data?.innerData} type={'customer'} />
      <div className='flex justify-center mt-12'>
        <Pagination
          count={Math.ceil(data?.data.totalCount / limit)}
          page={page}
          onChange={handlePageChange}
          color='primary'
        />
      </div>
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  )
}

export default Customer
