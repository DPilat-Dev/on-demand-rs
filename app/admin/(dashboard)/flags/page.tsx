import { prisma } from '@/lib/prisma';
import FlagToggle from './FlagToggle';

type FeatureFlagRow = Awaited<ReturnType<typeof prisma.featureFlag.findMany>>[number];

export default async function FlagsPage() {
  const flags = await prisma.featureFlag.findMany({ orderBy: { key: 'asc' } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feature Flags</h1>
        <p className="text-sm text-gray-500 mt-1">
          Show or hide sections across the site. Changes take effect immediately.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Section</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 hidden md:table-cell">Key</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 hidden lg:table-cell">Description</th>
              <th className="px-6 py-3 font-medium text-gray-600 text-right">Enabled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {flags.map((flag: FeatureFlagRow) => (
              <tr key={flag.key} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{flag.label}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <code className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{flag.key}</code>
                </td>
                <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{flag.description}</td>
                <td className="px-6 py-4 text-right">
                  <FlagToggle flagKey={flag.key} isEnabled={flag.isEnabled} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400">
        Disabling a flag hides that section from the public site. All flags default to enabled when the database is unreachable.
      </p>
    </div>
  );
}
