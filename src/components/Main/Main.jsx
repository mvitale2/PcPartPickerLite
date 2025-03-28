import React, { useState, useEffect } from "react";
import "./Main.css";
import supabase from "../../SupabaseClient.jsx";

// Component for generating the html for a part section.
// This is basically the parent component of each part, so it needs every prop the PartButton and CreatePartButton functions use. 
function PartSection({ partTitle, partName, partData, state, setState }) {
  return (
    <div className="section">
      <div className="section-content">
        <div className="vertical-division">{partTitle}</div>
        <div className="vertical-division">Selected part: {state}</div>
        {CreatePartButtons(partData, setState, partName)}
      </div>
    </div>
  );
}

// Generate the button html, passing in the corresponding setter function. 
function PartButton({ partName, setState }) {
  const handleClick = () => {
    setState(partName);
  };

  return (
    <div className="vertical-division">
      <button onClick={handleClick} className="part-button">
        {partName}
      </button>
    </div>
  );
}

// Map the part data to create buttons for each part.
// The partName prop is actually a function that interprets the string passed into it from the PartSection component (see them in use below). 
// This allows for customizing the part name for each type of part, since they don't all have the same column names in the database.
// Note: This is a function, not a component!
function CreatePartButtons(partData, setState, partName) {
  return partData.map((part) => (
    <PartButton key={part.id} partName={partName(part)} setState={setState} />
  ));
}

// Component to use when user clicks create pc button. 
// Pass in a pcBuild data structure with the correct attributes. 
// If an attribute is empty, it will be a blank cell in the rendered table. 
function PcBuildComponent({ pcBuild }) {
  return (
    <div className="section">
      <div className="section-content">
        <div className="vertical-division">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Part</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPU</td>
                <td>{pcBuild.cpu}</td>
              </tr>
              <tr>
                <td>GPU</td>
                <td>{pcBuild.gpu}</td>
              </tr>
              <tr>
                <td>PSU</td>
                <td>{pcBuild.psu}</td>
              </tr>
              <tr>
                <td>Motherboard</td>
                <td>{pcBuild.motherboard}</td>
              </tr>
              <tr>
                <td>Fan</td>
                <td>{pcBuild.fan}</td>
              </tr>
              <tr>
                <td>SSD</td>
                <td>{pcBuild.ssd}</td>
              </tr>
              <tr>
                <td>HDD</td>
                <td>{pcBuild.hdd}</td>
              </tr>
              <tr>
                <td>RAM Slot 1</td>
                <td>{pcBuild.ram1}</td>
              </tr>
              <tr>
                <td>RAM Slot 2</td>
                <td>{pcBuild.ram2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Main() {
  // The data from Supabase is stored in each respective part state.
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

  // Retrieve data from Supabase
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
      {/* Header */}
      <section id="results">
        <h2>Choose Your Components!</h2>
        <ul id="component-list"></ul>
      </section>

      {/* Legend */}
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

      {/* Part selection sections */}
      <PartSection
        partTitle="CPU"
        partData={cpuData}
        state={selectedCPU}
        setState={setSelectedCPU}
        partName={(part) => `${part.manufacturer} ${part.model}`}
      />
      <PartSection
        partTitle="CPU Fan"
        partData={fanData}
        state={selectedFan}
        setState={setSelectedFan}
        partName={(part) => `${part.manufacturer} ${part.rpm}rpm`}
      />
      <PartSection
        partTitle="GPU"
        partData={gpuData}
        state={selectedGPU}
        setState={setSelectedGPU}
        partName={(part) =>
          `${part.manufacturer} ${part.model} ${part.memory}GB`
        }
      />
      <PartSection
        partTitle="PSU"
        partData={psuData}
        state={selectedPSU}
        setState={setSelectedPSU}
        partName={(part) =>
          `${part.manufacturer} ${part.wattage}W ${part.rating}`
        }
      />
      <PartSection
        partTitle="Motherboard"
        partData={motherboardData}
        state={selectedMotherboard}
        setState={setSelectedMotherboard}
        partName={(part) => `${part.manufacturer} ${part.chipset}`}
      />
      <PartSection
        partTitle="Ram Slot 1"
        partData={ramData}
        state={selectedRAM1}
        setState={setSelectedRAM1}
        partName={(part) =>
          `${part.manufacturer} ${part.speed} ${part.capacity}GB`
        }
      />
      <PartSection
        partTitle="Ram Slot 2"
        partData={ramData}
        state={selectedRAM2}
        setState={setSelectedRAM2}
        partName={(part) =>
          `${part.manufacturer} ${part.speed} ${part.capacity}GB`
        }
      />
      <PartSection
        partTitle="SSD"
        partData={ssdData}
        state={selectedSSD}
        setState={setSelectedSSD}
        partName={(part) =>
          `${part.manufacturer} ${part.form_factor} ${part.capacity}TB`
        }
      />
      <PartSection
        partTitle="HDD"
        partData={hddData}
        state={selectedHDD}
        setState={setSelectedHDD}
        partName={(part) =>
          `${part.manufacturer} ${part.form_factor} ${part.capacity}TB`
        }
      />

      <div className="section">
        <div className="section-content">
          <div className="vertical-division">
            <button onClick={handleSubmit}>Create PC</button>
            <button onClick={handleReset} id="reset-btn">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Only show the completed pc build when the pcBuild state is not null */}
      {pcBuild == null ? null : <PcBuildComponent pcBuild={pcBuild} />}
    </main>
  );
}

export default Main;
