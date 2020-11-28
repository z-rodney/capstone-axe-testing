import React, { useState } from 'react'

function LocationForm() {
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log('It works!')
  }
  return (
    <div>
      <button onClick={() => { setShowForm(!showForm) }}>+ Add New Location</button>
      {!!showForm &&
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      }
    </div>
  )
}

export default LocationForm
