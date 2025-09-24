import { getSpecifications } from "@/app/utils/getSpecifications";

export default function SpecificationsTable({ data }: any) {
  const specifications = getSpecifications(data);

  return (
    <div className="w-full max-w-5xl mx-auto my-4 bg-gray-50  shadow">
      <div className="border-b bg-gray-100 px-4 py-2 font-semibold dark:bg-black dark:text-white">
        Specifications
      </div>
      <table className="w-full text-sm text-left text-gray-700 pl-4">
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-black dark:text-[#727272]"
                  : "bg-gray-50"
              } border-b`}
            >
              <th className="px-4 py-2 font-medium dark:bg-black dark:text-[#727272] text-gray-900">
                {spec?.label}
              </th>
              <td className="px-4 py-2 whitespace-pre-wrap dark:bg-black dark:text-[#727272]">
                {spec?.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
