import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  const { setIsLoading, setSearchResult } = props;
 /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */
let [centuryList, setCenturyList] = useState([]);
let [classificationList, setClassificationList] = useState([]);
let [queryString, setQuerySting] = useState('');
let [century, setCentury] = useState('any');
let [classification, setClassification] = useState('any');

  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    const func = async () => {
      const allCenturies = await fetchAllCenturies();
      const allClassifications = await fetchAllClassifications();
      setCenturyList(allCenturies);
      setClassificationList(allClassifications);
    };
    func();
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    // write code here
    event.preventDefault()
    setIsLoading(true);
    try {
      const result = await fetchQueryResults({ century, classification, queryString })
      setSearchResult(result)
    }
    catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={event => setQuerySting(event.target.value)}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={event => setClassification(event.target.value)}>
        <option value="any">Any</option>
        {/* map over the classificationList, return an <option /> */}
        {classificationList.map((classified) => {
          return (
            <option key={classified.id} value={classified}>{classified.name}</option>
          )
        })}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={event => setCentury(event.target.value) }>
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> */}
        {centuryList.map((sentshere) => {
          return (
            <option key={sentshere.key} value={sentshere.key}>{sentshere.name}</option>
          )
        })}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;