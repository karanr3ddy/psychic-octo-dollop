import { useState } from 'react';
import './App.css';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import Calculator from './components/Calculator';
import ThreeBackground from './components/ThreeBackground';
import PdfCompressor from './components/PdfCompressor';
import {ImageCompressor} from './components/ImageCompressor';
import NewsComponent from './components/NewsComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UnitConverter from './components/UnitConverter/UnitConverter';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';

const nlp = winkNLP(model);
const { its } = nlp;

function App() {
  const [count, setCount] = useState(0);
  const text = 'Hello World! This is a sample text for tokenization.';
  const doc = nlp.readDoc(text);
  const tokens = doc.tokens().out(its.value);

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
