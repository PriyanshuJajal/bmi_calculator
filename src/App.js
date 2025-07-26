import './App.css';
import React,{useState} from 'react';

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#007bff'}}><path d="m16 16 3-8 3 8c-2 1-4 1-6 0"/><path d="M2 16l3-8 3 8c-2 1-4 1-6 0"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2"/><path d="M19 7h2"/></svg>
);

const RefreshCwIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M3 21a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 16"/><path d="M21 11v5h-5"/></svg>
);

function App() {

  // Initializing my state values...
  const [unit , setUnit] = useState('imperial');

  const [weight , setWeight] = useState('');
  const [height , setHeight] = useState('');

  const [bmi , setBmi] = useState(null);
  const [message , setMessage] = useState('');
  const [messageColorClass , setMessageColorClass] = useState('');

  const [error , setError] = useState('');

  const weightPlaceholder = unit === 'metric' ? 'e.g. 70' : 'e.g. 150';
  const heightPlaceholder = unit === 'metric' ? 'e.g. 175' : 'e.g. 68';



  // BMI Logic...
  const calcBmi = (e) => {
    e.preventDefault();

    const wtNum = parseFloat(weight);
    const htNum = parseFloat(height);

    if (isNaN(wtNum) || isNaN(htNum) || wtNum <= 0 || htNum <= 0) {
      setError("Please enter valid positive numbers.");
      setBmi(null);
      setMessage('');
      return;
    }

    setError('');

    let calculatedBmi;
    
    if (unit === 'metric') {
      const heightInMt = htNum / 100;
      calculatedBmi = wtNum / (heightInMt * heightInMt);
    }
    else {
      calculatedBmi = (wtNum / (htNum * htNum)) * 703;
    }

    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight.');
      setMessageColorClass('text-underweight');
    }

    else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setMessage('You have a normal weight!');
      setMessageColorClass('text-normal');
    }

    else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setMessage('You are overweight.');
      setMessageColorClass('text-overweight');
    }

    else {
      setMessage('You are obese.');
      setMessageColorClass('text-obese');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
    setError('');
    setMessageColorClass('');
  }

  const handleUnitChange = (newUnit) => {
    if (unit !== newUnit) {
      setUnit(newUnit);
      resetForm();
    } 
  };

  return (
    <div className="App">
      <div className='card-header'>
        <ScaleIcon />
        <h1>BMI Calculator</h1>
      </div>

      <div className='unit-selector'>
        <button 
          onClick={() => handleUnitChange('imperial')}
          className={unit === 'imperial' ? 'active' : ''}
        > Imperial </button>

        <button 
          onClick={() => handleUnitChange('metric')}
          className={unit === 'metric' ? 'active' : ''}
        > Metric </button>
      </div>

      <form onSubmit={calcBmi} noValidate>
        <div className='form-group'>
          <label htmlFor='weight' className='form-label'>
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>

          <input 
            type='number'
            id='weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={weightPlaceholder}
            className='form-input'
            />
        </div>

        <div className='form-group'>
          <label htmlFor='height' className='form-label'>
            Height ({unit === 'metric' ? 'cm' : 'in'})
          </label>

          <input 
            type='number'
            id='height'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={heightPlaceholder}
            className='form-input'
          />
        </div>

        <div className='error-msg'>{error}</div>

        <div className='btn-group'>
          <button type='button' onClick={resetForm} className='btn btn-secondary'>
            <RefreshCwIcon />
            Reset
          </button>
          
          <button type='submit' className='btn btn-primary'>Calculate</button>
        </div>
      </form>

      {bmi && (
        <div className='res-area'>
          <div className="bmi-display">
              <p className="bmi-display-text">Your BMI is:</p>
              <p className="bmi-display-value">{bmi}</p>
          </div>
          <p className={`message ${messageColorClass}`}>{message}</p>
        </div>
      )}

    </div>
  );
}

export default App;
