import { request } from '@/api'
import CreateCS from '@/components/create-cs/CreateCS'
import Table from '@/components/table/Table'
import { Box, Button, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
const Product = () => {
  const [open, setOpen] = useState<null | string>(null)
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => {
      return request
        .get('/get/products')
        .then(res => res)
        .catch(err => console.log(err))
    }
  })
  console.log(data?.data?.innerData)

  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Product
        </Typography>
        <Button onClick={() => setOpen('product')}>Create</Button>
      </Box>
      <Table data={data?.data?.innerData} />
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  )
}

export default Product
