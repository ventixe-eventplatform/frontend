import { useState, useEffect } from "react"

const Restrictions = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const getItems = async () => {
    setError('')
    try {
      const restrictionBaseUrl = import.meta.env.VITE_RESTRICTIONSERVICE_BASEURL;
      const res = await fetch(`${restrictionBaseUrl}/api/restrictions`)
      if (!res.ok) throw new Error("Network response not ok.")
      const data = await res.json()
      setItems(data)
    } catch {
      setError('Failed to load prohibited items.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getItems()
  }, [])
  
  
  return (
    <div className="wrapper">
      <h3>Prohibited Items</h3>
      {loading &&<p>Loading...</p>}
      {error &&<p>{error}</p>}
      <div className="restriction-container mt-2">
        {
          items.map(item => (
            <div key={item.id} className="restriction-item">
              {item.imageUrl && (
               <img src={item.imageUrl} alt={item.description || "Prohibited Item"}/>
              )}
              <p>{item.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Restrictions