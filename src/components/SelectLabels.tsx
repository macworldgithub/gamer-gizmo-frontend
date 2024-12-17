import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Wrapper from "./Common/Wrapper/Wrapper";

export default function SelectLabels() {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  // Define menu items in an array
  const menuItems = [
    { value: "", label: <em>None</em> },
    { value: 10, label: "Ten" },
    { value: 20, label: "Twenty" },
    { value: 30, label: "Thirty" },
  ];

  const dropdownOptions = [
    { label: "Processor", options: ["lorem", "lorem"] },
    { label: "New Items", options: ["lorem", "lorem"] },
    { label: "Model", options: ["Gaming", "Electronics"] },
    { label: "Price Range", options: ["Low to High", "High to Low"] },
    { label: "Location", options: ["lorem", "lorem"] },
  ];

  const [selectedValues, setSelectedValues] = React.useState(
    dropdownOptions.map((dropdown) => dropdown.options[0])
  );

  // Handle dropdown value change
  //@ts-ignore
  const handleChange = (index, event) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = event.target.value;
    setSelectedValues(updatedValues);
  };

  return (
    // <div className="bg-white rounded-md">
    //   <FormControl sx={{ m: 1, minWidth: 120 }}>
    //     <Select
    //       value={age}
    //       onChange={handleChange}
    //       style={{ width: "200px", borderRadius: "50px" }}
    //       displayEmpty
    //       inputProps={{ "aria-label": "Without label" }}
    //       MenuProps={{
    //         PaperProps: {
    //           sx: {
    //             marginTop: "5px",
    //             borderLeftRadius: "25px",
    //             borderBottomLeftRadius: "25px",
    //             padding: "1px",
    //             boxShadow: "none",
    //             maxHeight: "200px", // Set maximum height for dropdown
    //             overflowY: "auto",
    //             "&::-webkit-scrollbar": {
    //               width: "8px", // Width of the scrollbar
    //             },
    //             "&::-webkit-scrollbar-thumb": {
    //               backgroundColor: "purple", // Color of the scrollbar thumb
    //               borderRadius: "50px", // Rounded corners for the scrollbar thumb
    //             },
    //             "&::-webkit-scrollbar-thumb:hover": {
    //               backgroundColor: "#6a0dad", // Darker color on hover
    //             },
    //             "&::-webkit-scrollbar-track": {
    //               backgroundColor: "#f0f0f0", // Track color
    //             },
    //           },
    //         },
    //       }}
    //       sx={{
    //         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //           borderColor: "black",
    //           border: "1px solid grey", // Prevent blue border on focus
    //         },
    //       }}
    //     >
    //       {menuItems.map((item, index) => (
    //         <MenuItem
    //           key={index}
    //           value={item.value}
    //           sx={{
    //             height: "50px",
    //             "&.Mui-selected": {
    //               backgroundColor: "transparent !important", // Removes the selected background
    //             },
    //             "&:hover": {
    //               transition: "all 0.5s ease",
    //               backgroundColor: "#E8E3FC", // Set hover background color
    //               color: "white",
    //             },
    //           }}
    //         >
    //           {item.label}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // </div>
    <Wrapper>
      <div className="flex max-md:flex-col bg-[#ffffff] py-5 justify-around max-md:rounded-md items-centermax-md:h-[30rem] max-md:py-5 md:h-[5.625rem] px-4 mt-5 rounded-md gap-6">
        {dropdownOptions.map((dropdown, index) => (
          <div
            key={index}
            className="w-28 h-10 text-xs max-md:mx-5 max-md:my-[0.3rem] bg-white rounded-full flex justify-center items-center "
          >
            <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
              <Select
                value={selectedValues[index]}
                onChange={(event) => handleChange(index, event)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      marginTop: "17.5px",
                      borderLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                      padding: "1px",
                      boxShadow: "none",
                      maxHeight: "200px",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "purple",
                        borderRadius: "50px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#6a0dad",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0",
                      },
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    border: "1px solid grey",
                  },
                  borderRadius: "50px",
                }}
              >
                {dropdown.options.map((option, id) => (
                  <MenuItem
                    key={id}
                    value={option}
                    sx={{
                      height: "50px",
                      "&.Mui-selected": {
                        backgroundColor: "white !important",
                        // color: "gray"
                      },
                      "&:hover": {
                        transition: "all 0.5s ease",
                        // backgroundColor: "#E8E3FC",
                        color: "#7d7d7d",
                      },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
        <div className="bg-custom-gradient my-3 w-32 h-10 max-md:mx-5 rounded-full md:p-1.5 flex justify-center items-center md:text-base font-medium text-white">
          Filter
        </div>
      </div>
    </Wrapper>
  );
}