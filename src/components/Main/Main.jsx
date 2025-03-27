import React, { useState, useEffect } from 'react'
import './Main.css'
import supabase from "../../SupabaseClient.jsx";

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
      <nav class="navbar">
        <div class="login-section">
            <button>CPU</button>
            <button>GPU</button>
            <button>PSU</button>
            <button>Motherboard</button>
            <button>RAM</button>
            <button>SSD</button>
            <button>HDD</button>
            <button>FAN</button>
        </div>
      </nav>

      <section id="results">
          <h2>Choose Your Components!</h2>
          <ul id="component-list"></ul>
      </section>

      <section>
        <div class="section">
          <div class="section-content">
            <div class="vertical-division">Component</div>
            <div class="vertical-division">Selection</div>
            <div class="vertical-division">3</div>
            <div class="vertical-division">4</div>
            <div class="vertical-division">5</div>
            <div class="vertical-division">6</div>
            <div class="vertical-division">7</div>
            <div class="vertical-division">8</div>
          </div>
        </div>
      </section>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">CPU</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add CPU</button>
              </div>
              <div class="vertical-division">3</div>
              <div class="vertical-division">4</div>
              <div class="vertical-division">5</div>
              <div class="vertical-division">6</div>
              <div class="vertical-division">7</div>
              <div class="vertical-division">8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">GPU</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add GPU</button>
              </div>
              <div class="vertical-division">3</div>
              <div class="vertical-division">4</div>
              <div class="vertical-division">5</div>
              <div class="vertical-division">6</div>
              <div class="vertical-division">7</div>
              <div class="vertical-division">8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">PSU</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add PSU</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">Motherboard</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add Motherboard</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">RAM</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add RAM</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">SSD</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add SSD</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">HDD</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add HDD</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
        </div>

        <div class="section">
          <div class="section-content">
              <div class="vertical-division">FAN</div>
              <div class="vertical-division">
                <button onclick="openNewWindow()">+ Add FAN</button>
              </div>
              <div class="vertical-division"> 3</div>
              <div class="vertical-division"> 4</div>
              <div class="vertical-division"> 5</div>
              <div class="vertical-division"> 6</div>
              <div class="vertical-division"> 7</div>
              <div class="vertical-division"> 8</div>
            </div>
          </div>
    </main>
  )
}

export default Main