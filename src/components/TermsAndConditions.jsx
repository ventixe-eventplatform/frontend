import React from 'react'
import { useState, useEffect } from 'react'

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)

  const getTerms = async () => {
    try {
      const termsBaseUrl = import.meta.env.VITE_TERMSSERVICE_BASEURL;
      const res = await fetch(`${termsBaseUrl}/api/termsandconditions`)
      if (!res.ok) throw new Error("Network response not ok")
      const data = await res.json()
      setTerms(data)
    }
    catch {
      console.error("Error fetching data")
    } finally {
      setLoading()
    }
  }

  useEffect(() => {
    getTerms()
  }, [])


  return (
    <div className='wrapper terms-wrapper'>
      <h3 className='mt-1 pl-1'>Terms & Conditions</h3>
      {loading && <p>Loading...</p>}
      <ol className='terms-list'>
        {
          terms.map(term => (
            <li key={term.termId}>{term.title}
              <ul className='pl-1'>
                {term.details.map(detail => (
                  <li key={detail.description}>{detail.description}</li>
                ))}
              </ul>
            </li>
          ))
        }
      </ol>
    </div>
  )
}

export default TermsAndConditions