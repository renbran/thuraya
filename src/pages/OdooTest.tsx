import { useState } from 'react';
import { odooApi } from '../services/odooApi';

const OdooTestPage = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testOdooConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await odooApi.testConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testLeadCreation = async () => {
    setIsLoading(true);
    
    try {
      const testLead = {
        name: 'Test Lead - Website Integration',
        email_from: 'test@tachimao.com',
        contact_name: 'Test User',
        description: 'This is a test lead created to verify the Odoo integration is working correctly.',
        source_id: 1,
        medium_id: 1,
        website: 'https://renbran.github.io/thuraya/',
        tag_ids: [1],
      };

      const result = await odooApi.createLead(testLead);
      setTestResult({
        success: result.success,
        message: result.success 
          ? `Test lead created successfully with ID: ${result.leadId}` 
          : `Failed to create test lead: ${result.error}`,
        leadId: result.leadId,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Lead creation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Odoo CRM Integration Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Database Configuration:</h2>
        <p><strong>URL:</strong> https://tachimao.com</p>
        <p><strong>Database UUID:</strong> 7f1b2e28-488e-11f0-bb6d-02420a050008</p>
        <p><strong>Username:</strong> ceo@tachimao.com</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testOdooConnection}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </button>

        <button 
          onClick={testLeadCreation}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Creating...' : 'Test Lead Creation'}
        </button>
      </div>

      {testResult && (
        <div style={{
          padding: '15px',
          border: `2px solid ${testResult.success ? '#28a745' : '#dc3545'}`,
          borderRadius: '5px',
          backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
          color: testResult.success ? '#155724' : '#721c24',
        }}>
          <h3>Test Result:</h3>
          <p><strong>Status:</strong> {testResult.success ? 'SUCCESS ✅' : 'FAILED ❌'}</p>
          <p><strong>Message:</strong> {testResult.message}</p>
          
          {testResult.userInfo && (
            <div>
              <h4>User Information:</h4>
              <pre>{JSON.stringify(testResult.userInfo, null, 2)}</pre>
            </div>
          )}
          
          {testResult.leadId && (
            <p><strong>Lead ID:</strong> {testResult.leadId}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Click "Test Connection" to verify Odoo authentication</li>
          <li>Click "Test Lead Creation" to create a sample lead in your CRM</li>
          <li>Check your Odoo CRM Leads section for the test lead</li>
          <li>If tests fail, check the browser console for detailed error messages</li>
        </ol>
      </div>
    </div>
  );
};

export default OdooTestPage;
