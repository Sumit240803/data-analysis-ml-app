
import './App.css'
import Navbar from './components/ui/general/Navbar'


function App() {
  return (
    <>
      <Navbar />
      <div className='hero'>

        <div className='heading'>
          <h2>Meaningful Insights of your Data in seconds</h2>
          <div className='info-row'>

            <div className='info-row-1'>

              <span>Predict</span>
              <span>Preprocess</span>
              <span>Train</span>
            </div>
            <div className='info-row-1'>
              <span>Visualize</span>
              <span>Analyze</span>
            </div>
            <div className='info-row-1'><span>Model</span></div>
          </div>
        </div>

      </div>
      <div className='about'>
        <h1 className='about-us'>
          Our Tools
        </h1>
        <div className='viz'>
            <img src="/Landing-Images/2.png" alt="" />
            <div>
              <h1>Visualize</h1>
              <p>More Than 15 visualization to get info about your data</p>
            </div>
        </div>
        <div className='viz'>
        <img src="/Landing-Images/3.png" alt="" />
            <div>
              <h1>Process</h1>
              <p>Handle Outliers Normalize and clean Datasets</p>
            </div>
            
        </div>
        <div className='viz'>
            <img src="/Landing-Images/flux_dev_a_futuristic_illustration_of_a_machine_learning_model_1_fa9d3477-05da-4b7d-9ac5-0398e84f09a3.jpeg" alt="" />
            <div>
              <h1>Train Model</h1>
              <p>Train your processed data model to achieve your desired results</p>
            </div>
        </div>
        <div className='viz'>
        <img src="/Landing-Images/flux_dev_a_futuristic_and_modern_illustration_of_a_data_predic_1_dc26888e-272f-4001-a9f0-35e58bcd4261.jpeg" alt="" />
            <div>
              <h1>Predict</h1>
              <p>Make accurate prediction using out tools to get valuable insights from the data</p>
            </div>
            
        </div>
      </div>
      <div className='hero end-section'>
        <div className='heading end-heading'>
        <h1>Start Your Analysis Now</h1>
        <button className='getStarted'>Get Started</button>
        </div>
      </div>
    </>
  )
}

export default App
