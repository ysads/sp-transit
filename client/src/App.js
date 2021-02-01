import {BaseStyles, Flex} from '@primer/components'

const Header = () => {
  return (
    <Flex bg="blue.5" color="white" p={3} justifyContent="space-evenly">
      sp-transit
    </Flex>
  );
}

function App() {
  return (
    <BaseStyles>
      <Header />
    </BaseStyles>
  );
}

export default App;
