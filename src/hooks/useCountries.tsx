import { country } from '../types'
import { useEffect, useState } from 'react'

function useCountries() {
    const [countries, setCountries] = useState<country[]>([] as country[])

    async function fetchCountries() {
      try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          const countries: country[] = await response.json();
          return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
    }

    useEffect(() => {
      fetchCountries().then(countries => { 
        if (countries) setCountries(countries) 
      }
      );
    }, []);

    return countries;
}

export default useCountries;