import React, { useState, useEffect } from 'react'
import './Main.css'
import supabase from "../../SupabaseClient.jsx";

function PartSection({ partTitle, partName, partData, state, setState }) {
  return (
    <div class="section">
      <div class="section-content">
        <div class="vertical-division">{partTitle}</div>
        <div class="vertical-division">Selected part: {state}</div>
        {CreatePartButtons(partData, partName, setState)}
      </div>
    </div>
  )
}

function PartButton({ partName, setState }) {
  const handleClick = () => {
    setState(partName);
  };

  return (
    <button onClick={handleClick} className="part-button">
      {partName}
    </button>
  );
}

function CreatePartButtons(partData, buttonName, setState) {
  return partData.map((part) => (
    <PartButton key={part.id} partName={buttonName} setState={setState} />
  ));
}

function Main() {
  const [cpuData, setCpuData] = useState([]);
  const [gpuData, setGpuData] = useState([]);
  const [psuData, setPsuData] = useState([]);
  const [motherboardData, setMotherboardData] = useState([]);
  const [fanData, setFanData] = useState([]);
  const [ssdData, setSsdData] = useState([]);
  const [hddData, setHddData] = useState([]);
  const [ramData, setRamData] = useState([]);

  // State for selected items
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedPSU, setSelectedPSU] = useState("");
  const [selectedMotherboard, setSelectedMotherboard] = useState("");
  const [selectedFan, setSelectedFan] = useState("");
  const [selectedSSD, setSelectedSSD] = useState("");
  const [selectedHDD, setSelectedHDD] = useState("");
  const [selectedRAM1, setSelectedRAM1] = useState("");
  const [selectedRAM2, setSelectedRAM2] = useState("");

  // State for displayed selected components
  const [pcBuild, setPcBuild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchTable = async (table, setState) => {
        const { data, error } = await supabase.from(table).select();
        if (error) console.error(`Error fetching ${table}:`, error);
        else setState(data);
      };

      await Promise.all([
        fetchTable("CPU", setCpuData),
        fetchTable("GPU", setGpuData),
        fetchTable("PSU", setPsuData),
        fetchTable("Motherboard", setMotherboardData),
        fetchTable("Fan", setFanData),
        fetchTable("SSD", setSsdData),
        fetchTable("HDD", setHddData),
        fetchTable("RAM", setRamData),
      ]);
    };

    fetchData();
  }, []);

  // Handle form submission (Create PC button)
  const handleSubmit = (e) => {
    e.preventDefault();
    setPcBuild({
      cpu: selectedCPU,
      gpu: selectedGPU,
      psu: selectedPSU,
      motherboard: selectedMotherboard,
      fan: selectedFan,
      ssd: selectedSSD,
      hdd: selectedHDD,
      ram1: selectedRAM1,
      ram2: selectedRAM2,
    });
  };

  // Reset all selections
  const handleReset = () => {
    setSelectedCPU("");
    setSelectedGPU("");
    setSelectedPSU("");
    setSelectedMotherboard("");
    setSelectedFan("");
    setSelectedSSD("");
    setSelectedHDD("");
    setSelectedRAM1("");
    setSelectedRAM2("");
    setPcBuild(null);
  };

  return (
    <main>
      <section id="results">
          <h2>Choose Your Components!</h2>
          <ul id="component-list"></ul>
      </section>

      <section>
        <div class="section">
          <div class="section-content">
            <div class="vertical-division">Component</div>
            <div class="vertical-division">Selection</div>
            <div class="vertical-division">Part 1</div>
            <div class="vertical-division">Part 2</div>
            <div class="vertical-division">Part 3</div>
            <div class="vertical-division">Part 4</div>
            <div class="vertical-division">Part 5</div>
          </div>
        </div>
      </section>

      <div className='section'>
        <div className='section-content'>
          <div className='vertical-division'>Build the PC!</div>
          <div className='vertical-division'>
            <button onClick={handleSubmit}>Create PC</button>
            <button onClick={handleReset} id='reset-btn'>Reset</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main