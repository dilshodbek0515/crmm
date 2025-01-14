import { request } from '@/api'
import CreateCS from '@/components/create-cs/CreateCS'
import Table from '@/components/table/Table'
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Seller: React.FC = () => {
  const [open, setOpen] = useState<null | string>(null)
  const [page, setPage] = useState(1)
  const limit = 7
  const skip = (page - 1) * limit

  const { data, error, isLoading } = useQuery({
    queryKey: ['seller'],
    queryFn: () => {
      return request
        .get('/get/sellers', {
          params: {
            skip: skip,
            limit: limit
          }
        })
        .then(res => res)
        .catch(err => console.log(err))
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
          Seller
        </Typography>
        <Button onClick={() => setOpen('seller')}>Create</Button>
      </Box>
      <Table data={data?.data?.innerData} type={'seller'} />
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

export default Seller
