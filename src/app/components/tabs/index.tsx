import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import './styles.css';

const TabsDemo = () => {
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.pluginMessage && event.data.pluginMessage.type === 'serverResponse') {
        const serverResponse = event.data.pluginMessage.data;
        setServerResponse(serverResponse);
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.Content className="TabsContent" value="tab1">
        <button className="copy-button">Copy</button>
        <br></br>
        <div className="code-container">
      {serverResponse ? (
          <p className="Text">{JSON.stringify(serverResponse)}</p>
        ) : (
          <p className="Text">Click on a component</p>
        )}
        </div>
        
      </Tabs.Content>
     
    </Tabs.Root>
  );
};

export default TabsDemo;
