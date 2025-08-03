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
        name: 'Test Lead - API Integration',
        email_from: 'test@tachimao.com',
        contact_name: 'Test User',
        description: 'This is a test lead created to verify the Odoo API integration is working correctly.',
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

  const testWebhook = async () => {
    setIsLoading(true);
    
    try {
      // Test 1: Try the original data structure
      console.log('Testing webhook with original data structure...');
      
      const webhookData = {
        name: 'Test Lead - Webhook Integration',
        email_from: 'test@tachimao.com',
        contact_name: 'Test User',
        description: 'This is a test lead created to verify the webhook integration is working correctly.',
        website: 'https://renbran.github.io/thuraya/',
        source_id: 'Website Test',
        medium_id: 'Digital',
        tag_ids: 'Webhook Test',
      };

      const response = await fetch('https://coatest1.cloudpepper.site/web/hook/44b43f0c-2748-4024-a4e4-afe6609175a0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.text();
        console.log('Success response:', responseData);
        setTestResult({
          success: true,
          message: `Webhook test successful! Response: ${responseData}`,
        });
        return;
      }

      // Test 2: Try simplified structure
      console.log('Trying simplified data structure...');
      const simplifiedData = {
        name: 'Test Lead',
        email: 'test@tachimao.com',
        message: 'Test webhook integration'
      };

      const response2 = await fetch('https://coatest1.cloudpepper.site/web/hook/44b43f0c-2748-4024-a4e4-afe6609175a0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simplifiedData),
      });

      if (response2.ok) {
        const responseData2 = await response2.text();
        setTestResult({
          success: true,
          message: `Simplified webhook test successful! Response: ${responseData2}`,
        });
        return;
      }

      // Test 3: Try form data instead of JSON
      console.log('Trying form data...');
      const formData = new FormData();
      formData.append('name', 'Test Lead');
      formData.append('email', 'test@tachimao.com');
      formData.append('message', 'Test webhook integration');

      const response3 = await fetch('https://coatest1.cloudpepper.site/web/hook/44b43f0c-2748-4024-a4e4-afe6609175a0', {
        method: 'POST',
        body: formData,
      });

      if (response3.ok) {
        const responseData3 = await response3.text();
        setTestResult({
          success: true,
          message: `Form data test successful! Response: ${responseData3}`,
        });
        return;
      }

      // All tests failed
      const errorText = await response.text();
      console.error('All webhook tests failed. Last error:', errorText);
      setTestResult({
        success: false,
        message: `All webhook tests failed. Status: ${response.status}, Error: ${errorText}`,
      });

    } catch (error) {
      console.error('Webhook test error:', error);
      setTestResult({
        success: false,
        message: `Webhook test failed: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`,
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
        <p><strong>URL:</strong> https://coatest1.cloudpepper.site/</p>
        <p><strong>Database Name:</strong> coatest1</p>
        <p><strong>Username:</strong> salescompliance@osusproperties.com</p>
        <p><strong>Password:</strong> 8586583</p>
        <p><strong>Webhook URL:</strong> https://coatest1.cloudpepper.site/web/hook/44b43f0c-2748-4024-a4e4-afe6609175a0</p>
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
            marginRight: '10px',
          }}
        >
          {isLoading ? 'Creating...' : 'Test API Lead Creation'}
        </button>

        <button 
          onClick={testWebhook}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Testing...' : 'Test Webhook'}
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
