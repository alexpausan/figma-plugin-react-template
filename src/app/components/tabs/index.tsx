import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import './styles.css'

const TabsDemo = () => (
  <Tabs.Root className="TabsRoot" defaultValue="tab1">
    <Tabs.List className="TabsList" aria-label="Manage your account">
      <Tabs.Trigger className="TabsTrigger" value="tab1">
        Code
      </Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="tab2">
        Settings
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className="TabsContent" value="tab1">
      <p className="Text">Code to be generated</p>
    </Tabs.Content>
    <Tabs.Content className="TabsContent" value="tab2">
      <p className="Text">Settings</p>
    </Tabs.Content>
  </Tabs.Root>
)

export default TabsDemo
