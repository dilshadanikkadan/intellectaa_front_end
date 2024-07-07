import React from 'react'
import DraftCourseCard from './DraftCourseCard'

const DraftCourse = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 w-[85%] mx-auto">
        <div className="flex justify-start">
          <h3 className="text-2xl">Drafts</h3>
        
         
        </div>
        <div className="w-full flex flex-wrap gap-7">
    
            <DraftCourseCard />
        </div>
      </div>
    </div>
  )
}

export default DraftCourse