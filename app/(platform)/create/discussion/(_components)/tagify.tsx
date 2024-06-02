// import React, { useEffect, useState } from "react";
// import Tags from "@yaireo/tagify/dist/react.tagify";
// import { TagifySettings } from "@yaireo/tagify";
// import "./tag.styling.scss";

// const suggestion = ["a", "b", "c"];

// interface TagFieldProps {
//   suggestions: string[];
//   setState: React.Dispatch<React.SetStateAction<string[]>>;
//   state: string[];
// }

// function TagField({ suggestions, setState, state }: TagFieldProps) {
//   const [data, setData] = useState<string[]>(state);
//   const handleChange = (e: CustomEvent) => {
//     const selectedTags = e.detail.tagify.value.map(
//       (item: { value: string }) => item.value
//     );
//     setState(selectedTags);
//   };

//   console.log("DATA", data);

//   const settings: TagifySettings<Tagify.BaseTagData> = {
//     editTags: 1,
//     backspace: "edit",
//     enforceWhitelist: false,
//     callbacks: {
//       add: handleChange,
//       remove: handleChange,
//       blur: handleChange,
//       invalid: handleChange,
//       click: handleChange,
//       focus: handleChange,
//       "edit:updated": handleChange,
//       "edit:start": handleChange,
//       "edit:input": handleChange,
//     },
//     placeholder: "Enter or create your own tag...",
//   };

//   const handleSubmitTags = () => {};

//   return (
//     <div className="flex w-full border-[1px] rounded-md flex-col gap-[20px]">
//       <div
//         className={`form-group w-full shadow-primary dark:shadow-darkPrimary rounded-[8px]`}
//       >
//         <Tags
//           onChange={handleChange}
//           whitelist={suggestion}
//           placeholder="Add or create your own tags"
//           value={state}
//           settings={{
//             blacklist: ["xxx"],
//             maxTags: 4,
//             dropdown: {
//               enabled: 0,
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default TagField;
