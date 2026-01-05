import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://asylum-be.onrender.com';

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fiscalSummary`);
      return response.data;
    } catch (err) {
      console.error('Error fetching fiscal data:', err);
      setError('Failed to fetch fiscal data');
      return testData; // Fallback to test data
    }
  };

  const getCitizenshipResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/citizenshipSummary`);
      return response.data;
    } catch (err) {
      console.error('Error fetching citizenship data:', err);
      setError('Failed to fetch citizenship data');
      return testData.citizenshipResults; // Fallback
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
    setError(null);
  };

  const fetchData = async () => {
    try {
      const [fiscalData, citizenshipData] = await Promise.all([
        getFiscalData(),
        getCitizenshipResults()
      ]);

      // Check if we got valid data
      if (fiscalData && citizenshipData) {
        // Combine the data in the expected structure
        const combinedData = {
          granted: fiscalData.granted || 0,
          adminClosed: fiscalData.adminClosed || 0,
          denied: fiscalData.denied || 0,
          closedNacaraGrant: fiscalData.closedNacaraGrant || 0,
          asylumTerminated: fiscalData.asylumTerminated || 0,
          totalCases: fiscalData.totalCases || 0,
          yearResults: fiscalData.yearResults || [],
          citizenshipResults: Array.isArray(citizenshipData) ? citizenshipData : []
        };
        
        setGraphData(combinedData);
      } else {
        // If API fails, use test data
        setGraphData(testData);
        setError('Using test data - API unavailable');
      }
    } catch (err) {
      console.error('Error in fetchData:', err);
      setGraphData(testData); // Fallback to test data
      setError('Failed to fetch data. Using test data.');
    } finally {
      setIsDataLoading(false);
    }
  };

  const clearQuery = () => {
    setGraphData({});
    setError(null);
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  // Load data on initial mount
  useEffect(() => {
    updateQuery();
  }, []);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    error,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}