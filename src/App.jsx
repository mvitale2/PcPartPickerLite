import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import supabase from "./SupabaseClient.jsx";

function App() {
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
    <>
      <Header />
      <main>
        <h2>Build Your New PC</h2>
        <form onSubmit={handleSubmit}>
          <label>
            CPU:
            <select
              value={selectedCPU}
              onChange={(e) => setSelectedCPU(e.target.value)}
            >
              <option value="">Select a CPU</option>
              {cpuData.map((cpu) => (
                <option key={cpu.id} value={`${cpu.manufacturer} ${cpu.model}`}>
                  {cpu.manufacturer} {cpu.model} ({cpu.core_count} cores,{" "}
                  {cpu.thread_count} threads)
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            GPU:
            <select
              value={selectedGPU}
              onChange={(e) => setSelectedGPU(e.target.value)}
            >
              <option value="">Select a GPU</option>
              {gpuData.map((gpu) => (
                <option key={gpu.id} value={`${gpu.brand} ${gpu.model}`}>
                  {gpu.brand} {gpu.model} ({gpu.memory} memory)
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            PSU:
            <select
              value={selectedPSU}
              onChange={(e) => setSelectedPSU(e.target.value)}
            >
              <option value="">Select a PSU</option>
              {psuData.map((psu) => (
                <option key={psu.id} value={`${psu.brand} - ${psu.wattage}W`}>
                  {psu.brand} - {psu.wattage}W
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Motherboard:
            <select
              value={selectedMotherboard}
              onChange={(e) => setSelectedMotherboard(e.target.value)}
            >
              <option value="">Select a Motherboard</option>
              {motherboardData.map((motherboard) => (
                <option
                  key={motherboard.id}
                  value={`${motherboard.brand} ${motherboard.chipset}`}
                >
                  {motherboard.brand} - {motherboard.chipset}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Fan:
            <select
              value={selectedFan}
              onChange={(e) => setSelectedFan(e.target.value)}
            >
              <option value="">Select a Fan</option>
              {fanData.map((fan) => (
                <option key={fan.id} value={`${fan.brand} ${fan.rpm} RPM`}>
                  {fan.brand} - {fan.rpm} RPM
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            SSD:
            <select
              value={selectedSSD}
              onChange={(e) => setSelectedSSD(e.target.value)}
            >
              <option value="">Select an SSD</option>
              {ssdData.map((ssd) => (
                <option
                  key={ssd.id}
                  value={`${ssd.manufacturer} ${ssd.capacity}TB`}
                >
                  {ssd.manufacturer} - {ssd.capacity} TB ({ssd.form_factor})
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            HDD:
            <select
              value={selectedHDD}
              onChange={(e) => setSelectedHDD(e.target.value)}
            >
              <option value="">Select an HDD</option>
              {hddData.map((hdd) => (
                <option
                  key={hdd.id}
                  value={`${hdd.manufacturer} ${hdd.capacity}TB`}
                >
                  {hdd.manufacturer} - {hdd.capacity} TB ({hdd.form_factor})
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            RAM Slot 1:
            <select
              value={selectedRAM1}
              onChange={(e) => setSelectedRAM1(e.target.value)}
            >
              <option value="">Select RAM</option>
              {ramData.map((ram) => (
                <option key={ram.id} value={`${ram.brand} ${ram.capacity}GB`}>
                  {ram.brand} - {ram.capacity} GB
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            RAM Slot 2:
            <select
              value={selectedRAM2}
              onChange={(e) => setSelectedRAM2(e.target.value)}
            >
              <option value="">Select RAM</option>
              {ramData.map((ram) => (
                <option key={ram.id} value={`${ram.brand} ${ram.capacity}GB`}>
                  {ram.brand} - {ram.capacity} GB
                </option>
              ))}
            </select>
          </label>
          <br />

          <button type="submit">Create PC</button>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginLeft: "10px" }}
          >
            Reset PC Build
          </button>
        </form>

        {/* Display Selected PC Build */}
        {pcBuild && (
          <div>
            <h2>Your PC Build:</h2>
            <ul>
              <li>
                <strong>CPU:</strong> {pcBuild.cpu || "Not selected"}
              </li>
              <li>
                <strong>GPU:</strong> {pcBuild.gpu || "Not selected"}
              </li>
              <li>
                <strong>PSU:</strong> {pcBuild.psu || "Not selected"}
              </li>
              <li>
                <strong>Motherboard:</strong>{" "}
                {pcBuild.motherboard || "Not selected"}
              </li>
              <li>
                <strong>Fan:</strong> {pcBuild.fan || "Not selected"}
              </li>
              <li>
                <strong>SSD:</strong> {pcBuild.ssd || "Not selected"}
              </li>
              <li>
                <strong>HDD:</strong> {pcBuild.hdd || "Not selected"}
              </li>
              <li>
                <strong>RAM:</strong> {pcBuild.ram || "Not selected"}
              </li>
            </ul>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
