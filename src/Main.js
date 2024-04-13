import React from 'react'

// we are using 'children' prop here to render its content from Main/parent component.

export default function Main ({children}) {
  return (
    <>
      
      <main className='main'>
       {children}

      </main>
    </>
  )
}
