import { savedLights } from "../api/HueApi";
import DeviceCard from "../components/DeviceCard";
import DeviceListItem from "../components/DeviceListItem";

//==================================
// Generates Device Cards
// Returns array of Card components
//==================================
export const getLightCards = async () => {
  const data: any = await savedLights();
  const deviceList: any = [];

  for (var i in data) {
    console.log(data[i].name);
    deviceList.push(
      <DeviceCard
        id={i}
        key={i}
        name={data[i].name}
        on={data[i].state.on}
        bri={data[i].state.bri}
      />
    );
  }

  return deviceList;
};

//==================================
// Generates Device *LIST* Cards
// Returns array of Card components
//==================================
export const getLightList = async () => {
  const data: any = await savedLights();
  const deviceList: any = [];
  console.log(data);
  if (data) {
    for (var i in data) {
      if (data[i].error) return;
      deviceList.push(
        <DeviceListItem
          id={i}
          key={i}
          name={data[i].name}
          on={data[i].state.on}
          bri={data[i].state.bri}
        />
      );
    }
  }

  return deviceList;
};

export const cacheData = () => {
  //email
  //bridge
  //hueUser
};

export const validateAuthParameters = (email: string, password: string) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim() === "" || password.trim() === "") {
    console.log("Username and password are required");
    return false;
  }

  if (!re.test(email)) {
    alert("Email is not valid");
    return false;
  }
  if (password.length < 6) {
    console.log("Password must be 6 or more characters!");
    return false;
  }

  return true;
};
