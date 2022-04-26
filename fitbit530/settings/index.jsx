registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          App Settings
        </Text>
      }
    >
        <TextInput
            label="Username"
            placeholder="Please enter your username"
            settingsKey="username"
        />
        <TextInput
            label="Password"
            placeholder="Please enter your password"
            settingsKey="password"
        />
    </Section>
  </Page>
));
