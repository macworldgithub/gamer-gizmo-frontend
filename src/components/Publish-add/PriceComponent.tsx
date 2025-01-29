import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const PriceComponent = ({price,setPrice,quantity,setQuantity}:any) => {
 
  
  return (
       <div className="flex flex-col space-y-4">
              <TextField
                label="Price (USD)"
                variant="outlined"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Quantity"
                variant="outlined"
                type="number"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
  )
}

export default PriceComponent