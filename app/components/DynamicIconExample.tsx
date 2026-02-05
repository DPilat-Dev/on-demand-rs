'use client';

import DynamicIcon from './DynamicIcon';

export default function DynamicIconExample() {
  const exampleIcons = [
    'FaBeer',        // Font Awesome
    'BsFillAlarmFill', // Bootstrap Icons
    'MdSettings',    // Material Design
    'RiHomeLine',    // Remix Icons
    'SiReact',       // Simple Icons
    'TbBrandNextjs', // Tabler Icons
    'LuActivity',    // Lucide Icons
    'HiOutlineBell', // Heroicons v1
    'Hi2BellAlert',  // Heroicons v2
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">DynamicIcon Component Demo</h2>
      <p className="text-gray-600 mb-6">
        This component dynamically loads icons from any react-icons library based on the icon name prefix.
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {exampleIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
            <DynamicIcon iconName={iconName} size={32} color="#3b82f6" />
            <span className="mt-2 text-sm font-medium text-gray-700">{iconName}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Example:</h3>
        <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`import DynamicIcon from './DynamicIcon';

// Use any react-icons icon by name
<DynamicIcon iconName="FaBeer" size={24} color="#3b82f6" />
<DynamicIcon iconName="MdSettings" size={32} color="#000" />
<DynamicIcon iconName="RiHomeLine" size={20} color="#10b981" />`}
        </pre>
      </div>
    </div>
  );
}