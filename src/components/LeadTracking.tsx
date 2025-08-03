import { useEffect } from 'react';
import { odooApi } from '../services/odooApi';

interface LeadTrackingProps {
  pageTitle: string;
  pagePath: string;
}

const LeadTracking: React.FC<LeadTrackingProps> = ({ pageTitle, pagePath }) => {
  useEffect(() => {
    // Track page visits for lead attribution
    const trackPageVisit = async () => {
      try {
        // You can expand this to track page visits in Odoo if needed
        console.log(`Page visit tracked: ${pageTitle} - ${pagePath}`);
        
        // Store visit data in localStorage for lead attribution
        const visitData = {
          page: pageTitle,
          path: pagePath,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        };
        
        const existingVisits = JSON.parse(localStorage.getItem('leadTracking') || '[]');
        existingVisits.push(visitData);
        
        // Keep only last 10 visits
        if (existingVisits.length > 10) {
          existingVisits.splice(0, existingVisits.length - 10);
        }
        
        localStorage.setItem('leadTracking', JSON.stringify(existingVisits));
      } catch (error) {
        console.error('Lead tracking error:', error);
      }
    };

    trackPageVisit();
  }, [pageTitle, pagePath]);

  return null; // This is a tracking component, no UI
};

// Utility function to get visit history for lead creation
export const getVisitHistory = (): string => {
  try {
    const visits = JSON.parse(localStorage.getItem('leadTracking') || '[]');
    if (visits.length === 0) return 'No previous visits tracked';
    
    return visits
      .map((visit: any) => `${visit.page} (${new Date(visit.timestamp).toLocaleString()})`)
      .join('\n');
  } catch (error) {
    return 'Error retrieving visit history';
  }
};

// Utility function to enhance lead data with tracking information
export const enhanceLeadWithTracking = (leadData: any) => {
  const visitHistory = getVisitHistory();
  const referrer = document.referrer || 'Direct visit';
  
  return {
    ...leadData,
    description: `${leadData.description}\n\n--- Tracking Information ---\nReferrer: ${referrer}\n\nPage Visit History:\n${visitHistory}`,
  };
};

export default LeadTracking;
