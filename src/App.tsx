import './App.css';
import Calculator from './components/Calculator';
import PdfCompressor from './components/PdfCompressor';
import {ImageCompressor} from './components/ImageCompressor';
import NewsComponent from './components/NewsComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UnitConverter from './components/UnitConverter/UnitConverter';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';


function App() {

  return (
    <>
      {/* <ThreeBackground /> */}
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-4">Hello World</h1>
        <Tabs>
          <TabList>
            <Tab>Calculator</Tab>
            <Tab>PDF Compressor</Tab>
            <Tab>Image Compressor</Tab>
            <Tab>News</Tab>
            <Tab>Unit Converter</Tab>
            <Tab>Pomodoro Timer</Tab>
          </TabList>

          <TabPanel>
            <Calculator />
          </TabPanel>
          <TabPanel>
            <PdfCompressor />
          </TabPanel>
          <TabPanel>
            <ImageCompressor />
          </TabPanel>
          <TabPanel>
            <NewsComponent />
          </TabPanel>
          <TabPanel>
            <UnitConverter />
          </TabPanel>
          <TabPanel>
            <PomodoroTimer />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
