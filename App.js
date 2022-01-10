import {StatusBar} from 'expo-status-bar';
import SafeAreaView from './components/SafeAreaView';
import List from "./components/List";


const App = () => {
  return (
    <>
      <SafeAreaView>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}


export default App;