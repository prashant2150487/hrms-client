import SecondaryHeader from "@/components/SecondaryHeader";
import Dashboard from "@/components/sidebar";
const data = ["Onboard" ];
const Onboard = () => {
  return <Dashboard>
    <SecondaryHeader data={data}/>
    
  </Dashboard>;
};

export default Onboard;
