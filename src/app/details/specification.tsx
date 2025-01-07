// components/SpecificationsTable.js
export default function SpecificationsTable() {
    const specifications = [
        { label: "GPU Name", value: "Polaris 20" },
        { label: "GPU Variant", value: "Polaris 20 XTX (215-0910038)" },
        { label: "Memory", value: "8 GB" },
        { label: "Memory Type", value: "GDDR5" },
        { label: "Memory Bus", value: "256 bit" },
        { label: "Base Clock", value: "1257 MHz" },
        { label: "Boost Clock", value: "1360 MHz (+1%)" },
        { label: "Memory Clock", value: "2000 MHz\n8 Gbps effective" },
        { label: "Bandwidth", value: "256.0 GB/s" },
        { label: "Suggested PSU", value: "450 W" },
        { label: "Power Connectors", value: "1x 8-pin" },
    ];

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
                            className={`${index % 2 === 0 ? "bg-white dark:bg-black dark:text-[#727272]" : "bg-gray-50"
                                } border-b`}
                        >
                            <th className="px-4 py-2 font-medium dark:bg-black dark:text-[#727272] text-gray-900">
                                {spec.label}
                            </th>
                            <td className="px-4 py-2 whitespace-pre-wrap dark:bg-black dark:text-[#727272]">{spec.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
