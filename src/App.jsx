import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
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

  useEffect(() => {
    const fetchData = async () => {
      // Fetch CPU data
      const { data: cpu, error: cpuError } = await supabase
        .from("CPU")
        .select();
      if (cpuError) console.error("Error fetching CPU:", cpuError);
      else setCpuData(cpu);

      // Fetch GPU data
      const { data: gpu, error: gpuError } = await supabase
        .from("GPU")
        .select();
      if (gpuError) console.error("Error fetching GPU:", gpuError);
      else setGpuData(gpu);

      // Fetch PSU data
      const { data: psu, error: psuError } = await supabase
        .from("PSU")
        .select();
      if (psuError) console.error("Error fetching PSU:", psuError);
      else setPsuData(psu);

      // Fetch Motherboard data
      const { data: motherboard, error: motherboardError } = await supabase
        .from("Motherboard")
        .select();
      if (motherboardError)
        console.error("Error fetching Motherboard:", motherboardError);
      else setMotherboardData(motherboard);

      // Fetch Fan data
      const { data: fan, error: fanError } = await supabase
        .from("Fan")
        .select();
      if (fanError) console.error("Error fetching Fan:", fanError);
      else setFanData(fan);

      // Fetch SSD data
      const { data: ssd, error: ssdError } = await supabase
        .from("SSD")
        .select();
      if (ssdError) console.error("Error fetching SSD:", ssdError);
      else setSsdData(ssd);

      // Fetch HDD data
      const { data: hdd, error: hddError } = await supabase
        .from("HDD")
        .select();
      if (hddError) console.error("Error fetching HDD:", hddError);
      else setHddData(hdd);

      // Fetch RAM data
      const { data: ram, error: ramError } = await supabase
        .from("RAM")
        .select();
      if (ramError) console.error("Error fetching RAM:", ramError);
      else setRamData(ram);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for creating PC build with selected parts
    console.log("Form submitted!");
  };

  return (
    <>
      <Header />
      <main>
        <h2>Build Your New PC</h2>
        <form onSubmit={handleSubmit}>
          <label>
            CPU:
            <select>
              {cpuData.map((cpu) => (
                <option key={cpu.id} value={cpu.id}>
                  {cpu.model} - {cpu.manufacturer} ({cpu.core_count} cores,{" "}
                  {cpu.thread_count} threads)
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            GPU:
            <select>
              {gpuData.map((gpu) => (
                <option key={gpu.id} value={gpu.id}>
                  {gpu.model} - {gpu.brand} ({gpu.memory} memory)
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            PSU:
            <select>
              {psuData.map((psu) => (
                <option key={psu.id} value={psu.id}>
                  {psu.brand} - {psu.wattage}W
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Motherboard:
            <select>
              {motherboardData.map((motherboard) => (
                <option key={motherboard.id} value={motherboard.id}>
                  {motherboard.brand} - {motherboard.chipset}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Fan:
            <select>
              {fanData.map((fan) => (
                <option key={fan.id} value={fan.id}>
                  {fan.brand} - {fan.rpm} RPM
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            SSD:
            <select>
              {ssdData.map((ssd) => (
                <option key={ssd.id} value={ssd.id}>
                  {ssd.manufacturer} - {ssd.capacity} TB ({ssd.form_factor})
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            HDD:
            <select>
              {hddData.map((hdd) => (
                <option key={hdd.id} value={hdd.id}>
                  {hdd.manufacturer} - {hdd.capacity} TB ({hdd.form_factor})
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            RAM:
            <select>
              {ramData.map((ram) => (
                <option key={ram.id} value={ram.id}>
                  {ram.brand} - ({ram.capacity} GB)
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Create PC</button>
        </form>
      </main>
    </>
  );
}

export default App;
