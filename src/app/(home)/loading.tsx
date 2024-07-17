import { Card } from '@/components/ui/card'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4 flex flex-col ">
        <Card className="p-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-base-300 skeleton mb-3"></div>
          <div className="h-6 w-3/4 bg-base-300 skeleton mb-2"></div>
          <div className="h-8 w-1/2 bg-base-300 skeleton mb-3"></div>
        </Card>
        <div className="flex flex-col ">
          {[...Array(7)].map((_, index) => (
            <Card key={index} className="p-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-base-300 skeleton mr-2"></div>
              <div className="h-4 w-2/3 bg-base-300 skeleton"></div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-3/4 flex flex-col gap-6">
        <Card className="p-2 flex justify-between">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-8 w-24 bg-base-300 skeleton"></div>
          ))}
        </Card>
        
          <Card className="p-4">
          <div className="h-6 w-1/3 bg-base-300 skeleton mb-4"></div>
          <div className="h-24 w-full bg-base-300 skeleton"></div>
        </Card>
        
        <Card className="p-4">
          <div className="h-6 w-1/3 bg-base-300 skeleton mb-4"></div>
          <div className="h-40 w-full bg-base-300 skeleton"></div>
        </Card>
      </div>
    </div>
  )
}

export default Loading